// graspkit documentation. Written by scripts/import_docs.py; the
// hand-written groups outside the GENERATED markers are edited here.
// Loaded only by scripts/build_docs.py -- the browser reads the static
// pages it emits, never this file.
window.RK_DOCS = window.RK_DOCS || {};
window.RK_DOCS.graspkit = {
    title: 'graspkit',
    lede: "Manipulation across robot embodiments, including grippers and dexterous hands.",
    groups: [
      // BEGIN GENERATED graspkit DOCS (scripts/import_docs.py)
{
  "name": "User Guide",
  "items": [
    {
      "id": "overview",
      "nav": "Overview",
      "h": "Overview",
      "body": "<p><img src=\"/assets/docs/graspkit/assets/graspkit-banner.webp\" alt=\"GraspKit\"></p><p>GraspKit is an end-to-end toolkit for manipulation across various robot embodiments, including grippers and dexterous hands. It synthesizes grasps, plans trajectories, trains policies, and deploys them in simulation or on real robots; it is built on top of <a class=\"inline\" href=\"https://github.com/openrobokit/robokit\">RoboKit</a>.</p><p><a class=\"inline\" href=\"https://openrobokit.com/graspkit/\"><img src=\"/assets/docs/graspkit/assets/showcase/real-world.webp\" alt=\"Robot hands grasping objects during a real-world run\"></a></p><p><em>Real-world grasping with dexterous robot hands in San Diego.</em></p><h3>Key features</h3><ul><li><strong>Fast grasp optimization.</strong> GPU optimizers refine thousands of grasp seeds per batch against cached scene geometry. See <a class=\"inline\" href=\"/docs/graspkit/grasp-optim/\">Grasp optimization</a>.</li><li><strong>Performant policy training.</strong> Train grasp policies on processed point clouds and successful trajectories, with multi-GPU support. See <a class=\"inline\" href=\"/docs/graspkit/training/\">Training</a>.</li><li><strong>Across embodiments.</strong> Use grippers and dexterous hands in arm, hand, and humanoid configurations. See the <a class=\"inline\" href=\"/docs/graspkit/ref-robot-hands/\">robot catalog</a>.</li><li><strong>Simulation validation.</strong> Filter and motion-plan grasps, then test them in physics simulation. See <a class=\"inline\" href=\"/docs/graspkit/sim-deploy/\">Simulation deployment</a>.</li><li><strong>Real-world validation.</strong> Run trained policies on xArm and Vega robots with calibrated cameras and collision-checked motions. See <a class=\"inline\" href=\"/docs/graspkit/real-deploy/\">Real deployment</a>.</li></ul><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th><a class=\"inline\" href=\"/docs/graspkit/grasp-optim/\"><img src=\"/assets/docs/graspkit/assets/features/grasp-optimization.webp\" alt=\"Fast grasp optimization\"></a></th><th><a class=\"inline\" href=\"/docs/graspkit/training/\"><img src=\"/assets/docs/graspkit/assets/features/policy-learning.webp\" alt=\"Policy training\"></a></th></tr></thead><tbody><tr><td><strong><a class=\"inline\" href=\"/docs/graspkit/grasp-optim/\">Fast grasp optimization</a></strong></td><td><strong><a class=\"inline\" href=\"/docs/graspkit/training/\">Performant policy training</a></strong></td></tr><tr><td><a class=\"inline\" href=\"/docs/graspkit/ref-robot-hands/\"><img src=\"/assets/docs/graspkit/assets/features/embodiments.webp\" alt=\"All arms, all hands\"></a></td><td><a class=\"inline\" href=\"/docs/graspkit/real-deploy/\"><img src=\"/assets/docs/graspkit/assets/features/sim-to-real.webp\" alt=\"Real-world robustness\"></a></td></tr><tr><td><strong><a class=\"inline\" href=\"/docs/graspkit/ref-robot-hands/\">All arms, all hands</a></strong></td><td><strong><a class=\"inline\" href=\"/docs/graspkit/real-deploy/\">Real-world robustness</a></strong></td></tr></tbody></table><h3>How it works</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Stage</th><th>Role</th><th>Read more</th></tr></thead><tbody><tr><td>Scene descriptions</td><td>Objects, scales and poses on a table, as msgpack.</td><td><a class=\"inline\" href=\"/docs/graspkit/ref-scene-descriptions/\">Scene descriptions</a></td></tr><tr><td>Grasp optimization</td><td>Energy minimization to grasp poses, then filters, motion planning and sim validation.</td><td><a class=\"inline\" href=\"/docs/graspkit/grasp-optim/\">Grasp optimization</a></td></tr><tr><td>Rendering</td><td>Point-cloud observations of the same scenes, from calibrated cameras.</td><td><a class=\"inline\" href=\"/docs/graspkit/pipeline/\">Pipeline</a></td></tr><tr><td>Training</td><td>A CVAE policy that maps an object point cloud to pre-grasp, grasp and post-grasp poses.</td><td><a class=\"inline\" href=\"/docs/graspkit/training/\">Training</a></td></tr><tr><td>Deployment</td><td>Policy inference plus trajectory building, in sim or on hardware.</td><td><a class=\"inline\" href=\"/docs/graspkit/sim-deploy/\">Sim</a>, <a class=\"inline\" href=\"/docs/graspkit/real-deploy/\">real</a></td></tr></tbody></table><p>For the graph of stages and the artifacts between them, see <a class=\"inline\" href=\"/docs/graspkit/concepts-overview/\">Core overview</a>.</p><h3>Quick links</h3><ul><li><a class=\"inline\" href=\"/docs/graspkit/quickstart/\">Quickstart</a></li><li><a class=\"inline\" href=\"/docs/graspkit/install/\">Installation</a></li><li><a class=\"inline\" href=\"https://github.com/openrobokit/graspkit\">GitHub</a></li><li><a class=\"inline\" href=\"https://openrobokit.com/graspkit/\">Website</a></li></ul>"
    },
    {
      "id": "quickstart",
      "nav": "Quickstart",
      "h": "Quickstart",
      "body": "<h3>Try it without installing</h3><p>Run this to start the interactive grasp gallery:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uvx --from graspkit python -m graspkit.gallery.grasp_optim</pre></div><p>Pick a hand, arm, and object. Press <em>Optimize</em> to generate grasps, then browse them with the <em>Grasp</em> slider. The gallery caches results for the next visit.</p><p><img src=\"/assets/docs/graspkit/assets/gallery/grasp_optim.webp\" alt=\"The grasp gallery switching from xHand to a Robotiq gripper\"></p><h3>Optimize one grasp</h3><p>After <a class=\"inline\" href=\"/docs/graspkit/install/\">installing</a>, run the smallest grasp optimization example:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run src/graspkit/examples/grasp_optim/01_basic.py</pre></div><p>It optimizes xHand grasps for one YCB object and opens a <a class=\"inline\" href=\"https://viser.studio\">Viser</a> page to browse the results. Grasp optimization needs a CUDA GPU.</p><h3>More examples</h3><p>The scripts below are runnable. Paths are relative to the repository root.</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Directory</th><th>Scripts</th></tr></thead><tbody><tr><td><a class=\"inline\" href=\"https://github.com/openrobokit/graspkit/tree/main/src/graspkit/examples/grasp_optim/\"><code>src/graspkit/examples/grasp_optim</code></a></td><td><a class=\"inline\" href=\"https://github.com/openrobokit/graspkit/blob/main/src/graspkit/examples/grasp_optim/01_basic.py\"><code>01_basic.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/graspkit/blob/main/src/graspkit/examples/grasp_optim/02_table.py\"><code>02_table.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/graspkit/blob/main/src/graspkit/examples/grasp_optim/03_arm.py\"><code>03_arm.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/graspkit/blob/main/src/graspkit/examples/grasp_optim/04_sim_valid.py\"><code>04_sim_valid.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/graspkit/blob/main/src/graspkit/examples/grasp_optim/05_table_sim_valid.py\"><code>05_table_sim_valid.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/graspkit/blob/main/src/graspkit/examples/grasp_optim/06_arm_sim_valid.py\"><code>06_arm_sim_valid.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/graspkit/blob/main/src/graspkit/examples/grasp_optim/07_mj_sim_valid.py\"><code>07_mj_sim_valid.py</code></a></td></tr><tr><td><a class=\"inline\" href=\"https://github.com/openrobokit/graspkit/blob/main/scripts/launch.py\"><code>scripts/launch.py</code></a></td><td>Run an experiment from grasp optimization through policy training. See <a class=\"inline\" href=\"/docs/graspkit/pipeline/\">The full pipeline</a>.</td></tr></tbody></table><p>Example usage:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run src/graspkit/examples/grasp_optim/02_table.py</pre></div>"
    },
    {
      "id": "install",
      "nav": "Installation",
      "h": "Installation",
      "body": "<p>GraspKit needs Python 3.10–3.14; the <code>maniskill</code> extra needs 3.10–3.12 and <code>spconv</code> 3.10–3.13. Grasp optimization, rendering, and training need a CUDA GPU.</p><div class=\"doc-tabs\"><div class=\"tabs\"><button type=\"button\" class=\"is-active\">uv</button><button type=\"button\">pip</button></div><div class=\"doc-tabs__pane is-active\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv add graspkit</pre></div></div><div class=\"doc-tabs__pane\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>pip install graspkit</pre></div></div></div><h3>From source</h3><div class=\"doc-tabs\"><div class=\"tabs\"><button type=\"button\" class=\"is-active\">uv</button><button type=\"button\">pip</button></div><div class=\"doc-tabs__pane is-active\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv add git+https://github.com/openrobokit/graspkit.git</pre></div></div><div class=\"doc-tabs__pane\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>pip install git+https://github.com/openrobokit/graspkit.git</pre></div></div></div><p>To work on GraspKit itself, follow the <a class=\"inline\" href=\"/docs/graspkit/dev/#setup\">Development Guide</a>.</p><h3>PyTorch builds</h3><p><code>uv sync</code> installs the <code>dev</code> and <code>pt-cu126</code> groups by default. The PyTorch groups conflict with each other, so select another one explicitly:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --no-default-groups --group pt-cu128</pre></div><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Group</th><th>What it adds</th></tr></thead><tbody><tr><td><code>pt-cu126</code></td><td>PyTorch + torchvision for CUDA 12.6 (default).</td></tr><tr><td><code>pt-cu118</code>, <code>pt-cu128</code></td><td>The same for CUDA 11.8 / 12.8.</td></tr><tr><td><code>pt-cpu</code></td><td>CPU-only PyTorch.</td></tr><tr><td><code>dev</code></td><td>ipython, pytest, <code>robot_descriptions</code> (default).</td></tr></tbody></table><h3>Extras</h3><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Extra</th><th>What it adds</th></tr></thead><tbody><tr><td><code>maniskill</code></td><td>ManiSkill, for simulation, rendering and grasp evaluation (Python 3.10–3.12).</td></tr><tr><td><code>spconv</code></td><td>spconv, for the default <code>spconv</code> vision encoder (Python 3.10–3.13).</td></tr><tr><td><code>torchvision</code></td><td>torchvision, for the <code>rgb_resnet</code> vision encoders.</td></tr><tr><td><code>sam2</code></td><td>SAM 2, for the segmentation step of <a class=\"inline\" href=\"/docs/graspkit/real-deploy/\">deployment</a>.</td></tr><tr><td><code>xarm</code></td><td><code>retargetingkit[realsense,xarm,ability]</code> + open3d, for the xArm rigs (Python 3.10).</td></tr><tr><td><code>vega</code></td><td><code>retargetingkit[xarm,ability,dexmate]</code> + pyzmq + open3d, for the Vega humanoid.</td></tr><tr><td><code>data-process</code></td><td>coacd, fast-simplification, for asset processing.</td></tr></tbody></table><p>The <code>sam2</code> extra uses a wheel from a separate index:</p><div class=\"doc-tabs\"><div class=\"tabs\"><button type=\"button\" class=\"is-active\">uv</button><button type=\"button\">pip</button></div><div class=\"doc-tabs__pane is-active\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv add \"graspkit[sam2]\" --index https://jianglongye.github.io/torch_packages_builder</pre></div></div><div class=\"doc-tabs__pane\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>pip install \"graspkit[sam2]\" --extra-index-url https://jianglongye.github.io/torch_packages_builder</pre></div></div></div><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra sam2 --extra vega scripts/deploy/deploy.py --help</pre></div><h3>Assets and credentials</h3><p><code>import graspkit</code> downloads nothing. Assets are fetched when the module that needs them is imported: graspkit's scenes, objects and calibration files come from the HuggingFace dataset <code>openrobokit/graspkit</code> into <code>~/.graspkit/assets/&lt;revision&gt;</code>, and robot URDFs, meshes and collision spheres come from <code>openrobokit/robokit</code> into <code>~/.robokit/assets/&lt;rev&gt;</code>.</p><p>Data and logs live in <code>~/.graspkit/data</code> and <code>~/.graspkit/logs</code>, created on import. <code>graspkit.link()</code> symlinks both into the repo for browsing.</p><ul><li>A <code>.env</code> file with <code>GRASPKIT_S3_ROOT</code>, <code>FSSPEC_S3_ENDPOINT_URL</code>, <code>FSSPEC_S3_KEY</code> and <code>FSSPEC_S3_SECRET</code> is needed only for the <code>_s3</code> experiments; it is loaded on import.</li><li><code>GRASPKIT_EXCLUDED_GPUS</code> lists GPU ids that <code>scripts/launch.py</code> must never use, such as <code>4,5</code>.</li><li><code>graspkit.assets.REVISION</code> pins the asset revision; delete <code>~/.graspkit/assets/&lt;revision&gt;/.done/</code> to re-download.</li></ul><h3>Verify</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=0 uv run pytest tests/\nuv run src/graspkit/examples/grasp_optim/01_basic.py</pre></div><p>The example opens a Viser page with optimized xHand grasps. Next: the <a class=\"inline\" href=\"/docs/graspkit/quickstart/\">Quickstart</a>.</p>"
    },
    {
      "id": "grasp-optim",
      "nav": "Grasp Optimization",
      "h": "Grasp Optimization (grasp_optim)",
      "body": "<table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th><img src=\"/assets/docs/graspkit/assets/guide/sharpa_optim.webp\" alt=\"A floating Sharpa hand optimizing a grasp on a cube\"></th><th><img src=\"/assets/docs/graspkit/assets/guide/xarm7_sharpa_optim.webp\" alt=\"An xArm7 + Sharpa optimizing arm and hand joints together\"></th></tr></thead><tbody><tr><td>A floating hand optimizing a grasp.</td><td>An arm and hand optimized together on a fixed base.</td></tr></tbody></table><p><code>graspkit.stages.grasp_optim</code> synthesizes grasps on a floating or fixed base. It optimizes them on the GPU (Warp) with a gradient-descent or Levenberg-Marquardt backend, then plans grasp trajectories and keeps only the grasps that pass simulation validation.</p><p>This tutorial covers the main grasp optimization workflows. The logic lives in <code>[src/graspkit/stages/grasp_optim](../../src/graspkit/stages/grasp_optim/)</code>; runnable CLIs for optimization, validation, and visualization are in <code>[scripts/stages/grasp_optim](../../scripts/stages/grasp_optim/)</code>.</p><h3>How Grasp Optimization Works</h3><ol><li>Sample initial hand poses around the target object.</li><li>Run the grasp optimizer (<code>warp_gd</code> or <code>warp_lm</code> backend) to get 3-frame grasps (pre-grasp, grasp, post-grasp), with a floating or fixed base.</li><li>If filters are enabled (hand-axis cone, contact-avoid, penetration), mark the grasps that fail them. Filters run first inside the traj builder.</li><li>The traj builder motion-plans the 3 frames into grasp trajectories.</li><li>Simulation validation keeps the grasps that pass filters, planning and sim.</li></ol><div class=\"mermaid\">flowchart TD\n    INPUT[Input&lt;br/&gt;&lt;br/&gt;Scene description&lt;br/&gt;Robot config]\n\n    subgraph OPTIM[Grasp optimization]\n        direction TB\n        SAMPLE[1. Sampler &lt;br/&gt;→ initial hand poses]\n        OPT[\"2. GraspOptimizer (warp_gd / warp_lm)&lt;br/&gt;→ 3-frame grasps\"]\n        FILTER[\"3. Filters (optional)\"]\n        PLAN[\"4. TrajBuilder&lt;br/&gt;→ grasp traj\"]\n        SIM[\"5. Simulation validation\"]\n        SAMPLE --&gt; OPT --&gt; FILTER --&gt; PLAN --&gt; SIM\n    end\n\n    OUTPUT[Return grasps]\n\n    INPUT --&gt; SAMPLE\n    SIM --&gt; OUTPUT</div><h3>Quick Start</h3><p>Prerequisites: <code>uv sync --extra maniskill --extra spconv</code>, a CUDA GPU. Assets (scenes, object meshes, robot URDFs) download automatically on first use.</p><p>Run grasp optimization for a registered experiment config (here xHand on the dex1b v0.5 tabletop mini set) with <code>scripts/launch.py</code>.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run scripts/launch.py xhand_right_dex1b_v0_5_mini_tabletop \\\n    --steps optimize_grasps \\\n    --grasp_optim.max_scenes 32 \\\n    --grasp_output_dir data/optim_data/xhand_grasps/quickstart</pre></div><p><code>--grasp_optim.max_scenes 32</code> keeps it to about two minutes on one GPU; drop it to run all 5500 scenes.</p><p>The sections below build the same stage step by step in Python.</p><h4>Sampling initial poses</h4><p><img src=\"/assets/docs/graspkit/assets/guide/sharpa_init.webp\" alt=\"Initial Sharpa hand poses sampled around a mustard bottle\"></p><p>Init samples drawn with the palm-down cone below: red is the hand axis (<code>palm_forward</code>), gray is the target (world -z). Both start at the wrist; the label is their angle, always within the 60 deg cone.</p><p><code>optimize()</code> starts from the optimizer's sampler; call it directly to inspect the initial poses:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from dataclasses import replace\n\nimport torch\n\nfrom graspkit.configs.robot.xhand import xhand_right\nfrom graspkit.gallery.grasp_optim import gallery_scene\nfrom graspkit.stages.grasp_optim import GraspOptimConfig, SceneGeom, WarpGraspOptimizer\n\nscene = gallery_scene(\"ycb/mustard_bottle\")  # SceneDescription: the bottle on a table whose top is z=0\ndevice = torch.device(\"cuda:0\")\n\n# Customize the approach\nconfig = GraspOptimConfig(\n    distance_lower=0.05,  # wrist 5-15 cm from the closest object point\n    distance_upper=0.15,\n    hand_axis=\"palm_forward\",  # hand_coord_spec axis to constrain\n    hand_axis_target=(0.0, 0.0, -1.0),  # toward world -z\n    filter_hand_axis_max_angle_deg=60.0,  # cone half-angle\n)\noptimizer = WarpGraspOptimizer(config, xhand_right, device)\ninit_qpos = optimizer.sampler.sample(SceneGeom([scene], device=device), num_samples_per_scene=8)</pre></div><h4>Grasp optimization</h4><p><code>optimize()</code> samples init poses with the same sampler, then minimizes the grasp energy on the GPU. Reusing <code>scene</code> and the palm-down <code>config</code> from above:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>config = replace(config, optimizer_backend=\"warp_gd\")  # or \"warp_lm\" (Levenberg-Marquardt)\noptimizer = WarpGraspOptimizer(config, xhand_right, device)\ngrasp_qpos = optimizer.optimize([scene], num_samples_per_scene=8)  # (1, 8, 18)</pre></div><h4>Filtering grasps</h4><p>Grasp filters live in <code>GraspTrajBuilderConfig</code> and run first inside <code>GraspTrajBuilder.build()</code>. They only mark grasps, they don't drop them. Call <code>filter_grasps</code> to run them alone, without motion planning:</p><p><img src=\"/assets/docs/graspkit/assets/guide/grasp_filters.png\" alt=\"A passing and a failing xHand grasp for each filter: contact-avoid, penetration, hand axis\"></p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from graspkit.configs.experiment_config import GraspTrajBuilderConfig\nfrom graspkit.datasets.graspkit_data import GraspKitData\nfrom graspkit.stages.grasp_traj_build import GraspTrajBuilder\n\ntraj_builder = GraspTrajBuilder(\n    GraspTrajBuilderConfig(\n        floating_base_robot_config=xhand_right,\n        contact_avoid_filter=True,  # contact links closer to the object than their paired avoid links\n        pen_filter=True,  # hand spheres overlap the object by at most pen_filter_threshold\n        pen_filter_threshold=0.005,\n        hand_axis=\"palm_forward\",  # palm normal within 60 deg of world -z (top-down grasps)\n        hand_axis_target=(0.0, 0.0, -1.0),\n        filter_hand_axis_max_angle_deg=60.0,\n    ),\n    device,\n)\nbatch = GraspKitData(scene_ids=[scene.scene_id], scene_descriptions=[scene], grasp_qpos=grasp_qpos)\nsuccess, metrics = traj_builder.filter_grasps(batch, torch.ones(grasp_qpos.shape[:2], dtype=torch.bool, device=device))\nkept = grasp_qpos[success]  # (n_kept, dofs)</pre></div><h4>Building grasp trajectories</h4><p><code>build()</code> runs the filters above, then motion-plans a pre-grasp -&gt; grasp -&gt; lift trajectory for every grasp. Rejected grasps are still planned; drop them with <code>filter_success</code>:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>traj_builder = GraspTrajBuilder(\n    GraspTrajBuilderConfig(floating_base_robot_config=xhand_right, contact_avoid_filter=True), device\n)\nbatch = GraspKitData(scene_ids=[scene.scene_id], scene_descriptions=[scene], grasp_qpos=grasp_qpos)\nbatch, filter_success = traj_builder.build(batch)</pre></div><h4>Simulation validation</h4><p>The sim evaluator rolls out each planned trajectory in ManiSkill, pokes the object with external forces, and reports which grasps still lift it:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from graspkit.configs.env_config import MsEnvConfig\nfrom graspkit.configs.experiment_config import EnvConfig\nfrom graspkit.envs import build_env\n\nevaluator = build_env(\n    EnvConfig(\n        ms_env_config=MsEnvConfig(robot_uid=\"xhand_right_floating_base\"),\n        load_scenes=True,\n        control_freq=50,\n        object_mass=1.0,\n        target_lift_dist=0.08,\n        num_envs=8, \n        num_perturbations=4, \n        perturbation_magnitude=5.0, \n        perturbation_step_range=(-25, -5), \n    ),\n    xhand_right,\n    device,\n)\neval_success = evaluator.evaluate(batch)[\"success\"].to(device)  # (1, 8) bool\nkept = grasp_qpos[filter_success &amp; eval_success]  # (n_kept, dofs)\nevaluator.close()</pre></div><h3>Outputs</h3><p>One <code>{scene_id}.h5</code> per scene with <code>grasp_qpos</code>, <code>pre_grasp_qpos</code>, <code>post_grasp_qpos</code> of shape <code>(N, D)</code>: <code>D</code> = hand joints (fixed base) or xyz + euler rxyz + hand joints (floating). <code>.optim_complete</code> marks the stage done. See <a class=\"inline\" href=\"/docs/graspkit/ref-data-format/\">data_format.md</a>.</p><h3>Code Map</h3><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Code</th><th>Role</th></tr></thead><tbody><tr><td><code>src/graspkit/stages/grasp_optim/sampler.py</code></td><td>Init pose sampler</td></tr><tr><td><code>src/graspkit/stages/grasp_optim/warp_optimizer.py</code></td><td><code>WarpGraspOptimizer</code></td></tr><tr><td><code>src/graspkit/stages/grasp_filters.py</code></td><td>Grasp filters (<code>Ori</code>, <code>Pen</code>, <code>ContactAvoid</code>)</td></tr><tr><td><code>src/graspkit/stages/grasp_traj_build/builder.py</code></td><td><code>GraspTrajBuilder</code>: filters + motion planning</td></tr><tr><td><code>src/graspkit/envs/</code></td><td><code>build_env</code> sim evaluator</td></tr><tr><td><code>scripts/launch.py</code></td><td>Runs an experiment config end to end</td></tr></tbody></table>"
    },
    {
      "id": "training",
      "nav": "Policy Training",
      "h": "Policy Training (train)",
      "body": "<div class=\"mermaid\">%%{init: {\"flowchart\": {\"wrappingWidth\": 300}}}%%\nflowchart LR\n    PC[Scene point cloud&lt;br/&gt;N × 3]\n    ENC[Vision encoder&lt;br/&gt;PointNet / SpConv]\n    EPS([\"noise ε ~ N(0, I)\"])\n    GT[GT grasps]\n    GEN[\"Generator&lt;br/&gt;CVAE: encoder + decoder&lt;br/&gt;Flow: velocity network\"]\n    OUT[Generated grasps]\n\n    PC --&gt; ENC --&gt;|scene feature| GEN\n    EPS --&gt; GEN\n    GT -.-&gt;|train only| GEN\n    GEN --&gt; OUT</div><p><code>GraspPolicy</code> maps a scene point cloud to pre-grasp, grasp, and post-grasp configurations, trained on successful grasp trajectories.</p><p>Code: <code>scripts/stages/train/train.py</code> (CLI), <code>stages/trainer.py</code> (loop), <code>datasets/grasp_dataset.py</code> (data), <code>models/grasp_policy.py</code> (model).</p><p>For every training, dataset, and policy parameter, see the <a class=\"inline\" href=\"/docs/graspkit/api-training/\">training</a> and <a class=\"inline\" href=\"/docs/graspkit/api-policy/\">policy</a> API.</p><h3>Quick start</h3><p>Prerequisites: <code>uv sync --extra maniskill --extra spconv</code>, a CUDA GPU, and an experiment whose <code>processed_data_path</code> exists. Normally <code>render_data</code>, <code>optimize_grasps</code>, and <code>process_sim_data</code> produce that file.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre># Run only training from a registered experiment.\nuv run scripts/launch.py xhand_right_dex1b_v0_5_mini_tabletop --gpus 0 --steps train\n\n# Multi-GPU training (this experiment defaults to train_single_gpu=True).\nuv run scripts/launch.py xhand_right_dex1b_v0_5_mini_tabletop --gpus 0,1,2,3 --steps train \\\n  --no_train_single_gpu\n\n# Override nested dataclass fields through tyro.\nuv run scripts/launch.py xhand_right_dex1b_v0_5_mini_tabletop --gpus 0 --steps train \\\n  --trainer.total_iters 20000 \\\n  --trainer.eval_freq 5000 \\\n  --trainer.save_freq 5000</pre></div><p>Training writes TensorBoard logs and checkpoints under <code>logs/train/&lt;experiment_name&gt;/</code>. A completed run writes <code>.train_complete</code>; a later launch skips the stage while that marker exists.</p><h3>Minimal training loop</h3><p>The experiment config holds the three pieces: <code>dataset</code> (<code>DatasetConfig</code>), <code>agent</code> (<code>GraspPolicyConfig</code>), and <code>trainer</code> (<code>TrainerConfig</code>).</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>import torch\nfrom torch.utils.data import DataLoader\n\nfrom graspkit.configs.experiment import build_experiment_config\nfrom graspkit.datasets.grasp_dataset import GraspDataset\nfrom graspkit.models.grasp_policy import build_grasp_policy\n\ncfg = build_experiment_config(\"xhand_right_dex1b_v0_5_mini_tabletop\")\ndataset = GraspDataset(cfg.dataset, cfg.processed_data_path, cfg.scene_description_path, split=\"train\")\nloader = DataLoader(dataset, batch_size=cfg.trainer.batch_size, shuffle=True, num_workers=4, drop_last=True)\npolicy = build_grasp_policy(cfg.agent, cfg.robot_config, \"cuda\")\noptimizer = torch.optim.AdamW(policy.parameters(), lr=cfg.trainer.lr)\n\nfor batch in loader:\n    obs = {k: v.cuda() for k, v in batch[\"observations\"].items()}\n    loss = policy(obs, batch[\"actions\"].cuda())[\"loss\"]\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n\npolicy.eval()\nwith torch.no_grad():\n    grasps = policy.get_action(obs, num_samples_per_scene=8)  # (B, 8, 3, D): pre / grasp / post</pre></div><p>The real <code>Trainer</code> (<code>src/graspkit/stages/trainer.py</code>) adds LR scheduling, DDP, checkpoints, TensorBoard, and simulation evaluation through <code>trainer.evaluator</code>.</p><h3>Evaluate a checkpoint</h3><p>Evaluation samples one trajectory per scene, runs grasp filtering and motion planning, then rolls the trajectory out in the configured simulator:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run scripts/stages/train/train.py xhand_right_dex1b_v0_5_mini_tabletop \\\n  --trainer.eval_only \\\n  --ckpt_path logs/train/xhand_right_dex1b_v0_5_mini_tabletop/checkpoints/best_eval_success_rate.pt</pre></div><p>The command reports simulation success, penetration pass rate, and their joint rate. Per-scene results are saved to <code>logs/eval/&lt;experiment_name&gt;.json</code>.</p>"
    },
    {
      "id": "pipeline",
      "nav": "Pipeline",
      "h": "The Full Pipeline (launch.py)",
      "body": "<p><code>scripts/launch.py</code> turns a set of scene descriptions into a trained grasp policy. One experiment name selects an <code>ExperimentConfig</code> whose <code>steps</code> run in order: render point-cloud observations, synthesize and validate grasps, join both into a training dataset, and train an open-loop policy.</p><p>This tutorial explains what each stage does and how data flows between them. For stage deep-dives see the <a class=\"inline\" href=\"/docs/graspkit/grasp-optim/\">grasp_optim tutorial</a> and the <a class=\"inline\" href=\"/docs/graspkit/training/\">training tutorial</a>; for every parameter see the <a class=\"inline\" href=\"/docs/graspkit/ref-config-system/\">config reference</a>.</p><h3>Overview</h3><p>The default <code>steps</code> are <code>(\"render_data\", \"optimize_grasps\", \"process_sim_data\", \"train\")</code>. Observations and actions are produced independently from the same scene descriptions, then joined per scene.</p><ul><li><code>robot_config</code> decides what the optimizer outputs: a floating hand yields floating grasps, an arm+hand robot yields fixed-base grasps. The <code>GraspTrajBuilder</code> filters them, optionally IK-converts floating grasps onto the fixed robot (<code>convert_to_fixed=True</code>), and plans the grasp trajectory; the <code>Evaluator</code> keeps only grasps that survive a sim rollout.</li></ul><ul><li>Every stage writes a completion marker next to its output (<code>.render_complete</code>, <code>.optim_complete</code>, ...). A later launch skips any stage whose marker exists, so an interrupted pipeline resumes where it stopped.</li></ul><h3>Quick Start</h3><p>Prerequisites: <code>uv sync --extra maniskill --extra spconv</code>, CUDA GPUs. Assets (scenes, object meshes, robot URDFs) download automatically on first use. Experiments live in <code>src/graspkit/configs/experiment/</code> and are registered by name in its <code>__init__.py</code>.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre># Full pipeline on 4 GPUs\nuv run scripts/launch.py xhand_right_dex1b_v0_5_mini_tabletop --gpus 0,1,2,3\n\n# Run a subset of steps; any nested config field is a CLI flag through tyro\nuv run scripts/launch.py xhand_right_dex1b_v0_5_mini_tabletop --steps optimize_grasps \\\n  --grasp_optim.num_attempts 2\n\n# Rerun from a step: deletes that step's marker + output and everything downstream\nuv run scripts/launch.py xhand_right_dex1b_v0_5_mini_tabletop --restart-from process_sim_data\n\n# Append mode: keep the restart step's output, delete only its marker (top up grasps)\nuv run scripts/launch.py xhand_right_dex1b_v0_5_mini_tabletop \\\n  --restart-from optimize_grasps --append</pre></div><h3>Renderer -&gt; Point-Cloud Observations</h3><p>Renders every scene through the <em>calibrated real camera</em> so training observations match deployment.</p><div class=\"mermaid\">flowchart TD\n    SD[(scene descriptions)]\n    CALIB[(camera calibration&lt;br/&gt;extrinsic + intrinsic .json)]\n    CAM[Per-scene camera poses&lt;br/&gt;fixed: calibrated view&lt;br/&gt;sampled: jittered views + look-at]\n    REN[Renderer]\n    SEG[Segmented object points]\n    VIS[Object-visibility view filter&lt;br/&gt;sampled mode only]\n    OUT[(rendered_data_path/scene_id.h5)]\n\n    SD --&gt; CAM\n    CALIB --&gt; CAM\n    CAM --&gt; REN --&gt; SEG\n    SEG --&gt;|fixed| OUT\n    SEG --&gt;|sampled| VIS --&gt; OUT</div><p>The calibrated extrinsic is anchored to the fixed-base robot's base pose (<code>camera_frame=\"robot\"</code>) or used as-is (<code>\"world\"</code>). <code>camera_mode=\"fixed\"</code> saves one view per scene; <code>\"sampled\"</code> renders <code>camera_sample_num_views</code> jittered views and keeps every view where the target object projects into the image (multi-view augmentation). Key config: <code>renderer</code> (<code>RendererConfig</code>).</p><p>An optional <code>sample_point_cloud</code> step exists for experiments that want full object point clouds sampled directly from the meshes instead of rendered ones; no registered experiment currently uses it.</p><h3>GraspOptimizer -&gt; Grasp Synthesis and Validation</h3><p>Synthesizes grasps per scene and keeps only those that survive filtering, motion planning, and a physics stress test. See the <a class=\"inline\" href=\"/docs/graspkit/grasp-optim/\">grasp_optim tutorial</a> for the components and the <a class=\"inline\" href=\"/docs/graspkit/grasp-optim-backends/\">algorithm concepts</a> for the two optimizer backends.</p><div class=\"mermaid\">%%{init: {\"flowchart\": {\"curve\": \"linear\"}}}%%\nflowchart LR\n    SD([scene description]) --&gt; OPT[grasp optimizer]\n    OPT --&gt; GP[\"3 frame grasp poses&lt;br/&gt;(floating/fixed base)\"]\n    GP --&gt; TB[traj builder]\n    TB --&gt; GT([grasp traj])\n    GT --&gt; EV[simulation evaluator]\n    EV --&gt; GP\n    GP -- successful grasps --&gt; OG([optimized grasps])\n    style OPT fill:#ffe680,stroke:#b38f00\n    style TB fill:#ffe680,stroke:#b38f00\n    style EV fill:#ffe680,stroke:#b38f00\n    linkStyle 6 stroke:#2e9e44,color:#2e9e44</div><p>The stage loops <code>num_attempts</code> passes with work stealing: a scene stays to-do while its file holds fewer than <code>min_grasps_threshold</code> grasps, so later passes top up hard scenes. Each batch runs optimize -&gt; filter + plan -&gt; sim eval, then appends the surviving pre/grasp/post configurations. Key config: <code>grasp_optim</code> (<code>GraspOptimConfig</code>, evaluator nested inside) and <code>traj_builder</code> (<code>GraspTrajBuilderConfig</code>).</p><h3>process_sim_data —&gt; Join Observations and Actions</h3><p>Joins the two upstream outputs per scene ID into one training HDF5. Scenes missing either side are dropped.</p><div class=\"mermaid\">flowchart TD\n    PC[(rendered pts)]\n    GR[(succ grasp poses)]\n    CE[\"ContactExtractor (optional)\"]\n    GW[graspness weight]\n    OUT[(processed sim data&lt;br/&gt;processed_data_path .h5)]\n\n    PC --&gt; OUT\n    GR --&gt; OUT\n    GR --&gt; CE --&gt; GW --&gt; OUT</div><p>Actions stack the three saved configurations per grasp; <code>meta/action_mean</code> and <code>meta/action_std</code> normalize them during training. With <code>enable_contact_extraction=True</code> each scene also gets per-point graspness weights. See <a class=\"inline\" href=\"/docs/graspkit/ref-data-format/\">data_format.md</a>.</p><h3>Trainer — Policy Learning</h3><p>Learns an open-loop policy mapping one scene point cloud to pre-grasp, grasp, and post-grasp configurations. See the <a class=\"inline\" href=\"/docs/graspkit/training/\">training tutorial</a>.</p><div class=\"mermaid\">flowchart TD\n    DS[(Dex1B dataset&lt;br/&gt;processed_data_path .h5)]\n    POL[GraspPolicy&lt;br/&gt;point-cloud encoder + CVAE]\n    TB[GraspTrajBuilder]\n    EV[Evaluator]\n    CKPT[(ckpt&lt;br/&gt;logs/train/name)]\n\n    DS --&gt; POL --&gt; TB --&gt; EV --&gt; CKPT</div><ul><li>Every <code>eval_freq</code> iterations, predicted grasps go through the same <code>GraspTrajBuilder</code> path as data optimization (filters + motion planning) before rolling out in the evaluator env.</li><li>The policy can also be trained on floating grasps and evaluated on the fixed-base robot: with <code>traj_builder.convert_to_fixed=True</code> the builder IK-converts the predicted floating grasps onto the arm and the evaluator rolls out the fixed-base trajectories (see <code>xhand_right_dex1b_v0_5_mini_tabletop_fixed_eval</code>). Key config: <code>dataset</code> (<code>DatasetConfig</code>), <code>agent</code> (<code>GraspPolicyConfig</code>), <code>trainer</code> (<code>TrainerConfig</code>).</li></ul><h3>Outputs</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Config field</th><th>Contents</th><th>Marker</th></tr></thead><tbody><tr><td><code>rendered_data_path</code></td><td>Per-scene <code>{scene_id}.h5</code> segmented point clouds</td><td><code>&lt;path&gt;.render_complete</code></td></tr><tr><td><code>grasp_output_dir</code></td><td>Per-scene <code>{scene_id}.h5</code> pre/grasp/post qpos</td><td><code>&lt;dir&gt;/.optim_complete</code></td></tr><tr><td><code>processed_data_path</code></td><td>One <code>.h5</code>: <code>data/&lt;scene_id&gt;/{obs,actions}</code> + <code>meta</code> stats</td><td><code>&lt;path&gt;.process_sim_data_complete</code></td></tr><tr><td><code>logs/train/&lt;name&gt;/</code></td><td>TensorBoard logs, checkpoints, eval results</td><td><code>&lt;dir&gt;/.train_complete</code></td></tr></tbody></table>"
    },
    {
      "id": "sim-deploy",
      "nav": "Sim Deployment",
      "h": "Sim Deployment",
      "body": "<p>Three ways to run a trained policy in simulation: inside training, as a reproducible benchmark, or interactively in the deploy UI.</p><h3>During training</h3><p>Set <code>TrainerConfig.evaluator</code> to an <code>EnvConfig</code> and the trainer evaluates every <code>eval_freq</code> iterations on rank 0: it samples actions, builds trajectories with <code>GraspTrajBuilder</code>, rolls them out, and reports a success rate plus a report-only penetration pass rate (<code>penetration &lt;= eval_pen_threshold</code>, 5 mm by default).</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre># evaluate an existing checkpoint, no training\nuv run scripts/stages/train/train.py &lt;experiment&gt; --trainer.eval-only --ckpt-path &lt;ckpt&gt;</pre></div><p>Results land in <code>logs/train/&lt;experiment&gt;/eval_success.jsonl</code>, TensorBoard (<code>eval/success_rate</code>, <code>eval/pen_pass_rate</code>) and <code>checkpoints/best_eval_success_rate.pt</code>. Eval-only runs also write per-scene results to <code>logs/eval/&lt;experiment&gt;.json</code>.</p><p>Knobs on <code>EnvConfig</code>: <code>num_envs</code> (2048), <code>num_seeds</code> (a grasp must survive every seed), <code>enable_perturbation</code> with <code>perturbation_magnitude</code> / <code>perturbation_step_range</code> / <code>num_perturbations</code>, the task (<code>control_freq</code>, <code>object_mass</code>, <code>target_lift_dist</code>, ...), and <code>mj_env_config</code> / <code>isaac_env_config</code> to pick a backend other than ManiSkill. <code>TrainerConfig</code> adds <code>eval_num_envs</code>, <code>max_eval_batches</code> and <code>eval_pen_threshold</code>.</p><p>ManiSkill counts a tabletop grasp as a success when the hand is strictly grasping and the object has risen by <code>target_lift_dist</code>; with <code>floating_object</code> it is grasp-only.</p><h3>As a benchmark</h3><p>The default checkpoint mode of <code>scripts/benchmark/grasp_policy/evaluate_policy.py</code> makes every prediction before any physics, asserts the eval scenes are disjoint from the training and validation IDs, and records actions, trajectories, and per-scene results.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>PYTHONHASHSEED=0 CUDA_VISIBLE_DEVICES=&lt;free gpu&gt; uv run scripts/benchmark/grasp_policy/evaluate_policy.py \\\n  --checkpoint &lt;ckpt&gt; --output &lt;report.json&gt; \\\n  --evaluation-experiment &lt;experiment&gt; --observations-path &lt;processed.h5&gt; \\\n  --require-native --require-object-disjoint</pre></div><p>The checkpoint must carry <code>experiment</code>, <code>policy_config</code>, <code>agent</code> and <code>training</code> keys; plain trainer checkpoints hold only <code>agent</code>, so use the packaging scripts under <code>scripts/stages/train/</code>. The report gives <code>raw</code> (sim success), <code>penetration</code> (deepest hand-sphere overlap into the object at the grasp pose, in metres) and <code>joint</code> = <code>raw &amp; penetration &lt;= 0.005</code>. That 5 mm threshold is fixed in the script, independent of <code>eval_pen_threshold</code>.</p><p>The same runner supports tabletop observations with <code>--mode pc_open_loop</code>, <code>pc_closed_loop</code>, or <code>rgb_closed_loop</code>. Choose <code>--robot</code> from <code>arx_x5</code>, <code>panda_allegro</code>, or <code>agilex_aloha</code>, and <code>--arm-mode</code> from <code>floating_ik</code> or <code>arm_aware</code>. Each scene gets one selected grasp execution; tabletop results are written to a <code>.jsonl</code> output.</p><h3>Interactively</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra sam2 scripts/deploy/deploy.py --env sim \\\n  --exp-config-name &lt;experiment&gt; --ckpt-path &lt;ckpt&gt;</pre></div><p>The sim path runs one environment, takes scenes from the experiment's msgpack split, and drives the same staged Viser UI the real robot uses — Capture, Segment, Check Grasp, Deploy. <code>--auto</code> (sim only) takes the segmentation prompt from the simulator's ground-truth mask and prints the SAM2-vs-GT mask IoU; <code>--scene-id</code> and <code>--num-scenes</code> choose scenes, <code>--deploy-batch-size</code> replays several grasps at once.</p><h3>MuJoCo instead of ManiSkill</h3><p>Setting <code>EnvConfig.mj_env_config</code> selects MuJoCo, which is the only backend for hands with no ManiSkill agent (<code>shadow_right_mj</code>, <code>xarm7_xhand_right_mj</code>, <code>vega_sharpa_*_mj</code>). It runs on CPU in a spawned pool of up to 48 workers and evaluates a grasp pose rather than a trajectory:</p><ul><li><code>setting=\"fc\"</code> — free-space force closure: grip, then hold against six axis-aligned forces; fails if the object translates past <code>trans_thre</code> or rotates past <code>angle_thre</code>.</li><li><code>setting=\"tabletop\"</code> — grip, apply a downward wrench (gravity is disabled), lift 20 cm, and require slip below <code>lift_slip_thre</code>, rotation below <code>angle_thre</code>, and contact after the lift.</li></ul><p>Use <code>timestep=0.001</code> for actuated arm+hand models; the 0.004 default flings the object.</p><h3>Pitfalls</h3><ul><li><code>MsEnv</code> warns when <code>num_envs</code> and the sample count are not multiples of each other: the mismatch forces a reconfiguration per batch, which dominates the runtime.</li><li>Evaluating far fewer grasps than <code>num_envs</code> is wasteful; the env warns about that too.</li><li>Reconfiguration only happens when the batch's scene set changes, so sort work by scene.</li><li>Seeding is explicit: <code>evaluate_policy.py</code> asserts <code>PYTHONHASHSEED=0</code>; <code>seed_everything</code> does not enable deterministic kernels unless asked.</li></ul>"
    },
    {
      "id": "real-deploy",
      "nav": "Real Deployment",
      "h": "Real Deployment",
      "body": "<p>Running a trained policy on hardware: capture a point cloud, predict a grasp, build a trajectory, execute it, release, and park.</p><blockquote><p>These scripts move a real robot. Run them yourself, with the e-stop in reach — never from an automated agent.</p></blockquote><h3>Prerequisites</h3><ul><li>The rig's <code>xarm</code> extra, plus <code>sam2</code> for segmentation.</li><li>A checkpoint whose robot matches the rig: deploy asserts that the actuated joint names of the policy's robot and the hardware robot are identical.</li></ul><h3>Hardware presets</h3><p><code>configs/real_env.py</code> holds one <code>RealEnvConfig</code> per rig; <code>--real-env-config-name</code> selects it, and an experiment can name a default through <code>real_env_config_name</code>.</p><table class=\"doc-table\" style=\"--cols:4\"><thead><tr><th>Preset</th><th>Arm</th><th>Hand</th><th>Camera</th></tr></thead><tbody><tr><td><code>xarm7_xhand_right</code></td><td>xArm7</td><td>XHand</td><td>RealSense</td></tr><tr><td><code>xarm6_sharpa_right</code></td><td>xArm6</td><td>Sharpa</td><td>RealSense</td></tr><tr><td><code>xarm7_ability_right</code></td><td>xArm7</td><td>Ability (channel reindex)</td><td>RealSense</td></tr></tbody></table><p>Each preset also carries the planning table (<code>table_size</code>, <code>table_xy</code>, <code>table_z</code>), the point-cloud crop centre (<code>workspace_center</code>), the streaming rate (<code>control_hz</code>) and how many depth frames to median-combine. Experiments need <code>--real-env-config-name</code>, a fixed-base trajectory and <code>camera_frame=\"robot\"</code>.</p><h3>Run it</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra sam2 --extra xarm scripts/deploy/deploy.py --env real \\\n  --exp-config-name xhand_right_dex1b_v0_5_mini_tabletop_fixed_eval \\\n  --ckpt-path &lt;checkpoint&gt; --real-env-config-name xarm7_xhand_right</pre></div><p>Every stage waits for a button in the Viser page:</p><ol><li><strong>Capture</strong> — reset to the init pose, grab RGB (median of <code>depth_frames</code> depth frames).</li><li><strong>Segment</strong> — click the object; SAM 2 turns the clicks into a mask, which becomes the cropped, subsampled point cloud in the robot base frame.</li><li><strong>Check Grasp</strong> — the policy samples <code>--num-samples</code> grasps; the trajectory builder converts and plans them, and the top eight valid candidates are shown. For a floating-base policy the cloud is mean-centred and the centroid added back; <code>--pc-offset</code> nudges it. <code>--post-grasp-hand-close-scale</code> rescales the closing motion.</li><li><strong>Deploy</strong> — the trajectory is streamed phase by phase at the rig's <code>control_hz</code>. The <em>Deploy Until Step</em> slider stops mid-trajectory so you can compare commanded and measured joint positions against the live cloud, then resume.</li><li><strong>Release and park</strong> — the hand opens in place, then a collision-checked plan returns the arm to the init pose against a table raised by 5 cm. There is no reset afterwards.</li></ol><p><code>--loop</code> keeps cycling; without it, a capture with no valid grasp is an error.</p><h3>Calibration</h3><p>The deploy path reads a base-frame camera extrinsic and a camera intrinsic from the shipped calibration files (<code>assets/calib.py</code>, wired into the experiment's <code>renderer.camera_poses_path</code> and <code>camera_intrinsic_path</code>).</p><p>Inspect the result with <code>uv run scripts/tools/visualize_camera_extrinsic.py --experiment-name ...</code> (offline) or <code>uv run --extra xarm scripts/deploy/visualize_calib.py</code> (live).</p><p>The park plan raises the table by 5 cm because the optimizer otherwise rides the collision margin.</p>"
    }
  ]
},
{
  "name": "Concepts",
  "items": [
    {
      "id": "concepts-overview",
      "nav": "Core Overview",
      "h": "Core Overview",
      "body": "<p>How the stages fit together, what flows between them, and where robokit ends and GraspKit begins.</p><h3>The graph</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">text</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>scene descriptions (msgpack)            scripts/stages/scene_desc/*\n        |\n        +---------------------------+\n        |                           |\n   [render_data]              [optimize_grasps]              (sharded: scenes[rank::world_size])\n   Renderer / ManiSkill        WarpGraspOptimizer\n   kinematic replay,           -&gt; GraspTrajBuilder: filters -&gt; (IK convert) -&gt; motion plan\n   point-cloud obs             -&gt; optional in-loop sim eval\n        |                           |\n   rendered_data_path          grasp_output_dir\n   (h5 per scene)              (h5 per scene: pre / grasp / post qpos)\n        +------------+--------------+\n                     |\n            [process_sim_data]  -&gt; processed_data_path (obs + actions per scene)\n                     |\n                  [train]  GraspDataset -&gt; Trainer (DDP through torchrun)\n                     |\n          logs/train/&lt;name&gt;/checkpoints/*.pt</pre></div><p><code>scripts/launch.py</code> dispatches these by name; the order is whatever <code>ExperimentConfig.steps</code> lists, by default <code>render_data</code>, <code>optimize_grasps</code>, <code>process_sim_data</code>, <code>train</code>. A fifth step, <code>sample_point_cloud</code>, exists for object-only clouds but no shipped experiment uses it.</p><h3>Stages</h3><table class=\"doc-table\" style=\"--cols:4\"><thead><tr><th>Stage</th><th>In</th><th>Out</th><th>Config</th></tr></thead><tbody><tr><td><code>optimize_grasps</code></td><td>scene descriptions</td><td>grasp h5 (pre/grasp/post qpos)</td><td><code>GraspOptimConfig</code>, <code>GraspTrajBuilderConfig</code></td></tr><tr><td><code>render_data</code></td><td>scene descriptions</td><td>rendered h5 (point clouds, segmentation, camera poses)</td><td><code>RendererConfig</code></td></tr><tr><td><code>process_sim_data</code></td><td>rendered h5 + grasp h5</td><td>processed h5 (obs joined to actions)</td><td><code>ExperimentConfig</code></td></tr><tr><td><code>train</code></td><td>processed h5</td><td>checkpoints</td><td><code>TrainerConfig</code>, <code>DatasetConfig</code>, <code>GraspPolicyConfig</code></td></tr></tbody></table><p>Grasp optimization is the compound stage: it optimizes, then filters (hand-axis cone, contact-avoid, penetration, rest pose), optionally IK-converts floating grasps onto an arm, plans a trajectory, and keeps only what a physics evaluator accepts.</p><h3>Resuming and sharding</h3><p>Each stage writes a completion marker (<code>.optim_complete</code>, <code>.render_complete</code>, <code>.process_sim_data_complete</code>, <code>.train_complete</code>) and skips itself when the marker exists. With multiple ranks the marker is written per rank and promoted once every rank is done; <code>s3://</code> outputs get no marker. <code>--restart-from &lt;step&gt;</code> deletes the marker and outputs for that step and everything downstream, <code>--append</code> keeps the output and deletes only the marker. Grasp optimization additionally resumes per scene: it re-runs scenes whose output is smaller than <code>min_grasps_threshold</code>.</p><p>Only grasp optimization uses every GPU, one process per card with scenes striped across ranks; non-zero ranks sleep 20 s so rank 0 compiles the Warp kernels first. Rendering and processing pin to the first GPU, and training goes through <code>torchrun</code>.</p><h3>Artifacts</h3><p><code>GraspKitData</code> is the tensor payload that crosses stages, in a padded <code>(B, K, ...)</code> or packed <code>(N, ...)</code> layout, saved as HDF5. Scene descriptions are msgpack with a train/test split. The processed file holds <code>data/&lt;scene&gt;/obs</code>, <code>data/&lt;scene&gt;/actions</code> and <code>meta/action_{mean,std}</code>; the trainer consumes it through <code>GraspDataset</code>.</p><h3>Floating base versus fixed base</h3><p><code>RobotConfig.base_type</code> decides the action layout: a floating hand prepends six base DOFs, baked as <code>[xyz, euler_rxyz, hand joints]</code>. A floating hand is always optimized with the floating-base sampler, and the Levenberg-Marquardt backend is floating-only. Setting <code>GraspTrajBuilderConfig.convert_to_fixed</code> filters those grasps and IK-converts them onto an arm before planning; inside grasp optimization the conversion is always off, so the planner plans for the robot being optimized.</p><h3>robokit versus GraspKit</h3><p>robokit supplies the cost terms, optimizers, contact sampling, warp scenes, SDF baking, the robot model and the motion planner. GraspKit owns the energy assembly, the init samplers, the grasp filters, the scene-description adapter, the renderer, the datasets, the policy and the trainer. Code graduates to robokit only when a second consumer exists.</p>"
    },
    {
      "id": "grasp-optim-backends",
      "nav": "Grasp Optimization Backends",
      "h": "Grasp Optimization Algorithms: warp_gd and warp_lm",
      "body": "<p>How the two grasp-optimizer backends work and when to use which. For running the stage see the <a class=\"inline\" href=\"/docs/graspkit/grasp-optim/\">grasp_optim tutorial</a>; for every parameter see the <a class=\"inline\" href=\"/docs/graspkit/api-grasp-optim/\">grasp optimization API</a>.</p><h3>The problem</h3><p>Grasp synthesis is energy minimization over a batch of grasps. Each grasp optimizes</p><ul><li>the robot configuration <code>q</code>: hand joints, plus arm joints (fixed base) or a free SE(3) base pose (floating hand), and</li><li>a discrete contact assignment: which <code>num_contact_points</code> of the robot's predefined contact candidates are active.</li></ul><p>The energy is a weighted sum of residual terms (robokit <code>terms.dense.*</code>):</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Term</th><th>Pulls toward</th></tr></thead><tbody><tr><td><code>DistanceTask</code></td><td>active contact points on the object surface</td></tr><tr><td><code>ForceClosureTask</code></td><td>contact normals that balance external wrenches (stability)</td></tr><tr><td><code>SceneCollisionTask</code></td><td>hand collision spheres out of the scene (object + table)</td></tr><tr><td><code>SelfCollisionTask</code></td><td>links out of each other</td></tr><tr><td><code>PositionLimit</code></td><td>joints inside their limits</td></tr><tr><td><code>FingertipDistanceTask</code> (optional)</td><td>fingertip spheres onto the surface</td></tr><tr><td><code>HandUpAngleTask</code> (optional)</td><td>hand-up axis at least <code>angle_z_min</code> from world +z</td></tr></tbody></table><p>Both backends share this formulation, the init samplers, and the Warp scene geometry (SDF volumes / mesh BVHs). The energy is highly non-convex and the contact assignment is discrete, so plain gradient descent gets stuck; each backend has its own escape mechanism.</p><h3>warp_gd: simulated-annealing gradient descent</h3><p><code>WarpGraspOptimizer</code> (<code>warp_optimizer.py</code>, backend <code>warp_gd</code>) runs each grasp as an independent annealing chain for <code>num_iters</code> (~10k) iterations, DexGraspNet-style. One iteration:</p><ol><li>RMSprop step on the continuous variables; step size decays over time, joints are clamped to limits.</li><li>With probability <code>switch_possibility</code>, propose a re-drawn contact set.</li><li>Evaluate the proposal's energy and gradient.</li><li>Metropolis accept: lower energy always wins; worse by <code>d</code> is accepted with probability <code>exp(-d / T)</code>, where the temperature <code>T</code> cools over time. Rejected grasps roll back.</li></ol><p>High <code>T</code> early lets grasps explore pose and contact assignment jointly; as <code>T</code> cools the chain settles into a low-energy basin. The whole iteration is captured as one CUDA graph, so the long loop has almost no launch overhead. Works for floating and fixed-base robots alike, which makes it the default backend.</p><h3>warp_lm: multi-seed Levenberg-Marquardt</h3><p><code>WarpGraspOptimizer</code> (backend <code>warp_lm</code>) treats the same energy as nonlinear least squares and applies robokit's <code>LMOptimizer</code>: curvature-aware steps converge in tens of iterations instead of thousands. A single LM run is purely local, so exploration comes from:</p><ul><li><strong>Multi-seed</strong>: every init grasp spawns 24 jittered copies solved in parallel; the lowest-energy seed wins.</li><li><strong>Contact resampling</strong>: LM cannot differentiate the discrete contacts, so every 8 iterations each candidate is joined by a copy with a fresh random contact set; both take the next LM steps, and the one with the lower energy stays.</li></ul><p><code>warp_lm</code> supports floating bases only. To target an arm+hand robot, set <code>enable_ik_scoring=True</code>: inits are pre-filtered by arm-IK reachability against the fixed-base robot and final seeds are ranked by <code>energy + reachability penalty</code>, so the grasps <code>GraspTrajBuilder</code> later IK-converts onto the arm are actually reachable.</p><h3>Choosing a backend</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th></th><th><code>warp_gd</code></th><th><code>warp_lm</code></th></tr></thead><tbody><tr><td>Method</td><td>RMSprop + simulated annealing</td><td>multi-seed Levenberg-Marquardt</td></tr><tr><td>Exploration</td><td>Metropolis accept over pose + contacts</td><td>24 seeds + periodic contact resampling</td></tr><tr><td>Iterations</td><td>~10000 first-order steps</td><td>64 curvature-aware steps</td></tr><tr><td>Speed</td><td>baseline</td><td>typically 2-3x faster</td></tr><tr><td>Robots</td><td>floating and fixed base</td><td>floating base only (<code>enable_ik_scoring</code> bridges to arms)</td></tr></tbody></table><p>Rule of thumb: <code>warp_gd</code> for fixed-base robots or when maximum exploration matters; <code>warp_lm</code> for floating-hand throughput, with <code>enable_ik_scoring</code> if the grasps will be converted to an arm. Both are compared in <code>scripts/benchmark/grasp_opt/bench_grasp_optim.py</code>.</p>"
    },
    {
      "id": "concepts-sim",
      "nav": "Simulation",
      "h": "Simulation",
      "body": "<p>GraspKit uses two physics backends behind one interface: ManiSkill (GPU, batched, full rollouts) and MuJoCo (CPU, grasp-pose scoring). A third path, the renderer, uses the ManiSkill scene without stepping physics at all.</p><h3>One interface</h3><p><code>BaseEnv</code> fixes the contract: <code>reset</code>, <code>get_qpos</code>, <code>step_qpos</code>, <code>get_info</code>, <code>get_rgb</code>, <code>get_pointcloud</code>, <code>evaluate</code>, <code>close</code>, with <code>evaluate</code> returning per-grasp success and, when asked, <code>Rollout</code> records (<code>qpos</code>, <code>obj_pose</code>, <code>scene_id</code>, <code>success</code>, <code>grasp_index</code>).</p><p><code>build_env</code> picks the implementation: <code>MjEnv</code> when <code>EnvConfig.mj_env_config</code> is set, otherwise <code>MsEnv</code>; <code>RealEnv</code> is imported lazily so the sim path never needs the hardware extras. <code>MjEnv</code> implements only <code>evaluate</code> — it scores grasps offline and raises on the interactive methods. <code>RealEnv</code> is the mirror image: it drives hardware but has no ground truth, so <code>evaluate</code> raises.</p><h3>ManiSkill</h3><p>The env is registered as <code>DexGrasp</code>. A scene description becomes actors grouped by mesh and scale, built in sorted order because PhysX contact outcomes depend on insertion order, with mass forced to <code>object_mass</code> and a merged <code>target</code> actor per scene. A table is added unless <code>floating_object</code> is set, which also disables gravity on the object. Success is \"strictly grasped and lifted past <code>target_lift_dist</code>\", or grasp-only for a floating object; grasping itself means at least two contact links pushing with more than half a newton.</p><p>Floating hands can be driven two ways:</p><ul><li><strong>Virtual joints</strong> — the agent's first six joints are PD-driven by the <code>floating_base</code> controller. This is the default for <code>*_floating_base</code> agent uids.</li><li><strong>Static base</strong> — when the ManiSkill agent is hand-only but the pipeline robot is floating, the six base DOFs are stripped from the qpos and applied as per-environment root poses instead. The base is pinned at the final grasp pose, which tests the grasp without an approach sweep or base PD shake.</li></ul><p>Joint order differs between ManiSkill's observation order (<code>robot.active_joints</code>) and its action order (<code>controller.joints</code>); <code>reindex_utils</code> converts in both directions, and picking the wrong one silently scrambles a bimanual robot.</p><p>Agent uids follow the robot config name, with <code>_floating_base</code> appended for floating hands. The env lists the 21 supported uids.</p><h3>MuJoCo</h3><p><code>MjDexGraspEnv</code> builds a model with MjSpec: the hand's MJCF, a table box that collides with the object but never the hand, and the object as convex pieces added in a fixed order because MuJoCo sums geom inertia in that order. Gravity is disabled; a downward wrench stands in for it. Density is rescaled so the object weighs <code>obj_mass</code>.</p><p>Two protocols:</p><ul><li><strong><code>fc</code></strong> — force closure in free space: pregrasp, grasp, squeeze, then hold against six axis-aligned forces scaled by <code>fc_force_scale</code>; failure is translation past <code>trans_thre</code> or rotation past <code>angle_thre</code>.</li><li><strong><code>tabletop</code></strong> — grip, apply the wrench, lift 20 cm (mocap root for floating hands, damped least-squares arm IK for fixed-base rigs), then require slip below <code>lift_slip_thre</code>, rotation below <code>angle_thre</code>, and live contact after the lift.</li></ul><p>Both bail out immediately when the initial pose is already penetrating past <code>max_pene</code>. Beyond success, the evaluator reports hand-object and self penetration, contact count, contact distance and consistency. A <code>HandSpec</code> adapts a hand: its MJCF path, whether it is mocap-driven, finger prefixes, the bodies that count as contact and fingertips, and — for fixed-base rigs — which body to lift and which joints the IK may move.</p><p>MuJoCo is CPU-only and not thread-safe, so <code>MjEnv</code> runs a spawned pool of up to 48 workers, one evaluator each. Spawn, not fork: forking a CUDA-initialized parent deadlocks.</p><h3>The renderer</h3><p><code>mani_skill/renderer.py</code> (<code>build_renderer</code>) makes its own <code>DexGrasp</code> env with <code>num_envs</code> environments and a point-cloud observation mode, then never steps physics: it writes qpos and object poses, flushes the GPU kinematics, and reads observations. Batching is over (scene, view) pairs. Segmentation ids select what survives (<code>extract_segments</code> wins over <code>remove_segments</code>), and points are cropped either in the camera frame or in the world frame offset by each scene's table position. <code>MsEnv.get_pointcloud</code> replicates that crop exactly, so deployment clouds match the training distribution.</p><h3>Choosing a backend</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th></th><th>ManiSkill</th><th>MuJoCo</th></tr></thead><tbody><tr><td>Hardware</td><td>GPU, batched</td><td>CPU, process pool</td></tr><tr><td>Scores</td><td>Full approach → grasp → lift rollouts, with perturbation forces</td><td>A grasp pose: force closure or a lift</td></tr><tr><td>Gives</td><td>Success, observations, RGB and point clouds</td><td>Success plus penetration and contact metrics</td></tr><tr><td>Robots</td><td>The 21 agents with ManiSkill uids</td><td>Any hand with an MJCF <code>HandSpec</code></td></tr></tbody></table><p>Hands with no ManiSkill agent (menagerie Shadow, the <code>_mj</code> xArm+XHand and Vega+Sharpa rigs) can only be validated in MuJoCo, which is why several experiments use it as their in-loop grasp filter.</p>"
    },
    {
      "id": "concepts-policies",
      "nav": "Models and Policies",
      "h": "Models and Policies",
      "body": "<p><code>GraspPolicy</code> in <code>src/graspkit/models/grasp_policy.py</code> maps an observation to a grasp: three hand poses (pre-grasp, grasp, post-grasp) that the trajectory builder turns into an executable motion.</p><p>Open and closed loop use the same policy. The execution controller decides when to observe and predict again; the benchmark's closed-loop mode refreshes the observation and replans at step 75.</p><p>The policy selects <code>CVAE</code> from <code>models/cvae.py</code> or <code>FlowMatching</code> from <code>models/flow_matching.py</code> using <code>generative_model</code> (<code>cvae</code>, <code>flow</code>, <code>flow_transformer</code>). Both generators expose <code>forward</code>, <code>decode</code> and <code>sample</code>; access the selected component as <code>policy.generator</code>. No shared base class is needed.</p><p>Saved configuration field names and the checkpoint's <code>cvae.*</code> parameter keys are unchanged. The policy registers its generator under that historical checkpoint name, while callers use <code>generator</code>. Existing state dictionaries load strictly without migration. Imports use <code>GraspPolicy</code>, <code>GraspPolicyConfig</code> and <code>build_grasp_policy</code>; the training CLI subcommand is <code>agent:grasp_policy_config</code>.</p><h3>The CVAE</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">text</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>point cloud (B, N, 3)\n   -&gt; [yaw canonicalization / augmentation] -&gt; [centering] -&gt; vision encoder (SpUNet or PointNet)\n        |                                            |\n        | global feature                             | per-point features\n        |                                            +-&gt; objectness head  (target vs background)\n        |                                            +-&gt; graspness head   (where to grasp)\n        v\n   CVAE encoder (training: ground-truth actions) -&gt; z -&gt; decoder -&gt; (B, n, 3, d) actions</pre></div><p><code>d</code> is the hand's joint count for a fixed base; a floating base prepends a translation and a rotation, <code>[xyz, rotation, hand joints]</code>, where the rotation is either Euler <code>rxyz</code> or a 6D representation. The three queries are pre-grasp, grasp and post-grasp, in that order.</p><p>At inference the encoder is skipped: the graspness head picks the top-<code>k</code> points, and the CVAE decodes a latent per point — the mean latent when <code>use_mean</code>, otherwise a sample scaled by <code>cvae_temperature</code>. With <code>use_mean</code> the diversity comes from the distinct query points, not the latent. <code>grasp_evaluator_guidance_steps</code> instead refines the latent by ascending a frozen grasp evaluator inside a ball of radius <code>grasp_evaluator_guidance_radius</code>.</p><p>The vision encoders include a sparse-convolution U-Net (<code>vision_encoder=\"spconv\"</code>, the default, voxel size 5 mm), a BN-free PointNet and RGB CNN/ResNet variants. RGB construction and shared training/inference preprocessing live in <code>models/vision_encoder/rgb.py</code>; the policy keeps state/camera conditioning and generator selection. The CVAE is an MLP encoder/decoder over the flattened action vector, conditioned on the vision feature, optionally with a learned prior.</p><p>Flow matching uses the same visual conditioning and action representation. Its velocity network is an MLP (<code>flow</code>) or transformer (<code>flow_transformer</code>), trained along a linear noise-to-action path. Sampling integrates eight Euler steps and restores physical joint units using the bank's action mean/std. Flow returns zero latent moments through the shared training interface, so its KL contribution is zero; joint reconstruction uses MSE.</p><h3>Losses</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Loss</th><th>Weight field</th><th>Penalizes</th></tr></thead><tbody><tr><td><code>qpos</code></td><td><code>qpos_weight</code></td><td>L1 on the reconstructed hand joints</td></tr><tr><td><code>tl</code>, <code>rot</code></td><td><code>tl_weight</code>, <code>rot_weight</code></td><td>L1 on floating-base translation and rotation</td></tr><tr><td><code>kl</code></td><td><code>kl_weight</code></td><td>Posterior against the standard or learned prior</td></tr><tr><td><code>objectness</code></td><td><code>objectness_weight</code></td><td>Per-point target-vs-background BCE, positives upweighted</td></tr><tr><td><code>graspness</code></td><td><code>graspness_weight</code></td><td>KL between predicted and labelled graspness distributions</td></tr><tr><td><code>kinematic</code></td><td><code>kinematic_weight</code></td><td>MSE between the FK link positions of predicted and ground-truth actions</td></tr><tr><td><code>penetration</code></td><td><code>penetration_weight</code></td><td>Collision-sphere overlap into the object beyond <code>penetration_threshold</code>, on prior samples</td></tr><tr><td><code>prior_fingertip</code></td><td><code>prior_fingertip_weight</code></td><td>Distance of fingertip spheres to the object surface</td></tr></tbody></table><p>The last two need scene geometry at training time; the trainer builds it only every <code>penetration_every</code> steps and after <code>penetration_warmup_iters</code>.</p><h3>Representation flags</h3><ul><li><code>convert_rxyz_to_rot6d</code> — 6D rotation inside the CVAE, decoded back to Euler. <code>analytic_euler</code> picks the closed-form decode over the iterative one.</li><li><code>coupled_floating_base</code> — all three queries share the grasp rotation, and grasp and post-grasp share its translation.</li><li><code>center_pointcloud</code> — predict translations relative to the cloud centroid.</li><li><code>canonical_yaw</code> — rotate into a deterministic yaw frame derived from the cloud's second moment.</li><li><code>train_yaw_augmentation</code> — random training-time yaw applied to points and targets together.</li></ul><h3>Data</h3><p><code>GraspDataset</code> reads the processed HDF5: per scene, one rendered view is drawn uniformly per access, points are sampled (object-only or whole scene), and actions are sampled per grasp. With graspness enabled, the per-action best points are placed first and the rest sampled around them. Graspness labels come from the contact extractor's palm-cone weighting during <code>process_sim_data</code>. Fresh flow models use <code>meta/action_mean</code> and <code>meta/action_std</code> to normalize their action space. CVAE training uses raw poses.</p><h3>Training</h3><p>AdamW at <code>lr=1e-4</code>, weight decay <code>1e-4</code>, a 10x step decay two thirds of the way through, DDP when distributed. Every step scans the gradients and skips the update if any rank saw a NaN or Inf. Checkpoints hold <code>{\"agent\": state_dict}</code>; the provenance keys the benchmark expects (<code>experiment</code>, <code>policy_config</code>, <code>training</code>) are added by the packaging scripts. Evaluation is described in <a class=\"inline\" href=\"/docs/graspkit/sim-deploy/\">Sim deployment</a>.</p><h3>From prediction to motion</h3><p>A predicted grasp is not executable on its own. <code>GraspTrajBuilder</code> applies the filters (hand-axis cone, contact-avoid, penetration, rest pose), optionally IK-converts a floating grasp onto an arm with an orientation gate and an arm-range band, and plans the approach, closing, holding and lift segments. The benchmark runs the filters; deployment skips them and relies on the IK gate, since a real capture has no ground-truth object pose.</p>"
    }
  ]
},
{
  "name": "Reference",
  "items": [
    {
      "id": "ref-robot-hands",
      "nav": "Robot and Hand Catalog",
      "h": "Robot and Hand Catalog",
      "body": "<p>Every robot is a <code>RobotConfig</code> instance in <code>configs/robot/</code>, registered by name in that package's <code>__init__.py</code>. <code>build_robot_config(name)</code> imports only that module, so only its assets download.</p><h3>Hands and rigs</h3><table class=\"doc-table\" style=\"--cols:5\"><thead><tr><th>Name</th><th>Base</th><th>Rig</th><th>Format</th><th>DOF</th></tr></thead><tbody><tr><td><code>ability_right</code></td><td>floating</td><td>hand</td><td>URDF</td><td>6</td></tr><tr><td><code>allegro_right</code></td><td>floating</td><td>hand</td><td>URDF</td><td>16</td></tr><tr><td><code>barrett_right</code></td><td>floating</td><td>hand</td><td>URDF</td><td>8</td></tr><tr><td><code>dclaw_right</code></td><td>floating</td><td>3-finger gripper</td><td>URDF</td><td>9</td></tr><tr><td><code>inspire_right</code></td><td>floating</td><td>hand</td><td>URDF</td><td>12</td></tr><tr><td><code>leap_right</code></td><td>floating</td><td>hand</td><td>URDF</td><td>16</td></tr><tr><td><code>mano_right</code></td><td>floating</td><td>hand</td><td>URDF</td><td>16</td></tr><tr><td><code>orca_right</code></td><td>floating</td><td>hand</td><td>URDF</td><td>17</td></tr><tr><td><code>paxini_right</code></td><td>floating</td><td>hand</td><td>URDF</td><td>16</td></tr><tr><td><code>schunk_right</code></td><td>floating</td><td>hand</td><td>URDF</td><td>9</td></tr><tr><td><code>shadow_right</code>, <code>shadow_right_mj</code></td><td>floating</td><td>hand</td><td>MJCF</td><td>22</td></tr><tr><td><code>sharpa_right</code>, <code>sharpa_left</code></td><td>floating</td><td>hand</td><td>URDF</td><td>22</td></tr><tr><td><code>xhand_right</code>, <code>xhand_right_mj</code></td><td>floating</td><td>hand</td><td>URDF / MJCF</td><td>12</td></tr><tr><td><code>robotiq_2f85</code>, <code>yam_gripper</code></td><td>floating</td><td>gripper</td><td>URDF</td><td>1–2 driven</td></tr><tr><td><code>franka_gripper</code></td><td>fixed</td><td>arm + gripper</td><td>URDF</td><td>8</td></tr><tr><td><code>xarm6_sharpa_right</code></td><td>fixed</td><td>arm + hand</td><td>URDF</td><td>6 + 22</td></tr><tr><td><code>xarm7_ability_right</code></td><td>fixed</td><td>arm + hand</td><td>URDF</td><td>7 + 6</td></tr><tr><td><code>xarm7_mano_right</code></td><td>fixed</td><td>arm + hand</td><td>URDF</td><td>7 + 16</td></tr><tr><td><code>xarm7_sharpa_right</code></td><td>fixed</td><td>arm + hand</td><td>URDF</td><td>7 + 22</td></tr><tr><td><code>xarm7_shadow_right</code></td><td>fixed</td><td>arm + hand</td><td>MJCF</td><td>7 + 22</td></tr><tr><td><code>xarm7_xhand_right</code>, <code>xarm7_xhand_right_mj</code></td><td>fixed</td><td>arm + hand</td><td>URDF / MJCF</td><td>7 + 12</td></tr><tr><td><code>g1_inspire_right</code>, <code>g1_inspire_right_wbc</code></td><td>fixed</td><td>humanoid + hand</td><td>URDF</td><td>41 / 33</td></tr><tr><td><code>g1_mano_right</code></td><td>fixed</td><td>humanoid + hand</td><td>URDF</td><td>45</td></tr><tr><td><code>vega_sharpa_right</code>, <code>vega_sharpa_left</code></td><td>fixed</td><td>humanoid + hand</td><td>URDF</td><td>full body</td></tr><tr><td><code>vega_sharpa_right_mj</code>, <code>vega_sharpa_left_mj</code></td><td>fixed</td><td>humanoid + hand</td><td>MJCF</td><td>63</td></tr></tbody></table><p>Variants suffixed <code>_side_init</code> and <code>_centered</code> differ only in initial pose or camera framing; <code>_mj</code> variants are the MJCF models used by the MuJoCo evaluator. Not every registered robot has a pipeline: experiments exist for ability, inspire, mano, paxini, sharpa, xhand, the xArm rigs, the G1 rigs, Vega and the MuJoCo Shadow.</p><h3>What a config carries</h3><p>Paths to the URDF or MJCF, collision spheres, self-collision ignore list, contact points and contact-avoid points; the base type and initial pose; the link names that name the palm, fingertips, thumb and middle finger; and robokit's <code>EE_COORD_SPEC</code> as <code>ee_coord_spec</code>, with the link it is expressed in as <code>ee_coord_link_name</code>. <code>grasp_robot.hand_coord_spec</code> turns it into palm-forward and fingers-up axes in the hand frame (a gripper's jaws are its palm). Those axes drive the hand-axis cone filter and the init sampler, so a wrong spec shows up as grasps approaching from the wrong side; <code>tests/test_robot_coord_specs.py</code> checks every config's axes against its fingertips and its sampled inits.</p><p>Contacts come either from a contact-points file or from a <code>contact_candidates_config</code> that samples per link; <code>scripts/tools/create_contact_points.py</code> authors the former.</p><h3>ManiSkill agents</h3><p>Simulation needs a ManiSkill agent per robot, in <code>mani_skill/agents/</code>. The uid is the robot config name, with <code>_floating_base</code> appended for floating hands — <code>xhand_right_floating_base</code>, <code>vega_sharpa_right</code>. Agents load sim-specific URDFs (floating-base, mimic-free variants) rather than the config's own path, and compose a controller: the six virtual base joints plus a position controller for the fingers. A robot with no hand-written agent (dclaw, orca, paxini, the grippers, every assembled rig) gets one from <code>mani_skill/agents/config_agent.py</code>: <code>register_config_agent</code> builds it from the robot config, writing a mimic-free sim URDF (plus the six virtual base joints for a floating hand) under <code>~/.graspkit/data/sim_urdf/&lt;revision&gt;</code>. The <code>_mj</code> rigs are MuJoCo-only.</p><h3>Adding a hand</h3><ol><li>Write <code>configs/robot/&lt;hand&gt;.py</code>: one <code>RobotConfig</code> pointing at the robokit asset symbols.</li><li>Register it in <code>configs/robot/__init__.py</code>.</li><li>Add a ManiSkill agent in <code>mani_skill/agents/&lt;hand&gt;.py</code> and import it in <code>mani_skill/__init__.py</code>.</li><li>Author contact points if the hand needs them.</li><li>Optionally add it to <code>EES</code> in robokit's <code>assets/robots/assembly/composed.py</code> so it can be mounted on any arm, and to the gallery's hand list.</li><li>Add an experiment config when you want a pipeline for it.</li></ol><p><code>configs/robot/schunk.py</code> plus <code>mani_skill/agents/schunk.py</code> is the smallest complete example.</p><h3>Assembled rigs</h3><p>robokit's <code>assets/robots/assembly/composed.py</code> assembles any of seven bases (YAM, xArm7, xArm6, Franka, UR5e, G1, Vega) with any of fourteen end effectors, merging collision spheres and computing the mount transform from the two mount specs, on demand under <code>~/.robokit/assembly/&lt;revision&gt;</code>. <code>utils/assembly_utils.py</code> adds each base's scene placement and rest pose; its configs are what the gallery's arm dropdown offers. A base+ee name is always assembled, even where a hand-written config shares it. <code>uv run python -m graspkit.gallery.grasp_optim --all --gpus ...</code> optimizes every gallery hand floating and jointly on every base, sim-evaluates all of them, and prints the success table.</p>"
    },
    {
      "id": "ref-config-system",
      "nav": "Config System",
      "h": "Config System",
      "body": "<p>All configuration is plain dataclasses in <code>src/graspkit/configs/</code>, parsed with <a class=\"inline\" href=\"https://brentyi.github.io/tyro/\">tyro</a> at the CLI. There are no YAML files: experiments are hand-written Python instances, variants are derived with <code>dataclasses.replace</code>, and every field is overridable from the command line. Field docstrings in the source are authoritative; this page covers the structure and entry points.</p><h3>Layout</h3><p>Class definitions live in <code>*_config.py</code>; instances live apart from them.</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Path (<code>src/graspkit/configs/</code>)</th><th>Contents</th></tr></thead><tbody><tr><td><code>experiment_config.py</code></td><td><code>ExperimentConfig</code> (top level) and all stage sub-configs</td></tr><tr><td><code>experiment/</code></td><td>Per-robot experiment instances + name registry (<code>build_experiment_config</code>, <code>cli_experiment</code>)</td></tr><tr><td><code>robot_config.py</code></td><td><code>RobotConfig</code></td></tr><tr><td><code>robot/</code></td><td>Per-robot <code>RobotConfig</code> instances + name registry (<code>build_robot_config</code>)</td></tr><tr><td><code>grasp_policy_config.py</code></td><td><code>GraspPolicyConfig</code></td></tr><tr><td><code>grasp_policy.py</code></td><td>Named <code>GraspPolicyConfig</code> presets (<code>GRASP_POLICY_CONFIGS</code>)</td></tr><tr><td><code>env_config.py</code></td><td>Backend configs: <code>MsEnvConfig</code> (ManiSkill), <code>MjEvalConfig</code> + <code>HandSpec</code> (MuJoCo), <code>IsaacEnvConfig</code>; the task is <code>EnvConfig</code></td></tr><tr><td><code>mj_hand.py</code></td><td>MuJoCo <code>HandSpec</code> instances (<code>SHADOW_HAND</code>, <code>XHAND</code>, ...)</td></tr><tr><td><code>real_env_config.py</code></td><td><code>RealEnvConfig</code></td></tr><tr><td><code>real_env.py</code></td><td><code>RealEnvConfig</code> hardware presets for <code>RealEnv</code> (<code>REAL_ENV_CONFIGS</code>; needs the <code>xarm</code> extra)</td></tr></tbody></table><h3>ExperimentConfig</h3><p><code>ExperimentConfig</code> (<code>experiment_config.py</code>) is the single config for the whole pipeline (<code>launch.py</code> and every stage script). Sub-configs hold hand-independent algorithm/runtime params; all paths, robot configs, and pipeline control live at the top level.</p><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Field</th><th>Type</th><th>Role</th></tr></thead><tbody><tr><td><code>name</code></td><td>str</td><td>Experiment name (required)</td></tr><tr><td><code>robot_config</code></td><td><code>RobotConfig</code></td><td>Robot that grasp optimization and training target (the floating hand in the standard pipeline)</td></tr><tr><td><code>traj_builder</code></td><td><code>GraspTrajBuilderConfig</code></td><td>Floating/fixed robot pair, <code>convert_to_fixed</code> decision, grasp filters, and the builder's <code>MotionPlannerConfig</code></td></tr><tr><td><code>grasp_optim</code></td><td><a class=\"inline\" href=\"/docs/graspkit/api-grasp-optim/\"><code>GraspOptimConfig</code></a></td><td>Optimizer backend, energy weights, init sampler, in-loop <code>evaluator</code>: see <a class=\"inline\" href=\"/docs/graspkit/grasp-optim/\">grasp_optim tutorial</a></td></tr><tr><td><code>renderer</code></td><td><code>RendererConfig</code></td><td>Point-cloud rendering: env, cameras (calibrated extrinsic/intrinsic paths), crop/downsample</td></tr><tr><td><code>trainer</code></td><td><a class=\"inline\" href=\"/docs/graspkit/api-training/\"><code>TrainerConfig</code></a></td><td>Training loop: batch size, iters, eval <code>EnvConfig</code>, wandb</td></tr><tr><td><code>dataset</code></td><td><a class=\"inline\" href=\"/docs/graspkit/api-training/\"><code>DatasetConfig</code></a></td><td>Dataset loading (num actions/points, graspness)</td></tr><tr><td><code>agent</code></td><td><a class=\"inline\" href=\"/docs/graspkit/api-policy/\"><code>GraspPolicyConfig</code></a></td><td>Model architecture/loss preset: see <a class=\"inline\" href=\"/docs/graspkit/training/\">training tutorial</a></td></tr><tr><td><code>scene_description_path</code>, <code>grasp_output_dir</code>, <code>rendered_data_path</code>, <code>processed_data_path</code>, ...</td><td>str</td><td>All experiment-specific paths (usually under <code>DATA_ROOT</code>)</td></tr><tr><td><code>steps</code>, <code>restart_from</code>, <code>append</code>, <code>gpus</code>, <code>num_gpus</code>, <code>seed</code></td><td>-</td><td>Pipeline control for <code>launch.py</code></td></tr></tbody></table>"
    },
    {
      "id": "ref-data-format",
      "nav": "Data Format Specification",
      "h": "Data Format Specification",
      "body": "<h3>Grasp Poses</h3><h4>Per-scene files</h4><p>One HDF5 file per scene:</p><ul><li>File name: <code>{scene_id}.h5</code></li><li>Datasets (float arrays):<ul><li><code>grasp_qpos</code>: shape <code>(N, D)</code></li><li><code>pre_grasp_qpos</code>: shape <code>(N, D)</code></li><li><code>post_grasp_qpos</code>: shape <code>(N, D)</code></li></ul></li></ul><p>Where:</p><ul><li><code>N</code> = number of stored grasps for this scene (varies per scene; may include appended results from multiple runs)</li><li><code>D</code> = dimension of the configuration. For floating base robots, this includes 3D position, 3D euler angles (rxyz), and hand joint positions.</li></ul><h4>Merged file</h4><ul><li>File name: <code>{output_dir}.h5</code></li><li>Structure: one group per scene <code>/{scene_id}/</code> containing the same datasets as per-scene files</li></ul>",
      "sub": "Data"
    },
    {
      "id": "ref-assets",
      "nav": "graspkit assets",
      "h": "graspkit assets",
      "body": "<p>graspkit's own assets (scene descriptions, object-mesh datasets) live in the HF dataset <a class=\"inline\" href=\"https://huggingface.co/datasets/openrobokit/graspkit\"><code>openrobokit/graspkit</code></a>. Robot assets (URDFs, spheres, contact points, self-collision ignores) live in <strong>robokit's</strong> dataset and are consumed via modules such as <code>robokit.assets.robots.end_effectors.sharpa_hand</code>. <code>import graspkit</code> downloads nothing. A robot module fetches its subtree into <code>~/.robokit/assets/&lt;pinned-commit&gt;/</code>; graspkit assets use <code>~/.graspkit/assets/&lt;graspkit.assets.REVISION&gt;/</code>, fetched by the same <code>robokit.assets.fetch</code>.</p><p><code>RobotConfig.self_collision_ignore_path</code> points to one robot's ignore YAML. Files named <code>*.sphere.yml</code> and <code>*.capsule.yml</code> select the sibling matching the term's representation. Grasp optimization defaults to spheres; select <code>spen_representation=\"capsule\"</code> for capsule terms. Motion planning and sphere filters always select sphere ignores. An enabled term warns at construction if its matching file is unavailable; an invalid supplied path still raises. Runtime assemblies have no ignore path unless one is supplied on their resulting config.</p><h3>Layout</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">text</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>calib/                 # per-rig camera extrinsics/intrinsics + joint offsets\ndata/scene_description/ # per-task scene msgpacks (dex1b/, ...)\ndata/object_data/       # mesh archives (dex_diffuser*, dexgraspnet, objaverse_dex1b_v2),\n                        #   extracted at import; dexgraspnet_official_splits/ = train/test lists</pre></div><p><code>~/.graspkit/</code>: <code>assets/</code> = fetched HF files (what code reads), <code>hf_cache/</code> = HF blobs; <code>data/</code>+<code>logs/</code> = pipeline output (S3-backed, not assets). <code>data/logs</code> live under home (not the repo), so graspkit works as a library too; <code>graspkit.link()</code> symlinks them into your checkout for browsing.</p><h3>Consuming</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from graspkit.assets import calib\nfrom graspkit.assets.scene_descriptions import dex1b_v0_4\nfrom graspkit.assets.objects import dex_diffuser\n\ndex1b_v0_4.FLOATING_MINI_PATH                       # importing fetches only v0.4\ndex_diffuser.DATA_DIR / \"processed/ycb\"             # importing fetches + extracts the archive\ncalib.calib_file(\"xarm/26-06-21-camera_pose.json\")  # fetches calib/, returns a Path</pre></div><ul><li><strong>Objects</strong> are archives: <code>objects.&lt;src&gt;</code> fetches + extracts into <code>DATA_ROOT/object_data/&lt;src&gt;</code> (marker-guarded) as <code>DATA_DIR</code>; <code>dexgraspnet_official_splits</code> is archive-free (<code>DIR</code>).</li><li><strong>Scenes</strong>: one module per dex1b version (<code>_DIR = fetch([...], REVISION, HF_REPO_ID, GRASPKIT_HOME)</code> + <code>*_PATH</code>). Add a scene = add a <code>*_PATH</code> + its <code>fetch</code> pattern.</li><li>Ad-hoc: <code>robokit.assets.fetch([\"data/scene_description/**\"], REVISION, HF_REPO_ID, GRASPKIT_HOME) / \"...\"</code>. Bump <code>graspkit.assets.REVISION</code> after uploading new data.</li></ul><p>Configs/experiments resolve by name, importing only what's needed (so only its assets download):</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from graspkit.configs.robot import build_robot_config\nfrom graspkit.configs.experiment import build_experiment_config\n\nbuild_robot_config(\"sharpa_right\")                       # downloads only sharpa_right's robot assets\nbuild_experiment_config(\"sharpa_right_dex1b_v0_4_mini_floating\")</pre></div><h3>Authoring</h3><p>The dataset is too large to clone, so there's no local git checkout. Upload directly through the HF API (uploads only new xet chunks; no git or git-xet plugin needed):</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run scripts/tools/upload_to_hf.py data/scene_description/dex1b/v0.4/x.msgpack</pre></div><p>It pushes the file/dir to the same repo-relative path (<code>upload_file</code>/<code>upload_folder</code>). Then expose it: add a module/symbol under <code>src/graspkit/assets/scene_descriptions/</code> or <code>objects/</code> (eager <code>_DIR = fetch([...], REVISION, HF_REPO_ID, GRASPKIT_HOME)</code> + typed <code>Path</code> symbols), keeping the <code>data/</code> layout above, and bump <code>graspkit.assets.REVISION</code> to the new dataset commit.</p><p>To pull only a subset back, <code>fetch</code> with a pattern (or <code>snapshot_download(allow_patterns=[...])</code>): never the whole repo.</p><p>Robot assets are authored in <strong>robokit's</strong> (small) dataset via its own git-xet checkout: see robokit.</p>",
      "sub": "Data"
    },
    {
      "id": "ref-scene-descriptions",
      "nav": "Dex1B Scene Descriptions",
      "h": "Dex1B Scene Descriptions",
      "body": "<p>Dex1B scene descriptions under <code>scene_description/dex1b/&lt;version&gt;/</code>, hosted on HuggingFace (<code>openrobokit/graspkit</code>) and generated by the scripts in <code>scripts/stages/scene_desc/</code>.</p><h3>v0.5</h3><ul><li><strong><code>tabletop</code></strong> (normal): table <code>(0.5, 0.5, 0.2)</code>, object region (xy ±0.2), and ±5cm table-height jitter (<code>enable_table_pose_randomization</code> with table xy fixed); height-balanced across 4 bins.</li><li><strong><code>wbc_tabletop</code></strong> (whole-body control): thick table <code>(0.35, 0.35, 0.2)</code> with a per-scene pose pulled close to the robot (<code>table_x_range=(0.35, 0.5)</code>: near edge ~0.175 clears the G1 torso front ~0.143) and uniform table-top height <code>[0.3, 1.1]</code>. Same height rebalancing as normal (mini/small balanced across 4 bins; dev off, since the tiny YCB set can't fill every bin).</li><li><strong><code>dexmate_tabletop</code></strong> (mini only, Vega + Sharpa): <code>tabletop</code> with table <code>(0.6, 0.6, 0.2)</code>, object region xy ±0.25, and ±15cm table-height jitter.</li></ul><p>All families read the same canonicals. <strong>Train</strong> is dexgraspnet (in-distribution); <strong>test</strong> mixes in dexdiffuser (egad, kit, contactdb, ycb) as a held-out object family, with per-source counts pinned via <code>merge_scene_description.py</code>'s <code>subsample</code>.</p><table class=\"doc-table\" style=\"--cols:4\"><thead><tr><th>Tier</th><th>train</th><th>test</th><th>Sources</th></tr></thead><tbody><tr><td><strong>dev</strong></td><td>100</td><td>30</td><td>YCB only (train &amp; test)</td></tr><tr><td><strong>mini</strong></td><td>5k</td><td>500</td><td>train dexgraspnet 684×5; test 300 dexgraspnet test-split + 200 dexdiffuser</td></tr><tr><td><strong>small</strong></td><td>50k</td><td>2k</td><td>train dexgraspnet 4302×5; test dexgraspnet test-split + dexdiffuser</td></tr></tbody></table><p>Families have identical counts/sources (same canonicals, different table). Scales: dexgraspnet <code>[0.06, 0.08, 0.1, 0.12, 0.15]</code>, dexdiffuser <code>1.0</code>. Pipeline: <code>meshes → canonical drop → tabletop randomization</code>, merged with <code>merge_scene_description.py</code>.</p><ul><li><strong>Canonical drop:</strong> each (object, scale) is dropped by physics onto a <code>(0.3, 0.3, 0.1)</code> table in 3 orientations (<code>none</code>, <code>x90</code>, <code>y90</code>). Kept if xy within ±0.15m, height ≥ 0.02m, volume ≤ 0.003m³, xy area ≤ 0.025m².</li><li><strong>Tabletop randomization:</strong> xy translation and z rotation per canonical scene, plus the family's table pose. Height bins: 0.02–0.05, 0.05–0.09, 0.09–0.15, 0.15–0.25m. At most 10 scenes per object (mini), 6 (small), 5 (dev).</li><li><strong>Meshes:</strong> <code>collision.glb</code> keeps the CoACD convex parts; <code>visual.glb</code> is a separate simplified mesh. Importing <code>graspkit.assets.objects.dex_diffuser_v2</code> fetches the dexdiffuser meshes.</li></ul>",
      "sub": "Data"
    },
    {
      "id": "api-grasp-optim",
      "nav": "Grasp Optimization",
      "h": "Grasp Optimization",
      "body": "<div data-api=\"graspkit.stages.grasp_optim.WarpGraspOptimizer\"></div><div data-api=\"graspkit.stages.grasp_optim.GraspOptimConfig\"></div><div data-api=\"graspkit.stages.grasp_optim.GraspRobot\"></div>",
      "sub": "API",
      "api": {
        "graspkit.stages.grasp_optim.WarpGraspOptimizer": {
          "kind": "class",
          "name": "WarpGraspOptimizer",
          "module": "graspkit.stages.grasp_optim",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/grasp_optim/warp_optimizer.py#L118",
          "anchor": "warpgraspoptimizer",
          "doc": "<p>Batched Warp grasp optimizer: samples init grasps per scene, then runs <code>GraspOptimConfig.optimizer_backend</code>.</p>",
          "params": [
            {
              "name": "cfg",
              "type": "GraspOptimConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "robot_config",
              "type": "RobotConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "device",
              "type": "Device",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "fixed_base_robot_config",
              "type": "Optional[RobotConfig]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "ik_oversample_ratio",
              "type": "int",
              "default": "16",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "last_snapshots",
              "signature": "last_snapshots: Optional[torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/grasp_optim/warp_optimizer.py#L153",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "optimize",
              "signature": "optimize(scene_descriptions: List[SceneDescription], num_samples_per_scene: int, record: bool = False) -> torch.Tensor",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/grasp_optim/warp_optimizer.py#L226",
              "doc": "<p>Optimize grasps for each scene; returns <code>(n_scene, num_samples_per_scene, dof)</code> grasp variables.</p>",
              "params": [
                {
                  "name": "scene_descriptions",
                  "type": "List[SceneDescription]",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "num_samples_per_scene",
                  "type": "int",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "record",
                  "type": "bool",
                  "default": "False",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "torch.Tensor",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "compute_costs",
              "signature": "compute_costs(scene_descriptions: List[SceneDescription], grasps: torch.Tensor) -> Dict[str, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/grasp_optim/warp_optimizer.py#L342",
              "doc": "<p>Per-term <code>0.5·Σr²</code> cost of <code>(n_scene, n, dof)</code> grasps, with contacts re-picked nearest the object.</p>",
              "params": [
                {
                  "name": "scene_descriptions",
                  "type": "List[SceneDescription]",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "grasps",
                  "type": "torch.Tensor",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Dict[str, torch.Tensor]",
                "doc": ""
              }
            }
          ]
        },
        "graspkit.stages.grasp_optim.GraspOptimConfig": {
          "kind": "class",
          "name": "GraspOptimConfig",
          "module": "graspkit.stages.grasp_optim",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L13",
          "anchor": "graspoptimconfig",
          "doc": "<p>Grasp optimizer algorithm and runtime parameters, with hand-independent defaults.</p><p>The config of the <code>optimize_grasps</code> stage (<code>ExperimentConfig.grasp_optim</code>); every field is a CLI flag, e.g. <code>--grasp_optim.num_iters 2000</code>. The annealing fields drive <code>warp_gd</code> only and the <code>lm_*</code> fields <code>warp_lm</code> only. The init-sampler fields feed <code>stages/grasp_optim/sampler.py</code>; the runtime fields feed <code>optimize_pipeline.py</code>, not a bare <code>optimize()</code> call.</p>",
          "params": [
            {
              "name": "num_iters",
              "type": "int",
              "default": "6000",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_contact_points",
              "type": "int",
              "default": "4",
              "required": false,
              "doc": ""
            },
            {
              "name": "switch_possibility",
              "type": "float",
              "default": "0.5",
              "required": false,
              "doc": ""
            },
            {
              "name": "mu",
              "type": "float",
              "default": "0.98",
              "required": false,
              "doc": ""
            },
            {
              "name": "step_size",
              "type": "float",
              "default": "0.005",
              "required": false,
              "doc": ""
            },
            {
              "name": "stepsize_period",
              "type": "int",
              "default": "50",
              "required": false,
              "doc": ""
            },
            {
              "name": "starting_temperature",
              "type": "float",
              "default": "18.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "annealing_period",
              "type": "int",
              "default": "30",
              "required": false,
              "doc": ""
            },
            {
              "name": "temperature_decay",
              "type": "float",
              "default": "0.95",
              "required": false,
              "doc": ""
            },
            {
              "name": "spen_threshold",
              "type": "float",
              "default": "0.01",
              "required": false,
              "doc": ""
            },
            {
              "name": "spen_representation",
              "type": "Literal['capsule', 'sphere']",
              "default": "'sphere'",
              "required": false,
              "doc": ""
            },
            {
              "name": "w_fc",
              "type": "float",
              "default": "1.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "w_dis",
              "type": "float",
              "default": "100.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "w_fingertip_dis",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "w_pen",
              "type": "float",
              "default": "100.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "w_spen",
              "type": "float",
              "default": "10.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "w_joints",
              "type": "float",
              "default": "1.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "w_angle_z",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "angle_z_min",
              "type": "float",
              "default": "math.pi / 2",
              "required": false,
              "doc": ""
            },
            {
              "name": "hand_axis",
              "type": "Optional[HandAxis]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "hand_axis_target",
              "type": "Tuple[float, float, float]",
              "default": "(0.0, 0.0, 1.0)",
              "required": false,
              "doc": ""
            },
            {
              "name": "filter_hand_axis_max_angle_deg",
              "type": "float",
              "default": "30.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "optimizer_backend",
              "type": "Literal['warp_gd', 'warp_lm']",
              "default": "'warp_gd'",
              "required": false,
              "doc": ""
            },
            {
              "name": "scene_geom_backend",
              "type": "Literal['mesh', 'sdf_volume']",
              "default": "'sdf_volume'",
              "required": false,
              "doc": ""
            },
            {
              "name": "sdf_bake_padding",
              "type": "float",
              "default": "0.25",
              "required": false,
              "doc": ""
            },
            {
              "name": "sdf_resolution",
              "type": "int",
              "default": "64",
              "required": false,
              "doc": ""
            },
            {
              "name": "sdf_voxel_size",
              "type": "Optional[float]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "use_link_bounding_sphere_filter",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "lm_w_pen",
              "type": "float",
              "default": "150.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "lm_w_joints",
              "type": "float",
              "default": "10.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "lm_w_fingertip_dis",
              "type": "float",
              "default": "10.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "lm_collision_margin",
              "type": "float",
              "default": "0.005",
              "required": false,
              "doc": ""
            },
            {
              "name": "lm_residual_eps",
              "type": "float",
              "default": "1e-06",
              "required": false,
              "doc": ""
            },
            {
              "name": "lm_base_step_scale",
              "type": "float",
              "default": "0.001",
              "required": false,
              "doc": ""
            },
            {
              "name": "lm_init_sample_range_q",
              "type": "float",
              "default": "0.2",
              "required": false,
              "doc": ""
            },
            {
              "name": "lm_init_sample_range_base",
              "type": "float",
              "default": "0.05",
              "required": false,
              "doc": ""
            },
            {
              "name": "enable_ik_scoring",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "evaluator",
              "type": "Optional[EnvConfig]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "sampler_type",
              "type": "Literal['fixed_base', 'wbc', 'floating_base']",
              "default": "'fixed_base'",
              "required": false,
              "doc": ""
            },
            {
              "name": "distance_lower",
              "type": "float",
              "default": "0.02",
              "required": false,
              "doc": ""
            },
            {
              "name": "distance_upper",
              "type": "float",
              "default": "0.2",
              "required": false,
              "doc": ""
            },
            {
              "name": "front_theta_lower",
              "type": "float",
              "default": "-math.pi / 2",
              "required": false,
              "doc": ""
            },
            {
              "name": "front_theta_upper",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "side_theta_lower",
              "type": "float",
              "default": "-math.pi / 18",
              "required": false,
              "doc": ""
            },
            {
              "name": "side_theta_upper",
              "type": "float",
              "default": "math.pi / 18",
              "required": false,
              "doc": ""
            },
            {
              "name": "hand_qpos_jitter_strength",
              "type": "float",
              "default": "0.05",
              "required": false,
              "doc": ""
            },
            {
              "name": "hand_qpos_mu",
              "type": "Optional[Tuple[float, ...]]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "init_ik_position_tolerance",
              "type": "float",
              "default": "0.05",
              "required": false,
              "doc": ""
            },
            {
              "name": "init_ik_orientation_tolerance",
              "type": "float",
              "default": "0.3",
              "required": false,
              "doc": ""
            },
            {
              "name": "init_ik_prefer_rest",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "init_rest_pose_max_dist",
              "type": "float",
              "default": "3.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "init_num_ik_candidates_per_sample",
              "type": "int",
              "default": "50",
              "required": false,
              "doc": ""
            },
            {
              "name": "init_num_points_per_sample",
              "type": "int",
              "default": "1000",
              "required": false,
              "doc": ""
            },
            {
              "name": "init_ik_batch_size",
              "type": "int",
              "default": "512",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_samples_per_scene",
              "type": "int",
              "default": "64",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_scenes_per_batch",
              "type": "int",
              "default": "16",
              "required": false,
              "doc": ""
            },
            {
              "name": "min_grasps_threshold",
              "type": "int",
              "default": "16",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_attempts",
              "type": "int",
              "default": "1",
              "required": false,
              "doc": ""
            },
            {
              "name": "max_scenes",
              "type": "Optional[int]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "save_labels",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "num_iters",
              "signature": "num_iters: int = 6000",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L24",
              "doc": "<p>Annealing iterations (<code>warp_gd</code>). Each replays one CUDA graph; fewer trade grasp quality for speed, and 2000 suits smoke tests.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_contact_points",
              "signature": "num_contact_points: int = 4",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L27",
              "doc": "<p>Active contact points per grasp, drawn from the robot's contact candidates; they parameterize the distance and force-closure terms. 4-5 fits most five-finger hands.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "switch_possibility",
              "signature": "switch_possibility: float = 0.5",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L30",
              "doc": "<p>Per-grasp probability, each iteration, of re-drawing the whole contact set; the Metropolis test accepts or rejects it together with the pose step.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mu",
              "signature": "mu: float = 0.98",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L33",
              "doc": "<p>RMSprop weight on the current squared gradient, <code>ema = mu * g^2 + (1 - mu) * ema</code>. Near 1 the step approaches the gradient's sign times <code>step_size</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "step_size",
              "signature": "step_size: float = 0.005",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L36",
              "doc": "<p>Base RMSprop step; the effective step is <code>step_size * temperature_decay^(t // stepsize_period)</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "stepsize_period",
              "signature": "stepsize_period: int = 50",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L38",
              "doc": "<p>Iterations between step-size decays.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "starting_temperature",
              "signature": "starting_temperature: float = 18.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L40",
              "doc": "<p>Initial Metropolis temperature <code>T</code>: a proposal that worsens the energy by <code>d</code> is still accepted with probability <code>exp(-d / T)</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "annealing_period",
              "signature": "annealing_period: int = 30",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L43",
              "doc": "<p>Iterations per temperature decay, <code>T = starting_temperature * temperature_decay^(t // annealing_period)</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "temperature_decay",
              "signature": "temperature_decay: float = 0.95",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L45",
              "doc": "<p>Decay factor shared by the temperature and step-size schedules; closer to 1 cools slower and explores more.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "spen_threshold",
              "signature": "spen_threshold: float = 0.01",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L47",
              "doc": "<p>Self-collision margin (m) between sphere/capsule pairs; 2 cm pinned the middle finger of most hands off the object.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "spen_representation",
              "signature": "spen_representation: Literal['capsule', 'sphere'] = 'sphere'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L49",
              "doc": "<p>Self-collision geometry for <code>warp_gd</code>: per-link capsules or the collision spheres. <code>warp_lm</code> always uses capsules.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "w_fc",
              "signature": "w_fc: float = 1.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L52",
              "doc": "<p>Force-closure weight: the active contact normals must balance external wrenches. A zero weight disables any term.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "w_dis",
              "signature": "w_dis: float = 100.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L55",
              "doc": "<p>Weight pulling each active contact point onto the target surface.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "w_fingertip_dis",
              "signature": "w_fingertip_dis: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L57",
              "doc": "<p>Weight of the fingertip term (warp_gd only; requires fingertip links set): each fingertip link's closest collision sphere is drawn onto the object. 0 disables; a hand should touch without it, this is a last resort.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "w_pen",
              "signature": "w_pen: float = 100.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L60",
              "doc": "<p><code>warp_gd</code> scene-penetration weight: hand collision spheres against the target and table, with a fixed 5 mm margin. <code>warp_lm</code> uses <code>lm_w_pen</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "w_spen",
              "signature": "w_spen: float = 10.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L63",
              "doc": "<p>Self-penetration weight between robot links; zero skips building the term.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "w_joints",
              "signature": "w_joints: float = 1.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L65",
              "doc": "<p><code>warp_gd</code> joint-limit weight; q is also clamped to its limits every iteration. <code>warp_lm</code> uses <code>lm_w_joints</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "w_angle_z",
              "signature": "w_angle_z: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L67",
              "doc": "<p>Weight of the hand-orientation prior (<code>HandUpAngleTask</code>, both backends).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "angle_z_min",
              "signature": "angle_z_min: float = math.pi / 2",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L69",
              "doc": "<p>Minimum angle between the hand-up axis and world +z; tabletop configs use it to forbid underhand grasps.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand_axis",
              "signature": "hand_axis: Optional[HandAxis] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L71",
              "doc": "<p>Hand-axis cone filter on init samples: which <code>hand_coord_spec</code> axis to check, after IK for fixed-base samplers. None disables it. The cone on optimized grasps lives on <code>GraspTrajBuilderConfig</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand_axis_target",
              "signature": "hand_axis_target: Tuple[float, float, float] = (0.0, 0.0, 1.0)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L74",
              "doc": "<p>Direction <code>hand_axis</code> should point, in the robot base frame (world for floating hands).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "filter_hand_axis_max_angle_deg",
              "signature": "filter_hand_axis_max_angle_deg: float = 30.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L76",
              "doc": "<p>Hand-axis cone half-angle in degrees.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "optimizer_backend",
              "signature": "optimizer_backend: Literal['warp_gd', 'warp_lm'] = 'warp_gd'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L78",
              "doc": "<p><code>warp_gd</code>: simulated-annealing gradient descent for floating or fixed-base robots. <code>warp_lm</code>: multi-seed Levenberg-Marquardt, floating base only, typically 2-3x faster and needs fingertip links; to target an arm, set <code>enable_ik_scoring</code> and let <code>GraspTrajBuilder</code> IK-convert.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "scene_geom_backend",
              "signature": "scene_geom_backend: Literal['mesh', 'sdf_volume'] = 'sdf_volume'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L82",
              "doc": "<p><code>sdf_volume</code>: a cached SDF of the target mesh plus analytic table boxes; fast, accuracy bounded by voxel size, and the target must be the scene's only mesh. <code>mesh</code>: per-scene BVHs, exact but slower.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "sdf_bake_padding",
              "signature": "sdf_bake_padding: float = 0.25",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L85",
              "doc": "<p>SDF bake padding, in mesh units (robokit bakes the unscaled mesh and applies <code>scales</code> at query time).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "sdf_resolution",
              "signature": "sdf_resolution: int = 64",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L87",
              "doc": "<p>Voxel grid resolution along the longest axis when sdf_voxel_size is None.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "sdf_voxel_size",
              "signature": "sdf_voxel_size: Optional[float] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L89",
              "doc": "<p>Voxel size in mesh units (before <code>scales</code>). None = derive voxel size from sdf_resolution.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "use_link_bounding_sphere_filter",
              "signature": "use_link_bounding_sphere_filter: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L91",
              "doc": "<p>Sphere-level broad-phase skip on the warp scene-collision task. Only for scene_geom_backend=\"sdf_volume\".</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lm_w_pen",
              "signature": "lm_w_pen: float = 150.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L95",
              "doc": "<p>warp_lm counterpart of w_pen: scene-collision term weight (LM raw-residual scale).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lm_w_joints",
              "signature": "lm_w_joints: float = 10.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L97",
              "doc": "<p>warp_lm counterpart of w_joints: position-limit term weight (LM raw-residual scale).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lm_w_fingertip_dis",
              "signature": "lm_w_fingertip_dis: float = 10.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L99",
              "doc": "<p>warp_lm counterpart of w_fingertip_dis: fingertip-distance term weight (LM raw-residual scale).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lm_collision_margin",
              "signature": "lm_collision_margin: float = 0.005",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L101",
              "doc": "<p>warp_lm scene-collision margin (meters).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lm_residual_eps",
              "signature": "lm_residual_eps: float = 1e-06",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L103",
              "doc": "<p>warp_lm residual epsilon for distance / position-limit / self-penetration terms.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lm_base_step_scale",
              "signature": "lm_base_step_scale: float = 0.001",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L105",
              "doc": "<p>warp_lm floating-base step relative to the joint step; keeps base updates from overshooting.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lm_init_sample_range_q",
              "signature": "lm_init_sample_range_q: float = 0.2",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L107",
              "doc": "<p>warp_lm per-seed joint half-range: the 24 seeds are the init qpos plus Roberts offsets in <code>[-range, range]</code>, clamped to limits.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lm_init_sample_range_base",
              "signature": "lm_init_sample_range_base: float = 0.05",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L110",
              "doc": "<p>warp_lm per-seed base-translation sampling half-range (floating base only).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "enable_ik_scoring",
              "signature": "enable_ik_scoring: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L112",
              "doc": "<p>warp_lm floating base only: oversample inits 16x, keep those an arm IK can reach, and rank solutions by energy plus reachability. Use when <code>GraspTrajBuilder</code> will IK-convert onto an arm.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "evaluator",
              "signature": "evaluator: Optional[EnvConfig] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L115",
              "doc": "<p>In-loop simulation filter: each optimized batch is rolled out (e.g. with perturbation or a heavy object) and only survivors are saved. None gates on motion-plan success only.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "sampler_type",
              "signature": "sampler_type: Literal['fixed_base', 'wbc', 'floating_base'] = 'fixed_base'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L120",
              "doc": "<p><code>fixed_base</code>: look-at poses solved to collision-free arm IK. <code>wbc</code>: world-rooted arms, any azimuth, never from below the table. <code>floating_base</code>: no IK, emits <code>[xyz, euler_rxyz, hand_qpos]</code>; floating optimizers force it.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "distance_lower",
              "signature": "distance_lower: float = 0.02",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L123",
              "doc": "<p>Lower bound (m) of the hand-to-surface standoff, sampled uniformly. Tight bounds are the usual cause of starved init sampling.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "distance_upper",
              "signature": "distance_upper: float = 0.2",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L126",
              "doc": "<p>Upper bound (m) of the hand-to-surface standoff.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "front_theta_lower",
              "signature": "front_theta_lower: float = -math.pi / 2",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L128",
              "doc": "<p>Lower bound of the roll jitter about the look-at approach axis.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "front_theta_upper",
              "signature": "front_theta_upper: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L130",
              "doc": "<p>Upper bound of the roll jitter about the look-at approach axis.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "side_theta_lower",
              "signature": "side_theta_lower: float = -math.pi / 18",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L132",
              "doc": "<p>Lower bound of the tilt jitter about the two axes perpendicular to the approach.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "side_theta_upper",
              "signature": "side_theta_upper: float = math.pi / 18",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L134",
              "doc": "<p>Upper bound of the tilt jitter about the two axes perpendicular to the approach.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand_qpos_jitter_strength",
              "signature": "hand_qpos_jitter_strength: float = 0.05",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L136",
              "doc": "<p>Std of the per-joint Gaussian jitter added to <code>hand_qpos_mu</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand_qpos_mu",
              "signature": "hand_qpos_mu: Optional[Tuple[float, ...]] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L138",
              "doc": "<p>Mean hand qpos for init sampling, typically half-open; None uses the robot config's init qpos.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "init_ik_position_tolerance",
              "signature": "init_ik_position_tolerance: float = 0.05",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L140",
              "doc": "<p>Position tolerance (m) for the init-time arm IK solve (FixedBaseSampler / WBCSampler).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "init_ik_orientation_tolerance",
              "signature": "init_ik_orientation_tolerance: float = 0.3",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L142",
              "doc": "<p>Orientation tolerance (rad) for that solve.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "init_ik_prefer_rest",
              "signature": "init_ik_prefer_rest: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L144",
              "doc": "<p>That solve keeps the solution nearest the rest pose; False keeps its best-scoring random seed.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "init_rest_pose_max_dist",
              "signature": "init_rest_pose_max_dist: float = 3.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L146",
              "doc": "<p>Reject init IK solutions whose arm-qpos L2 distance from the rest pose exceeds this.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "init_num_ik_candidates_per_sample",
              "signature": "init_num_ik_candidates_per_sample: int = 50",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L148",
              "doc": "<p>IK candidates per requested sample before collision/rest filtering (this × num_samples_per_scene).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "init_num_points_per_sample",
              "signature": "init_num_points_per_sample: int = 1000",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L150",
              "doc": "<p>Empty-space points sampled per requested sample when seeding approach directions.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "init_ik_batch_size",
              "signature": "init_ik_batch_size: int = 512",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L152",
              "doc": "<p>Chunk size of the IK + collision sweep over candidates (memory only).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_samples_per_scene",
              "signature": "num_samples_per_scene: int = 64",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L156",
              "doc": "<p>Grasps optimized per scene per attempt.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_scenes_per_batch",
              "signature": "num_scenes_per_batch: int = 16",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L158",
              "doc": "<p>Scenes batched into one solve: <code>num_scenes_per_batch * num_samples_per_scene</code> grasps on the GPU.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "min_grasps_threshold",
              "signature": "min_grasps_threshold: int = 16",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L160",
              "doc": "<p>A scene is done once its output holds this many grasps; scenes below it are re-attempted.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_attempts",
              "signature": "num_attempts: int = 1",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L162",
              "doc": "<p>Top-up passes over unfinished scenes; attempt <code>i</code> runs with <code>seed + i</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "max_scenes",
              "signature": "max_scenes: Optional[int] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L164",
              "doc": "<p>If set, caps scenes processed per attempt (after sort/shuffle/rank slicing). Useful for quick testing.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "save_labels",
              "signature": "save_labels: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L166",
              "doc": "<p>Save all candidates and their filter/plan/simulation verdicts to <code>&lt;grasp_output_dir&gt;.labels/</code>.</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "graspkit.stages.grasp_optim.GraspRobot": {
          "kind": "class",
          "name": "GraspRobot",
          "module": "graspkit.stages.grasp_optim",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L40",
          "anchor": "grasprobot",
          "doc": "<p>Robot equipped with the grasp-pipeline torch facade and contact-point candidates.</p>",
          "bases": "Robot",
          "params": [
            {
              "name": "spec",
              "type": "RobotSpec",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "config",
              "type": "Optional[RobotConfig]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "device",
              "type": "Device",
              "default": "'cpu'",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "property",
              "base": "",
              "name": "actuated_joint_names",
              "signature": "actuated_joint_names: list[str]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L49",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "from_config",
              "signature": "from_config(config: RobotConfig, base_link_name: Optional[str] = None, ee_link_names: Optional[Union[Tuple[str, ...], str]] = None, load_meshes: bool = False, load_collision_spheres: bool = False, device: Device = 'cpu', prune: bool = True, self_collision_representation: Literal['sphere', 'capsule'] = 'sphere') -> GraspRobot",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L52",
              "doc": "<p>Build (and cache) a GraspRobot from RobotConfig; pruned to ee_link_names, prune=False for the full robot.</p>",
              "params": [
                {
                  "name": "config",
                  "type": "RobotConfig",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "base_link_name",
                  "type": "Optional[str]",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "ee_link_names",
                  "type": "Optional[Union[Tuple[str, ...], str]]",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "load_meshes",
                  "type": "bool",
                  "default": "False",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "load_collision_spheres",
                  "type": "bool",
                  "default": "False",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "device",
                  "type": "Device",
                  "default": "'cpu'",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "prune",
                  "type": "bool",
                  "default": "True",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "self_collision_representation",
                  "type": "Literal['sphere', 'capsule']",
                  "default": "'sphere'",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "GraspRobot",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "self_collision_ignored_pairs",
              "signature": "self_collision_ignored_pairs(representation: Literal['sphere', 'capsule']) -> Int[np.ndarray, 'pairs 2']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L82",
              "doc": "<p>Load representation-specific pairs against this robot's pruned link names.</p>",
              "params": [
                {
                  "name": "representation",
                  "type": "Literal['sphere', 'capsule']",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Int[np.ndarray, 'pairs 2']",
                "doc": ""
              }
            },
            {
              "kind": "property",
              "base": "",
              "name": "root_pose_7d",
              "signature": "root_pose_7d: Float[torch.Tensor, 7]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L92",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "root_pose_mat",
              "signature": "root_pose_mat: Float[torch.Tensor, '4 4']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L96",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "actuated_joint_limits_torch",
              "signature": "actuated_joint_limits_torch: Float[torch.Tensor, 'num_dofs 2']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L100",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "init_qpos",
              "signature": "init_qpos: Float[torch.Tensor, num_dofs]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L104",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "forward_kinematics_torch",
              "signature": "forward_kinematics_torch(variables: Float[torch.Tensor, '... num_dofs'], root_poses: Optional[Float[torch.Tensor, '... 4 4']] = None) -> Float[torch.Tensor, '... num_links 4 4']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L112",
              "doc": "<p>Torch FK. Two cases:</p><ol><li>floating base: variables packs free qpos (xyz + rxyz or xyz + 6d) then actuated qpos (root_poses must not be provided).</li><li>fixed base: variables is just qpos (root_poses optional).</li></ol>",
              "params": [
                {
                  "name": "variables",
                  "type": "Float[torch.Tensor, '... num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "root_poses",
                  "type": "Optional[Float[torch.Tensor, '... 4 4']]",
                  "default": "None",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Float[torch.Tensor, '... num_links 4 4']",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "inverse_kinematics",
              "signature": "inverse_kinematics(target_poses: Float[torch.Tensor, '... 4 4'], init_qpos: Optional[Float[torch.Tensor, '... num_arm_dofs']] = None, position_tolerance: float = 0.05, orientation_tolerance: float = 0.3, init_sample_range: float = 0.5, use_score_rest: bool = False, locked_joint_indices: Optional[Tuple[int, ...]] = None) -> Tuple[Float[torch.Tensor, '... num_arm_dofs'], Bool[torch.Tensor, ...]]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L191",
              "doc": "",
              "params": [
                {
                  "name": "target_poses",
                  "type": "Float[torch.Tensor, '... 4 4']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "init_qpos",
                  "type": "Optional[Float[torch.Tensor, '... num_arm_dofs']]",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "position_tolerance",
                  "type": "float",
                  "default": "0.05",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "orientation_tolerance",
                  "type": "float",
                  "default": "0.3",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "init_sample_range",
                  "type": "float",
                  "default": "0.5",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "use_score_rest",
                  "type": "bool",
                  "default": "False",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "locked_joint_indices",
                  "type": "Optional[Tuple[int, ...]]",
                  "default": "None",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[Float[torch.Tensor, '... num_arm_dofs'], Bool[torch.Tensor, ...]]",
                "doc": ""
              }
            },
            {
              "kind": "property",
              "base": "",
              "name": "arm_joint_indices",
              "signature": "arm_joint_indices: torch.Tensor",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L286",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "hand_joint_indices",
              "signature": "hand_joint_indices: torch.Tensor",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L290",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "ignore_joint_indices",
              "signature": "ignore_joint_indices: torch.Tensor",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L294",
              "doc": "<p>Actuated joints that are neither arm nor hand (complement of arm ∪ hand indices).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "canonical_collision_spheres",
              "signature": "canonical_collision_spheres: Tuple[torch.Tensor, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L303",
              "doc": "<p>Link-local collision spheres from collision_spheres_path: (num_spheres,4) centers+radius, link indices.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_collision_spheres",
              "signature": "get_collision_spheres(link_poses: Float[torch.Tensor, '... num_links 4 4']) -> Float[torch.Tensor, '... num_spheres 4']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L318",
              "doc": "",
              "params": [
                {
                  "name": "link_poses",
                  "type": "Float[torch.Tensor, '... num_links 4 4']",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Float[torch.Tensor, '... num_spheres 4']",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_contact_points",
              "signature": "get_contact_points(link_poses: Float[torch.Tensor, '... num_links 4 4'], contact_point_indices: Int[torch.Tensor, '... num_contact_points']) -> Float[torch.Tensor, '... num_contact_points 3']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L328",
              "doc": "",
              "params": [
                {
                  "name": "link_poses",
                  "type": "Float[torch.Tensor, '... num_links 4 4']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "contact_point_indices",
                  "type": "Int[torch.Tensor, '... num_contact_points']",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Float[torch.Tensor, '... num_contact_points 3']",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_contact_candidates",
              "signature": "get_contact_candidates(config: RobotConfig, device: Device = 'cpu') -> Tuple[torch.Tensor, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/robot/grasp_robot.py#L339",
              "doc": "<p>Canonical contact candidates: (N,3) link-local centers, (N,) link indices in the chain robot's link order.</p>",
              "params": [
                {
                  "name": "config",
                  "type": "RobotConfig",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "device",
                  "type": "Device",
                  "default": "'cpu'",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[torch.Tensor, torch.Tensor]",
                "doc": ""
              }
            }
          ]
        }
      }
    },
    {
      "id": "api-scene",
      "nav": "Scene",
      "h": "Scene",
      "body": "<div data-api=\"graspkit.scene.scene_description.SceneDescription\"></div><div data-api=\"graspkit.scene.scene_description.MeshDescription\"></div><div data-api=\"graspkit.scene.scene_description.BoxDescription\"></div><div data-api=\"graspkit.scene.scene_geom.SceneGeom\"></div>",
      "sub": "API",
      "api": {
        "graspkit.scene.scene_description.SceneDescription": {
          "kind": "class",
          "name": "SceneDescription",
          "module": "graspkit.scene.scene_description",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L61",
          "anchor": "scenedescription",
          "doc": "<p>Per-scene geometry with a scene id and a manipulation-target actor id.</p>",
          "params": [
            {
              "name": "scene_id",
              "type": "str",
              "default": "''",
              "required": false,
              "doc": ""
            },
            {
              "name": "target_actor_id",
              "type": "str",
              "default": "''",
              "required": false,
              "doc": ""
            },
            {
              "name": "boxes",
              "type": "Dict[str, BoxDescription]",
              "default": "dict()",
              "required": false,
              "doc": ""
            },
            {
              "name": "meshes",
              "type": "Dict[str, MeshDescription]",
              "default": "dict()",
              "required": false,
              "doc": ""
            },
            {
              "name": "floating_scene_id",
              "type": "Optional[str]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "canonical_tabletop_scene_id",
              "type": "Optional[str]",
              "default": "None",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "scene_id",
              "signature": "scene_id: str = ''",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L65",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "target_actor_id",
              "signature": "target_actor_id: str = ''",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L66",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "boxes",
              "signature": "boxes: Dict[str, BoxDescription] = field(default_factory=dict)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L67",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "meshes",
              "signature": "meshes: Dict[str, MeshDescription] = field(default_factory=dict)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L68",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "floating_scene_id",
              "signature": "floating_scene_id: Optional[str] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L69",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "canonical_tabletop_scene_id",
              "signature": "canonical_tabletop_scene_id: Optional[str] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L70",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "load_scene_descriptions_msgpack",
              "signature": "load_scene_descriptions_msgpack(msgpack_path: str, return_splits: bool = False) -> Union[Dict[str, SceneDescription], Dict[Literal['train', 'test'], Dict[str, SceneDescription]]]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L72",
              "doc": "",
              "params": [
                {
                  "name": "msgpack_path",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "return_splits",
                  "type": "bool",
                  "default": "False",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Union[Dict[str, SceneDescription], Dict[Literal['train', 'test'], Dict[str, SceneDescription]]]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "save_scene_descriptions_msgpack",
              "signature": "save_scene_descriptions_msgpack(scene_descriptions: Union[Dict[str, SceneDescription], Dict[Literal['train', 'test'], Dict[str, SceneDescription]]], msgpack_path: str) -> None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L81",
              "doc": "",
              "params": [
                {
                  "name": "scene_descriptions",
                  "type": "Union[Dict[str, SceneDescription], Dict[Literal['train', 'test'], Dict[str, SceneDescription]]]",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "msgpack_path",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "None",
                "doc": ""
              }
            }
          ]
        },
        "graspkit.scene.scene_description.MeshDescription": {
          "kind": "class",
          "name": "MeshDescription",
          "module": "graspkit.scene.scene_description",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L26",
          "anchor": "meshdescription",
          "doc": "<p>Triangle mesh with actor id, optional visual-mesh path, and cached bounds.</p>",
          "params": [
            {
              "name": "actor_id",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "collision_mesh_path",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "scales",
              "type": "Tuple[float, float, float]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "position",
              "type": "Tuple[float, float, float]",
              "default": "(0.0, 0.0, 0.0)",
              "required": false,
              "doc": ""
            },
            {
              "name": "quaternion",
              "type": "Tuple[float, float, float, float]",
              "default": "(1.0, 0.0, 0.0, 0.0)",
              "required": false,
              "doc": ""
            },
            {
              "name": "visual_mesh_path",
              "type": "Optional[str]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "bounds",
              "type": "Optional[Tuple[Tuple[float, float], Tuple[float, float], Tuple[float, float]]]",
              "default": "None",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "actor_id",
              "signature": "actor_id: str",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L30",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "collision_mesh_path",
              "signature": "collision_mesh_path: str",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L31",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "scales",
              "signature": "scales: Tuple[float, float, float]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L32",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "position",
              "signature": "position: Tuple[float, float, float] = (0.0, 0.0, 0.0)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L33",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "quaternion",
              "signature": "quaternion: Tuple[float, float, float, float] = (1.0, 0.0, 0.0, 0.0)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L34",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "visual_mesh_path",
              "signature": "visual_mesh_path: Optional[str] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L35",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "bounds",
              "signature": "bounds: Optional[Tuple[Tuple[float, float], Tuple[float, float], Tuple[float, float]]] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L36",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_visual_mesh_path",
              "signature": "get_visual_mesh_path() -> str",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L38",
              "doc": "<p>Return the visual mesh path, falling back to the collision mesh.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; MeshDescription(\"o\", \"c.obj\", (1.0, 1.0, 1.0)).get_visual_mesh_path()\n'c.obj'\n&gt;&gt;&gt; MeshDescription(\"o\", \"c.obj\", (1.0, 1.0, 1.0), visual_mesh_path=\"v.obj\").get_visual_mesh_path()\n'v.obj'</pre><pre data-code-full hidden>from graspkit.scene.scene_description import MeshDescription\n\nMeshDescription(\"o\", \"c.obj\", (1.0, 1.0, 1.0)).get_visual_mesh_path()\nMeshDescription(\"o\", \"c.obj\", (1.0, 1.0, 1.0), visual_mesh_path=\"v.obj\").get_visual_mesh_path()</pre></div>",
              "params": [],
              "returns": {
                "type": "str",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_bounds",
              "signature": "get_bounds() -> Tuple[Tuple[float, float], Tuple[float, float], Tuple[float, float]]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L48",
              "doc": "",
              "params": [],
              "returns": {
                "type": "Tuple[Tuple[float, float], Tuple[float, float], Tuple[float, float]]",
                "doc": ""
              }
            }
          ]
        },
        "graspkit.scene.scene_description.BoxDescription": {
          "kind": "class",
          "name": "BoxDescription",
          "module": "graspkit.scene.scene_description",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L16",
          "anchor": "boxdescription",
          "doc": "<p>Box primitive, usually for static elements like tables.</p>",
          "params": [
            {
              "name": "actor_id",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "size",
              "type": "Tuple[float, float, float]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "position",
              "type": "Tuple[float, float, float]",
              "default": "(0.0, 0.0, 0.0)",
              "required": false,
              "doc": ""
            },
            {
              "name": "quaternion",
              "type": "Tuple[float, float, float, float]",
              "default": "(1.0, 0.0, 0.0, 0.0)",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "actor_id",
              "signature": "actor_id: str",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L20",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "size",
              "signature": "size: Tuple[float, float, float]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L21",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "position",
              "signature": "position: Tuple[float, float, float] = (0.0, 0.0, 0.0)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L22",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "quaternion",
              "signature": "quaternion: Tuple[float, float, float, float] = (1.0, 0.0, 0.0, 0.0)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_description.py#L23",
              "doc": "",
              "params": [],
              "returns": null
            }
          ]
        },
        "graspkit.scene.scene_geom.SceneGeom": {
          "kind": "class",
          "name": "SceneGeom",
          "module": "graspkit.scene.scene_geom",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_geom.py#L17",
          "anchor": "scenegeom",
          "doc": "<p>Per-scene mesh-backed WarpScenes for grasp / motion optimizers.</p>",
          "params": [
            {
              "name": "scene_descriptions",
              "type": "List[SceneDescription]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "device",
              "type": "Device",
              "default": "'cpu'",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "property",
              "base": "",
              "name": "target_scene",
              "signature": "target_scene: WarpScene",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_geom.py#L34",
              "doc": "<p>The target mesh of each scene (none for a table-only scene); built lazily on first access.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "update",
              "signature": "update(scene_descriptions: List[SceneDescription]) -> None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_geom.py#L47",
              "doc": "<p>Update geometry in place for a scene batch with the same layout; captured pointers stay valid.</p>",
              "params": [
                {
                  "name": "scene_descriptions",
                  "type": "List[SceneDescription]",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "None",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "build_collision_scene_in_base",
              "signature": "build_collision_scene_in_base(T_world_robot: np.ndarray) -> WarpScene",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_geom.py#L87",
              "doc": "<p>One `<code>WarpScene</code><code> (mesh+box) for </code><code>MotionPlanner.plan()</code>`, in robot base frame (FK is base-relative).</p>",
              "params": [
                {
                  "name": "T_world_robot",
                  "type": "np.ndarray",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "WarpScene",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "query_target_object_signed_distances",
              "signature": "query_target_object_signed_distances(query_points: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_geom.py#L94",
              "doc": "<p>Differentiable per-scene target-object SDF (single mesh -&gt; diff path).</p>",
              "params": [
                {
                  "name": "query_points",
                  "type": "torch.Tensor",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[torch.Tensor, torch.Tensor, torch.Tensor]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "query_scene_signed_distances",
              "signature": "query_scene_signed_distances(query_points: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_geom.py#L100",
              "doc": "<p>Full-scene SDF (meshes+primitives), differentiable; drives penetration gradient in motion/grasp-GD.</p>",
              "params": [
                {
                  "name": "query_points",
                  "type": "torch.Tensor",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[torch.Tensor, torch.Tensor, torch.Tensor]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "solver_scenes",
              "signature": "solver_scenes(backend: Literal['mesh', 'sdf_volume'], sdf_bake_padding: float = 0.25, sdf_resolution: int = 64, sdf_voxel_size: Optional[float] = None) -> Tuple[WarpScene, WarpScene]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/scene/scene_geom.py#L113",
              "doc": "<p><code>(target_scene, collision_scene)</code>; <code>sdf_volume</code> swaps the target mesh for an SDF (params in mesh units).</p>",
              "params": [
                {
                  "name": "backend",
                  "type": "Literal['mesh', 'sdf_volume']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "sdf_bake_padding",
                  "type": "float",
                  "default": "0.25",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "sdf_resolution",
                  "type": "int",
                  "default": "64",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "sdf_voxel_size",
                  "type": "Optional[float]",
                  "default": "None",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[WarpScene, WarpScene]",
                "doc": ""
              }
            }
          ]
        }
      }
    },
    {
      "id": "api-motion-plan",
      "nav": "Motion Planning",
      "h": "Motion Planning",
      "body": "<p><code>GraspTrajBuilder</code> filters grasps, optionally IK-converts them onto an arm, then plans with <code>build_motion_planner</code>: a <code>WarpPlanner</code> by default, or its base <code>TorchPlanner</code> when <code>MotionPlannerConfig.backend</code> is <code>\"torch\"</code>.</p><div data-api=\"graspkit.stages.grasp_traj_build.GraspTrajBuilder\"></div><div data-api=\"graspkit.configs.experiment_config.GraspTrajBuilderConfig\"></div><div data-api=\"graspkit.stages.motion_plan.WarpPlanner\"></div><div data-api=\"graspkit.configs.experiment_config.MotionPlannerConfig\"></div>",
      "sub": "API",
      "api": {
        "graspkit.stages.grasp_traj_build.GraspTrajBuilder": {
          "kind": "class",
          "name": "GraspTrajBuilder",
          "module": "graspkit.stages.grasp_traj_build",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/grasp_traj_build/builder.py#L31",
          "anchor": "grasptrajbuilder",
          "doc": "<p>Convert floating-base grasps into deployable trajectories: filter, optional IK-convert to fixed, then plan.</p>",
          "params": [
            {
              "name": "cfg",
              "type": "GraspTrajBuilderConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "device",
              "type": "Device",
              "default": null,
              "required": true,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "filters",
              "signature": "filters: List[Filter]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/grasp_traj_build/builder.py#L50",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build(batch: GraspKitData, start_qpos: Optional[Float[torch.Tensor, ...]] = None, skip_filter: bool = False, target_xy: Optional[torch.Tensor] = None) -> Tuple[GraspKitData, Bool[torch.Tensor, 'B K']]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/grasp_traj_build/builder.py#L60",
              "doc": "<p><code>target_xy</code> (S, 2) overrides the ori-gate target when scenes lack a target mesh (e.g. deploy perception).</p>",
              "params": [
                {
                  "name": "batch",
                  "type": "GraspKitData",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "start_qpos",
                  "type": "Optional[Float[torch.Tensor, ...]]",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "skip_filter",
                  "type": "bool",
                  "default": "False",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "target_xy",
                  "type": "Optional[torch.Tensor]",
                  "default": "None",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[GraspKitData, Bool[torch.Tensor, 'B K']]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "filter_grasps",
              "signature": "filter_grasps(batch: GraspKitData, success: Bool[torch.Tensor, 'B K']) -> Tuple[Bool[torch.Tensor, 'B K'], List[str]]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/grasp_traj_build/builder.py#L113",
              "doc": "",
              "params": [
                {
                  "name": "batch",
                  "type": "GraspKitData",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "success",
                  "type": "Bool[torch.Tensor, 'B K']",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[Bool[torch.Tensor, 'B K'], List[str]]",
                "doc": ""
              }
            }
          ]
        },
        "graspkit.configs.experiment_config.GraspTrajBuilderConfig": {
          "kind": "class",
          "name": "GraspTrajBuilderConfig",
          "module": "graspkit.configs.experiment_config",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L293",
          "anchor": "grasptrajbuilderconfig",
          "doc": "<p>Grasp traj builder: floating-base grasps -&gt; deployable trajectories (stages/traj_builder).</p>",
          "params": [
            {
              "name": "fixed_base_robot_config",
              "type": "Optional[RobotConfig]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "floating_base_robot_config",
              "type": "Optional[RobotConfig]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "convert_to_fixed",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "motion_planner",
              "type": "MotionPlannerConfig",
              "default": "MotionPlannerConfig()",
              "required": false,
              "doc": ""
            },
            {
              "name": "hand_axis",
              "type": "Optional[HandAxis]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "hand_axis_target",
              "type": "Tuple[float, float, float]",
              "default": "(0.0, 0.0, 1.0)",
              "required": false,
              "doc": ""
            },
            {
              "name": "filter_hand_axis_max_angle_deg",
              "type": "float",
              "default": "30.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "contact_avoid_filter",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "pen_filter",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "pen_filter_threshold",
              "type": "float",
              "default": "0.005",
              "required": false,
              "doc": ""
            },
            {
              "name": "rest_pose_filter_max_dist",
              "type": "Optional[float]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "arm_range_fraction",
              "type": "float",
              "default": "0.3",
              "required": false,
              "doc": ""
            },
            {
              "name": "ori_threshold_deg",
              "type": "float",
              "default": "45.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "plan_table_only",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "fixed_base_robot_config",
              "signature": "fixed_base_robot_config: Optional[RobotConfig] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L297",
              "doc": "<p>Fixed-base arm+hand robot trajectories are planned for; also the camera-mount robot. None if floating-only.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "floating_base_robot_config",
              "signature": "floating_base_robot_config: Optional[RobotConfig] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L299",
              "doc": "<p>Floating-base hand-only robot the input grasps come from.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "convert_to_fixed",
              "signature": "convert_to_fixed: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L301",
              "doc": "<p>True: filter + IK-convert floating grasps, build trajectories for the fixed robot. False: plan grasps as-is.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "motion_planner",
              "signature": "motion_planner: MotionPlannerConfig = field(default_factory=MotionPlannerConfig)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L303",
              "doc": "<p>Motion planner config for the trajectory from the init pose to the grasp pose.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand_axis",
              "signature": "hand_axis: Optional[HandAxis] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L305",
              "doc": "<p>Hand-axis cone filter on optimized grasps: which <code>hand_coord_spec</code> axis to check. None disables it.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand_axis_target",
              "signature": "hand_axis_target: Tuple[float, float, float] = (0.0, 0.0, 1.0)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L307",
              "doc": "<p>Direction <code>hand_axis</code> should point, in the robot base frame (world for floating hands).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "filter_hand_axis_max_angle_deg",
              "signature": "filter_hand_axis_max_angle_deg: float = 30.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L309",
              "doc": "<p>Hand-axis cone half-angle in degrees.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "contact_avoid_filter",
              "signature": "contact_avoid_filter: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L311",
              "doc": "<p>Reject grasps where the contact-avoid point is closer to the target than the contact point on that link.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pen_filter",
              "signature": "pen_filter: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L313",
              "doc": "<p>Reject grasps whose hand spheres overlap the target by more than pen_filter_threshold (m); fingertip ok.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pen_filter_threshold",
              "signature": "pen_filter_threshold: float = 0.005",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L315",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "rest_pose_filter_max_dist",
              "signature": "rest_pose_filter_max_dist: Optional[float] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L316",
              "doc": "<p>Reject grasps whose arm qpos (L2 over arm joints) is further than this from robot rest pose; None disables.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "arm_range_fraction",
              "signature": "arm_range_fraction: float = 0.3",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L319",
              "doc": "<p>Half-width (fraction of each arm joint's range around its midpoint) the IK solution must lie in; 1.0 disables.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "ori_threshold_deg",
              "signature": "ori_threshold_deg: float = 45.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L321",
              "doc": "<p>Ori-gate half-angle (deg) for the floating-&gt;fixed IK conversion; 45 = default, 90 effectively disables.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "plan_table_only",
              "signature": "plan_table_only: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L323",
              "doc": "<p>Plan against a table-only scene (object removed), mirroring deployment. Pre/post qpos use the real scene.</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "graspkit.stages.motion_plan.WarpPlanner": {
          "kind": "class",
          "name": "WarpPlanner",
          "module": "graspkit.stages.motion_plan",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/warp_planner.py#L77",
          "anchor": "warpplanner",
          "doc": "<p>TorchPlanner on robokit's MotionPlanner: joint-goal plans, or one plan from start through the lift.</p>",
          "bases": "TorchPlanner",
          "params": [
            {
              "name": "cfg",
              "type": "MotionPlannerConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "robot_config",
              "type": "RobotConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "device",
              "type": "Device",
              "default": "'cpu'",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "method",
              "base": "TorchPlanner",
              "name": "plan",
              "signature": "plan(batch: GraspKitData, start_qpos: Optional[Float[torch.Tensor, num_dofs]] = None, return_pre_post_only: bool = False) -> GraspKitData",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/torch_planner.py#L38",
              "doc": "<p>Plan a padded batch: needs grasp_qpos, returns pre/post-grasp qpos + full_traj_qpos unless pre-post-only.</p>",
              "params": [
                {
                  "name": "batch",
                  "type": "GraspKitData",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "start_qpos",
                  "type": "Optional[Float[torch.Tensor, num_dofs]]",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "return_pre_post_only",
                  "type": "bool",
                  "default": "False",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "GraspKitData",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "TorchPlanner",
              "name": "get_pre_post_grasp_qpos",
              "signature": "get_pre_post_grasp_qpos(scene_geom: SceneGeom, grasp_qpos: Float[torch.Tensor, 'n_scenes n_grasps num_dofs']) -> Tuple[Float[torch.Tensor, 'n_scenes n_grasps num_dofs'], Float[torch.Tensor, 'n_scenes n_grasps num_dofs']]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/torch_planner.py#L200",
              "doc": "",
              "params": [
                {
                  "name": "scene_geom",
                  "type": "SceneGeom",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "grasp_qpos",
                  "type": "Float[torch.Tensor, 'n_scenes n_grasps num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[Float[torch.Tensor, 'n_scenes n_grasps num_dofs'], Float[torch.Tensor, 'n_scenes n_grasps num_dofs']]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "TorchPlanner",
              "name": "interpolate_qpos",
              "signature": "interpolate_qpos(init_qpos: Float[torch.Tensor, '... num_dofs'], end_qpos: Float[torch.Tensor, '... num_dofs'], num_steps: int) -> Float[torch.Tensor, '... num_steps num_dofs']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/torch_planner.py#L255",
              "doc": "",
              "params": [
                {
                  "name": "init_qpos",
                  "type": "Float[torch.Tensor, '... num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "end_qpos",
                  "type": "Float[torch.Tensor, '... num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "num_steps",
                  "type": "int",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Float[torch.Tensor, '... num_steps num_dofs']",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "TorchPlanner",
              "name": "compute_pose_penetration",
              "signature": "compute_pose_penetration(qpos: Float[torch.Tensor, '... num_dofs'], scene_geom: SceneGeom) -> Float[torch.Tensor, ...]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/torch_planner.py#L267",
              "doc": "",
              "params": [
                {
                  "name": "qpos",
                  "type": "Float[torch.Tensor, '... num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "scene_geom",
                  "type": "SceneGeom",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Float[torch.Tensor, ...]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "TorchPlanner",
              "name": "interpolate_trajs",
              "signature": "interpolate_trajs(orig_trajs: Float[torch.Tensor, 'n_scenes n_trajs n_steps num_dofs'], num_steps: int) -> Float[torch.Tensor, 'n_scenes n_trajs num_steps num_dofs']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/torch_planner.py#L288",
              "doc": "",
              "params": [
                {
                  "name": "orig_trajs",
                  "type": "Float[torch.Tensor, 'n_scenes n_trajs n_steps num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "num_steps",
                  "type": "int",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Float[torch.Tensor, 'n_scenes n_trajs num_steps num_dofs']",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "TorchPlanner",
              "name": "compute_energy",
              "signature": "compute_energy(full_traj_qpos: Float[torch.Tensor, 'n_scenes n_trajs n_steps num_dofs'], scene_geom: SceneGeom) -> dict[str, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/torch_planner.py#L310",
              "doc": "<p>Compute E_pen + E_smooth for a trajectory; mirrors <code>optimize_trajs</code> loss, a benchmark reference metric.</p>",
              "params": [
                {
                  "name": "full_traj_qpos",
                  "type": "Float[torch.Tensor, 'n_scenes n_trajs n_steps num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "scene_geom",
                  "type": "SceneGeom",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "dict[str, torch.Tensor]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "TorchPlanner",
              "name": "get_lifting_target_qpos",
              "signature": "get_lifting_target_qpos(post_grasp_qpos: Float[torch.Tensor, 'n_scenes n_grasps num_dofs']) -> Float[torch.Tensor, 'n_scenes n_grasps num_dofs']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/torch_planner.py#L428",
              "doc": "",
              "params": [
                {
                  "name": "post_grasp_qpos",
                  "type": "Float[torch.Tensor, 'n_scenes n_grasps num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Float[torch.Tensor, 'n_scenes n_grasps num_dofs']",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "plan_full",
              "signature": "plan_full(start_qpos: Float[torch.Tensor, 'n_scenes n_grasps num_dofs'], pre_grasp_qpos: Float[torch.Tensor, 'n_scenes n_grasps num_dofs'], grasp_qpos: Float[torch.Tensor, 'n_scenes n_grasps num_dofs'], post_grasp_qpos: Float[torch.Tensor, 'n_scenes n_grasps num_dofs'], lift_qpos: Optional[Float[torch.Tensor, 'n_scenes n_grasps num_dofs']], scene_geom: SceneGeom) -> Tuple[Float[torch.Tensor, 'n_scenes n_grasps num_steps num_dofs'], Float[torch.Tensor, 'n_scenes n_grasps']]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/warp_planner.py#L127",
              "doc": "<p>One robokit plan: start → pre-grasp against the scene, then grasp, the locked hold and the lift without it.</p><p>robokit times every segment but the hold, which keeps num_steps_holding; the plan is sampled every control_dt and padded with its last frame to num_steps when shorter. Returns it and the start → pre-grasp penetration.</p>",
              "params": [
                {
                  "name": "start_qpos",
                  "type": "Float[torch.Tensor, 'n_scenes n_grasps num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "pre_grasp_qpos",
                  "type": "Float[torch.Tensor, 'n_scenes n_grasps num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "grasp_qpos",
                  "type": "Float[torch.Tensor, 'n_scenes n_grasps num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "post_grasp_qpos",
                  "type": "Float[torch.Tensor, 'n_scenes n_grasps num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "lift_qpos",
                  "type": "Optional[Float[torch.Tensor, 'n_scenes n_grasps num_dofs']]",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "scene_geom",
                  "type": "SceneGeom",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[Float[torch.Tensor, 'n_scenes n_grasps num_steps num_dofs'], Float[torch.Tensor, 'n_scenes n_grasps']]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "optimize_trajs",
              "signature": "optimize_trajs(init_trajs: Float[torch.Tensor, '... num_steps num_dofs'], scene_geom: SceneGeom) -> Tuple[Float[torch.Tensor, '... num_steps num_dofs'], Float[torch.Tensor, ...]]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/motion_plan/warp_planner.py#L185",
              "doc": "",
              "params": [
                {
                  "name": "init_trajs",
                  "type": "Float[torch.Tensor, '... num_steps num_dofs']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "scene_geom",
                  "type": "SceneGeom",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Tuple[Float[torch.Tensor, '... num_steps num_dofs'], Float[torch.Tensor, ...]]",
                "doc": ""
              }
            }
          ]
        },
        "graspkit.configs.experiment_config.MotionPlannerConfig": {
          "kind": "class",
          "name": "MotionPlannerConfig",
          "module": "graspkit.configs.experiment_config",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L223",
          "anchor": "motionplannerconfig",
          "doc": "<p>Trajectory optimization params — hand-independent defaults.</p>",
          "params": [
            {
              "name": "backend",
              "type": "Literal['torch', 'warp']",
              "default": "'warp'",
              "required": false,
              "doc": ""
            },
            {
              "name": "pre_grasp_arm_grad_move",
              "type": "float",
              "default": "0.001",
              "required": false,
              "doc": ""
            },
            {
              "name": "pre_grasp_hand_grad_move",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "post_grasp_hand_grad_move",
              "type": "float",
              "default": "1.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "lifting_dist",
              "type": "float",
              "default": "0.3",
              "required": false,
              "doc": ""
            },
            {
              "name": "padding_dist",
              "type": "float",
              "default": "0.025",
              "required": false,
              "doc": ""
            },
            {
              "name": "opt_steps",
              "type": "int",
              "default": "300",
              "required": false,
              "doc": ""
            },
            {
              "name": "pen_weight",
              "type": "float",
              "default": "1.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "arm_smooth_weight",
              "type": "float",
              "default": "100.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "hand_smooth_weight",
              "type": "float",
              "default": "10.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "vel_smooth_weight",
              "type": "float",
              "default": "0.1",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_steps_pre_grasp",
              "type": "int",
              "default": "150",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_steps_pre_to_grasp",
              "type": "int",
              "default": "25",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_steps_holding",
              "type": "int",
              "default": "75",
              "required": false,
              "doc": ""
            },
            {
              "name": "close_during_holding",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_steps_post_grasp",
              "type": "int",
              "default": "50",
              "required": false,
              "doc": ""
            },
            {
              "name": "control_dt",
              "type": "float",
              "default": "0.02",
              "required": false,
              "doc": ""
            },
            {
              "name": "enable_joint_optimization",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "traj_opt_max_iter",
              "type": "int",
              "default": "100",
              "required": false,
              "doc": ""
            },
            {
              "name": "traj_opt_smoothness_weight",
              "type": "float",
              "default": "200.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "traj_opt_accel_smoothness_weight",
              "type": "float",
              "default": "30.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "traj_opt_self_collision_weight",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "traj_opt_self_collision_margin",
              "type": "float",
              "default": "0.02",
              "required": false,
              "doc": ""
            },
            {
              "name": "start_from_grasp_dof_indices",
              "type": "Optional[Tuple[int, ...]]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_samples_per_batch",
              "type": "int",
              "default": "2048",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_grasps_per_scene",
              "type": "int",
              "default": "32",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "backend",
              "signature": "backend: Literal['torch', 'warp'] = 'warp'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L227",
              "doc": "<p>Motion planner backend. 'warp' (default; robokit MotionPlanner, fixed-base only) is faster than 'torch'.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pre_grasp_arm_grad_move",
              "signature": "pre_grasp_arm_grad_move: float = 0.001",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L231",
              "doc": "<p>Pre-grasp arm gradient move</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pre_grasp_hand_grad_move",
              "signature": "pre_grasp_hand_grad_move: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L233",
              "doc": "<p>Pre-grasp hand gradient move</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "post_grasp_hand_grad_move",
              "signature": "post_grasp_hand_grad_move: float = 1.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L235",
              "doc": "<p>Post-grasp hand gradient move</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lifting_dist",
              "signature": "lifting_dist: float = 0.3",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L237",
              "doc": "<p>Lifting distance</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "padding_dist",
              "signature": "padding_dist: float = 0.025",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L239",
              "doc": "<p>Padding distance</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "opt_steps",
              "signature": "opt_steps: int = 300",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L241",
              "doc": "<p>Optimization steps</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pen_weight",
              "signature": "pen_weight: float = 1.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L243",
              "doc": "<p>Penetration weight</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "arm_smooth_weight",
              "signature": "arm_smooth_weight: float = 100.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L245",
              "doc": "<p>Arm smooth weight</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand_smooth_weight",
              "signature": "hand_smooth_weight: float = 10.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L247",
              "doc": "<p>Hand smooth weight</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "vel_smooth_weight",
              "signature": "vel_smooth_weight: float = 0.1",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L249",
              "doc": "<p>Velocity smooth weight</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_steps_pre_grasp",
              "signature": "num_steps_pre_grasp: int = 150",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L251",
              "doc": "<p>Number of steps in pre-grasp</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_steps_pre_to_grasp",
              "signature": "num_steps_pre_to_grasp: int = 25",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L253",
              "doc": "<p>Number of steps in pre-to-grasp</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_steps_holding",
              "signature": "num_steps_holding: int = 75",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L255",
              "doc": "<p>Number of steps in holding</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "close_during_holding",
              "signature": "close_during_holding: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L257",
              "doc": "<p>Close gradually during holding instead of settling at the closed pose.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_steps_post_grasp",
              "signature": "num_steps_post_grasp: int = 50",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L259",
              "doc": "<p>Number of steps in post-grasp</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "control_dt",
              "signature": "control_dt: float = 0.02",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L261",
              "doc": "<p>Seconds per trajectory step, the simulator's control period.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "enable_joint_optimization",
              "signature": "enable_joint_optimization: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L263",
              "doc": "<p>Fixed base, warp: one robokit plan through start, pre-grasp, grasp, hold and lift, timed by robokit except the hold (num_steps_holding); at least num_steps long. False optimizes start → pre-grasp alone and fills the other phases at their step counts.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "traj_opt_max_iter",
              "signature": "traj_opt_max_iter: int = 100",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L269",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "traj_opt_smoothness_weight",
              "signature": "traj_opt_smoothness_weight: float = 200.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L270",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "traj_opt_accel_smoothness_weight",
              "signature": "traj_opt_accel_smoothness_weight: float = 30.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L271",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "traj_opt_self_collision_weight",
              "signature": "traj_opt_self_collision_weight: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L272",
              "doc": "<p>Self-collision weight (warp only). 0 disables the term; the robokit q_goal preset ships it off.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "traj_opt_self_collision_margin",
              "signature": "traj_opt_self_collision_margin: float = 0.02",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L274",
              "doc": "<p>Self-collision margin in metres; only read when the weight is &gt; 0.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "start_from_grasp_dof_indices",
              "signature": "start_from_grasp_dof_indices: Optional[Tuple[int, ...]] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L277",
              "doc": "<p>DOF indices whose start values come from grasp_qpos, not init pose; also locked during post-grasp lift IK.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_samples_per_batch",
              "signature": "num_samples_per_batch: int = 2048",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L281",
              "doc": "<p>Number of samples per batch</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_grasps_per_scene",
              "signature": "num_grasps_per_scene: int = 32",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L283",
              "doc": "<p>Number of grasps to plan per scene (pad/truncate to this)</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "num_steps",
              "signature": "num_steps: int",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L287",
              "doc": "",
              "params": [],
              "returns": null
            }
          ]
        }
      }
    },
    {
      "id": "api-policy",
      "nav": "Policy",
      "h": "Policy",
      "body": "<p>Create a policy with <code>build_grasp_policy(cfg, robot_config, device)</code>.</p><div data-api=\"graspkit.models.grasp_policy.GraspPolicy\"></div><div data-api=\"graspkit.configs.grasp_policy_config.GraspPolicyConfig\"></div>",
      "sub": "API",
      "api": {
        "graspkit.models.grasp_policy.GraspPolicy": {
          "kind": "class",
          "name": "GraspPolicy",
          "module": "graspkit.models.grasp_policy",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/models/grasp_policy.py#L25",
          "anchor": "grasppolicy",
          "doc": "<p>Predicts pre-grasp, grasp and post-grasp configurations from an observation; see <code>build_grasp_policy</code>.</p>",
          "bases": "nn.Module",
          "params": [
            {
              "name": "cfg",
              "type": "GraspPolicyConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "action_dim",
              "type": "int",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "robot_config",
              "type": "RobotConfig",
              "default": null,
              "required": true,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "robot_helper",
              "signature": "robot_helper: GraspRobot | None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/models/grasp_policy.py#L66",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "generator",
              "signature": "generator: CVAE | FlowMatching",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/models/grasp_policy.py#L154",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "forward",
              "signature": "forward(obs: dict, actions: Float[torch.Tensor, 'b n t d']) -> dict[str, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/models/grasp_policy.py#L176",
              "doc": "",
              "params": [
                {
                  "name": "obs",
                  "type": "dict",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "actions",
                  "type": "Float[torch.Tensor, 'b n t d']",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "dict[str, torch.Tensor]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "preprocess",
              "signature": "preprocess(initial: dict, current: dict, calibrated: bool) -> dict[str, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/models/grasp_policy.py#L390",
              "doc": "<p>One scene's input from <code>env.observe()</code> slices plus \"qpos\" (1, 1, D); calibrated views skip the initial.</p>",
              "params": [
                {
                  "name": "initial",
                  "type": "dict",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "current",
                  "type": "dict",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "calibrated",
                  "type": "bool",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "dict[str, torch.Tensor]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_action",
              "signature": "get_action(obs: dict, num_samples_per_scene: int = 1, noise: torch.Tensor | None = None) -> Float[torch.Tensor, 'b n t d']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/models/grasp_policy.py#L411",
              "doc": "<p>Sample actions; guided sampling accepts raw noise shaped (batch * samples, latent_dim).</p>",
              "params": [
                {
                  "name": "obs",
                  "type": "dict",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "num_samples_per_scene",
                  "type": "int",
                  "default": "1",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "noise",
                  "type": "torch.Tensor | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Float[torch.Tensor, 'b n t d']",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "select",
              "signature": "select(obs: dict, actions: Float[torch.Tensor, 'b n t d']) -> torch.Tensor",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/models/grasp_policy.py#L556",
              "doc": "<p>Each scene's best proposal index by the grasp evaluator, on the features <code>get_action</code> left in <code>obs</code>.</p>",
              "params": [
                {
                  "name": "obs",
                  "type": "dict",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "actions",
                  "type": "Float[torch.Tensor, 'b n t d']",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "torch.Tensor",
                "doc": ""
              }
            }
          ]
        },
        "graspkit.configs.grasp_policy_config.GraspPolicyConfig": {
          "kind": "class",
          "name": "GraspPolicyConfig",
          "module": "graspkit.configs.grasp_policy_config",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L5",
          "anchor": "grasppolicyconfig",
          "doc": "<p>Grasp policy architecture, losses and sampling.</p><p>Reusable presets live in <code>graspkit/configs/grasp_policy.py</code>.</p>",
          "params": [
            {
              "name": "num_queries",
              "type": "int",
              "default": "3",
              "required": false,
              "doc": ""
            },
            {
              "name": "convert_rxyz_to_rot6d",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "analytic_euler",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "coupled_floating_base",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "rot_begin_idx",
              "type": "int",
              "default": "3",
              "required": false,
              "doc": ""
            },
            {
              "name": "enable_kinematic_loss",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "vision_encoder",
              "type": "Literal['pointnet', 'pointnet_state', 'spconv', 'rgb', 'rgb_resnet', 'rgb_resnet_views']",
              "default": "'spconv'",
              "required": false,
              "doc": ""
            },
            {
              "name": "vision_encoder_feature_dim",
              "type": "int",
              "default": "512",
              "required": false,
              "doc": ""
            },
            {
              "name": "vision_encoder_normalization",
              "type": "Literal['layernorm', 'groupnorm'] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "vision_encoder_global_feature",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "center_pointcloud",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "pointcloud_scale",
              "type": "float",
              "default": "1.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "train_yaw_augmentation",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "canonical_yaw",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "enable_objectness_prediction",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_points",
              "type": "int",
              "default": "2048",
              "required": false,
              "doc": ""
            },
            {
              "name": "object_points_only",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "generative_model",
              "type": "Literal['cvae', 'flow', 'flow_transformer']",
              "default": "'cvae'",
              "required": false,
              "doc": ""
            },
            {
              "name": "cvae_latent_dim",
              "type": "int",
              "default": "256",
              "required": false,
              "doc": ""
            },
            {
              "name": "cvae_hidden_dim",
              "type": "int",
              "default": "256",
              "required": false,
              "doc": ""
            },
            {
              "name": "cvae_learned_prior",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "normalize_cvae_actions",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "reconstruction_loss",
              "type": "Literal['native', 'phase_std_mse']",
              "default": "'native'",
              "required": false,
              "doc": ""
            },
            {
              "name": "qpos_weight",
              "type": "float",
              "default": "1.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "rot_weight",
              "type": "float",
              "default": "1.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "tl_weight",
              "type": "float",
              "default": "1.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "kinematic_weight",
              "type": "float",
              "default": "100.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "kl_weight",
              "type": "float",
              "default": "0.01",
              "required": false,
              "doc": ""
            },
            {
              "name": "objectness_weight",
              "type": "float",
              "default": "0.02",
              "required": false,
              "doc": ""
            },
            {
              "name": "graspness_weight",
              "type": "float",
              "default": "0.02",
              "required": false,
              "doc": ""
            },
            {
              "name": "enable_penetration_loss",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "penetration_weight",
              "type": "float",
              "default": "0.1",
              "required": false,
              "doc": ""
            },
            {
              "name": "penetration_threshold",
              "type": "float",
              "default": "0.005",
              "required": false,
              "doc": ""
            },
            {
              "name": "penetration_every",
              "type": "int",
              "default": "1",
              "required": false,
              "doc": ""
            },
            {
              "name": "penetration_warmup_iters",
              "type": "int",
              "default": "0",
              "required": false,
              "doc": ""
            },
            {
              "name": "prior_fingertip_weight",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "use_mean",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "cvae_temperature",
              "type": "float",
              "default": "1.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "grasp_evaluator_guidance_steps",
              "type": "int",
              "default": "0",
              "required": false,
              "doc": ""
            },
            {
              "name": "grasp_evaluator_guidance_radius",
              "type": "float",
              "default": "2.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "grasp_evaluator_local_features",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "grasp_evaluator_anchor_state",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "grasp_evaluator_hand_joint_features",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "grasp_evaluator_mask_constant_features",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "num_queries",
              "signature": "num_queries: int = 3",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L13",
              "doc": "<p>Configurations decoded per trajectory; the trainer and evaluator assume three: pre-grasp, grasp and post-grasp.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "convert_rxyz_to_rot6d",
              "signature": "convert_rxyz_to_rot6d: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L16",
              "doc": "<p>Floating base: predict a continuous 6D rotation instead of Euler <code>rxyz</code>, converted back on output.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "analytic_euler",
              "signature": "analytic_euler: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L18",
              "doc": "<p>Use exact, non-iterative Euler conversion after decoding rotations.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "coupled_floating_base",
              "signature": "coupled_floating_base: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L20",
              "doc": "<p>Share wrist rotation across all three poses and wrist translation during closing.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "rot_begin_idx",
              "signature": "rot_begin_idx: int = 3",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L22",
              "doc": "<p>Start index of the floating-base rotation in each action.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "enable_kinematic_loss",
              "signature": "enable_kinematic_loss: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L24",
              "doc": "<p>Add the MSE between predicted and target link positions from forward kinematics.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "vision_encoder",
              "signature": "vision_encoder: Literal['pointnet', 'pointnet_state', 'spconv', 'rgb', 'rgb_resnet', 'rgb_resnet_views'] = 'spconv'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L28",
              "doc": "<p>Observation backbone.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "vision_encoder_feature_dim",
              "signature": "vision_encoder_feature_dim: int = 512",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L30",
              "doc": "<p>Condition feature size passed to the generator.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "vision_encoder_normalization",
              "signature": "vision_encoder_normalization: Literal['layernorm', 'groupnorm'] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L32",
              "doc": "<p>Normalization for the SpConv encoder.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "vision_encoder_global_feature",
              "signature": "vision_encoder_global_feature: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L34",
              "doc": "<p>Return one scene feature; False keeps per-point features for local grasp-point conditioning.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "center_pointcloud",
              "signature": "center_pointcloud: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L36",
              "doc": "<p>Predict floating-base translations relative to the observed point-cloud centroid.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pointcloud_scale",
              "signature": "pointcloud_scale: float = 1.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L38",
              "doc": "<p>Fixed coordinate scale applied only to vision-encoder inputs.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "train_yaw_augmentation",
              "signature": "train_yaw_augmentation: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L40",
              "doc": "<p>Rotate training observations and target poses together around the vertical axis.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "canonical_yaw",
              "signature": "canonical_yaw: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L42",
              "doc": "<p>Use a deterministic observed-point-cloud yaw frame for training and inference.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "enable_objectness_prediction",
              "signature": "enable_objectness_prediction: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L44",
              "doc": "<p>With local features, train a target-segmentation head and mask graspness at inference.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_points",
              "signature": "num_points: int = 2048",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L46",
              "doc": "<p>Points <code>GraspPolicy.preprocess</code> samples from an observed point cloud.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "object_points_only",
              "signature": "object_points_only: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L48",
              "doc": "<p><code>GraspPolicy.preprocess</code> keeps only the target's points, initial and current frames together (hands occlude).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "generative_model",
              "signature": "generative_model: Literal['cvae', 'flow', 'flow_transformer'] = 'cvae'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L52",
              "doc": "<p><code>cvae</code> (<code>models/cvae.py</code>) or flow matching (<code>models/flow_matching.py</code>).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "cvae_latent_dim",
              "signature": "cvae_latent_dim: int = 256",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L54",
              "doc": "<p>Latent dimension of the CVAE.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "cvae_hidden_dim",
              "signature": "cvae_hidden_dim: int = 256",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L56",
              "doc": "<p>Width of the generator networks and optional CVAE learned prior.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "cvae_learned_prior",
              "signature": "cvae_learned_prior: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L58",
              "doc": "<p>Jointly learn a diagonal-Gaussian latent prior conditioned on the observation.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "normalize_cvae_actions",
              "signature": "normalize_cvae_actions: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L60",
              "doc": "<p>Encode standardized actions and decode physical actions using saved mean/std buffers.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "reconstruction_loss",
              "signature": "reconstruction_loss: Literal['native', 'phase_std_mse'] = 'native'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L62",
              "doc": "<p>Native reconstruction loss or MSE scaled by each phase's training action standard deviation.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "qpos_weight",
              "signature": "qpos_weight: float = 1.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L66",
              "doc": "<p>Joint-position reconstruction weight: L1 for CVAE, MSE for flow.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "rot_weight",
              "signature": "rot_weight: float = 1.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L68",
              "doc": "<p>Floating-base rotation L1 weight.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "tl_weight",
              "signature": "tl_weight: float = 1.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L70",
              "doc": "<p>Floating-base translation L1 weight.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kinematic_weight",
              "signature": "kinematic_weight: float = 100.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L72",
              "doc": "<p>Weight of the kinematic loss.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kl_weight",
              "signature": "kl_weight: float = 0.01",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L74",
              "doc": "<p>Weight of the KL term to the unit Gaussian.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "objectness_weight",
              "signature": "objectness_weight: float = 0.02",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L76",
              "doc": "<p>Weight of the local-feature objectness BCE.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "graspness_weight",
              "signature": "graspness_weight: float = 0.02",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L78",
              "doc": "<p>Weight of the local-feature per-point graspness KL.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "enable_penetration_loss",
              "signature": "enable_penetration_loss: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L80",
              "doc": "<p>if True, penalize hand collision-sphere penetration into the target object (needs scene geom at train time)</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "penetration_weight",
              "signature": "penetration_weight: float = 0.1",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L82",
              "doc": "<p>the weight of the penetration loss</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "penetration_threshold",
              "signature": "penetration_threshold: float = 0.005",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L84",
              "doc": "<p>only penetration deeper than this (meters) is penalized (avoids punishing legitimate contact)</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "penetration_every",
              "signature": "penetration_every: int = 1",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L86",
              "doc": "<p>compute the (expensive) penetration loss every N steps to amortize per-batch scene-geometry build</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "penetration_warmup_iters",
              "signature": "penetration_warmup_iters: int = 0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L88",
              "doc": "<p>delay the penetration loss until this iteration so the policy learns to grasp first (replaces fine-tuning)</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "prior_fingertip_weight",
              "signature": "prior_fingertip_weight: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L90",
              "doc": "<p>Attract prior-sampled fingertip collision spheres to the target surface during training.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "use_mean",
              "signature": "use_mean: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L93",
              "doc": "<p>Decode the prior mean for CVAE or integrate from zero noise for flow.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "cvae_temperature",
              "signature": "cvae_temperature: float = 1.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L95",
              "doc": "<p>Scale of the sampled generator noise; ignored when use_mean is True.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "grasp_evaluator_guidance_steps",
              "signature": "grasp_evaluator_guidance_steps: int = 0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L97",
              "doc": "<p>Latent refinement steps using a trained grasp evaluator; zero disables guidance.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "grasp_evaluator_guidance_radius",
              "signature": "grasp_evaluator_guidance_radius: float = 2.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L99",
              "doc": "<p>Maximum L2 displacement from each initial latent draw.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "grasp_evaluator_local_features",
              "signature": "grasp_evaluator_local_features: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L101",
              "doc": "<p>Let the grasp evaluator attend to frozen local visual tokens; the actor stays unchanged.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "grasp_evaluator_anchor_state",
              "signature": "grasp_evaluator_anchor_state: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L103",
              "doc": "<p>Condition the local success critic on the current fixed-base robot configuration.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "grasp_evaluator_hand_joint_features",
              "signature": "grasp_evaluator_hand_joint_features: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L105",
              "doc": "<p>Encode hand joints instead of all actuated joints in the grasp evaluator.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "grasp_evaluator_mask_constant_features",
              "signature": "grasp_evaluator_mask_constant_features: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/grasp_policy_config.py#L107",
              "doc": "<p>Zero constant replay features after scorer normalization.</p>",
              "params": [],
              "returns": null
            }
          ]
        }
      }
    },
    {
      "id": "api-training",
      "nav": "Training",
      "h": "Training",
      "body": "<div data-api=\"graspkit.stages.trainer.Trainer\"></div><div data-api=\"graspkit.configs.experiment_config.TrainerConfig\"></div><div data-api=\"graspkit.datasets.grasp_dataset.GraspDataset\"></div><div data-api=\"graspkit.configs.experiment_config.DatasetConfig\"></div>",
      "sub": "API",
      "api": {
        "graspkit.stages.trainer.Trainer": {
          "kind": "class",
          "name": "Trainer",
          "module": "graspkit.stages.trainer",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/trainer.py#L32",
          "anchor": "trainer",
          "doc": "<p>Trains a <code>GraspPolicy</code> on <code>GraspDataset</code> batches, with DDP, checkpoints and periodic simulation evaluation.</p>",
          "params": [
            {
              "name": "exp_cfg",
              "type": "ExperimentConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "policy_cls",
              "type": "Callable[..., GraspPolicy]",
              "default": "GraspPolicy",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "traj_builder",
              "signature": "traj_builder: GraspTrajBuilder | None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/trainer.py#L62",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "evaluator",
              "signature": "evaluator: BaseEnv | None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/trainer.py#L63",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "train",
              "signature": "train(train_dataloader: DataLoader, test_dataloader: DataLoader | None = None, checkpoint_dir: Path | None = None, metadata: dict | None = None, resume: dict | None = None, publish: Callable[[Path], None] | None = None)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/trainer.py#L95",
              "doc": "<p>Train normally, or save resumable single-device milestones and publish them.</p>",
              "params": [
                {
                  "name": "train_dataloader",
                  "type": "DataLoader",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "test_dataloader",
                  "type": "DataLoader | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "checkpoint_dir",
                  "type": "Path | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "metadata",
                  "type": "dict | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "resume",
                  "type": "dict | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "publish",
                  "type": "Callable[[Path], None] | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "train_graph",
              "signature": "train_graph(dataset: GraspDataset, index_loader: DataLoader)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/trainer.py#L294",
              "doc": "<p><code>train</code> for <code>TrainerConfig.cuda_graph</code>: the same updates, with the step captured once as a CUDA graph.</p>",
              "params": [
                {
                  "name": "dataset",
                  "type": "GraspDataset",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "index_loader",
                  "type": "DataLoader",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "evaluate",
              "signature": "evaluate(test_dataloader: DataLoader, num_samples_per_scene: int = 1)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/stages/trainer.py#L375",
              "doc": "",
              "params": [
                {
                  "name": "test_dataloader",
                  "type": "DataLoader",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "num_samples_per_scene",
                  "type": "int",
                  "default": "1",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": null
            }
          ]
        },
        "graspkit.configs.experiment_config.TrainerConfig": {
          "kind": "class",
          "name": "TrainerConfig",
          "module": "graspkit.configs.experiment_config",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L390",
          "anchor": "trainerconfig",
          "doc": "<p>Training-loop parameters for <code>Trainer</code>.</p><p>AdamW's learning rate drops 10x at two thirds of <code>total_iters</code>; that schedule has no field.</p>",
          "params": [
            {
              "name": "seed",
              "type": "int",
              "default": "0",
              "required": false,
              "doc": ""
            },
            {
              "name": "evaluator",
              "type": "Optional[EnvConfig]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "eval_only",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "eval_on_train",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "track",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "wandb_project_name",
              "type": "str",
              "default": "'GraspKit'",
              "required": false,
              "doc": ""
            },
            {
              "name": "batch_size",
              "type": "int",
              "default": "32",
              "required": false,
              "doc": ""
            },
            {
              "name": "eval_num_envs",
              "type": "int",
              "default": "32",
              "required": false,
              "doc": ""
            },
            {
              "name": "max_eval_batches",
              "type": "int",
              "default": "100",
              "required": false,
              "doc": ""
            },
            {
              "name": "eval_pen_threshold",
              "type": "float",
              "default": "0.005",
              "required": false,
              "doc": ""
            },
            {
              "name": "total_iters",
              "type": "int",
              "default": "100000",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_dataloader_workers",
              "type": "int",
              "default": "12",
              "required": false,
              "doc": ""
            },
            {
              "name": "lr",
              "type": "float",
              "default": "0.0001",
              "required": false,
              "doc": ""
            },
            {
              "name": "weight_decay",
              "type": "float",
              "default": "0.0001",
              "required": false,
              "doc": ""
            },
            {
              "name": "log_freq",
              "type": "int",
              "default": "100",
              "required": false,
              "doc": ""
            },
            {
              "name": "eval_freq",
              "type": "int",
              "default": "10000",
              "required": false,
              "doc": ""
            },
            {
              "name": "save_freq",
              "type": "int",
              "default": "10000",
              "required": false,
              "doc": ""
            },
            {
              "name": "cuda_graph",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "fast_step",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "grad_clip_norm",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "seed",
              "signature": "seed: int = 0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L397",
              "doc": "<p>Seeds model initialization, dataset workers and sampling.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "evaluator",
              "signature": "evaluator: Optional[EnvConfig] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L399",
              "doc": "<p>Simulation for periodic evaluation, built with <code>build_env</code>; None disables evaluation.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "eval_only",
              "signature": "eval_only: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L401",
              "doc": "<p>Skip training, load <code>ExperimentConfig.ckpt_path</code> and evaluate one trajectory per scene.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "eval_on_train",
              "signature": "eval_on_train: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L403",
              "doc": "<p>Evaluate on the train split instead of test, for small scene sets without test scenes.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "track",
              "signature": "track: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L405",
              "doc": "<p>Log to Weights &amp; Biases, which also syncs the TensorBoard scalars.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "wandb_project_name",
              "signature": "wandb_project_name: str = 'GraspKit'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L407",
              "doc": "<p>W&amp;B project used when <code>track</code> is set.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "batch_size",
              "signature": "batch_size: int = 32",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L409",
              "doc": "<p>Global batch size in scenes; each DDP rank gets <code>batch_size // world_size</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "eval_num_envs",
              "signature": "eval_num_envs: int = 32",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L411",
              "doc": "<p>Evaluator parallelism; capped at <code>batch_size</code> during training.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "max_eval_batches",
              "signature": "max_eval_batches: int = 100",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L413",
              "doc": "<p>Stop evaluation after this many data-loader batches.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "eval_pen_threshold",
              "signature": "eval_pen_threshold: float = 0.005",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L415",
              "doc": "<p>Penetration depth (m) below which an eval grasp counts toward pass-rate (report-only).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "total_iters",
              "signature": "total_iters: int = 100000",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L417",
              "doc": "<p>Final training iteration; the loop runs iterations 0 through this value.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_dataloader_workers",
              "signature": "num_dataloader_workers: int = 12",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L419",
              "doc": "<p>Worker processes for the training and evaluation data loaders.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lr",
              "signature": "lr: float = 0.0001",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L421",
              "doc": "<p>AdamW learning rate.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "weight_decay",
              "signature": "weight_decay: float = 0.0001",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L423",
              "doc": "<p>AdamW weight decay.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "log_freq",
              "signature": "log_freq: int = 100",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L425",
              "doc": "<p>Iterations between loss logs, and TensorBoard scalars when tracking.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "eval_freq",
              "signature": "eval_freq: int = 10000",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L427",
              "doc": "<p>Iterations between simulation evaluations; iteration 0 is skipped.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "save_freq",
              "signature": "save_freq: int = 10000",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L429",
              "doc": "<p>Iterations between <code>iter_&lt;N&gt;.pt</code> checkpoints, iteration 0 included.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "cuda_graph",
              "signature": "cuda_graph: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L431",
              "doc": "<p>Capture training on prepared HDF5 views as a CUDA graph; single GPU without evaluation.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "fast_step",
              "signature": "fast_step: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L433",
              "doc": "<p>Use TF32 and fused AdamW for ordinary training steps.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "grad_clip_norm",
              "signature": "grad_clip_norm: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L435",
              "doc": "<p>Clip the gradient norm before an optimizer step; zero disables clipping.</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "graspkit.datasets.grasp_dataset.GraspDataset": {
          "kind": "class",
          "name": "GraspDataset",
          "module": "graspkit.datasets.grasp_dataset",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/grasp_dataset.py#L17",
          "anchor": "graspdataset",
          "doc": "<p>Per-scene point-cloud observations and successful grasp trajectories from a processed HDF5.</p>",
          "bases": "Dataset",
          "params": [
            {
              "name": "cfg",
              "type": "DatasetConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "h5_path",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "scene_description_path",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "split",
              "type": "Literal['train', 'test'] | None",
              "default": "'train'",
              "required": false,
              "doc": ""
            },
            {
              "name": "indices_only",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "method",
              "base": "",
              "name": "to_device",
              "signature": "to_device(device: str | torch.device) -> dict[str, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/grasp_dataset.py#L70",
              "doc": "<p>Load prepared observations and actions once for CUDA batch gathering.</p>",
              "params": [
                {
                  "name": "device",
                  "type": "str | torch.device",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "dict[str, torch.Tensor]",
                "doc": ""
              }
            }
          ]
        },
        "graspkit.configs.experiment_config.DatasetConfig": {
          "kind": "class",
          "name": "DatasetConfig",
          "module": "graspkit.configs.experiment_config",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L439",
          "anchor": "datasetconfig",
          "doc": "<p>Dataset loading parameters for <code>GraspDataset</code>.</p><p>One index is one scene, not one grasp; raw views resample points and actions on every access.</p>",
          "params": [
            {
              "name": "num_actions",
              "type": "int",
              "default": "64",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_points",
              "type": "int",
              "default": "2048",
              "required": false,
              "doc": ""
            },
            {
              "name": "return_actions",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "return_graspness",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "return_object_pointcloud_only",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "cache_in_memory",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "return_rgb",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "fuse_views",
              "type": "int",
              "default": "0",
              "required": false,
              "doc": ""
            },
            {
              "name": "view_noise",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "point_noise",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "aug_prob",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "aug_keep_min",
              "type": "float",
              "default": "0.1",
              "required": false,
              "doc": ""
            },
            {
              "name": "aug_voxel_max",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "aug_drop_wrist_prob",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "aug_rgb_prob",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "num_actions",
              "signature": "num_actions: int = 64",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L446",
              "doc": "<p>Successful action trajectories sampled per scene, with replacement when a scene has fewer.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_points",
              "signature": "num_points: int = 2048",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L448",
              "doc": "<p>Point-cloud points per scene, with replacement when the cloud is smaller.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "return_actions",
              "signature": "return_actions: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L450",
              "doc": "<p>Return the <code>(num_actions, 3, D)</code> supervision tensor; training needs it and evaluation turns it off.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "return_graspness",
              "signature": "return_graspness: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L452",
              "doc": "<p>Return per-point graspness and the best conditioning-point indices, for local-feature SpConv policies; needs data processed with <code>enable_contact_extraction</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "return_object_pointcloud_only",
              "signature": "return_object_pointcloud_only: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L455",
              "doc": "<p>Sample only target-object points instead of the full cropped scene cloud.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "cache_in_memory",
              "signature": "cache_in_memory: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L457",
              "doc": "<p>Cache observations and actions in RAM; sampling stays unchanged.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "return_rgb",
              "signature": "return_rgb: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L459",
              "doc": "<p>Include RGB and camera poses when available.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "fuse_views",
              "signature": "fuse_views: int = 0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L461",
              "doc": "<p>Object-only multi-view data: fuse view 0 (the head) with up to this many other views, a random count per sample, into one cloud. 0: one random view.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "view_noise",
              "signature": "view_noise: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L464",
              "doc": "<p>With fuse_views: std of each view's rigid misalignment, meters (translation) and x10 radians (rotation).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "point_noise",
              "signature": "point_noise: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L466",
              "doc": "<p>With fuse_views: std of per-point Gaussian noise (m).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "aug_prob",
              "signature": "aug_prob: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L468",
              "doc": "<p>With fuse_views: probability of the perception augmentation (<code>datasets/perception_aug.py</code>) per sample; needs renders that keep the neighbours (extract_segments=[]) and camera poses in the processed h5.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "aug_keep_min",
              "signature": "aug_keep_min: float = 0.1",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L471",
              "doc": "<p>Perception aug: fused-cloud keep fraction, log-uniform in [aug_keep_min, 1].</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "aug_voxel_max",
              "signature": "aug_voxel_max: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L473",
              "doc": "<p>Perception aug: voxel dedup size (m), applied with p 0.5 (the old gate pipeline's 3 mm thinning).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "aug_drop_wrist_prob",
              "signature": "aug_drop_wrist_prob: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L475",
              "doc": "<p>Perception aug: probability of the head view alone (no wrist view).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "aug_rgb_prob",
              "signature": "aug_rgb_prob: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L477",
              "doc": "<p>Perception aug: probability of the RGB / MoGe depth-error model (per sample).</p>",
              "params": [],
              "returns": null
            }
          ]
        }
      }
    },
    {
      "id": "api-envs",
      "nav": "Environments",
      "h": "Environments",
      "body": "<p>Create an environment with <code>build_env(cfg, robot_config, device)</code>; <code>EnvConfig</code> selects the backend.</p><div data-api=\"graspkit.envs.BaseEnv\"></div><div data-api=\"graspkit.configs.experiment_config.EnvConfig\"></div><div data-api=\"graspkit.configs.env_config.MsEnvConfig\"></div><div data-api=\"graspkit.configs.env_config.MjEvalConfig\"></div>",
      "sub": "API",
      "api": {
        "graspkit.envs.BaseEnv": {
          "kind": "class",
          "name": "BaseEnv",
          "module": "graspkit.envs",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L23",
          "anchor": "baseenv",
          "doc": "<p>Unified grasp env: <code>MsEnv</code> (ManiSkill), <code>MjEnv</code> (MuJoCo), <code>IsaacEnv</code> (Isaac), <code>RealEnv</code> (hardware).</p><ul><li><code>evaluate</code> is the batched-rollout, reported-SR path shared by all eval call sites.</li><li><code>reset</code>/<code>get_qpos</code>/<code>step_qpos</code>/<code>get_rgb</code>/<code>get_pointcloud</code> are the deploy primitives shared by sim and real.</li><li><code>get_object_pose</code>/<code>set_object_pose</code>/<code>observe</code> drive simulated closed-loop policy evaluation.</li></ul>",
          "bases": "ABC",
          "params": [],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "last_rollouts",
              "signature": "last_rollouts: list[Rollout]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L31",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "reset",
              "signature": "reset(scene: SceneDescription | list[SceneDescription] | None = None, init_qpos: torch.Tensor | None = None, root_pose: torch.Tensor | None = None, camera_pose: torch.Tensor | None = None)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L33",
              "doc": "<p>Initialize the scene (simulators accept a list, one env each), robot, and calibrated camera pose.</p>",
              "params": [
                {
                  "name": "scene",
                  "type": "SceneDescription | list[SceneDescription] | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "init_qpos",
                  "type": "torch.Tensor | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "root_pose",
                  "type": "torch.Tensor | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "camera_pose",
                  "type": "torch.Tensor | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_qpos",
              "signature": "get_qpos() -> torch.Tensor",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L43",
              "doc": "<p>Current joint positions, ours order, shape (B, D).</p>",
              "params": [],
              "returns": {
                "type": "torch.Tensor",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "step_qpos",
              "signature": "step_qpos(q: torch.Tensor)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L47",
              "doc": "<p>Command target <code>q</code> (ours order) and advance one control step.</p>",
              "params": [
                {
                  "name": "q",
                  "type": "torch.Tensor",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_info",
              "signature": "get_info() -> dict[str, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L51",
              "doc": "<p>Return backend metrics for the current state.</p>",
              "params": [],
              "returns": {
                "type": "dict[str, torch.Tensor]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "set_qpos_traj",
              "signature": "set_qpos_traj(traj_qpos: torch.Tensor, qpos_callback: Callable[[int, torch.Tensor], None] | None = None) -> dict[str, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L55",
              "doc": "<p>Stream one <code>(T, D)</code> qpos trajectory through the backend; the callback sees measured qpos.</p>",
              "params": [
                {
                  "name": "traj_qpos",
                  "type": "torch.Tensor",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "qpos_callback",
                  "type": "Callable[[int, torch.Tensor], None] | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "dict[str, torch.Tensor]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_rgb",
              "signature": "get_rgb() -> np.ndarray",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L68",
              "doc": "<p>Latest RGB camera image, shape (H, W, 3), uint8.</p>",
              "params": [],
              "returns": {
                "type": "np.ndarray",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_pointcloud",
              "signature": "get_pointcloud(mask: np.ndarray) -> torch.Tensor",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L72",
              "doc": "<p>Object cloud selected by an aligned image mask, in world frame, shape (B, N, 3).</p>",
              "params": [
                {
                  "name": "mask",
                  "type": "np.ndarray",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "torch.Tensor",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "get_object_pose",
              "signature": "get_object_pose() -> torch.Tensor",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L76",
              "doc": "<p>Target object world poses, shape (B, 7) [xyz, quat_wxyz]; simulators only.</p>",
              "params": [],
              "returns": {
                "type": "torch.Tensor",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "set_object_pose",
              "signature": "set_object_pose(pose: torch.Tensor)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L80",
              "doc": "<p>Teleport the target objects to world poses (B, 7); simulators only.</p>",
              "params": [
                {
                  "name": "pose",
                  "type": "torch.Tensor",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "observe",
              "signature": "observe() -> dict[str, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L84",
              "doc": "<p>Sim-only, robot-free: <code>rgb</code> (B, V, H, W, 3), world <code>xyz</code>/<code>seg</code> (B, N, 3/1), <code>seg_id</code>, <code>camera_poses</code>.</p>",
              "params": [],
              "returns": {
                "type": "dict[str, torch.Tensor]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "evaluate",
              "signature": "evaluate(batch: GraspKitData, record: bool = False) -> dict[str, torch.Tensor]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L88",
              "doc": "<p>Rollout of <code>batch.full_traj_qpos</code>; infos keyed by metric; <code>record=True</code> fills <code>self.last_rollouts</code>.</p>",
              "params": [
                {
                  "name": "batch",
                  "type": "GraspKitData",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "record",
                  "type": "bool",
                  "default": "False",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "dict[str, torch.Tensor]",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "close",
              "signature": "close()",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/envs/base.py#L92",
              "doc": "<p>Release the backend (sim envs / worker pool / hardware).</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "graspkit.configs.experiment_config.EnvConfig": {
          "kind": "class",
          "name": "EnvConfig",
          "module": "graspkit.configs.experiment_config",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L170",
          "anchor": "envconfig",
          "doc": "<p>The tabletop grasp task; select Isaac or MuJoCo with their optional configuration, otherwise ManiSkill.</p>",
          "params": [
            {
              "name": "ms_env_config",
              "type": "MsEnvConfig",
              "default": "MsEnvConfig()",
              "required": false,
              "doc": ""
            },
            {
              "name": "mj_env_config",
              "type": "Optional[MjEvalConfig]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "isaac_env_config",
              "type": "Optional[IsaacEnvConfig]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "mj_native_env_config",
              "type": "Optional[MjNativeEnvConfig]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "load_scenes",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "control_freq",
              "type": "int",
              "default": "50",
              "required": false,
              "doc": ""
            },
            {
              "name": "target_lift_dist",
              "type": "float",
              "default": "0.2",
              "required": false,
              "doc": ""
            },
            {
              "name": "object_mass",
              "type": "float",
              "default": "0.01",
              "required": false,
              "doc": ""
            },
            {
              "name": "floating_object",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "camera_width",
              "type": "int",
              "default": "960",
              "required": false,
              "doc": ""
            },
            {
              "name": "camera_height",
              "type": "int",
              "default": "540",
              "required": false,
              "doc": ""
            },
            {
              "name": "camera_intrinsic",
              "type": "Tuple[Tuple[float, float, float], ...]",
              "default": "(lambda: ((677, 0, 492), (0, 677, 268), (0, 0, 1)))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "camera_near",
              "type": "float",
              "default": "0.01",
              "required": false,
              "doc": ""
            },
            {
              "name": "cameras",
              "type": "Tuple[CameraSpec, ...]",
              "default": "()",
              "required": false,
              "doc": ""
            },
            {
              "name": "contact_offset",
              "type": "float",
              "default": "0.001",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_envs",
              "type": "int",
              "default": "2048",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_seeds",
              "type": "int",
              "default": "1",
              "required": false,
              "doc": ""
            },
            {
              "name": "enable_perturbation",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "perturbation_step_range",
              "type": "Tuple[int, int]",
              "default": "(35, 80)",
              "required": false,
              "doc": ""
            },
            {
              "name": "perturbation_magnitude",
              "type": "float",
              "default": "150.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "num_perturbations",
              "type": "int",
              "default": "8",
              "required": false,
              "doc": ""
            },
            {
              "name": "perturbation_duration",
              "type": "int",
              "default": "1",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "ms_env_config",
              "signature": "ms_env_config: MsEnvConfig = field(default_factory=MsEnvConfig)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L174",
              "doc": "<p>ManiSkill-only settings</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mj_env_config",
              "signature": "mj_env_config: Optional[MjEvalConfig] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L176",
              "doc": "<p>MuJoCo evaluator config; set this to select the MuJoCo backend.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "isaac_env_config",
              "signature": "isaac_env_config: Optional[IsaacEnvConfig] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L178",
              "doc": "<p>Isaac backend config; mutually exclusive with mj_env_config.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mj_native_env_config",
              "signature": "mj_native_env_config: Optional[MjNativeEnvConfig] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L180",
              "doc": "<p>Closed-loop MuJoCo backend config; at most one of the backend configs may be set.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "load_scenes",
              "signature": "load_scenes: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L182",
              "doc": "<p>Whether to load scenes (actors and tables).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "control_freq",
              "signature": "control_freq: int = 50",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L184",
              "doc": "<p>Control frequency.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "target_lift_dist",
              "signature": "target_lift_dist: float = 0.2",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L186",
              "doc": "<p>Target lift distance.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "object_mass",
              "signature": "object_mass: float = 0.01",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L188",
              "doc": "<p>Mass of the object.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "floating_object",
              "signature": "floating_object: bool = False",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L190",
              "doc": "<p>Whether to use a floating object.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "camera_width",
              "signature": "camera_width: int = 960",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L192",
              "doc": "<p>Width of the camera.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "camera_height",
              "signature": "camera_height: int = 540",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L194",
              "doc": "<p>Height of the camera.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "camera_intrinsic",
              "signature": "camera_intrinsic: Tuple[Tuple[float, float, float], ...] = field(default_factory=lambda: ((677, 0, 492), (0, 677, 268), (0, 0, 1)))",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L196",
              "doc": "<p>Intrinsic matrix of the camera.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "camera_near",
              "signature": "camera_near: float = 0.01",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L200",
              "doc": "<p>Near clipping plane of the camera.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "cameras",
              "signature": "cameras: Tuple[CameraSpec, ...] = ()",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L202",
              "doc": "<p>Cameras rendered instead of ManiSkill's <code>base_camera</code> (with <code>ms_env_config.robot_uid</code> None); Isaac and MuJoCo render only these.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "contact_offset",
              "signature": "contact_offset: float = 0.001",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L205",
              "doc": "<p>PhysX contact_offset (m). Larger = compliant/sticky-feeling fingertip pads.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_envs",
              "signature": "num_envs: int = 2048",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L207",
              "doc": "<p>Number of environments to evaluate on</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_seeds",
              "signature": "num_seeds: int = 1",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L209",
              "doc": "<p>Number of seeds</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "enable_perturbation",
              "signature": "enable_perturbation: bool = True",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L211",
              "doc": "<p>Whether to enable perturbation</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "perturbation_step_range",
              "signature": "perturbation_step_range: Tuple[int, int] = (35, 80)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L213",
              "doc": "<p>Perturbation step range</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "perturbation_magnitude",
              "signature": "perturbation_magnitude: float = 150.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L215",
              "doc": "<p>Perturbation magnitude</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "num_perturbations",
              "signature": "num_perturbations: int = 8",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L217",
              "doc": "<p>Number of perturbations</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "perturbation_duration",
              "signature": "perturbation_duration: int = 1",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/experiment_config.py#L219",
              "doc": "<p>Number of consecutive steps to apply each perturbation force (1 = single impulse)</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "graspkit.configs.env_config.MsEnvConfig": {
          "kind": "class",
          "name": "MsEnvConfig",
          "module": "graspkit.configs.env_config",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L56",
          "anchor": "msenvconfig",
          "doc": "<p>ManiSkill-only settings; the task itself is <code>EnvConfig</code>'s.</p>",
          "params": [
            {
              "name": "robot_uid",
              "type": "Optional[str]",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "reconfiguration_freq",
              "type": "Optional[int]",
              "default": "1",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "robot_uid",
              "signature": "robot_uid: Optional[str] = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L60",
              "doc": "<p>ManiSkill agent uid; None registers one from the robot config. A hand-only uid on a floating-base robot means a static base.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "reconfiguration_freq",
              "signature": "reconfiguration_freq: Optional[int] = 1",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L63",
              "doc": "<p>Reconfiguration frequency.</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "graspkit.configs.env_config.MjEvalConfig": {
          "kind": "class",
          "name": "MjEvalConfig",
          "module": "graspkit.configs.env_config",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L83",
          "anchor": "mjevalconfig",
          "doc": "<p>MuJoCo grasp-evaluation settings.</p>",
          "params": [
            {
              "name": "num_workers",
              "type": "int",
              "default": "48",
              "required": false,
              "doc": ""
            },
            {
              "name": "obj_mass",
              "type": "float",
              "default": "0.1",
              "required": false,
              "doc": ""
            },
            {
              "name": "miu_coef",
              "type": "tuple",
              "default": "(0.6, 0.02)",
              "required": false,
              "doc": ""
            },
            {
              "name": "setting",
              "type": "str",
              "default": "'fc'",
              "required": false,
              "doc": ""
            },
            {
              "name": "max_pene",
              "type": "float",
              "default": "0.01",
              "required": false,
              "doc": ""
            },
            {
              "name": "trans_thre",
              "type": "float",
              "default": "0.05",
              "required": false,
              "doc": ""
            },
            {
              "name": "lift_slip_thre",
              "type": "float",
              "default": "0.02",
              "required": false,
              "doc": ""
            },
            {
              "name": "min_lift_dist",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "grasp_interp_steps",
              "type": "int",
              "default": "25",
              "required": false,
              "doc": ""
            },
            {
              "name": "lift_interp_steps",
              "type": "int",
              "default": "50",
              "required": false,
              "doc": ""
            },
            {
              "name": "angle_thre",
              "type": "float",
              "default": "15.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "contact_margin",
              "type": "float",
              "default": "0.01",
              "required": false,
              "doc": ""
            },
            {
              "name": "contact_threshold",
              "type": "float",
              "default": "0.002",
              "required": false,
              "doc": ""
            },
            {
              "name": "fc_force_scale",
              "type": "float",
              "default": "10.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "timestep",
              "type": "float",
              "default": "0.004",
              "required": false,
              "doc": ""
            },
            {
              "name": "solref_timeconst",
              "type": "float",
              "default": "0.005",
              "required": false,
              "doc": ""
            },
            {
              "name": "obj_root",
              "type": "str",
              "default": "str(MUJOCO_EVAL_ROOT / 'example_object')",
              "required": false,
              "doc": ""
            },
            {
              "name": "hand",
              "type": "HandSpec",
              "default": "None",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "num_workers",
              "signature": "num_workers: int = 48",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L87",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "obj_mass",
              "signature": "obj_mass: float = 0.1",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L88",
              "doc": "<p>Object mass (kg).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "miu_coef",
              "signature": "miu_coef: tuple = (0.6, 0.02)",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L90",
              "doc": "<p>[tangential, torsional] friction.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "setting",
              "signature": "setting: str = 'fc'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L92",
              "doc": "<p>Evaluation setting; only <code>\"fc\"</code> is ported.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "max_pene",
              "signature": "max_pene: float = 0.01",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L94",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "trans_thre",
              "signature": "trans_thre: float = 0.05",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L95",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lift_slip_thre",
              "signature": "lift_slip_thre: float = 0.02",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L96",
              "doc": "<p>Tabletop: max object-vs-palm slip during the lift (tight; trans_thre is too loose).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "min_lift_dist",
              "signature": "min_lift_dist: float = 0.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L98",
              "doc": "<p>Tabletop: minimum actual object rise; zero preserves existing evaluator behavior.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "grasp_interp_steps",
              "signature": "grasp_interp_steps: int = 25",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L100",
              "doc": "<p>Interp frames for pregrasp-&gt;grasp and grasp-&gt;squeeze.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lift_interp_steps",
              "signature": "lift_interp_steps: int = 50",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L102",
              "doc": "<p>Interp frames for the squeeze-&gt;lift raise.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "angle_thre",
              "signature": "angle_thre: float = 15.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L104",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "contact_margin",
              "signature": "contact_margin: float = 0.01",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L105",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "contact_threshold",
              "signature": "contact_threshold: float = 0.002",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L106",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "fc_force_scale",
              "signature": "fc_force_scale: float = 10.0",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L107",
              "doc": "<p>Multiplies obj_mass for the fc/tabletop external force (lower = gentler test).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "timestep",
              "signature": "timestep: float = 0.004",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L109",
              "doc": "<p>MuJoCo step; lower (e.g. 0.001) stabilizes an actuated arm+hand grip.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "solref_timeconst",
              "signature": "solref_timeconst: float = 0.005",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L111",
              "doc": "<p>Rigid-contact solref[0]; smaller = more rigid (less penetration).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "obj_root",
              "signature": "obj_root: str = str(MUJOCO_EVAL_ROOT / 'example_object')",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L113",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand",
              "signature": "hand: HandSpec = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/configs/env_config.py#L114",
              "doc": "<p>None -&gt; build_env picks the default (floating SHADOW_HAND, or fixed-base VEGA_SHARPA).</p>",
              "params": [],
              "returns": null
            }
          ]
        }
      }
    },
    {
      "id": "api-data",
      "nav": "Data",
      "h": "Data",
      "body": "<div data-api=\"graspkit.datasets.graspkit_data.GraspKitData\"></div><div data-api=\"graspkit.datasets.replay_data.ReplayData\"></div>",
      "sub": "API",
      "api": {
        "graspkit.datasets.graspkit_data.GraspKitData": {
          "kind": "class",
          "name": "GraspKitData",
          "module": "graspkit.datasets.graspkit_data",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L38",
          "anchor": "graspkitdata",
          "doc": "<p>Batched per-stage tensor payload; supports padded and packed layouts.</p>",
          "params": [
            {
              "name": "scene_ids",
              "type": "list[str]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "scene_descriptions",
              "type": "list[SceneDescription] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "first_indices",
              "type": "Int[Tensor, Bp1] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "pre_grasp_qpos",
              "type": "Float[Tensor, 'B K dof'] | Float[Tensor, 'N dof'] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "grasp_qpos",
              "type": "Float[Tensor, 'B K dof'] | Float[Tensor, 'N dof'] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "post_grasp_qpos",
              "type": "Float[Tensor, 'B K dof'] | Float[Tensor, 'N dof'] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "full_traj_qpos",
              "type": "Float[Tensor, 'B K T dof'] | Float[Tensor, 'N T dof'] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "pre_traj_penetration",
              "type": "Float[Tensor, 'B K'] | Float[Tensor, N] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "pointcloud",
              "type": "Float[Tensor, 'B T Npts 3'] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "pointcloud_rgb",
              "type": "Float[Tensor, 'B T Npts 3'] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "pointcloud_segmentation",
              "type": "Int[Tensor, 'B T Npts 1'] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "target_actor_segmentation_id",
              "type": "Int[Tensor, B] | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "camera_poses",
              "type": "Float[Tensor, 'B T 7'] | None",
              "default": "None",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "scene_ids",
              "signature": "scene_ids: list[str]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L43",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "scene_descriptions",
              "signature": "scene_descriptions: list[SceneDescription] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L44",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "first_indices",
              "signature": "first_indices: Int[Tensor, Bp1] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L47",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pre_grasp_qpos",
              "signature": "pre_grasp_qpos: Float[Tensor, 'B K dof'] | Float[Tensor, 'N dof'] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L50",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "grasp_qpos",
              "signature": "grasp_qpos: Float[Tensor, 'B K dof'] | Float[Tensor, 'N dof'] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L51",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "post_grasp_qpos",
              "signature": "post_grasp_qpos: Float[Tensor, 'B K dof'] | Float[Tensor, 'N dof'] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L52",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "full_traj_qpos",
              "signature": "full_traj_qpos: Float[Tensor, 'B K T dof'] | Float[Tensor, 'N T dof'] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L53",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pre_traj_penetration",
              "signature": "pre_traj_penetration: Float[Tensor, 'B K'] | Float[Tensor, N] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L54",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pointcloud",
              "signature": "pointcloud: Float[Tensor, 'B T Npts 3'] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L57",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pointcloud_rgb",
              "signature": "pointcloud_rgb: Float[Tensor, 'B T Npts 3'] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L58",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "pointcloud_segmentation",
              "signature": "pointcloud_segmentation: Int[Tensor, 'B T Npts 1'] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L59",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "target_actor_segmentation_id",
              "signature": "target_actor_segmentation_id: Int[Tensor, B] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L60",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "camera_poses",
              "signature": "camera_poses: Float[Tensor, 'B T 7'] | None = None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L61",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "num_scenes",
              "signature": "num_scenes: int",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L64",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "is_packed",
              "signature": "is_packed: bool",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L68",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "is_padded",
              "signature": "is_padded: bool",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L72",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "property",
              "base": "",
              "name": "num_grasps_per_scene",
              "signature": "num_grasps_per_scene: Tensor",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L76",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "to_padded",
              "signature": "to_padded() -> GraspKitData",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L85",
              "doc": "",
              "params": [],
              "returns": {
                "type": "GraspKitData",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "to_packed",
              "signature": "to_packed() -> GraspKitData",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L101",
              "doc": "",
              "params": [],
              "returns": {
                "type": "GraspKitData",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "filter",
              "signature": "filter(mask: Tensor) -> GraspKitData",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L123",
              "doc": "<p>Filter packed grasps or scenes by a boolean mask and drop empty scenes.</p>",
              "params": [
                {
                  "name": "mask",
                  "type": "Tensor",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "GraspKitData",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "save",
              "signature": "save(path: str, append: bool = False) -> None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L159",
              "doc": "<p>Save scenes to individual H5 files or groups in a merged H5 file.</p>",
              "params": [
                {
                  "name": "path",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "append",
                  "type": "bool",
                  "default": "False",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "None",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "load",
              "signature": "load(path: str, scene_ids: list[str] | None = None, packed: bool = True) -> GraspKitData",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/graspkit_data.py#L225",
              "doc": "<p>Load scenes in packed form or padded form with uniform grasp counts.</p>",
              "params": [
                {
                  "name": "path",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "scene_ids",
                  "type": "list[str] | None",
                  "default": "None",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "packed",
                  "type": "bool",
                  "default": "True",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "GraspKitData",
                "doc": ""
              }
            }
          ]
        },
        "graspkit.datasets.replay_data.ReplayData": {
          "kind": "class",
          "name": "ReplayData",
          "module": "graspkit.datasets.replay_data",
          "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L18",
          "anchor": "replaydata",
          "doc": "<p>One recorded trajectory for the replay viewer: robot qpos, object pose and the assets to draw them.</p>",
          "params": [
            {
              "name": "qpos",
              "type": "Float[np.ndarray, 'T dof']",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "obj_pose",
              "type": "Float[np.ndarray, 'T 7']",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "robot_path",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "mesh_dir",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "base_type",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "obj_mesh_path",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "obj_scale",
              "type": "float",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "stage",
              "type": "str",
              "default": "'sim-valid'",
              "required": false,
              "doc": ""
            },
            {
              "name": "label",
              "type": "str",
              "default": "'success'",
              "required": false,
              "doc": ""
            },
            {
              "name": "root_pos",
              "type": "Float[np.ndarray, 3]",
              "default": "(lambda: np.zeros(3, np.float32))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "root_quat",
              "type": "Float[np.ndarray, 4]",
              "default": "(lambda: np.array([1, 0, 0, 0], np.float32))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "table_size",
              "type": "Float[np.ndarray, 3]",
              "default": "(lambda: np.zeros(3, np.float32))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "table_pos",
              "type": "Float[np.ndarray, 3]",
              "default": "(lambda: np.zeros(3, np.float32))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "table_quat",
              "type": "Float[np.ndarray, 4]",
              "default": "(lambda: np.array([1, 0, 0, 0], np.float32))()",
              "required": false,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "attribute",
              "base": "",
              "name": "qpos",
              "signature": "qpos: Float[np.ndarray, 'T dof']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L23",
              "doc": "<p>FK variables: floating [xyz, euler_rxyz, joints] or fixed joints.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "obj_pose",
              "signature": "obj_pose: Float[np.ndarray, 'T 7']",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L25",
              "doc": "<p>Object world pose [xyz, quat_wxyz].</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "robot_path",
              "signature": "robot_path: str",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L27",
              "doc": "<p>URDF or MJCF the viewer loads into <code>ViserUrdf</code> / <code>ViserMjcf</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mesh_dir",
              "signature": "mesh_dir: str",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L29",
              "doc": "<p>URDF mesh directory; empty if none.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "base_type",
              "signature": "base_type: str",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L31",
              "doc": "<p><code>\"floating\"</code> or <code>\"fixed\"</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "obj_mesh_path",
              "signature": "obj_mesh_path: str",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L33",
              "doc": "<p>Object collision mesh (loaded via trimesh).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "obj_scale",
              "signature": "obj_scale: float",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L35",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "stage",
              "signature": "stage: str = 'sim-valid'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L36",
              "doc": "<p>Viewer partition, e.g. optimize_grasps.py --verbose's \"sample (unfiltered)\" ... \"sim\".</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "label",
              "signature": "label: str = 'success'",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L38",
              "doc": "<p>Free filter within a stage, e.g. <code>\"success\"</code> or <code>\"failure\"</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "root_pos",
              "signature": "root_pos: Float[np.ndarray, 3] = field(default_factory=lambda: np.zeros(3, np.float32))",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L41",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "root_quat",
              "signature": "root_quat: Float[np.ndarray, 4] = field(default_factory=lambda: np.array([1, 0, 0, 0], np.float32))",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L42",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "table_size",
              "signature": "table_size: Float[np.ndarray, 3] = field(default_factory=lambda: np.zeros(3, np.float32))",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L44",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "table_pos",
              "signature": "table_pos: Float[np.ndarray, 3] = field(default_factory=lambda: np.zeros(3, np.float32))",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L45",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "table_quat",
              "signature": "table_quat: Float[np.ndarray, 4] = field(default_factory=lambda: np.array([1, 0, 0, 0], np.float32))",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L46",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "from_traj",
              "signature": "from_traj(qpos: Float[np.ndarray, 'T dof'], obj_pose: Float[np.ndarray, 'T 7'], robot_config: RobotConfig, scene_desc: SceneDescription, stage: str = 'sim-valid', label: str = 'success') -> ReplayData",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L48",
              "doc": "",
              "params": [
                {
                  "name": "qpos",
                  "type": "Float[np.ndarray, 'T dof']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "obj_pose",
                  "type": "Float[np.ndarray, 'T 7']",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "robot_config",
                  "type": "RobotConfig",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "scene_desc",
                  "type": "SceneDescription",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "stage",
                  "type": "str",
                  "default": "'sim-valid'",
                  "required": false,
                  "doc": ""
                },
                {
                  "name": "label",
                  "type": "str",
                  "default": "'success'",
                  "required": false,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "ReplayData",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "save",
              "signature": "save(replays: list[ReplayData], path: str) -> None",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L78",
              "doc": "",
              "params": [
                {
                  "name": "replays",
                  "type": "list[ReplayData]",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "path",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "None",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "load",
              "signature": "load(path: str) -> list[ReplayData]",
              "source": "https://github.com/openrobokit/graspkit/blob/main/src/graspkit/datasets/replay_data.py#L102",
              "doc": "",
              "params": [
                {
                  "name": "path",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "list[ReplayData]",
                "doc": ""
              }
            }
          ]
        }
      }
    }
  ]
},
{
  "name": "Development",
  "items": [
    {
      "id": "dev",
      "nav": "Development Guide",
      "h": "Development Guide",
      "body": "<h3>Setup</h3><p>GraspKit needs Python 3.10–3.14.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>git clone https://github.com/openrobokit/graspkit.git\ncd graspkit\nuv sync --extra maniskill --extra spconv</pre></div><p><code>uv sync</code> installs the <code>dev</code> and <code>pt-cu126</code> groups by default; the full pipeline also needs the <code>maniskill</code> and <code>spconv</code> extras (Python 3.10–3.12). For another PyTorch build, see <a class=\"inline\" href=\"/docs/graspkit/install/#pytorch-builds\">Installation</a>.</p><h3>Git Workflow</h3><p>Create your own branch for development. Use pull requests with <strong>squash merge</strong> to merge to <code>main</code>. Delete your branch after merging. GitHub CI runs ruff and the tests on a CPU runner without Hugging Face access, where tests marked <code>cuda</code> or <code>hf_assets</code> skip, so run the full suite locally on a GPU before opening a pull request.</p><h3>Formatting, Linting, and Tests</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>make ci                       # format + lint + test\nmake format                   # uvx ruff@0.15.22 format\nmake lint                     # uvx ruff@0.15.22 check --fix\nCUDA_VISIBLE_DEVICES=0 make test  # uv run pytest tests</pre></div><p><code>tests/</code> mirrors <code>src/graspkit/</code> and <code>scripts/</code> (<code>tests/scripts/</code>), one <code>Test&lt;Feature&gt;</code> class per feature; shared fixtures live in <code>tests/conftest.py</code>. Mark tests that need a GPU with <code>@pytest.mark.cuda</code> and tests that need Hugging Face assets (robokit robots, graspkit scenes) with <code>@pytest.mark.hf_assets</code>; import such assets inside the test, since robokit downloads a robot when its module is imported.</p><p>Pre-commit hooks run ruff. Pin the same ruff version the Makefile does; a newer default rule set reports findings CI does not.</p><h3>Running Things</h3><ul><li>Use <code>uv run</code>, never a bare <code>python</code> or <code>pip</code>.</li><li>GPU scripts: pick a free GPU first and set <code>CUDA_VISIBLE_DEVICES</code>.</li><li>Viser scripts serve until interrupted; give them a timeout when scripting them.</li></ul><h3>Configs</h3><p>All config <strong>classes</strong> live in <code>src/graspkit/configs/*_config.py</code>; their <strong>instances</strong> live apart, in <code>configs/experiment/</code>, <code>configs/robot/</code>, <code>configs/grasp_policy.py</code>, <code>configs/mj_hand.py</code> and <code>configs/real_env.py</code>. A new robot or experiment is a module plus one line in the registry of its package's <code>__init__.py</code>. See the <a class=\"inline\" href=\"/docs/graspkit/ref-config-system/\">Config System</a>.</p><h3>Code Style</h3><ul><li>Type hints on function arguments and return types, except <code>None</code>, <code>Any</code> and <code>object</code>.</li><li>No <code>from __future__ import annotations</code>.</li><li>Prefer fewer, larger functions; add a helper only when it removes real duplication.</li><li>No try/except, no <code>hasattr</code>, no fallback paths: assume the environment is correct and let the program crash on errors.</li></ul><h3>The robokit Boundary</h3><p>robokit holds robot-generic math (terms, solvers, lie, geom, robo); graspkit holds the research pipelines and anything tuned per experiment. Code moves to robokit only when a second consumer exists, and it is moved, never copied. robokit is pinned by git rev in <code>pyproject.toml</code> (<code>[tool.uv.sources]</code>): to pick up robokit changes, merge there, bump the rev, then <code>uv sync</code>.</p>"
    }
  ]
},
// END GENERATED graspkit DOCS
    ]
};
