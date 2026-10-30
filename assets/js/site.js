// Site chrome shared by every page: the nav bar, its mobile menu, and the
// hero-video fallback. Loaded as a classic script at the top of <body>, so
// rkRenderNav() puts the nav in the DOM before first paint — the same timing
// the hardcoded markup used to have, with no flash.
//
// Colours come from /assets/css/site.css tokens, which each page sets.

(function () {
  const ICONS = {
    github: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
    burger: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke-linecap="round"/></svg>',
  };

  // The one place a kit's key becomes a name people read. Keys stay lowercase
  // because they are also the package name and the URL segment; everything
  // that renders a kit to a reader goes through here.
  window.RK_NAMES = {
    roboskills: 'RoboSkills',
    robokit: 'RoboKit',
    retargetingkit: 'RetargetingKit',
    graspkit: 'GraspKit',
  };

  // Every project is a directory, so its paper-friendly URL is just its key.
  const NAV = ['roboskills'].map((k) => ({ key: k, label: window.RK_NAMES[k], href: `/${k}/` }));

  const GITHUB_URL = 'https://github.com/openrobokit/roboskills';

  // `active` is the NAV key to mark.
  window.rkRenderNav = function (active) {
    const link = (n, dot) =>
      `<a href="${n.href}" class="${n.key === active ? 'is-active' : ''}">` +
      `${dot && n.key === active ? '<span class="dot"></span>' : ''}${n.label}</a>`;

    document.body.insertAdjacentHTML('afterbegin', `
      <nav class="site-nav" aria-label="Main navigation">
        <a class="brand" href="/roboskills/" aria-label="RoboSkills home">
          <img src="/assets/brand/gear/robokit-ucsd.svg" alt="" />
          <span class="wordmark"><span class="o">open</span>robokit</span>
        </a>
        <div class="links">${NAV.map((n) => link(n, true)).join('')}</div>
        <div class="right">
          <a href="${GITHUB_URL}" aria-label="GitHub">${ICONS.github}</a>
          <button class="burger" onclick="rkToggleMenu()" aria-label="Menu">${ICONS.burger}</button>
        </div>
      </nav>
      <div class="menu" id="rk-nav-menu">${NAV.map((n) => link(n, false)).join('')}</div>
    `);
    const nav = document.querySelector('.site-nav');
    const updateNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  };

  // One copy affordance for the whole site. A button says what it copies with
  // `.t`, what it says back with `.o`, and where the text comes from with
  // either data-copy (a literal) or data-copy-from (a selector, resolved
  // against the closest data-copy-scope, or the document). site.css swaps
  // the spans, so a button only has to say what it copies.
  window.rkCopy = function (button, text) {
    try {
      navigator.clipboard.writeText(text).catch(() => {});
    } catch (e) {}
    button.classList.add('is-copied');
    clearTimeout(button._copied);
    button._copied = setTimeout(() => button.classList.remove('is-copied'), 1200);
  };

  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-code-toggle]');
    if (toggle) {
      const box = toggle.closest('[data-copy-scope]');
      const full = box.querySelector('[data-code-full]');
      const short = box.querySelector('pre:not([data-code-full])');
      full.hidden = !full.hidden;
      short.hidden = !full.hidden;
      toggle.textContent = full.hidden ? 'Full' : 'Short';
      toggle.setAttribute('aria-expanded', String(!full.hidden));
      toggle.setAttribute('aria-label', full.hidden ? 'Show full code' : 'Show short code');
      return;
    }
    const button = e.target.closest('[data-copy], [data-copy-from]');
    if (!button) return;
    const from = button.dataset.copyFrom;
    const source = from
      ? (button.closest('[data-copy-scope]') || document).querySelector(from)
      : null;
    rkCopy(button, source
      ? (source.hasAttribute('data-code-full') ? source.textContent : source.innerText.replace(/\u00a0/g, ' '))
      : button.dataset.copy);
  });

  window.rkToggleMenu = function () {
    document.getElementById('rk-nav-menu').classList.toggle('is-open');
  };

  // Tapping a link inside the overlay closes it as it navigates.
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('rk-nav-menu');
    if (menu && menu.classList.contains('is-open') && e.target.closest('#rk-nav-menu a')) {
      menu.classList.remove('is-open');
    }
  });

  // Python highlighting, shared by the docs bodies and the project pages'
  // example tabs so one grammar (and one palette) covers both.
  const KEYWORDS = 'import|from|as|def|class|return|if|elif|else|for|while|in|not|and|or|with|try|except|finally|raise|yield|lambda|pass|break|continue|assert|global|del|await|async|None|True|False';
  // comment | string | flag | keyword | number | operator — first match wins
  const TOKENS = new RegExp(
    '(#[^\\n]*)' +
    '|("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\')' +
    '|(?:^|\\s)(--?[A-Za-z][\\w-]*)' +
    '|\\b(' + KEYWORDS + ')\\b' +
    '|\\b(\\d+\\.?\\d*)\\b' +
    '|([=+*/<>!]=?|->)',
    'gm'
  );
  const CLASSES = ['tok-c', 'tok-s', 'tok-f', 'tok-k', 'tok-n', 'tok-o'];
  const escHtml = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Takes plain source, returns escaped HTML with <span class="tok-*"> marks.
  window.rkHighlight = function (source) {
    return escHtml(source).replace(TOKENS, (m, ...groups) => {
      const i = groups.findIndex((g, n) => n < 6 && g !== undefined);
      if (i === -1) return m;
      // the flag branch matches a leading space that must stay outside the span
      const tok = groups[i];
      const lead = m.slice(0, m.length - tok.length);
      return `${lead}<span class="${CLASSES[i]}">${tok}</span>`;
    });
  };

  // Hero clips are draft renders that may be absent from a checkout; when one
  // cannot load, hide it so the tracked still underneath shows through. A
  // readyState probe covers the case where no error event ever fires.
  window.rkVideoFallback = function (root) {
    (root || document).querySelectorAll('video[data-fallback]').forEach((v) => {
      const fail = () => { v.style.display = 'none'; };
      const ready = () => { v.style.removeProperty('display'); v.classList.add('is-ready'); };
      v.addEventListener('error', fail, true);
      if (v.error) fail();
      const probe = setTimeout(() => { if (v.readyState === 0) fail(); }, 1200);
      v.addEventListener('loadeddata', () => { clearTimeout(probe); ready(); }, { once: true });
      if (v.readyState >= 2) { clearTimeout(probe); ready(); }
    });
  };
})();
