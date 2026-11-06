// Per-project content. Keys: robokit, retargetingkit, graspkit, roboskills.
// robokit is the core library; retargetingkit and graspkit are built on top of it.

// Blue and coral come from the gear files; graspkit uses a low-chroma sage.
// accentLite supports the robokit benchmark bars while the other project pages
// retain their own ground and per-kit controls.
window.RK_THEMES = {
  robokit:        { accent: '#00629B', accentLite: '#2E8DBF', band: '#FAFAF8', rgb: '250,250,248', tintSoft: '#E3EFFD' },
  // Ice: the kit's colourway moved from rust to a cool UCSD blue. The ground is
  // a pale ice the white cards and the neutral hero render both sit on cleanly,
  // and the accent is a teal-blue that clears 4.5:1 both ways — 5.3:1 as text on
  // the band, 5.9:1 for white on it, so the kicker and the CTA are both legible.
  // The badge takes white rather than the default UCSD gold: on this band the
  // gold reads as a leftover from the warm palette.
  // The last four are the neutrals the shared legacy colourway would otherwise
  // fill in with its sand defaults, which graspkit still uses.
  retargetingkit: { accent: '#026C8F', accentLite: '#3E9BBC', band: '#EAF3F7', rgb: '234,243,247', tintSoft: '#F4F9FB',
                    chipFg: '#FFFFFF',
                    hoverBg: '#D3E6EA', barBg: '#F1F7F8', labelMuted: '#56647A', codeComment: '#64717F' },
  // graspkit reads academic rather than macaron: what makes a pastel look like
  // candy is chroma, not lightness, so the band stays a low-chroma sage (S15,
  // against the S44 mint it replaced) while sitting bright at L91. The accent is
  // a forest green lifted as far as the kicker allows — any lighter and accent
  // text on the band drops under 4.5:1 (it is 4.85 here; white on it is 5.9).
  // The badge gold is brass rather than macaron for the same chroma reason;
  // slash reuses it, and since any gold on a light band is ~1.3:1 it carries the
  // brand mark's hard offset shadow to give the glyph an edge.
  // The clip and first-frame poster carry this band baked in behind them.
  // Changing `band` means re-encoding both.
  graspkit:       { accent: '#3F6E59', band: '#E7EBE4', rgb: '231,235,228', tintSoft: '#F4F6F1', pop: '#3F6E59',
                    // badge and CTA trade places, which forces their text colours to
                    // swap: ink on the deep-green badge is 1.9:1 and white on the
                    // brass CTA is 1.6:1, so the badge takes cream and the CTA ink
                    chipBg: '#2C4A3B', chipFg: '#ffe9b3',
                    ctaBg: '#E8C766', ctaFg: '#1c1207',
                    slash: '#E8C766', slashShadow: '3px 3px 0 rgba(21,19,17,.38)',
                    // The studio background matches the band. Place the robot beside
                    // the pitch column, with the edge mask on empty background.
                    videoFit: 'translate(12%, -6%) scale(0.74)',
                    // centres the scene when portrait crops the clip to its column
                    portraitPos: '50% 50%' },
  // RoboSkills keeps its own indigo from the standalone RoboSkills site.
  roboskills:     { accent: '#4C4FA6', band: '#EEEEF8', rgb: '238,238,248', tintSoft: '#F5F5FB',
                    chipFg: '#FFFFFF',
                    hoverBg: '#E0E0F0', barBg: '#F4F4FA', labelMuted: '#585D78', codeComment: '#676B83' },
};

// Default hero clip per kit; a kit with RK_HERO_REELS below uses that sequence
// instead. RoboKit keeps camera/robots at 1×; motion planning has 4s of action plus transitions.
window.RK_VIDEOS = {
  robokit: '/assets/videos/robokit/hero-composite.mp4?v=20261015-plan4s-1x',
  retargetingkit: '/assets/videos/retargetingkit/hero/hand-ketchup.mp4?v=1788246678335',
  graspkit: '/assets/videos/graspkit/hero-place.mp4?v=20261017-restored-blue',
};

// Tracked stills remain visible when local draft videos are unavailable.
window.RK_STILLS = {
  retargetingkit: '/assets/images/retargetingkit/hero/hand-ketchup.webp?v=1788246678335',
  graspkit: '/assets/images/graspkit/hero.webp?v=20261017-restored-blue',
};

// RetargetingKit plays each interaction once, then crossfades to the next. The
// three hand close-ups share one framing; the full-body scenes pull back a
// little so their furniture stays inside the same right-hand hero stage.
window.RK_HERO_REELS = {
  retargetingkit: [
    { src: '/assets/videos/retargetingkit/hero/hand-ketchup.mp4?v=1788246678335', poster: '/assets/images/retargetingkit/hero/hand-ketchup.webp?v=1788246678335', fit: 'translate(16%, -5%) scale(0.78)', portraitPosition: '50% 50%' },
    { src: '/assets/videos/retargetingkit/hero/full-body-cutting.mp4?v=1788246678335', poster: '/assets/images/retargetingkit/hero/full-body-cutting.webp?v=1788246678335', fit: 'translate(23%, -2%) scale(0.65)', portraitPosition: '50% 50%' },
    { src: '/assets/videos/retargetingkit/hero/hand-mixer.mp4?v=1788246678335', poster: '/assets/images/retargetingkit/hero/hand-mixer.webp?v=1788246678335', fit: 'translate(26%, 5%) scale(0.78)', portraitPosition: '50% 50%' },
  ],
};

const C = (text) => ({ text, comment: true });
const L = (text) => ({ text });

// The original footage shares one cache version. Independently rendered
// embodiment cuts below carry their own version stamps.
const RKV = '?v=1788938453028';
const rv = (p) => `/assets/videos/retargetingkit/${p}.mp4${RKV}`;
const rp = (p) => `/assets/images/retargetingkit/${p}.webp${RKV}`;
// A clip and its poster, which is all most cards need.
const rk = (p, label, extra) => Object.assign({ label, src: rv(p), poster: rp(p) }, extra || {});
const rangeClip = (p, label, version = '20260908-range2') => ({
  label,
  src: `/assets/videos/retargetingkit/motion-range/${p}.mp4?v=${version}`,
  poster: `/assets/images/retargetingkit/motion-range/${p}.webp?v=${version}`,
  thumb: `/assets/images/retargetingkit/motion-range/${p}-thumb.webp?v=${version}`,
});

// RoboSkills media helpers, carried over from the standalone RoboSkills site.
const SKV = '?v=20261030-r2s-bars';
const sk = (p, label, note) => ({
  label, note, src: `/assets/videos/roboskills/${p}.mp4${SKV}`, poster: `/assets/images/roboskills/${p}.webp${SKV}`,
});
const SHV = '?v=20261030-g1-grey';
const sh = (p, label, note) => ({
  label, note, run: p, src: `/assets/videos/showcase/${p}.mp4${SHV}`, poster: `/assets/images/showcase/${p}.webp${SHV}`,
});
const SKT = '?v=20261029-cover';
const skTeaser = (p, still) => ({
  seamless: true, src: `/assets/videos/roboskills/teaser/${p}.mp4${SKT}`, poster: `/assets/images/roboskills/teaser/${p}.webp${SKT}`,
  input: { src: still ? '' : `/assets/videos/roboskills/teaser/${p}-input.mp4${SKT}`, poster: `/assets/images/roboskills/teaser/${p}-input.webp${SKT}` },
});
const skRun = (run, label, from, more) => ({
  label, from, seamless: true, run: `agent-as-policy/${run}`,
  src: `/assets/videos/roboskills/teaser/agent-as-policy/${run}.mp4${SKT}`, poster: `/assets/images/roboskills/teaser/agent-as-policy/${run}.webp${SKT}`,
  ...more,
});
const arStage = (p, label, result, note) => ({
  label, result, note, src: `/assets/videos/showcase/auto-research/${p}.mp4?v=20261029-stages-2`, poster: `/assets/images/showcase/auto-research/${p}.webp?v=20261029-stages-2`,
});
const arStages = (o) => Object.assign({ src: o.stages[0].src, poster: o.stages[0].poster }, o);
const skStage = (o) => Object.assign({ type: 'stage', picker: 'tabs', src: o.variants[0].src, poster: o.variants[0].poster }, o);

