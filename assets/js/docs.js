// Docs page behaviour: the parts of a documentation page that genuinely need a
// browser. The page itself -- sidebar, article, rail, prev/next -- is rendered
// by scripts/build_docs.py and arrives as HTML, so there is no router here and
// no corpus to download. What is left is presentation and search.

rkRenderNav('docs');

const PAGE = window.RK_PAGE || { kit: 'robokit', id: '', toc: [] };
const SEARCH_INDEX_URL = '/data/search.json';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const COPY_SVG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5.5" y="5.5" width="8" height="8" rx="1.6"/><path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H3.5A1.5 1.5 0 0 0 2 3v5.5A1.5 1.5 0 0 0 3.5 10H4"/></svg>';
const CHECK_SVG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m3.5 8.5 3 3 6-7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// ---------------------------------------------------------------- article
// The bodies ship as plain-text <pre>, so tokenize them in place; the flag
// guards against re-highlighting already-marked blocks.
function enhance(el) {
  el.querySelectorAll('table').forEach((t) => {
    if (t.parentElement && t.parentElement.classList.contains('table-scroll')) return;
    const box = document.createElement('div');
    box.className = 'table-scroll';
    t.parentNode.insertBefore(box, t);
    box.appendChild(t);
  });
  el.querySelectorAll('pre').forEach((pre) => {
    if (pre.dataset.hl) return;
    pre.dataset.hl = '1';
    pre.innerHTML = rkHighlight(pre.textContent);
  });
  const dias = [...el.querySelectorAll('.mermaid:not([data-processed])')];
  if (dias.length && window.rkMermaid) {
    // a diagram that fails to parse keeps its source text; it must not take
    // the rest of the page with it
    window.rkMermaid.run({ nodes: dias, suppressErrors: true }).catch(() => {});
  }
  if (window.renderMathInElement) {
    try {
      window.renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      });
    } catch (e) {}
  }
}

// ---------------------------------------------------------------- rail
const RAIL_HEAD = `<div class="rail__head">
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 4h11M2.5 8h7M2.5 12h9" stroke-linecap="round"/></svg>
  <span>On this page</span>
</div>`;

let active = null;

// Only the symbol the reader is currently inside shows its members: a terms
// page lists thirty classes, and every one of them expanded is not a rail.
function drawRail() {
  const toc = PAGE.toc || [];
  const rail = document.getElementById('rail');
  if (toc.length < 2) { rail.innerHTML = ''; return; }
  const rows = toc.map((h) => {
    const on = h.href === active;
    const subs = on && h.members && h.members.length
      ? h.members.map((m) => `<a class="is-sub" href="${m.href}">${esc(m.text)}</a>`).join('')
      : '';
    return `<a href="${h.href}" class="${on ? 'is-active' : ''}">${esc(h.text)}</a>${subs}`;
  });
  // rebuilding the list would drop the rail's own scroll position, which reads
  // as the rail jumping while the article is being scrolled
  const top = rail.scrollTop;
  rail.innerHTML = `${RAIL_HEAD}<div class="rail__list">${rows.join('')}</div>`;
  rail.scrollTop = top;
}

// whichever anchor sits closest above the fold is the one being read
function trackRail() {
  const toc = PAGE.toc || [];
  if (!toc.length) return;
  let next = toc[0].href;
  for (const h of toc) {
    const el = document.getElementById(h.href.slice(1));
    if (el && el.getBoundingClientRect().top <= 120) next = h.href;
  }
  if (next !== active) { active = next; drawRail(); }
}

// ---------------------------------------------------------------- search
// The index is a page of prose per document, so it is only worth fetching once
// somebody actually searches. Until then a reader pays nothing for it.
const search = document.getElementById('search');
const sideGroups = document.getElementById('side-groups');
const docsMenu = document.getElementById('docs-menu');
docsMenu.addEventListener('click', () => {
  const open = document.querySelector('.side').classList.toggle('is-open');
  docsMenu.setAttribute('aria-expanded', String(open));
});
let index = null;
let indexing = null;

const loadIndex = () => {
  if (index) return Promise.resolve(index);
  if (!indexing) {
    indexing = fetch(SEARCH_INDEX_URL)
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
      .then((data) => (index = data));
  }
  return indexing;
};

