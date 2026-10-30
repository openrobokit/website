// Renders a project page from its entry in data/projects.js. The page itself is
// a stub that names the project in window.RK_PROJECT; everything below is the
// same for every kit.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);

const key = window.RK_PROJECT;
const kit = window.RK_PROJECTS[key];
const theme = window.RK_THEMES[key];
const api = kit.api;

document.body.classList.add(`project--${key}`);
if (key !== 'robokit') document.body.classList.add('project--legacy');
document.documentElement.style.setProperty('--accent', theme.accent);
// kits without their own counter-hue just reuse the accent
document.documentElement.style.setProperty('--pop', theme.pop || theme.accent);
if (theme.chipBg) document.documentElement.style.setProperty('--chip-bg', theme.chipBg);
if (theme.chipFg) document.documentElement.style.setProperty('--chip-fg', theme.chipFg);
if (theme.ctaBg) document.documentElement.style.setProperty('--cta-bg', theme.ctaBg);
if (theme.ctaFg) document.documentElement.style.setProperty('--cta-fg', theme.ctaFg);
// the neutrals the legacy colourway leaves to the kit; unset falls back to its
// sand defaults in project.css
if (theme.hoverBg) document.documentElement.style.setProperty('--hover-bg', theme.hoverBg);
if (theme.barBg) document.documentElement.style.setProperty('--bar-bg', theme.barBg);
if (theme.labelMuted) document.documentElement.style.setProperty('--label-muted', theme.labelMuted);
if (theme.codeComment) document.documentElement.style.setProperty('--code-comment', theme.codeComment);
if (theme.slash) document.documentElement.style.setProperty('--slash', theme.slash);
if (theme.slashShadow) document.documentElement.style.setProperty('--slash-shadow', theme.slashShadow);
if (theme.videoFit) document.documentElement.style.setProperty('--hero-vid-tf', theme.videoFit);
if (theme.portraitPos) document.documentElement.style.setProperty('--hero-portrait-pos', theme.portraitPos);
if (theme.videoTone) document.documentElement.style.setProperty('--hero-vid-filter', theme.videoTone);
document.documentElement.style.setProperty('--accent-lite', theme.accentLite || theme.accent);
document.documentElement.style.setProperty('--band', theme.band);
document.documentElement.style.setProperty('--tint-soft', theme.tintSoft);
document.documentElement.style.setProperty('--fade0', `rgba(${theme.rgb},0.78)`);
document.documentElement.style.setProperty('--fade1', `rgba(${theme.rgb},0.40)`);
document.documentElement.style.setProperty('--fade2', `rgba(${theme.rgb},0)`);

rkRenderNav(key);

const eyebrow = (t) => `<div class="band__eyebrow">${(Array.isArray(t) ? t : [t]).map((label) => `<span class="chip">${esc(label)}</span>`).join('')}<span class="rule"></span></div>`;

// Preserve upstream marks; use capability icons when no project logo is available.
const SKILL_ICONS = {
  calibration: '<path d="M9 6l1-3h4l1 3"/><rect x="3" y="6" width="18" height="15" rx="3"/><path d="M12 10v7m-3-3 3 3 3-3"/>',
  hand: '<path d="M8 13V5a1.5 1.5 0 0 1 3 0v6-8a1.5 1.5 0 0 1 3 0v8-6a1.5 1.5 0 0 1 3 0v7-4a1.5 1.5 0 0 1 3 0v7a7 7 0 0 1-12 5l-4-5a1.5 1.5 0 0 1 2-2l2 2"/>',
  human: '<circle cx="12" cy="4" r="2"/><path d="m5 9 7-1 7 1M12 8v6m-4 7 4-7 4 7"/>',
};
const skillIcon = (t) => `<span class="band__tile-icon${t.logo ? ' band__tile-icon--logo' : ''}" aria-hidden="true" title="${esc(t.logoLabel || t.name)}">${t.logo
  ? `<img src="${esc(t.logo)}" alt="" width="28" height="28" loading="lazy" />`
  : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${SKILL_ICONS[t.icon] || ''}</svg>`}</span>`;

// ---------- imported footage ----------
// A page can carry forty-odd clips, which cannot all be in flight at once, so
// every clip below ships without a src: the observer at the bottom of this
// file gives it one when it comes within a screen of the viewport. Until then
// the poster stands in, and the box it sits in is already the right size, so
// nothing moves when the video finally arrives.
const clip = (o) =>
  `<video class="${o.follower ? 'stage__follower' : 'lz'}" data-src="${o.src}" poster="${o.poster}" muted loop playsinline preload="none" ${o.controls ? `controls aria-label="${esc(o.label || 'Robot task video')}"` : 'aria-hidden="true"'}></video>`;

// The bench legend's vocabulary, reused wherever two clips are a comparison:
// a filled dot for the kit, a hollow one for the baseline, an outline for the
// motion that went in.
const toneDot = (t) => (t ? `<i class="dot dot--${t}"></i>` : '');

const tile = (o) => `
  <figure class="tile${o.wide ? ' is-wide' : ''}">
    <div class="tile__frame">${clip(o)}</div>
    <figcaption>${toneDot(o.tone)}${esc(o.label)}</figcaption>
  </figure>`;

// One capability per band, one 16:9 stage per band. Everything else — the
// scene name, the provenance line, the image-only picker — is laid over the
// footage, so nothing competes with it for width. The picker shows position
// and reach at once, so neither arrows nor an "n of m" counter add anything.
function showcaseCard(group, groupIndex) {
  const many = group.items.length > 1;
  const first = group.items[0];
  const loops = group.advance === 'timer' || group.advance === 'loop';
  return `
    <article class="motion-card motion-card--${group.id}${many ? ' has-reel' : ' is-single'}" data-motion-reel="${groupIndex}">
      <div class="motion-stage" id="motion-stage-${group.id}">
        <img class="motion-stage__poster" data-motion-poster src="${first.poster}" alt="" width="${group.width}" height="${group.height}" loading="lazy" />
        ${group.items.map((item, i) => `
          <video class="motion-stage__clip${i === 0 ? ' is-active' : ''}" data-src="${item.src}" poster="${item.poster}" muted ${loops ? 'loop ' : ''}playsinline preload="none" aria-hidden="true"></video>`).join('')}

        <div class="motion-stage__caption">
          <span class="motion-stage__scene" data-motion-label>${esc(first.label)}</span>
          ${group.speed ? `<span class="motion-stage__rate">${esc(group.speed)}</span>` : ''}
          ${group.tag ? `<span class="motion-stage__tag">${esc(group.tag)}</span>` : ''}
        </div>

        ${many ? `
          <div class="motion-picker" role="group" aria-label="${esc(group.name)} scenes">
            ${group.items.map((item, i) => `
              <button type="button" class="motion-picker__item${i === 0 ? ' is-active' : ''}" data-motion-scene="${i}" aria-label="Show ${esc(item.label)}" aria-pressed="${i === 0}" aria-controls="motion-stage-${group.id}" style="background-image:url('${item.poster}')"></button>`).join('')}
          </div>` : ''}
      </div>
      <p class="motion-card__announce" data-motion-announcer aria-live="polite"></p>
    </article>`;
}

// A group gets a band to itself, with its own eyebrow and headline.
function showcaseSection(group, groupIndex) {
  const titleId = `showcase-title-${group.id}`;
  return `
  <section class="band showcase" id="${group.anchor || group.id}" aria-labelledby="${titleId}">
    <div class="band__in">
      ${eyebrow(group.label)}
      <div class="showcase__head">
        <h2 id="${titleId}">${esc(group.h)}${group.sub ? ` <span class="showcase__sub">${esc(group.sub)}</span>` : ''}</h2>
      </div>
      <div class="motion-board">
        ${showcaseCard(group, groupIndex)}
      </div>
    </div>
  </section>`;
}

// Projects share the media stage, with optional batch or playback controls.
function scaleSection(s) {
  const task = s.tasks[0];
  const initialIndex = s.initialStep ?? task.steps.length - 1;
  const initial = task.steps[initialIndex];
  return `
  <section class="band scale${s.timing ? ' scale--timed' : ''}${initial.mobileVideo ? ' scale--responsive' : ''}" id="${s.id || 'scale'}" aria-labelledby="scale-title">
    <div class="band__in">
      ${eyebrow(s.label || 'Scalable optimization')}
      <div class="scale__head">
        <h2 id="scale-title">${esc(s.h)}</h2>
        ${s.lead ? `<p class="scale__lead">${esc(s.lead)}</p>` : ''}
      </div>
      <div class="scale__demo">
        <div class="scale__tasks" style="--scale-tasks:${s.tasks.length}" role="group" aria-label="${esc(s.taskLabel || 'Optimization task')}">
          ${s.tasks.map((item, i) => `<button type="button" data-task="${i}" class="${i === 0 ? 'is-active' : ''}" aria-pressed="${i === 0}" aria-controls="scale-stage">${esc(item.label)}</button>`).join('')}
        </div>
        <div class="scale__stage" id="scale-stage">
          ${s.tasks.flatMap((item, taskIndex) => item.steps.map((step, stepIndex) => {
            const active = taskIndex === 0 && stepIndex === initialIndex;
            return `<video class="scale__clip${active ? ' is-active' : ''}" data-task="${taskIndex}" data-step="${stepIndex}" ${s.lazy ? 'data-src' : 'src'}="${step.video}" poster="${step.poster}" ${active && !s.lazy ? 'autoplay ' : ''}muted ${item.loop === false ? '' : 'loop '}playsinline preload="${s.lazy ? 'none' : 'metadata'}" aria-hidden="true"></video>`;
          })).join('')}
          ${s.showCount !== false ? `<div class="scale__count${s.timing ? ' scale__count--timed' : ''}" aria-live="polite"><div><strong id="scale-count">${initial.batch.toLocaleString()}</strong><span id="scale-count-label">${esc(task.unit)}</span></div>${s.timing ? `<div class="scale__timing"><b id="scale-seconds" title="${esc(task.timeDetails)}">${initial.seconds.toFixed(4)} s</b><span id="scale-time-unit">${esc(task.timeUnit)}</span><small>${esc(s.timing.hardware)}</small></div>` : ''}</div>` : ''}
        </div>
        ${s.tasks.some(item => item.playbackControl) ? `<div class="scale__footer" data-scale-footer${task.playbackControl ? '' : ' hidden'}>
          <p class="scale__caption" data-scale-caption>${esc(initial.description || '')}</p>
          <button type="button" class="scale__playback" data-scale-playback aria-label="Pause animation">Pause</button>
        </div>` : ''}
        <div class="scale__control"${s.showControl === false ? ' hidden' : ''}>
          <div class="scale__range" id="scale-range">
            <input type="range" min="0" max="${task.steps.length - 1}" value="${initialIndex}" step="1" aria-label="${esc(task.label)} batch size" aria-valuetext="${initial.batch.toLocaleString()} ${esc(task.unit)}" aria-controls="scale-stage" />
            <div class="scale__ticks">${task.steps.map((step, i) => `<button type="button" data-step="${i}" style="--p:${i / Math.max(1, task.steps.length - 1)}" class="${i === initialIndex ? 'is-active' : ''}" aria-label="Show ${step.batch.toLocaleString()} ${esc(task.unit)}" aria-pressed="${i === initialIndex}">${step.batch.toLocaleString()}</button>`).join('')}</div>
          </div>
          ${s.note ? `<p class="scale__note">${s.timing ? `<span id="scale-workload">${esc(task.timeDescription)}</span> · ` : ''}${esc(s.note)}${s.timing?.href ? ` <a href="${s.timing.href}">Measurements</a>` : ''}</p>` : ''}
        </div>
      </div>
    </div>
  </section>`;
}

function section(s) {
  const paras = (s.paras || []).map((p) => `<p>${esc(p)}</p>`).join('');
  const linkPara = s.links
    ? `<p>${esc(s.linkLead)} ${s.links.map((l) => `<a href="${l.href}">${esc(l.label)}</a>${esc(l.sep)}`).join('')}</p>`
    : '';
  const cards = s.cards
    ? `<div class="cards" style="grid-template-columns:${s.cardCols || 'repeat(3,1fr)'}">` +
      s.cards.map((c) => `<div><span class="kicker">${esc(c.kicker)}</span><span class="name">${esc(c.name)}</span><span class="desc">${esc(c.desc)}</span></div>`).join('') +
      `</div>` : '';
  const bullets = s.bullets ? `<ul class="bullets">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : '';
  const callout = s.callout
    ? `<div class="callout"><div class="callout__bar"></div><div class="callout__body"><span class="t">★ rule of thumb</span>${esc(s.callout)}</div></div>`
    : '';
  const code = s.codeLines
    ? `<div class="code" data-copy-scope>
         <div class="code__bar"><span class="file">${esc(s.codeFile)}</span><button type="button" class="copy copy--swap" data-copy-from=".code__body" title="Click to copy"><span class="t">⧉ copy</span><span class="o">&#10003; copied</span></button></div>
         <div class="code__body">${s.codeLines.map((l) => `<div class="${l.comment ? 'c' : ''}">${esc(l.text) || '&nbsp;'}</div>`).join('')}</div>
       </div>` : '';
  return `
    <section class="sec">
      <div class="sec__label"><span class="n">${esc(s.n)}</span>${esc(s.label)}</div>
      <div style="min-width:0">
        <h2>${esc(s.h)}</h2>
        ${paras}${linkPara}${cards}${bullets}${callout}${code}
      </div>
    </section>`;
}