window.RK_PROJECTS = {
  robokit: {
    crumb: 'robokit', titleA: 'robo', titleB: 'kit',
    heroVideoMobile: '/assets/videos/robokit/hero-composite-mobile.mp4?v=20261015-plan4s-1x',
    lede: "It's just fast, and batched.",
    chip: 'Core library', install: 'uv add robokit',
    showDetails: false,
    highlights: [
      { k: 'Batched', v: 'Thousands of seeds solved in one call.' },
      { k: 'Differentiable', v: 'Gradients flow through kinematics.' },
      { k: 'One runtime', v: 'Warp kernels, PyTorch tensors, CUDA.' },
    ],
    meta: [{ k: 'version', v: '0.1.0' }, { k: 'license', v: 'MIT' }, { k: 'python', v: '3.8+' }, { k: 'backend', v: 'warp · pytorch' }],
    endH: 'Read the docs, then build on it.',
    // The six tasks and their order follow robokit 1.0.0's docs overview grid
    // (docs/guide/overview.md): two RL policies, then four MPC motions.
    mpc: {
      h: 'Optimization/Learning with Simulation.',
      note: 'Simulated in MuJoCo Warp.',
      rows: [
        [
          { name: 'NIST assembly', tag: 'RL', ar: 1.54, video: '/assets/videos/robokit/mpc/nist.mp4?v=20261106', still: '/assets/images/robokit/mpc/nist.webp?v=20261106' },
          { name: 'Rough terrain', tag: 'RL', ar: 1.54, video: '/assets/videos/robokit/mpc/go1-rough.mp4?v=20261106', still: '/assets/images/robokit/mpc/go1-rough.webp?v=20261106' },
          { name: 'Pen spinning', tag: 'MPC', ar: 1.54, video: '/assets/videos/robokit/mpc/pen.mp4?v=20261030', still: '/assets/images/robokit/mpc/pen.webp?v=20261030' },
        ],
        [
          { name: 'Notebook opening', tag: 'MPC', ar: 1.54, video: '/assets/videos/robokit/mpc/notebook.mp4?v=20261030', still: '/assets/images/robokit/mpc/notebook.webp?v=20261030' },
          { name: 'Box carrying', tag: 'MPC', ar: 1.54, video: '/assets/videos/robokit/mpc/g1_box.mp4?v=20261030', still: '/assets/images/robokit/mpc/g1_box.webp?v=20261030' },
          { name: 'Climbing', tag: 'MPC', ar: 1.54, video: '/assets/videos/robokit/mpc/g1_climb.mp4?v=20261030', still: '/assets/images/robokit/mpc/g1_climb.webp?v=20261030' },
        ],
      ],
    },
    bento: {
      h: 'Optimization with Analytic Objectives.',
      cards: [
        { name: 'Inverse kinematics', fit: 'scale(1.05)', video: '/assets/videos/robokit/bento/ik.mp4?v=1787544352', still: '/assets/docs/robokit/assets/built-in-tasks/ik.webp?v=1787544352' },
        { name: 'Motion planning', fit: 'scale(1)', wide: true, video: '/assets/videos/robokit/bento/motion-planning.mp4?v=1787520892164', still: '/assets/images/robokit/bento/motion-planning.webp' },
        { name: 'Calibration', fit: 'scale(1.08)', video: '/assets/videos/robokit/bento/calibration.mp4?v=1787520892164', still: '/assets/docs/robokit/assets/built-in-tasks/hand-eye-calibration.webp' },
        { name: 'Hand retargeting', fit: 'scale(1.05)', video: '/assets/videos/robokit/bento/hand-retargeting.mp4?v=1788766601567', still: '/assets/docs/robokit/assets/built-in-tasks/hand-retargeting.webp?v=1788766601567' },
        { name: 'Humanoid retargeting', fit: 'scale(1.12)', video: '/assets/videos/robokit/bento/humanoid-retargeting.mp4?v=1787523000000', still: '/assets/docs/robokit/assets/built-in-tasks/humanoid-retargeting.webp' },
        { name: 'Grasping optimization', fit: 'scale(1)', wide: true, video: '/assets/videos/robokit/bento/grasping-optimization.mp4?v=1787544352', still: '/assets/images/robokit/bento/grasping-optimization.webp?v=1787544352' },
      ],
    },
    scale: {
      h: 'Thousands of solves in parallel.',
      timing: { hardware: 'RTX 4090', href: '/assets/data/robokit-scale-timing.json' },
      note: 'Median of 20 warm runs · setup excluded.',
      tasks: [
        { label: 'Inverse kinematics', timeUnit: "batch solve", timeDescription: "Franka Panda \u00b7 batched pose goals", timeDetails: "Franka Panda: IK smooth preset, reachable pose goals", unit: 'parallel IK solves', steps: [
          { batch: 1, seconds: 0.000868089, video: '/assets/videos/robokit/scale/ik/b0001.mp4', poster: '/assets/images/robokit/scale/ik/b0001.webp' },
          { batch: 10, seconds: 0.000794024, video: '/assets/videos/robokit/scale/ik/b0010.mp4', poster: '/assets/images/robokit/scale/ik/b0010.webp' },
          { batch: 100, seconds: 0.001049352, video: '/assets/videos/robokit/scale/ik/b0100.mp4', poster: '/assets/images/robokit/scale/ik/b0100.webp' },
          { batch: 1000, seconds: 0.003800343, video: '/assets/videos/robokit/scale/ik/b1000.mp4', poster: '/assets/images/robokit/scale/ik/b1000.webp' },
          { batch: 2000, seconds: 0.007917511, video: '/assets/videos/robokit/scale/ik/b2000.mp4', poster: '/assets/images/robokit/scale/ik/b2000.webp' },
        ] },
        { label: 'Motion planning', timeUnit: "batch solve", timeDescription: "Franka Panda \u00b7 collision-aware 32-step trajectories", timeDetails: "Franka Panda: 32-step collision-aware pose plan, 8 candidates, 50 LM iterations; goal IK and retiming included", unit: 'parallel trajectories', steps: [
          { batch: 1, seconds: 0.025367013, video: '/assets/videos/robokit/scale/motion-planning/b0001.mp4', poster: '/assets/images/robokit/scale/motion-planning/b0001.webp' },
          { batch: 10, seconds: 0.038276891, video: '/assets/videos/robokit/scale/motion-planning/b0010.mp4', poster: '/assets/images/robokit/scale/motion-planning/b0010.webp' },
          { batch: 100, seconds: 0.185215793, video: '/assets/videos/robokit/scale/motion-planning/b0100.mp4', poster: '/assets/images/robokit/scale/motion-planning/b0100.webp' },
          { batch: 1000, seconds: 2.079683487, video: '/assets/videos/robokit/scale/motion-planning/b1000.mp4', poster: '/assets/images/robokit/scale/motion-planning/b1000.webp' },
          { batch: 2000, seconds: 4.181664270, video: '/assets/videos/robokit/scale/motion-planning/b2000.mp4', poster: '/assets/images/robokit/scale/motion-planning/b2000.webp' },
        ] },
        { label: 'Grasp optimization', timeUnit: "batch solve", timeDescription: "Shadow Hand \u00b7 floating-hand optimization; arm planning excluded", timeDetails: "Shadow Hand: Floating-hand mesh grasp, cylinder, 5 contacts, 64 LM iterations, 4 candidates; contact resampling every 8 iterations", unit: 'parallel grasps', steps: [
          { batch: 1, seconds: 0.031209390, video: '/assets/videos/robokit/scale/grasping-optimization/b0001.mp4', poster: '/assets/images/robokit/scale/grasping-optimization/b0001.webp' },
          { batch: 10, seconds: 0.036623476, video: '/assets/videos/robokit/scale/grasping-optimization/b0010.mp4', poster: '/assets/images/robokit/scale/grasping-optimization/b0010.webp' },
          { batch: 100, seconds: 0.062455663, video: '/assets/videos/robokit/scale/grasping-optimization/b0100.mp4', poster: '/assets/images/robokit/scale/grasping-optimization/b0100.webp' },
          { batch: 1000, seconds: 0.384216128, video: '/assets/videos/robokit/scale/grasping-optimization/b1000.mp4', poster: '/assets/images/robokit/scale/grasping-optimization/b1000.webp' },
          { batch: 2000, seconds: 0.738871712, video: '/assets/videos/robokit/scale/grasping-optimization/b2000.mp4', poster: '/assets/images/robokit/scale/grasping-optimization/b2000.webp' },
        ] },
        { label: 'Hand retargeting', timeUnit: "batch / frame", timeDescription: "Shadow Hand \u00b7 one batched frame", timeDetails: "Shadow Hand: 21-point hand stream, 15 vector objectives, 10 LM iterations", unit: 'parallel hands', steps: [
          { batch: 1, seconds: 0.001003169, video: '/assets/videos/robokit/scale/hand-retargeting/b0001.mp4', poster: '/assets/images/robokit/scale/hand-retargeting/b0001.webp' },
          { batch: 10, seconds: 0.001017492, video: '/assets/videos/robokit/scale/hand-retargeting/b0010.mp4', poster: '/assets/images/robokit/scale/hand-retargeting/b0010.webp' },
          { batch: 100, seconds: 0.001028490, video: '/assets/videos/robokit/scale/hand-retargeting/b0100.mp4', poster: '/assets/images/robokit/scale/hand-retargeting/b0100.webp' },
          { batch: 1000, seconds: 0.002387351, video: '/assets/videos/robokit/scale/hand-retargeting/b1000.mp4', poster: '/assets/images/robokit/scale/hand-retargeting/b1000.webp' },
          { batch: 2000, seconds: 0.004085780, video: '/assets/videos/robokit/scale/hand-retargeting/b2000.mp4', poster: '/assets/images/robokit/scale/hand-retargeting/b2000.webp' },
        ] },
        { label: 'Humanoid retargeting', timeUnit: "batch / frame", timeDescription: "Unitree G1 \u00b7 one batched frame", timeDetails: "Unitree G1: 29 DOF, 14 pose targets, 9 LM iterations, 4 to 1 candidates; generated feasible motion", unit: 'parallel humanoids', steps: [
          { batch: 1, seconds: 0.001764649, video: '/assets/videos/robokit/scale/humanoid-retargeting/b0001.mp4?v=20261027-bachata-grounded', poster: '/assets/images/robokit/scale/humanoid-retargeting/b0001.webp?v=20261027-bachata-grounded' },
          { batch: 10, seconds: 0.001890928, video: '/assets/videos/robokit/scale/humanoid-retargeting/b0010.mp4?v=20261027-bachata-grounded', poster: '/assets/images/robokit/scale/humanoid-retargeting/b0010.webp?v=20261027-bachata-grounded' },
          { batch: 100, seconds: 0.002528620, video: '/assets/videos/robokit/scale/humanoid-retargeting/b0100.mp4?v=20261027-bachata-grounded', poster: '/assets/images/robokit/scale/humanoid-retargeting/b0100.webp?v=20261027-bachata-grounded' },
          { batch: 1000, seconds: 0.012364916, video: '/assets/videos/robokit/scale/humanoid-retargeting/b1000.mp4?v=20261027-bachata-grounded', poster: '/assets/images/robokit/scale/humanoid-retargeting/b1000.webp?v=20261027-bachata-grounded' },
          { batch: 2000, seconds: 0.024843130, video: '/assets/videos/robokit/scale/humanoid-retargeting/b2000.mp4?v=20261027-bachata-grounded', poster: '/assets/images/robokit/scale/humanoid-retargeting/b2000.webp?v=20261027-bachata-grounded' },
        ] },
      ],
    },
    method: {
      h: 'Composable under the hood.',
      cards: [
        { count: '20+', name: 'Objectives', note: '+ 16 more objectives',
          figs: [
            { img: '/assets/images/robokit/method/fig-pose.svg', label: 'Pose matching', w: 112, h: 78 },
            { img: '/assets/images/robokit/method/fig-collision.svg', label: 'Collision', w: 112, h: 78 },
            { img: '/assets/images/robokit/method/fig-force.svg', label: 'Force closure', w: 112, h: 78 },
            { img: '/assets/images/robokit/method/fig-rollout.svg', label: 'Sim rollout', w: 112, h: 78 },
          ] },
        { name: 'Acceleration', note: 'up to 50× faster',
          figs: [
            { img: '/assets/images/robokit/method/robot-arm-trim.webp', label: 'Robot approx.', w: 101, h: 108, anim: 'rock' },
            { img: '/assets/images/robokit/method/apple-voxel-trim.webp', label: 'Hybrid geometry', w: 114, h: 108, anim: 'float' },
            { img: '/assets/images/robokit/method/fig-pyramid-fit.svg', label: 'Hierarchical rendering', w: 122, h: 96 },
            { img: '/assets/images/robokit/method/fig-coarse-physics.svg', label: 'Coarse physics', w: 140, h: 66 },
          ] },
        { count: '5+', name: 'Optimizers', note: 'GD · Adam · L‑BFGS · LM · MPPI · ES',
          figs: [
            { img: '/assets/images/robokit/method/fig-population-wide.svg', label: 'Sampling', w: 232, h: 124 },
            { img: '/assets/images/robokit/method/fig-gradient-wide.svg', label: 'Gradient', w: 232, h: 124 },
          ] },
        { name: 'Distillation', note: 'up to 240× faster',
          figs: [
            { img: '/assets/images/robokit/method/fig-funnel-fit.svg', label: 'Filtering', w: 81, h: 88 },
            { img: '/assets/images/robokit/method/fig-network.svg', label: 'Policy', w: 139, h: 94 },
          ] },
      ],
    },
    api: {
      h: 'Few lines to a solve.',
      install: 'uv add robokit',
      tabs: [
        // Generated from RoboKit guide examples by scripts/import_docs.py.
        {"label": "Inverse kinematics", "file": "ik.py", "doc": "ik", "lines": [{"text": "from robokit.helpers.ik import IKSolver, presets"}, {"text": ""}, {"text": "ik = IKSolver(presets.smooth, robot=robot, target_links=\"panda_hand\", device=device)"}, {"text": "state = ik.solve_numpy(T_world_target_batch)"}, {"text": "q_batch = state.q.numpy()"}], "fullCode": "import numpy as np\nfrom robot_descriptions.loaders.yourdfpy import load_robot_description\nfrom robokit.robo import Robot\n\nfrom robokit.helpers.ik import IKSolver, presets\n\ndevice = \"cpu\"\nrobot = Robot.load(load_robot_description(\"panda_description\"))\nT_world_target_batch = np.tile(np.array([0.5, 0.2, 0.5, 0, 0, 1, 0], dtype=np.float32), (2, 1))\nik = IKSolver(presets.smooth, robot=robot, target_links=\"panda_hand\", device=device)\nstate = ik.solve_numpy(T_world_target_batch)\nq_batch = state.q.numpy()\nassert q_batch.shape == (2, robot.spec.num_actuated_joints)"},
        {"label": "Motion planning", "file": "motion_planning.py", "doc": "motion-planning", "lines": [{"text": "import numpy as np"}, {"text": "import warp as wp"}, {"text": "from robokit.assets.robots.arms import franka_panda"}, {"text": "from robokit.geom import BoxGeom, WarpScene"}, {"text": "from robokit.helpers.motion_plan import MotionPlanner, presets"}, {"text": "from robokit.robo import Robot"}, {"text": ""}, {"text": "device = \"cuda:0\" if wp.is_cuda_available() else \"cpu\""}, {"text": "robot = Robot.load("}, {"text": "    franka_panda.URDF_PATH, load_collision_spheres=True, collision_spheres_path=franka_panda.COLLISION_SPHERE_PATH"}, {"text": ")"}, {"text": ""}, {"text": "# A box with half extents (0.04, 0.25, 0.2) m standing in front of the arm."}, {"text": "T_world_box = np.eye(4, dtype=np.float32)[None]"}, {"text": "T_world_box[0, :3, 3] = (0.45, 0.0, 0.2)"}, {"text": "box = BoxGeom("}, {"text": "    np.array([[0.04, 0.25, 0.2]], np.float32),"}, {"text": "    np.array([0, 1], np.int32),"}, {"text": "    poses=wp.array(T_world_box, dtype=wp.mat44, device=device),"}, {"text": ")"}, {"text": "scene = WarpScene(1, device).add(box)"}, {"text": "planner = MotionPlanner(presets.offline_pose_lbfgs, robot, \"panda_hand\", scene=scene, device=device)"}, {"text": ""}, {"text": "start_q = robot.spec.midrange_q.astype(np.float32)"}, {"text": "T_world_goal = np.array([0.45, 0.35, 0.25, 0.0, 1.0, 0.0, 0.0], np.float32)  # x, y, z, qw, qx, qy, qz"}, {"text": "result = planner.solve_offline_numpy([start_q, {\"panda_hand\": T_world_goal}])"}, {"text": ""}, {"text": "q_traj = result.q_traj[0]  # planned joint trajectory, (frames, dofs)"}, {"text": "motion_time = result.motion_time[0]  # seconds, at the robot's velocity, acceleration and jerk limits"}, {"text": "q_control = result.interpolate(0.02)[0]  # one joint sample every 0.02 s, (samples, dofs)"}], "fullCode": "import numpy as np\nimport warp as wp\nfrom robokit.assets.robots.arms import franka_panda\nfrom robokit.geom import BoxGeom, WarpScene\nfrom robokit.helpers.motion_plan import MotionPlanner, presets\nfrom robokit.robo import Robot\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\nrobot = Robot.load(\n    franka_panda.URDF_PATH, load_collision_spheres=True, collision_spheres_path=franka_panda.COLLISION_SPHERE_PATH\n)\n\n# A box with half extents (0.04, 0.25, 0.2) m standing in front of the arm.\nT_world_box = np.eye(4, dtype=np.float32)[None]\nT_world_box[0, :3, 3] = (0.45, 0.0, 0.2)\nbox = BoxGeom(\n    np.array([[0.04, 0.25, 0.2]], np.float32),\n    np.array([0, 1], np.int32),\n    poses=wp.array(T_world_box, dtype=wp.mat44, device=device),\n)\nscene = WarpScene(1, device).add(box)\nplanner = MotionPlanner(presets.offline_pose_lbfgs, robot, \"panda_hand\", scene=scene, device=device)\n\nstart_q = robot.spec.midrange_q.astype(np.float32)\nT_world_goal = np.array([0.45, 0.35, 0.25, 0.0, 1.0, 0.0, 0.0], np.float32)  # x, y, z, qw, qx, qy, qz\nresult = planner.solve_offline_numpy([start_q, {\"panda_hand\": T_world_goal}])\n\nq_traj = result.q_traj[0]  # planned joint trajectory, (frames, dofs)\nmotion_time = result.motion_time[0]  # seconds, at the robot's velocity, acceleration and jerk limits\nq_control = result.interpolate(0.02)[0]  # one joint sample every 0.02 s, (samples, dofs)\nassert np.isfinite(q_control).all() and motion_time > 0"},
        {"label": "Hand retargeting", "file": "hand_retargeting.py", "doc": "hand-retargeting", "lines": [{"text": "from robokit.helpers.hand_retargeting import HandRetargeterOnline"}, {"text": ""}, {"text": "retargeter = HandRetargeterOnline("}, {"text": "    config=shadow.online,"}, {"text": "    robot=robot,"}, {"text": "    spec=shadow.spec,"}, {"text": "    device=device,"}, {"text": ")"}, {"text": "retargeter.warmup(batch_size=1)"}, {"text": ""}, {"text": "for points in stream:"}, {"text": "    qpos = retargeter.solve_numpy(target_points=points)"}, {"text": ""}, {"text": "retargeter.reset()"}], "fullCode": "import numpy as np\nimport warp as wp\nfrom robokit.assets.robots.end_effectors import shadow_hand\nfrom robokit.helpers.hand_retargeting import HandRetargeterOffline\nfrom robokit.helpers.hand_retargeting.presets import shadow\nfrom robokit.robo import Robot\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\nrobot = Robot.load(\n    shadow_hand.URDF_PATH_RIGHT,\n    load_collision_spheres=True,\n    collision_spheres_path=shadow_hand.COLLISION_SPHERE_PATH_RIGHT,\n)\n# A three-frame synthetic hand, ordered as shadow.spec.target_names.\npoints = np.zeros((3, 21, 3), dtype=np.float32)\nfor finger in range(5):\n    for joint in range(4):\n        points[:, 1 + 4 * finger + joint] = [(finger - 2) * 0.025, (joint + 1) * 0.025, 0.0]\nstream = [frame[None] for frame in points]\nroot_quat_wxyz = np.tile([1, 0, 0, 0], (3, 1)).astype(np.float32)\nfrom robokit.helpers.hand_retargeting import HandRetargeterOnline\n\nretargeter = HandRetargeterOnline(\n    config=shadow.online,\n    robot=robot,\n    spec=shadow.spec,\n    device=device,\n)\nretargeter.warmup(batch_size=1)\n\nfor points in stream:\n    qpos = retargeter.solve_numpy(target_points=points)\n\nretargeter.reset()\nassert qpos.shape[-1] == robot.spec.num_actuated_joints + 7\nassert np.isfinite(qpos).all()"},
        {"label": "Humanoid retargeting", "file": "humanoid_retargeting.py", "doc": "humanoid-retargeting", "lines": [{"text": "from robokit.helpers.humanoid_retargeting import HumanoidRetargeterOnline"}, {"text": "from robokit.helpers.humanoid_retargeting.presets.g1_aligned import g1_aligned"}, {"text": ""}, {"text": "retargeter = HumanoidRetargeterOnline(g1_aligned, robot=robot, device=device)"}, {"text": "retargeter.warmup(batch_size=1)"}, {"text": ""}, {"text": "for T_world_human in motion:  # one (J, 7) frame per iteration"}, {"text": "    qpos = retargeter.solve_numpy(T_world_human[None], human_heights)[0]"}, {"text": ""}, {"text": "retargeter.reset()"}], "fullCode": "import numpy as np\nimport warp as wp\nfrom robokit.helpers.humanoid_retargeting import HumanoidRetargeterOnline\nfrom robokit.helpers.humanoid_retargeting.presets.g1_aligned import g1_aligned\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\nrobot = g1_aligned.load_robot()\nhuman_heights = np.array([g1_aligned.human_height_assumption], dtype=np.float32)\nmotion = np.zeros((3, len(g1_aligned.human_joint_names), 7), dtype=np.float32)\nmotion[..., 3] = 1.0\nmotion[..., 2] = np.linspace(0.2, 1.6, motion.shape[1])\nmotion[..., 0] = 0.05 * np.sin(np.arange(motion.shape[1]))\nfrom robokit.helpers.humanoid_retargeting import HumanoidRetargeterOnline\nfrom robokit.helpers.humanoid_retargeting.presets.g1_aligned import g1_aligned\n\nretargeter = HumanoidRetargeterOnline(g1_aligned, robot=robot, device=device)\nretargeter.warmup(batch_size=1)\n\nfor T_world_human in motion:  # one (J, 7) frame per iteration\n    qpos = retargeter.solve_numpy(T_world_human[None], human_heights)[0]\n\nretargeter.reset()\nassert qpos.shape == (7 + robot.spec.num_actuated_joints,)\nassert np.isfinite(qpos).all()"},
        {"label": "Calibration", "file": "hand_eye_calibration.py", "doc": "hand_eye_calibration", "lines": [{"text": "from robokit.helpers.hand_eye_calibration import HandEyeCalibrator, presets"}, {"text": ""}, {"text": "hec = HandEyeCalibrator(presets.rgb, robot, camera_intrinsic=intrinsic, height=H, width=W)"}, {"text": "predicted = hec.solve(initial, target_masks=masks, q=q)"}], "fullCode": "import torch\nfrom robokit.helpers.hand_eye_calibration import compute_robot_masks\nfrom robokit.robo import Robot\n\n# A one-joint box robot needs no external assets.\nrobot = Robot.load(\n    \"\"\"<robot name=\"demo\">\n  <link name=\"base\"><visual><geometry><box size=\".3 .2 .1\"/></geometry></visual></link>\n  <link name=\"arm\"><visual><origin xyz=\".2 0 0\"/><geometry><box size=\".4 .1 .1\"/></geometry></visual></link>\n  <joint name=\"joint\" type=\"revolute\">\n    <parent link=\"base\"/><child link=\"arm\"/><axis xyz=\"0 0 1\"/>\n    <limit lower=\"-3.14\" upper=\"3.14\" effort=\"1\" velocity=\"1\"/>\n  </joint>\n</robot>\"\"\",\n    load_meshes=True,\n)\nH = W = 64\nq = torch.tensor([[-0.6], [-0.2], [0.2], [0.6]], device=\"cuda\")\nintrinsic = torch.tensor([[80.0, 0, W / 2], [0, 80.0, H / 2], [0, 0, 1]], device=\"cuda\")\ninitial = torch.eye(4, device=\"cuda\")\ninitial[2, 3] = 1.5\nmasks = compute_robot_masks(robot, q, intrinsic, initial, H, W)\nfrom robokit.helpers.hand_eye_calibration import HandEyeCalibrator, presets\n\nhec = HandEyeCalibrator(presets.rgb, robot, camera_intrinsic=intrinsic, height=H, width=W)\npredicted = hec.solve(initial, target_masks=masks, q=q)\nassert predicted.shape == (4, 4)\nassert torch.isfinite(predicted).all()"},
      ],
    },
    close: { h: 'Read the docs, then build on it.' },
    bench: {
      h: "It's just fast.",
      rows: [
        { task: ['Locomotion', 'MPC'], pct: 29.4, x: '3.4×', vs: 'DIAL-MPC' },
        { task: ['Inverse', 'kinematics'], pct: 8.3, x: '12×', vs: 'PyRoKi' },
        { task: ['Motion', 'planning'], pct: 29, x: '3.5×', vs: 'cuRobo' },
        { task: ['Hand', 'retargeting'], pct: 3.8, x: '27×', vs: 'PyRoKi' },
        { task: ['Humanoid', 'retargeting'], pct: 25, x: '4×', vs: 'GMR' },
        { task: ['Physics', 'retargeting'], pct: 28.6, x: '3.5×', vs: 'SPIDER' },
        { task: ['Grasp', 'synthesis'], pct: 1.7, x: '60×', vs: 'Dex1B' },
        { task: ['RL', 'time to score'], pct: 58.8, x: '1.7×', vs: 'mjlab' },
        { task: ['Rendering', 'calibration'], pct: 1.75, x: '57×', vs: 'EasyHEC (easy)' },
      ],
      note: 'Bars are wall-clock time on the same task, baseline normalized to full width. Check the paper for benchmark details.',
    },
    alt: { label: 'View on GitHub', href: 'https://github.com/openrobokit/robokit' },
    sections: [
      {
        n: '01', label: 'Overview', h: 'The layer between a controller and a policy.',
        paras: ["robokit is a single GPU-native library for the geometric work in robot learning: forward / inverse kinematics, collision-aware trajectory optimization, human-to-robot motion retargeting, grasp optimization, and rendering-based calibration. Every operation is batched along the leading dimension and differentiable through PyTorch, dispatched to CUDA through NVIDIA Warp."],
        linkLead: 'It is the foundation the rest of the stack builds on:',
        links: [
          { label: 'retargetingkit', href: '/retargetingkit/', sep: ' and ' },
          { label: 'graspkit', href: '/graspkit/', sep: " both call into robokit's chains, solvers, and SDF colliders." },
        ],
        codeFile: 'shell',
        codeLines: [L('uv add robokit'), L('uv add torch --index-url https://download.pytorch.org/whl/cu126'), C('# optional; pick your CUDA build')],
      },
      {
        n: '02', label: 'Modules', h: 'Six modules. One runtime.',
        cardCols: 'repeat(2,1fr)',
        cards: [
          { kicker: '→ ROBO', name: 'robo', desc: 'Robot, RobotSpec, RobotState. URDF / MJCF parsing, batched forward kinematics & collision on Warp.' },
          { kicker: '→ OPT', name: 'opt', desc: 'Sparse least-squares solvers (GD / Levenberg–Marquardt / L-BFGS) behind every helper.' },
          { kicker: '→ TERMS', name: 'terms', desc: 'Composable cost terms: position, rotation, frame, collision, self-collision, smoothness, limits.' },
          { kicker: '→ LIE', name: 'lie', desc: 'SE(3) / SO(3) Lie-group ops with the T_dst_src transform convention.' },
          { kicker: '→ GEOM', name: 'geom', desc: 'Meshes, primitives, signed-distance fields, and Warp collision scenes.' },
          { kicker: '→ HELPERS', name: 'helpers', desc: 'The applications: IK, trajectory optimization, humanoid & hand retargeting, calibration.' },
        ],
        codeFile: 'examples/ik/basic.py',
        codeLines: [{"text": "from robokit.helpers.ik import IKSolver, presets"}, {"text": ""}, {"text": "ik = IKSolver(presets.smooth, robot=robot, target_links=\"panda_hand\", device=device)"}, {"text": "state = ik.solve_numpy(T_world_target_batch)"}, {"text": "q_batch = state.q.numpy()"}],
      },
      {
        n: '03', label: 'Built for the loop', h: 'Shaped for the training loop.',
        paras: ['Robot learning runs geometry inside a tight loop with a neural network: generate data, retarget onto new embodiments, roll out optimizers across thousands of seeds, repeat. robokit is built for that loop: tensors stay on device, gradients flow through, and a single batch drives thousands of parallel solves.'],
        bullets: [
          'Batched IK across many seeds with a multi-stage Levenberg–Marquardt solver.',
          'Collision-aware trajectory optimization over a time horizon.',
          'SMPL-X / MANO retargeting onto humanoids and dexterous hands.',
          'Grasp optimization with force-closure and contact terms.',
          'Hand-eye calibration from images.',
        ],
        callout: 'If you can write it as a (batch, time, joints) tensor, robokit will run it across thousands of seeds at training speed.',
      },
      {
        n: '04', label: 'The stack', h: 'The base of the stack.',
        cardCols: 'repeat(3,1fr)',
        cards: [
          { kicker: '↑ BUILT ON IT', name: 'retargetingkit', desc: 'Real-time teleop & mocap retargeting using robokit IK and body models.' },
          { kicker: '↑ BUILT ON IT', name: 'graspkit', desc: 'Grasp synthesis, policy learning, and deployment on robokit + retargetingkit.' },
          { kicker: '↗ EXTERNAL', name: 'MuJoCo · Isaac · viser', desc: 'Load URDF / MJCF, play trajectories as PD targets, visualize live.' },
        ],
      },
    ],
  },

  retargetingkit: {
    crumb: 'retargetingkit', titleA: 'retargeting', titleB: 'kit',
    lede: 'Real-time human-to-robot motion retargeting, built on robokit.',
    chip: 'Teleoperation', install: 'uv add retargetingkit',
    highlights: [
      { k: 'Live sources', v: 'VR headsets, gloves, mocap suits, cameras.' },
      { k: 'Any target', v: 'Dexterous hands, arms, full humanoids.' },
      { k: 'Sim or real', v: 'MuJoCo playback or ZMQ to hardware.' },
    ],
    meta: [{ k: 'version', v: '0.1.0' }, { k: 'built on', v: 'robokit' }, { k: 'python', v: '3.10+' }, { k: 'backend', v: 'warp · pytorch' }],
    showDetails: false,
    endH: 'Read the docs, then retarget it.',
    alt: { label: 'Back to robokit', href: '/robokit/' },
    close: { h: 'Read the docs, then retarget it.' },

    // Each group is its own full-width band: one 16:9 stage per screen, with the
    // scene picker and the counter laid over the footage rather than beside it.
    // `anchor` is the section id; the first one keeps #capabilities so the skip
    // link and the nav still land on it.
    showcase: {
      groups: [
        {
          id: 'inhand', name: 'In-hand rotation', width: 1620, height: 1080,
          anchor: 'capabilities', label: 'Dexterous hand', h: 'In-hand dexterity.',
          tag: 'Teleoperation',
          speed: '2\u00D7 speed',
          advance: 'timer', dwell: 6000,
          items: [
            rk('hand/inhand/tennis', 'Tennis ball'),
            rk('hand/inhand/cube', 'Cube'),
            rk('hand/inhand/cylinder', 'Cylinder'),
            rk('hand/inhand/pen', 'Pen'),
            rk('hand/tool/hammer', 'Hammer'),
            rk('hand/tool/marker', 'Marker'),
            rk('hand/tool/cup', 'Cup'),
            rk('hand/tool/plug', 'Power plug'),
          ],
        },
        {
          id: 'humanoid', name: 'Fullbody retargeting', width: 1920, height: 1080,
          anchor: 'whole-body', label: 'Humanoid', h: 'Whole-body dexterity.',
          tag: 'Teleoperation',
          speed: '4\u00D7 speed',
          advance: 'ended',
          items: [
            rk('humanoid/flowers', 'Arranging flowers', {
              src: '/assets/videos/retargetingkit/humanoid/flowers.mp4?v=20260911-flowers-start',
              poster: '/assets/images/retargetingkit/humanoid/flowers.webp?v=20260911-flowers-start',
            }),
            rk('humanoid/picnic', 'Setting a table', {
              src: '/assets/videos/retargetingkit/humanoid/picnic.mp4?v=20260909-whole-body-cuts',
              poster: '/assets/images/retargetingkit/humanoid/picnic.webp?v=20260909-whole-body-cuts',
            }),
            rk('humanoid/basket', 'Lifting a basket', {
              src: '/assets/videos/retargetingkit/humanoid/basket.mp4?v=20260909-whole-body-cuts',
              poster: '/assets/images/retargetingkit/humanoid/basket.webp?v=20260909-whole-body-cuts',
            }),
            rk('humanoid/bottle', 'Binning a bottle'),
            rk('humanoid/book', 'Shelving a book'),
            rk('humanoid/coffee', 'Operating a coffee machine'),
          ],
        },
      ],
    },

    scale: {
      id: 'embodiment',
      label: 'Fast, scalable',
      h: 'Any embodiment.',
      position: 'beforeMotionRange',
      taskLabel: 'Robot embodiment',
      showCount: false,
      showControl: false,
      initialStep: 0,
      lazy: true,
      tasks: [
        { label: 'Hands', unit: 'hands', playbackControl: true, steps: [
          { batch: 10, description: '10 hand embodiments',
            video: '/assets/videos/retargetingkit/hand-lineup/desktop.mp4?v=20261015-brief-holds',
            poster: '/assets/images/retargetingkit/hand-lineup/desktop.webp?v=20261015-brief-holds',
            mobileVideo: '/assets/videos/retargetingkit/hand-lineup/mobile.mp4?v=20261015-brief-holds',
            mobilePoster: '/assets/images/retargetingkit/hand-lineup/mobile.webp?v=20261015-brief-holds' },
        ] },
        { label: 'Arm and hand', unit: 'arm and hand assemblies', playbackControl: true, loop: false, steps: [
          { batch: 11, description: '11 arm and hand assemblies · carry and lift',
            video: '/assets/videos/retargetingkit/arm-lineup/desktop.mp4?v=20261015-arm-and-hand',
            poster: '/assets/images/retargetingkit/arm-lineup/desktop.webp?v=20261015-arm-and-hand',
            mobileVideo: '/assets/videos/retargetingkit/arm-lineup/mobile.mp4?v=20261015-arm-and-hand',
            mobilePoster: '/assets/images/retargetingkit/arm-lineup/mobile.webp?v=20261015-arm-and-hand' },
        ] },
        { label: 'Humanoids', unit: 'humanoids', playbackControl: true, loop: false, steps: [
          { batch: 12, description: '12 humanoid embodiments · recorded dance',
            video: '/assets/videos/retargetingkit/humanoid-lineup/desktop.mp4?v=20261015-dance12-full',
            poster: '/assets/images/retargetingkit/humanoid-lineup/desktop.webp?v=20261015-dance12-full',
            mobileVideo: '/assets/videos/retargetingkit/humanoid-lineup/mobile.mp4?v=20261015-dance12-full',
            mobilePoster: '/assets/images/retargetingkit/humanoid-lineup/mobile.webp?v=20261015-dance12-full' },
        ] },
      ],
    },

    motionRange: {
      label: 'Geometry-aware',
      h: 'From fingertips to full scenes.',
      width: 1280,
      height: 720,
      items: [
        { tab: 'Hand–object', name: 'Contact-aware hand–object interaction', clips: [
          rangeClip('hand/waffleiron', 'Open a waffle iron'),
          rangeClip('hand/box', 'Open and close a box'),
          rangeClip('hand/put-on-lid', 'Place a storage lid'),
          rangeClip('hand/ketchup', 'Squeeze a bottle'),
          rangeClip('hand/tea', 'Lift and tilt a teapot'),
        ] },
        { tab: 'Terrain', name: 'Terrain-aware humanoid retargeting', clips: [
          rangeClip('terrain/seq0-2', 'Stand and lower on a ledge', '20260909-terrain-light'),
          rangeClip('terrain/seq1-1', 'Climb a narrow step', '20260909-terrain-light'),
          rangeClip('terrain/seq2-2', 'Descend offset steps', '20260909-terrain-light'),
          rangeClip('terrain/seq4-1', 'Reach onto a raised platform', '20260909-terrain-light'),
          rangeClip('terrain/seq4-2', 'Crawl across the platform', '20260909-terrain-light'),
        ] },
        { tab: 'Full-body scene', name: 'Full-body scene retargeting', clips: [
          rangeClip('full-body/move-cup', 'Carry a cup to the table'),
          rangeClip('full-body/pour', 'Tilt a kettle over a cup'),
          rangeClip('full-body/place-pot', 'Place a pot on the stove'),
          rangeClip('full-body/kettle-to-sink', 'Return a kettle to the sink'),
          rangeClip('full-body/cutting', 'Prepare food at the counter'),
        ] },
      ],
    },

    api: {
      label: 'Driver code included',
      h: 'Simple API and framework.',
      install: 'uv add retargetingkit',
      tabs: [
        // Generated from RetargetingKit guide examples by scripts/import_retargetingkit_docs.py.
        {"label": "Hand", "file": "hand.py", "doc": "hand-optimization", "lines": [{"text": "from retargetingkit.configs.teleop.hand.manus_sharpa import RIGHT_MANUS_SHARPA_CONFIG"}, {"text": ""}, {"text": "retargeter = RIGHT_MANUS_SHARPA_CONFIG.retargeter.build(device)"}, {"text": ""}, {"text": "for frame in stream:  # HandFrame: right-hand MANO-21 keypoints"}, {"text": "    command = retargeter.solve(frame)"}, {"text": "    qpos = command.qpos  # (22,), Sharpa joints in URDF order"}], "fullCode": "import pickle\n\nimport numpy as np\nimport warp as wp\n\nfrom retargetingkit.assets.example_data import MANUS_DATA_RIGHT_PKL\nfrom retargetingkit.sources.frames import HandFrame, HandPose\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\n# Three recorded wrist-local MANO-21 frames from a right Manus glove.\nkeypoints = pickle.load(open(MANUS_DATA_RIGHT_PKL, \"rb\"))[\"keypoints\"][:3]\nstream = [HandFrame({\"right\": HandPose(points)}) for points in keypoints]\nfrom retargetingkit.configs.teleop.hand.manus_sharpa import RIGHT_MANUS_SHARPA_CONFIG\n\nretargeter = RIGHT_MANUS_SHARPA_CONFIG.retargeter.build(device)\n\nfor frame in stream:  # HandFrame: right-hand MANO-21 keypoints\n    command = retargeter.solve(frame)\n    qpos = command.qpos  # (22,), Sharpa joints in URDF order\nassert qpos.shape == (22,)\nassert np.isfinite(qpos).all()"},
        {"label": "Arm and hand", "file": "arm_hand.py", "doc": "arm-retargeting", "lines": [{"text": "from retargetingkit.configs.teleop.arm_hand.visionpro_xarm7_xhand import RIGHT_VISIONPRO_XARM7_XHAND_CONFIG"}, {"text": ""}, {"text": "config = RIGHT_VISIONPRO_XARM7_XHAND_CONFIG"}, {"text": "arm = config.arm_retargeters[\"right\"].build(device)"}, {"text": "hand = config.hand_retargeters[\"right\"].build(device)"}, {"text": ""}, {"text": "for frame in stream:  # ArmHandFrame: synchronized wrist and finger poses"}, {"text": "    arm_qpos = arm.solve(frame.arm).qpos  # (7,), xArm7 joints"}, {"text": "    hand_qpos = hand.solve(frame.hand).qpos  # (12,), XHand joints"}], "fullCode": "import pickle\n\nimport numpy as np\nimport warp as wp\n\nfrom retargetingkit.assets.example_data import MANUS_DATA_RIGHT_PKL\nfrom retargetingkit.sources.frames import ArmFrame, ArmHandFrame, HandFrame, HandPose\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\nkeypoints = pickle.load(open(MANUS_DATA_RIGHT_PKL, \"rb\"))[\"keypoints\"][:3]\n# Recorded finger poses paired with a wrist moving 10 cm forward.\nstream = [\n    ArmHandFrame(\n        ArmFrame({\"right\": np.array([0.05 * i, -0.2, 1.1, 1, 0, 0, 0], dtype=np.float32)}),\n        HandFrame({\"right\": HandPose(points)}),\n    )\n    for i, points in enumerate(keypoints)\n]\nfrom retargetingkit.configs.teleop.arm_hand.visionpro_xarm7_xhand import RIGHT_VISIONPRO_XARM7_XHAND_CONFIG\n\nconfig = RIGHT_VISIONPRO_XARM7_XHAND_CONFIG\narm = config.arm_retargeters[\"right\"].build(device)\nhand = config.hand_retargeters[\"right\"].build(device)\n\nfor frame in stream:  # ArmHandFrame: synchronized wrist and finger poses\n    arm_qpos = arm.solve(frame.arm).qpos  # (7,), xArm7 joints\n    hand_qpos = hand.solve(frame.hand).qpos  # (12,), XHand joints\nassert arm_qpos.shape == (7,)\nassert hand_qpos.shape == (12,)\nassert np.isfinite(arm_qpos).all()\nassert np.isfinite(hand_qpos).all()"},
        {"label": "Humanoid", "file": "humanoid.py", "doc": "humanoid-retargeting", "lines": [{"text": "from retargetingkit.retargeting.humanoid.online import HumanoidRetargeterConfig"}, {"text": "from retargetingkit.retargeting.humanoid.presets.g1 import g1_aligned"}, {"text": ""}, {"text": "retargeter = HumanoidRetargeterConfig(g1_aligned).build(device)"}, {"text": ""}, {"text": "command = retargeter.solve(frame)  # BodyFrame: named world-frame joint poses"}, {"text": "base_pose = command.base_pose  # (7,), [x, y, z, qw, qx, qy, qz]"}, {"text": "qpos = command.qpos  # (29,), G1 joints in URDF order"}], "fullCode": "import numpy as np\nimport warp as wp\n\nfrom retargetingkit.assets.sample_bvh import EXAMPLE_BVH\nfrom retargetingkit.sources.misc.human_frame_file import BodyFileSourceConfig\n\ndevice = \"cuda:0\" if wp.is_cuda_available() else \"cpu\"\nsource = BodyFileSourceConfig(EXAMPLE_BVH, use_ankle_as_foot_target=True).build()\nframe = source.get_frame()\nfrom retargetingkit.retargeting.humanoid.online import HumanoidRetargeterConfig\nfrom retargetingkit.retargeting.humanoid.presets.g1 import g1_aligned\n\nretargeter = HumanoidRetargeterConfig(g1_aligned).build(device)\n\ncommand = retargeter.solve(frame)  # BodyFrame: named world-frame joint poses\nbase_pose = command.base_pose  # (7,), [x, y, z, qw, qx, qy, qz]\nqpos = command.qpos  # (29,), G1 joints in URDF order\nassert base_pose.shape == (7,)\nassert qpos.shape == (29,)\nassert np.isfinite(qpos).all()\nsource.close()"},
      ],
    },

    details: {
      label: 'System',
      h: 'One pipeline, multiple bodies.',
    },

    sections: [
      {
        n: '01', label: 'Overview', h: 'Human motion in. Robot motion out.',
        paras: ['retargetingkit is a real-time pipeline that turns human motion into robot commands: Sources → Retargeting → Targets. Sources produce skeletal frames (VR, gloves, mocap, cameras, or recorded BVH); the retargeting stage maps them to robot joint angles with robokit IK; targets execute on hardware or in sim.'],
        linkLead: 'It is built on',
        links: [
          { label: 'robokit', href: '/robokit/', sep: " (hand and humanoid mapping use robokit's chains, solvers, and SMPL-X / MANO models) and provides the teleop and deployment layer for " },
          { label: 'graspkit', href: '/graspkit/', sep: '.' },
        ],
        codeFile: 'shell',
        codeLines: [
          L('uv add retargetingkit'), C('# core'),
          L('uv add "retargetingkit[pico]"'), C('# + a device, e.g. PICO VR'),
        ],
      },
      {
        n: '02', label: 'Pipeline', h: 'Sources → Retargeting → Targets.',
        cardCols: 'repeat(3,1fr)',
        cards: [
          { kicker: 'A · SOURCES', name: 'VR · gloves · mocap · cameras', desc: 'PICO, Quest 3, Vision Pro, Manus, Axis Studio, RealSense / ZED, or BVH playback, unified as hand & body frames.' },
          { kicker: 'B · RETARGETING', name: 'optimization · neural · IK', desc: 'Map frames to joint angles with robokit: hand optimization with pinch & self-collision terms, neural hand models, arm IK, and humanoid retargeting.' },
          { kicker: 'C · TARGETS', name: 'hands · arms · humanoids', desc: 'Inspire, Ability, SHARPA, xHand; xArm, RBY1; G1 / SONIC humanoid, over ZMQ, serial, or simulation.' },
        ],
        codeFile: 'scripts/teleop/humanoid.py',
        codeLines: [
          C('# replay the sample BVH on G1, with the live viewer'),
          L('uv run --extra vis scripts/teleop/humanoid.py bvh_g1_sonic_viser'),
        ],
      },
      {
        n: '03', label: 'Hardware', h: 'Plug in your hardware.',
        paras: ['Sources and targets are protocols, so any device that produces a hand or body frame can drive any robot that accepts joint commands.'],
        cardCols: 'repeat(2,1fr)',
        cards: [
          { kicker: 'SOURCES', name: 'in', desc: 'PICO 4 · Vision Pro · Quest 3 (VR) · Manus gloves · Axis Studio mocap · RealSense / ZED cameras · BVH files.' },
          { kicker: 'TARGETS', name: 'out', desc: 'Inspire (6-DoF serial) · Ability Hand · SHARPA · xHand; xArm · RBY1 · DexMate arms; G1 / SONIC humanoid (ZMQ).' },
        ],
      },
      {
        n: '04', label: 'The stack', h: 'Part of the stack.',
        cardCols: 'repeat(3,1fr)',
        cards: [
          { kicker: '↓ BUILT ON', name: 'robokit', desc: 'IK, kinematic chains, and SMPL-X / MANO body models.' },
          { kicker: '↑ FEEDS', name: 'graspkit', desc: 'Teleop bridges and real-robot deployment for grasp learning.' },
          { kicker: '↗ EXTERNAL', name: 'MuJoCo · ZMQ · viser', desc: 'Simulation playback, streaming to deploy systems, live visualization.' },
        ],
      },
    ],
  },

  graspkit: {
    crumb: 'graspkit', titleA: 'grasp', titleB: 'kit',
    heroVideoMobile: '/assets/videos/graspkit/hero-scissors-mobile.mp4?v=20261017-restored-blue',
    lede: 'End-to-end grasp pipeline, built on robokit and retargetingkit.',
    chip: 'Grasp pipeline', install: 'uv add graspkit',
    // the body is the media run below, so the prose column is dropped
    showDetails: false,
    // One clip per row, full measure. Both carry their own telemetry -- a
    // running clock, a batch count -- which is the claim, so they are not
    // shrunk into a two-up grid where that type stops resolving.
    stages: [
      {
        id: 'real-world', label: 'Real world',
        h: 'Real world robustness',
        note: '16 hours of continuous grasping, midday to the next morning.',
        src: '/assets/videos/graspkit/real-world.mp4?v=20260927-real-world-1080p1',
        poster: '/assets/images/graspkit/real-world.webp?v=20260927-real-world-1080p1',
      },
      {
        id: 'grasp-optimization', label: 'Optimization',
        h: 'Fast grasp optimization',
        note: '1,024 grasps in one batch on a single RTX 4090.',
        benchmark: { batch: 1024, seconds: 0.815378614992369, static: false, rounds: [{"start": 0, "lead": 1.0, "duration": 0.815378614992369}, {"start": 4.5, "lead": 8.0, "duration": 0.815378614992369}], hardware: 'RTX 4090', href: '/assets/data/graspkit-optimization-timing.json' },
        src: '/assets/videos/graspkit/grasp-optim.mp4?v=a7b1bc07ce',
        poster: '/assets/images/graspkit/grasp-optim.webp?v=18f64de8be',
      },
    ],
    // One looping scene per stage, rendered in Blender
    // render_pipeline_clips.py; Sim2Real from render_sim2real_twin.py.
    pipeline: {
      h: 'Batteries included',
      note: 'Simulation to real robot. Every stage ships in the box.',
      stages: [
        { name: 'Simulation',
          src: '/assets/videos/graspkit/pipeline/simulation.mp4?v=c511e28fd8', poster: '/assets/images/graspkit/pipeline/simulation.webp?v=c511e28fd8' },
        { name: 'Optimization',
          src: '/assets/videos/graspkit/pipeline/optimization.mp4?v=4786a0cd65', poster: '/assets/images/graspkit/pipeline/optimization.webp?v=9d174d21fa' },
        { name: 'Policy learning',
          src: '/assets/videos/graspkit/pipeline/policy.mp4?v=6d667da11f', poster: '/assets/images/graspkit/pipeline/policy.webp?v=e198c22a7d',
          // Named under the clip's three pieces, at their centres (% of its width) in policy_frame's layout.
          parts: [{ text: 'Point Cloud', x: 18.7 }, { text: 'Grasp Generator', x: 48.7 }, { text: 'Grasps', x: 81.3 }] },
        { name: 'Sim2Real',
          src: '/assets/videos/graspkit/pipeline/sim2real.mp4?v=0942475516', poster: '/assets/images/graspkit/pipeline/sim2real.webp?v=1992efb811' },
      ],
    },
    scale: {
      id: 'all-arms-all-hands',
      position: 'afterPipeline',
      label: 'Embodiments',
      h: 'All Arms All Hands',
      taskLabel: 'Grasping embodiment',
      showCount: false,
      showControl: false,
      initialStep: 0,
      lazy: true,
      syncPlayback: true,
      tasks: [
        { label: 'Hands and grippers', unit: 'models', playbackControl: true, steps: [
          { batch: 12, description: '10 hands + 2 grippers · grasp, hold, release',
            video: '/assets/videos/graspkit/embodiments/hands/desktop.mp4?v=20261017-restored-blue',
            poster: '/assets/images/graspkit/embodiments/hands/desktop.webp?v=20261017-restored-blue',
            mobileVideo: '/assets/videos/graspkit/embodiments/hands/mobile.mp4?v=20261017-restored-blue',
            mobilePoster: '/assets/images/graspkit/embodiments/hands/mobile.webp?v=20261017-restored-blue' },
        ] },
        { label: 'Arm bases', unit: 'bases', playbackControl: true, steps: [
          { batch: 14, description: '14 bases · SHARPA · grasp, lift, place', mobileAspect: '3 / 5',
            video: '/assets/videos/graspkit/embodiments/arms/desktop.mp4?v=20261017-restored-blue',
            poster: '/assets/images/graspkit/embodiments/arms/desktop.webp?v=20261017-restored-blue',
            mobileVideo: '/assets/videos/graspkit/embodiments/arms/mobile.mp4?v=20261017-restored-blue',
            mobilePoster: '/assets/images/graspkit/embodiments/arms/mobile.webp?v=20261017-restored-blue' },
        ] },
      ],
    },
    api: {
      h: 'From scenes to real robots.',
      install: 'uv add graspkit',
      tabs: [
        {"label":"Grasp optimization","file":"grasp_optim.py","doc":"grasp-optim","lines":[{"text":"import torch"},{"text":"from graspkit.configs.robot_config.xhand import xhand_right"},{"text":"from graspkit.stages.grasp_optim import GraspOptimConfig, build_grasp_optimizer"},{"text":""},{"text":"config = GraspOptimConfig("},{"text":"    optimizer_backend=\"warp_gd\", num_contact_points=5, scene_geom_backend=\"mesh\""},{"text":")"},{"text":"optimizer = build_grasp_optimizer(config, xhand_right, torch.device(\"cuda:0\"))"},{"text":""},{"text":"grasp_qpos = optimizer.optimize(scenes, num_samples_per_scene=64)"}],"fullCode":"import torch\nfrom graspkit.configs.robot_config.xhand import xhand_right\nfrom graspkit.stages.grasp_optim import GraspOptimConfig, build_grasp_optimizer\n\nconfig = GraspOptimConfig(\n    optimizer_backend=\"warp_gd\", num_contact_points=5, scene_geom_backend=\"mesh\"\n)\noptimizer = build_grasp_optimizer(config, xhand_right, torch.device(\"cuda:0\"))\n\n# scenes: a list of SceneDescription objects with target meshes\ngrasp_qpos = optimizer.optimize(scenes, num_samples_per_scene=64)"},
        {"label":"Policy training","file":"training_config.py","doc":"training","lines":[{"text":"from graspkit.configs.experiment_config import DatasetConfig, EnvConfig, TrainerConfig"},{"text":"from graspkit.configs.open_loop_policy import pointnet_0_1_kl_6drot"},{"text":"from graspkit.mani_skill.envs.dex_grasp import MsDexGraspEnvConfig"},{"text":""},{"text":"dataset = DatasetConfig("},{"text":"    num_actions=64, num_points=1024, return_object_pointcloud_only=True"},{"text":")"},{"text":"agent = pointnet_0_1_kl_6drot"},{"text":"trainer = TrainerConfig("},{"text":"    batch_size=16, total_iters=40000, eval_freq=10000, save_freq=10000,"},{"text":"    evaluator=EnvConfig("},{"text":"        ms_env_config=MsDexGraspEnvConfig(load_scenes=True, robot_uid=\"xhand_right_free\"),"},{"text":"        enable_perturbation=False,"},{"text":"    ),"},{"text":")"}],"fullCode":"from graspkit.configs.experiment_config import DatasetConfig, EnvConfig, TrainerConfig\nfrom graspkit.configs.open_loop_policy import pointnet_0_1_kl_6drot\nfrom graspkit.mani_skill.envs.dex_grasp import MsDexGraspEnvConfig\n\n# Use these fields in an ExperimentConfig with steps=(\"train\",)\ndataset = DatasetConfig(\n    num_actions=64, num_points=1024, return_object_pointcloud_only=True\n)\nagent = pointnet_0_1_kl_6drot\ntrainer = TrainerConfig(\n    batch_size=16, total_iters=40000, eval_freq=10000, save_freq=10000,\n    evaluator=EnvConfig(\n        ms_env_config=MsDexGraspEnvConfig(load_scenes=True, robot_uid=\"xhand_right_free\"),\n        enable_perturbation=False,\n    ),\n)"},
        {"label":"Sim deploy","file":"deploy_sim.py","source":"https://github.com/openrobokit/graspkit/blob/main/scripts/deploy/deploy.py","lines":[{"text":"from dataclasses import replace"},{"text":"from graspkit.envs import MsEnv"},{"text":""},{"text":"env = MsEnv(replace(exp.trainer.evaluator, num_envs=1), exp.robot_config, device)"},{"text":""},{"text":"env.reset(scene=scene, init_qpos=trajectory[0])"},{"text":"info = env.set_qpos_traj(trajectory)"},{"text":"env.close()"}],"fullCode":"import graspkit\nimport torch\nfrom dataclasses import replace\nfrom graspkit.configs.experiment import build_experiment_config\nfrom graspkit.envs import MsEnv\n\ndevice = torch.device(\"cuda:0\")\nexp = build_experiment_config(\"xhand_right_dex1b_v0_5_mini_tabletop\")\nenv = MsEnv(replace(exp.trainer.evaluator, num_envs=1), exp.robot_config, device)\n\n# scene: SceneDescription; trajectory: (T, D), from the floating-hand planner\nenv.reset(scene=scene, init_qpos=trajectory[0])\ninfo = env.set_qpos_traj(trajectory)\nenv.close()\n\n# The interactive command below adds camera capture, SAM2 segmentation,\n# policy inference, and floating-hand → xArm7 + XHand IK."},
        {"label":"Real deploy","file":"deploy_real.py","source":"https://github.com/openrobokit/graspkit/blob/main/scripts/deploy/deploy.py","lines":[{"text":"import torch"},{"text":"from graspkit.configs.real_env_config import REAL_ENV_CONFIGS"},{"text":"from graspkit.envs import RealEnv"},{"text":""},{"text":"env = RealEnv("},{"text":"    REAL_ENV_CONFIGS[\"xarm7_xhand_right\"], torch.device(\"cuda:0\"), t_robot_cam"},{"text":")"},{"text":""},{"text":"env.reset(init_qpos=phases[0][0])"},{"text":"for phase in phases:"},{"text":"    info = env.set_qpos_traj(phase)"},{"text":"env.close()"}],"fullCode":"import graspkit\nimport json\nimport torch\nfrom graspkit.configs.real_env_config import REAL_ENV_CONFIGS\nfrom graspkit.envs import RealEnv\n\n# Configure your arm, hand, and camera in xarm7_xhand_right.\n# camera_pose.json: your measured camera extrinsic in the robot-base frame\nwith open(\"camera_pose.json\") as f:\n    t_robot_cam = json.load(f)[\"T_base_camera\"]\nenv = RealEnv(\n    REAL_ENV_CONFIGS[\"xarm7_xhand_right\"], torch.device(\"cuda:0\"), t_robot_cam\n)\n\n# phases: approach / close / hold / lift tensors (T, D), after fixed-base IK\n# Executes on hardware; the interactive demo below lets you inspect the plan.\nenv.reset(init_qpos=phases[0][0])\nfor phase in phases:\n    info = env.set_qpos_traj(phase)\nenv.close()"},
      ],
    },
    close: { h: 'Read the docs, then grasp it.' },
    highlights: [
      { k: 'Force closure', v: 'Contact-aware grasps with friction cones.' },
      { k: '258k scenes', v: 'dev / mini / small / full size tiers.' },
      { k: 'Train → deploy', v: 'Policies that run on real robots.' },
    ],
    meta: [{ k: 'version', v: '0.1.0' }, { k: 'built on', v: 'robokit' }, { k: 'python', v: '3.10' }, { k: 'backend', v: 'torch · maniskill · warp' }],
    endH: 'Read the docs, then grasp it.',
    alt: { label: 'Back to robokit', href: '/robokit/' },
    sections: [
      {
        n: '01', label: 'Overview', h: 'From an object to a grasp that runs on hardware.',
        paras: ['graspkit is a full research pipeline for grasping: process object assets, build scenes, render point-cloud observations, optimize stable force-closure grasps, train neural policies from the results, and deploy them on real robots. One unified launcher drives every stage on the GPU.'],
        linkLead: 'It is built on',
        links: [
          { label: 'robokit', href: '/robokit/', sep: ' (kinematics, contact, optimization) and ' },
          { label: 'retargetingkit', href: '/retargetingkit/', sep: ' (deployment), so optimized grasps flow straight into whole-body control on real hardware.' },
        ],
        codeFile: 'shell',
        codeLines: [
          L('uv add graspkit'),
        ],
      },
      {
        n: '02', label: 'Pipeline', h: 'Assets → Optimize → Learn → Deploy.',
        cardCols: 'repeat(3,1fr)',
        cards: [
          { kicker: 'A · GENERATE', name: 'scenes & observations', desc: 'Randomized tabletop scenes; point-cloud rendering with configurable camera pose and intrinsics.' },
          { kicker: 'B · OPTIMIZE', name: 'force-closure grasps', desc: 'Floating- and fixed-base grasp optimization with friction cones, penetration and self-penetration limits.' },
          { kicker: 'C · LEARN & DEPLOY', name: 'policy → robot', desc: 'Train an open-loop policy from optimized grasps; deploy on xArm, RBY1, or G1 with whole-body control.' },
        ],
        codeFile: 'scripts/launch.py',
        codeLines: [C('# end-to-end mini pipeline on GPU 0'), L('uv run scripts/launch.py g1_inspire_dex1b_tabletop_mini --gpus 0')],
      },
      {
        n: '03', label: "What's inside", h: 'A whole pipeline, one launcher.',
        paras: ['The unified launcher orchestrates every stage and can restart from any step with --restart-from, so you can iterate on optimization or training without rerunning the whole pipeline.'],
        bullets: [
          'Scene descriptions (v0.3–v0.5) from DexGraspNet, DexDiffuser, Objaverse, and RoboCasa.',
          'Size tiers: dev / mini / small / full (up to ~258k floating-base scenes).',
          'HDF5 grasp data: grasp, pre-grasp, and post-grasp qpos per scene.',
          'Open-loop policy (transformer / ViT backbone) over point-cloud observations.',
          'Sim-to-real evaluator networks and multi-GPU training.',
        ],
      },
      {
        n: '04', label: 'The stack', h: 'Part of the stack.',
        cardCols: 'repeat(3,1fr)',
        cards: [
          { kicker: '↓ BUILT ON', name: 'robokit', desc: 'Kinematics, contact, and grasp-optimization terms.' },
          { kicker: '↓ BUILT ON', name: 'retargetingkit', desc: 'Real-robot deployment and teleop bridges.' },
          { kicker: '↗ EXTERNAL', name: 'ManiSkill · Warp · wandb', desc: 'Simulation environments, CUDA kernels, and experiment tracking.' },
        ],
      },
    ],
  },
  roboskills: {
    crumb: 'roboskills', titleA: 'robo', titleB: 'skills',
    lede: 'A low-cost, minimal skillset for agentic robotics.',
    chip: 'Agent Skills',
    cta: { label: 'View showcase →', href: '/roboskills/showcase/' },
    install: 'uv add roboskills',
    heroConsole: {
      label: 'Real2Sim · Cat’s cradle', state: 'agent replay', placeholder: 'Ask RoboSkills',
      tasks: [
        { label: 'Real2Sim · Cat’s cradle', state: 'wikiHow video, CC BY-NC-SA', prompt: 'Learn cat’s cradle from this human video.', steps: [[1.4, 'Thinking'], [1.7, 'Tracking both hands and the string'], [2.1, 'Rebuilding it with robot hands'], [2.6, 'Rebuilt in simulation']], ...skTeaser('cats-cradle') },
        { label: 'Agentic Simulation · Paper folding', state: 'built task', prompt: 'Build a paper folding task.', steps: [[1, 'Thinking'], [1.6, 'Building paper and two hands'], [2.8, 'Solving the folds'], [5, 'Solution verified']], ...skTeaser('paper-folding', true) },
        skRun('robodojo/cover_blocks-L1', 'Cover blocks', 132 / 601, { to: 312 / 601 }),
        skRun('robocasa365/DeliverBrewedCoffee-s1', 'Brewed coffee', 421 / 601),
        skRun('dexjoco/hammer_nail-s20001', 'Hammer a nail', 321 / 501),
      ],
    },
    showDetails: false,
    bands: [
      { type: 'bento', id: 'harnesses', label: 'Workflows', h: 'Built-in five workflows.', pills: true, cards: [
        { name: 'Auto Research', wide: true, href: '#auto-research', flow: [['Task'], ['Trials'], ['Policy']], video: sh('auto-research/bimanual-lifting').src, still: sh('auto-research/bimanual-lifting').poster },
        { name: 'Agentic Simulation', href: '#agentic-simulation', flow: [['Instruction'], ['Task/Solution']], video: sh('agentic-simulation/vega-shelve-mug').src, still: sh('agentic-simulation/vega-shelve-mug').poster },
        { name: 'Agent as Policy', href: '#agent-as-policy', flow: [['Observation'], ['Action']], video: sh('agent-as-policy/robocasa365/DeliverBrewedCoffee-s1').src, still: sh('agent-as-policy/robocasa365/DeliverBrewedCoffee-s1').poster },
        { name: 'Real2Sim', wide: true, href: '#real2sim', flow: [['Real video'], ['Simulation']], video: '/assets/videos/roboskills/bento/real2sim.mp4?v=20261028-studio', still: '/assets/images/roboskills/bento/real2sim.webp?v=20261028-studio' },
        { name: 'Motion Generation', wide: true, href: '#motion-generation', flow: [['Text', 'Photo', 'Video'], ['Motion']], video: '/assets/videos/roboskills/bento/motion-generation.mp4?v=20261030-g1-grey', still: '/assets/images/roboskills/bento/motion-generation.webp?v=20261030-g1-grey' },
      ], tiles: { label: 'Tools', items: [
        { name: 'RoboKit', logo: '/assets/brand/gear/robokit-ucsd.svg', desc: 'Kinematics, motion planning, robot hands', note: 'Every workflow' },
        { name: 'GraspKit', logo: '/assets/brand/gear/robokit-ucsd.svg', logoLabel: 'OpenRoboKit · GraspKit', desc: 'Learned grasps', note: 'Auto Research · Agent as Policy' },
        { name: 'SAM 3', logo: '/assets/brand/skills/meta.svg', logoLabel: 'Meta · SAM 3', desc: 'Text → masks', note: 'Auto Research · Agent as Policy · Real2Sim' },
        { name: 'SAM 3D', logo: '/assets/brand/skills/meta.svg', logoLabel: 'Meta · SAM 3D', desc: 'Image → object mesh', note: 'Real2Sim' },
        { name: 'MoGe', logo: '/assets/brand/skills/microsoft.ico', logoLabel: 'Microsoft · MoGe', desc: 'Image → depth', note: 'Real2Sim' },
        { name: 'GeoCalib', icon: 'calibration', desc: 'Image → gravity', note: 'Real2Sim' },
        { name: 'HaWoR', icon: 'hand', desc: 'Video → hand motion', note: 'Real2Sim' },
        { name: 'GVHMR', icon: 'human', desc: 'Video → human motion', note: 'Motion Generation' },
        { name: 'Kimodo', logo: '/assets/brand/skills/nvidia.ico', logoLabel: 'NVIDIA · Kimodo', desc: 'Text → G1 motion', note: 'Motion Generation' },
        { name: 'Blender', logo: '/assets/brand/skills/blender.svg', desc: 'Rendering', note: 'Motion Generation · Agentic Simulation' },
      ] } },
      { type: 'bench', id: 'model-cost', label: 'Results', wide: true, h: 'Cheaper, and it succeeds more.', legend: ['Ours', 'Baseline'], rows: [
        { group: 'Cost, share of the baseline', arrow: '\u2193', better: 'Lower is better' },
        { task: ['Real2Sim', 'DexYCB'], pct: 11, x: '11%', vs: 'Codex', sub: '$0.09 vs Codex' },
        { task: ['Agent as Policy', 'Stack blocks'], pct: 7.4, x: '7%', vs: 'Claude Opus 5.5', sub: '$0.16 vs $2.21, both 5/5' },
        { task: ['Auto Research', 'Stack blocks'], pct: 11, x: '11%', vs: 'Claude Opus 5.5', sub: '$0.07 vs $0.69, both 5/5' },
        { group: 'Success rate', arrow: '\u2191', better: 'Higher is better' },
        { task: ['Agent as Policy', 'Full RoboDojo'], pct: 40.5, base: 22.48, x: '40.5%', vs: 'RoboDojo Astra', sub: 'vs 22.48% RoboDojo Astra' },
        { group: 'With our tools, against without', arrow: '\u2191', better: 'Higher is better' },
        { task: ['Our workflow', '20 episodes'], pct: 80, base: 30, x: '80%', vs: 'Without first-party tools', sub: 'vs 30% without' },
        { task: ['Claude Code', '20 episodes'], pct: 75, base: 45, x: '75%', vs: 'Without first-party tools', sub: 'vs 45% without, 55% finding its own' },
      ], note: 'Cost bars are model cost on the same task, baseline normalized to full width. Success bars share one 0\u2013100% scale. Tools rows are RoboDojo episodes with Claude Opus 5.5 in every setting.' },
      { type: 'agent', id: 'agent', label: ['Auto Research', 'Agent-as-Policy'], h: 'An agent at work.', variants: [
        arStages({ label: 'Bimanual lift', anchor: 'auto-research', run: 'auto-research/bimanual-lifting', research: '13 min · 20 model calls',
          blurb: 'The first submission solved 1 of 2 development layouts; its revision solved both.', stages: [
            arStage('bimanual-lifting/fail', 'First attempt · seed 21', 'Failed', 'A live development episode before any submission: the right gripper misses and the pot tips without lifting.'),
            arStage('bimanual-lifting/success-a', 'Frozen policy · seed 24', 'Succeeded', 'A validation layout, pot turned 160°; the frozen policy solved 1 of 2 validation layouts.'),
            arStage('bimanual-lifting/success-b', 'Frozen policy · seed 27', 'Succeeded', 'A held-out test layout, pot turned 210°; the frozen policy solved all 3 test layouts.'),
          ] }),
        arStages({ label: 'Cover blocks', anchor: 'cover-blocks', run: 'auto-research/cover-blocks', research: '27 min · 14 model calls',
          blurb: 'With full observations, the first policy solved every layout: development 3/3, validation 2/2, test 5/5.', stages: [
            arStage('cover-blocks/fail', 'First attempt · layout 10', 'Failed', 'A live development episode before any submission: a cup tips over and the green block stays uncovered.'),
            arStage('cover-blocks/success-a', 'Frozen policy · layout 10', 'Succeeded', 'Full observations: the first submission solved all 3 development layouts.'),
            arStage('cover-blocks/success-b', 'Frozen policy · layout 14', 'Succeeded', 'A validation layout the agent never saw; the frozen policy also solved all 5 test layouts.'),
          ] }),
        arStages({ label: 'Brewed coffee', anchor: 'agent-as-policy', run: 'auto-research/brewed-coffee', research: '39 min · 55 model calls',
          blurb: 'The first submission solved neither development kitchen; its revision solved both. It solved none of 4 unseen kitchens.', stages: [
            arStage('brewed-coffee/fail', 'First submission · seed 1', 'Failed', 'The first policy grasps the mug and drives off, but the mug ends on the floor beside the base.'),
            arStage('brewed-coffee/success-a', 'Frozen policy · seed 261', 'Succeeded', 'The development kitchens\' room in other colours: the mug set upright beside the plate.'),
            arStage('brewed-coffee/success-b', 'Frozen policy · seed 111', 'Succeeded', 'The second development kitchen: mug delivered to the plate.'),
          ] }),
        arStages({ label: 'Counter to sink', anchor: 'counter-to-sink', run: 'auto-research/counter-to-sink', research: '13 min · 19 model calls',
          blurb: 'The first submission solved 1 of 3 development kitchens; its revision solved all 3, then 2 of 4 validation and 4 of 5 test kitchens.', stages: [
            arStage('counter-to-sink/fail', 'First attempt · seed 23', 'Failed', 'A live development episode before any submission: the steak is carried over but released on the sink\'s rim.'),
            arStage('counter-to-sink/success-a', 'Frozen policy · seed 15', 'Succeeded', 'A validation kitchen the agent never saw: the strainer goes into the sink.'),
            arStage('counter-to-sink/success-b', 'Frozen policy · seed 21', 'Succeeded', 'A held-out test kitchen: the canned food goes into the sink.'),
          ] }),
        arStages({ label: 'Hammer a nail', anchor: 'hammer-nail', run: 'auto-research/hammer-nail', research: '26 min · 27 model calls',
          blurb: 'The first submission solved 2 of 3 development layouts; its revision solved all 3.', stages: [
            arStage('hammer-nail/fail', 'First submission · seed 20003', 'Failed', 'Development 2/3: the first policy misses this layout, and the agent revises it.'),
            arStage('hammer-nail/success-a', 'Frozen policy · seed 20010', 'Succeeded', 'A held-out test layout the agent never saw; the frozen policy solved 2 of 4 test layouts.'),
            arStage('hammer-nail/success-b', 'Frozen policy · seed 20000', 'Succeeded', 'The revised submission solved all 3 development layouts.'),
          ] }),
      ] },
      skStage({
        id: 'real2sim', label: 'Real2Sim', ar: '16 / 9',
        h: 'Demonstrations into simulation.',
        note: 'Drag the divider to compare.', reveal: ['Demonstration', 'Simulation'],
        split: 35,
        variantsLabel: 'Demonstration source',
        sidebar: { title: 'Real2Sim agent', verb: 'Rebuilt in', badge: 'one agent', context: 'How it rebuilds a demonstration', steps: [
          ['Start the code workflow', 'In the background: masks, depth, the object’s mesh and motion, the actor and a physics rollout.'],
          ['Rebuild it from the frames', 'Meanwhile, from the source frames alone: camera, table, objects and the actor’s motion.'],
          ['Combine the two, part by part', 'Camera, geometry, look and motion from whichever matches the source; physics from a native rollout.'],
          ['Check by re-stepping', 'MuJoCo re-steps from each saved state; objects move only by contact with the actor.'],
          ['Check against the source', 'The render beside the source at uniform and event frames.'],
        ] },
        variants: [
          { ...sk('stages/real2sim/droid-dev-11', 'DROID'), run: 'real2sim/droid-dev-11', before: sk('stages/real2sim/droid-dev-11-input') },
          { ...sk('stages/real2sim/furniture-12', 'FurnitureBench'), run: 'real2sim/furniture-12', before: sk('stages/real2sim/furniture-12-input') },
          { ...sk('stages/real2sim/egodex', 'EgoDex'), run: 'real2sim/egodex', before: sk('stages/real2sim/egodex-input') },
          { ...sk('stages/real2sim/oakink2-a005-orange-mug', 'OakInk2'), run: 'real2sim/oakink2-a005-orange-mug', before: sk('stages/real2sim/oakink2-a005-orange-mug-input') },
          { ...sk('stages/real2sim/arctic-s05-microwave-use', 'ARCTIC'), run: 'real2sim/arctic-s05-microwave-use', before: sk('stages/real2sim/arctic-s05-microwave-use-input') },
        ],
      }),
      skStage({
        id: 'motion-generation', label: 'Motion Generation', ar: '16 / 9', inputs: true,
        h: 'Text, photos or video in. Interaction out.',
        variantsLabel: 'Input type',
        sidebar: { title: 'Motion agent', verb: 'Made in', badge: 'one agent', context: 'How it makes a motion', steps: [
          ['Read the request', 'Its text, and the photos or videos it names.'],
          ['Choose the models', 'Here {models}.'],
          ['Write the scripts', 'Motion, scene and characters, in the run’s own folder.'],
          ['Render and look', 'It watches its own render against the request.'],
          ['Revise, then deliver', 'Until it matches: the video and the motion it came from.'],
        ] },
        variants: [
          sh('motion-generation/street-dance', 'Video'),
          sh('motion-generation/ch29-bench', 'Photo'),
          sh('motion-generation/g1-tea', 'Text'),
        ],
      }),
      { type: 'clips', id: 'agentic-simulation', label: 'Agentic Simulation',
        h: 'From instruction to working code.', note: "The simulator's own checker verifies success", columns: 2,
        items: [
          Object.assign(sh('agentic-simulation/thread-rope', 'Two YAMs · thread a rope'), { kicker: '8/8 seeds', ar: '16 / 9' }),
          Object.assign(sh('agentic-simulation/vega-shelve-mug', 'Vega · shelve a mug'), { kicker: '8/8 seeds', ar: '16 / 9' }),
          Object.assign(sh('agentic-simulation/mobile-carry-pillow', 'Mobile Panda · carry a pillow'), { kicker: '8/8 seeds', ar: '16 / 9' }),
          Object.assign(sh('agentic-simulation/lift-tray', 'Two YAMs · lift a tray'), { kicker: '8/8 seeds', ar: '16 / 9' }),
        ] },
    ],
    close: { h: 'Try the code.', cta: { label: 'View on GitHub', href: 'https://github.com/openrobokit/roboskills' }, alt: { label: 'View showcase →', href: '/roboskills/showcase/' } },
    alt: { label: 'View on GitHub', href: 'https://github.com/openrobokit/roboskills' },
  },
};
