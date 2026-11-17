"""Measure representative RoboKit batches; run in the RoboKit environment on a free GPU.

CUDA_VISIBLE_DEVICES=7 OMP_NUM_THREADS=4 PYTHONPATH=<robokit>/src \
    uv run --no-sync python <website>/scripts/benchmark_scale.py --task ik \
    --source-root <robokit> --asset-root ~/.robokit/assets --output results.json
"""

import argparse
import gc
import hashlib
import json
import subprocess
import time
from collections.abc import Callable
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import trimesh
import warp as wp
from robokit.geom import MeshGeom, WarpScene
from robokit.helpers.grasp import ContactSamplerConfig, ContactVar
from robokit.helpers.hand_retargeting import (
    HandRetargeterOnline,
    HandRetargeterOnlineConfig,
    HandSpec,
)
from robokit.helpers.humanoid_retargeting import (
    HumanoidRetargeterOnline,
    HumanoidRetargeterOnlineConfig,
    LinkMapping,
)
from robokit.helpers.ik import IKSolver
from robokit.helpers.ik import presets as ik_presets
from robokit.helpers.motion_plan import MotionPlanner
from robokit.helpers.motion_plan import presets as motion_presets
from robokit.lie.se3 import se3_identity
from robokit.opt.lm_optimizer import LMOptimizerConfig
from robokit.opt.population_solver import PopulationSolver, PopulationSolverConfig
from robokit.opt.var_values import VarValues
from robokit.robo import Robot
from robokit.terms.dense.force_closure_task import ForceClosureTask
from robokit.terms.dense.position_limit import PositionLimit
from robokit.terms.dense.scene_collision_task import SceneCollisionTask
from robokit.terms.dense.scene_distance_task import SceneDistanceTask
from robokit.utils.ee_coord_utils import MANOPTH_HAND_COORD_SPEC, HandCoordinateSpec
from robokit.utils.warp_utils import wp_vec7