// The capability grid, as a justified row of frames or a fixed grid of cards.
function bentoSection(b) {
  return `  <section class="band bento${b.photo ? ' bento--photo' : ''}${b.rows ? ' bento--justified' : ''}${b.pills ? ' bento--pills' : ''}" id="${esc(b.id || 'bento')}">
    <div class="band__in">
      ${eyebrow(b.label || 'Capabilities')}
      <h2>${esc(b.h)}</h2>
      ${b.rows ? b.rows.map((row) => `
        <div class="bento__row">
          ${row.map((c) => `
            <article style="--ar:${c.ar}">
              <div class="bento__frame" style="aspect-ratio:${c.ar}"${c.clips ? ` data-bento-reel="${c.dwell || 6000}"` : ''}>
                ${c.still ? `<img class="card-media card-still" src="${c.still}" alt="" />` : ''}
                ${c.clips ? `<img class="card-media card-still" src="${c.clips[0].still}" alt="" />` +
                  c.clips.map((k, i) => `<video class="card-media card-video card-clip${i === 0 ? ' is-active' : ''}" data-src="${k.video}" poster="${k.still}" muted loop playsinline preload="none" aria-hidden="true"></video>`).join('') : ''}
                ${c.video ? `<video class="card-media card-video" src="${c.video}" autoplay muted loop playsinline aria-hidden="true" data-fallback></video>` : ''}
              </div>
              <div class="card-label"><h3>${esc(c.name)}</h3></div>
            </article>`).join('')}
        </div>`).join('') : `
      <div class="bento__grid">
        ${(b.cards || []).map((c) => {
          // renders sit on the page ground and are framed by transform; camera
          // frames are framed by which part of the picture is kept instead
          const fit = `--card-fit:${c.fit || 'scale(1)'}${c.pos ? `;--card-pos:${c.pos}` : ''}`;
          // input → output pills over the footage's top edge, the output in the accent
          const flow = c.flow && c.flow.map((group, i) => `${i ? '<i aria-hidden="true">→</i>' : ''}${group.map((x) =>
            `<span${i === c.flow.length - 1 ? ' class="is-out"' : ''}>${esc(x)}</span>`).join('')}`).join('');
          return `
          <article class="${c.wide ? 'wide' : ''}${c.placeholder ? ' is-placeholder' : ''}">
            ${c.href ? `<a class="card-link" href="${c.href}" aria-label="${esc(c.name)}"></a>` : ''}
            ${c.placeholder ? `<span class="card-placeholder">${esc(c.placeholder)}</span>` : ''}
            ${c.still ? `<img class="card-media card-still" src="${c.still}" alt="" style="${fit}" />` : ''}
            ${c.video ? `<video class="card-media card-video" src="${c.video}" autoplay muted loop playsinline aria-hidden="true" data-fallback style="${fit}"></video>` : ''}
            ${flow ? `<p class="card-flow">${flow}</p>` : ''}
            <div class="card-label"><h3>${esc(c.name)}</h3></div>
          </article>`;
        }).join('')}
      </div>`}
      ${b.tiles ? `
      <div class="band__tiles">${eyebrow(b.tiles.label)}
        <div class="band__tiles-grid">${b.tiles.items.map((t) => `
          <div><div class="band__tile-head">${skillIcon(t)}<b>${esc(t.name)}</b></div><span class="band__tile-desc">${esc(t.desc)}</span><small>${esc(t.note)}</small></div>`).join('')}
        </div>
      </div>` : ''}
    </div>
  </section>`;
}

// Stage inputs reuse the reviewed run's request and published source media.
function stageInput(variant) {
  const run = (window.RK_SHOWCASE?.runs || []).find((r) => `${r.harness}/${r.id}` === variant.run);
  if (!run) return '';
  const version = run.mediaVersion ? `?v=${encodeURIComponent(run.mediaVersion)}` : '';
  const poster = `/assets/images/showcase/${variant.run}-input.webp${version}`;
  const body = run.source === 'Text' ? `<blockquote>${esc(run.request)}</blockquote>`
    : run.source === 'Video' ? clip({ src: `/assets/videos/showcase/${variant.run}-input.mp4${version}`, poster, follower: true })
    : `<img src="${poster}" alt="Input photo for ${esc(run.name)}" loading="lazy" />`;
  return `<figcaption>${run.source === 'Text' ? 'Prompt' : `${esc(run.source)} reference`}</figcaption><div class="stage__input-body">${body}</div>`;
}

// A stage's agent sidebar, in the Agent section's glass: the variant's showcase record and the harness's steps.
const stageRun = (variant) => (window.RK_SHOWCASE?.runs || []).find((r) => `${r.harness}/${r.id}` === variant.run);
const stageStatus = (st, variant) => {
  const time = stageRun(variant)?.stats?.find(([k]) => /time/i.test(k));
  return time ? `${st.sidebar.verb} ${time[1]} ${time[2]}` : '';
};
const stageRecord = (st, variant) => {
  const run = stageRun(variant);
  const steps = st.sidebar.steps;
  return `${run ? `<div class="agent__record-head">${[run.source, run.body || run.robot, run.file].filter(Boolean).map((p) => `<span>${esc(p)}</span>`).join('')}</div>
    <p class="agent__description">${esc(run.blurb)}</p>` : ''}<span class="agent__context">${esc(st.sidebar.context)}</span>
    <ol class="agent__steps">${steps.map(([label, note], i) => `
      <li><div class="agent__step${i === steps.length - 1 ? ' is-current' : ''}"><div class="stage__step-head"><span class="agent__step-head"><span class="agent__step-n">${String(i + 1).padStart(2, '0')}</span><b>${esc(label)}</b></span></div><p class="agent__step-note">${esc(note.replace('{models}', run?.models || 'the models it needs'))}</p></div></li>`).join('')}</ol>
    ${run ? `<a class="agent__record-link" href="/roboskills/showcase/run/?id=${variant.run.split('/').map(encodeURIComponent).join('/')}">View full run <span aria-hidden="true">↗</span></a>` : ''}`;
};
const stageSidebar = (st, variant) => `
        <aside class="agent__sidebar stage__sidebar" aria-label="${esc(st.sidebar.title)}">
          <button type="button" class="agent__progress-toggle" aria-expanded="true" aria-controls="${esc(st.id)}-agent">
            <span class="agent__avatar" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="6" width="14" height="13" rx="4"/><path d="M12 3v3M2 10v5m20-5v5M9 15h6"/><circle cx="9" cy="11" r=".5"/><circle cx="15" cy="11" r=".5"/></svg></span>
            <span class="agent__progress-title"><strong>${esc(st.sidebar.title)}</strong><small data-stage-status>${esc(stageStatus(st, variant))}</small></span>
            <span class="agent__percent">${esc(st.sidebar.badge)}</span><svg class="agent__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 14 5-5 5 5"/></svg>
          </button>
          <div class="agent__progress-body" id="${esc(st.id)}-agent"><div class="agent__record" data-stage-record>${stageRecord(st, variant)}</div></div>
        </aside>`;

// One clip per band, with optional input media and variants to swap in.
function stageSection(st) {
  // `picker: 'tabs'` swaps variants from a tab tray on a card, instead of the
  // poster buttons under the frame; tags name the frame's equal columns.
  const tabs = st.picker === 'tabs' && st.variants;
  const first = st.variants ? st.variants[0] : {};
  const comparing = st.reveal && first.before;
  const frame = `<div class="stage__frame${comparing ? ' stage__comparison' : ''}" id="${esc(st.id)}-view"${st.ar ? ` style="aspect-ratio:${st.ar}"` : ''}>${clip({ src: st.src, poster: st.poster })}
        ${comparing ? `<div class="stage__before">${clip({ ...first.before, follower: true })}</div>
        <span class="stage__compare-label stage__compare-label--before">${esc(st.reveal[0])}</span><span class="stage__compare-label stage__compare-label--after">${esc(st.reveal[1])}</span>
        <input class="stage__range" type="range" min="0" max="100" value="${st.split || 50}" aria-label="Reveal ${esc(st.reveal[0])} versus ${esc(st.reveal[1])}" aria-valuetext="${st.split || 50}% ${esc(st.reveal[0])}, ${100 - (st.split || 50)}% ${esc(st.reveal[1])}" />
        <span class="stage__divider" aria-hidden="true"><span class="stage__handle"><svg viewBox="0 0 24 24"><path d="m9 7-5 5 5 5m6-10 5 5-5 5"/></svg></span></span>` : ''}
        ${comparing || st.inputs ? '<button type="button" class="stage__compare-play" aria-label="Pause playback">Pause</button>' : ''}
        ${st.sidebar ? stageSidebar(st, first) : ''}
        ${st.tags ? `<div class="stage__tags" style="--tags:${st.tags.length}">${st.tags.map((t) => `<span><b>${esc(t)}</b></span>`).join('')}</div>` : ''}
        ${st.variants && st.variants.some((v) => v.prompt) ? `<p class="stage__prompt" data-stage-prompt${first.prompt ? '' : ' hidden'}>${esc(first.prompt || '')}</p>` : ''}
        ${st.benchmark ? `<div class="scale__count scale__count--timed stage__benchmark" data-stage-benchmark data-static="${st.benchmark.static === true}" data-seconds="${st.benchmark.seconds}" data-rounds='${JSON.stringify(st.benchmark.rounds)}'><div><strong>${st.benchmark.batch.toLocaleString()}</strong><span>Parallel grasps</span></div><div class="scale__timing"><b data-stage-seconds>0.0000 s</b><span class="stage__status" data-stage-status role="status">Ready</span><small>${esc(st.benchmark.hardware)}</small></div></div>` : ''}
      </div>`;
  const view = st.inputs ? `<div class="stage__scene">
        ${frame}
        <figure class="stage__input" id="${esc(st.id)}-input" data-stage-input>${stageInput(first)}</figure>
      </div>` : frame;
  return `
  <section class="band stage${st.benchmark ? ' scale--timed' : ''}" id="${esc(st.id)}">
    <div class="band__in">
      ${eyebrow(st.label)}
      <div class="stage__head">
        <h2>${esc(st.h)}</h2>
        ${st.note ? `<p class="stage__note">${esc(st.note)}</p>` : ''}
      </div>
      ${tabs ? `<div class="stage__card${st.narrow ? ' stage__card--narrow' : ''}">
        <div class="scale__tasks" style="--scale-tasks:${st.variants.length}" role="group" aria-label="${esc(st.variantsLabel || 'Choose a version')}">
          ${st.variants.map((v, i) => `<button type="button" class="${i === 0 ? 'is-active' : ''}" data-stage-variant="${i}" aria-pressed="${i === 0}" aria-controls="${esc(st.id)}-view${st.inputs ? ` ${esc(st.id)}-input` : ''}">${esc(v.label)}</button>`).join('')}
        </div>
        ${view}
      </div>` : view}
      ${st.variants && !tabs ? `<div class="stage__variants" role="group" aria-label="${esc(st.variantsLabel || 'Choose a grasp optimization version')}">
        ${st.variants.map((variant, i) => `<button type="button" class="stage__variant${i === 0 ? ' is-active' : ''}" data-stage-variant="${i}" aria-pressed="${i === 0}" aria-controls="${esc(st.id)}-view"><img src="${variant.poster}" alt="" loading="lazy" width="320" height="180" /><span>${esc(variant.label)}<small>${esc(variant.note)}</small></span></button>`).join('')}
      </div><p class="stage__selection"><span data-stage-selection aria-live="polite">${esc(st.variants[0].label)} · ${esc(st.variants[0].note)}</span>${st.comparison ? `<a href="${st.comparison}" target="_blank" rel="noopener">Compare both ↗</a>` : ''}</p>` : ''}
    </div>
  </section>`;
}

