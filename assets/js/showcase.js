// Renders the RoboSkills showcase from data/showcase.js: the hub at
// /roboskills/showcase/, or, on a page with <body data-page="run">, one run at
// /roboskills/showcase/run/?id=. An agent-as-policy run (id <benchmark>/<run>)
// shows its turns, fetched from data/showcase/runs/; any other run (id
// <harness>/<run>) shows its clip.

(() => {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const S = window.RK_SHOWCASE;
  const RUNS = [...window.RK_SHOWCASE_AAP, ...S.runs];
  const HARNESS = Object.fromEntries(S.harnesses.map((h) => [h.id, h.label]));
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phone = window.matchMedia('(max-width: 640px)'); // where the hub folds its flows and swipes its runs
  const page = document.getElementById('page');

  // The RoboSkills colourway, set as project.js sets it on the kit page.
  const theme = window.RK_THEMES.roboskills;
  Object.entries({
    '--accent': theme.accent, '--pop': theme.accent, '--chip-fg': theme.chipFg, '--band': theme.band,
    '--hover-bg': theme.hoverBg, '--bar-bg': theme.barBg, '--label-muted': theme.labelMuted, '--code-comment': theme.codeComment,
    '--fade0': `rgba(${theme.rgb},0.78)`, '--fade1': `rgba(${theme.rgb},0.40)`, '--fade2': `rgba(${theme.rgb},0)`,
  }).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  document.body.classList.add('project--roboskills', 'project--legacy');
  rkRenderNav('roboskills');

  const mediaVersion = (run) => run.mediaVersion ? `?v=${encodeURIComponent(run.mediaVersion)}` : '';
  const clip = (run) => `/assets/videos/showcase/${run.harness}/${run.id}.mp4${mediaVersion(run)}`;
  const hasClip = (run) => S.media || Boolean(run.render || run.clip); // a run whose clip shipped before `media` did
  const poster = (run) => `/assets/images/showcase/${run.harness}/${run.id}.webp${mediaVersion(run)}`;
  const key = (run) => (run.harness === 'agent-as-policy' ? run.id : `${run.harness}/${run.id}`);
  const runHref = (run) => `/roboskills/showcase/run/?id=${key(run).split('/').map(encodeURIComponent).join('/')}`;
  const plural = (n, word) => `${n.toLocaleString('en-US')} ${word}${n === 1 ? '' : 's'}`;
  const duration = (s) => (s < 90 ? `${Math.round(s)} s` : `${Math.round(s / 60)} min`); // an agent's working time
  const crumbs = (items) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([label, href], i) =>
    (i ? '<li class="crumbs__sep" aria-hidden="true">/</li>' : '') +
    (href ? `<li><a href="${href}">${esc(label)}</a></li>` : `<li aria-current="page">${esc(label)}</li>`)).join('')}</ol></nav>`;
  const eyebrow = (label, count) =>
    `<div class="band__eyebrow"><h2 class="chip">${esc(label)}</h2><span class="rule"></span><span class="runs__count">${esc(count)}</span></div>`;
  const home = [['RoboSkills', '/roboskills/'], ['Showcase', '/roboskills/showcase/']];
  // Every run page links the previous and next run of its harness by its title, and closes on three more of them,
  // the ones from the same source first.
  // What the agent was asked, in the box every run page shows it in.
  const requestBox = (text) => `<section class="run__request"><h2 class="mg-label">The request</h2><blockquote class="mg-request">${esc(text)}</blockquote></section>`;
  const harnessRuns = (r) => RUNS.filter((x) => x.harness === r.harness);
  const runNav = (r) => {
    const runs = harnessRuns(r), at = runs.findIndex((x) => key(x) === key(r));
    const [prev, next] = [runs[(at + runs.length - 1) % runs.length], runs[(at + 1) % runs.length]];
    return `
          <div class="mg-head__nav">
            <a class="mg-btn" href="${runHref(prev)}">← ${esc(prev.name)}</a>
            <a class="mg-btn mg-btn--dark" href="${runHref(next)}">${esc(next.name)} →</a>
          </div>`;
  };
  const moreRuns = (r) => {
    const runs = harnessRuns(r), others = runs.filter((x) => key(x) !== key(r));
    const more = [...others.filter((x) => x.source === r.source), ...others.filter((x) => x.source !== r.source)].slice(0, 3);
    return `
        <section class="mg-more" aria-label="More ${esc(HARNESS[r.harness])} runs">
          <div class="mg-sub"><h2>${r.request ? `More from ${esc(r.source.toLowerCase())}` : `More ${esc(HARNESS[r.harness])}`}</h2><span class="rule"></span><a href="/roboskills/showcase/?harness=${r.harness}">All ${runs.length} ${r.harness === 'motion-generation' ? 'motion' : esc(HARNESS[r.harness])} runs</a></div>
          <div class="mg-more__grid">${more.map((x) => `
            <a href="${runHref(x)}"><span class="mg-more__img"><img src="${poster(x)}" alt="" loading="lazy" /></span><span class="mg-more__name">${esc(x.name)} <small>${esc(x.robot)}</small></span></a>`).join('')}
          </div>
        </section>`;
  };

  // A card's clip loads when it nears the viewport and plays only while in it.
  const watch = new IntersectionObserver((entries) => entries.forEach(({ target: v, isIntersecting }) => {
    if (!isIntersecting) return v.pause();
    if (!v.src) v.src = v.dataset.src;
    if (!still) v.play().catch(() => {});
  }), { rootMargin: '200px 0px' });

  const ICON = {
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" /></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>',
    loop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v4.5h-4.5" /></svg>',
    filter: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9M19 7h1M4 17h1M11 17h9" /><circle cx="16" cy="7" r="3" /><circle cx="8" cy="17" r="3" /></svg>',
    chevron: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>',
  };
  const media = (r, kind, ext, suffix = '') => `/assets/${kind}/showcase/${r.harness}/${r.id}${suffix}.${ext}${mediaVersion(r)}`;
  // Every hub card fills the same slots: pills on the clip's top left, a picture of what went in at its bottom
  // right, the name beside the robot, a description and a foot of stats. Each harness picks what fills them; the
  // pills default to the run's source and the description to its blurb, or to its text input in quotes. A run
  // without a clip shows no media box: its pills move into the caption. A card on a phone's rail keeps the name
  // and one line of the robot and its first stat, two for an agent's turns and steps.
  const SLOTS = {
    'agent-as-policy': (r) => ({
      pills: [[r.source, r.id.split('/')[0]], [r.task]], quote: r.blurb,
      foot: [plural(r.turns, 'turn'), plural(r.steps, 'step'), ...(r.seconds ? [duration(r.seconds)] : []),
        ...(r.render ? [`${r.render.seeds} seeds solved`] : [])] }),
    'agentic-simulation': (r) => ({
      quote: r.instruction || (r.solution && r.solution.instruction),
      foot: r.collection ? [`${r.collection.accepted} verified demos`, '0 model calls per demo']
        : r.solution ? [`${r.solution.validation} validation seeds passed`] : r.seeds ? [`${r.seeds} seeds solved`,
          ...(r.agent ? [`built in ${duration(r.agent.build * 60)}`, `solved in ${duration(r.agent.solve * 60)}`] : [])] : [] }),
    real2sim: (r) => ({
      inset: media(r, 'images', 'webp', '-input'),
      foot: r.stats.map(([label, v, unit]) => `${label} ${v}${unit ? ` ${unit}` : ''}`) }),
    'auto-research': (r) => ({
      foot: r.research ? [`${r.research.minutes} min research`, plural(r.research.calls, 'model call'),
        ...r.research.phases.slice(-1).map(([label, v]) => `${v} ${label.toLowerCase()}`)] : [] }),
    'motion-generation': (r) => ({
      inset: r.source === 'Text' ? null : media(r, 'images', 'webp', '-input'), quote: r.source === 'Text' && r.request,
      foot: [...(r.minutes == null ? [] : [`${r.minutes} min`]), ...(r.revisions == null ? [] : [plural(r.revisions, 'revision')])] }),
  };
  const card = (r, rail) => {
    const s = { pills: [[r.source]], inset: null, foot: [], ...(SLOTS[r.harness] || (() => ({})))(r) };
    const pills = `<span class="runs__pills">${s.pills.map(([text, bench]) =>
      `<span class="runs__pill"${bench ? ` data-bench="${esc(bench)}"` : ''}>${esc(text)}</span>`).join('')}</span>`;
    const inset = s.inset ? `<span class="runs__inset"><img src="${s.inset}" alt="" loading="lazy" /></span>` : '';
    const stats = s.foot.slice(0, r.harness === 'agent-as-policy' ? 2 : 1);
    return `
            <a class="runs__card" href="${runHref(r)}">
              ${hasClip(r) ? `<div class="runs__media"><video data-src="${clip(r)}" poster="${poster(r)}" muted loop playsinline preload="none"></video>${pills}${inset}</div>` : ''}
              <div class="runs__cap">${hasClip(r) ? '' : pills}${rail ? `
                <h3 class="runs__name">${esc(r.name)}</h3>
                <p class="runs__meta"><b>${esc(r.robot)}</b>${stats.map((t) => ` · ${esc(t)}`).join('')}</p>` : `
                <div class="runs__top"><h3 class="runs__name">${esc(r.name)}</h3><span class="runs__aside">${esc(r.robot)}</span></div>
                <p class="runs__blurb">${s.quote ? `“${esc(s.quote)}”` : esc(r.blurb)}</p>
                ${s.foot.length ? `<div class="runs__foot">${s.foot.map(esc).join(' · ')}</div>` : ''}`}
              </div>
            </a>`;
  };
  // A section's illustration (data/showcase.js `flow`): what goes in, the agent's loop, what comes out. A phone
  // folds it under one line, so the runs come first.
  const flowItem = (it) => `<span class="runs__flow-item${it.img ? '' : ' runs__flow-item--text'}">${
    it.img ? `<img src="/assets/images/showcase/${it.img}" alt="" loading="lazy" />` : ''}<b>${esc(it.tag)}</b>${
    it.code ? `<code>${esc(it.code)}</code>` : it.text ? `<span>${esc(it.text)}</span>` : ''}</span>`;
  const flowCol = (label, items) => `
            <div class="runs__flow-col">
              <span class="runs__flow-label">${esc(label)}</span>
              <div class="runs__flow-items" style="grid-template-columns: repeat(${items.length}, minmax(0, 1fr))">${items.map(flowItem).join('')}</div>
            </div>`;
  const flowFigure = (h) => `
          <figure class="runs__flow" aria-label="How ${esc(h.label)} works">${flowCol(h.flow.in, h.flow.inputs)}
            <span class="runs__flow-arrow" aria-hidden="true"></span>
            <div class="runs__flow-col runs__flow-col--agent">
              <span class="runs__flow-label">${esc(h.flow.agent)}</span>
              <ol class="runs__flow-loop">${h.flow.steps.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>
              <span class="runs__flow-again">${ICON.loop}${esc(h.flow.again)}</span>
            </div>
            <span class="runs__flow-arrow" aria-hidden="true"></span>${flowCol(h.flow.out, h.flow.outputs)}
          </figure>`;
  const flow = (h) => {
    if (!h.flow) return '';
    return phone.matches ? `
          <details class="runs__how">
            <summary><b>How it works</b><small>${[h.flow.in, h.flow.agent, h.flow.out].map(esc).join(' → ')}</small>${ICON.chevron}</summary>${flowFigure(h)}
          </details>` : flowFigure(h);
  };
  // A harness with `groups` (data/showcase.js) shows its runs in subsections, one per group.
  const subGroups = (h, items) => {
    const sub = h.groups.map(([g, label]) => {
      const rs = items.filter((r) => r.group === g);
      return rs.length ? `
          <div class="mg-sub"><h3>${label}</h3><span class="rule"></span><span class="runs__count">${plural(rs.length, 'run')}</span></div>
          <div class="runs__grid">${rs.map((r) => card(r)).join('')}</div>` : '';
    }).join('');
    return `
        <section class="runs__group mg-group" aria-label="${esc(h.label)}">
          ${eyebrow(h.label, plural(items.length, 'run'))}
          ${flow(h)}${sub}
        </section>`;
  };
  // "All" on a phone: each harness is one row to swipe, its groups run together, and its name leads to the rest.
  const rail = (h, items) => {
    const runs = h.groups ? h.groups.flatMap(([g]) => items.filter((r) => r.group === g)) : items;
    return `
        <section class="runs__group" aria-label="${esc(h.label)}">
          <div class="band__eyebrow"><h2 class="chip">${esc(h.label)}</h2><button type="button" class="runs__all" data-open="${h.id}">All ${items.length} →</button></div>
          <div class="runs__rail">${runs.map((r) => card(r, true)).join('')}
          </div>
        </section>`;
  };

  const simFacts = (r) => r.collection ? `
    <dl class="sim-facts">
      <div><dt>Verified demos</dt><dd>${r.collection.accepted}</dd></div>
      <div><dt>Collection attempts</dt><dd>${r.collection.attempts}</dd></div>
      <div><dt>Validation seeds</dt><dd>${r.collection.validation} / ${r.collection.validation}</dd></div>
      <div><dt>Model calls per demo</dt><dd>0</dd></div>
    </dl>` : '';
  const simTiming = (items) => {
    const rows = items.filter((r) => r.collection);
    if (!rows.length) return '';
    return `
      <div class="sim-timing">
        <h4>Verified collection with a saved script</h4>
        <div class="sim-table"><table>
          <caption>Seconds per demo, including recording and independent replay</caption>
          <thead><tr><th>Robot</th><th>Warm before</th><th>Warm with reuse</th><th>First episode with reuse</th></tr></thead>
          <tbody>${rows.map((r) => `<tr><th>${esc(r.robot)}</th><td>${r.collection.before.toFixed(2)} s</td><td>${r.collection.after.toFixed(2)} s</td><td>${r.collection.first.toFixed(2)} s</td></tr>`).join('')}</tbody>
        </table></div>
        <p class="sim-method">Five matched episodes after the first initialization, one RTX 3090 worker per case, with populated GPU kernel caches. Includes native execution, RGB-D recording, export checks and separate replay. Excludes script generation, SSH transfers and Blender rendering.</p>
        <details class="sim-details"><summary>Startup and measurement details</summary>
          <p>The six-demo batches include the first initialization and worker setup: ${rows.map((r) => `${esc(r.robot)} ${r.collection.batchBefore.toFixed(2)} → ${r.collection.batchAfter.toFixed(2)} s`).join('; ')}. All matched executions and replays passed with zero joint gap. These short runs measure worker reuse; they do not time the original 128-demo collections.</p>
        </details>
      </div>`;
  };

  function hub() {
    const q = new URLSearchParams(location.search);
    const state = { harness: HARNESS[q.get('harness')] ? q.get('harness') : '', source: q.get('source') || '', robot: q.get('robot') || '' };
    page.innerHTML = `
    <div class="band runs">
      <div class="band__in">
        ${crumbs([home[0], ['Showcase']])}
        <div class="runs__head">
          <div class="runs__intro"><div class="runs__titlebar"><h1 class="runs__title">Showcase</h1><span class="runs__total" data-total></span></div><p class="runs__sub">Solutions, demonstration collections and generated tasks from every RoboSkills workflow.</p></div>
          <dialog class="runs__sheet" aria-label="Filters">
            <div class="runs__sheet-in">
              <div class="runs__sheet-head"><strong>Filters</strong><button type="button" data-clear>Clear</button></div>
              <div class="runs__picks" role="search" aria-label="Filter runs">
              ${['source', 'robot'].map((key) => `
                <label class="runs__pick"><span class="runs__picklabel">${key === 'source' ? 'Source' : 'Robot or character'}</span>
                  <span class="runs__select"><select data-filter="${key}"></select>${ICON.chevron}</span>
                </label>`).join('')}
              </div>
              <button type="button" class="runs__sheet-go" data-go></button>
            </div>
          </dialog>
        </div>
        <div class="runs__filters">
          <div class="runs__tray" role="group" aria-label="Workflow">
            ${[['', 'All'], ...S.harnesses.map((h) => [h.id, h.label])].map(([id, label]) =>
              `<button type="button" data-harness="${id}">${esc(label)}<span class="runs__n"></span></button>`).join('')}
          </div>
          <button type="button" class="runs__filter" data-filters>${ICON.filter}<span data-on hidden></span></button>
          <p class="runs__note" aria-live="polite" data-note></p>
        </div>
        <div class="runs__groups" data-groups></div>
      </div>
    </div>`;
    const tabs = [...page.querySelectorAll('[data-harness]')];
    const selects = [...page.querySelectorAll('[data-filter]')];
    const groups = page.querySelector('[data-groups]');
    const bar = page.querySelector('.runs__filters');
    const tray = page.querySelector('.runs__tray');
    const sheet = page.querySelector('.runs__sheet');
    const opener = page.querySelector('[data-filters]');
    const on = page.querySelector('[data-on]');
    const clear = page.querySelector('[data-clear]');

    const match = (r, skip) => (skip === 'harness' || !state.harness || r.harness === state.harness)
      && (skip === 'source' || !state.source || r.source === state.source)
      && (skip === 'robot' || !state.robot || r.robot === state.robot);

    const render = () => {
      // a source or robot the other filters leave no runs for falls back to any
      ['source', 'robot'].forEach((key) => { if (!RUNS.some((r) => match(r, key) && r[key] === state[key])) state[key] = ''; });
      tabs.forEach((b) => {
        const id = b.dataset.harness;
        b.setAttribute('aria-pressed', String(state.harness === id));
        b.lastElementChild.textContent = RUNS.filter((r) => (!id || r.harness === id) && match(r, 'harness')).length;
      });
      selects.forEach((sel) => {
        const key = sel.dataset.filter;
        const values = [...new Set(RUNS.filter((r) => match(r, key)).map((r) => r[key]))].sort((a, b) => a.localeCompare(b));
        sel.innerHTML = `<option value="">Any ${key}</option>` +
          values.map((v) => `<option${v === state[key] ? ' selected' : ''}>${esc(v)}</option>`).join('');
      });
      const shown = RUNS.filter((r) => match(r));
      const picked = [state.source, state.robot].filter(Boolean).length;
      page.querySelector('[data-note]').textContent = plural(shown.length, 'example');
      page.querySelector('[data-total]').textContent = plural(shown.length, 'run');
      page.querySelector('[data-go]').textContent = `Show ${plural(shown.length, 'run')}`;
      opener.setAttribute('aria-label', picked ? `Filters, ${picked} on` : 'Filters');
      on.textContent = picked;
      on.hidden = clear.hidden = !picked;
      watch.disconnect();
      groups.innerHTML = S.harnesses.map((h) => {
        const items = shown.filter((r) => r.harness === h.id);
        if (!items.length) return '';
        if (phone.matches && !state.harness) return rail(h, items);
        if (h.groups) return subGroups(h, items);
        return `
        <section class="runs__group" aria-label="${esc(h.label)}">
          ${eyebrow(h.label, plural(items.length, 'run'))}${flow(h)}
          <div class="runs__grid">${items.map((r) => card(r)).join('')}
          </div>
        </section>`;
      }).join('') || '<p class="runs__empty">No runs match. <button type="button" data-reset>Clear filters</button></p>';
      groups.querySelectorAll('video').forEach((v) => watch.observe(v));
      const params = new URLSearchParams(Object.entries(state).filter(([, v]) => v));
      history.replaceState(null, '', params.size ? `?${params}` : location.pathname);
      // a phone's tabs scroll, and the open one sits mid-strip
      const tab = tabs.find((b) => b.dataset.harness === state.harness).getBoundingClientRect();
      const strip = tray.getBoundingClientRect();
      tray.scrollBy(tab.left + tab.width / 2 - strip.left - strip.width / 2, 0);
    };
    // A harness picked with the tabs stuck to the top opens at its start, just under them.
    const open = (id) => {
      state.harness = id;
      render();
      window.scrollBy(0, Math.min(0, groups.getBoundingClientRect().top - bar.getBoundingClientRect().bottom));
    };

    tray.addEventListener('click', (e) => {
      const b = e.target.closest('[data-harness]');
      if (b) open(b.dataset.harness);
    });
    selects.forEach((sel) => sel.addEventListener('change', () => { state[sel.dataset.filter] = sel.value; render(); }));
    groups.addEventListener('click', (e) => {
      const b = e.target.closest('[data-open]');
      if (b) open(b.dataset.open);
      if (e.target.closest('[data-reset]')) { state.harness = state.source = state.robot = ''; render(); }
    });
    opener.addEventListener('click', () => sheet.showModal());
    page.querySelector('[data-go]').addEventListener('click', () => sheet.close());
    clear.addEventListener('click', () => { state.source = state.robot = ''; render(); });
    sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); }); // the backdrop
    phone.addEventListener('change', () => { sheet.close(); render(); });
    render();
  }

  // The agent's words: escaped, `code` kept as code, **emphasis** markers dropped.
  const prose = (s) => esc(s).replace(/`([^`\n]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '$1');

  // A run from another harness: its clip, named and described.
  function clipPage(r) {
    document.title = `${r.name} · RoboSkills showcase`;
    const request = r.instruction || (r.solution && r.solution.instruction);
    // A few numbers beside the request, as on a motion run, and a line on what the clip shows.
    const facts = r.seeds ? [['Seeds solved', r.seeds, ''], ...(r.agent ? [['Build', r.agent.build, 'min'], ['Solve', r.agent.solve, 'min']] : [])]
      : r.research ? [['Research', r.research.minutes, 'min'], ['Model calls', r.research.calls, ''], r.research.phases[r.research.phases.length - 1].concat('')]
        : r.solution ? [['Seeds passed', r.solution.validation, '']] : [];
    const note = r.research ? r.research.clip : r.solution
      ? `This clip replays seed ${r.solution.seed}: it passes native success and matches the recorded terminal joints with ${r.solution.gap} rad maximum difference. Blender renders the measured simulator motion.` : '';
    page.innerHTML = `
    <div class="band runs run">
      <div class="band__in">
        ${crumbs([...home, [HARNESS[r.harness], `/roboskills/showcase/?harness=${r.harness}`], [r.name]])}
        <div class="mg-head">
          <div class="mg-head__text">
            <h1 class="runs__title">${esc(r.name)}</h1>
            <p class="runs__note">${esc(HARNESS[r.harness])} · ${esc(r.source)} · ${esc(r.robot)}${r.agent ? ` · agent time: ${duration(r.agent.build * 60)} to build, ${duration(r.agent.solve * 60)} to solve` : ''}</p>
          </div>${runNav(r)}
        </div>
        ${r.blurb !== request ? `<p class="run__lede">${esc(r.blurb)}</p>` : ''}
        ${hasClip(r) ? `<div class="run__player run__player--wide">
          <div class="run__frame" style="aspect-ratio: ${esc(r.aspect || '16 / 9')}">
            <video src="${clip(r)}" poster="${poster(r)}" muted loop playsinline preload="auto"${still ? ' controls' : ' autoplay'}></video>
          </div>
        </div>` : ''}
        ${request ? `<div class="mg-body">
          <div class="mg-main">${requestBox(request)}${note ? `<p class="mg-fine">${esc(note)}</p>` : ''}</div>${facts.length ? `
          <aside class="mg-facts" aria-label="Run facts"><div class="mg-stats">${facts.map(([label, v, unit]) => `
            <div><span class="mg-label">${esc(label)}</span><b>${esc(v)}${unit ? ` <small>${esc(unit)}</small>` : ''}</b></div>`).join('')}
          </div></aside>` : ''}
        </div>` : ''}
        ${r.collection ? `<div class="sim-section"><h2>One script across new scenes</h2>${simFacts(r)}
          <p>Each accepted demonstration passed its native success check and an independent replay with zero terminal joint gap. Recordings contain ${r.collection.chunks.toLocaleString()} motion-boundary RGB-D/trajectory chunks and ${r.collection.actions.toLocaleString()} native actions.</p>
          <p>${r.collection.attempts > r.collection.accepted ? 'Five infrastructure interruptions remain in the attempt count; all completed native tasks passed. ' : ''}The script stays unchanged; grasps and motion plans are recomputed for the current scene. Physical geometry is explicitly available.</p>
          <p class="sim-method">Eight accepted seeds, each replayed from its recorded native actions (native success, zero joint gap) and rendered in Blender at its own pace. Elapsed collection time is measured separately. Observations are captured at trajectory boundaries.</p>
          ${simTiming([r])}</div>` : ''}${moreRuns(r)}
      </div>
    </div>`;
    const video = page.querySelector('video');
    if (video) video.addEventListener('error', () => video.remove(), true);
  }

  // A motion-generation or real2sim run: its input beside its output on one stage with one transport, then the
  // request, how it was made, and measured timing.
  function motionPage(r) {
    document.title = `${r.name} · RoboSkills showcase`;
    const motion = `/roboskills/showcase/?harness=${r.harness}`;
    const file = r.file || (r.request.match(/[\w-]+\.(?:mp4|jpg)/) || [r.source.toLowerCase()])[0];
    const pane = (label, aside, body) => `
            <figure class="mg-pane"><figcaption><span>${label}</span><span>${aside}</span></figcaption><div class="mg-pane__frame">${body}</div></figure>`;
    const input = r.source === 'Video' || r.file ? `<video src="${media(r, 'videos', 'mp4', '-input')}" poster="${media(r, 'images', 'webp', '-input')}" muted loop playsinline preload="auto"></video>`
      : `<img src="${media(r, 'images', 'webp', '-input')}" alt="The input photo, ${esc(file)}" />`;
    const stats = r.stats || [['Agent time', r.minutes, 'min'], ['Revisions', r.revisions, '']];
    page.innerHTML = `
    <div class="band runs run mg-run">
      <div class="band__in">
        ${crumbs([...home, [HARNESS[r.harness], motion], [r.name]])}
        <div class="mg-head">
          <div class="mg-head__text">
            <span class="mg-kicker">${esc(r.source)} → ${esc(r.body)}</span>
            <h1 class="runs__title">${esc(r.name)}</h1>
            <p class="mg-lede">${esc(r.blurb)}</p>
          </div>${runNav(r)}
        </div>

        <section class="mg-stage${r.source === 'Text' ? ' mg-stage--solo' : ''}${r.comparison ? ' mg-stage--comparison' : ''}" aria-label="${r.comparison ? 'Source and reconstruction comparisons' : 'Input and output'}">
          <div class="mg-stage__panes">${r.source === 'Text' ? '' : pane(`${r.comparison ? 'Source' : 'Input'} · ${esc(r.source)}`, '', input)}${pane(r.comparison ? esc(HARNESS[r.harness]) : `Output · ${esc(r.body)}`, esc(r.renderingLabel || (r.request ? 'kinematic playback' : 'physics rollout')),
            `<video data-output src="${clip(r)}" poster="${poster(r)}" muted loop playsinline preload="auto"></video>`)}${r.comparison ? pane(esc(r.comparison.label), esc(r.comparison.detail || [r.comparison.score != null ? `${r.comparison.score}/10` : '', r.comparison.seconds != null ? `${r.comparison.seconds} s` : ''].filter(Boolean).join(' · ')),
            `<video src="${media(r, 'videos', 'mp4', '-baseline')}" poster="${media(r, 'images', 'webp', '-baseline')}" muted loop playsinline preload="auto"></video>`) : ''}
          </div>
          <div class="mg-stage__bar">
            <button type="button" class="mg-play" data-play aria-label="Play">${ICON.play}</button>
            <input type="range" class="mg-seek" data-seek min="0" max="1000" value="0" aria-label="Position in the clip" />
            <span class="mg-time" data-time>0:00.0</span>
            ${r.source === 'Video' || r.file ? `<span class="mg-sync">${esc((r.comparison && r.comparison.syncLabel) || 'In sync')}</span>` : ''}
          </div>
        </section>

        <div class="mg-body">
          <div class="mg-main">
            ${r.notes ? `<section><h2 class="mg-label">Comparison</h2><p class="mg-fine">${esc(r.notes)}</p></section>` : ''}
            ${r.request ? `<section><h2 class="mg-label">The request</h2>
              <blockquote class="mg-request">${esc(r.request).replace(/[\w-]+\.(?:mp4|jpg)/g, '<code>$&</code>')}</blockquote></section>` : ''}
            <section><h2 class="mg-label">${r.request ? 'How the agent made it' : 'How it was rebuilt'}</h2>
              <div class="mg-chain">${r.models.split(', ').map((m) => `<span>${esc(m)}</span>`).join('<i aria-hidden="true">→</i>')}</div></section>
          </div>
          <aside class="mg-facts" aria-label="Run facts">
            <div class="mg-stats">${stats.map(([label, v, unit]) => `
              <div><span class="mg-label">${esc(label)}</span><b>${esc(v)}${unit ? ` <small>${esc(unit)}</small>` : ''}</b></div>`).join('')}
            </div>
            ${r.harness === 'real2sim' && r.rendering ? `<p class="mg-fine">${esc(r.rendering)}</p>` : ''}
          </aside>
        </div>

${moreRuns(r)}
      </div>
    </div>`;

    // The output is the clock: the input clip follows it, and one button and scrubber drive both.
    const videos = [...page.querySelectorAll('.mg-stage video')];
    const out = page.querySelector('[data-output]') || videos[videos.length - 1];
    const followers = videos.filter((video) => video !== out);
    const btn = page.querySelector('[data-play]');
    const seek = page.querySelector('[data-seek]');
    const time = page.querySelector('[data-time]');
    const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, '0')}`;
    const paint = () => {
      const d = out.duration || 0;
      if (d) seek.value = String(Math.round((1000 * out.currentTime) / d));
      time.textContent = `${fmt(out.currentTime)} / ${fmt(d)}`;
      followers.forEach((video) => {
        if (Math.abs(video.currentTime - out.currentTime) > (r.comparison ? 0.04 : 0.15)) video.currentTime = out.currentTime;
      });
    };
    const setPlaying = (on) => {
      videos.forEach((v) => (on ? v.play().catch(() => {}) : v.pause()));
      btn.innerHTML = on ? ICON.pause : ICON.play;
      btn.setAttribute('aria-label', on ? 'Pause' : 'Play');
    };
    let raf = 0;
    const loop = () => { paint(); raf = requestAnimationFrame(loop); };
    out.addEventListener('play', () => { cancelAnimationFrame(raf); loop(); });
    out.addEventListener('pause', () => { cancelAnimationFrame(raf); paint(); });
    out.addEventListener('loadedmetadata', paint);
    out.addEventListener('seeked', paint);
    btn.addEventListener('click', () => setPlaying(out.paused));
    seek.addEventListener('input', () => { if (out.duration) out.currentTime = (Number(seek.value) / 1000) * out.duration; paint(); });
    videos.forEach((v) => v.addEventListener('error', () => v.remove(), true));
    if (!still) setPlaying(true);
  }

  async function run() {
    const id = new URLSearchParams(location.search).get('id') || '';
    const other = S.runs.find((r) => key(r) === id);
    if (other) return other.request || other.file ? motionPage(other) : clipPage(other);
    const known = window.RK_SHOWCASE_AAP.find((r) => r.id === id);
    let r = null;
    try {
      if (known) r = { ...known, ...await (await fetch(`/data/showcase/runs/${id}.json`)).json() };
    } catch (e) { /* a missing or broken file reads as an unknown run */ }
    if (!r) {
      page.innerHTML = `
      <div class="band runs"><div class="band__in">
        ${crumbs([home[0], home[1], ['Run not found']])}
        <div class="runs__head"><h1 class="runs__title">Run not found.</h1><p class="runs__note"><a href="/roboskills/showcase/">Back to the showcase</a></p></div>
      </div></div>`;
      return;
    }
    document.title = `${r.name} · RoboSkills showcase`;
    const T = r.turns, total = r.steps || 1;
    const end = r.renderEnd || total; // a render stops once nothing moves; later turns show its last frame
    const pct = (s) => (100 * Math.min(s, end)) / end; // the track spans what the clip shows
    page.innerHTML = `
    <div class="band runs run">
      <div class="band__in">
        ${crumbs([...home, [HARNESS[r.harness], `/roboskills/showcase/?harness=${r.harness}`], [r.name]])}
        <div class="mg-head">
          <div class="mg-head__text">
            <h1 class="runs__title">${esc(r.name)}</h1>
            <p class="runs__note">${esc(HARNESS[r.harness])} · ${esc(r.source)} · ${esc(r.robot)} · ${plural(T.length, 'turn')} · ${plural(r.steps, 'step')}${r.seconds ? ` · ${duration(r.seconds)} agent time` : ''}${r.render ? ` · solved ${esc(r.render.seeds)} seeds, ${r.render.replays === 'live' ? 'played again for this render' : `replayed ${esc(r.render.replays)}`}` : ''}</p>
          </div>${runNav(r)}
        </div>
        <div class="run__layout">
          <div class="run__left">
            <div class="run__player">
              ${hasClip(r) ? `<div class="run__frame" style="aspect-ratio: ${r.aspect || '16 / 9'}">
                <video src="${clip(r)}" poster="${poster(r)}" muted loop playsinline preload="auto"${still ? ' controls' : ' autoplay'}></video>
                <span class="run__tag" data-tag></span>
              </div>` : ''}
              <div class="run__track" aria-hidden="true">
                <i class="run__fill" data-fill></i>${T.map((t) => `<i class="run__tick" style="left: ${pct(t.step)}%"></i>`).join('')}
              </div>
            </div>
            <div class="run__steps">
              <button type="button" class="ghost" data-move="-1">← Previous turn</button>
              <button type="button" class="cta" data-move="1">Next turn →</button>
            </div>
          </div>
          <div class="run__right">
            ${requestBox(r.blurb)}
            ${eyebrow('Agent turns', plural(T.length, 'turn'))}
            <ol class="run__turns">${T.map((t, i) => `
              <li class="run__turn" data-turn="${i}">
                <button type="button" aria-expanded="false"${t.code ? ` aria-controls="turn-${i}"` : ''}>
                  <span class="run__badge">${i}</span>
                  <span class="run__body"><span class="run__kicker">ends at step ${t.step.toLocaleString('en-US')}</span><span class="run__say">${prose(t.say)}</span></span>
                </button>
                ${t.code ? `<div class="run__code" id="turn-${i}" hidden><div class="run__bar"><span>turn_${i}.py</span><span>python → bot</span></div><pre>${rkHighlight(t.code)}</pre></div>` : ''}
              </li>`).join('')}
            </ol>
          </div>
        </div>${moreRuns(r)}
      </div>
    </div>`;

    const items = [...page.querySelectorAll('.run__turn')];
    const ticks = [...page.querySelectorAll('.run__tick')];
    const fill = page.querySelector('[data-fill]');
    const tag = page.querySelector('[data-tag]');
    const video = page.querySelector('video');
    const playing = () => video && video.isConnected && video.duration > 0;
    let sel = 0;

    // The playhead: the step on screen, taken from the clip while one plays.
    const show = (step) => {
      const at = Math.max(0, T.findIndex((t) => t.step >= step));
      fill.style.width = `${pct(step)}%`;
      ticks.forEach((k, i) => k.classList.toggle('is-past', T[i].step <= step));
      if (tag) tag.textContent = `turn ${at} · step ${Math.round(step).toLocaleString('en-US')}`;
    };
    // Opening a turn starts the clip where that turn's actions begin.
    const select = (i, seek) => {
      sel = Math.max(0, Math.min(T.length - 1, i));
      items.forEach((li, j) => {
        li.classList.toggle('is-on', j === sel);
        li.querySelector('button').setAttribute('aria-expanded', String(j === sel));
        const code = li.querySelector('.run__code');
        if (code) code.hidden = j !== sel;
      });
      ticks.forEach((k, j) => k.classList.toggle('is-on', j === sel));
      if (playing() && seek) video.currentTime = Math.min(0.999, (sel ? T[sel - 1].step : 0) / end) * video.duration;
      if (!playing()) show(T[sel].step);
    };

    page.querySelector('.run__turns').addEventListener('click', (e) => {
      const b = e.target.closest('.run__turn > button');
      if (b) select(Number(b.parentElement.dataset.turn), true);
    });
    page.querySelector('.run__steps').addEventListener('click', (e) => {
      const b = e.target.closest('[data-move]');
      if (!b) return;
      select(sel + Number(b.dataset.move), true);
      items[sel].scrollIntoView({ block: 'nearest', behavior: still ? 'auto' : 'smooth' });
    });
    if (video) {
      video.addEventListener('timeupdate', () => { if (playing()) show((video.currentTime / video.duration) * end); });
      video.addEventListener('error', () => { video.remove(); show(T[sel].step); }, true);
    }
    select(0, false);
  }

  if (document.body.dataset.page === 'run') run();
  else hub();
})();