// Folds remember the state the page was built with, so clearing the query puts
// the sidebar back the way the reader left it.
function applyQuery(q) {
  const none = sideGroups.querySelector('.side__none');
  if (none) none.remove();
  let shown = 0;

  sideGroups.querySelectorAll('a[data-id]').forEach((a) => {
    const text = index ? index[`${PAGE.kit}/${a.dataset.id}`] : null;
    const hit = !q || (text == null ? a.textContent.toLowerCase().includes(q) : text.includes(q));
    a.classList.toggle('is-hidden', !hit);
    if (hit) shown += 1;
  });

  sideGroups.querySelectorAll('.side__subitems').forEach((box) => {
    const head = box.previousElementSibling;
    const any = !!box.querySelector('a[data-id]:not(.is-hidden)');
    box.classList.toggle('is-hidden', !any);
    if (!head || !head.classList.contains('side__sub')) return;
    head.classList.toggle('is-hidden', !any);
    if (q) head.classList.remove('is-folded');
    else head.classList.toggle('is-folded', head.dataset.folded === '1');
  });

  sideGroups.querySelectorAll('.side__group').forEach((g) => {
    g.classList.toggle('is-hidden', !g.querySelector('a[data-id]:not(.is-hidden)'));
  });

  if (q && !shown) {
    sideGroups.insertAdjacentHTML(
      'beforeend', `<div class="side__none">No pages match “${esc(search.value)}”.</div>`);
  }
}

// remember how each fold was built before the first query disturbs it
sideGroups.querySelectorAll('.side__sub').forEach((h) => {
  h.dataset.folded = h.classList.contains('is-folded') ? '1' : '0';
});

search.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase();
  if (!q) { applyQuery(''); return; }
  loadIndex().then(() => applyQuery(search.value.trim().toLowerCase()));
});
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    document.querySelector('.side').classList.add('is-open');
    docsMenu.setAttribute('aria-expanded', 'true');
    search.focus();
  }
  if (e.key === 'Escape' && document.querySelector('.side').classList.contains('is-open')) {
    document.querySelector('.side').classList.remove('is-open');
    docsMenu.setAttribute('aria-expanded', 'false');
    docsMenu.focus();
  }
});
// warm the index on intent, so the first keystroke already has it
search.addEventListener('focus', loadIndex, { once: true });

// ---------------------------------------------------------------- chrome
document.addEventListener('click', (e) => {
  const pick = document.getElementById('kitpick');
  if (e.target.closest('.kitpick__btn')) { pick.classList.toggle('is-open'); return; }
  if (!e.target.closest('.kitpick__menu')) pick.classList.remove('is-open');

  const fold = e.target.closest('.side__sub');
  if (fold) {
    fold.classList.toggle('is-folded');
    fold.dataset.folded = fold.classList.contains('is-folded') ? '1' : '0';
  }
});

// The copy buttons are site.css's two-span shape; these are the icons that go
// in them, and site.js does the copying.
document.querySelectorAll('.copy, .copy-page').forEach((b) => {
  b.querySelector('.t').innerHTML = COPY_SVG;
  b.querySelector('.o').innerHTML = CHECK_SVG;
});

// Show a scrollbar only while its own element is scrolling, then drop it. The
// mark goes on whatever actually scrolled: marking the root instead would give
// the sidebar a thumb every time the article moved.
let scrollT;
let scrolled;
window.addEventListener('scroll', (e) => {
  const el = e.target === document || e.target === document.documentElement
    ? document.documentElement
    : e.target;
  if (scrolled && scrolled !== el) scrolled.removeAttribute('data-scrolling');
  scrolled = el;
  el.setAttribute('data-scrolling', '');
  clearTimeout(scrollT);
  scrollT = setTimeout(() => el.removeAttribute('data-scrolling'), 380);
  trackRail();
}, { passive: true, capture: true });

const docBody = document.getElementById('doc-body');
enhance(docBody);
trackRail();
// KaTeX and mermaid load deferred, so re-typeset once they land
window.rkDrawDiagrams = () => enhance(docBody);
window.addEventListener('load', () => enhance(docBody));

// ---------------------------------------------------------------- tabs
// A `=== "uv"` tray: buttons and panes are siblings in the same order, so the
// index of the one clicked is the whole state.
document.addEventListener('click', (e) => {
  const button = e.target.closest('.doc-tabs .tabs button');
  if (!button) return;
  const box = button.closest('.doc-tabs');
  const i = [...button.parentElement.children].indexOf(button);
  box.querySelectorAll('.tabs button').forEach((b, k) => b.classList.toggle('is-active', k === i));
  box.querySelectorAll('.doc-tabs__pane').forEach((p, k) => p.classList.toggle('is-active', k === i));
});