// Backticks in band copy mark code.
const inlineCode = (t) => esc(t).replace(/`([^`]+)`/g, '<code>$1</code>');
const bandHead = (b) => `
      ${eyebrow(b.label)}
      ${b.note ? `<div class="stage__head"><h2>${esc(b.h)}</h2><p class="stage__note">${esc(b.note)}</p></div>` : `<h2 class="band__h">${esc(b.h)}</h2>`}`;

// A shared workspace overlays playback progress and the selected run's record.
const agentSection = (b) => `
  <section class="band agent" id="${esc(b.id)}">
    <div class="band__in">${bandHead(b)}
      <div class="stage__card agent__workspace">
        <div class="scale__tasks agent__tasks" style="--scale-tasks:${b.variants.length}" role="tablist" aria-label="Agent tasks">${b.variants.map((v, i) => `
          <button type="button" class="${i ? '' : 'is-active'}" id="${esc(b.id)}-task-${i}" role="tab" aria-selected="${!i}" aria-controls="${esc(b.id)}-view" tabindex="${i ? -1 : 0}" data-agent-task="${i}">${esc(v.label)}</button>`).join('')}
        </div>
        <div class="agent__frame" id="${esc(b.id)}-view" role="tabpanel" aria-labelledby="${esc(b.id)}-task-0">
          ${clip({ ...b.variants[0], controls: true })}
          <aside class="agent__sidebar" aria-label="Agent progress">
            <button type="button" class="agent__progress-toggle" aria-expanded="true" aria-controls="${esc(b.id)}-progress">
              <span class="agent__avatar" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="6" width="14" height="13" rx="4"/><path d="M12 3v3M2 10v5m20-5v5M9 15h6"/><circle cx="9" cy="11" r=".5"/><circle cx="15" cy="11" r=".5"/></svg></span>
              <span class="agent__progress-title"><strong>Agent progress</strong><small data-agent-status>Ready</small></span>
              <span class="agent__percent" data-agent-percent>0%</span><svg class="agent__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 14 5-5 5 5"/></svg>
            </button>
            <div class="agent__progress-body" id="${esc(b.id)}-progress">
              <div class="agent__playhead"><div><span data-agent-current>Policy replay</span><time data-agent-time>0:00 / 0:00</time></div><div class="agent__track" role="progressbar" aria-label="Video playback progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i data-agent-fill></i></div></div>
              <div class="agent__record" data-agent-record></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>`;

// Bars of one kit against a baseline normalized to full width; `legend` names
// the pair (default: the kit and "baseline"), a row's `sub` replaces "vs <baseline>",
// a row's `base` draws the baseline at that percent instead of full width, a
// row with `group` is a heading with an `arrow` for which way is `better`, and
// `wide` gives longer labels and read-outs room.
const benchSection = (bench) => {
  const [ours, base] = bench.legend || [window.RK_NAMES[key] || key, 'baseline'];
  return `  <section class="band bench${bench.wide ? ' bench--wide' : ''}" id="${esc(bench.id || 'benchmarks')}">
    <div class="band__in">
      ${eyebrow(bench.label || 'Benchmarks')}
      <div class="bench__head">
        <h2>${esc(bench.h)}</h2>
        <div class="bench__key">
          <div class="bench__legend">
            <span><i style="background:var(--accent)"></i>${esc(ours)}</span>
            <span><i style="background:#D6D6D2"></i>${esc(base)}</span>
          </div>
        </div>
      </div>
      <div class="bench__table">
        ${bench.rows.map((r, i) => {
          if (r.group) return `<div class="bench__group"><span class="arrow" aria-label="${esc(r.better)}">${esc(r.arrow)}</span>${esc(r.group)}</div>`;
          // the multiplier counts up on its own, the unit sign stays put
          const m = String(r.x).match(/^([\d.]+)(.*)$/);
          const fig = m ? `<span class="n" data-to="${m[1]}">${esc(m[1])}</span>${esc(m[2])}` : esc(r.x);
          const bars = `<i class="ours" style="--w:${r.pct}%"><span class="flow"></span><span class="swell"></span></i>
              <i class="base"${r.base != null ? ` style="width:${r.base}%"` : ''}></i>`;
          return `
          <div class="bench__row" style="--i:${i}">
            <div class="bench__task">${esc(r.task[0])}<br /><span>${esc(r.task[1])}</span></div>
            <div class="bench__bars" tabindex="0"
                 data-ours="${esc(ours)}" data-pct="${r.pct}%" data-base="${esc(r.vs)}" data-base-pct="${r.base ?? 100}%">
              ${bars}
            </div>
            <div class="bench__fig"><span class="x">${fig}</span><span class="vs">${esc(r.sub || `vs ${r.vs}`)}</span></div>
          </div>`;
        }).join('')}
      </div>
      ${bench.note ? `<p class="bench__note">${esc(bench.note)}</p>` : ''}
    </div>
  </section>`;
};

// A kit can list its bands in order instead of taking the fixed sequence; each
// entry names one of these types.
const BANDS = {
  bento: bentoSection,
  stage: stageSection,
  agent: agentSection,
  bench: benchSection,
  // a row of captioned clips
  clips: (b) => `
  <section class="band clips" id="${esc(b.id)}">
    <div class="band__in">${bandHead(b)}
      <div class="clips__grid" style="--clips-cols:${b.columns || 4}">${b.items.map((it) => `
        <figure class="clips__item">
          <div class="clips__frame"${it.ar ? ` style="aspect-ratio:${it.ar}"` : ''}>${clip(it)}</div>
          <figcaption><span class="clips__kicker">${esc(it.kicker)}</span>${esc(it.label)}</figcaption>
        </figure>`).join('')}
      </div>
    </div>
  </section>`,
  // a code card beside its footage, or a stand-in for footage to come
  code: (b) => `
  <section class="band codeband" id="${esc(b.id)}">
    <div class="band__in">${bandHead(b)}
      <div class="codeband__grid">
        <div class="api__demo codeband__code" data-copy-scope>
          <div class="api__bar"><span class="file">${esc(b.file)}</span>${b.side ? `<span class="codeband__side">${esc(b.side)}</span>` : ''}<button type="button" class="api__copy copy--swap" data-copy-from=".api__body"><span class="t">copy</span><span class="o">&#10003; copied</span></button></div>
          <pre class="api__body">${rkHighlight(b.lines.join('\n'))}</pre>
          ${b.facts ? `<div class="codeband__facts">${b.facts.map((f) => `<div><span class="codeband__k">${esc(f.k)}</span>${esc(f.v)}</div>`).join('')}</div>` : ''}
        </div>
        <div class="codeband__media${b.media.placeholder ? ' is-placeholder' : ''}">${b.media.placeholder ? `<span>${esc(b.media.placeholder)}</span>` : clip(b.media)}</div>
      </div>
    </div>
  </section>`,
};

// The teaser: one clip at a time, as large as the hero allows, and the agent's side in a small card of the Agent
// band's glass, low on its right. A task with a `prompt` shows what it hands the agent and types it there, then
// follows the agent's steps; a recorded run shows what the agent said at each turn.
// The agent writes Markdown, its bullets running on here: bold stays bold, and code, figures and acronyms stand out.
const agentWords = (words) => esc(words).replace(/\s-\s+(?=\*\*)/g, ' ').replace(
  /`([^`]+)`|\*\*(.+?)\*\*|\b\d+(?:\.\d+)?(?:\s?(?:cm|mm|m|s|deg|degrees)\b|°)?|\b[A-Z]{2,}\b/g,
  (match, code, bold) => (bold ? `<strong>${bold}</strong>` : `<b>${code ?? match}</b>`),
);

const heroConsole = (c) => `
    <div class="hero-console" data-hero-teaser>
      <div class="hero-console__media${c.tasks[0].seamless ? ' is-seamless' : ''}">
        <video src="${c.tasks[0].src}" poster="${c.tasks[0].poster}" muted playsinline preload="metadata" aria-hidden="true"></video>
      </div>
      <aside class="hero-console__card" aria-label="Agent progress">
        <div class="hero-console__head">
          <span class="agent__avatar" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="6" width="14" height="13" rx="4"/><path d="M12 3v3M2 10v5m20-5v5M9 15h6"/></svg></span>
          <span class="hero-console__title"><strong>Agent progress</strong><small data-hero-name></small></span>
          <span class="agent__percent" data-hero-percent>0%</span>
        </div>
        <div class="hero-console__input" data-hero-caption>
          <span class="hero-console__thumb" data-hero-thumb hidden></span>
          <span class="hero-console__words"><span class="hero-console__text" data-hero-text></span><small data-hero-state></small></span>
        </div>
        <div class="hero-console__status" data-hero-status><span class="hero-console__progress" data-hero-progress></span><span data-hero-step></span><span class="hero-console__done">&#10003; done</span></div>
      </aside>
      <div class="hero-console__foot"><span class="hero-console__playlist" role="group" aria-label="Teaser clips">${c.tasks.map((t, i) => `<button type="button" aria-label="${esc(t.label)}"${i ? '' : ' class="is-on" aria-current="true"'}></button>`).join('')}</span></div>
    </div>`;

// A project may opt into a standalone image, one looping clip, or a reel that
// plays each clip once. Reel clips are stacked in the same stage so changing
// scenes never moves the surrounding layout.
const heroReel = (window.RK_HERO_REELS || {})[key];
// Choose before creating the video so phones only fetch the smaller clip.
const heroVideo = kit.heroVideoMobile && window.matchMedia('(max-width: 760px)').matches
  ? kit.heroVideoMobile : window.RK_VIDEOS[key];
const heroMedia = kit.heroImage
  ? `<img class="hero-figure" src="${kit.heroImage}" alt="" />`
  : heroReel
    ? `<img class="hero-media hero-reel-still" src="${heroReel[0].poster}" alt="" style="--clip-fit:${heroReel[0].fit};--clip-portrait-pos:${heroReel[0].portraitPosition}" />` +
      heroReel.map((clip, i) =>
        `<video class="hero-media hero-clip${i === 0 ? ' is-active' : ''}" src="${clip.src}" poster="${clip.poster}" ${i === 0 ? 'autoplay ' : ''}muted playsinline preload="${i < 2 ? 'auto' : 'metadata'}" data-rate="${clip.rate || 1}" data-hero-clip style="--clip-fit:${clip.fit};--clip-portrait-pos:${clip.portraitPosition}"></video>`
      ).join('')
    : `${window.RK_STILLS[key] ? `<img class="hero-media" src="${window.RK_STILLS[key]}" alt="" />` : ''}
       <video class="hero-media" src="${heroVideo}" ${window.RK_STILLS[key] ? `poster="${window.RK_STILLS[key]}" data-fallback` : ''} autoplay muted loop playsinline preload="auto"></video>`;

document.getElementById('page').innerHTML = `
  <section class="hero${kit.heroConsole ? ' hero--console' : ''}">
    ${kit.heroConsole ? '<div class="hero__row">' : heroMedia}
    <div class="pitch">
      <div class="pitch__in">
        <span class="chip">${esc(kit.chip)}</span>
        <h1>${esc(cap(kit.titleA))}<span class="kit">${esc(cap(kit.titleB))}</span></h1>
        <p class="lede">${esc(kit.lede)}</p>
        <div class="btns">
          <a href="${kit.cta ? kit.cta.href : `/docs/${key}/`}" class="cta">${esc(kit.cta ? kit.cta.label : 'Get started')}</a>
          ${kit.status ? `<span class="ghost ghost--status"><span class="p">&#9679;</span> ${esc(kit.status)}</span>` : ''}
          ${kit.install ? `<button class="ghost" type="button" data-copy="${esc(kit.install)}" title="Click to copy"><span class="p">$</span><span class="t">${esc(kit.install)}</span><span class="o">&#10003; copied</span></button>` : ''}
        </div>
      </div>
    </div>
    ${kit.heroConsole ? `${heroConsole(kit.heroConsole)}</div>` : ''}
    ${kit.bento || kit.showcase || kit.stages || kit.bands ? `<button class="scrollcue" id="scrollcue" aria-label="Skip the hero"><span class="t">Scroll</span><span class="c" aria-hidden="true">&#9660;</span></button>` : ''}
  </section>

  ${kit.bands ? kit.bands.map((b) => BANDS[b.type](b)).join('') : ''}

  ${kit.showcase ? kit.showcase.groups.map(showcaseSection).join('') : kit.bento ? bentoSection(kit.bento) : ''}

  ${kit.stages ? kit.stages.map(stageSection).join('') : ''}

  ${kit.pipeline ? `
  <section class="band pipeline" id="pipeline">
    <div class="band__in">
      ${eyebrow('Pipeline')}
      <div class="pipeline__head">
        <h2>${esc(kit.pipeline.h)}</h2>
        ${kit.pipeline.note ? `<p class="pipeline__note">${esc(kit.pipeline.note)}</p>` : ''}
      </div>
      <div class="pipeline__flow">
        ${kit.pipeline.stages.map((st) => `
        <article class="pipeline__stage" aria-label="${esc(st.name)}">
          <h3 class="pipeline__label">${esc(st.name)}</h3>
          <div class="pipeline__media">${clip({ src: st.src, poster: st.poster })}</div>
          ${(st.parts || []).map((p) => `<span class="pipeline__part" style="--x:${p.x}%">${esc(p.text)}</span>`).join('')}
        </article>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${kit.scale?.position === 'afterPipeline' ? scaleSection(kit.scale) : ''}

  ${kit.scale?.position === 'beforeMotionRange' ? scaleSection(kit.scale) : ''}

  ${kit.motionRange ? `
  <section class="band motion-range" id="motion-range" aria-labelledby="motion-range-title">
    <div class="band__in">
      ${eyebrow(kit.motionRange.label)}
      <div class="motion-range__head">
        <h2 id="motion-range-title">${esc(kit.motionRange.h)}</h2>
      </div>
      <div class="motion-range__demo" data-motion-range>
        <div class="motion-range__tabs" role="group" aria-label="Retargeting example">
          ${kit.motionRange.items.map((item, i) => `
            <button type="button" data-motion-range-tab="${i}" class="${i === 0 ? 'is-active' : ''}" aria-label="Show ${esc(item.name)}" aria-pressed="${i === 0}" aria-controls="motion-range-stage">${esc(item.tab)}</button>`).join('')}
        </div>
        <div class="motion-range__stage" id="motion-range-stage">
          <img class="motion-range__poster" data-motion-range-poster src="${kit.motionRange.items[0].clips[0].poster}" alt="" width="${kit.motionRange.width}" height="${kit.motionRange.height}" loading="lazy" />
          <video class="motion-range__clip is-active" data-src="${kit.motionRange.items[0].clips[0].src}" poster="${kit.motionRange.items[0].clips[0].poster}" muted loop playsinline preload="none" aria-hidden="true"></video>
        </div>
        ${kit.motionRange.items.map((group, groupIndex) => `
          <div class="motion-picker motion-range__picker" data-motion-range-picker="${groupIndex}" role="group" aria-label="${esc(group.tab)} examples" ${groupIndex ? 'hidden' : ''}>
            ${group.clips.map((clip, clipIndex) => `
              <button type="button" class="motion-picker__item${clipIndex === 0 ? ' is-active' : ''}" data-motion-range-choice="${clipIndex}" aria-label="Show ${esc(clip.label)}" title="${esc(clip.label)}" aria-pressed="${clipIndex === 0}" aria-controls="motion-range-stage" tabindex="${clipIndex === 0 ? 0 : -1}">
                <span class="motion-picker__thumb"><img src="${clip.thumb || clip.poster}" alt="" width="160" height="90" loading="lazy" decoding="async" /></span>
              </button>`).join('')}
          </div>`).join('')}
        <div class="motion-range__footer">
          <p data-motion-range-announcer aria-live="polite"><span data-motion-range-label>${esc(kit.motionRange.items[0].clips[0].label)}</span><span class="motion-range__count" data-motion-range-count>01 / ${kit.motionRange.items[0].clips.length}</span></p>
          <button type="button" data-motion-range-play aria-label="Pause example video">Pause</button>
        </div>
      </div>
    </div>
  </section>` : ''}

  ${kit.layers ? `
  <section class="band layers">
    <div class="band__in">
      ${eyebrow('Method')}
      ${kit.layers.h || kit.layers.lead ? `
      <div class="layers__head">
        ${kit.layers.h ? `<h2>${esc(kit.layers.h)}</h2>` : ''}
        ${kit.layers.lead ? `<p class="layers__lead">${esc(kit.layers.lead)}</p>` : ''}
      </div>` : ''}
      <div class="layers__grid">
        ${kit.layers.cards.map((c) => `
          <article class="layers__card">
            <div class="layers__head-row"><span class="n">${esc(c.n)}</span><span class="kicker">${esc(c.kicker)}</span></div>
            <h3>${esc(c.name)}</h3>
            ${c.desc ? `<p>${esc(c.desc)}</p>` : ''}
          </article>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${kit.reel ? `
  <section class="band reel">
    <div class="band__in">
      ${eyebrow('Humanoid')}
      <div class="reel__head">
        <h2>${esc(kit.reel.h)}</h2>
        <p class="reel__lead">${esc(kit.reel.lead)}</p>
      </div>
      <div class="reel__grid" style="--tile-ar:${kit.reel.ar}">${kit.reel.cards.map(tile).join('')}</div>
    </div>
  </section>` : ''}

  ${kit.bench ? benchSection(kit.bench) : ''}
  ${kit.scale && !['beforeMotionRange', 'afterPipeline'].includes(kit.scale.position) ? scaleSection(kit.scale) : ''}

  ${kit.method ? `
  <section class="band method" id="method">
    <div class="band__in">
      ${eyebrow('Under the hood')}
      <div class="method__head">
        <h2>${esc(kit.method.h)}</h2>
        ${kit.method.lead ? `<p class="method__lead">${esc(kit.method.lead)}</p>` : ''}
      </div>
      <div class="method__grid">
        ${kit.method.cards.map((c) => `
          <div class="method__card">
            <div class="method__card-head">
              <div class="method__title">${c.count ? `<strong>${esc(c.count)}</strong> ` : ''}${esc(c.name)}</div>
              <div class="method__note">${esc(c.note)}</div>
            </div>
            <div class="method__figs" style="grid-template-columns:repeat(${c.figs.length},1fr)">
              ${c.figs.map((f) => `
                <div class="method__fig">
                  <div class="method__fig-box"><img src="${f.img}" alt=""${f.anim ? ` class="is-${f.anim}"` : ''} width="${f.w}" height="${f.h}" /></div>
                  <span>${esc(f.label)}</span>
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${api ? `
  <section class="band api" id="${api.id || 'api'}">
    <div class="band__in">
      ${eyebrow(api.label || 'API')}
      <div class="api__head">
        <h2>${esc(api.h)}</h2>
        ${api.install ? `<button type="button" class="api__copy-cmd" data-copy="${esc(api.install)}" title="Click to copy"><span class="p">$</span><span class="t">${esc(api.install)}</span><span class="o">&#10003; copied</span></button>` : ''}
      </div>
      ${api.note ? `<p class="api__note">${esc(api.note)}</p>` : ''}
      <div class="api__demo">
        <div class="api__tabs" role="tablist" aria-label="${esc(api.label || 'Example task')}" style="grid-template-columns:repeat(${api.tabs.length},minmax(0,1fr))">
          ${api.tabs.map((t, i) => `<button type="button" role="tab" data-api="${i}" aria-selected="${i === 0}" class="${i === 0 ? 'is-active' : ''}">${esc(t.label)}</button>`).join('')}
        </div>
        ${api.tabs.map((t, i) => `
          <div class="api__pane${i === 0 ? ' is-active' : ''}" data-api="${i}" data-copy-scope>
            <div class="api__bar">
              <span class="file">${esc(t.file)}</span>
              ${t.source || t.doc ? `<a href="${t.source ? esc(t.source) : `/docs/${key}/${t.doc}/`}">${t.source ? 'source' : 'docs'} &rarr;</a>` : ''}
              ${t.fullCode ? '<button type="button" class="api__copy" data-code-toggle aria-expanded="false" aria-label="Show full code">Full</button>' : ''}
              <button type="button" class="api__copy copy--swap" data-copy-from="${t.fullCode ? '[data-code-full]' : '.api__body'}"><span class="t">copy</span><span class="o">&#10003; copied</span></button>
            </div>
            ${t.fullCode ? `<pre class="api__body" style="--api-lines:${Math.max(...api.tabs.map((x) => x.lines.length))}">${rkHighlight(t.lines.map((l) => l.text).join('\n'))}</pre><pre class="api__body" data-code-full hidden>${rkHighlight(t.fullCode)}</pre>` : `<div class="api__body" style="--api-lines:${Math.max(...api.tabs.map((x) => x.lines.length))}">${t.lines.map((l) => `<div>${rkHighlight(l.text) || '&nbsp;'}</div>`).join('')}</div>`}
            ${t.command ? `<div class="api__launch" data-copy-scope>
              <div class="api__bar"><span>Interactive demo · run in the GraspKit checkout</span><button type="button" class="api__copy copy--swap" data-copy-from="pre"><span class="t">copy command</span><span class="o">&#10003; copied</span></button></div>
              <pre>${esc(t.command)}</pre>
            </div>` : ''}
          </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${kit.showDetails === false ? '' : `
  <div class="wrap">
    ${kit.details ? `
      <div class="details__head">
        ${eyebrow(kit.details.label)}
        <div class="details__intro">
          <h2>${esc(kit.details.h)}</h2>
          ${kit.details.lead ? `<p>${esc(kit.details.lead)}</p>` : ''}
        </div>
      </div>` : ''}
    <div class="hl">
      ${kit.highlights.map((h) => `<div><span class="k">${esc(h.k)}</span><span class="v">${esc(h.v)}</span></div>`).join('')}
    </div>

    <div class="meta">
      ${kit.meta.map((m) => `<span class="row"><span class="k">${esc(m.k)}</span><span class="v">${esc(m.v)}</span></span>`).join('')}
      <span class="row status"><span class="k">status</span><span class="v">● research preview</span></span>
    </div>

    ${kit.sections.map(section).join('')}

    <section class="end">
      <div class="end__label"><span class="n">05</span>Get started</div>
      <div style="min-width:0">
        <h2>${esc(kit.endH)}</h2>
        <div class="btns">
          <a href="/docs/${key}/" class="cta">Open docs</a>
          <a href="${kit.alt.href}" class="ghost">${esc(kit.alt.label)}</a>
        </div>
      </div>
    </section>
  </div>`}

  ${kit.close ? `
  <section class="band close">
    <div class="band__in">
      ${eyebrow('Get started')}
      <h2>${esc(kit.close.h)}</h2>
      <div class="btns">
        <a href="${kit.close.cta ? kit.close.cta.href : `/docs/${key}/`}" class="cta">${esc(kit.close.cta ? kit.close.cta.label : 'Open docs')}</a>
        <a href="${(kit.close.alt || kit.alt).href}" class="ghost">${esc((kit.close.alt || kit.alt).label)}</a>
      </div>
    </div>
  </section>` : ''}`;
rkVideoFallback();

// ---------- imported footage: hydration, tabs, and row sync ----------
// A clip is fetched and started when it comes within a screen of the viewport
// and paused when it leaves, so scrolling the page costs one screenful of
// video rather than forty. A pane that is display:none never intersects, so a
// closed tab's clips stay cold until it is opened.
const stillPage = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hydrateClip = (v) => {
  if (!v.dataset.src) return;
  v.preload = 'metadata';
  v.src = v.dataset.src;
  delete v.dataset.src;
};
const playClip = (v) => { const started = v.play(); if (started) started.catch(() => {}); };

const teaser = document.querySelector('[data-hero-teaser]');
if (teaser) {
  const video = teaser.querySelector('video');
  const tasks = kit.heroConsole.tasks;
  const name = teaser.querySelector('[data-hero-name]');
  const state = teaser.querySelector('[data-hero-state]');
  const caption = teaser.querySelector('[data-hero-caption]');
  const text = teaser.querySelector('[data-hero-text]');
  let shown;
  const status = teaser.querySelector('[data-hero-status]');
  const stepLabel = teaser.querySelector('[data-hero-step]');
  const progress = teaser.querySelector('[data-hero-progress]');
  const percent = teaser.querySelector('[data-hero-percent]');
  const thumb = teaser.querySelector('[data-hero-thumb]');
  const playlist = [...teaser.querySelectorAll('.hero-console__playlist button')];
  const records = [];
  let selected = 0;
  let visible = false;
  let lastPaint = '';
  // The card names the harness and what the clip shows.
  const label = (value) => { name.textContent = value; };
  // What the prompt hands the agent: a looping clip, or a photo.
  const showInput = ({ input }) => {
    thumb.hidden = !input;
    thumb.innerHTML = !input ? '' : input.src
      ? `<video src="${input.src}" poster="${input.poster}" muted loop playsinline${stillPage ? '' : ' autoplay'} aria-hidden="true"></video>`
      : `<img src="${input.poster}" alt="" />`;
  };
  // TICKS is one state per step, 0 to come, 1 reached and 2 current, or a fraction of a run's turns, one bar.
  const render = ({ words, empty = false, typing = false, step = '', done = false, ticks }) => {
    if (shown !== words) text.innerHTML = agentWords(shown = words);
    caption.classList.toggle('is-empty', empty);
    caption.classList.toggle('is-typing', typing);
    status.classList.toggle('is-done', done);
    if (stepLabel.textContent !== step) {
      stepLabel.textContent = step;
      if (!stillPage && step) stepLabel.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' });
    }
    const bar = !Array.isArray(ticks);
    progress.classList.toggle('is-bar', bar);
    progress.innerHTML = bar
      ? `<i style="width:${Math.round(ticks * 100)}%"></i>`
      : ticks.map((on, i) => `<i${on ? ` class="${on > 1 ? 'is-now' : 'is-on'}"` : ''}>${String(i + 1).padStart(2, '0')}</i>`).join('');
    percent.textContent = `${Math.round((bar ? ticks : ticks.filter(Boolean).length / ticks.length) * 100)}%`;
  };
  const select = (index) => {
    if (selected === index) return;
    video.pause();
    selected = index;
    state.textContent = tasks[index].state || kit.heroConsole.state;
    showInput(tasks[index]);
    playlist.forEach((tick, i) => {
      tick.style.removeProperty('--p');
      tick.classList.toggle('is-on', i === index);
      if (i === index) tick.setAttribute('aria-current', 'true');
      else tick.removeAttribute('aria-current');
    });
    lastPaint = '';
    video.parentElement.classList.toggle('is-seamless', Boolean(tasks[index].seamless));
    video.poster = tasks[index].poster;
    video.src = tasks[index].src;
    video.load();
  };
  const paint = (force = false) => {
    const task = tasks[selected];
    if (task.prompt) {
      // The prompt types a letter a frame while the clip holds its first frame, as in the film; once sent,
      // the agent's steps follow the clip, one numbered circle each, to done. A still page shows the result.
      const time = stillPage ? Infinity : video.currentTime;
      const shown = Math.min(task.prompt.length, Math.floor(time * 30));
      const step = [...task.steps].reverse().find(([from]) => time >= from);
      const stamp = `${selected}:${shown}:${step?.[0]}`;
      if (!force && stamp === lastPaint) return;
      lastPaint = stamp;
      label(task.label);
      const reached = step ? task.steps.indexOf(step) : -1;
      render({
        words: shown ? task.prompt.slice(0, shown) : kit.heroConsole.placeholder,
        empty: !shown,
        typing: !step,
        step: step?.[1],
        done: reached === task.steps.length - 1,
        ticks: task.steps.map((_, i) => (i < reached ? 1 : i === reached ? 2 : 0)),
      });
      return;
    }
    // a run's clip may be part of its replay, from FROM to TO
    const from = task.from || 0;
    const to = task.to || 1;
    const fraction = video.duration ? Math.min(.999999, from + (to - from) * video.currentTime / video.duration) : 0;
    if (!video.readyState) return;
    const record = records[selected];
    const step = fraction * (record?.renderEnd || record?.steps || 1);
    const found = record?.turns.findIndex((turn) => turn.step >= step);
    const index = found < 0 ? record.turns.length - 1 : found;
    const stamp = `${selected}:${index}`;
    if (!force && stamp === lastPaint) return;
    lastPaint = stamp;
    label(record ? `${record.source} · ${task.label}` : task.label);
    const turn = record?.turns[index];
    render({
      words: turn?.say || task.label,
      step: record ? `Turn ${index + 1} of ${record.turns.length}` : 'Agent replay',
      done: Boolean(record) && index === record.turns.length - 1,
      ticks: record ? (index + 1) / record.turns.length : 0,
    });
  };
  const applyPlayback = () => {
    if (visible && !stillPage && !document.hidden && video.readyState && !video.seeking) playClip(video);
    else video.pause();
    paint();
  };
  ['timeupdate', 'seeking', 'play', 'pause'].forEach((event) => video.addEventListener(event, () => paint()));
  // the current task's line fills as its clip plays, and the agent's dot lights while it does
  video.addEventListener('timeupdate', () => {
    if (video.duration) playlist[selected].style.setProperty('--p', Math.min(1, video.currentTime / video.duration).toFixed(3));
  });
  ['play', 'pause'].forEach((event) => video.addEventListener(event, () => teaser.classList.toggle('is-playing', !video.paused)));
  // timeupdate comes a few times a second; typing needs every frame.
  let typing = false;
  const type = () => {
    typing = !video.paused && Boolean(tasks[selected].prompt);
    if (typing) { paint(); requestAnimationFrame(type); }
  };
  video.addEventListener('playing', () => { if (!typing) type(); });
  video.addEventListener('loadedmetadata', () => {
    video.currentTime = 0;
    paint(true);
    applyPlayback();
  });
  ['seeked', 'canplay'].forEach((event) => video.addEventListener(event, applyPlayback));
  // one task loops; more play in turn
  video.loop = tasks.length === 1;
  video.addEventListener('ended', () => { if (!stillPage) select((selected + 1) % tasks.length); });
  playlist.forEach((tick, i) => tick.addEventListener('click', () => select(i)));
  tasks.forEach((task, index) => {
    if (!task.run) return;
    const run = task.run.replace(/^agent-as-policy\//, '');
    fetch(`/data/showcase/runs/${run}.json`).then((response) => {
      if (!response.ok) throw new Error('Recorded run unavailable');
      return response.json();
    }).then((record) => {
      records[index] = record;
      if (selected === index) paint(true);
    }).catch(() => {
      records[index] = null;
      if (selected === index) paint(true);
    });
  });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; applyPlayback(); }).observe(teaser);
  document.addEventListener('visibilitychange', applyPlayback);
  label(tasks[0].label);
  state.textContent = tasks[0].state || kit.heroConsole.state;
  showInput(tasks[0]);
  paint(true);
}

[...(kit.stages || []), ...(kit.bands || []).filter((b) => b.type === 'stage')].filter((stage) => stage.variants).forEach((stage) => {
  const section = document.getElementById(stage.id);
  const video = section.querySelector('.stage__frame video');
  const frame = section.querySelector('.stage__comparison');
  const inputPane = section.querySelector('[data-stage-input]');
  const playback = section.querySelector('.stage__compare-play');
  let follower = section.querySelector('.stage__follower');
  let resetComparison = () => {};
  if (frame) {
    const range = frame.querySelector('.stage__range');
    const beforeLabel = frame.querySelector('.stage__compare-label--before');
    const afterLabel = frame.querySelector('.stage__compare-label--after');
    const reveal = (value = Number(range.value)) => {
      frame.style.setProperty('--reveal', `${value}%`);
      // Keep native keyboard steps and accessible values at 1%, while the
      // visual divider follows the pointer at fractional-pixel precision.
      const rounded = String(Math.round(value));
      if (range.value !== rounded) range.value = rounded;
      const description = `${rounded}% ${stage.reveal[0]}, ${100 - Number(rounded)}% ${stage.reveal[1]}`;
      if (range.getAttribute('aria-valuetext') !== description) range.setAttribute('aria-valuetext', description);
      if (beforeLabel.hidden !== (value < 18)) beforeLabel.hidden = value < 18;
      if (afterLabel.hidden !== (value > 82)) afterLabel.hidden = value > 82;
    };
    range.addEventListener('input', () => reveal());
    let dragBounds = null;
    let pointerX = 0;
    let dragFrame = 0;
    const paintDrag = () => {
      dragFrame = 0;
      if (dragBounds) reveal(100 * Math.max(0, Math.min(1, (pointerX - dragBounds.left) / dragBounds.width)));
    };
    const drag = (event) => {
      pointerX = event.clientX;
      if (!dragFrame) dragFrame = requestAnimationFrame(paintDrag);
    };
    // Only a press within GRAB pixels of the divider drags it; the cursor says where that is.
    const GRAB = 28;
    const nearDivider = (event, bounds) => Math.abs(event.clientX - bounds.left - bounds.width * Number(range.value) / 100) <= GRAB;
    frame.addEventListener('pointerdown', (event) => {
      if (!event.isPrimary || event.button !== 0 || event.target.closest('button, a, .stage__sidebar')) return;
      // Read layout once per gesture, before any reveal writes.
      const bounds = frame.getBoundingClientRect();
      if (!nearDivider(event, bounds)) return;
      event.preventDefault();
      range.focus({ preventScroll: true });
      dragBounds = bounds;
      frame.setPointerCapture(event.pointerId);
      drag(event);
    });
    frame.addEventListener('pointermove', (event) => {
      if (frame.hasPointerCapture(event.pointerId)) drag(event);
      else if (event.pointerType === 'mouse') frame.classList.toggle('is-grabbable', !event.target.closest('button, a, .stage__sidebar') && nearDivider(event, frame.getBoundingClientRect()));
    });
    frame.addEventListener('pointerleave', () => frame.classList.remove('is-grabbable'));
    ['pointerup', 'pointercancel'].forEach((name) => frame.addEventListener(name, (event) => {
      if (!frame.hasPointerCapture(event.pointerId)) return;
      if (dragFrame) cancelAnimationFrame(dragFrame);
      if (name === 'pointerup') pointerX = event.clientX;
      paintDrag();
      dragBounds = null;
      frame.releasePointerCapture(event.pointerId);
    }));
    frame.addEventListener('lostpointercapture', () => {
      if (dragFrame) cancelAnimationFrame(dragFrame);
      dragFrame = 0;
      dragBounds = null;
    });
    resetComparison = (variant) => {
      follower.pause();
      follower.removeAttribute('src');
      follower.dataset.src = variant.before.src;
      follower.poster = variant.before.poster;
      follower.load();
      range.value = String(stage.split || 50);
      reveal();
    };
    reveal();
  }
  // Only the output is observed for visibility. Reference footage follows its
  // play, pause, seeking and loop events; both sources use the same clock.
  const watchFollower = () => follower?.addEventListener('loadedmetadata', () => sync(true));
  const sync = (force = false) => {
    if (playback) {
      const action = video.paused ? 'Play' : 'Pause';
      if (playback.textContent !== action) {
        playback.textContent = action;
        playback.setAttribute('aria-label', `${action} playback`);
      }
    }
    if (!follower || !video.currentSrc) return;
    hydrateClip(follower);
    if (!follower.readyState) return;
    const drift = video.currentTime - follower.currentTime;
    if (Math.abs(drift) > (force ? .015 : .2)) {
      follower.currentTime = Math.min(video.currentTime, Math.max(0, follower.duration - .001));
    }
    // Correct small drift through speed instead of interrupting decoding.
    const correction = !force && !video.paused && Math.abs(drift) <= .2 ? Math.max(-.05, Math.min(.05, drift * .5)) : 0;
    const rate = video.playbackRate + correction;
    if (Math.abs(follower.playbackRate - rate) > .001) follower.playbackRate = rate;
    if (video.paused) follower.pause();
    else if (follower.paused) playClip(follower);
  };
  if (playback || follower) {
    ['play', 'pause', 'seeking', 'ratechange', 'loadedmetadata'].forEach((name) => video.addEventListener(name, () => sync(true)));
    video.addEventListener('timeupdate', () => sync());
    watchFollower();
    playback?.addEventListener('click', () => {
      if (video.paused) { hydrateClip(video); playClip(video); }
      else video.pause();
    });
    sync();
  }
  const buttons = [...section.querySelectorAll('[data-stage-variant]')];
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    const variant = stage.variants[index];
    buttons.forEach((item, i) => {
      item.classList.toggle('is-active', i === index);
      item.setAttribute('aria-pressed', String(i === index));
    });
    video.pause();
    resetComparison(variant);
    if (inputPane) {
      if (follower) {
        follower.pause();
        follower.removeAttribute('src');
        follower.load();
      }
      inputPane.innerHTML = stageInput(variant);
      follower = inputPane.querySelector('video');
      watchFollower();
    }
    delete video.dataset.src;
    video.poster = variant.poster;
    video.src = variant.src;
    video.load();
    if (!stillPage) playClip(video);
    const selection = section.querySelector('[data-stage-selection]');
    if (selection) selection.textContent = `${variant.label} · ${variant.note}`;
    const prompt = section.querySelector('[data-stage-prompt]');
    if (prompt) {
      prompt.hidden = !variant.prompt;
      prompt.textContent = variant.prompt || '';
    }
    if (stage.sidebar) {
      section.querySelector('[data-stage-status]').textContent = stageStatus(stage, variant);
      section.querySelector('[data-stage-record]').innerHTML = stageRecord(stage, variant);
    }
  }));
  // the sidebar folds to its header, and starts folded on a phone
  const sidebar = section.querySelector('.stage__sidebar');
  if (sidebar) {
    const toggle = sidebar.querySelector('.agent__progress-toggle');
    const body = sidebar.querySelector('.agent__progress-body');
    const expand = (on) => {
      body.hidden = !on;
      toggle.setAttribute('aria-expanded', String(on));
      sidebar.classList.toggle('is-collapsed', !on);
    };
    const narrow = window.matchMedia('(max-width: 1000px)');
    expand(!narrow.matches);
    narrow.addEventListener('change', (event) => expand(!event.matches));
    toggle.addEventListener('click', () => expand(body.hidden));
  }
});

// The Agent workspace uses the same published campaign facts and turn records
// as the showcase. A record belongs to its task; stale requests cannot replace it.
(kit.bands || []).filter((b) => b.type === 'agent').forEach((band) => {
  const section = document.getElementById(band.id);
  const tabs = [...section.querySelectorAll('[data-agent-task]')];
  const panel = section.querySelector('[role="tabpanel"]');
  const video = panel.querySelector('video');
  const target = panel.querySelector('[data-agent-record]');
  const sidebar = panel.querySelector('.agent__sidebar');
  const progressToggle = panel.querySelector('.agent__progress-toggle');
  const progressBody = panel.querySelector('.agent__progress-body');
  const currentLabel = panel.querySelector('[data-agent-current]');
  const timeLabel = panel.querySelector('[data-agent-time]');
  const statusLabel = panel.querySelector('[data-agent-status]');
  const percentLabel = panel.querySelector('[data-agent-percent]');
  const fill = panel.querySelector('[data-agent-fill]');
  const track = panel.querySelector('.agent__track');
  const requests = new Map();
  let activeRecord = null;
  // A task told through campaign stages plays them in order, each its own clip.
  let stages = null;
  let stageIndex = 0;
  let currentTurn = -1;
  let inspectedTurn = null;
  const setExpanded = (on) => {
    progressBody.hidden = !on;
    progressToggle.setAttribute('aria-expanded', String(on));
    sidebar.classList.toggle('is-collapsed', !on);
  };
  const narrowProgress = window.matchMedia('(max-width: 1000px)');
  setExpanded(!narrowProgress.matches);
  narrowProgress.addEventListener('change', (event) => setExpanded(!event.matches));
  progressToggle.addEventListener('click', () => { setExpanded(progressBody.hidden); updatePlayback(true); });
  const timestamp = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  const updatePlayback = (force = false) => {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const elapsed = Number.isFinite(video.currentTime) ? video.currentTime : 0;
    const fraction = duration ? Math.max(0, Math.min(1, elapsed / duration)) : 0;
    timeLabel.textContent = `${timestamp(elapsed)} / ${timestamp(duration)}`;
    percentLabel.textContent = `${Math.round(fraction * 100)}%`;
    statusLabel.textContent = video.dataset.inspection ? 'Inspecting step' : !duration ? 'Loading replay' : video.paused ? 'Paused' : 'Playing';
    sidebar.classList.toggle('is-playing', !video.paused && duration > 0);
    fill.style.width = `${fraction * 100}%`;
    track.setAttribute('aria-valuenow', String(Math.round(fraction * 100)));
    if (!activeRecord) {
      currentLabel.textContent = stages ? `Stage ${stageIndex + 1} of ${stages.length}` : panel.dataset.run?.startsWith('auto-research/') ? 'Policy replay' : 'Playback';
      return;
    }
    const turns = activeRecord.turns;
    const step = fraction * (activeRecord.renderEnd || activeRecord.steps || 1);
    const found = turns.findIndex((turn) => turn.step >= step);
    const index = video.paused && inspectedTurn !== null ? inspectedTurn : found < 0 ? turns.length - 1 : found;
    currentLabel.textContent = `Turn ${index + 1} of ${turns.length}`;
    if (index === currentTurn && !force) return;
    currentTurn = index;
    target.querySelectorAll('[data-agent-turn]').forEach((detail, i) => {
      detail.classList.toggle('is-current', i === index);
      if (i === index) { detail.setAttribute('aria-current', 'step'); detail.open = true; }
      else detail.removeAttribute('aria-current');
    });
    const active = target.querySelector('.is-current');
    if (!active || progressBody.hidden || target.matches(':hover') || target.contains(document.activeElement)) return;
    const bounds = target.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    if (item.top < bounds.top || item.bottom > bounds.bottom) target.scrollTo({
      top: Math.max(0, target.scrollTop + item.top - bounds.top - 4), behavior: stillPage ? 'instant' : 'smooth',
    });
  };
  const phaseNotes = {
    'First policy': 'The initial policy is tried on the development cases.',
    Development: 'Development feedback guides revisions and another set of trials.',
    Selection: 'The candidate is checked on the declared selection cases.',
    Validation: 'The frozen policy is checked on validation cases without further edits.',
    'Fresh check': 'Additional cases check the selected policy after development.',
    'Original method': 'The earlier method provides the recorded baseline.',
    'Fresh layouts': 'A live agent runs the frozen script and lessons in new layouts.',
  };
  const heading = (meta) => `<div class="agent__record-head">${meta.split(' · ').map((part) => `<span>${esc(part)}</span>`).join('')}</div>`;
  const href = (run) => `/roboskills/showcase/run/?id=${run.split('/').map(encodeURIComponent).join('/')}`;
  const loadClip = (o) => {
    video.pause();
    delete video.dataset.inspection;
    video.removeAttribute('src');
    video.dataset.src = o.src;
    video.poster = o.poster;
    video.setAttribute('aria-label', o.label);
    video.load();
  };
  const playStage = (index) => {
    stageIndex = index;
    target.querySelectorAll('[data-agent-stage]').forEach((detail, i) => {
      detail.classList.toggle('is-current', i === index);
      detail.open = i === index;
    });
    loadClip(stages[index]);
    hydrateClip(video);
    if (!stillPage) playClip(video);
    updatePlayback(true);
  };
  const showRecord = async (variant) => {
    panel.dataset.run = variant.run;
    activeRecord = null;
    stages = variant.stages || null;
    stageIndex = 0;
    video.loop = !stages;
    currentTurn = -1;
    inspectedTurn = null;
    target.scrollTop = 0;
    updatePlayback();
    const run = variant.run.replace(/^agent-as-policy\//, '');
    const more = `<a class="agent__record-link" href="${href(run)}">View full run <span aria-hidden="true">↗</span></a>`;
    if (stages) {
      target.innerHTML = `<span class="agent__context">Campaign stages</span><ol class="agent__steps">${stages.map((s, i) => `
          <li><details class="agent__step${i ? '' : ' is-current'}" name="${esc(band.id)}-steps" data-agent-stage="${i}"${i ? '' : ' open'}>
            <summary><span class="agent__step-head"><span class="agent__step-n">${String(i + 1).padStart(2, '0')}</span><b>${esc(s.label)}</b><span class="agent__result">${esc(s.result)}</span></span></summary>
            <p class="agent__step-note">${esc(s.note)}</p>
          </details></li>`).join('')}</ol>` + heading(variant.research) + `<p class="agent__description">${esc(variant.blurb)}</p>`;
      updatePlayback(true);
      return;
    }
    if (variant.run.startsWith('auto-research/')) {
      const r = window.RK_SHOWCASE?.runs.find((r) => `${r.harness}/${r.id}` === variant.run);
      if (!r?.research) {
        target.innerHTML = heading('This task’s record is unavailable.') + more;
        return;
      }
      target.innerHTML = heading(`${r.research.minutes} min · ${r.research.calls} model calls`) +
        `<p class="agent__description">${esc(r.blurb)}</p><span class="agent__context">Campaign results</span><ol class="agent__steps">${r.research.phases.map(([label, result], i) => `
          <li><details class="agent__step" name="${esc(band.id)}-steps"${i ? '' : ' open'}>
            <summary><span class="agent__step-head"><span class="agent__step-n">${String(i + 1).padStart(2, '0')}</span><b>${esc(label)}</b><span class="agent__result">${esc(result)}</span></span></summary>
            <p class="agent__step-note">${esc(phaseNotes[label] || 'Recorded result from this research campaign.')}</p>
          </details></li>`).join('')}</ol>` + more;
      updatePlayback(true);
      return;
    }
    target.innerHTML = heading('Loading agent steps…');
    try {
      if (!requests.has(run)) requests.set(run, fetch(`/data/showcase/runs/${run}.json`).then((response) => {
        if (!response.ok) throw new Error('Run unavailable');
        return response.json();
      }));
      const r = await requests.get(run);
      if (panel.dataset.run !== variant.run) return;
      if (!Array.isArray(r.turns) || !r.turns.length) throw new Error('Run has no turn record');
      activeRecord = r;
      target.innerHTML = heading(`${r.turns.length} turns · ${r.robot}`) +
        `<ol class="agent__steps">${r.turns.map((turn, i) => `
          <li><details class="agent__step" name="${esc(band.id)}-steps" data-agent-turn="${i}">
            <summary><span class="agent__step-head"><span class="agent__step-n">${String(i + 1).padStart(2, '0')}</span><b>Turn ${i + 1}</b><span class="agent__turn-step">Step ${turn.step.toLocaleString('en-US')}</span></span><span class="agent__say">${esc(turn.say || 'Execute the next action.')}</span></summary>
            ${turn.code ? `<details class="agent__source"><summary><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18"/></svg>Python actions<span aria-hidden="true">+</span></summary><pre class="agent__code"><code>${rkHighlight(turn.code)}</code></pre></details>` : ''}
          </details></li>`).join('')}</ol>` + more;
      updatePlayback(true);
    } catch (error) {
      requests.delete(run);
      if (panel.dataset.run === variant.run) target.innerHTML = heading('The agent record could not be loaded.') + more;
    }
  };
  const showTask = (index, updateHash = false) => {
    const variant = band.variants[index];
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tabs[index].id);
    if (panel.dataset.run !== variant.run) {
      loadClip(variant);
      showRecord(variant);
    }
    const bounds = section.getBoundingClientRect();
    if (bounds.top < innerHeight && bounds.bottom > 0) {
      hydrateClip(video);
      if (!stillPage && !video.dataset.inspection) playClip(video);
    }
    if (updateHash) {
      history.replaceState(null, '', `#${variant.anchor}`);
      tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
    }
  };
  panel.addEventListener('click', (event) => {
    const stage = event.target.closest('[data-agent-stage] > summary');
    if (stage && stages) {
      event.preventDefault();
      playStage(Number(stage.parentElement.dataset.agentStage));
      return;
    }
    const source = event.target.closest('.agent__source > summary');
    if (source && !source.parentElement.open && activeRecord) {
      inspectedTurn = Number(source.closest('[data-agent-turn]').dataset.agentTurn);
      video.dataset.inspection = 'true';
      video.pause();
      updatePlayback(true);
      return;
    }
    const summary = event.target.closest('[data-agent-turn] > summary');
    if (!summary || !activeRecord) return;
    event.preventDefault();
    const detail = summary.parentElement;
    if (detail.open) { detail.open = false; return; }
    detail.open = true;
    const r = activeRecord;
    const index = Number(detail.dataset.agentTurn);
    inspectedTurn = index;
    const start = index ? r.turns[index - 1].step : 0;
    const seek = () => {
      if (activeRecord === r && Number.isFinite(video.duration)) {
        video.currentTime = Math.min(.999, start / (r.renderEnd || r.steps || 1)) * video.duration;
        updatePlayback(true);
      }
    };
    video.dataset.inspection = 'true';
    video.pause();
    hydrateClip(video);
    if (video.readyState) seek();
    else video.addEventListener('loadedmetadata', seek, { once: true });
  });
  video.addEventListener('ended', () => { if (stages) playStage((stageIndex + 1) % stages.length); });
  video.addEventListener('play', () => {
    if (video.paused) return;
    delete video.dataset.inspection;
    inspectedTurn = null;
    updatePlayback(true);
  });
  ['timeupdate', 'loadedmetadata', 'seeking', 'emptied', 'ended', 'pause', 'playing'].forEach((event) => video.addEventListener(event, () => updatePlayback()));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showTask(index, true));
    tab.addEventListener('keydown', (event) => {
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
      if (next < 0) return;
      event.preventDefault();
      tabs[next].focus();
      showTask(next, true);
    });
  });
  const openHash = (scroll = false) => {
    const index = band.variants.findIndex((v) => `#${v.anchor}` === location.hash);
    if (index < 0) return;
    showTask(index);
    if (scroll) section.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const index = band.variants.findIndex((v) => `#${v.anchor}` === link.hash);
    if (index < 0) return;
    event.preventDefault();
    showTask(index, true);
    section.scrollIntoView({ block: 'start', behavior: stillPage ? 'instant' : 'smooth' });
  });
  showTask(0);
  window.addEventListener('hashchange', () => openHash(true));
  document.addEventListener('DOMContentLoaded', () => openHash(true));
});

