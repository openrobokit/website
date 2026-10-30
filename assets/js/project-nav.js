// Page chapters stay separate from the site's product navigation.
(() => {
  const icons = {
    tasks: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    speed: '<path d="M4.5 19a9 9 0 1 1 15 0M12 5v2M5 12h2m10 0h2m-7 0 4-4"/><circle cx="12" cy="12" r="1.5"/>',
    scale: '<path d="M4 20h16M6 16V9m6 7V4m6 12V7"/>',
    method: '<path d="m12 3 10 5-10 5L2 8Zm-10 10 10 5 10-5M2 18l10 5 10-5"/>',
    world: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/>',
    pipeline: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v9h9m-3-3 3 3-3 3"/>',
    robots: '<rect x="5" y="6" width="14" height="13" rx="3"/><path d="M12 3v3M2 10v5m20-5v5M9 15h6"/><circle cx="9" cy="11" r=".6"/><circle cx="15" cy="11" r=".6"/>',
    hand: '<path d="M8 13V5a1.5 1.5 0 0 1 3 0v6-8a1.5 1.5 0 0 1 3 0v8-6a1.5 1.5 0 0 1 3 0v7-4a1.5 1.5 0 0 1 3 0v7a7 7 0 0 1-12 5l-4-5a1.5 1.5 0 0 1 2-2l2 2"/>',
    api: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18"/>',
  };
  const kitKey = window.RK_PROJECT;
  const kitName = window.RK_NAMES[kitKey];
  const chapters = {
    robokit: [
      { id: 'bento', label: 'Tasks', name: 'One library, broad coverage', icon: icons.tasks },
      { id: 'benchmarks', label: 'Speed', name: 'Faster on every task', icon: icons.speed },
      { id: 'scale', label: 'Scale', name: 'Thousands of solves in parallel', icon: icons.scale },
      { id: 'method', label: 'Method', name: 'Composable under the hood', icon: icons.method },
      { id: 'api', label: 'API', name: 'Two lines to a solve', icon: icons.api },
    ],
    retargetingkit: [
      { id: 'capabilities', label: 'Hand', name: 'In-hand dexterity',
        icon: icons.hand },
      { id: 'whole-body', label: 'Body', name: 'Whole-body dexterity',
        icon: '<circle cx="12" cy="4" r="2"/><path d="m5 9 7-1 7 1M12 8v6m-4 7 4-7 4 7"/>' },
      { id: 'embodiment', label: 'Robots', name: 'Any embodiment',
        icon: icons.robots },
      { id: 'motion-range', label: 'Scenes', name: 'From fingertips to full scenes',
        icon: '<path d="m3 7 9-4 9 4v10l-9 4-9-4Zm0 0 9 4 9-4m-9 4v10m-5-2v-6l5-2 5 2v6"/>' },
      { id: 'api', label: 'API', name: 'Simple API and framework',
        icon: icons.api },
    ],
    graspkit: [
      { id: 'real-world', label: 'Real world', name: 'Real world robustness', icon: icons.world },
      { id: 'grasp-optimization', label: 'Grasps', name: 'Fast grasp optimization', icon: icons.hand },
      { id: 'pipeline', label: 'Pipeline', name: 'Batteries included', icon: icons.pipeline },
      { id: 'all-arms-all-hands', label: 'Robots', name: 'All Arms All Hands', icon: icons.robots },
      { id: 'api', label: 'API', name: 'From scenes to real robots', icon: icons.api },
    ],
    roboskills: [
      { id: 'harnesses', label: 'Workflows', name: 'Built-in five workflows', icon: icons.tasks },
      { id: 'model-cost', label: 'Results', name: 'Cheaper, and it succeeds more',
        icon: '<path d="M4 20V11m6 9V4m6 16v-6m4 6H2"/>' },
      { id: 'agent', label: 'Agent', name: 'Agent tasks, actions and feedback', icon: icons.api },
      { id: 'real2sim', label: 'Real2Sim', name: 'Demonstrations into simulation', icon: icons.world },
      { id: 'motion-generation', label: 'Motion', name: 'Text, photos or video in',
        icon: '<circle cx="12" cy="4" r="2"/><path d="m5 9 7-1 7 1M12 8v6m-4 7 4-7 4 7"/>' },
      { id: 'agentic-simulation', label: 'Simulate', name: 'From instruction to working code', icon: icons.robots },
    ],
  }[kitKey];
  const nav = document.createElement('nav');
  nav.className = 'chapter-nav';
  nav.setAttribute('aria-label', `${kitName} chapters`);
  nav.innerHTML = `
    <a class="chapter-nav__link chapter-nav__home" href="#page" aria-label="${kitName} overview" title="Back to overview">
      <img src="/assets/brand/gear/robokit-ucsd.svg" alt="" width="24" height="24" />
    </a>
    ${chapters.map(chapter => `
      <a class="chapter-nav__link" href="#${chapter.id}" aria-label="${chapter.label}: ${chapter.name}" title="${chapter.name}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${chapter.icon}</svg>
        <span>${chapter.label}</span>
      </a>`).join('')}`;
  const hero = document.querySelector('.hero');
  const layout = document.createElement('div');
  layout.className = 'chapter-layout';
  const content = document.createElement('div');
  content.className = 'chapter-content';
  while (hero.nextElementSibling) content.append(hero.nextElementSibling);
  layout.append(nav, content);
  hero.after(layout);
  const skip = document.createElement('a');
  skip.className = 'project-skip';
  skip.href = `#${chapters[0].id}`;
  skip.textContent = 'Skip to content';
  document.body.prepend(skip);

  // Scroll-spy and smooth scrolling cover every chapter.
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  sections.forEach((section, i) => {
    section.setAttribute('tabindex', '-1');
    if (i) section.classList.add('chapter-section');
  });

  let current = -1;
  let scheduled = false;
  const update = () => {
    scheduled = false;
    nav.classList.toggle('is-shown', layout.getBoundingClientRect().top < window.innerHeight * .5);
    const marker = 80 + Math.min(window.innerHeight * .16, 120);
    const tops = sections.map(section => section.getBoundingClientRect().top);
    const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const next = atEnd ? sections.length - 1 : tops.findLastIndex(top => top <= marker);
    if (next === current) return;
    current = next;
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    // Keep the current item visible in the horizontally scrolling phone tray.
    if (next >= 0 && getComputedStyle(nav).flexDirection === 'row') {
      const link = links[next];
      if (link.offsetLeft < nav.scrollLeft || link.offsetLeft + link.offsetWidth > nav.scrollLeft + nav.clientWidth) {
        nav.scrollLeft = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
      }
    }
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };

  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!links.includes(link) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const target = sections[links.indexOf(link)];
    if (window.location.hash !== link.hash) history.pushState(null, '', link.hash);
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', () => {
    const target = location.hash ? sections.find(section => '#' + section.id === location.hash) : sections[0];
    if (!target) return;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    schedule();
  });
  schedule();
})();
