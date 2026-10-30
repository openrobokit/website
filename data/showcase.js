window.RK_SHOWCASE = {
  media: false,
  harnesses: [
    { id: 'agent-as-policy', label: 'Agent as Policy', flow: {
      in: 'Task', inputs: [{ text: 'Pick up the red cube and lift it.', tag: 'Instruction' }, { text: 'Cameras, robot state and a recipe', tag: 'Observations' }],
      agent: 'One agent, live', steps: ['Writes Python against bot', 'Plans and executes', 'Reads output and errors', 'Looks at the cameras'],
      again: 'one turn at a time, until bot.finish()',
      out: 'Episode', outputs: [{ code: 'cube = bot.find(["cube"])\nbot.grasp(cube[0]["id"])\nbot.finish()', tag: 'Turns' }, { text: 'Scored by the benchmark, hidden from the agent', tag: 'Native check' }] } },
    { id: 'agentic-simulation', label: 'Agentic Simulation', groups: [['build', 'Task building'], ['solutions', 'Solution generation']], flow: {
      in: 'Instruction', inputs: [{ text: 'Lift the cube, or press the bell', tag: 'Standard task' }, { text: 'Or describe a new scene, robot and goal', tag: 'Custom task' }],
      agent: 'One agent', steps: ['Reads or builds the task', 'Writes a solution script', 'Plans with RoboKit', 'Validates and repairs'],
      again: 'save the script; collect with no model calls',
      out: 'Solutions and collections', outputs: [{ img: 'agentic-simulation/panda-cube-lifting.webp', tag: 'Verified solution' }, { img: 'agentic-simulation/aloha-collection.webp', tag: '128 demonstrations' }] } },
    { id: 'real2sim', label: 'Real2Sim', groups: [['hands', 'Hands'], ['robots', 'Robots']], flow: {
      in: 'Demonstration', inputs: [{ img: 'flow/real2sim-egodex-real.webp', tag: 'EgoDex' }, { img: 'flow/real2sim-droid-real.webp', tag: 'DROID' }],
      agent: 'One pipeline', steps: ['Perceives objects and hands', 'Fits the scene', 'Retargets the actor', 'Tracks it under physics'],
      again: 'restarts until the object follows the source',
      out: 'MuJoCo', outputs: [{ img: 'flow/real2sim-egodex-sim.webp', tag: 'Sharpa hand' }, { img: 'flow/real2sim-droid-sim.webp', tag: 'Panda' }] } },
    { id: 'motion-generation', label: 'Motion Generation', groups: [['characters', 'Characters'], ['robots', 'Robots']], flow: {
      in: 'Request', inputs: [{ text: '“G1 pours tea from a teapot into a cup”', tag: 'Text' }, { img: 'motion-generation/ch29-bench-input.webp', tag: 'Photo' }, { img: 'motion-generation/h1-coffee-input.webp', tag: 'Video' }],
      agent: 'One agent', steps: ['Picks tools', 'Writes scripts', 'Renders', 'Looks at frames'],
      again: 'revises until the checks pass',
      out: 'Motion', outputs: [{ img: 'motion-generation/ch22-taichi.webp', tag: 'Character' }, { img: 'motion-generation/g1-tea.webp', tag: 'Robot' }] } },
    { id: 'auto-research', label: 'Auto Research', flow: {
      in: 'Task', inputs: [{ text: 'Lift the pot with both arms', tag: 'Robosuite' }, { img: 'flow/auto-research-failed.webp', tag: 'Early trial · failed' }],
      agent: 'One agent', steps: ['Proposes a policy', 'Runs trials', 'Diagnoses failures', 'Revises the policy'],
      again: 'then freezes it and checks it apart',
      out: 'Policy', outputs: [{ img: 'flow/auto-research-revised.webp', tag: 'Revised · succeeded' }] } },
  ],
  runs: [
    {
      "harness": "real2sim",
      "id": "diverse-e04",
      "source": "EgoDex",
      "robot": "Human \u2192 robot",
      "group": "robots",
      "body": "Panda with Robotiq 2F85",
      "name": "Place a container on a box",
      "blurb": "Place a container on a box. Rebuilt from the source video by the real2sim workflow in 474 s; native MuJoCo physics, rendered in Blender.",
      "clip": true,
      "mediaVersion": "20261026-claude-blender",
      "file": "E04.mp4",
      "models": "Codex gpt-6.1-sol in the real2sim workflow (best of two), MuJoCo, Blender Cycles",
      "stats": [
        [
          "Run time",
          "7.9",
          "min"
        ]
      ],
      "renderingLabel": "Blender render of native output",
      "rendering": "Native MuJoCo execution rendered in Blender from the source camera, on the source clock.",
      "credit": {
        "title": "Real2Gym published E04",
        "href": "https://real2gym.github.io/"
      },
      "galleryInstruction": "Pick up and stack the wooden blocks."
    },
    {
      "harness": "real2sim",
      "id": "diverse-e09",
      "source": "EgoDex",
      "robot": "Human \u2192 robot",
      "group": "robots",
      "body": "Panda with Robotiq 2F85",
      "name": "Insert or remove the USB connector",
      "blurb": "Insert or remove the USB connector. Rebuilt from the source video by the real2sim workflow in 525 s; native MuJoCo physics, rendered in Blender.",
      "clip": true,
      "mediaVersion": "20261026-claude-blender",
      "file": "E09.mp4",
      "models": "Codex gpt-6.1-sol in the real2sim workflow (best of two), MuJoCo, Blender Cycles",
      "stats": [
        [
          "Run time",
          "8.8",
          "min"
        ]
      ],
      "renderingLabel": "Blender render of native output",
      "rendering": "Native MuJoCo execution rendered in Blender from the source camera, on the source clock.",
      "credit": {
        "title": "Real2Gym published E09",
        "href": "https://real2gym.github.io/"
      },
      "galleryInstruction": "Insert or remove the USB connector."
    },

    { harness: 'agentic-simulation', group: 'solutions', id: 'panda-cube-lifting', source: 'Robosuite', robot: 'Panda', name: 'Lift the cube', clip: true,
      blurb: 'A reusable script chooses surface contacts, plans a grasp and lifts the cube. This verified episode is replayed in Blender.',
      solution: { seed: 730400, validation: 5, gap: 0, instruction: 'Lift the red cube at least 8 cm above the table and keep holding it.' } },
    { harness: 'agentic-simulation', group: 'solutions', id: 'aloha-click-bell', source: 'RoboTwin', robot: 'ALOHA AgileX', name: 'Press the bell', clip: true,
      blurb: 'A reusable script chooses an arm from the scene, plans its approach and presses the bell. This verified episode is replayed in Blender.',
      solution: { seed: 740400, validation: 5, gap: 0, instruction: 'Press the bell with a closed gripper, choosing the arm that can reach it.' } },
    { harness: 'agentic-simulation', group: 'solutions', id: 'panda-collection', source: 'Robosuite', robot: 'Panda', name: 'One script, 128 cube lifts', clip: true, mediaVersion: '20261026-studio-v2',
      blurb: 'New cube positions, orientations and starting joints. Each episode gets a new plan; the script stays unchanged.',
      collection: { accepted: 128, attempts: 133, validation: 5, chunks: 528, actions: 10787, before: 17.39, after: 7.50, first: 14.54, batchBefore: 105.52, batchAfter: 53.55 } },
    { harness: 'agentic-simulation', group: 'solutions', id: 'aloha-collection', source: 'RoboTwin', robot: 'ALOHA AgileX', name: 'One script, 128 bell presses', clip: true, mediaVersion: '20261026-studio-v2',
      blurb: 'Varied bell positions and two native bell assets. The script replans and selects the left or right arm for each scene.',
      collection: { accepted: 128, attempts: 128, validation: 5, chunks: 577, actions: 1681, before: 117.37, after: 16.61, first: 114.55, batchBefore: 705.53, batchAfter: 199.93 } },
    { harness: 'agentic-simulation', group: 'build', id: 'insert-peg', source: 'Text', robot: 'Panda', name: 'Insert a peg', blurb: 'Built from one sentence, then solved on all 8 seeds: the peg goes into its 22 mm hole.', clip: true, mediaVersion: '20261026-studio-v2', seeds: '8/8', agent: { build: 5.3, solve: 1.9 },
      instruction: 'With the Panda arm on the bench, insert a 20 mm square peg into the 22 mm square hole of a block fixed to the bench. The peg starts at a different position and yaw in each of eight episodes. It counts once the peg sits at least 30 mm deep in the hole, with the hand clear of it.' },
    { harness: 'agentic-simulation', group: 'build', id: 'lift-tray', source: 'Text', robot: 'Two YAMs', name: 'Lift a tray', blurb: 'Built from one sentence, then solved on all 8 seeds: two arms lift the tray level.', clip: true, mediaVersion: '20261028-1080p', seeds: '8/8', agent: { build: 11.3, solve: 2.0 },
      instruction: 'With a bimanual pair of YAM arms, lift a 400 mm tray lying on the bench with both hands and hold it level. The tray starts at a different position and yaw in each of eight episodes. It counts once the tray is held at least 80 mm above the bench, tilted less than 5 degrees, for one second.' },
    { harness: 'agentic-simulation', group: 'build', id: 'push-puck', source: 'Text', robot: 'Panda', name: 'Push a puck', blurb: 'Built from one sentence, then solved on all 8 seeds: the puck is pushed into the ring.', clip: true, mediaVersion: '20261026-studio-v2', seeds: '8/8', agent: { build: 5.7, solve: 2.7 },
      instruction: 'With the Panda arm on the bench, push a 60 mm puck into a 120 mm target ring on the bench without grasping it; the fingers stay closed. The puck starts at a different position in each of eight episodes. It counts once the puck rests inside the ring, still.' },
    { harness: 'agentic-simulation', group: 'build', id: 'hand-lift-ball', source: 'Text', robot: 'xArm7 + Sharpa', name: 'Lift a ball', blurb: 'Built from one sentence, then solved on all 8 seeds: a dexterous hand lifts the ball.', clip: true, mediaVersion: '20261026-studio-v2', seeds: '8/8', agent: { build: 5.6, solve: 1.2 },
      instruction: 'With the xArm7 carrying a Sharpa Wave hand, grasp a 60 mm ball on the bench and lift it. The ball starts at a different position in each of eight episodes. It counts once the ball is held at least 100 mm above the bench for one second.' },
    { harness: 'agentic-simulation', group: 'build', id: 'vega-shelve-mug', source: 'Text', robot: 'Vega + Sharpa', name: 'Shelve a mug', blurb: 'Built from one sentence, then solved on all 8 seeds: drive, grasp the mug, shelve it.', clip: true, mediaVersion: '20261028-1080p', seeds: '8/8', agent: { build: 8.9, solve: 16.6 },
      instruction: 'With the Dexmate Vega carrying Sharpa Wave hands, drive to a counter 1.5 m away, grasp a mug on it and set it upright on a shelf above the counter. The mug starts at a different position on the counter in each of eight episodes. It counts once the mug rests upright on the shelf with the hands clear of it.' },
    { harness: 'agentic-simulation', group: 'build', id: 'open-drawer', source: 'Text', robot: 'Panda', name: 'Open a drawer', blurb: 'Built from one sentence, then solved on all 8 seeds: the drawer is pulled open by its handle.', clip: true, mediaVersion: '20261026-studio-v2', seeds: '8/8', agent: { build: 15.5, solve: 9.7 },
      instruction: 'With the Panda arm on the bench, pull open the drawer of a small cabinet on the bench by its handle. The cabinet starts at a different position and yaw in each of eight episodes, with the drawer shut. It counts once the drawer is open at least 150 mm, with the hand clear of the handle.' },
    { harness: 'agentic-simulation', group: 'build', id: 'drop-beanbag', source: 'Text', robot: 'Panda', name: 'Drop a bean bag', blurb: 'Built from one sentence, then solved on all 8 seeds: the soft bag is picked up and dropped into the bowl.', clip: true, mediaVersion: '20261026-studio-v2', seeds: '8/8', agent: { build: 20.9, solve: 16.9 },
      instruction: 'With the Panda arm on the bench, pick up a bean bag, a 100 mm cloth pouch loosely filled with beans, and drop it into a bowl on the bench. The bean bag and the bowl start at different positions in each of eight episodes. It counts once the bean bag rests inside the bowl, with the hand clear of it.' },
    { harness: 'agentic-simulation', group: 'build', id: 'hand-squeeze-grip', source: 'Text', robot: 'Panda + Allegro', name: 'Squeeze a grip trainer', blurb: 'Built from one sentence, then solved on all 8 seeds: a dexterous hand picks up the foam grip and squeezes it.', clip: true, mediaVersion: '20261026-studio-v2', seeds: '8/8', agent: { build: 34.1, solve: 17.1 },
      instruction: 'With the Panda carrying an Allegro hand, pick up a foam grip trainer, a soft cylinder 50 mm wide and 100 mm long, from the bench and squeeze it in the hand. The trainer starts at a different position and yaw in each of eight episodes. It counts once the trainer is held off the bench and squeezed to at most half its resting width.' },
    { harness: 'agentic-simulation', group: 'build', id: 'mobile-pick-can', source: 'Text', robot: 'Mobile Panda', name: 'Drive and pick a can', blurb: 'Built from one sentence, then solved on all 8 seeds: drive to the table, grasp the can, lift it.', clip: true, mediaVersion: '20261026-studio-v2', seeds: '8/8', agent: { build: 20.3, solve: 21.7 },
      instruction: 'With a Panda arm on a mobile base, drive to a table 1.5 m away and pick up a soda can, 66 mm wide and 122 mm tall, standing on it. The can starts at a different position on that table in each of eight episodes. It counts once the can is held at least 100 mm above the table for one second.' },
    { harness: 'agentic-simulation', group: 'build', id: 'mobile-carry-pillow', source: 'Text', robot: 'Mobile Panda', name: 'Carry a pillow', blurb: 'Built from one sentence, then solved on all 8 seeds: pick up the soft pillow and carry it to the bed.', clip: true, mediaVersion: '20261028-1080p', seeds: '8/8', agent: { build: 48.4, solve: 68.0 },
      instruction: 'With a Panda arm on a mobile base, pick a pillow off a sofa and lay it on a bed 2 m away. The pillow is soft and squashes where it is gripped, and starts at a different position on the sofa in each of eight episodes. It counts once the pillow rests on the bed with the hand clear of it.' },
    { harness: 'agentic-simulation', group: 'build', id: 'thread-rope', source: 'Text', robot: 'Two YAMs', name: 'Thread a rope', blurb: 'Built from one sentence, then solved on all 8 seeds: one arm pushes the rope through the ring, the other pulls it out.', clip: true, mediaVersion: '20261028-1080p', seeds: '8/8', agent: { build: 29.9, solve: 16.2 },
      instruction: 'With a bimanual pair of YAM arms, thread a 600 mm rope, 15 mm thick, through an upright ring of 100 mm inner diameter standing on the bench. The rope and ring start at different positions in each of eight episodes. It counts once the rope passes through the ring with at least 150 mm of it on each side, and the hands are clear of it.' },
    { harness: 'real2sim', id: 'egodex', source: 'EgoDex', robot: 'Sharpa hand', group: 'hands', body: 'Sharpa Wave hand', name: 'Cube onto a plate', blurb: 'Cube onto a plate. Rebuilt from the source video by the real2sim workflow in 520 s; native MuJoCo physics, rendered in Blender.', clip: true, mediaVersion: '20261028-1080p', renderingLabel: 'Blender render of native output', rendering: 'Native MuJoCo execution rendered in Blender from the source camera, on the source clock.',
      file: 'basic_pick_place/6.mp4', models: 'Codex gpt-6.1-sol in the real2sim workflow (best of two), MuJoCo, Blender Cycles',
      stats: [['Run time', '8.7', 'min']],
      credit: { title: 'EgoDex', by: 'Apple', license: 'CC BY-NC-ND', href: 'https://github.com/apple/ml-egodex' } },
    { harness: 'real2sim', id: 'oakink2-a005-orange-mug', source: 'OakInk2', robot: 'Sharpa hand', group: 'hands', body: 'Sharpa Wave hand', name: 'Move an orange mug', blurb: 'Move an orange mug onto a mat. Rebuilt from the source video by gpt-6-astra with the default real2sim skill in 1481 s; native MuJoCo physics, rendered in Blender.', clip: true, mediaVersion: '20261029-astra', renderingLabel: 'Blender render of native output', rendering: 'Native MuJoCo execution rendered in Blender from the source camera, on the source clock.',
      file: 'scene_04 A005, right camera', models: 'Codex gpt-6-astra with the default real2sim skill, MuJoCo, Blender Cycles',
      stats: [['Agent time', '24.7', 'min']],
      credit: { title: 'OakInk2', href: 'https://oakink.net/v2/' } },
    { harness: 'real2sim', id: 'arctic-s10-ketchup', source: 'ARCTIC', robot: 'Sharpa hand', group: 'hands', body: 'Sharpa Wave hand', name: 'Lift a ketchup bottle', blurb: 'Lift a ketchup bottle off a box and set it back. Rebuilt from the source video by gpt-6-astra with the default real2sim skill in 1181 s; native MuJoCo physics, rendered in Blender.', clip: true, mediaVersion: '20261029-astra', renderingLabel: 'Blender render of native output', rendering: 'Native MuJoCo execution rendered in Blender from the source camera, on the source clock; the frame is widened to 16:9 around the portrait source.',
      file: 's10 ketchup_grab_01, view 7', models: 'Codex gpt-6-astra with the default real2sim skill, MuJoCo, Blender Cycles',
      stats: [['Agent time', '19.7', 'min']],
      credit: { title: 'ARCTIC', by: 'ETH Zürich, MPI-IS', license: 'non-commercial research', href: 'https://arctic.is.tue.mpg.de/' } },
    { harness: 'real2sim', id: 'arctic-s05-microwave-use', source: 'ARCTIC', robot: '2 × Sharpa hand', group: 'hands', body: 'Two Sharpa Wave hands', name: 'Open a microwave', blurb: 'One hand steadies a toy microwave while the other swings its door open. Rebuilt from the source video by gpt-6-astra with the default real2sim skill in 1211 s; native MuJoCo physics, rendered in Blender.', clip: true, mediaVersion: '20261029-astra3', renderingLabel: 'Blender render of native output', rendering: 'Native MuJoCo execution rendered in Blender from the source camera, on the source clock; the frame is widened to 16:9 around the portrait source.',
      file: 's05 microwave_use_01, view 7', models: 'Codex gpt-6-astra with the default real2sim skill, MuJoCo, Blender Cycles',
      stats: [['Agent time', '20.2', 'min']],
      credit: { title: 'ARCTIC', by: 'ETH Zürich, MPI-IS', license: 'non-commercial research', href: 'https://arctic.is.tue.mpg.de/' } },
    { harness: 'real2sim', id: 'dexycb-allegro', source: 'DexYCB', robot: 'Allegro hand', group: 'hands', body: 'Allegro Hand', name: 'Lift a mug', blurb: 'Lift a mug. Rebuilt from the source video by the real2sim workflow in 490 s; native MuJoCo physics, rendered in Blender.', clip: true, mediaVersion: '20261028-1080p', renderingLabel: 'Blender render of native output', rendering: 'Native MuJoCo execution rendered in Blender from the source camera, on the source clock.',
      file: '20200709_150949 mug', models: 'Codex gpt-6.1-sol in the real2sim workflow (best of two), MuJoCo, Blender Cycles',
      stats: [['Run time', '8.2', 'min']],
      credit: { title: 'DexYCB', by: 'NVIDIA', license: 'CC BY-NC 4.0', href: 'https://dex-ycb.github.io/' } },
    { harness: 'real2sim', id: 'egodex-dev-03', source: 'EgoDex', robot: '2 × Panda', group: 'robots', body: 'Two Panda arms with Robotiq 2F85', name: 'Stack three bowls', blurb: 'Stack three bowls: one arm nests two of them in the third. Rebuilt from the source video by gpt-6-astra with the default real2sim skill in 1416 s; native MuJoCo physics, rendered in Blender.', clip: true, mediaVersion: '20261029-astra', renderingLabel: 'Blender render of native output', rendering: 'Native MuJoCo execution rendered in Blender from the source camera, on the source clock.',
      file: 'test/stack_unstack_bowls/4.mp4', models: 'Codex gpt-6-astra with the default real2sim skill, MuJoCo, Blender Cycles',
      stats: [['Agent time', '23.6', 'min']],
      credit: { title: 'EgoDex', by: 'Apple', license: 'CC BY-NC-ND', href: 'https://github.com/apple/ml-egodex' } },
    { harness: 'real2sim', id: 'droid-dev-11', source: 'DROID', robot: 'Panda', group: 'robots', body: 'Panda with Robotiq 2F85', name: 'Put a marker on the table', blurb: 'Take a marker out of a mug and put it on the table. Rebuilt from the source video by gpt-6-astra with the default real2sim skill in 1488 s; native MuJoCo physics, rendered in Blender.', clip: true, mediaVersion: '20261029-astra', renderingLabel: 'Blender render of native output · 2× speed', rendering: 'Native MuJoCo execution rendered in Blender from the source camera: every second frame at 2× speed, the source video sped up to match.',
      file: 'TRI 2023-09-21 16h33m32s', models: 'Codex gpt-6-astra with the default real2sim skill, MuJoCo, Blender Cycles',
      stats: [['Agent time', '24.8', 'min']],
      credit: { title: 'DROID', href: 'https://droid-dataset.github.io/' } },
    { harness: 'real2sim', id: 'furniture-12', source: 'FurnitureBench', robot: 'Panda', group: 'robots', body: 'Panda with Robotiq 2F85', name: 'Slide a drawer into its box', blurb: 'Line a drawer up with its box, let go and push it in. Rebuilt from the source video by gpt-6-astra with the default real2sim skill in 1294 s; native MuJoCo physics, rendered in Blender.', clip: true, mediaVersion: '20261029-astra3', renderingLabel: 'Blender render of native output · 2× speed', rendering: 'Native MuJoCo execution rendered in Blender from the source camera: every second frame at 2× speed, the source video sped up to match; the frame is widened to 16:9 around the square source.',
      file: 'train shard 16, episode 0, steps 165-292', models: 'Codex gpt-6-astra with the default real2sim skill, MuJoCo, Blender Cycles',
      stats: [['Agent time', '21.6', 'min']],
      credit: { title: 'FurnitureBench', href: 'https://clvrai.github.io/furniture-bench/' } },
    { harness: 'real2sim', id: 'robodojo', source: 'RoboDojo', robot: '2 × ARX X5', group: 'robots', body: 'Two ARX X5 arms', name: 'Stack blocks', blurb: 'Stack blocks. Rebuilt from the source video by the real2sim workflow in 538 s; native MuJoCo physics, rendered in Blender.', clip: true, mediaVersion: '20261028-1080p', renderingLabel: 'Blender render of native output', rendering: 'Native MuJoCo execution rendered in Blender from the source camera, on the source clock.',
      file: 'stack_blocks_random_7_x5__r002', models: 'Codex gpt-6.1-sol in the real2sim workflow (best of two), MuJoCo, Blender Cycles',
      stats: [['Run time', '9.0', 'min']],
      credit: { title: 'RoboDojo', href: 'https://huggingface.co/datasets/RoboDojo-Benchmark/RoboDojo' } },
    {
      "harness": "motion-generation",
      "id": "g1-tea",
      "source": "Text",
      "robot": "G1",
      "group": "robots",
      "body": "Unitree G1 + Inspire hands",
      "name": "Pour tea",
      "blurb": "G1 picks up a teapot, pours tea into a cup and sets the pot back down.",
      "clip": true,
      "request": "In a bright kitchen, G1 picks up a teapot from the counter with its right hand, pours tea into a cup, and sets the teapot back down.",
      "models": "Codex gpt-6-astra, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "44.5",
          "min"
        ],
        [
          "Clip duration",
          "8.0",
          "s"
        ]
      ],
      "mediaVersion": "20261029-astra",
      "minutes": 44.5
    },
    {
      "harness": "motion-generation",
      "id": "h1-tray",
      "source": "Text",
      "robot": "H1-2",
      "group": "robots",
      "body": "Unitree H1-2 + Inspire hands",
      "name": "Carry a tray",
      "blurb": "H1-2 lifts a tray with two cups, turns, walks two steps and sets it on a table.",
      "clip": true,
      "request": "In a cafe, H1 lifts a tray holding two cups from a counter with both hands, turns, walks two steps and sets it on a table.",
      "models": "Claude, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "11.9",
          "min"
        ],
        [
          "Clip duration",
          "8.0",
          "s"
        ]
      ],
      "mediaVersion": "20261028-robot-picks",
      "minutes": 11.9
    },
    {
      "harness": "motion-generation",
      "id": "vega-apple",
      "source": "Text",
      "robot": "Vega",
      "group": "robots",
      "body": "Dexmate Vega + Sharpa hands",
      "name": "Apple into a basket",
      "blurb": "Vega rolls to the island, picks an apple from the bowl and places it in a basket.",
      "clip": true,
      "request": "In a kitchen, Vega rolls up to an island, picks an apple from a fruit bowl with its right hand, and places it in a basket beside the bowl.",
      "models": "Codex gpt-6-astra, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "42.5",
          "min"
        ],
        [
          "Clip duration",
          "9.0",
          "s"
        ]
      ],
      "mediaVersion": "20261029-astra-picks",
      "minutes": 42.5
    },
    {
      "harness": "motion-generation",
      "id": "vega-wipe-table",
      "source": "Text",
      "robot": "Vega",
      "group": "robots",
      "body": "Dexmate Vega + Sharpa hands",
      "name": "Wipe the table",
      "blurb": "Vega rolls along the table wiping it with a cloth, then folds the cloth.",
      "clip": true,
      "request": "In a dining room, Vega rolls along a table while wiping its top with a cloth in its right hand, then folds the cloth on the table.",
      "models": "Codex gpt-6-astra, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "44.9",
          "min"
        ],
        [
          "Clip duration",
          "8.0",
          "s"
        ]
      ],
      "mediaVersion": "20261029-astra",
      "minutes": 44.9
    },
    {
      "harness": "motion-generation",
      "id": "h1-coffee",
      "source": "Video",
      "robot": "H1-2",
      "group": "robots",
      "body": "Unitree H1-2 + Inspire hands",
      "name": "Pour coffee",
      "blurb": "H1-2 pours coffee from a pot into a cup on a saucer, timed against the source clip.",
      "clip": true,
      "request": "H1 copies the man on the left in the source clip, who pours coffee from a pot into a cup on a saucer held in his other hand, with the same timing.",
      "models": "Codex gpt-6-astra, RoboKit, Blender",
      "credit": {
        "title": "Time For Coffee",
        "by": "Prelinger Archives",
        "license": "public domain",
        "href": "https://archive.org/details/TimeForCoffe"
      },
      "stats": [
        [
          "Total time",
          "44.2",
          "min"
        ],
        [
          "Clip duration",
          "6.0",
          "s"
        ]
      ],
      "mediaVersion": "20261029-astra",
      "minutes": 44.2
    },
    {
      "harness": "motion-generation",
      "id": "kitchen-bottle",
      "source": "Text",
      "robot": "G1",
      "group": "robots",
      "body": "Unitree G1 + Inspire hands",
      "name": "Bottle to sink",
      "blurb": "G1 picks up a bottle from the kitchen table, carries it to the sink and sets it down upright.",
      "clip": true,
      "request": "In a kitchen, G1 grasps a bottle from the table, lifts and carries it upright to the sink, places it in the sink, releases and withdraws.",
      "models": "Codex gpt-6-astra, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "43.7",
          "min"
        ],
        [
          "Clip duration",
          "8.0",
          "s"
        ]
      ],
      "mediaVersion": "20261029-astra-picks",
      "minutes": 43.7
    },
    {
      "harness": "motion-generation",
      "id": "cane-dance",
      "source": "Video",
      "robot": "Jackie",
      "group": "characters",
      "body": "Mixamo Jackie",
      "name": "Cane dance",
      "blurb": "Jackie reconstructs the dancer’s moves and cane handling across the full fifteen-second clip.",
      "clip": true,
      "mediaVersion": "20261025-approved-reruns",
      "request": "Reconstruct the dancer and cane in the complete fifteen-second source excerpt on Jackie; preserve choreography and timing.",
      "file": "cane-dance.mp4",
      "models": "Claude, GVHMR, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "18.9",
          "min"
        ],
        [
          "Clip duration",
          "15.0",
          "s"
        ]
      ],
      "minutes": 18.9
    },
    {
      "harness": "motion-generation",
      "id": "street-dance",
      "source": "Video",
      "robot": "G1 + Jackie",
      "group": "characters",
      "body": "Unitree G1 (Inspire hands) + Mixamo Jackie",
      "name": "Studio dance duet",
      "blurb": "The G1 and Jackie perform both dancers’ choreography from Feel It Still.",
      "clip": true,
      "mediaVersion": "20261030-g1-grey",
      "request": "The Unitree G1 with Inspire hands copies the back-left dancer and Jackie the front-right dancer throughout the complete 15-second Feel It Still excerpt.",
      "file": "feel_it_still.mp4",
      "models": "Codex gpt-6-astra, GVHMR, WiLoR, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "40.1",
          "min"
        ],
        [
          "Clip duration",
          "15.0",
          "s"
        ]
      ],
      "credit": {
        "title": "Feel It Still · Ara Cho choreography",
        "by": "1MILLION Dance Studio; excerpt 00:10–00:25",
        "href": "https://www.youtube.com/watch?v=t3Wl8d_PhcM"
      },
      "minutes": 40.1
    },
    {
      "harness": "motion-generation",
      "id": "h1-box",
      "source": "Text",
      "robot": "H1-2",
      "group": "robots",
      "body": "Unitree H1-2 + Inspire hands",
      "name": "Carry a box",
      "blurb": "H1-2 takes a box from a shelf, carries it three metres and sets it on a table.",
      "clip": true,
      "request": "In a storage room, H1-2 takes a40×30×25cm cardboard box from the middle shelf with both hands, carries it to the table about3m away, sets it down and withdraws.",
      "models": "Claude, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "28.1",
          "min"
        ],
        [
          "Clip duration",
          "13.6",
          "s"
        ]
      ],
      "mediaVersion": "20261025-approved-reruns",
      "minutes": 28.1
    },
    {
      "harness": "motion-generation",
      "id": "ch21-wave",
      "source": "Text",
      "robot": "Josh",
      "group": "characters",
      "body": "Mixamo Josh",
      "name": "Sit, stand, wave",
      "blurb": "Josh sits on a chair, rests, stands up and waves goodbye.",
      "clip": true,
      "request": "Mixamo Josh sits on a chair, rests, stands, and waves goodbye with the right hand.",
      "models": "Claude, Kimodo, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "25.1",
          "min"
        ],
        [
          "Clip duration",
          "9.5",
          "s"
        ]
      ],
      "mediaVersion": "20261025-approved-reruns",
      "minutes": 25.1
    },
    {
      "harness": "motion-generation",
      "id": "remy-kick",
      "source": "Text",
      "robot": "Shannon",
      "group": "characters",
      "body": "Mixamo Shannon",
      "name": "Soccer kick",
      "blurb": "Shannon runs up and kicks a soccer ball into the goal on a marked grass pitch.",
      "clip": true,
      "request": "Mixamo Shannon runs up and kicks a soccer ball into a goal eight metres beyond it, on an outdoor football pitch.",
      "models": "Claude, Kimodo, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "34.0",
          "min"
        ],
        [
          "Clip duration",
          "5.0",
          "s"
        ],
        [
          "Outdoor rerender",
          "5.0",
          "min"
        ],
        [
          "Presentation update",
          "3.3",
          "min"
        ]
      ],
      "mediaVersion": "20261025-presentation3",
      "minutes": 34
    },
    {
      "harness": "motion-generation",
      "id": "ch29-bench",
      "source": "Photo",
      "robot": "Pete",
      "group": "characters",
      "body": "Mixamo Pete",
      "name": "Read on a bench",
      "blurb": "Pete walks to the park bench, sits down, opens a book and reads.",
      "clip": true,
      "request": "Pete walks to the red park bench reconstructed from the supplied photo, sits, opens a book and reads throughout the complete15-second action.",
      "models": "Claude, Kimodo, RoboKit, Blender",
      "credit": {
        "title": "Sunndalsøra chat bench (IMG 9824)",
        "by": "Wolfmann",
        "license": "CC BY-SA 4.0; this clip is CC BY-SA 4.0 too",
        "href": "https://commons.wikimedia.org/wiki/File:SUNNDALS%C3%98RA_Sunndal_Norway_2024-09-13_R%C3%B8dmalt_parkbenk_i_sentrum_Samtalebenk_R%C3%B8de_Kors%27_150-%C3%A5rsjubileum_2015_Sett_deg_ned._Sl%C3%A5_av_en_prat._Norwegian_Red_Cross_campaign_for_a_warmer_society_Chat_bench_IMG_9824.jpg"
      },
      "stats": [
        [
          "Total time",
          "39.4",
          "min"
        ],
        [
          "Clip duration",
          "10.0",
          "s"
        ],
        [
          "Presentation update",
          "14.2",
          "min"
        ]
      ],
      "mediaVersion": "20261028-1080p",
      "minutes": 39.4
    },
    {
      "harness": "motion-generation",
      "id": "xbot-cartwheel",
      "source": "Video",
      "robot": "Shannon",
      "group": "characters",
      "body": "Mixamo Shannon",
      "name": "Cartwheel",
      "blurb": "Shannon reconstructs the complete cartwheel from the source video.",
      "clip": true,
      "request": "Mixamo Shannon copies the complete cartwheel video, retaining its timing.",
      "models": "Claude, GVHMR, RoboKit, Blender",
      "credit": {
        "title": "Cartwheel at Notre Dame",
        "by": "Eugene Kim",
        "license": "CC BY 2.0",
        "href": "https://www.flickr.com/photos/63669472@N00/3066549559/"
      },
      "stats": [
        [
          "Total time",
          "11.9",
          "min"
        ],
        [
          "Clip duration",
          "4.3",
          "s"
        ]
      ],
      "mediaVersion": "20261025-approved-reruns",
      "minutes": 11.9
    },
    {
      "harness": "motion-generation",
      "id": "ch22-taichi",
      "source": "Video",
      "robot": "Sporty Granny",
      "group": "characters",
      "body": "Mixamo Sporty Granny",
      "name": "Tai chi",
      "blurb": "Sporty Granny performs the complete tai chi form recovered from the source video.",
      "clip": true,
      "mediaVersion": "20261028-1080p",
      "request": "Mixamo Sporty Granny copies the complete ten-second tai chi form, preserving its timing. Show the original video beside the character.",
      "minutes": 9.8,
      "revisions": 0,
      "models": "GVHMR, RoboKit character retargeting, Blender matte studio",
      "stats": [
        [
          "Pipeline run",
          "9.8",
          "min"
        ],
        [
          "Body recovery",
          "44",
          "s"
        ],
        [
          "Final rendering",
          "6.7",
          "min"
        ],
        [
          "Clip duration",
          "10",
          "s"
        ]
      ],
      "credit": {
        "title": "Tai Chi Arround the World (Cap 4) Funchal",
        "by": "Todo Tai Chi",
        "license": "CC BY 3.0",
        "href": "https://commons.wikimedia.org/wiki/File:Tai_Chi_Arround_the_World_(Cap_4)_Funchal.webm"
      }
    },
    {
      "harness": "motion-generation",
      "id": "fan-duet-36",
      "source": "Video",
      "robot": "Elizabeth + Jackie",
      "group": "characters",
      "body": "Mixamo Elizabeth + Jackie",
      "name": "Fan duet",
      "blurb": "Elizabeth and Jackie reconstruct both dancers and their folding fans.",
      "request": "Reconstruct both dancers and both folding fans in the complete thirteen-second source video; preserve choreography and timing.",
      "models": "Claude, GVHMR, RoboKit, Blender",
      "stats": [
        [
          "Total time",
          "25.1",
          "min"
        ],
        [
          "Clip duration",
          "13.0",
          "s"
        ]
      ],
      "credit": {
        "href": "https://www.youtube.com/watch?v=Zoxo92I81H8",
        "title": "霍元甲 · YASI",
        "by": "TranScend全盛舞蹈工作室",
        "license": "External reference video; rights remain with its owner"
      },
      "mediaVersion": "20261028-1080p",
      "clip": true,
      "minutes": 25.1,
      "file": "fan-dance.mp4"
    },
    { harness: 'auto-research', id: 'bimanual-lifting', source: 'Robosuite', robot: 'Two Pandas', name: 'Bimanual lifting', clip: true, mediaVersion: '20261028-1080p',
      blurb: 'The first policy missed both development seeds; its revision lifts the pot on every check.',
      instruction: 'Lift the pot with both arms.',
      research: { minutes: 12, calls: 3, phases: [['First policy', '0/2'], ['Development', '2/2'], ['Validation', '2/2'], ['Fresh check', '3/3']],
        clip: 'Fresh-check seed 5. Its recorded native actions replayed 3/3 in today\'s Robosuite runtime without a model; Blender renders the replay.' } },
    { harness: 'auto-research', id: 'libero-basket', source: 'LIBERO-Pro', robot: 'Panda', name: 'Both into the basket', clip: true, mediaVersion: '20261027-aap-light2',
      blurb: 'Put both the cream cheese and the tomato sauce in the basket.',
      instruction: 'Put both the cream cheese and the tomato sauce in the basket.',
      research: { minutes: 167, calls: 14, phases: [['Development', '15/15'], ['Validation', '5/5'], ['Fresh check', '5/5']],
        clip: 'Five campaigns, each starting from the last selected policy; the last took 54 min and 2 model calls. Fresh-check seed 251 was played again without a model in the campaign\'s recorded runtime, whose tool API has since changed. Its native actions replayed 3/3; Blender renders the replay.' } },
    { harness: 'auto-research', id: 'dual-bottles', source: 'RoboTwin', robot: 'ALOHA AgileX', name: 'Dual bottle pickup', clip: true, mediaVersion: '20261027-aap-light2',
      blurb: 'Simultaneously pick up one bottle with each arm.',
      instruction: 'Simultaneously pick up one bottle with each arm.',
      research: { minutes: 17, calls: 3, phases: [['First policy', '0/2'], ['Development', '2/2'], ['Selection', '1/1'], ['Fresh check', '0/1']],
        clip: 'Development seed 704010, played again without a model; the frozen policy also succeeded again on 704011 and 704014, and missed its right-hand grasp on the fresh check. It ran in the 21 October runtime, as today\'s host environment cannot plan and grasp with its pinned libraries. Its native actions replayed 3/3 in today\'s RoboTwin image; Blender renders the replay.' } },
    { harness: 'auto-research', id: 'cover-blocks', source: 'RoboDojo', robot: 'ARX X5', name: 'Cover blocks', clip: true, mediaVersion: '20261028-1080p',
      blurb: 'Cover the blocks from left to right, remember their colors, then uncover them in the order: red, green, and blue.',
      instruction: 'Cover the blocks from left to right, remember their colors, then uncover them in the order: red, green, and blue.',
      research: { minutes: 48, calls: 41, phases: [['Original method', '0–1/5'], ['Fresh layouts', '5/5']],
        clip: 'In each fresh layout a live agent ran the frozen script and lessons; layout 43 took it 9 turns. That episode\'s recorded native actions replayed 3/3 without a model; Blender renders the replay.' } },
  ],
};