const lazyClips = [...document.querySelectorAll('video.lz')];
document.querySelectorAll('[data-stage-benchmark]').forEach((badge) => {
  const video = badge.parentElement.querySelector('video');
  const clock = badge.querySelector('[data-stage-seconds]');
  const status = badge.querySelector('[data-stage-status]');
  const rounds = JSON.parse(badge.dataset.rounds);
  const update = () => {
    const round = rounds.findLast((round) => video.currentTime >= round.start);
    const elapsed = badge.dataset.static === 'true' ? Number(badge.dataset.seconds) : Math.max(0, Math.min(Number(badge.dataset.seconds), video.currentTime - round.lead));
    clock.textContent = `${elapsed.toFixed(4)} s`;
    const label = badge.dataset.static === 'true' || video.currentTime >= round.lead + round.duration ? 'Complete' : video.currentTime >= round.lead ? 'Optimizing' : 'Ready';
    if (status.textContent !== label) status.textContent = label;
  };
  let timerFrame = 0;
  const tick = () => {
    update();
    if (!video.paused && !video.ended) timerFrame = requestAnimationFrame(tick);
  };
  video.addEventListener('playing', () => { cancelAnimationFrame(timerFrame); tick(); });
  video.addEventListener('pause', () => { cancelAnimationFrame(timerFrame); update(); });
  ['timeupdate', 'seeking', 'loadedmetadata', 'emptied'].forEach((event) => video.addEventListener(event, update));
  update();
});
if (lazyClips.length) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { hydrateClip(e.target); if (!stillPage && !e.target.dataset.inspection) playClip(e.target); }
        else e.target.pause();
      });
    }, { rootMargin: '320px 0px', threshold: 0.01 });
    lazyClips.forEach((v) => io.observe(v));
  } else {
    lazyClips.forEach(hydrateClip);
  }
}

