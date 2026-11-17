// retargetingkit documentation. Written by scripts/import_docs.py; the
// hand-written groups outside the GENERATED markers are edited here.
// Loaded only by scripts/build_docs.py -- the browser reads the static
// pages it emits, never this file.
window.RK_DOCS = window.RK_DOCS || {};
window.RK_DOCS.retargetingkit = {
    title: 'retargetingkit',
    lede: "Real-time human-to-robot motion retargeting, built on robokit.",
    groups: [
      // BEGIN GENERATED retargetingkit DOCS (scripts/import_docs.py)
{
  "name": "User Guide",
  "items": [
    {
      "id": "overview",
      "nav": "Overview",
      "h": "Overview",
      "body": "<p><img src=\"/assets/docs/retargetingkit/assets/retargetingkit-banner.webp\" alt=\"RetargetingKit\"></p><p><a class=\"inline\" href=\"https://openrobokit.com/retargetingkit\"><img src=\"/assets/docs/retargetingkit/assets/retargetingkit-paper-teaser.png\" alt=\"Dexterous hand and humanoid motion\"></a></p><p>RetargetingKit maps human motion to robot hands, arms, and humanoids. It combines RoboKit optimization with neural hand models for recorded motion and real-time teleoperation.</p><h3>Key features</h3><ul><li><strong>One pipeline.</strong> Sources produce canonical motion frames; retargeters produce robot commands; targets preview or execute them.</li><li><strong>Hands and bodies.</strong> Solve finger motion, wrist poses, humanoid motion, and combined body-and-hand interactions.</li><li><strong>Optimization + neural.</strong> Choose geometry-aware optimization or trained hand inference for the task.</li><li><strong>Recorded or live.</strong> Retarget clips in parallel or drive robots from VR, gloves, and motion capture.</li></ul><h3>How it works</h3><div class=\"mermaid\">flowchart LR\n    Source[\"`Source\n    *VR · gloves · mocap · recordings*`\"]\n    Retargeter[\"`Retargeter\n    *Optimization + Neural*`\"]\n    Target[\"`Target\n    *Viser · robot hardware*`\"]\n    Source -- \"Frame: hand · arm · body\" --&gt; Retargeter\n    Retargeter -- \"Command: joints · base pose\" --&gt; Target\n    classDef endpoint fill:#dbeafe,stroke:#2563eb,color:#111827\n    classDef solver fill:#dbc8ea,stroke:#8163a1,stroke-width:2px,color:#111827\n    class Source,Target endpoint\n    class Retargeter solver</div><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Component</th><th>Role</th><th>Read more</th></tr></thead><tbody><tr><td>Source</td><td>Read a device or recording.</td><td><a class=\"inline\" href=\"/docs/retargetingkit/pipeline/\">Sources</a></td></tr><tr><td>Frame</td><td>Represent human hand, arm, or body motion.</td><td><a class=\"inline\" href=\"/docs/retargetingkit/frames/\">Frames</a></td></tr><tr><td>Retargeter</td><td>Map motion to a robot through optimization or neural inference.</td><td><a class=\"inline\" href=\"/docs/retargetingkit/protocols/\">Interfaces</a></td></tr><tr><td>Command</td><td>Carry robot joints and an optional base pose.</td><td><a class=\"inline\" href=\"/docs/retargetingkit/ref-targets/\">Commands</a></td></tr><tr><td>Target</td><td>Preview motion or command hardware.</td><td><a class=\"inline\" href=\"/docs/retargetingkit/xhand/\">Targets</a></td></tr></tbody></table><h3>Features</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th><a class=\"inline\" href=\"/docs/retargetingkit/hand-optimization/\"><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/hand-retargeting.webp\" alt=\"Hand retargeting\"></a></th><th><a class=\"inline\" href=\"/docs/retargetingkit/hand-optimization/#inspect-object-contact\"><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/hand-geometry-sim.webp\" alt=\"Geometry-aware hand retargeting\"></a></th><th><a class=\"inline\" href=\"/docs/retargetingkit/hand-optimization/#preview-live-motion\"><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/hand-geometry.webp\" alt=\"Real-time hand teleoperation\"></a></th></tr></thead><tbody><tr><td><strong><a class=\"inline\" href=\"/docs/retargetingkit/hand-optimization/\">Hand retargeting</a></strong> Map tracked hand motion to robot joints.</td><td><strong><a class=\"inline\" href=\"/docs/retargetingkit/hand-optimization/#inspect-object-contact\">Geometry-aware hand retargeting</a></strong> Refine hands against object geometry.</td><td><strong><a class=\"inline\" href=\"/docs/retargetingkit/hand-optimization/#preview-live-motion\">Real-time hand teleoperation</a></strong> Drive a robot hand from live tracking.</td></tr></tbody></table><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th><a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\"><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/humanoid-retargeting.webp\" alt=\"Humanoid retargeting\"></a></th><th><a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\"><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/humanoid-geometry.webp\" alt=\"Geometry-aware humanoid retargeting\"></a></th><th><a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\"><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/humanoid-teleoperation.webp\" alt=\"Real-time humanoid teleoperation\"></a></th></tr></thead><tbody><tr><td><strong><a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">Humanoid retargeting</a></strong> Map captured body motion to humanoids.</td><td><strong><a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">Geometry-aware humanoid retargeting</a></strong> Account for terrain and contact.</td><td><strong><a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">Real-time humanoid teleoperation</a></strong> Drive a humanoid from live motion.</td></tr></tbody></table><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th><a class=\"inline\" href=\"/docs/retargetingkit/full-body/\"><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/full-body-retargeting.webp\" alt=\"Full-body retargeting\"></a></th><th><a class=\"inline\" href=\"/docs/retargetingkit/full-body/#retarget-an-indoor-interaction\"><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/full-body-geometry.webp\" alt=\"Geometry-aware full-body retargeting\"></a></th><th><a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/#control-both-inspire-hands\"><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/full-body-teleoperation.webp\" alt=\"Real-time full-body teleoperation\"></a></th></tr></thead><tbody><tr><td><strong><a class=\"inline\" href=\"/docs/retargetingkit/full-body/\">Full-body retargeting</a></strong> Combine body and hand motion.</td><td><strong><a class=\"inline\" href=\"/docs/retargetingkit/full-body/#retarget-an-indoor-interaction\">Geometry-aware full-body retargeting</a></strong> Preserve scene and object interactions.</td><td><strong><a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/#control-both-inspire-hands\">Real-time full-body teleoperation</a></strong> Drive body and hands together.</td></tr></tbody></table><h3>Quick links</h3><ul><li><a class=\"inline\" href=\"/docs/retargetingkit/quickstart/\">Quickstart</a></li><li><a class=\"inline\" href=\"/docs/retargetingkit/install/\">Installation</a></li><li><a class=\"inline\" href=\"/docs/retargetingkit/pipeline/\">Framework concepts</a></li><li><a class=\"inline\" href=\"/docs/retargetingkit/ref-assets/\">Asset setup</a></li></ul>"
    },
    {
      "id": "quickstart",
      "nav": "Quickstart",
      "h": "Quickstart",
      "body": "<h3>Try it without installing</h3><p>Choose a free GPU and set <code>CUDA_VISIBLE_DEVICES</code>. Then run the interactive hand gallery without installing RetargetingKit:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uvx --from 'retargetingkit[vis]' \\\n    python -m retargetingkit.gallery.hand_retargeting</pre></div><p>Open the Viser URL printed in the terminal. Select a robot and motion, then play or scrub the result. Replace <code>hand_retargeting</code> with any gallery below. Each preview records that gallery's Viser scene.</p><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_retargeting.webp\" alt=\"Hand retargeting in Viser\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_neural.webp\" alt=\"Neural hand retargeting in Viser\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_contact.webp\" alt=\"Hand contact retargeting in Viser\"></th></tr></thead><tbody><tr><td><strong><code>hand_retargeting</code></strong> Retarget tracked hands.</td><td><strong><code>hand_neural</code></strong> Compare neural hand models.</td><td><strong><code>hand_contact</code></strong> Refine hand-object contact.</td></tr></tbody></table><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_object_dexmachina.webp\" alt=\"DexMachina hand-object retargeting in Viser\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_object_gigahands.webp\" alt=\"GigaHands hand-object retargeting in Viser\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_object_oakink2.webp\" alt=\"OakInk2 hand-object retargeting in Viser\"></th></tr></thead><tbody><tr><td><strong><code>hand_object_dexmachina</code></strong> Explore DexMachina interactions.</td><td><strong><code>hand_object_gigahands</code></strong> Explore GigaHands interactions.</td><td><strong><code>hand_object_oakink2</code></strong> Explore OakInk2 interactions.</td></tr></tbody></table><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th><img src=\"/assets/docs/retargetingkit/assets/gallery/humanoid.webp\" alt=\"Humanoid retargeting in Viser\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/humanoid_contact.webp\" alt=\"Humanoid contact retargeting in Viser\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/humanoid_terrain.webp\" alt=\"Humanoid terrain retargeting in Viser\"></th></tr></thead><tbody><tr><td><strong><code>humanoid</code></strong> Browse motions and robot presets.</td><td><strong><code>humanoid_contact</code></strong> Retarget object interactions.</td><td><strong><code>humanoid_terrain</code></strong> Adapt motion to terrain.</td></tr></tbody></table><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th><img src=\"/assets/docs/retargetingkit/assets/gallery/full_body_hoi.webp\" alt=\"Full-body object interaction in Viser\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/full_body_hsi.webp\" alt=\"Full-body scene interaction in Viser\"></th></tr></thead><tbody><tr><td><strong><code>full_body_hoi</code></strong> Retarget body and hand interactions.</td><td><strong><code>full_body_hsi</code></strong> Retarget body motion in furnished scenes.</td></tr></tbody></table><p>To list gallery module names from an installed checkout, run <code>uv run python -m retargetingkit.gallery</code>. Gallery data, robot models, and checkpoints download on first use; complete <a class=\"inline\" href=\"/docs/retargetingkit/ref-assets/\">asset setup</a> first.</p><h3>Solve one humanoid retargeting problem</h3><p>After <a class=\"inline\" href=\"/docs/retargetingkit/install/\">installing</a>, this program maps one frame of the included BVH recording to a Unitree G1 pose on CPU:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.assets.sample_bvh import EXAMPLE_BVH\nfrom retargetingkit.retargeting.humanoid.online import HumanoidRetargeterConfig\nfrom retargetingkit.retargeting.humanoid.presets.g1 import g1_aligned\nfrom retargetingkit.sources.misc.human_frame_file import BodyFileSourceConfig\n\nsource = BodyFileSourceConfig(EXAMPLE_BVH, use_ankle_as_foot_target=True).build()\nretargeter = HumanoidRetargeterConfig(g1_aligned).build(\"cpu\")\ncommand = retargeter.solve(source.get_frame())\nprint(command.qpos.shape, command.base_pose.shape)  # (29,) (7,)\nsource.close()</pre></div><p>The source produces a <code>BodyFrame</code>; the retargeter returns G1 joint positions and a floating-base pose.</p><h3>More examples</h3><p>Galleries are interactive demos. For code to copy, open a runnable script below. Paths are relative to <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples\"><code>src/retargetingkit/examples</code></a>.</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Directory</th><th>Scripts</th></tr></thead><tbody><tr><td><a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/hand_optimization\"><code>hand_optimization</code></a></td><td><a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/hand_optimization/01_online.py\"><code>01_online.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/hand_optimization/02_offline.py\"><code>02_offline.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/hand_optimization/03_batch.py\"><code>03_batch.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/hand_optimization/04_arm.py\"><code>04_arm.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/hand_optimization/05_online_batch.py\"><code>05_online_batch.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/hand_optimization/06_dexycb_online.py\"><code>06_dexycb_online.py</code></a></td></tr><tr><td><a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/hand_neural\"><code>hand_neural</code></a></td><td><a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/hand_neural/02_batch.py\"><code>02_batch.py</code></a></td></tr><tr><td><a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/humanoid\"><code>humanoid</code></a></td><td><a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/humanoid/01_online.py\"><code>01_online.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/humanoid/02_collision.py\"><code>02_collision.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/humanoid/03_self_collision.py\"><code>03_self_collision.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/humanoid/04_offline.py\"><code>04_offline.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/humanoid/05_batch.py\"><code>05_batch.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/humanoid/06_online_batch.py\"><code>06_online_batch.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/humanoid/07_contact.py\"><code>07_contact.py</code></a></td></tr><tr><td><a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/full_body\"><code>full_body</code></a></td><td><a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/full_body/01_hoi.py\"><code>01_hoi.py</code></a>, <a class=\"inline\" href=\"https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/examples/full_body/02_hsi.py\"><code>02_hsi.py</code></a></td></tr></tbody></table><p>Example usage:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis src/retargetingkit/examples/humanoid/01_online.py</pre></div>"
    },
    {
      "id": "install",
      "nav": "Installation",
      "h": "Installation",
      "body": "<p>RetargetingKit needs Python 3.10 or newer.</p><div class=\"doc-tabs\"><div class=\"tabs\"><button type=\"button\" class=\"is-active\">uv</button><button type=\"button\">pip</button></div><div class=\"doc-tabs__pane is-active\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv add retargetingkit</pre></div></div><div class=\"doc-tabs__pane\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>pip install retargetingkit</pre></div></div></div><h3>From source</h3><div class=\"doc-tabs\"><div class=\"tabs\"><button type=\"button\" class=\"is-active\">uv</button><button type=\"button\">pip</button></div><div class=\"doc-tabs__pane is-active\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv add git+https://github.com/openrobokit/retargetingkit.git</pre></div></div><div class=\"doc-tabs__pane\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>pip install git+https://github.com/openrobokit/retargetingkit.git</pre></div></div></div><p>To work on RetargetingKit itself, clone the repository and run <code>uv sync</code>. See the <a class=\"inline\" href=\"/docs/retargetingkit/development/\">Development Guide</a>.</p><h3>Extras</h3><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Extra</th><th>What it adds</th></tr></thead><tbody><tr><td><code>vis</code></td><td>Browser galleries and Viser previews.</td></tr><tr><td><code>contact</code></td><td>Hand-object contact examples.</td></tr><tr><td><code>vision-pro</code>, <code>pico</code>, <code>manus</code>, <code>axis</code></td><td>Live motion sources; see <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Sources</a>.</td></tr><tr><td><code>xarm</code>, <code>inspire</code>, <code>ability</code></td><td>Physical arm and hand targets; see <a class=\"inline\" href=\"/docs/retargetingkit/xarm/\">Targets</a>.</td></tr><tr><td><code>realsense</code></td><td>RealSense camera source.</td></tr><tr><td><code>rby1</code>, <code>dexmate</code></td><td>Humanoid hardware connections.</td></tr></tbody></table><p>The <code>pico</code>, <code>manus</code>, and <code>axis</code> extras use wheels from a separate index:</p><div class=\"doc-tabs\"><div class=\"tabs\"><button type=\"button\" class=\"is-active\">uv</button><button type=\"button\">pip</button></div><div class=\"doc-tabs__pane is-active\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv add \"retargetingkit[manus]\" --index https://jianglongye.github.io/torch_packages_builder</pre></div></div><div class=\"doc-tabs__pane\"><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>pip install \"retargetingkit[manus]\" --extra-index-url https://jianglongye.github.io/torch_packages_builder</pre></div></div></div><p>See <a class=\"inline\" href=\"/docs/retargetingkit/ref-assets/\">Assets</a>, then start with the <a class=\"inline\" href=\"/docs/retargetingkit/quickstart/\">Quickstart</a>.</p>"
    },
    {
      "id": "hand-optimization",
      "nav": "Hand Retargeting",
      "h": "Hand Retargeting",
      "body": "<table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_retargeting.webp\" alt=\"Tracked hand retargeted to an xArm7 and XHand\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_contact.webp\" alt=\"Hand-object contact refinement in Viser\"></th></tr></thead><tbody><tr><td>Hand motion on a robot assembly.</td><td>Hand-object contact refinement.</td></tr></tbody></table><p>Map human hand motion to robot joint positions with RoboKit's online or offline optimization. Start with a recorded example, then connect a <a class=\"inline\" href=\"/docs/retargetingkit/manus/\">Manus glove</a> or <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Apple Vision Pro</a>.</p><h3>How Retargeting Works</h3><p>A source supplies hand keypoints. The optimization retargeter matches them to a robot hand while respecting its joints and, when configured, object contact. Online solving handles one frame at a time; offline solving optimizes a trajectory. Both produce joint positions in the robot's URDF order.</p><h3>Try a recording</h3><p>From the RetargetingKit checkout, run:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis python -m retargetingkit.examples.hand_optimization.01_online</pre></div><p>Open the Viser address printed in the terminal. The example replays hand motion and shows the retargeted robot without connecting hardware. Required assets download on first use. Press <code>Ctrl+C</code> to stop.</p><h3>Use the Python API</h3><p>Build a rig's retargeter and pass it one <code>HandFrame</code> per update:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.configs.teleop.hand.manus_sharpa import RIGHT_MANUS_SHARPA_CONFIG\n\nretargeter = RIGHT_MANUS_SHARPA_CONFIG.retargeter.build(device)\n\nfor frame in stream:  # HandFrame: right-hand MANO-21 keypoints\n    command = retargeter.solve(frame)\n    qpos = command.qpos  # (22,), Sharpa joints in URDF order</pre><pre data-code-full hidden>import pickle\n\nimport numpy as np\nimport warp as wp\n\nfrom retargetingkit.assets.example_data import MANUS_DATA_RIGHT_PKL\nfrom retargetingkit.sources.frames import HandFrame, HandPose\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\n# Three recorded wrist-local MANO-21 frames from a right Manus glove.\nkeypoints = pickle.load(open(MANUS_DATA_RIGHT_PKL, \"rb\"))[\"keypoints\"][:3]\nstream = [HandFrame({\"right\": HandPose(points)}) for points in keypoints]\nfrom retargetingkit.configs.teleop.hand.manus_sharpa import RIGHT_MANUS_SHARPA_CONFIG\n\nretargeter = RIGHT_MANUS_SHARPA_CONFIG.retargeter.build(device)\n\nfor frame in stream:  # HandFrame: right-hand MANO-21 keypoints\n    command = retargeter.solve(frame)\n    qpos = command.qpos  # (22,), Sharpa joints in URDF order\nassert qpos.shape == (22,)\nassert np.isfinite(qpos).all()</pre></div><h3>Preview live motion</h3><p>Complete the source setup first. For a right Manus glove and XHand:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra manus --extra vis scripts/teleop/hand.py \\\n    manus_xhand --mode viser</pre></div><p>The live runtime defaults to <code>cuda:0</code>. Select an available GPU with <code>CUDA_VISIBLE_DEVICES</code> before launching, or pass <code>--device cpu</code> for optimization on CPU.</p><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Optimization rig</th><th>Source</th><th>Robot hand</th></tr></thead><tbody><tr><td><code>manus_xhand</code></td><td>Manus</td><td>XHand</td></tr><tr><td><code>manus_sharpa</code></td><td>Manus</td><td>Sharpa Wave</td></tr><tr><td><code>visionpro_xhand</code></td><td>Vision Pro</td><td>XHand</td></tr><tr><td><code>visionpro_sharpa</code></td><td>Vision Pro</td><td>Sharpa Wave</td></tr></tbody></table><p>Inspect a preset's device settings with <code>uv run scripts/teleop/hand.py manus_xhand --help</code>. Vision Pro requires the <code>vision-pro</code> extra.</p><h3>Connect the robot</h3><p>After checking motion in the viewer, configure the matching <a class=\"inline\" href=\"/docs/retargetingkit/xhand/\">XHand</a> or <a class=\"inline\" href=\"/docs/retargetingkit/sharpa-hand/\">Sharpa</a> target.</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Mode</th><th>Behavior</th></tr></thead><tbody><tr><td><code>viser</code></td><td>Preview only; the robot target is not opened. This is the default.</td></tr><tr><td><code>real</code></td><td>Connect and command the physical hand.</td></tr><tr><td><code>both</code></td><td>Command the physical hand and show Viser.</td></tr></tbody></table><p>For example, <code>manus_xhand --mode both --target.serial-port /dev/ttyUSB0</code> enables XHand hardware alongside the preview.</p><h3>Work with trajectories</h3><p>Use the packaged examples to inspect solver construction and array shapes:</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Module under <code>retargetingkit.examples.hand_optimization</code></th><th>Task</th></tr></thead><tbody><tr><td><code>01_online</code></td><td>Retarget one stream frame by frame</td></tr><tr><td><code>02_offline</code></td><td>Optimize one recorded trajectory</td></tr><tr><td><code>03_batch</code></td><td>Optimize several trajectories together</td></tr><tr><td><code>04_arm</code></td><td>Retarget an arm and hand together</td></tr><tr><td><code>05_online_batch</code></td><td>Retarget several arm-hand streams online</td></tr></tbody></table><p>Run any module with <code>uv run --extra vis python -m &lt;MODULE&gt;</code>. Robot outputs use URDF joint order. Online inputs have shape <code>(K, 3)</code> or <code>(B, K, 3)</code>, with points ordered by <code>spec.target_names</code>; offline inputs add a time axis.</p><h3>Inspect object contact</h3><p>Browse DexYCB recordings with an xArm7–XHand or xArm7–Ability assembly and compare contact refinement in the viewer:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis python -m retargetingkit.gallery.hand_contact</pre></div><p>For learned inference, including the supported live <code>manus_sharpa_neural</code> rig, continue with <a class=\"inline\" href=\"/docs/retargetingkit/neural-hand/\">neural hand retargeting</a>.</p>"
    },
    {
      "id": "neural-hand",
      "nav": "Neural Hand Retargeting",
      "h": "Neural Hand Retargeting",
      "body": "<p><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_neural.webp\" alt=\"Neural hand inference in the interactive gallery\"></p><p>Train a model for one robot hand, then map wrist-local MANO-21 keypoints to joint positions in URDF order. Curated checkpoints support Allegro, Sharpa Wave, and XHand.</p><h3>How Inference Works</h3><p>The source returns a <code>HandFrame</code>; the selected checkpoint maps its wrist-local keypoints to a <code>QPosCommand</code>. A checkpoint belongs to one robot hand, so choose the matching hand and model before connecting a target.</p><h3>Try a trained model</h3><p>Run the gallery from the RetargetingKit checkout:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis python -m retargetingkit.gallery.hand_neural</pre></div><p>Open the printed Viser address to choose a hand and checkpoint. The selected model downloads on first use and is cached. These commands default to CUDA; select an available GPU with <code>CUDA_VISIBLE_DEVICES</code>, or use <code>--device cpu</code>.</p><h3>Use the Python API</h3><p>Load a named checkpoint for its hand and pass it one <code>HandFrame</code> per update:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.retargeting.hand.neural import NeuralHandAssetRetargeterConfig\nfrom retargetingkit.retargeting.hand.presets import HANDS\n\nconfig = NeuralHandAssetRetargeterConfig(\"sharpa_motion_alignment\", HANDS[\"sharpa\"])\nretargeter = config.build(device)\n\nfor frame in stream:  # HandFrame: right-hand MANO-21 keypoints\n    command = retargeter.solve(frame)\n    qpos = command.qpos  # (22,), Sharpa joint angles</pre><pre data-code-full hidden>import pickle\n\nimport numpy as np\nimport warp as wp\n\nfrom retargetingkit.assets.example_data import MANUS_DATA_RIGHT_PKL\nfrom retargetingkit.sources.frames import HandFrame, HandPose\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\n# Three recorded wrist-local MANO-21 frames from a right Manus glove.\nkeypoints = pickle.load(open(MANUS_DATA_RIGHT_PKL, \"rb\"))[\"keypoints\"][:3]\nstream = [HandFrame({\"right\": HandPose(points)}) for points in keypoints]\nfrom retargetingkit.retargeting.hand.neural import NeuralHandAssetRetargeterConfig\nfrom retargetingkit.retargeting.hand.presets import HANDS\n\nconfig = NeuralHandAssetRetargeterConfig(\"sharpa_motion_alignment\", HANDS[\"sharpa\"])\nretargeter = config.build(device)\n\nfor frame in stream:  # HandFrame: right-hand MANO-21 keypoints\n    command = retargeter.solve(frame)\n    qpos = command.qpos  # (22,), Sharpa joint angles\nassert qpos.shape == (22,)\nassert np.isfinite(qpos).all()</pre></div><p>With a configured <a class=\"inline\" href=\"/docs/retargetingkit/manus/\">Manus glove</a>, preview live Sharpa inference:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra manus --extra vis scripts/teleop/hand.py \\\n    manus_sharpa_neural --mode viser</pre></div><p>This preset loads <code>sharpa_motion_alignment_contact_inhand</code>. Set <code>--mode real</code> or <code>--mode both</code> to connect and command a physical <a class=\"inline\" href=\"/docs/retargetingkit/sharpa-hand/\">Sharpa hand</a>.</p><h3>Train a recipe</h3><p>Five training recipes live in <code>scripts/teleop/neural_hand/configs/training/</code>:</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Hand</th><th>Recipe filename</th></tr></thead><tbody><tr><td>Allegro</td><td><code>allegro_motion_alignment.yaml</code></td></tr><tr><td>XHand</td><td><code>xhand_motion_alignment.yaml</code></td></tr><tr><td>Sharpa</td><td><code>sharpa_motion_alignment.yaml</code></td></tr><tr><td>Sharpa with contact data</td><td><code>sharpa_motion_alignment_contact.yaml</code></td></tr><tr><td>Sharpa with in-hand contact data</td><td><code>sharpa_motion_alignment_contact_inhand.yaml</code></td></tr></tbody></table><p>For example:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run scripts/teleop/neural_hand/train.py \\\n    scripts/teleop/neural_hand/configs/training/xhand_motion_alignment.yaml</pre></div><p>The YAML selects named motion and calibration assets, loss weights, and an output directory. Training writes <code>train.yaml</code> with data provenance and <code>weights.pt</code> to <code>ik_model/xhand_motion_alignment/</code> for this recipe. The output directory must not already exist; choose a new <code>output</code> path for another run.</p><h3>Record your own motion</h3><p>Record the right Manus glove at 30 Hz:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra manus --extra vis scripts/teleop/neural_hand/record_motion.py \\\n    --output motion.npz</pre></div><p>Press <code>Enter</code> to start, then <code>Enter</code> again to stop and save. Add <code>--no-viz</code> to record without a viewer. To use this recording for training, register it as a named asset in <code>retargetingkit.assets.calib</code> and reference that name under <code>data.unsupervised</code> in your YAML.</p><p>Replay the recording through your trained model:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis scripts/teleop/neural_hand/visualize.py xhand \\\n    --checkpoints ik_model/xhand_motion_alignment --data motion.npz</pre></div><h3>Add contact supervision</h3><p>The Sharpa contact workflow generates candidate YCB grasps, then captures matching human poses:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra contact scripts/teleop/neural_hand/contact_generate.py \\\n    scripts/teleop/neural_hand/configs/contact/sharpa_ycb_contact.yaml\n\nuv run --extra contact --extra manus --extra vis \\\n    scripts/teleop/neural_hand/contact_capture.py \\\n    --specs sharpa_grasp.npz --output training_data.npz</pre></div><p>Use the capture viewer to record, skip, and save samples. Register the result as a calibration asset and reference it under <code>data.contact</code> in a training YAML.</p><p>For paired human/robot measurements, <code>record_pairs.py</code> supports Manus and Sharpa. It starts in neural control mode and commands the physical hand; <code>t</code> toggles teaching mode, <code>c</code> captures a pair, and <code>q</code> saves and exits.</p>"
    },
    {
      "id": "arm-retargeting",
      "nav": "Arm Retargeting",
      "h": "Arm Retargeting",
      "body": "<p><img src=\"/assets/docs/retargetingkit/assets/gallery/hand_retargeting.webp\" alt=\"An xArm7 carrying an XHand in the interactive retargeting gallery\"></p><p>Map a tracked wrist to an xArm6 or xArm7 end effector. The arm solver uses RoboKit inverse kinematics with position, orientation, joint-limit, and smoothness terms.</p><h3>How Retargeting Works</h3><p>The source reports wrist poses in an <code>ArmFrame</code>. Calibration establishes the robot's home pose; inverse kinematics then maps relative wrist motion to a joint-position command for each arm.</p><h3>Preview one arm</h3><p>Complete <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro setup</a>, then run:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vision-pro scripts/teleop/arm.py \\\n    visionpro_xarm7 --mode viser --device cpu \\\n    --source.ip &lt;VISION_PRO_IP&gt;</pre></div><p>Open the Viser URL printed in the terminal. <code>visionpro_xarm6</code> selects xArm6; <code>visionpro_dual_xarm7</code> controls two independent arms.</p><h3>Use the Python API</h3><p>Build the rig's right-arm retargeter and pass it one <code>ArmFrame</code> per update:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.configs.teleop.arm.visionpro_xarm7 import RIGHT_VISIONPRO_XARM7_CONFIG\n\nretargeter = RIGHT_VISIONPRO_XARM7_CONFIG.retargeters[\"right\"].build(device)\n\nfor frame in stream:  # ArmFrame: world-frame wrist [x, y, z, qw, qx, qy, qz]\n    command = retargeter.solve(frame)\n    qpos = command.qpos  # (7,), xArm7 joint positions</pre><pre data-code-full hidden>import numpy as np\nimport warp as wp\n\nfrom retargetingkit.sources.frames import ArmFrame\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\n# A right wrist moving 10 cm forward.\nstream = [ArmFrame({\"right\": np.array([x, -0.2, 1.1, 1, 0, 0, 0], dtype=np.float32)}) for x in (0.0, 0.05, 0.1)]\nfrom retargetingkit.configs.teleop.arm.visionpro_xarm7 import RIGHT_VISIONPRO_XARM7_CONFIG\n\nretargeter = RIGHT_VISIONPRO_XARM7_CONFIG.retargeters[\"right\"].build(device)\n\nfor frame in stream:  # ArmFrame: world-frame wrist [x, y, z, qw, qx, qy, qz]\n    command = retargeter.solve(frame)\n    qpos = command.qpos  # (7,), xArm7 joint positions\nassert qpos.shape == (7,)\nassert np.isfinite(qpos).all()</pre></div><p>The first frame is the calibration origin, so it returns the home pose.</p><h3>Retarget an arm and hand</h3><p>Optimize the arm and fingers from each synchronized <code>ArmHandFrame</code>. The wrist pose is in world coordinates; hand keypoints are wrist-local. This example builds only the solvers and needs no tracking device or robot connection.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.configs.teleop.arm_hand.visionpro_xarm7_xhand import RIGHT_VISIONPRO_XARM7_XHAND_CONFIG\n\nconfig = RIGHT_VISIONPRO_XARM7_XHAND_CONFIG\narm = config.arm_retargeters[\"right\"].build(device)\nhand = config.hand_retargeters[\"right\"].build(device)\n\nfor frame in stream:  # ArmHandFrame: synchronized wrist and finger poses\n    arm_qpos = arm.solve(frame.arm).qpos  # (7,), xArm7 joints\n    hand_qpos = hand.solve(frame.hand).qpos  # (12,), XHand joints</pre><pre data-code-full hidden>import pickle\n\nimport numpy as np\nimport warp as wp\n\nfrom retargetingkit.assets.example_data import MANUS_DATA_RIGHT_PKL\nfrom retargetingkit.sources.frames import ArmFrame, ArmHandFrame, HandFrame, HandPose\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\nkeypoints = pickle.load(open(MANUS_DATA_RIGHT_PKL, \"rb\"))[\"keypoints\"][:3]\n# Recorded finger poses paired with a wrist moving 10 cm forward.\nstream = [\n    ArmHandFrame(\n        ArmFrame({\"right\": np.array([0.05 * i, -0.2, 1.1, 1, 0, 0, 0], dtype=np.float32)}),\n        HandFrame({\"right\": HandPose(points)}),\n    )\n    for i, points in enumerate(keypoints)\n]\nfrom retargetingkit.configs.teleop.arm_hand.visionpro_xarm7_xhand import RIGHT_VISIONPRO_XARM7_XHAND_CONFIG\n\nconfig = RIGHT_VISIONPRO_XARM7_XHAND_CONFIG\narm = config.arm_retargeters[\"right\"].build(device)\nhand = config.hand_retargeters[\"right\"].build(device)\n\nfor frame in stream:  # ArmHandFrame: synchronized wrist and finger poses\n    arm_qpos = arm.solve(frame.arm).qpos  # (7,), xArm7 joints\n    hand_qpos = hand.solve(frame.hand).qpos  # (12,), XHand joints\nassert arm_qpos.shape == (7,)\nassert hand_qpos.shape == (12,)\nassert np.isfinite(arm_qpos).all()\nassert np.isfinite(hand_qpos).all()</pre></div><h3>Calibration and motion</h3><p>The first tracked wrist pose becomes the calibration origin and maps to the robot's configured home pose. Wrist movement is then applied relative to that origin.</p><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Override for the right arm</th><th>Effect</th><th>Default</th></tr></thead><tbody><tr><td><code>--retargeters.right.translation-scale</code></td><td>Scale wrist translation</td><td><code>1.5</code></td></tr><tr><td><code>--retargeters.right.ee-gain</code></td><td>Blend each new end-effector pose with the previous pose</td><td><code>1.0</code></td></tr></tbody></table><p>A smaller gain smooths movement more. Use <code>visionpro_xarm7 --help</code> for all settings. Arm-hand rigs use the prefix <code>--arm-retargeters.right</code> instead.</p><h3>Connect a robot</h3><p>Use the <a class=\"inline\" href=\"/docs/retargetingkit/xarm/\">xArm guide</a> for SDK installation, network setup, and hardware mode. At startup, hardware mode moves each arm to its model-specific home pose.</p><p>To move fingers along with the wrist, choose a supported assembly on the <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro page</a>. Quest controller teleoperation has its own <a class=\"inline\" href=\"/docs/retargetingkit/quest3/\">standalone workflow</a> and button calibration.</p>"
    },
    {
      "id": "humanoid-retargeting",
      "nav": "Humanoid Retargeting",
      "h": "Humanoid Retargeting",
      "body": "<table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th><img src=\"/assets/docs/retargetingkit/assets/gallery/humanoid.webp\" alt=\"Human motion retargeted to a G1 in Viser\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/humanoid_terrain.webp\" alt=\"Humanoid adapting motion to terrain in Viser\"></th></tr></thead><tbody><tr><td>Human motion mapped to a humanoid.</td><td>Humanoid motion on terrain.</td></tr></tbody></table><p>Map recorded or live body motion to G1 at 50 Hz. The runtime sends robot root pose and joint positions to its configured targets; the SONIC target derives joint velocities for whole-body control.</p><h3>How Retargeting Works</h3><p>A body source returns named joint poses in a <code>BodyFrame</code>. The humanoid retargeter maps them to G1 links and solves a base pose plus joint positions. A Viser target displays the command; a SONIC target publishes it for whole-body control.</p><h3>Preview recorded motion</h3><p>Start with the packaged example, which opens a Viser preview without a SONIC publisher:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis python -m retargetingkit.examples.humanoid.01_online</pre></div><p>Open the printed viewer address. Required assets download on first use; press <code>Ctrl+C</code> to stop.</p><h3>Use the Python API</h3><p>Build the G1 retargeter and pass it one <code>BodyFrame</code> per update:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.retargeting.humanoid.online import HumanoidRetargeterConfig\nfrom retargetingkit.retargeting.humanoid.presets.g1 import g1_aligned\n\nretargeter = HumanoidRetargeterConfig(g1_aligned).build(device)\n\ncommand = retargeter.solve(frame)  # BodyFrame: named world-frame joint poses\nbase_pose = command.base_pose  # (7,), [x, y, z, qw, qx, qy, qz]\nqpos = command.qpos  # (29,), G1 joints in URDF order</pre><pre data-code-full hidden>import numpy as np\nimport warp as wp\n\nfrom retargetingkit.assets.sample_bvh import EXAMPLE_BVH\nfrom retargetingkit.sources.misc.human_frame_file import BodyFileSourceConfig\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\nsource = BodyFileSourceConfig(EXAMPLE_BVH, use_ankle_as_foot_target=True).build()\nframe = source.get_frame()\nfrom retargetingkit.retargeting.humanoid.online import HumanoidRetargeterConfig\nfrom retargetingkit.retargeting.humanoid.presets.g1 import g1_aligned\n\nretargeter = HumanoidRetargeterConfig(g1_aligned).build(device)\n\ncommand = retargeter.solve(frame)  # BodyFrame: named world-frame joint poses\nbase_pose = command.base_pose  # (7,), [x, y, z, qw, qx, qy, qz]\nqpos = command.qpos  # (29,), G1 joints in URDF order\nassert base_pose.shape == (7,)\nassert qpos.shape == (29,)\nassert np.isfinite(qpos).all()\nsource.close()</pre></div><h3>Publish to SONIC</h3><p>The bundled BVH preset needs no tracking device:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis scripts/teleop/humanoid.py bvh_g1_sonic_viser</pre></div><p>Every named humanoid preset publishes to SONIC on port <code>5556</code>. The <code>_viser</code> suffix adds visualization of the same motion; it does not disable SONIC. Run a single publisher on that port. The live runtime defaults to <code>cuda:0</code>; select an available GPU with <code>CUDA_VISIBLE_DEVICES</code>, or set <code>--device cpu</code>.</p><p>Override a recording and performer height:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis scripts/teleop/humanoid.py bvh_g1_sonic_viser \\\n    --source.path /path/to/motion.bvh --source.human-height 1.80</pre></div><h3>Choose a live source</h3><p>Complete <a class=\"inline\" href=\"/docs/retargetingkit/axis-studio/\">Axis Studio</a> or <a class=\"inline\" href=\"/docs/retargetingkit/pico/\">PICO</a> setup before starting its rig.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra axis --extra vis scripts/teleop/humanoid.py \\\n    axisstudio_g1_sonic_viser --source.port 7012 --source.human-height 1.75\n\nuv run --extra pico --extra vis scripts/teleop/humanoid.py \\\n    pico_g1_sonic_viser --source.no-use-ankle-as-foot-target</pre></div><p>The PICO override uses tracked foot poses instead of substituting ankle poses. For a PICO recording, use <code>picofile_g1_sonic_viser --source.path /path/to/recording.npz</code>. Remove <code>_viser</code> from these preset names to publish without a viewer.</p><p>Use <code>uv run scripts/teleop/humanoid.py &lt;RIG&gt; --help</code> to inspect all overrides.</p><h3>Control both Inspire hands</h3><p>This combined rig opens one PICO connection, publishes G1 motion to SONIC, and connects both physical Inspire hands. It has no preview mode.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra pico --extra inspire scripts/teleop/humanoid_hand.py \\\n    pico_g1_inspire --source.no-use-ankle-as-foot-target \\\n    --left-hand.serial-port /dev/ttyUSB0 \\\n    --right-hand.serial-port /dev/ttyUSB1</pre></div><p><code>B</code> toggles the right hand between open and closed; <code>Y</code> toggles the left. These are preset poses, not continuous finger tracking. See <a class=\"inline\" href=\"/docs/retargetingkit/inspire/\">Inspire Hand</a> for the serial connection.</p><h3>Run G1 in simulation</h3><p>Configure the deployment checkout described in <a class=\"inline\" href=\"/docs/retargetingkit/g1/\">G1 and SONIC</a>, then start a SONIC rig and launch:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>bash scripts/tools/launch_sonic_sim.sh</pre></div><p>The launcher opens MuJoCo and deployment in a <code>tmux</code> session. In the deployment pane, press <code>]</code>, then <code>Enter</code>, to start the policy. The <a class=\"inline\" href=\"/docs/retargetingkit/g1/\">G1 target guide</a> also covers connection to a real robot.</p>"
    },
    {
      "id": "full-body",
      "nav": "Full-Body Retargeting",
      "h": "Full-Body Retargeting",
      "body": "<table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th><img src=\"/assets/docs/retargetingkit/assets/gallery/full_body_hoi.webp\" alt=\"SAGA body and hand interaction retargeted in Viser\"></th><th><img src=\"/assets/docs/retargetingkit/assets/gallery/full_body_hsi.webp\" alt=\"ParaHome body and scene interaction retargeted in Viser\"></th></tr></thead><tbody><tr><td>Body, hand, and object interaction.</td><td>Body and hand motion in a furnished scene.</td></tr></tbody></table><p>Retarget body motion, articulated fingers, and object interaction together to a G1 with Inspire hands. RetargetingKit loads SAGA or ParaHome clips; RoboKit solves the robot motion and object poses.</p><h3>How Retargeting Works</h3><p>Each clip supplies body motion, finger motion, and interaction geometry. The body solver tracks human poses on G1; hand solvers track the fingers; grasp and scene terms keep the combined motion aligned with objects.</p><h3>Retarget one object interaction</h3><p>Run the SAGA example from the RetargetingKit checkout:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis python -m retargetingkit.examples.full_body.01_hoi</pre></div><p>The default clip contains a body, captured right-hand motion, and one object. After solving, open the printed Viser address to play or scrub the result. Press <code>Ctrl+C</code> to stop. The example chooses CUDA when available and otherwise uses CPU.</p><p>Pass <code>--npz /path/to/clip.npz</code> for a local SAGA FullGraspPose recording. The example still fetches its SAGA asset bundle, including object meshes.</p><h3>Retarget an indoor interaction</h3><p>ParaHome adds bimanual interaction and a furnished scene. List the available intervals in a sequence:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis python -m retargetingkit.examples.full_body.02_hsi \\\n    --sequence s1 --list</pre></div><p>Select an interval from that list:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis python -m retargetingkit.examples.full_body.02_hsi \\\n    --sequence s1 --index 7 --scene_clearance</pre></div><p><code>--scene_clearance</code> adjusts body placement to reduce penetration into furniture. Use <code>--no_scene</code> to omit the room, or <code>--data_root /path/to/ParaHome/data</code> to provide local ParaHome data.</p><h3>Browse more clips</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis python -m retargetingkit.gallery.full_body_hoi\nuv run --extra vis python -m retargetingkit.gallery.full_body_hsi</pre></div><p>Choose a subject or sequence, then a clip in the viewer. By default, both galleries use captured finger poses and contact refinement. Add <code>--grasp</code> to optimize and hold grasps over contact intervals. The ParaHome gallery also exposes scene clearance in its viewer.</p><p>Both galleries accept <code>--max_frames 60 --headless</code> to solve a shorter selection and exit without opening a viewer. Dataset and model assets download on first use; gallery startup can fetch more than the selected clip.</p><p>These workflows produce motion for inspection. For live G1 control, follow <a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">humanoid teleoperation</a>.</p>"
    },
    {
      "id": "teleoperation",
      "nav": "Teleoperation",
      "h": "Teleoperation",
      "body": "<table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/hand-geometry.webp\" alt=\"Real-time robot hand teleoperation\"></th><th><img src=\"/assets/docs/retargetingkit/assets/built-in-tasks/humanoid-teleoperation.webp\" alt=\"Real-time humanoid teleoperation\"></th></tr></thead><tbody><tr><td>Dexterous hand control.</td><td>Humanoid motion control.</td></tr></tbody></table><p>A named rig connects a source, retargeter, and target in one command. Choose the flow that matches the motion you want to control, then complete the linked device setup.</p><h3>Choose a flow</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Flow</th><th>Motion source</th><th>Robot output</th></tr></thead><tbody><tr><td><code>hand.py</code></td><td><a class=\"inline\" href=\"/docs/retargetingkit/manus/\">Manus</a> or <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro</a></td><td>One robot hand</td></tr><tr><td><code>arm.py</code></td><td><a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro</a></td><td>One or two xArms</td></tr><tr><td><code>arm_hand.py</code></td><td><a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro</a></td><td>Synchronized arms and hands</td></tr><tr><td><code>humanoid.py</code></td><td>BVH, <a class=\"inline\" href=\"/docs/retargetingkit/axis-studio/\">Axis Studio</a>, <a class=\"inline\" href=\"/docs/retargetingkit/pico/\">PICO</a>, or a PICO recording</td><td>G1 motion through SONIC, with optional Viser</td></tr><tr><td><code>humanoid_hand.py</code></td><td><a class=\"inline\" href=\"/docs/retargetingkit/pico/\">PICO</a> body motion and buttons</td><td>G1 plus two physical Inspire hands</td></tr></tbody></table><p><a class=\"inline\" href=\"/docs/retargetingkit/quest3/\">Quest 3</a>, <a class=\"inline\" href=\"/docs/retargetingkit/realsense/\">RealSense</a>, and <a class=\"inline\" href=\"/docs/retargetingkit/zed/\">ZED</a> have standalone device scripts. They are not inputs to these named rigs.</p><h3>Select a rig</h3><p>List the available rigs, then inspect a selected rig's settings:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run scripts/teleop/hand.py --help\nuv run scripts/teleop/hand.py manus_xhand --help</pre></div><p>The first command lists rigs; the second shows the selected rig's fields and defaults. Install the source's dependencies before running it; each device page provides a complete command.</p><h3>Override settings</h3><p>Configuration fields become dotted options. For example, replay a Vision Pro recording at its original rate and scale wrist movement:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vision-pro scripts/teleop/arm.py \\\n    visionpro_xarm7 --mode viser --device cpu \\\n    --source.recording-path data/vision_pro.pkl \\\n    --source.recording-fps 50 \\\n    --retargeters.right.translation-scale 0.5</pre></div><p>Create the recording with the <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro recorder</a> first. Recording files do not store frame rate, so pass the rate used when capturing.</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Field family</th><th>Example</th></tr></thead><tbody><tr><td>Source</td><td><code>--source.ip</code>, <code>--source.recording-path</code></td></tr><tr><td>Arm connection</td><td><code>--arms.right.ip</code></td></tr><tr><td>Arm solver in <code>arm.py</code></td><td><code>--retargeters.right.translation-scale</code></td></tr><tr><td>Arm solver in <code>arm_hand.py</code></td><td><code>--arm-retargeters.right.translation-scale</code></td></tr><tr><td>Humanoid target tuple</td><td><code>--targets.0.port</code></td></tr></tbody></table><p>The fields available depend on the selected rig. Boolean switches may use a <code>--no-</code> form; PICO's foot mapping uses <code>--source.no-use-ankle-as-foot-target</code>.</p><h3>Choose the output</h3><p><code>hand</code>, <code>arm</code>, and <code>arm_hand</code> default to <code>viser</code>:</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Mode</th><th>Output</th></tr></thead><tbody><tr><td><code>--mode viser</code></td><td>Browser preview</td></tr><tr><td><code>--mode real</code></td><td>Physical robot</td></tr><tr><td><code>--mode both</code></td><td>Physical robot and browser preview</td></tr></tbody></table><p>Humanoid flows choose targets through the rig. A <code>*_sonic_viser</code> rig publishes SONIC commands and displays the same motion in Viser. The viewer works without a SONIC receiver. <code>humanoid_hand</code> opens physical Inspire hands and has no preview mode.</p><p>SONIC runs as a separate receiver. See <a class=\"inline\" href=\"/docs/retargetingkit/g1/\">G1 / SONIC</a> for sender and receiver settings, simulation, and deployment.</p><p>Start with <a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">Humanoid teleoperation</a> for body motion, or <a class=\"inline\" href=\"/docs/retargetingkit/quickstart/\">Quickstart</a> for a recording that needs no hardware.</p><h3>Use the Python API</h3><p>A rig is a source, a retargeter, and targets. This loop runs the BVH rig without a tracking device or robot: SONIC publishes commands whether or not a receiver is running.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.configs.teleop.humanoid.bvh_g1_sonic import BVH_G1_SONIC_CONFIG\n\nconfig = BVH_G1_SONIC_CONFIG\nsource = config.source.build()\nretargeter = config.retargeter.build(device)\ntargets = [target_config.build() for target_config in config.targets]\n\nwhile True:\n    frame = source.get_frame()\n    if frame is not None:\n        command = retargeter.solve(frame)\n        for target in targets:\n            target.set_command(command)</pre><pre data-code-full hidden>import numpy as np\nimport warp as wp\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\nfrom retargetingkit.configs.teleop.humanoid.bvh_g1_sonic import BVH_G1_SONIC_CONFIG\n\nconfig = BVH_G1_SONIC_CONFIG\nsource = config.source.build()\nretargeter = config.retargeter.build(device)\ntargets = [target_config.build() for target_config in config.targets]\n\nwhile True:\n    frame = source.get_frame()\n    if frame is not None:\n        command = retargeter.solve(frame)\n        for target in targets:\n            target.set_command(command)\n    break\nassert command.qpos.shape == (29,)\nassert np.isfinite(command.qpos).all()\nfor target in targets:\n    target.close()\nsource.close()</pre></div>"
    },
    {
      "id": "ref-assets",
      "nav": "Assets",
      "h": "Assets",
      "body": "<p>Recordings, checkpoints, and robot models download on first use. Importing <code>retargetingkit</code> alone downloads nothing.</p><h3>Cache</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Asset</th><th>Source</th><th>Cache</th></tr></thead><tbody><tr><td>Recordings, calibration, training data</td><td><code>openrobokit/retargetingkit</code></td><td><code>~/.retargetingkit/assets/&lt;revision&gt;/</code></td></tr><tr><td>Neural checkpoints</td><td>Same dataset, <code>models/ik_model/</code></td><td>Inside the same revision cache</td></tr><tr><td>Robot URDFs, meshes, collision and contact data</td><td>RoboKit assets</td><td><code>~/.robokit/assets/&lt;revision&gt;/</code></td></tr><tr><td>MANO / SMPL-X body models</td><td>Local model files</td><td><code>ROBOKIT_BODY_MODELS</code> or <code>~/.robokit/body_models/</code></td></tr><tr><td>YCB meshes</td><td>YCB benchmark S3</td><td><code>~/.retargetingkit/ycb/</code></td></tr></tbody></table><h3>Resolve an asset</h3><p>Use named accessors so examples and applications share the same data:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.assets import calib, neural_hand, sample_bvh\n\ncalibration = calib.get(\"manus_calib\")\ncheckpoint = neural_hand.get(\"sharpa_motion_alignment_contact_inhand\")\nmotion = sample_bvh.EXAMPLE_BVH</pre></div><p>Robot models come from RoboKit:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from robokit.assets.robots.end_effectors import sharpa_hand\n\nurdf = sharpa_hand.URDF_PATH_RIGHT</pre></div><h3>Pinned revision</h3><p><code>retargetingkit.assets.REVISION</code> pins the dataset commit; accessors call <code>robokit.assets.fetch</code> with it, the dataset id, and <code>~/.retargetingkit</code>. Bump the pin after publishing new data. To download again, delete the matching <code>~/.retargetingkit/assets/&lt;revision&gt;/.done/</code> marker.</p>"
    }
  ]
},
{
  "name": "Concepts",
  "items": [
    {
      "id": "pipeline",
      "nav": "Pipeline",
      "h": "Pipeline",
      "body": "<p>RetargetingKit connects a motion source, a retargeter, and one or more targets. RoboKit provides the robot models and optimization tools used by the solvers.</p><div class=\"mermaid\">flowchart TD\n    accTitle: RetargetingKit framework\n    accDescr: Sources provide hand, arm, or body frames. Hand optimization, neural hand inference, and arm IK produce joint commands. Humanoid retargeting produces a base pose and joint command. Targets display the motion or send it to robot hardware and SONIC.\n\n    SOURCE[\"Sources&lt;br/&gt;VR · gloves · mocap · recordings\"]\n    HAND[\"HandFrame&lt;br/&gt;MANO-21 keypoints\"]\n    ARM[\"ArmFrame&lt;br/&gt;World wrist poses\"]\n    BODY[\"BodyFrame&lt;br/&gt;Named joint poses\"]\n    OPT[\"Hand&lt;br/&gt;optimization\"]\n    NEURAL[\"Neural hand&lt;br/&gt;inference\"]\n    IK[\"Arm IK\"]\n    HUMANOID[\"Humanoid&lt;br/&gt;retargeting\"]\n    JOINTS[\"QPosCommand&lt;br/&gt;Joint positions\"]\n    BASE[\"BasePoseQPosCommand&lt;br/&gt;Base pose + joints\"]\n    ROBOT[\"Hand / arm targets&lt;br/&gt;Hardware · Viser\"]\n    BODY_TARGET[\"Humanoid targets&lt;br/&gt;Viser · SONIC transport\"]\n\n    SOURCE --&gt; HAND\n    SOURCE --&gt; ARM\n    SOURCE --&gt; BODY\n    HAND --&gt; OPT\n    HAND --&gt; NEURAL\n    ARM --&gt; IK\n    BODY --&gt; HUMANOID\n    OPT --&gt; JOINTS\n    NEURAL --&gt; JOINTS\n    IK --&gt; JOINTS\n    HUMANOID --&gt; BASE\n    JOINTS --&gt; ROBOT\n    BASE --&gt; BODY_TARGET\n\n    class SOURCE framework-source</div><p>On narrow screens, scroll horizontally to read the full diagram.</p><p><code>ArmHandFrame</code> synchronizes wrist and finger observations from one source; the runtime sends its arm and hand frames through their respective solvers. SONIC forwards humanoid commands to a separate control process for simulation or G1 hardware.</p><h3>Three stages</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Stage</th><th>Responsibility</th><th>Examples</th></tr></thead><tbody><tr><td>Source</td><td>Convert device data or a recording into a canonical frame</td><td>Vision Pro, Manus, PICO, BVH</td></tr><tr><td>Retargeter</td><td>Map human motion to robot joints</td><td>Arm IK, hand optimization, neural hand, humanoid</td></tr><tr><td>Target</td><td>Display or send the result</td><td>Viser, robot hardware, SONIC transport</td></tr></tbody></table><p>A named <strong>rig</strong> supplies the matching source, solver, robot, and connection settings. The runtime builds them and runs the control loop. Start with a <a class=\"inline\" href=\"/docs/retargetingkit/teleoperation/\">named rig</a> for a complete workflow.</p><p>The diagram covers the canonical retargeting paths. <a class=\"inline\" href=\"/docs/retargetingkit/quest3/\">Quest 3</a> has a standalone controller workflow. The <a class=\"inline\" href=\"/docs/retargetingkit/pico/\">PICO body-and-hands rig</a> adds B/Y button commands for Inspire hand opening and closing alongside the body retargeter.</p><h3>Shared data</h3><p>Frames describe human motion. Commands describe a single solved robot pose. The source handles device axes and joint ordering before a retargeter receives the frame.</p><p>Hands use wrist-local MANO-21 keypoints; arms use world-frame wrist poses; bodies use named joint poses in a Z-up world frame. See <a class=\"inline\" href=\"/docs/retargetingkit/frames/\">Canonical frames</a> for shapes and units.</p><h3>One loop</h3><p>For an initialized hand source, matching retargeter, and joint-position target:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>frame = source.get_frame()\nif frame is not None:\n    command = retargeter.solve(frame)\n    target.set_qpos(command.qpos)</pre></div><p>Humanoid runtimes call <code>target.set_command(command)</code> so the target receives the base pose together with the joints. The runtime also owns startup and cleanup; the snippet shows only one update.</p><p>See <a class=\"inline\" href=\"/docs/retargetingkit/protocols/\">Interfaces</a> to build a custom pipeline, or <a class=\"inline\" href=\"https://github.com/openrobokit/robokit/blob/main/docs/concepts/robot.md\">RoboKit's robot model</a> for the underlying kinematics.</p>"
    },
    {
      "id": "frames",
      "nav": "Canonical frames",
      "h": "Canonical frames",
      "body": "<p>Source adapters convert native device data into a shared format. Solvers receive positions in meters, scalar-first quaternions, and explicit joint names.</p><h3>Units and poses</h3><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Value</th><th>Convention</th></tr></thead><tbody><tr><td>Position</td><td>Meters</td></tr><tr><td>Robot joint position</td><td>Radians, in actuated URDF order</td></tr><tr><td>Quaternion</td><td><code>(qw, qx, qy, qz)</code></td></tr><tr><td>Pose</td><td><code>(x, y, z, qw, qx, qy, qz)</code></td></tr><tr><td>Body coordinates</td><td>Right-handed Z-up world frame</td></tr></tbody></table><p>Canonical poses have shape <code>(7,)</code>. Native device matrices and quaternion orders are converted inside each source adapter.</p><h3>Human motion</h3><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Frame</th><th>Content</th></tr></thead><tbody><tr><td><code>HandFrame</code></td><td><code>hands</code>: side → wrist-local <code>HandPose</code></td></tr><tr><td><code>ArmFrame</code></td><td><code>wrists</code>: side → world-frame <code>(7,)</code> pose</td></tr><tr><td><code>ArmHandFrame</code></td><td>Synchronized <code>arm</code> and <code>hand</code> frames</td></tr><tr><td><code>BodyFrame</code></td><td><code>joint_names</code>, <code>(J, 7)</code> world poses, <code>human_height</code></td></tr></tbody></table><p>Sides are <code>\"left\"</code> and <code>\"right\"</code>. A frame can contain one available hand or both; check the requested side before consuming it. Body joint names travel with the data so the solver can select the joints it needs.</p><h3>Hand keypoints</h3><p><code>HandPose.positions</code> contains 21 wrist-local MANO-21 points. It also carries joint orientations, a valid-point mask, and joint names.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>import numpy as np\nfrom retargetingkit.sources.frames import HandFrame, HandPose, MANO21\n\npositions = np.zeros((21, 3), dtype=np.float32)  # shape example\nframe = HandFrame({\"right\": HandPose(positions)})\nframe.hands[\"right\"].positions.shape  # (21, 3)\nMANO21.WRIST, MANO21.INDEX_TIP        # 0, 8\nMANO21.THUMB_TIP, MANO21.PINKY_TIP    # 4, 20</pre></div><p>Replace the zero array with tracked keypoints before solving. See the <a class=\"inline\" href=\"/docs/retargetingkit/ref-frames/\">Frame API</a> for all fields and defaults.</p><h3>Robot output</h3><p><code>QPosCommand</code> carries <code>(Q,)</code> joint positions. <code>BasePoseQPosCommand</code> adds a <code>(7,)</code> floating-base world pose. Neither type includes a time or batch dimension; those belong to recordings and lower-level solver APIs.</p>"
    },
    {
      "id": "protocols",
      "nav": "Interfaces",
      "h": "Interfaces",
      "body": "<p>Each pipeline stage has a runtime interface and a configuration object that builds it. Named rigs compose those configurations for a supported source and robot.</p><h3>Contracts</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Configuration</th><th>Builds</th><th>Runtime method</th></tr></thead><tbody><tr><td><code>SourceConfig</code></td><td><code>Source</code></td><td><code>get_frame()</code> returns a frame, or <code>None</code> before data arrives</td></tr><tr><td><code>RetargeterConfig</code></td><td><code>Retargeter</code></td><td><code>solve(frame)</code> returns a robot command</td></tr><tr><td><code>TargetConfig</code></td><td><code>Target</code></td><td><code>set_qpos(qpos)</code> or <code>set_command(command)</code>, depending on the target</td></tr></tbody></table><p>Call <code>source_config.build()</code> and <code>target_config.build()</code> to start those components. <code>retargeter_config.build(device)</code> constructs and warms up the solver on the selected device.</p><h3>Match the frame and command</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Retargeter</th><th>Input</th><th>Output</th></tr></thead><tbody><tr><td><code>OptimizationHandRetargeter</code></td><td><code>HandFrame</code></td><td><code>QPosCommand</code></td></tr><tr><td><code>NeuralHandRetargeter</code></td><td><code>HandFrame</code></td><td><code>QPosCommand</code></td></tr><tr><td><code>ArmRetargeter</code></td><td><code>ArmFrame</code></td><td><code>QPosCommand</code></td></tr><tr><td><code>HumanoidRetargeter</code></td><td><code>BodyFrame</code></td><td><code>BasePoseQPosCommand</code></td></tr></tbody></table><p><code>Target</code> declares both update methods, but concrete targets implement the methods they support. Use the method expected by the selected runtime; passing only joints to a humanoid target would lose its base pose.</p><h3>Lifecycle</h3><p>A runtime builds the components, reads frames, solves, and updates its targets. It calls <code>close()</code> on sources and targets when stopping. See <a class=\"inline\" href=\"/docs/retargetingkit/teleoperation/#override-settings\">Teleoperation</a> for entrypoints and overrides, and <a class=\"inline\" href=\"/docs/retargetingkit/ref-targets/\">Commands and targets</a> for the API contracts.</p>"
    }
  ]
},
{
  "name": "Reference",
  "items": [
    {
      "id": "quest3",
      "nav": "Quest 3",
      "h": "Quest 3",
      "body": "<p><img src=\"/assets/docs/retargetingkit/assets/sources/cloudxr-web-client-howto.png\" alt=\"CloudXR Web Client: enter the workstation IP, accept its certificate, then connect.\"></p><p>Use Quest 3 controllers to move one or two xArm6 or xArm7 end effectors. Tracking comes through NVIDIA Isaac Teleop and CloudXR. The standalone playground supports a Viser preview, controller calibration, and hardware control.</p><h3>Connect CloudXR</h3><p>From the RetargetingKit repository, install the playground dependencies and Isaac Teleop:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra vis --extra xarm\nuv pip install \"isaacteleop[cloudxr,retargeters]~=1.0.0\" \\\n    --extra-index-url https://pypi.nvidia.com</pre></div><p>Start CloudXR, then load its environment in the terminal used for teleoperation:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --no-sync python -m isaacteleop.cloudxr --accept-eula\n. ~/.cloudxr/run/cloudxr.env</pre></div><p>The commands on this page use <code>--no-sync</code> to keep the installed Isaac Teleop environment. If a firewall is active, allow the CloudXR ports:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>sudo ufw allow 47998/udp\nsudo ufw allow 49100,48322/tcp</pre></div><p>Open the <a class=\"inline\" href=\"https://nvidia.github.io/IsaacTeleop/client\">Isaac Teleop WebXR client</a> in the headset browser. Enter the workstation IP, accept its generated certificate, and select <strong>Connect</strong>, then <strong>Play</strong>.</p><p><img src=\"/assets/docs/retargetingkit/assets/sources/cloudxr_accept_cert_accepted.png\" alt=\"CloudXR confirms that the certificate was accepted.\"></p><h3>Check tracking</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --no-sync python scripts/sources/quest3/stream.py --side both</pre></div><p>Move each controller and check that its position and orientation change. Output includes XYZ position and a quaternion in <code>wxyz</code> order; <code>invalid</code> means that controller is not tracked. Use <code>--side right</code> or <code>--side left</code> to inspect one controller.</p><h3>Preview an arm</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --no-sync python scripts/sources/quest3/teleop.py \\\n    --mode single --single-side right --visualize</pre></div><p>Open <a class=\"inline\" href=\"http://localhost:8080\">http://localhost:8080</a>. Align the controller with the displayed end effector, then press <strong>B</strong> to calibrate and start following your motion. The default translation scale is <code>0.50</code>.</p><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Controller action</th><th>Right</th><th>Left</th></tr></thead><tbody><tr><td>Calibrate; then pause or resume</td><td>B</td><td>Y</td></tr><tr><td>Return to the calibrated pose</td><td>A</td><td>X</td></tr></tbody></table><h3>Connect xArm hardware</h3><p>Run a single xArm7:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --no-sync python scripts/sources/quest3/teleop.py \\\n    --mode single --single-side right \\\n    --arm-ip &lt;XARM_IP&gt; --translation-scale 0.50</pre></div><p>For two arms, set both xArm IPs:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --no-sync python scripts/sources/quest3/teleop.py \\\n    --mode bimanual \\\n    --right-xarm-ip &lt;RIGHT_IP&gt; --left-xarm-ip &lt;LEFT_IP&gt; \\\n    --translation-scale 0.50</pre></div><p>Use <code>--arm xarm6</code> to select xArm6. Each arm moves to its home pose during startup; calibrate its controller afterward. Press Ctrl-C to stop. Quest uses this standalone script rather than a named rig under <code>scripts/teleop/</code>.</p><h3>Keep the headset awake</h3><p><img src=\"/assets/docs/retargetingkit/assets/sources/sidequest_tool.png\" alt=\"Open Device Settings &amp; Tools in SideQuest.\"></p><p><img src=\"/assets/docs/retargetingkit/assets/sources/disable_proximity_sensor.png\" alt=\"Disable the proximity sensor for an uninterrupted session.\"></p><p>For long sessions, enable developer mode, connect SideQuest over USB, and disable the proximity sensor in <strong>Device Settings &amp; Tools</strong>.</p>",
      "sub": "Sources"
    },
    {
      "id": "vision-pro",
      "nav": "Apple Vision Pro",
      "h": "Apple Vision Pro",
      "body": "<p><img src=\"/assets/docs/retargetingkit/assets/sources/vision-pro-tracking-streamer-start.jpg\" alt=\"Tracking Streamer: note the headset IP and select Start.\"></p><p>Stream head, wrist, and finger tracking from Apple Vision Pro with <code>avp_stream</code>. RetargetingKit can drive robot hands, robot arms, or synchronized arm-and-hand assemblies, and replay the same tracking from a recording.</p><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Motion</th><th>Runtime</th><th>Example rig</th></tr></thead><tbody><tr><td>Fingers</td><td><code>scripts/teleop/hand.py</code></td><td><code>visionpro_sharpa</code></td></tr><tr><td>Wrists</td><td><code>scripts/teleop/arm.py</code></td><td><code>visionpro_xarm7</code></td></tr><tr><td>Wrists and fingers</td><td><code>scripts/teleop/arm_hand.py</code></td><td><code>visionpro_xarm7_xhand</code></td></tr></tbody></table><h3>Connect the headset</h3><p><img src=\"/assets/docs/retargetingkit/assets/sources/vision-pro-tracking-streamer-app.jpg\" alt=\"Open Tracking Streamer from the Vision Pro app launcher.\"></p><ol><li>Connect the workstation and Vision Pro to the same Wi-Fi network.</li><li>Open <strong>Tracking Streamer</strong> on Vision Pro.</li><li>Note its IP address and select <strong>Start</strong>. Use that address as <code>&lt;VISION_PRO_IP&gt;</code> below.</li><li>Install the source dependencies from the RetargetingKit repository:</li></ol><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra vision-pro</pre></div><p>Check the live stream:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vision-pro scripts/sources/vision_pro/stream.py \\\n    --ip &lt;VISION_PRO_IP&gt;</pre></div><p>The terminal prints head position and left/right pinch distances. Move your head and pinch each hand to check the values.</p><h3>Preview retargeting</h3><p>Run a right xArm7 with XHand in Viser:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra vision-pro \\\n    scripts/teleop/arm_hand.py visionpro_xarm7_xhand \\\n    --source.ip &lt;VISION_PRO_IP&gt; --mode viser</pre></div><p>Open <a class=\"inline\" href=\"http://localhost:8080\">http://localhost:8080</a>. The first tracked wrist frame becomes the calibration origin and maps to the arm's home pose. Finger motion drives the robot hand.</p><p>For arm-only or hand-only retargeting:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra vision-pro \\\n    scripts/teleop/arm.py visionpro_xarm7 --source.ip &lt;VISION_PRO_IP&gt;\n\nCUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra vision-pro \\\n    scripts/teleop/hand.py visionpro_sharpa --source.ip &lt;VISION_PRO_IP&gt;</pre></div><p>The arm runtime also offers <code>visionpro_xarm6</code> and <code>visionpro_dual_xarm7</code>. The hand runtime offers <code>visionpro_xhand</code> and <code>visionpro_sharpa</code>. All default to Viser.</p><h3>Connect hardware</h3><p>Use <code>--mode both</code> to send the same targets to hardware and Viser:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra vision-pro --extra xarm \\\n    scripts/teleop/arm_hand.py visionpro_xarm7_xhand \\\n    --source.ip &lt;VISION_PRO_IP&gt; --mode both \\\n    --arms.right.ip &lt;XARM_IP&gt; \\\n    --hands.right.serial-port /dev/ttyUSBX</pre></div><p>Each arm moves to its model-specific home pose at startup. Hold the wrist at the desired tracking origin when the first frame is read. Use <code>--mode real</code> for hardware only; press Ctrl-C to stop.</p><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Assembly</th><th>Named rig</th><th>Hand connection</th></tr></thead><tbody><tr><td>xArm7 + XHand</td><td><code>visionpro_xarm7_xhand</code>, <code>visionpro_dual_xarm7_xhand</code></td><td><code>--hands.right.serial-port</code></td></tr><tr><td>xArm7 + Ability Hand</td><td><code>visionpro_xarm7_ability</code></td><td><code>--hands.right.port</code>; add <code>--extra ability</code></td></tr><tr><td>xArm7 + Inspire Hand</td><td><code>visionpro_xarm7_inspire</code></td><td><code>--hands.right.serial-port</code>; add <code>--extra inspire</code></td></tr><tr><td>xArm7 + Sharpa Wave</td><td><code>visionpro_xarm7_sharpa</code></td><td><code>--hands.right.device-sn</code></td></tr><tr><td>xArm6 + Sharpa Wave</td><td><code>visionpro_xarm6_sharpa</code></td><td><code>--hands.right.device-sn</code></td></tr></tbody></table><p>Single-arm presets use the right side. For the dual XHand rig, also set <code>--arms.left.ip</code> and <code>--hands.left.serial-port</code>. Sharpa uses the first discovered hand when its device serial number is unset.</p><p>To tune arm-and-hand motion, use <code>--arm-retargeters.right.translation-scale</code> for wrist translation and <code>--arm-retargeters.right.ee-gain</code> for pose smoothing. The arm-only runtime uses <code>--retargeters.right.translation-scale</code> and <code>--retargeters.right.ee-gain</code>.</p><h3>Record and replay</h3><p>Record 15 seconds at a requested 50 Hz:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vision-pro scripts/sources/vision_pro/record.py \\\n    --ip &lt;VISION_PRO_IP&gt; --duration 15 --rate 50 \\\n    --output data/vision_pro.pkl</pre></div><p>Replay with the original rate:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra vision-pro \\\n    scripts/teleop/arm.py visionpro_xarm7 \\\n    --source.recording-path data/vision_pro.pkl \\\n    --source.recording-fps 50</pre></div><p>The pickle contains tracking dictionaries without timestamps or frame-rate metadata. Always set <code>--source.recording-fps</code> to the recording rate. Playback holds the final frame when it reaches the end.</p><p>To inspect the recorded skeleton directly:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vision-pro scripts/sources/vision_pro/visualize.py \\\n    --recording data/vision_pro.pkl</pre></div><p>This viewer and <code>stream.py --recording &lt;FILE&gt;</code> use the device API's fixed default of 20 Hz, so a 50 Hz recording plays more slowly.</p><h3>Tracking format</h3><p>The validated <code>avp_stream</code> 2.51 format uses finite <code>float64</code> values. Translations are in meters and wrist roll is in radians.</p><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Field</th><th>Shape</th><th>Coordinate frame</th></tr></thead><tbody><tr><td><code>head</code></td><td><code>(1, 4, 4)</code></td><td>World</td></tr><tr><td><code>left_wrist</code>, <code>right_wrist</code></td><td><code>(1, 4, 4)</code></td><td>World</td></tr><tr><td><code>left_fingers</code>, <code>right_fingers</code></td><td><code>(25, 4, 4)</code></td><td>Wrist-local</td></tr><tr><td><code>left_arm</code>, <code>right_arm</code></td><td><code>(25, 4, 4)</code> or <code>(27, 4, 4)</code></td><td>Wrist-local; optional two forearm joints</td></tr><tr><td><code>left_pinch_distance</code>, <code>right_pinch_distance</code></td><td>scalar</td><td>Thumb-tip to index-tip distance</td></tr><tr><td><code>left_wrist_roll</code>, <code>right_wrist_roll</code></td><td>scalar</td><td>Wrist roll</td></tr></tbody></table><p>The streamer converts world poses from Y-up to right-handed Z-up: <code>x'=x</code>, <code>y'=-z</code>, <code>z'=y</code>. Finger and arm matrices stay wrist-local. The 25-joint order is wrist, four thumb joints, then five joints each for index, middle, ring, and little fingers. The optional final two arm joints are <code>forearmWrist</code> and <code>forearmArm</code>.</p>",
      "sub": "Sources"
    },
    {
      "id": "pico",
      "nav": "PICO",
      "h": "PICO",
      "body": "<p><img src=\"/assets/docs/retargetingkit/assets/sources/xrobotoolkit-pico-fullbody-settings.jpeg\" alt=\"XRoboToolkit full-body settings. Use your workstation IP; the screenshot shows an example.\"></p><p>Use PICO full-body tracking through XRoboToolkit to retarget a 24-joint body to Unitree G1. Record sessions for offline replay, or use controller buttons to open and close two Inspire hands alongside body motion.</p><p><code>PicoSource</code> converts the SDK's Y-up poses to a canonical Z-up <code>BodyFrame</code>. The combined body-and-hands runtime uses <strong>B</strong> and <strong>Y</strong> buttons for the hands.</p><h3>Connect XRoboToolkit</h3><p>Install <a class=\"inline\" href=\"https://github.com/XR-Robotics/XRoboToolkit-PC-Service/releases/latest\">XRoboToolkit PC Service</a>, then install the pinned Python SDK from the RetargetingKit repository:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra pico</pre></div><p>Start one foreground service and leave its terminal open. For the standard <code>/opt/apps/roboticsservice</code> installation:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>cd /opt/apps/roboticsservice\nenv \\\n  LD_LIBRARY_PATH=/opt/apps/roboticsservice:/opt/apps/roboticsservice/lib:/opt/apps/roboticsservice/SDK/x64 \\\n  QT_PLUGIN_PATH=/opt/apps/roboticsservice/plugins \\\n  QT_QML_PATH=/opt/apps/roboticsservice/qml \\\n  ./RoboticsServiceProcess</pre></div><p>Connect the workstation and PICO to the same Wi-Fi. In the headset's XRoboToolkit app, enter the workstation's Wi-Fi IPv4 address under <strong>PC Service</strong>, select <strong>Reconnect</strong> once, and apply these settings:</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Setting</th><th>Value</th></tr></thead><tbody><tr><td>Head, Controller, Hand</td><td>Checked</td></tr><tr><td>Mode</td><td>Fullbody</td></tr><tr><td>High-Acc</td><td>Unchecked</td></tr><tr><td>Num</td><td>2</td></tr><tr><td>Send</td><td>Checked</td></tr><tr><td>Switch w/ A Button</td><td>Unchecked</td></tr><tr><td>Data Collection: Tracking, Vision</td><td>Unchecked</td></tr></tbody></table><p>Network <strong>Status</strong> should show <strong>WORKING</strong>. Any IP shown in a reference image is an example; enter your workstation's address.</p><h3>Check body tracking</h3><p>In a second terminal, return to the RetargetingKit repository and run:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra pico scripts/sources/pico/smoke_test.py --duration 5</pre></div><p>Move your body during the test. It prints pelvis motion and a final 24-joint snapshot. If all poses remain frozen, fully close XRoboToolkit, recalibrate both trackers in the PICO Motion Tracker app, check that its avatar moves, and reopen XRoboToolkit.</p><h3>Preview G1</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra pico --extra vis \\\n    scripts/teleop/humanoid.py pico_g1_sonic_viser \\\n    --source.no-use-ankle-as-foot-target --device cuda:0</pre></div><p>Open <a class=\"inline\" href=\"http://localhost:8080\">http://localhost:8080</a> to see G1 follow your motion. This rig also publishes to SONIC, but the preview runs without a SONIC process or physical robot hands.</p><p>Keep <code>--source.no-use-ankle-as-foot-target</code>: the PICO G1 profile is calibrated for PICO's separate foot joints, while the named presets still default to ankle targets. Set <code>--source.human-height</code> to the user's height in meters; the default is <code>1.75</code>.</p><h3>Record and replay</h3><p>Record a 15-second body session:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra pico scripts/sources/pico/record.py \\\n    --duration 15 --rate 50 --out pico_recording.npz</pre></div><p>Replay it without a headset:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra vis \\\n    scripts/teleop/humanoid.py picofile_g1_sonic_viser \\\n    --source.path pico_recording.npz \\\n    --source.no-use-ankle-as-foot-target</pre></div><p>The NPZ stores raw <code>poses</code> as <code>(N, 24, 7)</code> <code>float32</code>, <code>timestamps_s</code> as seconds since recording start, and JSON metadata with measured frame rate and joint names.</p><h3>Control body and hands</h3><p>For G1 with two connected Inspire hands:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra pico --extra inspire \\\n    scripts/teleop/humanoid_hand.py pico_g1_inspire \\\n    --source.no-use-ankle-as-foot-target \\\n    --left-hand.serial-port &lt;LEFT_PORT&gt; \\\n    --right-hand.serial-port &lt;RIGHT_PORT&gt;</pre></div><p>Press <strong>B</strong> to toggle the right hand or <strong>Y</strong> to toggle the left hand between open and closed. This runtime uses button commands, not the PICO hand skeleton. It publishes body commands to SONIC; see <a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">humanoid teleoperation</a> for simulation and G1 deployment. Press Ctrl-C to stop.</p><h3>Tracking format</h3><p>The validated setup is PICO 4 Ultra with XRoboToolkit App 1.1.1, PC Service 1.0.0, and Python SDK 1.0.2. The wrapper converts arrays to finite <code>float32</code> values.</p><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Data</th><th>Shape</th><th>Format</th></tr></thead><tbody><tr><td>Headset or controller pose</td><td><code>(7,)</code></td><td><code>[x, y, z, qx, qy, qz, qw]</code>; Y-up world, meters</td></tr><tr><td>Body poses</td><td><code>(24, 7)</code></td><td>24 SMPL joints; same pose format</td></tr><tr><td>Body velocity or acceleration</td><td><code>(24, 6)</code></td><td>Linear XYZ followed by angular XYZ</td></tr><tr><td>Active hand poses</td><td><code>(27, 7)</code></td><td>27 joints per hand</td></tr><tr><td>Joystick</td><td><code>(2,)</code></td><td>X/Y values</td></tr><tr><td>Motion Tracker pose</td><td><code>(7,)</code> per tracker</td><td>Available in object-tracking mode</td></tr></tbody></table><p>Fullbody mode sends the inferred body skeleton rather than raw Motion Tracker poses. The SDK device timestamp is an integer count of nanoseconds.</p>",
      "sub": "Sources"
    },
    {
      "id": "manus",
      "nav": "Manus",
      "h": "Manus",
      "body": "<p>Use Manus gloves for hand tracking and optimization-based retargeting to XHand or Sharpa Wave. <code>ManusSource</code> converts each 25-node glove skeleton to a wrist-local MANO-21 <code>HandFrame</code>.</p><h3>Connect the gloves</h3><p>Connect the gloves through the Manus host software, then install the SDK runtime and viewer from the RetargetingKit repository:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra manus --extra vis</pre></div><p>Preview both raw skeletons:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra manus --extra vis \\\n    scripts/sources/manus/visualize_keypoints.py --side both</pre></div><p>Open <a class=\"inline\" href=\"http://localhost:8080\">http://localhost:8080</a> and flex each hand to check its 25-node skeleton. The utility detects sides from glove metadata. If detection is ambiguous, pass <code>--manus-left-id</code> or <code>--manus-right-id</code> with a decimal or <code>0x</code> glove ID.</p><h3>Preview retargeting</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra manus --extra vis \\\n    scripts/teleop/hand.py manus_xhand --mode viser</pre></div><p>Use <code>manus_sharpa</code> for Sharpa Wave. These named rigs use online optimization and default to the right hand. Select <code>--mode both</code> for hardware plus Viser or <code>--mode real</code> for hardware only. Set <code>--target.serial-port</code> for XHand or <code>--target.device-sn</code> for Sharpa.</p><p>Manus currently supplies hand motion only and is not a source for <code>humanoid_hand.py</code>.</p><h3>Record poses</h3><p>Capture one frame per Enter press; type <code>q</code> and press Enter to save and finish:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra manus --extra vis scripts/sources/manus/record_glove.py \\\n    --hand right --output recording.npz</pre></div><p>For a finite continuous recording, set the frame count and rate:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra manus --extra vis scripts/sources/manus/record_glove.py \\\n    --hand right --no-viz --frames 300 --rate 30 \\\n    --output manus_recording.npz</pre></div><p>Use <code>--hand left</code> or <code>--hand both</code> to change the recorded sides. The preview applies glove calibration; the NPZ preserves raw SDK positions and rotations.</p><h3>Recording format</h3><p>Every field begins with <code>left_</code> or <code>right_</code> for its saved side. Positions are meters in the SDK's requested right-handed, Z-up coordinate system viewed along X (<code>unitScale=1.0</code>).</p><table class=\"doc-table\" style=\"--cols:4\"><thead><tr><th>Field suffix</th><th>Shape</th><th>dtype</th><th>Meaning</th></tr></thead><tbody><tr><td><code>positions</code></td><td><code>(N, 25, 3)</code></td><td><code>float32</code></td><td>Raw node positions</td></tr><tr><td><code>rotations</code></td><td><code>(N, 25, 4)</code></td><td><code>float32</code></td><td>Raw quaternions in <code>xyzw</code> order</td></tr><tr><td><code>publish_time</code></td><td><code>(N,)</code></td><td><code>uint64</code></td><td>Compressed SDK timestamp</td></tr><tr><td><code>recv_ns</code></td><td><code>(N,)</code></td><td><code>int64</code></td><td>Host monotonic time at callback receipt</td></tr><tr><td><code>timestamps</code></td><td><code>(N,)</code></td><td><code>float64</code></td><td>Seconds since recording start</td></tr><tr><td><code>glove_id</code></td><td><code>(N,)</code></td><td><code>uint32</code></td><td>Hardware glove ID</td></tr><tr><td><code>side_code</code></td><td><code>(N,)</code></td><td><code>int32</code></td><td>Side enum: <code>1</code> left, <code>2</code> right</td></tr></tbody></table><p>Node ranges are wrist <code>0</code>, thumb <code>1–4</code>, index <code>5–9</code>, middle <code>10–14</code>, ring <code>15–19</code>, and little finger <code>20–24</code>. Each non-thumb finger runs from metacarpal through knuckle and two intermediate joints to the tip.</p><p>Treat <code>publish_time</code> as the opaque <code>ManusTimestamp</code>, not Unix time. Use <code>recv_ns</code> for timing intervals within one process run.</p>",
      "sub": "Sources"
    },
    {
      "id": "axis-studio",
      "nav": "Axis Studio",
      "h": "Axis Studio",
      "body": "<p>Stream Noitom body motion from Axis Studio in Calc broadcast mode. <code>AxisStudioSource</code> converts the incoming avatar to a canonical Z-up <code>BodyFrame</code> for G1 retargeting.</p><h3>Connect Axis Studio</h3><p>The bundled SDK runtime supports Linux x86-64. From the RetargetingKit repository:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra axis --extra vis</pre></div><p>In Axis Studio, enable <strong>Calc data broadcasting</strong>, set the destination to the RetargetingKit workstation, and use UDP port <strong>7012</strong>. If a firewall is active:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>sudo ufw allow 7012/udp</pre></div><h3>Preview G1</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>CUDA_VISIBLE_DEVICES=&lt;FREE_GPU&gt; uv run --extra axis --extra vis \\\n    scripts/teleop/humanoid.py axisstudio_g1_sonic_viser \\\n    --source.port 7012 --source.human-height 1.75</pre></div><p>Set <code>--source.human-height</code> to the user's height in meters. Open <a class=\"inline\" href=\"http://localhost:8080\">http://localhost:8080</a> and check that G1 follows the streamed body motion. Change <code>--source.port</code> if Axis Studio uses a different port.</p><p>This rig also publishes commands to SONIC. Use <code>axisstudio_g1_sonic</code> to publish without Viser. See <a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">humanoid teleoperation</a> for simulation and G1 deployment.</p>",
      "sub": "Sources"
    },
    {
      "id": "realsense",
      "nav": "RealSense",
      "h": "RealSense",
      "body": "<p>Capture aligned RGB-D frames with <code>Realsense</code>. The driver runs in a background process and exposes BGR color, raw depth, and camera intrinsics. L515 is the tested model; this camera driver is separate from the canonical teleoperation sources.</p><h3>Check the camera</h3><p>From the RetargetingKit repository:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra realsense\nuv run --extra realsense python scripts/sources/realsense/print_intrinsics.py\nuv run --extra realsense --with opencv-python \\\n    python scripts/sources/realsense/stream_rgbd.py</pre></div><p>The intrinsics script prints image resolution, focal lengths, principal point, and depth scale. The viewer shows color beside a depth visualization; press Escape to close it.</p><p>The driver uses the first connected camera by default. Run <code>rs-enumerate-devices</code> to find a serial number, then pass <code>--serial-number &lt;SERIAL&gt;</code> to either script. The <code>realsense</code> extra pins <code>pyrealsense2&lt;2.55</code> for L515 depth-stream compatibility.</p><h3>Read frames in Python</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.sources.cameras.realsense import Realsense, RealsenseConfig\n\ncamera = Realsense(RealsenseConfig())\ncamera.start()\ncolor = camera.get_color()          # (H, W, 3), uint8 BGR\ndepth = camera.get_depth()          # (H, W), uint16 sensor units\nintrinsics = camera.get_intrinsics()\ndepth_meters = depth * intrinsics[6]\ncamera.stop()</pre></div><p><code>intrinsics</code> is <code>[fx, fy, ppx, ppy, height, width, depth_scale]</code>. Frames align to the color stream by default; set <code>RealsenseConfig(align_to=\"depth\")</code> to align to depth. <code>start()</code> waits for the first captured frames.</p>",
      "sub": "Sources"
    },
    {
      "id": "zed",
      "nav": "ZED",
      "h": "ZED",
      "body": "<p>Capture BGR color and metric depth with a Stereolabs ZED camera. <code>Zed</code> runs capture in a background process and exposes frames and intrinsics. It is a standalone camera driver and requires a CUDA-capable NVIDIA GPU.</p><h3>Install the SDK</h3><p>Install the <a class=\"inline\" href=\"https://www.stereolabs.com/developers/release/\">ZED SDK</a> for the workstation's Ubuntu and CUDA versions. Stereolabs publishes one Python binding wheel per Python version (3.10–3.14) for <strong>ZED SDK 5.2, Linux x86-64</strong>; select the one matching the project's interpreter:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>PY=$(uv run python -c 'import sys; print(f\"cp{sys.version_info.major}{sys.version_info.minor}\")')\nPYZED=\"https://download.stereolabs.com/zedsdk/5.2/whl/linux_x86_64/pyzed-5.2-$PY-$PY-linux_x86_64.whl\"</pre></div><h3>Check the camera</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --with \"$PYZED\" --with opencv-python \\\n    python scripts/sources/zed/stream_rgbd.py</pre></div><p>The viewer shows color beside a depth visualization; press Escape to close it. It defaults to <code>HD1080</code>, 30 FPS, and <code>ULTRA</code> depth mode. Set <code>--serial-number &lt;SERIAL&gt;</code> to select a camera, or use <code>--resolution</code>, <code>--fps</code>, and <code>--depth-mode</code> to change capture settings.</p><h3>Read frames in Python</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.sources.cameras.zed import Zed, ZedConfig\n\ncamera = Zed(ZedConfig(resolution=\"HD1080\", depth_mode=\"ULTRA\"))\ncamera.start()\ncolor = camera.get_color()          # (H, W, 3), uint8 BGR\ndepth = camera.get_depth()          # (H, W), float32 meters\nintrinsics = camera.get_intrinsics()\ncamera.stop()</pre></div><p><code>intrinsics</code> is <code>[fx, fy, cx, cy, height, width]</code> for the left camera. Depth is already in meters and needs no scale conversion.</p>",
      "sub": "Sources"
    },
    {
      "id": "xarm",
      "nav": "xArm6 and xArm7",
      "h": "xArm6 and xArm7",
      "body": "<p>Control a six- or seven-joint xArm through the UFACTORY SDK. Both drivers accept joint positions in radians and provide end-effector IK and teaching modes.</p><h3>Connect</h3><p>Find the controller IP on the power box and open <code>http://&lt;XARM_IP&gt;:18333</code> for UFACTORY Studio. From the RetargetingKit checkout, install the driver:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra xarm</pre></div><p>For xArm7, read five samples without enabling motion or sending position commands:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra xarm scripts/targets/xarm7/read_qpos.py \\\n    --ip &lt;XARM_IP&gt; --samples 5</pre></div><p>The xArm6 <code>read_qpos.py</code> script starts the active velocity controller, including motion enable and error clearing. Treat it as a controller session.</p><h3>Preview teleoperation</h3><p>With <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro</a> configured:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vision-pro --extra vis scripts/teleop/arm.py \\\n    visionpro_xarm7 --mode viser --source.ip &lt;VISION_PRO_IP&gt;</pre></div><p>Use <code>visionpro_xarm6</code> for xArm6. The preview does not connect the arm. The Vision Pro guide covers IP overrides and arm-hand rigs; <a class=\"inline\" href=\"/docs/retargetingkit/quest3/\">Quest 3</a> provides a separate controller workflow.</p><h3>Use the driver</h3><p>This snippet starts a hardware controller and holds the measured pose. Replace <code>target_qpos</code> with your desired joint vector to move the arm.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.targets.arms.xarm7 import XArm7Config, XArmMode\n\narm = XArm7Config(\"&lt;XARM_IP&gt;\", mode=XArmMode.VELOCITY).build()\ntarget_qpos = arm.get_qpos()  # (7,), URDF radians\narm.set_qpos(target_qpos)\narm.close()</pre></div><p>For six joints, import <code>XArm6Config</code> from <code>retargetingkit.targets.arms.xarm6</code>.</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Mode</th><th>Behavior</th></tr></thead><tbody><tr><td><code>VELOCITY</code></td><td>Default; smooths position tracking through velocity control</td></tr><tr><td><code>SERVO</code></td><td>Streams joint position targets</td></tr><tr><td><code>TEACHING</code></td><td>Enables gravity-compensated teaching</td></tr></tbody></table><p>Both drivers run a background control loop at 250 Hz by default. Starting a driver enables motion, clears warnings and errors, and selects the configured control mode.</p>",
      "sub": "Targets"
    },
    {
      "id": "xhand",
      "nav": "XHand",
      "h": "XHand",
      "body": "<p>Control 12 XHand joints through RS485 or EtherCAT. The driver accepts URDF radians and sends commands through a background loop at approximately 83 Hz.</p><h3>Connect</h3><p>Install the <code>xhand_controller</code> wheel from the XHand vendor. There is no <code>xhand</code> package extra.</p><p>For RS485, connect the adapter and confirm its serial port. The default baud rate is 3,000,000.</p><p>Read five state samples without starting the servo controller:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run scripts/targets/xhand/read_qpos.py \\\n    --serial-port /dev/ttyUSB0 --samples 5</pre></div><p>The output includes joint names, positions in radians, and shape checks.</p><h3>Preview retargeting</h3><p>With a configured <a class=\"inline\" href=\"/docs/retargetingkit/manus/\">Manus glove</a>:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra manus --extra vis scripts/teleop/hand.py \\\n    manus_xhand --mode viser</pre></div><p>After checking the preview, <code>--mode both --target.serial-port /dev/ttyUSB0</code> connects and commands the hand. The <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro</a> guide also covers <code>visionpro_xhand</code> and xArm7–XHand rigs.</p><h3>Use the driver</h3><p>This starts the physical hand's servo process and holds its measured pose:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.targets.hands.xhand import XHandConfig\n\nhand = XHandConfig(serial_port=\"/dev/ttyUSB0\").build()\ntarget_qpos = hand.get_qpos()  # (12,), URDF radians\nhand.set_qpos(target_qpos)\nhand.close()</pre></div><p>Use <code>protocol=\"EtherCAT\"</code> in the config for EtherCAT. Commands must contain 12 finite values in the driver's documented URDF order.</p><h3>Check a small motion</h3><p>The following moves joint 4 by 0.05 radians and returns it to its starting position:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run scripts/targets/xhand/open_close.py \\\n    --serial-port /dev/ttyUSB0 --joint 4 --delta 0.05 --reps 1</pre></div><p>Despite its filename, this diagnostic nudges one joint; it does not open and close all fingers.</p>",
      "sub": "Targets"
    },
    {
      "id": "sharpa-hand",
      "nav": "Sharpa Wave",
      "h": "Sharpa Wave",
      "body": "<p>Control 22 finger joints and read tactile measurements from five fingers per hand. The driver accepts joint positions in URDF radians and exposes position, velocity, and torque feedback.</p><h3>Connect</h3><p>Get the Sharpa SDK from Sharpa and extract it so <code>~/.retargetingkit/sharpa-sdk/</code> holds its <code>lib/</code> and <code>python/</code> folders. The SDK's native extension must match your Python environment.</p><p>If the native loader reports a missing <code>libpython</code>, add your Python environment's library directory and <code>~/.retargetingkit/sharpa-sdk/lib</code> to <code>LD_LIBRARY_PATH</code> before launching.</p><p><code>device_sn=None</code> selects the first discovered hand. Set a device serial number when several hands are connected.</p><p>Read five samples in floating mode:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run scripts/targets/sharpa_hand/read_qpos.py --samples 5</pre></div><p>This changes the hand to floating mode for backdriving and prints angles in degrees. The Python API returns radians.</p><h3>Preview retargeting</h3><p>With <a class=\"inline\" href=\"/docs/retargetingkit/manus/\">Manus</a> configured, preview optimization:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra manus --extra vis scripts/teleop/hand.py \\\n    manus_sharpa --mode viser</pre></div><p>Use <code>manus_sharpa_neural</code> for the curated neural model. <code>--mode real</code> or <code>--mode both</code> commands the physical hand; add <code>--target.device-sn &lt;SERIAL&gt;</code> to select it. <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro</a> also supports hand-only and xArm–Sharpa rigs.</p><h3>Use the driver</h3><p>Construction connects the hand, selects position mode, and starts SDK control:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.targets.hands.sharpa_hand import SharpaHand\n\nhand = SharpaHand(speed_coeff=0.3, current_coeff=0.3)\nqpos, qvel, torque = hand.get_state()  # each has 22 values\nhand.set_qpos(qpos)\nhand.close()</pre></div><p>Use <code>set_control_mode(\"floating\")</code> for backdriving and <code>set_control_mode(\"position\")</code> to resume position control.</p><h3>Read touch data</h3><p>Fetch five samples from the right thumb:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run scripts/targets/sharpa_hand/tactile_fetch.py \\\n    --channel 0 --samples 5 --calibrate</pre></div><p>This connects the SDK in position mode and calibrates before reading. Frames may contain <code>RAW</code>, <code>DEFORM</code>, and <code>F6</code> data. The driver API uses channels <code>0–4</code> for right thumb through pinky and <code>5–9</code> for the left; the current diagnostic labels right-hand channels only.</p><p><code>scripts/targets/sharpa_hand/wave_example.py --cycles 3</code> moves joint 7 by 3 degrees and returns it, three times.</p>",
      "sub": "Targets"
    },
    {
      "id": "ability-hand",
      "nav": "Ability Hand",
      "h": "Ability Hand",
      "body": "<p>Control the PSYONIC Ability Hand's six joints through a USB serial adapter. The driver accepts radians and runs a background servo process, with position commands ramped at 60 degrees per second by default.</p><h3>Connect</h3><p>Power and connect the hand according to its hardware manual. Use a stable Linux device path when available:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>ls /dev/serial/by-id/\nuv sync --extra ability</pre></div><p>Your user needs access to the serial device, commonly through the <code>dialout</code> group. The driver uses 460800 baud.</p><h3>Preview teleoperation</h3><p>The named <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro</a> rig combines Ability Hand with xArm7:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vision-pro --extra vis scripts/teleop/arm_hand.py \\\n    visionpro_xarm7_ability --mode viser --source.ip &lt;VISION_PRO_IP&gt;</pre></div><p>This previews motion without opening either robot target. Follow the Vision Pro guide to configure the arm IP and hand port before selecting <code>real</code> or <code>both</code>.</p><h3>Use the driver</h3><p>Starting the driver sends serial position commands, including zero-position commands during initial synchronization. The following is a hardware controller session:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.targets.hands.ability_hand import AbilityHandConfig\n\nhand = AbilityHandConfig(\"/dev/serial/by-id/&lt;ABILITY_HAND&gt;\").build()\ntarget_qpos = hand.get_qpos()  # (6,), radians\nhand.set_qpos(target_qpos)\nhand.close()</pre></div><p>Replace <code>target_qpos</code> with the desired hand pose for your control loop.</p><h3>Check motion</h3><p>The diagnostic below opens and closes the physical hand once:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra ability scripts/targets/ability_hand/open_close.py \\\n    --port /dev/serial/by-id/&lt;ABILITY_HAND&gt; --reps 1</pre></div><p><code>scripts/targets/ability_hand/read_qpos.py</code> also starts the active servo process and sends startup commands. It is not a passive serial reader.</p>",
      "sub": "Targets"
    },
    {
      "id": "inspire",
      "nav": "Inspire Hand",
      "h": "Inspire Hand",
      "body": "<p>Control six actuated finger joints over USB serial. The driver converts URDF radians to Inspire's serial joint order and normalized position range.</p><h3>Connect</h3><p>Connect the serial adapter and give your user access to its device port. On Linux this commonly requires membership in <code>dialout</code>; log out and back in after changing groups.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra inspire</pre></div><p>The combined G1 preset uses <code>/dev/ttyUSB0</code> for the left hand and <code>/dev/ttyUSB1</code> for the right, both at 115200 baud with hand ID <code>1</code>. Confirm the actual ports before connecting.</p><h3>Use the driver</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.targets.hands.inspire import InspireHandConfig\n\nhand = InspireHandConfig(\"/dev/ttyUSB0\", 1, 115200).build()\nqpos = hand.get_qpos()  # (6,), URDF radians\nhand.close()</pre></div><p>Construction opens the serial connection and starts a background reader. Commands begin after the first <code>hand.set_qpos(target_qpos)</code> call; feedback updates asynchronously.</p><p>Joint order is thumb rotation, thumb bend, index, middle, ring, and little finger. Use <code>hand.joint_names</code> when aligning a robot model.</p><h3>Teleoperate with PICO</h3><p>After completing <a class=\"inline\" href=\"/docs/retargetingkit/pico/\">PICO setup</a>, run:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra pico --extra inspire scripts/teleop/humanoid_hand.py \\\n    pico_g1_inspire --source.no-use-ankle-as-foot-target \\\n    --left-hand.serial-port /dev/ttyUSB0 \\\n    --right-hand.serial-port /dev/ttyUSB1</pre></div><p>This connects both physical hands and publishes body motion to SONIC. <code>B</code> toggles the right hand open/closed; <code>Y</code> toggles the left. The rig has no preview mode and uses preset hand poses rather than tracked fingers.</p><p>For continuous Vision Pro arm-hand control, use the <code>visionpro_xarm7_inspire</code> rig described in <a class=\"inline\" href=\"/docs/retargetingkit/vision-pro/\">Vision Pro</a>. For G1 deployment, follow <a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">humanoid teleoperation</a>.</p>",
      "sub": "Targets"
    },
    {
      "id": "g1",
      "nav": "G1 and SONIC",
      "h": "G1 and SONIC",
      "body": "<p>Send retargeted G1 motion to GR00T Whole-Body Control through a SONIC ZMQ publisher. The deployment stack executes the policy in MuJoCo or on a real G1.</p><h3>Prepare the deployment stack</h3><p>Install and configure GR00T-WholeBodyControl on the deployment machine. For the bundled simulation launcher, place the checkout at:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">text</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>thirdparty/GR00T-WholeBodyControl/</pre></div><p>The launcher expects its <code>.venv_sim</code> environment and <code>gear_sonic_deploy/deploy.sh</code> to be ready, and requires <code>tmux</code>. Robot descriptions and collision assets come from RoboKit.</p><h3>Start a recorded stream</h3><p>From the RetargetingKit checkout:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra vis scripts/teleop/humanoid.py bvh_g1_sonic_viser</pre></div><p>This publishes a sample BVH clip on port <code>5556</code> and opens Viser. <code>_viser</code> adds a viewer while keeping the SONIC stream active. For a viewer without a publisher, use the first example in <a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">humanoid teleoperation</a>.</p><p>In a second terminal, launch simulation:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>bash scripts/tools/launch_sonic_sim.sh</pre></div><p>In the deployment pane, press <code>]</code>, then <code>Enter</code>, to start the policy. The script creates a <code>sonic_sim</code> tmux session and replaces an existing session with that name.</p><h3>Connect a real G1</h3><p>After validating the retargeted motion and preparing the robot deployment stack, run this from its <code>gear_sonic_deploy</code> directory on the robot:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>bash deploy.sh real --input-type zmq \\\n    --zmq-host &lt;WORKSTATION_IP&gt; --zmq-port 5556 --zmq-topic pose</pre></div><p>This selects real robot deployment. Use the deployment controls and physical emergency stop described by your G1 setup. The workstation must run a SONIC preset and be reachable on port <code>5556</code>.</p><h3>What the stream contains</h3><p><code>SonicTarget</code> receives a <code>BasePoseQPosCommand</code>, estimates and smooths joint velocities, and converts 29 joint positions and velocities from G1 URDF order to SONIC order. It sends the root quaternion and joint data on topic <code>pose</code>; root translation is omitted.</p><p>The default publisher binds <code>tcp://*:5556</code>. Live Axis Studio, PICO, and dual Inspire hand workflows are covered in <a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">humanoid teleoperation</a>.</p>",
      "sub": "Targets"
    },
    {
      "id": "rby1",
      "nav": "RBY1-A",
      "h": "RBY1-A",
      "body": "<p>Control the RBY1-A's seven-joint right arm through the Rainbow Robotics SDK, with separate commands for the two-joint head. This is a standalone driver; no named teleoperation rig is currently registered.</p><h3>Connect</h3><p>Find the robot's gRPC address in its control panel, then install:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra rby1</pre></div><p>Use the complete address, including the port, such as <code>&lt;RBY1_IP&gt;:50051</code>.</p><h3>Use the driver</h3><p>Building the driver powers on the robot, enables servos and the control manager, and starts a command stream. This snippet holds the measured right-arm pose:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.targets.humanoids.rby1 import RBY1AConfig, RBY1AMode\n\narm = RBY1AConfig(\"&lt;RBY1_IP&gt;:50051\", mode=RBY1AMode.VELOCITY).build()\ntarget_qpos = arm.get_qpos()  # (7,), radians\narm.set_qpos(target_qpos)\narm.close()</pre></div><p>Replace <code>target_qpos</code> with the desired right-arm joint positions. <code>get_head_qpos()</code> and <code>set_head_qpos()</code> expose the head separately. Close the driver with <code>close()</code>.</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Mode</th><th>Behavior</th></tr></thead><tbody><tr><td><code>VELOCITY</code></td><td>Default; converts position error to a smoothed command</td></tr><tr><td><code>SERVO</code></td><td>Streams position targets with a velocity limit</td></tr><tr><td><code>TEACHING</code></td><td>Enables right-arm gravity compensation</td></tr></tbody></table><p>The background loop runs at 100 Hz by default. Head position commands remain active in all three modes.</p><h3>Inspect feedback</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra rby1 scripts/targets/rby1/read_qpos.py \\\n    --ip &lt;RBY1_IP&gt;:50051</pre></div><p>This script starts the same active controller, including power and servo enable. It prints feedback while holding the initial pose; it is not a passive state reader.</p>",
      "sub": "Targets"
    },
    {
      "id": "dexmate",
      "nav": "Dexmate Vega-1",
      "h": "Dexmate Vega-1",
      "body": "<p>Control Vega-1's torso, head, and both arms through the Dexmate SDK. The driver exposes 20 joints and is available as a standalone target; no named teleoperation rig is currently registered.</p><h3>Connect</h3><p>Configure robot discovery and Zenoh communication for your Dexmate setup, then install:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra dexmate</pre></div><p>RetargetingKit pins <code>dexcontrol==0.4.4</code> and <code>dexcomm==0.4.2</code> for the supported discovery stack.</p><p>Read current joint positions without sending a motion target:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv run --extra dexmate scripts/targets/dexmate/read_qpos.py</pre></div><p>Press <code>Ctrl+C</code> to close the connection.</p><h3>Use the driver</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>from retargetingkit.targets.humanoids.dexmate import DexmateConfig\n\nrobot = DexmateConfig().build()\nqpos = robot.get_qpos()  # (20,), radians\nprint(dict(zip(robot.joint_names, qpos)))\nrobot.close()</pre></div><p>Use <code>robot.joint_names</code> to align commands with the model:</p><table class=\"doc-table\" style=\"--cols:2\"><thead><tr><th>Group</th><th>Joints</th></tr></thead><tbody><tr><td>Torso</td><td><code>torso_j1</code> through <code>torso_j3</code></td></tr><tr><td>Head</td><td><code>head_j1</code> through <code>head_j3</code></td></tr><tr><td>Left arm</td><td><code>L_arm_j1</code> through <code>L_arm_j7</code></td></tr><tr><td>Right arm</td><td><code>R_arm_j1</code> through <code>R_arm_j7</code></td></tr></tbody></table><p>This is also the order of <code>get_qpos()</code> and <code>set_qpos()</code>.</p><h3>Send motion</h3><p>With an open connection and a desired 20-joint <code>target_qpos</code>, choose one command style:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>robot.set_qpos(target_qpos)  # publish repeatedly in your control loop</pre></div><p>The default <code>wait_time=0</code> publishes a setpoint and returns immediately. For one interpolated move that blocks until completion:</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>robot.set_qpos(target_qpos, wait_time=3.0, max_vel=0.2)</pre></div><p><code>max_vel</code> is in radians per second. Both forms command the physical robot; call <code>robot.close()</code> when finished.</p>",
      "sub": "Targets"
    },
    {
      "id": "ref-frames",
      "nav": "Frames",
      "h": "Frame API",
      "body": "<p>Canonical frames describe one observation. See <a class=\"inline\" href=\"/docs/retargetingkit/frames/\">Canonical frames</a> for units, axes, and joint ordering.</p><div data-api=\"retargetingkit.sources.frames.HandPose\"></div><div data-api=\"retargetingkit.sources.frames.HandFrame\"></div><div data-api=\"retargetingkit.sources.frames.ArmFrame\"></div><div data-api=\"retargetingkit.sources.frames.ArmHandFrame\"></div><div data-api=\"retargetingkit.sources.frames.BodyFrame\"></div>",
      "sub": "API",
      "api": {
        "retargetingkit.sources.frames.HandPose": {
          "kind": "class",
          "name": "HandPose",
          "module": "retargetingkit.sources.frames",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L35",
          "anchor": "handpose",
          "doc": "<p>One hand pose: 21 MANO keypoints, wrist-local, meters; orientations default to identity (vector IK ignores them).</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; import numpy as np\n&gt;&gt;&gt; f = HandPose(np.zeros((21, 3), dtype=np.float32))\n&gt;&gt;&gt; bool(f.valid.all()) and f.joint_names[MANO21.INDEX_TIP] == \"index_tip\"\nTrue</pre><pre data-code-full hidden>from retargetingkit.sources.frames import HandPose, MANO21\n\nimport numpy as np\nf = HandPose(np.zeros((21, 3), dtype=np.float32))\nbool(f.valid.all()) and f.joint_names[MANO21.INDEX_TIP] == \"index_tip\"</pre></div>",
          "params": [
            {
              "name": "positions",
              "type": "Float[np.ndarray, '21 3']",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "orientations",
              "type": "Float[np.ndarray, '21 4']",
              "default": "(lambda: np.tile([1.0, 0.0, 0.0, 0.0], (21, 1)).astype(np.float32))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "valid",
              "type": "Bool[np.ndarray, 21]",
              "default": "(lambda: np.ones(21, dtype=bool))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "joint_names",
              "type": "tuple[str, ...]",
              "default": "(lambda: MANO21_JOINTS)()",
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
              "name": "positions",
              "signature": "positions: Float[np.ndarray, '21 3']",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L45",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "orientations",
              "signature": "orientations: Float[np.ndarray, '21 4'] = field(default_factory=lambda: np.tile([1.0, 0.0, 0.0, 0.0], (21, 1)).astype(np.float32))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L46",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "valid",
              "signature": "valid: Bool[np.ndarray, 21] = field(default_factory=lambda: np.ones(21, dtype=bool))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L49",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "joint_names",
              "signature": "joint_names: tuple[str, ...] = field(default_factory=lambda: MANO21_JOINTS)",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L50",
              "doc": "",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.sources.frames.HandFrame": {
          "kind": "class",
          "name": "HandFrame",
          "module": "retargetingkit.sources.frames",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L53",
          "anchor": "handframe",
          "doc": "<p>Latest left/right hand poses from one physical source.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; frame = HandFrame({\"right\": HandPose(np.zeros((21, 3), dtype=np.float32))})\n&gt;&gt;&gt; frame.hands[\"right\"].positions.shape\n(21, 3)</pre><pre data-code-full hidden>import numpy as np\nfrom retargetingkit.sources.frames import HandFrame, HandPose\n\nframe = HandFrame({\"right\": HandPose(np.zeros((21, 3), dtype=np.float32))})\nframe.hands[\"right\"].positions.shape</pre></div>",
          "bases": "Frame",
          "params": [
            {
              "name": "hands",
              "type": "dict[Side, HandPose]",
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
              "name": "hands",
              "signature": "hands: dict[Side, HandPose]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L62",
              "doc": "",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.sources.frames.ArmFrame": {
          "kind": "class",
          "name": "ArmFrame",
          "module": "retargetingkit.sources.frames",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L65",
          "anchor": "armframe",
          "doc": "<p>World-frame wrist poses used for arm retargeting.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; frame = ArmFrame({\"right\": np.array([0, 0, 0, 1, 0, 0, 0], dtype=np.float32)})\n&gt;&gt;&gt; frame.wrists[\"right\"].shape\n(7,)</pre><pre data-code-full hidden>import numpy as np\nfrom retargetingkit.sources.frames import ArmFrame\n\nframe = ArmFrame({\"right\": np.array([0, 0, 0, 1, 0, 0, 0], dtype=np.float32)})\nframe.wrists[\"right\"].shape</pre></div>",
          "bases": "Frame",
          "params": [
            {
              "name": "wrists",
              "type": "dict[Side, Float[np.ndarray, 7]]",
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
              "name": "wrists",
              "signature": "wrists: dict[Side, Float[np.ndarray, 7]]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L74",
              "doc": "",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.sources.frames.ArmHandFrame": {
          "kind": "class",
          "name": "ArmHandFrame",
          "module": "retargetingkit.sources.frames",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L77",
          "anchor": "armhandframe",
          "doc": "<p>Synchronized arm and hand observations from one physical source.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; arm = ArmFrame({\"right\": np.array([0, 0, 0, 1, 0, 0, 0], dtype=np.float32)})\n&gt;&gt;&gt; hand = HandFrame({\"right\": HandPose(np.zeros((21, 3), dtype=np.float32))})\n&gt;&gt;&gt; ArmHandFrame(arm, hand).arm.wrists[\"right\"].shape\n(7,)</pre><pre data-code-full hidden>import numpy as np\nfrom retargetingkit.sources.frames import ArmFrame, ArmHandFrame, HandFrame, HandPose\n\narm = ArmFrame({\"right\": np.array([0, 0, 0, 1, 0, 0, 0], dtype=np.float32)})\nhand = HandFrame({\"right\": HandPose(np.zeros((21, 3), dtype=np.float32))})\nArmHandFrame(arm, hand).arm.wrists[\"right\"].shape</pre></div>",
          "bases": "Frame",
          "params": [
            {
              "name": "arm",
              "type": "ArmFrame",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "hand",
              "type": "HandFrame",
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
              "name": "arm",
              "signature": "arm: ArmFrame",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L87",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand",
              "signature": "hand: HandFrame",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L88",
              "doc": "",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.sources.frames.BodyFrame": {
          "kind": "class",
          "name": "BodyFrame",
          "module": "retargetingkit.sources.frames",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L91",
          "anchor": "bodyframe",
          "doc": "<p>Named world-frame body transforms and performer height.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; frame = BodyFrame((\"pelvis\",), np.zeros((1, 7), dtype=np.float32), 1.75)\n&gt;&gt;&gt; frame.transforms.shape\n(1, 7)</pre><pre data-code-full hidden>import numpy as np\nfrom retargetingkit.sources.frames import BodyFrame\n\nframe = BodyFrame((\"pelvis\",), np.zeros((1, 7), dtype=np.float32), 1.75)\nframe.transforms.shape</pre></div>",
          "bases": "Frame",
          "params": [
            {
              "name": "joint_names",
              "type": "tuple[str, ...]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "transforms",
              "type": "Float[np.ndarray, 'J 7']",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "human_height",
              "type": "float",
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
              "name": "joint_names",
              "signature": "joint_names: tuple[str, ...]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L100",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "transforms",
              "signature": "transforms: Float[np.ndarray, 'J 7']",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L101",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "human_height",
              "signature": "human_height: float",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/frames.py#L102",
              "doc": "",
              "params": [],
              "returns": null
            }
          ]
        }
      }
    },
    {
      "id": "ref-sources",
      "nav": "Sources",
      "h": "Source API",
      "body": "<p>Sources read a device or recording and return canonical frames; each config's <code>build()</code> creates its source. See <a class=\"inline\" href=\"/docs/retargetingkit/protocols/\">Interfaces</a> for the lifecycle.</p><div data-api=\"retargetingkit.sources.source.Source\"></div><div data-api=\"retargetingkit.sources.source.SourceConfig\"></div><div data-api=\"retargetingkit.sources.misc.human_frame_file.BodyFileSourceConfig\"></div><div data-api=\"retargetingkit.sources.vr.vision_pro.VisionProHandConfig\"></div><div data-api=\"retargetingkit.sources.vr.vision_pro.VisionProArmConfig\"></div><div data-api=\"retargetingkit.sources.vr.vision_pro.VisionProArmHandConfig\"></div><div data-api=\"retargetingkit.sources.vr.pico.PicoSourceConfig\"></div><div data-api=\"retargetingkit.sources.glove.manus_glove.ManusSourceConfig\"></div><div data-api=\"retargetingkit.sources.mocap.axis_studio.source.AxisStudioSourceConfig\"></div><div data-api=\"retargetingkit.sources.vr.quest3.Quest3Config\"></div>",
      "sub": "API",
      "api": {
        "retargetingkit.sources.source.Source": {
          "kind": "class",
          "name": "Source",
          "module": "retargetingkit.sources.source",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/source.py#L12",
          "anchor": "source",
          "doc": "<p>A device, recording, or stream producing canonical motion frames.</p><h3>Built In Implementations Include</h3><ul><li><code>VisionProSource</code>: Apple Vision Pro hands, wrists, or both.</li><li><code>PicoSource</code>: PICO headset body tracking.</li><li><code>ManusSource</code>: Manus glove hand keypoints.</li><li><code>AxisStudioSource</code>: Axis Studio mocap body transforms.</li><li><code>BodyFileSource</code>: recorded body frames replayed from disk.</li></ul>",
          "bases": "ABC, Generic[FrameT]",
          "params": [],
          "callable": false,
          "returns": null,
          "members": [
            {
              "kind": "method",
              "base": "",
              "name": "get_frame",
              "signature": "get_frame() -> FrameT | None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/source.py#L24",
              "doc": "<p>Return the latest canonical frame, or None before the first sample.</p>",
              "params": [],
              "returns": {
                "type": "FrameT | None",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "close",
              "signature": "close() -> None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/source.py#L28",
              "doc": "<p>Release the device.</p>",
              "params": [],
              "returns": {
                "type": "None",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.sources.source.SourceConfig": {
          "kind": "class",
          "name": "SourceConfig",
          "module": "retargetingkit.sources.source",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/source.py#L33",
          "anchor": "sourceconfig",
          "doc": "<p>Config for Source.</p>",
          "bases": "ABC, Generic[FrameT]",
          "params": [],
          "callable": false,
          "returns": null,
          "members": [
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> Source[FrameT]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/source.py#L36",
              "doc": "<p>Construct and start the source device.</p>",
              "params": [],
              "returns": {
                "type": "Source[FrameT]",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.sources.misc.human_frame_file.BodyFileSourceConfig": {
          "kind": "class",
          "name": "BodyFileSourceConfig",
          "module": "retargetingkit.sources.misc.human_frame_file",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/misc/human_frame_file.py#L127",
          "anchor": "bodyfilesourceconfig",
          "doc": "<p>BVH or PICO recording playback settings.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; BodyFileSourceConfig(Path(\"motion.bvh\")).path.name\n'motion.bvh'</pre><pre data-code-full hidden>from retargetingkit.sources.misc.human_frame_file import BodyFileSourceConfig\nfrom pathlib import Path\n\nBodyFileSourceConfig(Path(\"motion.bvh\")).path.name</pre></div>",
          "bases": "SourceConfig[BodyFrame]",
          "params": [
            {
              "name": "path",
              "type": "Path",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "joint_names",
              "type": "tuple[str, ...]",
              "default": "BODY_JOINTS",
              "required": false,
              "doc": ""
            },
            {
              "name": "loop",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "target_fps",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "use_ankle_as_foot_target",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "human_height",
              "type": "float",
              "default": "1.75",
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
              "name": "path",
              "signature": "path: Path",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/misc/human_frame_file.py#L135",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "joint_names",
              "signature": "joint_names: tuple[str, ...] = BODY_JOINTS",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/misc/human_frame_file.py#L136",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "loop",
              "signature": "loop: bool = True",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/misc/human_frame_file.py#L137",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "target_fps",
              "signature": "target_fps: float = 0.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/misc/human_frame_file.py#L138",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "use_ankle_as_foot_target",
              "signature": "use_ankle_as_foot_target: bool = False",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/misc/human_frame_file.py#L139",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "human_height",
              "signature": "human_height: float = 1.75",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/misc/human_frame_file.py#L140",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> Source[BodyFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/misc/human_frame_file.py#L142",
              "doc": "",
              "params": [],
              "returns": {
                "type": "Source[BodyFrame]",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.sources.vr.vision_pro.VisionProHandConfig": {
          "kind": "class",
          "name": "VisionProHandConfig",
          "module": "retargetingkit.sources.vr.vision_pro",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L289",
          "anchor": "visionprohandconfig",
          "doc": "<p>Vision Pro connection projected as hand keypoints.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; VisionProHandConfig()\nVisionProHandConfig(ip=None, recording_path=None, recording_fps=20)</pre><pre data-code-full hidden>from retargetingkit.sources.vr.vision_pro import VisionProHandConfig\n\nVisionProHandConfig()</pre></div>",
          "bases": "SourceConfig[HandFrame]",
          "params": [
            {
              "name": "ip",
              "type": "str | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "recording_path",
              "type": "str | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "recording_fps",
              "type": "int",
              "default": "20",
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
              "name": "ip",
              "signature": "ip: str | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L297",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "recording_path",
              "signature": "recording_path: str | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L298",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "recording_fps",
              "signature": "recording_fps: int = 20",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L299",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> VisionProSource[HandFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L301",
              "doc": "<p>Construct one canonical hand source.</p>",
              "params": [],
              "returns": {
                "type": "VisionProSource[HandFrame]",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.sources.vr.vision_pro.VisionProArmConfig": {
          "kind": "class",
          "name": "VisionProArmConfig",
          "module": "retargetingkit.sources.vr.vision_pro",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L306",
          "anchor": "visionproarmconfig",
          "doc": "<p>Vision Pro connection projected as world-frame wrists.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; VisionProArmConfig()\nVisionProArmConfig(ip=None, recording_path=None, recording_fps=20)</pre><pre data-code-full hidden>from retargetingkit.sources.vr.vision_pro import VisionProArmConfig\n\nVisionProArmConfig()</pre></div>",
          "bases": "SourceConfig[ArmFrame]",
          "params": [
            {
              "name": "ip",
              "type": "str | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "recording_path",
              "type": "str | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "recording_fps",
              "type": "int",
              "default": "20",
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
              "name": "ip",
              "signature": "ip: str | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L314",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "recording_path",
              "signature": "recording_path: str | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L315",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "recording_fps",
              "signature": "recording_fps: int = 20",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L316",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> VisionProSource[ArmFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L318",
              "doc": "<p>Construct one canonical arm source.</p>",
              "params": [],
              "returns": {
                "type": "VisionProSource[ArmFrame]",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.sources.vr.vision_pro.VisionProArmHandConfig": {
          "kind": "class",
          "name": "VisionProArmHandConfig",
          "module": "retargetingkit.sources.vr.vision_pro",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L323",
          "anchor": "visionproarmhandconfig",
          "doc": "<p>Vision Pro connection projected as synchronized arm and hand frames.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; VisionProArmHandConfig()\nVisionProArmHandConfig(ip=None, recording_path=None, recording_fps=20)</pre><pre data-code-full hidden>from retargetingkit.sources.vr.vision_pro import VisionProArmHandConfig\n\nVisionProArmHandConfig()</pre></div>",
          "bases": "SourceConfig[ArmHandFrame]",
          "params": [
            {
              "name": "ip",
              "type": "str | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "recording_path",
              "type": "str | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "recording_fps",
              "type": "int",
              "default": "20",
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
              "name": "ip",
              "signature": "ip: str | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L331",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "recording_path",
              "signature": "recording_path: str | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L332",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "recording_fps",
              "signature": "recording_fps: int = 20",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L333",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> VisionProSource[ArmHandFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/vision_pro.py#L335",
              "doc": "<p>Construct one synchronized canonical arm-and-hand source.</p>",
              "params": [],
              "returns": {
                "type": "VisionProSource[ArmHandFrame]",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.sources.vr.pico.PicoSourceConfig": {
          "kind": "class",
          "name": "PicoSourceConfig",
          "module": "retargetingkit.sources.vr.pico",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/pico.py#L297",
          "anchor": "picosourceconfig",
          "doc": "<p>Live PICO body-tracking settings.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; PicoSourceConfig().joint_names[0]\n'pelvis'</pre><pre data-code-full hidden>from retargetingkit.sources.vr.pico import PicoSourceConfig\n\nPicoSourceConfig().joint_names[0]</pre></div>",
          "bases": "SourceConfig[BodyFrame]",
          "params": [
            {
              "name": "human_height",
              "type": "float",
              "default": "1.75",
              "required": false,
              "doc": ""
            },
            {
              "name": "use_ankle_as_foot_target",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "joint_names",
              "type": "tuple[str, ...]",
              "default": "CANONICAL_BODY_JOINTS",
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
              "name": "human_height",
              "signature": "human_height: float = 1.75",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/pico.py#L305",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "use_ankle_as_foot_target",
              "signature": "use_ankle_as_foot_target: bool = False",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/pico.py#L306",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "joint_names",
              "signature": "joint_names: tuple[str, ...] = CANONICAL_BODY_JOINTS",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/pico.py#L307",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> PicoSource",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/pico.py#L309",
              "doc": "",
              "params": [],
              "returns": {
                "type": "PicoSource",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.sources.glove.manus_glove.ManusSourceConfig": {
          "kind": "class",
          "name": "ManusSourceConfig",
          "module": "retargetingkit.sources.glove.manus_glove",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/glove/manus_glove.py#L155",
          "anchor": "manussourceconfig",
          "doc": "<p>Manus glove connection settings.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; # ManusSourceConfig().build()  # doctest: +SKIP</pre><pre data-code-full hidden># ManusSourceConfig().build()  # doctest: +SKIP</pre></div>",
          "bases": "SourceConfig[HandFrame]",
          "params": [
            {
              "name": "left_id",
              "type": "str | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "right_id",
              "type": "str | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "use_calibration",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "calibration_path",
              "type": "Path | None",
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
              "name": "left_id",
              "signature": "left_id: str | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/glove/manus_glove.py#L162",
              "doc": "<p>Override the left glove ID (decimal or <code>0x</code> hex).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "right_id",
              "signature": "right_id: str | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/glove/manus_glove.py#L164",
              "doc": "<p>Override the right glove ID (decimal or <code>0x</code> hex).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "use_calibration",
              "signature": "use_calibration: bool = True",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/glove/manus_glove.py#L166",
              "doc": "<p>Apply the Manus thumb transform and per-finger scales.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "calibration_path",
              "signature": "calibration_path: Path | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/glove/manus_glove.py#L168",
              "doc": "<p>Calibration NPZ path; <code>None</code> fetches the <code>manus_calib</code> Hugging Face asset.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> Source[HandFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/glove/manus_glove.py#L171",
              "doc": "",
              "params": [],
              "returns": {
                "type": "Source[HandFrame]",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.sources.mocap.axis_studio.source.AxisStudioSourceConfig": {
          "kind": "class",
          "name": "AxisStudioSourceConfig",
          "module": "retargetingkit.sources.mocap.axis_studio.source",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/mocap/axis_studio/source.py#L182",
          "anchor": "axisstudiosourceconfig",
          "doc": "<p>Axis Studio Calc connection settings.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; AxisStudioSourceConfig().port\n7012</pre><pre data-code-full hidden>from retargetingkit.sources.mocap.axis_studio.source import AxisStudioSourceConfig\n\nAxisStudioSourceConfig().port</pre></div>",
          "bases": "SourceConfig[BodyFrame]",
          "params": [
            {
              "name": "port",
              "type": "int",
              "default": "7012",
              "required": false,
              "doc": ""
            },
            {
              "name": "human_height",
              "type": "float",
              "default": "1.75",
              "required": false,
              "doc": ""
            },
            {
              "name": "use_ankle_as_foot_target",
              "type": "bool",
              "default": "False",
              "required": false,
              "doc": ""
            },
            {
              "name": "joint_names",
              "type": "tuple[str, ...]",
              "default": "BODY_JOINTS",
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
              "name": "port",
              "signature": "port: int = 7012",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/mocap/axis_studio/source.py#L190",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "human_height",
              "signature": "human_height: float = 1.75",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/mocap/axis_studio/source.py#L191",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "use_ankle_as_foot_target",
              "signature": "use_ankle_as_foot_target: bool = False",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/mocap/axis_studio/source.py#L192",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "joint_names",
              "signature": "joint_names: tuple[str, ...] = BODY_JOINTS",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/mocap/axis_studio/source.py#L193",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> Source[BodyFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/mocap/axis_studio/source.py#L195",
              "doc": "",
              "params": [],
              "returns": {
                "type": "Source[BodyFrame]",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.sources.vr.quest3.Quest3Config": {
          "kind": "class",
          "name": "Quest3Config",
          "module": "retargetingkit.sources.vr.quest3",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/quest3.py#L21",
          "anchor": "quest3config",
          "doc": "<p>Quest3 Isaac Teleop stream configuration.</p>",
          "bases": "SourceConfig['Quest3Frame']",
          "params": [
            {
              "name": "app_name",
              "type": "str",
              "default": "'RetargetingKitQuest3'",
              "required": false,
              "doc": ""
            },
            {
              "name": "sides",
              "type": "tuple[str, ...]",
              "default": "(RIGHT,)",
              "required": false,
              "doc": ""
            },
            {
              "name": "verbose",
              "type": "bool",
              "default": "True",
              "required": false,
              "doc": ""
            },
            {
              "name": "cloudxr_env_path",
              "type": "str",
              "default": "'~/.cloudxr/run/cloudxr.env'",
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
              "name": "app_name",
              "signature": "app_name: str = 'RetargetingKitQuest3'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/quest3.py#L25",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "sides",
              "signature": "sides: tuple[str, ...] = (RIGHT,)",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/quest3.py#L26",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "verbose",
              "signature": "verbose: bool = True",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/quest3.py#L27",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "cloudxr_env_path",
              "signature": "cloudxr_env_path: str = '~/.cloudxr/run/cloudxr.env'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/quest3.py#L28",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> Quest3",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/sources/vr/quest3.py#L30",
              "doc": "<p>Start the Isaac Teleop session.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; Quest3Config().build()  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.sources.vr.quest3 import Quest3Config\n\nQuest3Config().build()  # doctest: +SKIP</pre></div>",
              "params": [],
              "returns": {
                "type": "Quest3",
                "doc": ""
              }
            }
          ]
        }
      }
    },
    {
      "id": "ref-hand",
      "nav": "Hand retargeters",
      "h": "Hand retargeter API",
      "body": "<p>Hand retargeters consume a canonical <code>HandFrame</code> and return joint positions in the target URDF's order. Choose <a class=\"inline\" href=\"/docs/retargetingkit/hand-optimization/\">optimization</a> for per-frame solving or a <a class=\"inline\" href=\"/docs/retargetingkit/neural-hand/\">neural model</a> for a trained mapping.</p><div data-api=\"retargetingkit.retargeting.hand.optimization.OptimizationHandRetargeterConfig\"></div><div data-api=\"retargetingkit.retargeting.hand.neural.NeuralHandRetargeterConfig\"></div><div data-api=\"retargetingkit.retargeting.hand.neural.NeuralHandAssetRetargeterConfig\"></div>",
      "sub": "API",
      "api": {
        "retargetingkit.retargeting.hand.optimization.OptimizationHandRetargeterConfig": {
          "kind": "class",
          "name": "OptimizationHandRetargeterConfig",
          "module": "retargetingkit.retargeting.hand.optimization",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/optimization.py#L18",
          "anchor": "optimizationhandretargeterconfig",
          "doc": "<p>Online-optimization hand retargeting; <code>spec</code>/<code>online</code> come from <code>robokit.helpers.hand_retargeting.presets</code>.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; OptimizationHandRetargeterConfig(Path(\"hand.urdf\"), spec, online, \"right\").side  # doctest: +SKIP\n'right'</pre><pre data-code-full hidden>from retargetingkit.retargeting.hand.optimization import OptimizationHandRetargeterConfig\nfrom pathlib import Path\n\nOptimizationHandRetargeterConfig(Path(\"hand.urdf\"), spec, online, \"right\").side  # doctest: +SKIP</pre></div>",
          "bases": "RetargeterConfig[HandFrame, QPosCommand]",
          "params": [
            {
              "name": "urdf",
              "type": "Path",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "spec",
              "type": "Annotated[HandSpec, tyro.conf.Suppress]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "online",
              "type": "Annotated[HandRetargeterOnlineConfig, OPAQUE, tyro.conf.Suppress]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "side",
              "type": "Side",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "collision_spheres",
              "type": "Path | None",
              "default": "None",
              "required": false,
              "doc": ""
            },
            {
              "name": "collision_ignore",
              "type": "Path | None",
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
              "name": "urdf",
              "signature": "urdf: Path",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/optimization.py#L26",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "spec",
              "signature": "spec: Annotated[HandSpec, tyro.conf.Suppress]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/optimization.py#L27",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "online",
              "signature": "online: Annotated[HandRetargeterOnlineConfig, OPAQUE, tyro.conf.Suppress]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/optimization.py#L28",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "side",
              "signature": "side: Side",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/optimization.py#L29",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "collision_spheres",
              "signature": "collision_spheres: Path | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/optimization.py#L30",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "collision_ignore",
              "signature": "collision_ignore: Path | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/optimization.py#L31",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build(device: str) -> OptimizationHandRetargeter",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/optimization.py#L33",
              "doc": "<p>Build and warm up the optimization retargeter.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; config.build(\"cpu\")  # doctest: +SKIP</pre><pre data-code-full hidden>config.build(\"cpu\")  # doctest: +SKIP</pre></div>",
              "params": [
                {
                  "name": "device",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "OptimizationHandRetargeter",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.retargeting.hand.neural.NeuralHandRetargeterConfig": {
          "kind": "class",
          "name": "NeuralHandRetargeterConfig",
          "module": "retargetingkit.retargeting.hand.neural",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L73",
          "anchor": "neuralhandretargeterconfig",
          "doc": "<p>One human hand mapped onto one robot hand by a trained checkpoint.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; from pathlib import Path\n&gt;&gt;&gt; from retargetingkit.retargeting.hand.presets import HANDS\n&gt;&gt;&gt; NeuralHandRetargeterConfig(Path(\"run\"), HANDS[\"xhand\"]).side\n'right'</pre><pre data-code-full hidden>from retargetingkit.retargeting.hand.neural import NeuralHandRetargeterConfig\n\nfrom pathlib import Path\nfrom retargetingkit.retargeting.hand.presets import HANDS\nNeuralHandRetargeterConfig(Path(\"run\"), HANDS[\"xhand\"]).side</pre></div>",
          "bases": "RetargeterConfig[HandFrame, QPosCommand]",
          "params": [
            {
              "name": "checkpoint_dir",
              "type": "Path",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "hand",
              "type": "HandPreset",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "side",
              "type": "Side",
              "default": "'right'",
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
              "name": "checkpoint_dir",
              "signature": "checkpoint_dir: Path",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L83",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand",
              "signature": "hand: HandPreset",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L84",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "side",
              "signature": "side: Side = 'right'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L85",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build(device: str) -> NeuralHandRetargeter",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L87",
              "doc": "<p>Load the checkpoint onto <code>device</code>.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; NeuralHandRetargeterConfig(Path(\"run\"), HANDS[\"xhand\"]).build(\"cpu\")  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.retargeting.hand.neural import NeuralHandRetargeterConfig\nfrom pathlib import Path\n\nNeuralHandRetargeterConfig(Path(\"run\"), HANDS[\"xhand\"]).build(\"cpu\")  # doctest: +SKIP</pre></div>",
              "params": [
                {
                  "name": "device",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "NeuralHandRetargeter",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.retargeting.hand.neural.NeuralHandAssetRetargeterConfig": {
          "kind": "class",
          "name": "NeuralHandAssetRetargeterConfig",
          "module": "retargetingkit.retargeting.hand.neural",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L95",
          "anchor": "neuralhandassetretargeterconfig",
          "doc": "<p>A named Hugging Face checkpoint resolved when the retargeter is built.</p>",
          "bases": "RetargeterConfig[HandFrame, QPosCommand]",
          "params": [
            {
              "name": "checkpoint",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "hand",
              "type": "HandPreset",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "side",
              "type": "Side",
              "default": "'right'",
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
              "name": "checkpoint",
              "signature": "checkpoint: str",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L99",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand",
              "signature": "hand: HandPreset",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L100",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "side",
              "signature": "side: Side = 'right'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L101",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build(device: str) -> NeuralHandRetargeter",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/hand/neural.py#L103",
              "doc": "<p>Download the checkpoint if needed, then load it on <code>device</code>.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; config.build(\"cpu\")  # doctest: +SKIP</pre><pre data-code-full hidden>config.build(\"cpu\")  # doctest: +SKIP</pre></div>",
              "params": [
                {
                  "name": "device",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "NeuralHandRetargeter",
                "doc": ""
              }
            }
          ]
        }
      }
    },
    {
      "id": "ref-arm",
      "nav": "Arm retargeter",
      "h": "Arm retargeter API",
      "body": "<p>The arm retargeter maps world-frame wrist poses in an <code>ArmFrame</code> to arm joint positions. See <a class=\"inline\" href=\"/docs/retargetingkit/arm-retargeting/\">Arm retargeting</a> for usage.</p><div data-api=\"retargetingkit.retargeting.retargeter.RetargeterConfig\"></div><div data-api=\"retargetingkit.retargeting.arm.online.ArmRetargeterConfig\"></div><div data-api=\"retargetingkit.retargeting.arm.online.ArmRetargeter\"></div>",
      "sub": "API",
      "api": {
        "retargetingkit.retargeting.retargeter.RetargeterConfig": {
          "kind": "class",
          "name": "RetargeterConfig",
          "module": "retargetingkit.retargeting.retargeter",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/retargeter.py#L35",
          "anchor": "retargeterconfig",
          "doc": "<p>Retargeter blueprint; configs live next to their solver and feed <code>retargetingkit.configs.teleop</code> rig presets.</p>",
          "bases": "ABC, Generic[FrameT, CommandT]",
          "params": [],
          "callable": false,
          "returns": null,
          "members": [
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build(device: str) -> Retargeter[FrameT, CommandT]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/retargeter.py#L38",
              "doc": "<p>Construct and warm up the retargeter.</p>",
              "params": [
                {
                  "name": "device",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "Retargeter[FrameT, CommandT]",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.retargeting.arm.online.ArmRetargeterConfig": {
          "kind": "class",
          "name": "ArmRetargeterConfig",
          "module": "retargetingkit.retargeting.arm.online",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L19",
          "anchor": "armretargeterconfig",
          "doc": "<p>One human wrist mapped onto one robot arm.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; ArmRetargeterConfig(Path(\"arm.urdf\"), \"link_eef\", (0.0,), \"right\").translation_scale\n1.5</pre><pre data-code-full hidden>from retargetingkit.retargeting.arm.online import ArmRetargeterConfig\nfrom pathlib import Path\n\nArmRetargeterConfig(Path(\"arm.urdf\"), \"link_eef\", (0.0,), \"right\").translation_scale</pre></div>",
          "bases": "RetargeterConfig[ArmFrame, QPosCommand]",
          "params": [
            {
              "name": "urdf",
              "type": "Path",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "ee_link",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "home_qpos",
              "type": "tuple[float, ...]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "side",
              "type": "Side",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "translation_scale",
              "type": "float",
              "default": "1.5",
              "required": false,
              "doc": ""
            },
            {
              "name": "ee_gain",
              "type": "float",
              "default": "1.0",
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
              "name": "urdf",
              "signature": "urdf: Path",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L27",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "ee_link",
              "signature": "ee_link: str",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L28",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "home_qpos",
              "signature": "home_qpos: tuple[float, ...]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L29",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "side",
              "signature": "side: Side",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L30",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "translation_scale",
              "signature": "translation_scale: float = 1.5",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L31",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "ee_gain",
              "signature": "ee_gain: float = 1.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L32",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build(device: str) -> ArmRetargeter",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L34",
              "doc": "<p>Build the online arm retargeter.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; ArmRetargeterConfig(Path(\"arm.urdf\"), \"link_eef\", (0.0,), \"right\").build(\"cpu\")  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.retargeting.arm.online import ArmRetargeterConfig\nfrom pathlib import Path\n\nArmRetargeterConfig(Path(\"arm.urdf\"), \"link_eef\", (0.0,), \"right\").build(\"cpu\")  # doctest: +SKIP</pre></div>",
              "params": [
                {
                  "name": "device",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "ArmRetargeter",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.retargeting.arm.online.ArmRetargeter": {
          "kind": "class",
          "name": "ArmRetargeter",
          "module": "retargetingkit.retargeting.arm.online",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L42",
          "anchor": "armretargeter",
          "doc": "<p>One human wrist to one robot arm; the first wrist sample is the calibration origin and maps to the home pose.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; ArmRetargeter(config, \"cpu\")  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.retargeting.arm.online import ArmRetargeter\n\nArmRetargeter(config, \"cpu\")  # doctest: +SKIP</pre></div>",
          "bases": "Retargeter[ArmFrame, QPosCommand]",
          "params": [
            {
              "name": "config",
              "type": "ArmRetargeterConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "device",
              "type": "str",
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
              "name": "side",
              "signature": "side: Side",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L49",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "wrist_to_ee_pose",
              "signature": "wrist_to_ee_pose(initial_ee_pose: np.ndarray, initial_wrist: np.ndarray, wrist: np.ndarray, translation_scale: float) -> np.ndarray",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L76",
              "doc": "<p>Replay the wrist delta since calibration from the home EE pose, scaling translation to robot reach.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; ee = np.array([1, 2, 3, 1, 0, 0, 0], dtype=np.float32)\n&gt;&gt;&gt; identity = np.array([0, 0, 0, 1, 0, 0, 0], dtype=np.float32)\n&gt;&gt;&gt; ArmRetargeter.wrist_to_ee_pose(ee, identity, identity, 1.5)\narray([1., 2., 3., 1., 0., 0., 0.], dtype=float32)</pre><pre data-code-full hidden>import numpy as np\nfrom retargetingkit.retargeting.arm.online import ArmRetargeter\n\nee = np.array([1, 2, 3, 1, 0, 0, 0], dtype=np.float32)\nidentity = np.array([0, 0, 0, 1, 0, 0, 0], dtype=np.float32)\nArmRetargeter.wrist_to_ee_pose(ee, identity, identity, 1.5)</pre></div>",
              "params": [
                {
                  "name": "initial_ee_pose",
                  "type": "np.ndarray",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "initial_wrist",
                  "type": "np.ndarray",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "wrist",
                  "type": "np.ndarray",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "translation_scale",
                  "type": "float",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "np.ndarray",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "smooth_pose7",
              "signature": "smooth_pose7(previous: np.ndarray, current: np.ndarray, gain: float) -> np.ndarray",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L96",
              "doc": "<p>EMA-blend two pose7s while keeping quaternions in one hemisphere.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; previous = np.array([0, 0, 0, 1, 0, 0, 0], dtype=np.float32)\n&gt;&gt;&gt; current = np.array([1, 0, 0, 1, 0, 0, 0], dtype=np.float32)\n&gt;&gt;&gt; ArmRetargeter.smooth_pose7(previous, current, 0.5)\narray([0.5, 0. , 0. , 1. , 0. , 0. , 0. ], dtype=float32)</pre><pre data-code-full hidden>import numpy as np\nfrom retargetingkit.retargeting.arm.online import ArmRetargeter\n\nprevious = np.array([0, 0, 0, 1, 0, 0, 0], dtype=np.float32)\ncurrent = np.array([1, 0, 0, 1, 0, 0, 0], dtype=np.float32)\nArmRetargeter.smooth_pose7(previous, current, 0.5)</pre></div>",
              "params": [
                {
                  "name": "previous",
                  "type": "np.ndarray",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "current",
                  "type": "np.ndarray",
                  "default": null,
                  "required": true,
                  "doc": ""
                },
                {
                  "name": "gain",
                  "type": "float",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "np.ndarray",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "solve",
              "signature": "solve(frame: ArmFrame) -> QPosCommand",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/arm/online.py#L110",
              "doc": "",
              "params": [
                {
                  "name": "frame",
                  "type": "ArmFrame",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "QPosCommand",
                "doc": ""
              }
            }
          ]
        }
      }
    },
    {
      "id": "ref-humanoid",
      "nav": "Humanoid retargeter",
      "h": "Humanoid retargeter API",
      "body": "<p>The humanoid retargeter maps a <code>BodyFrame</code> to a floating-base humanoid pose. See <a class=\"inline\" href=\"/docs/retargetingkit/humanoid-retargeting/\">Humanoid retargeting</a> for usage.</p><div data-api=\"retargetingkit.retargeting.humanoid.online.HumanoidRetargeterConfig\"></div><div data-api=\"retargetingkit.retargeting.humanoid.online.HumanoidRetargeter\"></div>",
      "sub": "API",
      "api": {
        "retargetingkit.retargeting.humanoid.online.HumanoidRetargeterConfig": {
          "kind": "class",
          "name": "HumanoidRetargeterConfig",
          "module": "retargetingkit.retargeting.humanoid.online",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/humanoid/online.py#L16",
          "anchor": "humanoidretargeterconfig",
          "doc": "<p>One robokit humanoid preset plus output adjustment.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; HumanoidRetargeterConfig(HumanoidRetargeterOnlineConfig()).z_offset\n0.0</pre><pre data-code-full hidden>from retargetingkit.retargeting.humanoid.online import HumanoidRetargeterConfig\nfrom robokit.helpers.humanoid_retargeting import HumanoidRetargeterOnlineConfig\n\nHumanoidRetargeterConfig(HumanoidRetargeterOnlineConfig()).z_offset</pre></div>",
          "bases": "RetargeterConfig[BodyFrame, BasePoseQPosCommand]",
          "params": [
            {
              "name": "preset",
              "type": "Annotated[HumanoidRetargeterOnlineConfig, OPAQUE, tyro.conf.Suppress]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "z_offset",
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
              "name": "preset",
              "signature": "preset: Annotated[HumanoidRetargeterOnlineConfig, OPAQUE, tyro.conf.Suppress]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/humanoid/online.py#L24",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "z_offset",
              "signature": "z_offset: float = 0.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/humanoid/online.py#L25",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build(device: str) -> HumanoidRetargeter",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/humanoid/online.py#L27",
              "doc": "<p>Build and warm up the online retargeter.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; HumanoidRetargeterConfig(g1_aligned).build(\"cpu\")  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.retargeting.humanoid.online import HumanoidRetargeterConfig\n\nHumanoidRetargeterConfig(g1_aligned).build(\"cpu\")  # doctest: +SKIP</pre></div>",
              "params": [
                {
                  "name": "device",
                  "type": "str",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "HumanoidRetargeter",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.retargeting.humanoid.online.HumanoidRetargeter": {
          "kind": "class",
          "name": "HumanoidRetargeter",
          "module": "retargetingkit.retargeting.humanoid.online",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/humanoid/online.py#L35",
          "anchor": "humanoidretargeter",
          "doc": "<p>Named human body transforms to a floating-base robot command.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; HumanoidRetargeter(config, \"cpu\")  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.retargeting.humanoid.online import HumanoidRetargeter\n\nHumanoidRetargeter(config, \"cpu\")  # doctest: +SKIP</pre></div>",
          "bases": "Retargeter[BodyFrame, BasePoseQPosCommand]",
          "params": [
            {
              "name": "config",
              "type": "HumanoidRetargeterConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "device",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            }
          ],
          "callable": true,
          "returns": null,
          "members": [
            {
              "kind": "method",
              "base": "",
              "name": "solve",
              "signature": "solve(frame: BodyFrame) -> BasePoseQPosCommand",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/humanoid/online.py#L52",
              "doc": "",
              "params": [
                {
                  "name": "frame",
                  "type": "BodyFrame",
                  "default": null,
                  "required": true,
                  "doc": ""
                }
              ],
              "returns": {
                "type": "BasePoseQPosCommand",
                "doc": ""
              }
            },
            {
              "kind": "method",
              "base": "",
              "name": "reset",
              "signature": "reset() -> None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/retargeting/humanoid/online.py#L59",
              "doc": "<p>Reset the solver.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; retargeter.reset()  # doctest: +SKIP</pre><pre data-code-full hidden>retargeter.reset()  # doctest: +SKIP</pre></div>",
              "params": [],
              "returns": {
                "type": "None",
                "doc": ""
              }
            }
          ]
        }
      }
    },
    {
      "id": "ref-targets",
      "nav": "Commands and targets",
      "h": "Commands and targets",
      "body": "<p>Commands carry one solved robot pose. Concrete targets consume joint positions or a complete command; see <a class=\"inline\" href=\"/docs/retargetingkit/protocols/\">Interfaces</a> for how runtimes choose the update method.</p><div data-api=\"retargetingkit.targets.commands.QPosCommand\"></div><div data-api=\"retargetingkit.targets.commands.BasePoseQPosCommand\"></div><div data-api=\"retargetingkit.targets.target.Target\"></div><div data-api=\"retargetingkit.targets.target.TargetConfig\"></div>",
      "sub": "API",
      "api": {
        "retargetingkit.targets.commands.QPosCommand": {
          "kind": "class",
          "name": "QPosCommand",
          "module": "retargetingkit.targets.commands",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/commands.py#L13",
          "anchor": "qposcommand",
          "doc": "<p>Actuated joint positions in URDF order.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; QPosCommand(np.zeros(7)).qpos.shape\n(7,)</pre><pre data-code-full hidden>import numpy as np\nfrom retargetingkit.targets.commands import QPosCommand\n\nQPosCommand(np.zeros(7)).qpos.shape</pre></div>",
          "bases": "Command",
          "params": [
            {
              "name": "qpos",
              "type": "np.ndarray",
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
              "name": "qpos",
              "signature": "qpos: np.ndarray",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/commands.py#L21",
              "doc": "",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.targets.commands.BasePoseQPosCommand": {
          "kind": "class",
          "name": "BasePoseQPosCommand",
          "module": "retargetingkit.targets.commands",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/commands.py#L24",
          "anchor": "baseposeqposcommand",
          "doc": "<p>Joint positions plus the floating-base world pose as <code>[xyz, wxyz]</code>.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; BasePoseQPosCommand(np.zeros(29), np.array([0, 0, 0, 1, 0, 0, 0])).base_pose.shape\n(7,)</pre><pre data-code-full hidden>import numpy as np\nfrom retargetingkit.targets.commands import BasePoseQPosCommand\n\nBasePoseQPosCommand(np.zeros(29), np.array([0, 0, 0, 1, 0, 0, 0])).base_pose.shape</pre></div>",
          "bases": "QPosCommand",
          "params": [
            {
              "name": "qpos",
              "type": "np.ndarray",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "base_pose",
              "type": "np.ndarray",
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
              "base": "QPosCommand",
              "name": "qpos",
              "signature": "qpos: np.ndarray",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/commands.py#L21",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "base_pose",
              "signature": "base_pose: np.ndarray",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/commands.py#L32",
              "doc": "",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.targets.target.Target": {
          "kind": "class",
          "name": "Target",
          "module": "retargetingkit.targets.target",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/target.py#L10",
          "anchor": "target",
          "doc": "<p>A hardware, transport, or viewer consuming robot commands.</p><h3>Built In Implementations Include</h3><ul><li><code>XArm6</code>, <code>XArm7</code>: xArm hardware over the xArm SDK.</li><li><code>XHand</code>, <code>AbilityHand</code>, <code>InspireHand</code>, <code>SharpaHand</code>: robot-hand hardware.</li><li><code>SonicTarget</code>: SONIC v1 humanoid commands over ZMQ.</li><li><code>Viser</code>: one or more URDFs in a browser.</li></ul>",
          "bases": "ABC",
          "params": [],
          "callable": false,
          "returns": null,
          "members": [
            {
              "kind": "method",
              "base": "",
              "name": "set_qpos",
              "signature": "set_qpos(qpos: np.ndarray) -> None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/target.py#L20",
              "doc": "<p>Command actuated joint positions in radians.</p>",
              "params": [
                {
                  "name": "qpos",
                  "type": "np.ndarray",
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
              "name": "set_command",
              "signature": "set_command(command: Command) -> None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/target.py#L24",
              "doc": "<p>Command one canonical robot command as one atomic update.</p>",
              "params": [
                {
                  "name": "command",
                  "type": "Command",
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
              "name": "close",
              "signature": "close() -> None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/target.py#L28",
              "doc": "<p>Release hardware or transport.</p>",
              "params": [],
              "returns": {
                "type": "None",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.target.TargetConfig": {
          "kind": "class",
          "name": "TargetConfig",
          "module": "retargetingkit.targets.target",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/target.py#L33",
          "anchor": "targetconfig",
          "doc": "<p>Robot target blueprint; subclasses live beside their device and make up <code>retargetingkit.configs.teleop</code> rigs.</p>",
          "bases": "ABC",
          "params": [],
          "callable": false,
          "returns": null,
          "members": [
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> Target",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/target.py#L36",
              "doc": "<p>Construct and start the target.</p>",
              "params": [],
              "returns": {
                "type": "Target",
                "doc": ""
              }
            }
          ]
        }
      }
    },
    {
      "id": "ref-target-configs",
      "nav": "Target configs",
      "h": "Target configs",
      "body": "<p>Each config builds one robot or viewer target. See the <a class=\"inline\" href=\"/docs/retargetingkit/xarm/\">Targets</a> pages for hardware setup.</p><div data-api=\"retargetingkit.targets.arms.xarm6.XArm6Config\"></div><div data-api=\"retargetingkit.targets.arms.xarm7.XArm7Config\"></div><div data-api=\"retargetingkit.targets.hands.xhand.XHandConfig\"></div><div data-api=\"retargetingkit.targets.hands.sharpa_hand.SharpaHandConfig\"></div><div data-api=\"retargetingkit.targets.hands.ability_hand.AbilityHandConfig\"></div><div data-api=\"retargetingkit.targets.hands.inspire.InspireHandConfig\"></div><div data-api=\"retargetingkit.targets.humanoids.sonic.SonicTargetConfig\"></div><div data-api=\"retargetingkit.targets.humanoids.rby1.RBY1AConfig\"></div><div data-api=\"retargetingkit.targets.humanoids.dexmate.DexmateConfig\"></div><div data-api=\"retargetingkit.targets.viser.ViserConfig\"></div>",
      "sub": "API",
      "api": {
        "retargetingkit.targets.arms.xarm6.XArm6Config": {
          "kind": "class",
          "name": "XArm6Config",
          "module": "retargetingkit.targets.arms.xarm6",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm6.py#L26",
          "anchor": "xarm6config",
          "doc": "<p>xArm6 controller configuration.</p>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "ip",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "mode",
              "type": "XArmMode",
              "default": "XArmMode.VELOCITY",
              "required": false,
              "doc": ""
            },
            {
              "name": "dt",
              "type": "float",
              "default": "1.0 / 250",
              "required": false,
              "doc": ""
            },
            {
              "name": "ee_link",
              "type": "str",
              "default": "XARM6_EE_LINK",
              "required": false,
              "doc": ""
            },
            {
              "name": "kp",
              "type": "np.ndarray",
              "default": "(lambda: np.array([10.0, 10.0, 5.0, 5.0, 5.0, 5.0]))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "kd",
              "type": "np.ndarray",
              "default": "(lambda: np.array([0.5, 0.5, 0.25, 0.25, 0.25, 0.25]))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "max_velocity",
              "type": "np.ndarray",
              "default": "(lambda: np.array([0.8, 0.8, 0.8, 1.0, 1.0, 3.0]))()",
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
              "name": "ip",
              "signature": "ip: str",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm6.py#L30",
              "doc": "<p>IP address of the xArm controller.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mode",
              "signature": "mode: XArmMode = XArmMode.VELOCITY",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm6.py#L32",
              "doc": "<p>Control mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "dt",
              "signature": "dt: float = 1.0 / 250",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm6.py#L34",
              "doc": "<p>Servo loop timestep in seconds.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "ee_link",
              "signature": "ee_link: str = XARM6_EE_LINK",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm6.py#L36",
              "doc": "<p>End effector link name for IK.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kp",
              "signature": "kp: np.ndarray = field(default_factory=lambda: np.array([10.0, 10.0, 5.0, 5.0, 5.0, 5.0]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm6.py#L38",
              "doc": "<p>Proportional gains for velocity mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kd",
              "signature": "kd: np.ndarray = field(default_factory=lambda: np.array([0.5, 0.5, 0.25, 0.25, 0.25, 0.25]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm6.py#L40",
              "doc": "<p>Derivative gains for velocity mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "max_velocity",
              "signature": "max_velocity: np.ndarray = field(default_factory=lambda: np.array([0.8, 0.8, 0.8, 1.0, 1.0, 3.0]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm6.py#L42",
              "doc": "<p>Maximum joint velocities (rad/s), used by both SERVO and VELOCITY modes.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> XArm6",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm6.py#L45",
              "doc": "",
              "params": [],
              "returns": {
                "type": "XArm6",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.arms.xarm7.XArm7Config": {
          "kind": "class",
          "name": "XArm7Config",
          "module": "retargetingkit.targets.arms.xarm7",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm7.py#L38",
          "anchor": "xarm7config",
          "doc": "<p>xArm7 controller configuration.</p>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "ip",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "mode",
              "type": "XArmMode",
              "default": "XArmMode.VELOCITY",
              "required": false,
              "doc": ""
            },
            {
              "name": "dt",
              "type": "float",
              "default": "1.0 / 250",
              "required": false,
              "doc": ""
            },
            {
              "name": "ee_link",
              "type": "str",
              "default": "XARM7_EE_LINK",
              "required": false,
              "doc": ""
            },
            {
              "name": "kp",
              "type": "np.ndarray",
              "default": "(lambda: np.array([10.0, 10.0, 5.0, 5.0, 5.0, 5.0, 5.0]))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "kd",
              "type": "np.ndarray",
              "default": "(lambda: np.array([0.5, 0.5, 0.25, 0.25, 0.25, 0.25, 0.25]))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "max_velocity",
              "type": "np.ndarray",
              "default": "(lambda: np.array([0.8, 0.8, 0.8, 0.8, 1.0, 1.0, 3.0]))()",
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
              "name": "ip",
              "signature": "ip: str",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm7.py#L42",
              "doc": "<p>IP address of the xArm controller.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mode",
              "signature": "mode: XArmMode = XArmMode.VELOCITY",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm7.py#L44",
              "doc": "<p>Control mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "dt",
              "signature": "dt: float = 1.0 / 250",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm7.py#L46",
              "doc": "<p>Servo loop timestep in seconds.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "ee_link",
              "signature": "ee_link: str = XARM7_EE_LINK",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm7.py#L48",
              "doc": "<p>End effector link name for IK.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kp",
              "signature": "kp: np.ndarray = field(default_factory=lambda: np.array([10.0, 10.0, 5.0, 5.0, 5.0, 5.0, 5.0]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm7.py#L50",
              "doc": "<p>Proportional gains for velocity mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kd",
              "signature": "kd: np.ndarray = field(default_factory=lambda: np.array([0.5, 0.5, 0.25, 0.25, 0.25, 0.25, 0.25]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm7.py#L52",
              "doc": "<p>Derivative gains for velocity mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "max_velocity",
              "signature": "max_velocity: np.ndarray = field(default_factory=lambda: np.array([0.8, 0.8, 0.8, 0.8, 1.0, 1.0, 3.0]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm7.py#L54",
              "doc": "<p>Maximum joint velocities (rad/s), used by both SERVO and VELOCITY modes.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> XArm7",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/arms/xarm7.py#L57",
              "doc": "",
              "params": [],
              "returns": {
                "type": "XArm7",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.hands.xhand.XHandConfig": {
          "kind": "class",
          "name": "XHandConfig",
          "module": "retargetingkit.targets.hands.xhand",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L77",
          "anchor": "xhandconfig",
          "doc": "<p>XHand controller configuration.</p>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "serial_port",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "protocol",
              "type": "str",
              "default": "'RS485'",
              "required": false,
              "doc": ""
            },
            {
              "name": "baud_rate",
              "type": "int",
              "default": "3000000",
              "required": false,
              "doc": ""
            },
            {
              "name": "dt",
              "type": "float",
              "default": "1.0 / 83",
              "required": false,
              "doc": ""
            },
            {
              "name": "kp",
              "type": "float",
              "default": "90.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "ki",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "kd",
              "type": "float",
              "default": "0.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "tor_max",
              "type": "float",
              "default": "80.0",
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
              "name": "serial_port",
              "signature": "serial_port: str",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L81",
              "doc": "<p>Serial port for RS485 communication.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "protocol",
              "signature": "protocol: str = 'RS485'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L84",
              "doc": "<p>Communication protocol ('RS485' or 'EtherCAT').</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "baud_rate",
              "signature": "baud_rate: int = 3000000",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L87",
              "doc": "<p>Baud rate for RS485 serial.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "dt",
              "signature": "dt: float = 1.0 / 83",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L90",
              "doc": "<p>Servo loop timestep (matches 83 Hz firmware rate).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kp",
              "signature": "kp: float = 90.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L93",
              "doc": "<p>Default position-loop proportional gain.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "ki",
              "signature": "ki: float = 0.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L96",
              "doc": "<p>Default position-loop integral gain.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kd",
              "signature": "kd: float = 0.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L99",
              "doc": "<p>Default position-loop derivative gain.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "tor_max",
              "signature": "tor_max: float = 80.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L102",
              "doc": "<p>Default maximum torque.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> XHand",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/xhand.py#L105",
              "doc": "",
              "params": [],
              "returns": {
                "type": "XHand",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.hands.sharpa_hand.SharpaHandConfig": {
          "kind": "class",
          "name": "SharpaHandConfig",
          "module": "retargetingkit.targets.hands.sharpa_hand",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/sharpa_hand.py#L274",
          "anchor": "sharpahandconfig",
          "doc": "<p>Sharpa Wave connection settings.</p>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "speed_coeff",
              "type": "float",
              "default": "0.3",
              "required": false,
              "doc": ""
            },
            {
              "name": "current_coeff",
              "type": "float",
              "default": "0.3",
              "required": false,
              "doc": ""
            },
            {
              "name": "device_sn",
              "type": "str | None",
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
              "name": "speed_coeff",
              "signature": "speed_coeff: float = 0.3",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/sharpa_hand.py#L278",
              "doc": "<p>Joint speed coefficient (0-1).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "current_coeff",
              "signature": "current_coeff: float = 0.3",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/sharpa_hand.py#L280",
              "doc": "<p>Joint current coefficient (0-1).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "device_sn",
              "signature": "device_sn: str | None = None",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/sharpa_hand.py#L282",
              "doc": "<p>Serial number; the first discovered hand is used when unset.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> SharpaHand",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/sharpa_hand.py#L285",
              "doc": "",
              "params": [],
              "returns": {
                "type": "SharpaHand",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.hands.ability_hand.AbilityHandConfig": {
          "kind": "class",
          "name": "AbilityHandConfig",
          "module": "retargetingkit.targets.hands.ability_hand",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/ability_hand.py#L29",
          "anchor": "abilityhandconfig",
          "doc": "<p>Ability Hand controller configuration.</p>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "port",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "dt",
              "type": "float",
              "default": "1.0 / 160",
              "required": false,
              "doc": ""
            },
            {
              "name": "mode",
              "type": "ControlMode",
              "default": "ControlMode.POS_RAMP",
              "required": false,
              "doc": ""
            },
            {
              "name": "ramp_deg_per_s",
              "type": "float",
              "default": "60.0",
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
              "name": "port",
              "signature": "port: str",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/ability_hand.py#L33",
              "doc": "<p>Serial port path (e.g. /dev/serial/by-id/...).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "dt",
              "signature": "dt: float = 1.0 / 160",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/ability_hand.py#L35",
              "doc": "<p>Servo loop timestep in seconds.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mode",
              "signature": "mode: ControlMode = ControlMode.POS_RAMP",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/ability_hand.py#L37",
              "doc": "<p>Control mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "ramp_deg_per_s",
              "signature": "ramp_deg_per_s: float = 60.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/ability_hand.py#L39",
              "doc": "<p>Position ramp rate to avoid firmware current-limiting stalls.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> AbilityHand",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/ability_hand.py#L42",
              "doc": "",
              "params": [],
              "returns": {
                "type": "AbilityHand",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.hands.inspire.InspireHandConfig": {
          "kind": "class",
          "name": "InspireHandConfig",
          "module": "retargetingkit.targets.hands.inspire",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/inspire.py#L61",
          "anchor": "inspirehandconfig",
          "doc": "<p>Inspire Hand serial settings.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; InspireHandConfig(\"/dev/ttyUSB0\", 1, 115200).serial_port\n'/dev/ttyUSB0'</pre><pre data-code-full hidden>from retargetingkit.targets.hands.inspire import InspireHandConfig\n\nInspireHandConfig(\"/dev/ttyUSB0\", 1, 115200).serial_port</pre></div>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "serial_port",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "hand_id",
              "type": "int",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "baudrate",
              "type": "int",
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
              "name": "serial_port",
              "signature": "serial_port: str",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/inspire.py#L69",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand_id",
              "signature": "hand_id: int",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/inspire.py#L70",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "baudrate",
              "signature": "baudrate: int",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/inspire.py#L71",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> InspireHand",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/hands/inspire.py#L73",
              "doc": "<p>Connect and return an Inspire Hand target.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; InspireHandConfig(\"/dev/ttyUSB0\", 1, 115200).build()  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.targets.hands.inspire import InspireHandConfig\n\nInspireHandConfig(\"/dev/ttyUSB0\", 1, 115200).build()  # doctest: +SKIP</pre></div>",
              "params": [],
              "returns": {
                "type": "InspireHand",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.humanoids.sonic.SonicTargetConfig": {
          "kind": "class",
          "name": "SonicTargetConfig",
          "module": "retargetingkit.targets.humanoids.sonic",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/sonic.py#L317",
          "anchor": "sonictargetconfig",
          "doc": "<p>SONIC v1 publisher settings.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; SonicTargetConfig().port\n5556</pre><pre data-code-full hidden>from retargetingkit.targets.humanoids.sonic import SonicTargetConfig\n\nSonicTargetConfig().port</pre></div>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "host",
              "type": "str",
              "default": "'*'",
              "required": false,
              "doc": ""
            },
            {
              "name": "port",
              "type": "int",
              "default": "5556",
              "required": false,
              "doc": ""
            },
            {
              "name": "lookahead",
              "type": "int",
              "default": "50",
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
              "name": "host",
              "signature": "host: str = '*'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/sonic.py#L325",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "port",
              "signature": "port: int = 5556",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/sonic.py#L326",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "lookahead",
              "signature": "lookahead: int = 50",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/sonic.py#L327",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> SonicTarget",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/sonic.py#L329",
              "doc": "<p>Bind and return a SONIC target.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; SonicTargetConfig(port=15556).build()  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.targets.humanoids.sonic import SonicTargetConfig\n\nSonicTargetConfig(port=15556).build()  # doctest: +SKIP</pre></div>",
              "params": [],
              "returns": {
                "type": "SonicTarget",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.humanoids.rby1.RBY1AConfig": {
          "kind": "class",
          "name": "RBY1AConfig",
          "module": "retargetingkit.targets.humanoids.rby1",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L36",
          "anchor": "rby1aconfig",
          "doc": "<p>RBY1-A right-arm controller configuration.</p>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "ip",
              "type": "str",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "mode",
              "type": "RBY1AMode",
              "default": "RBY1AMode.VELOCITY",
              "required": false,
              "doc": ""
            },
            {
              "name": "dt",
              "type": "float",
              "default": "1.0 / 100",
              "required": false,
              "doc": ""
            },
            {
              "name": "ee_link",
              "type": "str",
              "default": "'link_right_arm_6'",
              "required": false,
              "doc": ""
            },
            {
              "name": "cutoff_frequency",
              "type": "float",
              "default": "5.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "kp",
              "type": "np.ndarray",
              "default": "(lambda: np.array([10.0, 10.0, 5.0, 5.0, 5.0, 5.0, 5.0]))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "kd",
              "type": "np.ndarray",
              "default": "(lambda: np.array([0.5, 0.5, 0.25, 0.25, 0.25, 0.25, 0.25]))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "max_velocity",
              "type": "np.ndarray",
              "default": "(lambda: np.array([0.8, 0.8, 0.8, 0.8, 1.0, 1.0, 3.0]))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "home_qpos",
              "type": "np.ndarray",
              "default": "(lambda: np.array([0, 0, 0, -np.pi / 2, -np.pi / 2, 0, 0]))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "head_max_velocity",
              "type": "np.ndarray",
              "default": "(lambda: np.array([1.0, 1.0]))()",
              "required": false,
              "doc": ""
            },
            {
              "name": "head_home_qpos",
              "type": "np.ndarray",
              "default": "(lambda: np.zeros(NUM_HEAD_JOINTS))()",
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
              "name": "ip",
              "signature": "ip: str",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L40",
              "doc": "<p>IP address with port (e.g. <code>192.168.30.1:50051</code>).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mode",
              "signature": "mode: RBY1AMode = RBY1AMode.VELOCITY",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L42",
              "doc": "<p>Control mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "dt",
              "signature": "dt: float = 1.0 / 100",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L44",
              "doc": "<p>Servo loop timestep in seconds.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "ee_link",
              "signature": "ee_link: str = 'link_right_arm_6'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L46",
              "doc": "<p>End effector link name for IK.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "cutoff_frequency",
              "signature": "cutoff_frequency: float = 5.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L48",
              "doc": "<p>SDK-side position command smoothing frequency (Hz).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kp",
              "signature": "kp: np.ndarray = field(default_factory=lambda: np.array([10.0, 10.0, 5.0, 5.0, 5.0, 5.0, 5.0]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L50",
              "doc": "<p>Proportional gains for velocity mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "kd",
              "signature": "kd: np.ndarray = field(default_factory=lambda: np.array([0.5, 0.5, 0.25, 0.25, 0.25, 0.25, 0.25]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L52",
              "doc": "<p>Derivative gains for velocity mode.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "max_velocity",
              "signature": "max_velocity: np.ndarray = field(default_factory=lambda: np.array([0.8, 0.8, 0.8, 0.8, 1.0, 1.0, 3.0]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L54",
              "doc": "<p>Maximum joint velocities (rad/s), used by both SERVO and VELOCITY modes.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "home_qpos",
              "signature": "home_qpos: np.ndarray = field(default_factory=lambda: np.array([0, 0, 0, -np.pi / 2, -np.pi / 2, 0, 0]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L56",
              "doc": "<p>Target joint positions for the home configuration (rad).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "head_max_velocity",
              "signature": "head_max_velocity: np.ndarray = field(default_factory=lambda: np.array([1.0, 1.0]))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L58",
              "doc": "<p>Maximum head joint velocities (rad/s).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "head_home_qpos",
              "signature": "head_home_qpos: np.ndarray = field(default_factory=lambda: np.zeros(NUM_HEAD_JOINTS))",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L60",
              "doc": "<p>Target head joint positions for the home configuration (rad).</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> RBY1A",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/rby1.py#L63",
              "doc": "<p>Connect to the robot and start its servo loop.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; RBY1AConfig(\"192.168.30.1:50051\").build()  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.targets.humanoids.rby1 import RBY1AConfig\n\nRBY1AConfig(\"192.168.30.1:50051\").build()  # doctest: +SKIP</pre></div>",
              "params": [],
              "returns": {
                "type": "RBY1A",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.humanoids.dexmate.DexmateConfig": {
          "kind": "class",
          "name": "DexmateConfig",
          "module": "retargetingkit.targets.humanoids.dexmate",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/dexmate.py#L21",
          "anchor": "dexmateconfig",
          "doc": "<p>Dexmate Vega-1 whole-body controller configuration.</p>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "auto_shutdown",
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
              "name": "auto_shutdown",
              "signature": "auto_shutdown: bool = True",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/dexmate.py#L25",
              "doc": "<p>Register the SDK's atexit shutdown hook. Disable when the caller owns shutdown via <code>close</code>.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> Dexmate",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/humanoids/dexmate.py#L28",
              "doc": "<p>Connect to the robot.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; DexmateConfig().build()  # doctest: +SKIP</pre><pre data-code-full hidden>from retargetingkit.targets.humanoids.dexmate import DexmateConfig\n\nDexmateConfig().build()  # doctest: +SKIP</pre></div>",
              "params": [],
              "returns": {
                "type": "Dexmate",
                "doc": ""
              }
            }
          ]
        },
        "retargetingkit.targets.viser.ViserConfig": {
          "kind": "class",
          "name": "ViserConfig",
          "module": "retargetingkit.targets.viser",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/viser.py#L34",
          "anchor": "viserconfig",
          "doc": "<p>URDFs to display, in the order callers index them.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; ViserConfig((Path(\"robot.urdf\"),)).urdfs[0].name\n'robot.urdf'</pre><pre data-code-full hidden>from pathlib import Path\nfrom retargetingkit.targets.viser import ViserConfig\n\nViserConfig((Path(\"robot.urdf\"),)).urdfs[0].name</pre></div>",
          "bases": "TargetConfig",
          "params": [
            {
              "name": "urdfs",
              "type": "tuple[Path, ...]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "keypoint_edges",
              "type": "tuple[tuple[int, int], ...]",
              "default": "()",
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
              "name": "urdfs",
              "signature": "urdfs: tuple[Path, ...]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/viser.py#L42",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "keypoint_edges",
              "signature": "keypoint_edges: tuple[tuple[int, int], ...] = ()",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/viser.py#L43",
              "doc": "",
              "params": [],
              "returns": null
            },
            {
              "kind": "method",
              "base": "",
              "name": "build",
              "signature": "build() -> Viser",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/targets/viser.py#L45",
              "doc": "<p>Start the Viser server.</p><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">python</span><span class=\"code-actions\"><button type=\"button\" class=\"code-toggle\" data-code-toggle aria-expanded=\"false\" aria-label=\"Show full code\">Full</button><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"[data-code-full]\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>&gt;&gt;&gt; ViserConfig((Path(\"robot.urdf\"),)).build()  # doctest: +SKIP</pre><pre data-code-full hidden>from pathlib import Path\nfrom retargetingkit.targets.viser import ViserConfig\n\nViserConfig((Path(\"robot.urdf\"),)).build()  # doctest: +SKIP</pre></div>",
              "params": [],
              "returns": {
                "type": "Viser",
                "doc": ""
              }
            }
          ]
        }
      }
    },
    {
      "id": "ref-teleop",
      "nav": "Teleop configs",
      "h": "Teleop configs",
      "body": "<p>Each named rig run by <code>scripts/teleop/</code> is an instance of one of these configs. See <a class=\"inline\" href=\"/docs/retargetingkit/teleoperation/\">Teleoperation</a> for rig names and overrides.</p><div data-api=\"retargetingkit.configs.teleop.config.HandTeleopConfig\"></div><div data-api=\"retargetingkit.configs.teleop.config.ArmTeleopConfig\"></div><div data-api=\"retargetingkit.configs.teleop.config.ArmHandTeleopConfig\"></div><div data-api=\"retargetingkit.configs.teleop.config.HumanoidTeleopConfig\"></div><div data-api=\"retargetingkit.configs.teleop.config.HumanoidHandTeleopConfig\"></div>",
      "sub": "API",
      "api": {
        "retargetingkit.configs.teleop.config.HandTeleopConfig": {
          "kind": "class",
          "name": "HandTeleopConfig",
          "module": "retargetingkit.configs.teleop.config",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L17",
          "anchor": "handteleopconfig",
          "doc": "<p>One hand source retargeted to one robot hand.</p>",
          "params": [
            {
              "name": "source",
              "type": "SourceConfig[HandFrame]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "target",
              "type": "TargetConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "retargeter",
              "type": "RetargeterConfig[HandFrame, QPosCommand]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "side",
              "type": "Side",
              "default": "'right'",
              "required": false,
              "doc": ""
            },
            {
              "name": "rate",
              "type": "float",
              "default": "30.0",
              "required": false,
              "doc": ""
            },
            {
              "name": "mode",
              "type": "Literal['viser', 'real', 'both']",
              "default": "'viser'",
              "required": false,
              "doc": ""
            },
            {
              "name": "device",
              "type": "str",
              "default": "'cuda:0'",
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
              "name": "source",
              "signature": "source: SourceConfig[HandFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L21",
              "doc": "<p>Hand motion source blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "target",
              "signature": "target: TargetConfig",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L23",
              "doc": "<p>Robot hand blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "retargeter",
              "signature": "retargeter: RetargeterConfig[HandFrame, QPosCommand]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L25",
              "doc": "<p>Optimization or neural hand retargeting blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "side",
              "signature": "side: Side = 'right'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L27",
              "doc": "<p>Hand side shared by the source and retargeter.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "rate",
              "signature": "rate: float = 30.0",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L29",
              "doc": "<p>Control-loop frequency in Hz.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mode",
              "signature": "mode: Literal['viser', 'real', 'both'] = 'viser'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L31",
              "doc": "<p>Viser only, hardware only, or both.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "device",
              "signature": "device: str = 'cuda:0'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L33",
              "doc": "<p>Warp device used by RoboKit.</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.configs.teleop.config.ArmTeleopConfig": {
          "kind": "class",
          "name": "ArmTeleopConfig",
          "module": "retargetingkit.configs.teleop.config",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L37",
          "anchor": "armteleopconfig",
          "doc": "<p>One arm source controlling one robot arm per side.</p>",
          "params": [
            {
              "name": "source",
              "type": "SourceConfig[ArmFrame]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "arms",
              "type": "dict[Side, TargetConfig]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "retargeters",
              "type": "dict[Side, ArmRetargeterConfig]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "mode",
              "type": "Literal['viser', 'real', 'both']",
              "default": "'viser'",
              "required": false,
              "doc": ""
            },
            {
              "name": "device",
              "type": "str",
              "default": "'cuda:0'",
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
              "name": "source",
              "signature": "source: SourceConfig[ArmFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L41",
              "doc": "<p>Wrist motion source blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "arms",
              "signature": "arms: dict[Side, TargetConfig]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L43",
              "doc": "<p>Robot arm blueprint per side.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "retargeters",
              "signature": "retargeters: dict[Side, ArmRetargeterConfig]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L45",
              "doc": "<p>Wrist-to-arm retargeting blueprint per side.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mode",
              "signature": "mode: Literal['viser', 'real', 'both'] = 'viser'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L47",
              "doc": "<p>Viser only, hardware only, or both.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "device",
              "signature": "device: str = 'cuda:0'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L49",
              "doc": "<p>Warp device used by RoboKit.</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.configs.teleop.config.ArmHandTeleopConfig": {
          "kind": "class",
          "name": "ArmHandTeleopConfig",
          "module": "retargetingkit.configs.teleop.config",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L53",
          "anchor": "armhandteleopconfig",
          "doc": "<p>One arm-and-hand source controlling one robot arm and one robot hand per side.</p>",
          "params": [
            {
              "name": "source",
              "type": "SourceConfig[ArmHandFrame]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "arms",
              "type": "dict[Side, TargetConfig]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "hands",
              "type": "dict[Side, TargetConfig]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "arm_retargeters",
              "type": "dict[Side, ArmRetargeterConfig]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "hand_retargeters",
              "type": "dict[Side, RetargeterConfig[HandFrame, QPosCommand]]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "assembly_urdf",
              "type": "Path",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "mode",
              "type": "Literal['viser', 'real', 'both']",
              "default": "'viser'",
              "required": false,
              "doc": ""
            },
            {
              "name": "device",
              "type": "str",
              "default": "'cuda:0'",
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
              "name": "source",
              "signature": "source: SourceConfig[ArmHandFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L57",
              "doc": "<p>Wrist and hand motion source blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "arms",
              "signature": "arms: dict[Side, TargetConfig]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L59",
              "doc": "<p>Robot arm blueprint per side.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hands",
              "signature": "hands: dict[Side, TargetConfig]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L61",
              "doc": "<p>Robot hand blueprint per side.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "arm_retargeters",
              "signature": "arm_retargeters: dict[Side, ArmRetargeterConfig]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L63",
              "doc": "<p>Wrist-to-arm retargeting blueprint per side.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "hand_retargeters",
              "signature": "hand_retargeters: dict[Side, RetargeterConfig[HandFrame, QPosCommand]]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L65",
              "doc": "<p>Hand retargeting blueprint per side.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "assembly_urdf",
              "signature": "assembly_urdf: Path",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L67",
              "doc": "<p>Combined arm-and-hand URDF used only for visualization.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "mode",
              "signature": "mode: Literal['viser', 'real', 'both'] = 'viser'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L69",
              "doc": "<p>Viser only, hardware only, or both.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "device",
              "signature": "device: str = 'cuda:0'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L71",
              "doc": "<p>Warp device used by RoboKit.</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.configs.teleop.config.HumanoidTeleopConfig": {
          "kind": "class",
          "name": "HumanoidTeleopConfig",
          "module": "retargetingkit.configs.teleop.config",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L75",
          "anchor": "humanoidteleopconfig",
          "doc": "<p>One body source retargeted to one or more humanoid targets.</p>",
          "params": [
            {
              "name": "source",
              "type": "SourceConfig[BodyFrame]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "retargeter",
              "type": "HumanoidRetargeterConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "targets",
              "type": "tuple[TargetConfig, ...]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "device",
              "type": "str",
              "default": "'cuda:0'",
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
              "name": "source",
              "signature": "source: SourceConfig[BodyFrame]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L79",
              "doc": "<p>Body motion source blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "retargeter",
              "signature": "retargeter: HumanoidRetargeterConfig",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L81",
              "doc": "<p>Body-to-humanoid retargeting blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "targets",
              "signature": "targets: tuple[TargetConfig, ...]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L83",
              "doc": "<p>Humanoid target blueprints fed the same command.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "device",
              "signature": "device: str = 'cuda:0'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L85",
              "doc": "<p>Warp device used by RoboKit.</p>",
              "params": [],
              "returns": null
            }
          ]
        },
        "retargetingkit.configs.teleop.config.HumanoidHandTeleopConfig": {
          "kind": "class",
          "name": "HumanoidHandTeleopConfig",
          "module": "retargetingkit.configs.teleop.config",
          "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L89",
          "anchor": "humanoidhandteleopconfig",
          "doc": "<p>One PICO connection controlling a humanoid and two robot hands.</p>",
          "params": [
            {
              "name": "source",
              "type": "PicoSourceConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "retargeter",
              "type": "HumanoidRetargeterConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "targets",
              "type": "tuple[TargetConfig, ...]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "left_hand",
              "type": "TargetConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "right_hand",
              "type": "TargetConfig",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "open_qpos",
              "type": "tuple[float, ...]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "closed_qpos",
              "type": "tuple[float, ...]",
              "default": null,
              "required": true,
              "doc": ""
            },
            {
              "name": "device",
              "type": "str",
              "default": "'cuda:0'",
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
              "name": "source",
              "signature": "source: PicoSourceConfig",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L93",
              "doc": "<p>PICO body and controller source blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "retargeter",
              "signature": "retargeter: HumanoidRetargeterConfig",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L95",
              "doc": "<p>Body-to-humanoid retargeting blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "targets",
              "signature": "targets: tuple[TargetConfig, ...]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L97",
              "doc": "<p>Humanoid target blueprints fed the same command.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "left_hand",
              "signature": "left_hand: TargetConfig",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L99",
              "doc": "<p>Left robot hand blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "right_hand",
              "signature": "right_hand: TargetConfig",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L101",
              "doc": "<p>Right robot hand blueprint.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "open_qpos",
              "signature": "open_qpos: tuple[float, ...]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L103",
              "doc": "<p>Hand joint positions commanded when the trigger is released.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "closed_qpos",
              "signature": "closed_qpos: tuple[float, ...]",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L105",
              "doc": "<p>Hand joint positions commanded when the trigger is pressed.</p>",
              "params": [],
              "returns": null
            },
            {
              "kind": "attribute",
              "base": "",
              "name": "device",
              "signature": "device: str = 'cuda:0'",
              "source": "https://github.com/openrobokit/retargetingkit/blob/main/src/retargetingkit/configs/teleop/config.py#L107",
              "doc": "<p>Warp device used by RoboKit.</p>",
              "params": [],
              "returns": null
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
      "id": "development",
      "nav": "Development",
      "h": "Development",
      "body": "<p>Keep device conversion, retargeting, and robot transport in their respective layers. Named rig presets connect supported components without putting device-specific dispatch in a runtime.</p><h3>Repository map</h3><table class=\"doc-table\" style=\"--cols:3\"><thead><tr><th>Layer</th><th>Location</th><th>Responsibility</th></tr></thead><tbody><tr><td>Sources</td><td><code>src/retargetingkit/sources/</code></td><td>Native data to canonical frames</td></tr><tr><td>Retargeters</td><td><code>src/retargetingkit/retargeting/</code></td><td>Frames to robot commands</td></tr><tr><td>Targets</td><td><code>src/retargetingkit/targets/</code></td><td>Hardware, transport, or visualization</td></tr><tr><td>Presets</td><td><code>src/retargetingkit/configs/teleop/</code></td><td>Source, solver, target, and connection settings</td></tr><tr><td>Runtimes</td><td><code>scripts/teleop/</code></td><td>Component lifecycle and control loop</td></tr></tbody></table><h3>Validate changes</h3><div class=\"doc__code\" data-copy-scope><div class=\"bar\"><span style=\"color:var(--fg-dim)\">shell</span><span class=\"code-actions\"><button type=\"button\" class=\"copy copy--swap\" data-copy-from=\"pre\" title=\"Copy\"><span class=\"t\"></span><span class=\"o\"></span></button></span></div><pre>uv sync --extra vis --group dev\nmake ci</pre></div><p>Add the hardware extras required by your work. During development, run <code>make format</code>, <code>make lint</code>, <code>make check</code>, or <code>make test</code> for the relevant check.</p><p>Every Python example in these docs runs in <code>tests/test_docs.py</code>; device pages run against autospecced devices.</p><p>Public functions should have doctests. Group pytest cases by feature and use <code>torch.testing.assert_close</code> for numerical comparisons.</p><h3>Add a component</h3><p>Give a source an isolated stream check, a target a connection check with its hardware behavior stated, and a retargeter a runnable example. Add a named rig once the complete composition is supported.</p><p>Keep device guides focused on setup, a stream or connection check, and a working entrypoint. Validate example paths and command flags against the implementation.</p>"
    }
  ]
},
// END GENERATED retargetingkit DOCS
    ]
};
