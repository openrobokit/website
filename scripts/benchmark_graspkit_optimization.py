"""Measure a warmed 1,024-grasp batch without modifying the GraspKit checkout."""

import argparse
import json
import math
import statistics
import time
from dataclasses import asdict
from pathlib import Path

import numpy as np
import torch
import warp as wp

from graspkit.assets.scene_descriptions import dex1b_v0_5_0
from graspkit.configs.experiment_config import GraspOptimConfig
from graspkit.configs.robot.sharpa import sharpa_right
from graspkit.scene.scene_description import SceneDescription
from graspkit.stages.grasp_optim import WarpGraspOptimizer
from graspkit.stages.grasp_optim.warp_optimizer import LM_ITERS, LM_NUM_CANDIDATES


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--optimizer-backend", choices=("warp_gd", "warp_lm"), required=True)
    parser.add_argument("--scene-geom-backend", choices=("mesh", "sdf_volume"), required=True)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    torch.set_num_threads(4)
    device = torch.device("cuda:0")
    hardware = torch.cuda.get_device_name(device)
    assert "RTX 4090" in hardware
    registry = SceneDescription.load_scene_descriptions_msgpack(str(dex1b_v0_5_0.TABLETOP_MINI_PATH))
    ids = sorted(registry)
    scenes = [registry[ids[i]] for i in np.linspace(0, len(ids) - 1, 32, dtype=int)]
    for scene in scenes:
        for mesh in scene.meshes.values():
            path = Path(mesh.collision_mesh_path)
            if not path.is_absolute():
                mesh.collision_mesh_path = str(Path.home() / ".graspkit" / path)
            assert Path(mesh.collision_mesh_path).is_file(), mesh.collision_mesh_path
    cfg = GraspOptimConfig(
        optimizer_backend=args.optimizer_backend, scene_geom_backend=args.scene_geom_backend, num_iters=6000,
        num_contact_points=5, spen_threshold=0,
        front_theta_lower=-math.pi, front_theta_upper=math.pi,
    )
    optimizer = WarpGraspOptimizer(cfg, sharpa_right, device)
    torch.manual_seed(42)
    np.random.seed(42)
    print(f"WARMUP: 32 scenes × 32 samples = 1024 grasps; {hardware}", flush=True)
    optimizer.optimize(scenes, 32)
    timings = []
    for repeat in range(3):
        torch.manual_seed(42 + repeat)
        np.random.seed(42 + repeat)
        torch.cuda.synchronize()
        wp.synchronize()
        started = time.perf_counter()
        grasps = optimizer.optimize(scenes, 32)
        torch.cuda.synchronize()
        wp.synchronize()
        elapsed = time.perf_counter() - started
        assert grasps.shape[:2] == (32, 32) and torch.isfinite(grasps).all()
        timings.append(elapsed)
        print(f"RUN {repeat + 1}: 1024 grasps in {elapsed:.6f} s", flush=True)
    np.save(args.output / "grasps.npy", grasps.cpu().numpy())
    SceneDescription.save_scene_descriptions_msgpack({s.scene_id: s for s in scenes}, str(args.output / "scenes.msgpack"))
    result = {
        "batch": 1024, "scenes": 32, "samples_per_scene": 32,
        "hardware": "RTX 4090", "device_name": hardware,
        "seconds": statistics.median(timings), "runs_seconds": timings,
        "scope": "warm optimize() call including initialization and GPU synchronization; asset loading, SDF baking, and JIT warmup excluded",
        "solver_iterations": LM_ITERS if cfg.optimizer_backend == "warp_lm" else cfg.num_iters,
        "candidates_per_grasp": LM_NUM_CANDIDATES if cfg.optimizer_backend == "warp_lm" else 1,
        "config": asdict(cfg), "robot": "sharpa_right", "scene_ids": [s.scene_id for s in scenes],
        "torch_version": torch.__version__, "warp_version": wp.__version__,
        "graspkit_revision": json.loads((args.output / "source.json").read_text())["graspkit_revision"],
    }
    (args.output / "timing.json").write_text(json.dumps(result, indent=2) + "\n")
    print(f"PASS: median {result['seconds']:.6f} s; 1024 finite grasps saved", flush=True)


if __name__ == "__main__":
    main()