// Match the scale demo's transition: hold the outgoing last frame underneath
// until the incoming clip is actually playing, then fade it in and warm the
// following clip. The fifth clip wraps back to the first.
const heroClips = [...document.querySelectorAll('[data-hero-clip]')];
if (heroClips.length > 1) {
  heroClips.forEach((clip) => {
    const rate = Number(clip.dataset.rate);
    clip.defaultPlaybackRate = rate;
    clip.playbackRate = rate;
    const ready = () => clip.classList.add('is-ready');
    clip.addEventListener('loadeddata', ready, { once: true });
    if (clip.readyState >= 2) ready();
  });
  const reelStill = document.querySelector('.hero-reel-still');
  const hideReelStill = () => reelStill.classList.add('is-hidden');
  heroClips[0].addEventListener('loadeddata', hideReelStill, { once: true });
  if (heroClips[0].readyState >= 2) hideReelStill();
  let activeHeroClip = 0;
  let heroChanging = false;
  const warmHeroClip = (i) => { heroClips[i].preload = 'auto'; };
  const advanceHero = () => {
    if (heroChanging) return;
    heroChanging = true;
    const previous = heroClips[activeHeroClip];
    const nextIndex = (activeHeroClip + 1) % heroClips.length;
    const next = heroClips[nextIndex];
    next.currentTime = 0;
    const reveal = () => {
      previous.classList.remove('is-active');
      previous.classList.add('is-under');
      next.classList.add('is-active', 'is-entering');
      requestAnimationFrame(() => requestAnimationFrame(() => next.classList.remove('is-entering')));
      setTimeout(() => { previous.classList.remove('is-under'); previous.pause(); }, 300);
      activeHeroClip = nextIndex;
      heroChanging = false;
      warmHeroClip((activeHeroClip + 1) % heroClips.length);
    };
    next.addEventListener('playing', reveal, { once: true });
    const started = next.play();
    if (started) started.catch(() => { heroChanging = false; });
  };
  heroClips.forEach((clip, i) => clip.addEventListener('ended', () => {
    if (i === activeHeroClip) advanceHero();
  }));
  warmHeroClip(1);
}

