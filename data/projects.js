window.RK_THEMES = {
  roboskills:     { accent: '#4C4FA6', band: '#EEEEF8', rgb: '238,238,248', tintSoft: '#F5F5FB',
                    chipFg: '#FFFFFF',
                    hoverBg: '#E0E0F0', barBg: '#F4F4FA', labelMuted: '#585D78', codeComment: '#676B83' },
};

window.RK_VIDEOS = {};

window.RK_STILLS = {};

window.RK_HERO_REELS = {};

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