def workload(
    task: str, batch: int, assets: Path, source: Path
) -> tuple[Callable, dict]:
    from dataclasses import replace

    device = "cuda:0"
    rng = np.random.default_rng(42)
    if task in ("ik", "motion-planning"):
        model = assets / "robots/robot_description/arms/franka_panda/panda_arm.urdf"
        robot = Robot.load(
            model,
            load_meshes=True,
            load_collision_spheres=task == "motion-planning",
            collision_spheres_path=assets
            / "robots/collision_spheres/franka_panda/arm.yaml"
            if task == "motion-planning"
            else None,
        )
        rest = np.array([0, -0.4, 0, -1.8, 0, 1.5, 0.7], np.float32)
        start_q = np.tile(rest, (batch, 1))
        goal_q = np.clip(
            start_q + rng.uniform(-0.45, 0.45, start_q.shape),
            *robot.spec.actuated_joint_limits.T,
        ).astype(np.float32)
        start = robot.state(q=wp.array(start_q, dtype=wp.float32, device=device))
        goal = robot.forward_kinematics(
            robot.state(q=wp.array(goal_q, dtype=wp.float32, device=device))
        )
        poses = goal.T_world_link.numpy()[:, robot.spec.link_names.index("panda_link8")]
        target = wp.array(poses[:, None], dtype=wp_vec7, device=device)
        if task == "ik":
            helper = IKSolver(
                ik_presets.smooth,
                robot=robot,
                target_links="panda_link8",
                device=device,
            )
            helper.warmup(batch_size=batch)
            return lambda _: helper.solve(target, prev_state=start), {
                "model": "Franka Panda",
                "workload": "IK smooth preset, reachable pose goals",
                "unit": "batch solve",
            }
        obstacle = trimesh.creation.icosphere(subdivisions=2, radius=0.09)
        obstacle.apply_translation([0.45, 0.0, 0.3])
        scene = WarpScene(1, device).add(MeshGeom([obstacle], np.array([0, 1])))
        config = replace(
            motion_presets.offline_pose_lm,
            ik_config=motion_presets.build_offline_ik_config(num_samples=64),
        )
        helper = MotionPlanner(config, robot, "panda_link8", scene=scene, device=device)
        helper.warmup(batch)
        return lambda _: helper.solve_offline(start, T_world_target=target), {
            "model": "Franka Panda",
            "workload": "32-step collision-aware pose plan, 8 candidates, 50 LM iterations; goal IK and retiming included",
            "unit": "batch solve",
            "obstacle": "9 cm sphere at (0.45, 0, 0.3)",
        }

    if task == "hand-retargeting":
        model = (
            assets
            / "robots/robot_description/end_effectors/shadow_hand/shadow_hand_right.urdf"
        )
        robot = Robot.load(model)
        names = ("wrist",) + tuple(
            f"{finger}_{joint}"
            for finger, joints in (
                ("thumb", ("cmc", "mcp", "ip", "tip")),
                ("index", ("mcp", "pip", "dip", "tip")),
                ("middle", ("mcp", "pip", "dip", "tip")),
                ("ring", ("mcp", "pip", "dip", "tip")),
                ("pinky", ("mcp", "pip", "dip", "tip")),
            )
            for joint in joints
        )
        links = {
            "wrist": "palm",
            **dict(
                zip(
                    (
                        f"{finger}_tip"
                        for finger in ("thumb", "index", "middle", "ring", "pinky")
                    ),
                    ("thtip", "fftip", "mftip", "rftip", "lftip"),
                )
            ),
        }
        tips = names[4::4]
        pairs = [("wrist", tip) for tip in tips] + [
            (a, b) for i, a in enumerate(tips) for b in tips[i + 1 :]
        ]
        spec = HandSpec(
            floating_base=True,
            target_names=names,
            target_link_names=links,
            target_chains=tuple(tuple(names[1 + 4 * i : 5 + 4 * i]) for i in range(5)),
            root_target_name="wrist",
            contact_target_names=tips,
            target_coord_spec=MANOPTH_HAND_COORD_SPEC,
            root_link_coord_spec=HandCoordinateSpec(
                palm_forward_axis="-y", four_fingers_up_axis="-z"
            ),
        )
        config = HandRetargeterOnlineConfig(
            vector_weights={(links[a], links[b], a, b): 1.0 for a, b in pairs},
            q_smoothness_weight=0.03,
            regularization_weight=0.001,
            solver=PopulationSolverConfig(
                num_iters=10,
                num_candidates=[1],
                optimizer=LMOptimizerConfig(lm_lambda=0.01),
                cuda_graph_mode="full",
            ),
        )
        helper = HandRetargeterOnline(config, robot, spec, device)
        helper.warmup(batch)
        with np.load(source / "tests/fixtures/hand_retargeting_golden.npz") as data:
            frames = data["input_long_keypoints"][:25]
        targets = [
            wp.array(
                np.repeat(frame[None], batch, axis=0), dtype=wp.float32, device=device
            )
            for frame in frames
        ]
        return lambda i: helper.solve(targets[i % len(targets)]), {
            "model": "Shadow Hand",
            "workload": "21-point hand stream, 15 vector objectives, 10 LM iterations",
            "unit": "per frame",
        }

    if task == "humanoid-retargeting":
        model = assets / "robots/robot_description/humanoids/unitree_g1/g1_29dof.urdf"
        robot = Robot.load(model)
        names = (
            "pelvis",
            "left_hip_roll_link",
            "right_hip_roll_link",
            "left_knee_link",
            "right_knee_link",
            "left_ankle_roll_link",
            "right_ankle_roll_link",
            "torso_link",
            "left_shoulder_yaw_link",
            "right_shoulder_yaw_link",
            "left_elbow_link",
            "right_elbow_link",
            "left_wrist_yaw_link",
            "right_wrist_yaw_link",
        )
        config = HumanoidRetargeterOnlineConfig(
            urdf_path=str(model),
            human_root_name="pelvis",
            human_height_assumption=1.32,
            robot_height=1.32,
            scale_table=dict.fromkeys(names, 1.0),
            link_mapping={
                name: LinkMapping(
                    name,
                    30.0,
                    30.0,
                    np.zeros(3, np.float32),
                    np.array([1, 0, 0, 0], np.float32),
                )
                for name in names
            },
            smoothness_weight=25.0,
            velocity_limit_weight=0.2,
            solver=PopulationSolverConfig(
                num_iters=9,
                select_at=[6],
                num_candidates=[4, 1],
                optimizer=LMOptimizerConfig(lm_lambda=1.5),
                cuda_graph_mode="full",
            ),
        )
        helper = HumanoidRetargeterOnline(config, robot=robot, device=device)
        helper.warmup(batch)
        q = np.clip(
            np.sin(np.arange(25)[:, None] * 0.15 + rng.uniform(0, 6.28, (1, 29))) * 0.2,
            *robot.spec.actuated_joint_limits.T,
        ).astype(np.float32)
        base = se3_identity((25,), device)
        base_np = base.numpy()
        base_np[:, 2] = 0.8
        state = robot.forward_kinematics(
            robot.state(
                q=wp.array(q, dtype=wp.float32, device=device),
                T_world_base=wp.array(base_np, dtype=wp_vec7, device=device),
            )
        )
        poses = state.T_world_link.numpy()[
            :, [robot.spec.link_names.index(name) for name in helper.human_joint_names]
        ]
        targets = [
            wp.array(
                np.repeat(frame[None], batch, axis=0), dtype=wp_vec7, device=device
            )
            for frame in poses
        ]
        return lambda i: helper.solve(targets[i % len(targets)]), {
            "model": "Unitree G1",
            "workload": "29 DOF, 14 pose targets, 9 LM iterations, 4 to 1 candidates; generated feasible motion",
            "unit": "per frame",
        }

    model = (
        assets
        / "robots/robot_description/end_effectors/shadow_hand/shadow_hand_right.urdf"
    )
    robot = Robot.load(
        model,
        load_meshes=True,
        load_collision_spheres=True,
        collision_spheres_path=assets
        / "robots/collision_spheres/shadow_hand_right/collision_spheres.yaml",
    )
    meshes = robot.spec.get_link_meshes("visual")
    points, indices = [], []
    for link in ("thdistal", "ffdistal", "mfdistal", "rfdistal", "lfdistal"):
        vertices = meshes[link].vertices
        points.extend(vertices[np.linspace(0, len(vertices) - 1, 32, dtype=int)])
        indices.extend([robot.spec.link_names.index(link)] * 32)
    rows = batch * 4
    contacts = ContactVar(
        np.array(points, np.float32),
        np.array(indices, np.int32),
        rows,
        5,
        0.0,
        seed=42,
        device=device,
    )
    base = np.tile(np.array([0.06, 0, 0.0, 1, 0, 0, 0], np.float32), (rows, 1))
    base[:, :3] += rng.normal(0, 0.015, (rows, 3))
    state = robot.state(
        q=wp.array(
            np.clip(
                np.full((rows, robot.spec.num_actuated_joints), 0.2),
                *robot.spec.actuated_joint_limits.T,
            ).astype(np.float32),
            device=device,
        ),
        T_world_base=wp.array(base, dtype=wp_vec7, device=device),
    )
    state.clamp_q_on_integrate = True
    initial = VarValues(robot=state, contacts=contacts)
    scene = WarpScene(1, device).add(
        MeshGeom(
            [trimesh.creation.cylinder(radius=0.035, height=0.19)], np.array([0, 1])
        )
    )
    query = {
        "robot": robot,
        "warp_meshes": scene,
        "num_contact_points": 5,
        "points_var_key": "contacts",
    }
    distance = SceneDistanceTask(weight=100.0, residual_mode="abs", **query)
    terms = [
        distance,
        ForceClosureTask(weight=1.0, distance_task=distance, **query),
        PositionLimit(robot=robot, weight=1.0),
        SceneCollisionTask(
            robot=robot,
            scene=scene,
            scene_indices=wp.zeros(1, dtype=wp.int32, device=device),
            weight=100.0,
        ),
    ]
    config = PopulationSolverConfig(
        num_iters=64,
        num_candidates=[4, 1],
        select_at=[64],
        samplers=[ContactSamplerConfig(seed=42)],
        sample_at=range(0, 64, 8),
        optimizer=LMOptimizerConfig(use_parallel_terms=False),
        cuda_graph_mode="full",
    )
    helper = PopulationSolver([terms, terms], config, device)
    seeds = initial.clone()
    reset_mask = wp.ones(rows, dtype=wp.int32, device=device)

    def solve_grasp(_: int):
        initial.accept(reset_mask, seeds)
        initial.invalidate()
        return helper.solve(initial)

    return solve_grasp, {
        "model": "Shadow Hand",
        "workload": "Floating-hand mesh grasp, cylinder, 5 contacts, 64 LM iterations, 4 candidates; contact resampling every 8 iterations",
        "unit": "batch solve",
        "includes": "distance, force closure, joint limits, object collision; excludes arm planning and physics validation",
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--task",
        choices=(
            "ik",
            "motion-planning",
            "grasping-optimization",
            "hand-retargeting",
            "humanoid-retargeting",
        ),
        required=True,
    )
    parser.add_argument("--batches", default="1,10,100,1000,2000")
    parser.add_argument("--runs", type=int, default=20)
    parser.add_argument("--warmup", type=int, default=5)
    parser.add_argument("--asset-root", type=Path, required=True)
    parser.add_argument("--source-root", type=Path, required=True)
    parser.add_argument("--source-commit")
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    wp.init()
    result = {
        "task": args.task,
        "gpu": wp.get_device("cuda:0").name,
        "warp": wp.__version__,
        "commit": args.source_commit
        or subprocess.check_output(
            ["git", "-C", str(args.source_root), "rev-parse", "HEAD"], text=True
        ).strip(),
        "date": datetime.now(timezone.utc).isoformat(),  # noqa: UP017 (GPU environment uses Python 3.10)
        "runs": args.runs,
        "warmup": args.warmup,
        "statistic": "median CUDA-synchronized wall time, seconds",
        "scope": "solver call; excludes construction, warmup and host input preparation",
        "script_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        "steps": [],
    }
    for batch in map(int, args.batches.split(",")):
        solve, details = workload(args.task, batch, args.asset_root, args.source_root)
        for i in range(args.warmup):
            solve(i)
        wp.synchronize_device("cuda:0")
        samples = []
        for i in range(args.runs):
            wp.synchronize_device("cuda:0")
            start = time.perf_counter()
            output = solve(i + args.warmup)
            wp.synchronize_device("cuda:0")
            samples.append(time.perf_counter() - start)
        values = (
            output.q.numpy()
            if args.task == "ik"
            else output[0].q.numpy()
            if args.task == "motion-planning"
            else output[0].get("robot").q.numpy()
            if args.task == "grasping-optimization"
            else output.numpy()
        )
        assert values.shape[0] == batch and np.isfinite(values).all(), values.shape
        step = {
            "batch": batch,
            "seconds": float(np.median(samples)),
            "p95_seconds": float(np.percentile(samples, 95)),
            "samples_seconds": samples,
            **details,
        }
        result["steps"].append(step)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, indent=2) + "\n")
        print(
            f"{args.task} batch={batch}: {step['seconds']:.6f} s (median, {args.runs} runs)",
            flush=True,
        )
        del solve, output
        gc.collect()


if __name__ == "__main__":
    main()