// The gallery's tab strip only decides which pane is shown; a hidden pane
// never intersects, so its clips stay cold until it is opened and the observer
// above starts them on its own.
// ---------- bento: the cursor lights every border, not just one ----------
// Each card's border gradient is centred on the pointer in that card's own
// coordinates. The values are deliberately unclamped: a distant card gets a
// centre far outside itself and so catches only the gradient's faint tail,
// which is what makes the far cards fade without measuring any distances.
// One listener for the whole grid, coalesced onto a frame.
document.querySelectorAll('.bento__grid, .bento__row').forEach((grid) => {
  if (stillPage) return;
  const cards = [...grid.children];
  let point = null;
  let frame = 0;
  const paint = () => {
    frame = 0;
    if (!point) return;
    for (const card of cards) {
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${point.x - box.left}px`);
      card.style.setProperty('--my', `${point.y - box.top}px`);
    }
  };
  grid.addEventListener('pointermove', (event) => {
    point = { x: event.clientX, y: event.clientY };
    if (!frame) frame = requestAnimationFrame(paint);
  });
  grid.addEventListener('pointerenter', () => grid.classList.add('is-lit'));
  grid.addEventListener('pointerleave', () => {
    grid.classList.remove('is-lit');
    cancelAnimationFrame(frame);
    frame = 0;
    point = null;
  });
});

// ---------- a bento card that rolls through its family ----------
// The in-hand card has four objects to show and one frame to show them in, so
// it plays each in turn. Same three-class crossfade as the hero above — the
// outgoing clip stays opaque underneath while the incoming one fades in, so the
// poster behind them never flashes through — but paced by a timer rather than
// by the clip ending, because these run from five to twenty seconds.
document.querySelectorAll('[data-bento-reel]').forEach((frame) => {
  const clips = [...frame.querySelectorAll('.card-clip')];
  if (clips.length < 2) return;
  const dwell = Number(frame.dataset.bentoReel) || 6000;
  let at = 0;
  let timer = 0;
  const warm = (i) => hydrateClip(clips[i % clips.length]);
  const advance = () => {
    const previous = clips[at];
    at = (at + 1) % clips.length;
    const next = clips[at];
    warm(at);
    warm(at + 1);
    next.classList.add('is-active', 'is-entering');
    previous.classList.remove('is-active');
    previous.classList.add('is-under');
    try { next.currentTime = 0; } catch (e) {}
    playClip(next);
    requestAnimationFrame(() => next.classList.remove('is-entering'));
    setTimeout(() => { previous.classList.remove('is-under'); previous.pause(); }, 420);
  };
  const start = () => {
    if (stillPage || timer) return;
    warm(at);
    warm(at + 1);
    playClip(clips[at]);
    timer = setInterval(advance, dwell);
  };
  const stop = () => {
    clearInterval(timer);
    timer = 0;
    clips.forEach((v) => v.pause());
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? start() : stop()));
    }, { rootMargin: '200px 0px', threshold: 0.01 }).observe(frame);
  } else {
    start();
  }
});

// ---------- RetargetingKit capability reels ----------
// A reel only hydrates its active clip and the next one. Videos pause offscreen;
// autoplay pauses (without freezing the active clip) while a person is hovering
// or using the controls, and reduced-motion users navigate the posters instead.
document.querySelectorAll('[data-motion-reel]').forEach((card) => {
  const group = kit.showcase.groups[Number(card.dataset.motionReel)];
  const clips = [...card.querySelectorAll('.motion-stage__clip')];
  const sceneButtons = [...card.querySelectorAll('[data-motion-scene]')];
  const poster = card.querySelector('[data-motion-poster]');
  const sceneLabel = card.querySelector('[data-motion-label]');
  const announcer = card.querySelector('[data-motion-announcer]');
  const many = clips.length > 1;
  let at = 0;
  let inView = false;
  let hovered = false;
  let focused = false;
  let timer = 0;

  clips.forEach((video) => {
    const ready = () => video.classList.add('is-ready');
    video.addEventListener('loadeddata', ready, { once: true });
    if (video.readyState >= 2) ready();
  });

  const canPlay = () => inView && !stillPage && !document.hidden;
  const canAdvance = () => canPlay() && !hovered && !focused;
  const warm = (index) => hydrateClip(clips[(index + clips.length) % clips.length]);
  const schedule = () => {
    clearTimeout(timer);
    timer = 0;
    if (!many || !canAdvance()) return;
    if (group.advance === 'timer') {
      timer = setTimeout(() => selectScene(at + 1, false), Number(group.dwell) || 6000);
    } else if (group.advance === 'ended' && clips[at].ended) {
      selectScene(at + 1, false);
    }
  };
  const refreshPlayback = () => {
    clearTimeout(timer);
    timer = 0;
    if (!canPlay()) {
      clips.forEach((video) => video.pause());
      return;
    }
    warm(at);
    if (many) warm(at + 1);
    clips.forEach((video, i) => {
      if (i === at) playClip(video);
      else video.pause();
    });
    schedule();
  };
  function selectScene(nextIndex, announce) {
    const next = (nextIndex + clips.length) % clips.length;
    const item = group.items[next];
    const previous = clips[at];
    const incoming = clips[next];
    poster.src = item.poster;
    if (sceneLabel) sceneLabel.textContent = item.label;
    sceneButtons.forEach((button, i) => {
      const active = i === next;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (announce) announcer.textContent = `${group.name}: ${item.label}`;
    if (next !== at) {
      clearTimeout(previous._motionFade);
      previous.classList.remove('is-active', 'is-entering');
      previous.classList.add('is-under');
      clips.forEach((video, i) => {
        if (i !== at && i !== next) video.classList.remove('is-active', 'is-under', 'is-entering');
      });
      at = next;
      if (!stillPage) warm(at);
      try { incoming.currentTime = 0; } catch (error) {}
      incoming.classList.add('is-active', 'is-entering');
      const reveal = () => requestAnimationFrame(() => requestAnimationFrame(() => incoming.classList.remove('is-entering')));
      incoming.addEventListener('playing', reveal, { once: true });
      previous._motionFade = setTimeout(() => {
        previous.classList.remove('is-under');
        previous.pause();
      }, 380);
    }
    refreshPlayback();
  }

  sceneButtons.forEach((button) => button.addEventListener('click', () => {
    selectScene(Number(button.dataset.motionScene), true);
  }));
  clips.forEach((video, i) => video.addEventListener('ended', () => {
    if (group.advance === 'ended' && i === at && canAdvance()) selectScene(at + 1, false);
  }));
  card.addEventListener('pointerenter', () => { hovered = true; schedule(); });
  card.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  card.addEventListener('focusin', () => { focused = true; schedule(); });
  card.addEventListener('focusout', (event) => {
    if (!card.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  document.addEventListener('visibilitychange', refreshPlayback);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting;
        refreshPlayback();
      });
    }, { rootMargin: '180px 0px', threshold: 0.08 }).observe(card);
  } else {
    inView = true;
    refreshPlayback();
  }
});

// ---------- RetargetingKit motion range ----------
// One lazy player serves every example. Categories remember their selection.
const motionRange = document.querySelector('[data-motion-range]');
if (motionRange) {
  const groups = kit.motionRange.items;
  const tabs = [...motionRange.querySelectorAll('[data-motion-range-tab]')];
  const pickers = [...motionRange.querySelectorAll('[data-motion-range-picker]')];
  const video = motionRange.querySelector('video');
  const poster = motionRange.querySelector('[data-motion-range-poster]');
  const label = motionRange.querySelector('[data-motion-range-label]');
  const count = motionRange.querySelector('[data-motion-range-count]');
  const playButton = motionRange.querySelector('[data-motion-range-play]');
  const choices = groups.map(() => 0);
  let groupIndex = 0;
  let inView = false;
  let playing = !stillPage;

  video.addEventListener('loadeddata', () => video.classList.add('is-ready'));
  const refreshPlayback = () => {
    const action = playing ? 'Pause' : 'Play';
    playButton.textContent = action;
    playButton.setAttribute('aria-label', `${action} example video`);
    if (inView && playing && !document.hidden) {
      hydrateClip(video);
      playClip(video);
    } else video.pause();
  };
  const selectRange = (nextGroup, nextClip) => {
    const changed = nextGroup !== groupIndex || nextClip !== choices[groupIndex];
    groupIndex = nextGroup;
    choices[groupIndex] = nextClip;
    const item = groups[groupIndex].clips[nextClip];
    tabs.forEach((button, i) => {
      button.classList.toggle('is-active', i === groupIndex);
      button.setAttribute('aria-pressed', String(i === groupIndex));
      pickers[i].hidden = i !== groupIndex;
    });
    [...pickers[groupIndex].querySelectorAll('button')].forEach((button, i) => {
      button.classList.toggle('is-active', i === nextClip);
      button.setAttribute('aria-pressed', String(i === nextClip));
      button.tabIndex = i === nextClip ? 0 : -1;
    });
    label.textContent = item.label;
    count.textContent = String(nextClip + 1).padStart(2, '0') + ' / ' + groups[groupIndex].clips.length;
    if (changed) {
      video.pause();
      video.classList.remove('is-ready');
      poster.src = item.poster;
      video.poster = item.poster;
      video.removeAttribute('src');
      video.dataset.src = item.src;
      video.load();
    }
    refreshPlayback();
  };

  tabs.forEach((button, i) => button.addEventListener('click', () => selectRange(i, choices[i])));
  pickers.forEach((picker, i) => {
    const buttons = [...picker.querySelectorAll('button')];
    buttons.forEach((button, j) => {
      button.addEventListener('click', () => selectRange(i, j));
      button.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1
          : (j + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
        buttons[next].focus();
        selectRange(i, next);
      });
    });
  });
  playButton.addEventListener('click', () => {
    playing = !playing;
    refreshPlayback();
  });
  document.addEventListener('visibilitychange', refreshPlayback);
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    refreshPlayback();
  }, { threshold: 0.08 }).observe(motionRange);
  refreshPlayback();
}

const scaleRange = document.querySelector('#scale-range input');
if (scaleRange) {
  const scale = document.querySelector('.scale');
  const clips = [...document.querySelectorAll('.scale__clip')];
  const rangeWrap = document.getElementById('scale-range');
  const ticks = document.querySelector('.scale__ticks');
  const taskButtons = [...document.querySelectorAll('.scale__tasks button')];
  const count = document.getElementById('scale-count');
  const countLabel = document.getElementById('scale-count-label');
  const solveTime = document.getElementById('scale-seconds');
  const timeUnit = document.getElementById('scale-time-unit');
  const workloadLabel = document.getElementById('scale-workload');
  const playbackFooter = scale.querySelector('[data-scale-footer]');
  const playbackCaption = scale.querySelector('[data-scale-caption]');
  const playbackButton = scale.querySelector('[data-scale-playback]');
  const mobileScale = window.matchMedia('(max-width: 640px)');
  const selectedSteps = kit.scale.tasks.map((task) => kit.scale.initialStep ?? task.steps.length - 1);
  let taskIndex = 0;
  let stepIndex = selectedSteps[0];
  let inView = !kit.scale.lazy;
  let userPaused = stillPage;
  const finishedClips = new Set();
  const refreshPlayback = () => {
    const canPlay = inView && !document.hidden && (kit.scale.tasks[taskIndex].playbackControl ? !userPaused : !stillPage);
    clips.forEach((video) => {
      if (video.classList.contains('is-active')) {
        if (canPlay || finishedClips.has(video) || video.onloadedmetadata) hydrateClip(video);
        if (canPlay && !finishedClips.has(video) && !video.onloadedmetadata) playClip(video);
        else video.pause();
      } else video.pause();
    });
    if (playbackButton) {
      const active = clips.find(video => video.classList.contains('is-active'));
      const action = finishedClips.has(active) ? 'Replay' : userPaused ? 'Play' : 'Pause';
      playbackButton.textContent = action;
      playbackButton.setAttribute('aria-label', `${action} animation`);
    }
  };
  const updateScaleMedia = () => {
    clips.forEach((video) => {
      const task = kit.scale.tasks[Number(video.dataset.task)];
      const step = task.steps[Number(video.dataset.step)];
      if (!step.mobileVideo) return;
      const src = mobileScale.matches ? step.mobileVideo : step.video;
      video.poster = mobileScale.matches ? step.mobilePoster : step.poster;
      if (video.getAttribute('src') === src) return;
      video.dataset.src = src;
      if (video.hasAttribute('src')) {
        if (task.playbackControl || task.loop === false) {
          const currentTime = video.currentTime;
          video.onloadedmetadata = () => {
            video.currentTime = finishedClips.has(video) ? video.duration : Math.min(currentTime, video.duration);
            video.onloadedmetadata = null;
            refreshPlayback();
          };
        }
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    });
    refreshPlayback();
  };
  const selectScale = (nextTask, nextStep) => {
    const task = kit.scale.tasks[nextTask];
    const step = task.steps[Math.min(nextStep, task.steps.length - 1)];
    taskIndex = nextTask;
    stepIndex = Math.min(nextStep, task.steps.length - 1);
    selectedSteps[taskIndex] = stepIndex;
    scale.classList.toggle('scale--responsive', Boolean(step.mobileVideo));
    scale.classList.toggle('scale--neutral-stage', Boolean(task.neutralStage));
    if (step.mobileAspect) scale.style.setProperty('--scale-mobile-aspect', step.mobileAspect);
    else scale.style.removeProperty('--scale-mobile-aspect');
    if (playbackFooter) {
      playbackFooter.hidden = !task.playbackControl;
      playbackCaption.textContent = step.description || '';
    }
    scaleRange.max = task.steps.length - 1;
    scaleRange.value = stepIndex;
    scaleRange.setAttribute('aria-label', `${task.label} batch size`);
    scaleRange.setAttribute('aria-valuetext', `${step.batch.toLocaleString()} ${task.unit}`);
    rangeWrap.style.setProperty('--scale-p', stepIndex / Math.max(1, task.steps.length - 1));
    if (count) count.textContent = step.batch.toLocaleString();
    if (countLabel) countLabel.textContent = task.unit;
    if (solveTime) {
      solveTime.textContent = `${step.seconds.toFixed(4)} s`;
      solveTime.title = task.timeDetails;
    }
    if (timeUnit) timeUnit.textContent = task.timeUnit;
    if (workloadLabel) workloadLabel.textContent = task.timeDescription;
    taskButtons.forEach((button, i) => {
      button.classList.toggle('is-active', i === taskIndex);
      button.setAttribute('aria-pressed', i === taskIndex);
    });
    if (ticks.children.length !== task.steps.length) {
      ticks.innerHTML = task.steps.map((item, i) => `<button type="button" data-step="${i}"></button>`).join('');
    }
    [...ticks.children].forEach((button, i) => {
      const item = task.steps[i];
      button.style.setProperty('--p', i / Math.max(1, task.steps.length - 1));
      button.classList.toggle('is-active', i === stepIndex);
      button.setAttribute('aria-label', `Show ${item.batch.toLocaleString()} ${task.unit}`);
      button.setAttribute('aria-pressed', String(i === stepIndex));
      button.textContent = item.batch.toLocaleString();
    });
    const next = clips.find((clip) => Number(clip.dataset.task) === taskIndex && Number(clip.dataset.step) === stepIndex);
    clearTimeout(next._fade);
    if (next.classList.contains('is-active')) {
      refreshPlayback();
      return;
    }
    const prev = clips.find((c) => c.classList.contains('is-active'));
    if (kit.scale.syncPlayback && prev) {
      const currentTime = prev.currentTime;
      const seek = () => {
        next.currentTime = currentTime % next.duration;
        next.onloadedmetadata = null;
        refreshPlayback();
      };
      if (next.readyState >= 1) seek();
      else next.onloadedmetadata = seek;
    }
    clips.forEach((c) => c.classList.remove('is-under'));
    if (prev) { prev.classList.remove('is-active'); prev.classList.add('is-under'); }
    next.classList.add('is-active', 'is-entering');
    requestAnimationFrame(() => requestAnimationFrame(() => next.classList.remove('is-entering')));
    if (prev) {
      clearTimeout(prev._fade);
      prev._fade = setTimeout(() => { prev.classList.remove('is-under'); prev.pause(); }, 300);
    }
    refreshPlayback();
  };
  scaleRange.addEventListener('input', () => selectScale(taskIndex, Number(scaleRange.value)));
  ticks.addEventListener('click', (event) => {
    const tick = event.target.closest('button');
    if (tick) selectScale(taskIndex, Number(tick.dataset.step));
  });
  taskButtons.forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.task);
    selectScale(index, playbackFooter ? selectedSteps[index] : stepIndex);
  }));
  clips.forEach(video => video.addEventListener('ended', () => {
    finishedClips.add(video);
    refreshPlayback();
  }));
  if (playbackButton) {
    playbackButton.addEventListener('click', () => {
      const active = clips.find(video => video.classList.contains('is-active'));
      if (finishedClips.delete(active)) {
        active.currentTime = 0;
        userPaused = false;
      } else userPaused = !userPaused;
      refreshPlayback();
    });
  }
  mobileScale.addEventListener('change', updateScaleMedia);
  updateScaleMedia();
  document.addEventListener('visibilitychange', refreshPlayback);
  if (kit.scale.lazy && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting;
        refreshPlayback();
      });
    }, { rootMargin: '220px 0px', threshold: 0.08 }).observe(scale);
  } else {
    inView = true;
    refreshPlayback();
  }
}

// The bars run out from zero the first time the table is on screen, one row
// after the next; hovering (or focusing) a bar names the number behind it.
// Each pane's table does this on its own; a pane behind a tab runs out when its tab is chosen.
document.querySelectorAll('.bench__table').forEach((benchTable) => {
  // The figures count with their bars: a row's number starts on the same beat
  // its bar does, but on a tighter stagger, so every read-out lands together on
  // the frame the last bar finishes rather than trailing it one by one.
  const countUp = () => {
    const START = 1, END = 760, EXP = 20;
    benchTable.querySelectorAll('.bench__fig .n').forEach((el, i) => {
      const raw = el.dataset.to || '0';
      const to = parseFloat(raw);
      const dec = raw.includes('.') ? 1 : 0;
      const final = to.toFixed(dec);
      const delay = Math.round(i * 90 * 0.55);
      // A big number reaches its last digit earlier in the ease than a small
      // one, so stretch each row's duration until every read-out settles at END.
      const eps = Math.min(0.9, (0.5 * Math.pow(10, -dec)) / Math.abs(to - START));
      const settle = -Math.log2(eps) / EXP;
      const dur = (END - delay) / (settle > 0 && settle < 1 ? settle : 1);
      el.textContent = START.toFixed(dec);
      const t0 = performance.now() + delay;
      const step = (now) => {
        const p = Math.min(1, Math.max(0, (now - t0) / dur));
        const e = p >= 1 ? 1 : 1 - Math.pow(2, -EXP * p);
        const txt = (START + (to - START) * e).toFixed(dec);
        el.textContent = txt;
        if (p < 1 && txt !== final) requestAnimationFrame(step);
        else el.textContent = final;
      };
      requestAnimationFrame(step);
    });
  };

  const reveal = () => {
    if (benchTable.classList.contains('is-in')) return;
    benchTable.classList.add('is-in');
    countUp();
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) benchTable.classList.add('is-in');
  else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.disconnect(); } });
    }, { threshold: 0.25 });
    io.observe(benchTable);
  }

  // One read-out per row rather than per bar: the pair is the comparison, and
  // a single figure on its own says nothing.
  const tip = document.createElement('div');
  tip.className = 'bench__tip';
  benchTable.appendChild(tip);
  const show = (bars) => {
    const d = bars.dataset;
    tip.innerHTML = `<span class="r"><i class="ours"></i>${d.ours}<b>${d.pct}</b></span>` +
      `<span class="r"><i class="base"></i>${d.base}<b>${d.basePct}</b></span>`;
    const t = benchTable.getBoundingClientRect();
    const b = bars.querySelector('i').getBoundingClientRect();
    const row = bars.getBoundingClientRect();
    tip.classList.add('is-on');
    const w = tip.offsetWidth, h = tip.offsetHeight;
    // beside the leading bar's end, centred on the pair
    let x = b.right - t.left + 14;
    if (x + w > t.width - 10) x = b.right - t.left - w - 14;
    const y = row.top - t.top + row.height / 2 - h / 2;
    tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  };
  const hide = () => tip.classList.remove('is-on');
  benchTable.querySelectorAll('.bench__bars').forEach((bars) => {
    bars.addEventListener('pointerenter', () => show(bars));
    bars.addEventListener('focus', () => show(bars));
    bars.addEventListener('pointerleave', hide);
    bars.addEventListener('blur', hide);
  });
  window.addEventListener('scroll', hide, { passive: true });
});

const cue = document.getElementById('scrollcue');
if (cue) cue.addEventListener('click', () => {
  const el = document.querySelector('#page .band');
  if (!el) return;
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  el.scrollIntoView({ behavior, block: 'start' });
});

// The API examples are one card with a tab strip: every pane is rendered and
// the strip only decides which is on top, so switching costs no layout work.
document.querySelectorAll('.api__tabs').forEach((apiTabs) => {
  const panes = [...apiTabs.closest('.api__demo').querySelectorAll('.api__pane')];
  const buttons = [...apiTabs.querySelectorAll('button')];
  apiTabs.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    const i = Number(button.dataset.api);
    buttons.forEach((b, n) => { b.classList.toggle('is-active', n === i); b.setAttribute('aria-selected', n === i); });
    panes.forEach((p, n) => p.classList.toggle('is-active', n === i));
  });
});
