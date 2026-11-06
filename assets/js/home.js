// Landing page. No active nav entry — the brand mark is this page's own link.
rkRenderNav();
rkVideoFallback();

// The teaser is four 4 s shots back to back, one per kit, in tab order.
const SHOT = 4;
const root = document.documentElement;
const video = document.querySelector('.hero-media--video');
const tabs = [...document.querySelectorAll('.kit-tabs [data-kit]')];
const demos = [...document.querySelectorAll('[data-overview-kit]')];
// the tiles stand in for the tabs in portrait, so they carry the same progress
const demoFor = tabs.map(tab => demos.find(demo => demo.dataset.overviewKit === tab.dataset.kit));
const cta = document.querySelector('[data-kit-cta]');
const install = document.querySelector('.install');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
let shown = -1;

for (const tab of tabs) {
  tab.style.setProperty('--kit-accent', window.RK_THEMES[tab.dataset.kit].accent);
}
for (const demo of demos) {
  demo.style.setProperty('--demo-accent', window.RK_THEMES[demo.dataset.overviewKit].accent);
  if (still) {
    const clip = demo.querySelector('video');
    clip.autoplay = false;
    clip.pause();
  }
}

// GraspKit's shot sits as much higher as its own hero does.
const LIFT = { robokit: '0%', retargetingkit: '0%', graspkit: '-3%', roboskills: '0%' };

// Apply each kit's colours, labels and lift together on its first displayed frame.
function show(i) {
  const key = tabs[i].dataset.kit;
  const t = window.RK_THEMES[key];
  // grey text drops under 4.5:1 on the tinted bands, so it darkens off the default one
  const muted = t.band === '#FAFAF8' ? '' : t.labelMuted || '#56647A';
  const vars = {
    '--band': t.band, '--accent': t.accent,
    '--chip-bg': t.chipBg || '', '--chip-fg': t.chipFg || '',
    '--cta-bg': t.ctaBg || '', '--cta-fg': t.ctaFg || '',
    '--muted': muted, '--nav-muted': muted,
    '--fade0': `rgba(${t.rgb},0.78)`, '--fade1': `rgba(${t.rgb},0.40)`, '--fade2': `rgba(${t.rgb},0)`,
    '--teaser-lift': LIFT[key],
  };
  for (const [name, value] of Object.entries(vars)) root.style.setProperty(name, value);
  tabs.forEach((tab, j) => {
    tab.dataset.current = String(i === j);
    tab.querySelector('button').setAttribute('aria-pressed', String(i === j));
  });
  demos.forEach(demo => demo.setAttribute('aria-pressed', String(demo.dataset.overviewKit === key)));
  cta.href = `/${key}/`;
  cta.querySelector('.label').textContent = `Explore ${window.RK_NAMES[key]}`;
  install.dataset.copy = window.RK_PROJECTS[key].install;
  install.querySelector('.t').textContent = install.dataset.copy;
}
function updateKit(time) {
  const i = Math.min(tabs.length - 1, Math.floor(time / SHOT));
  if (i !== shown) {
    shown = i;
    show(i);
  }
  const p = Math.min(1, time / SHOT - i);
  tabs[i].style.setProperty('--p', p);
  demoFor[i].style.setProperty('--p', p);
}
// The playback clock can run ahead of the frame actually shown by the browser.
function tick(_, frame) {
  updateKit(frame.mediaTime);
  video.requestVideoFrameCallback(tick);
}
function selectKit(i) {
  video.currentTime = i * SHOT + (still ? 1 : 0);
  if (!still) video.play().catch(() => {});
}
tabs.forEach((tab, i) => tab.querySelector('button').addEventListener('click', () => selectKit(i)));
demos.forEach(demo => demo.addEventListener('click', () => {
  selectKit(tabs.findIndex(tab => tab.dataset.kit === demo.dataset.overviewKit));
}));
shown = 0;
show(0);
video.requestVideoFrameCallback(tick);
if (still) {
  video.autoplay = false;
  video.pause();
  video.currentTime = 1;
}
