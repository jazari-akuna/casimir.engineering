(() => {
  const shortcuts = {
    'h': '#hero',
    'k': '#capabilities',
    'p': '#projects',
    'w': '#process',
    'c': '#contact',
    '?': 'shortcuts',
    'l': () => {
      const alt = document.documentElement.lang === 'en' ? 'fr' : 'en';
      window.location.href = '/' + alt + '/';
    }
  };

  const overlay = document.getElementById('shortcuts-overlay');
  const closeBtn = document.getElementById('shortcutsClose');

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const key = e.key.toLowerCase();
    const action = shortcuts[key];

    if (!action) {
      if (key === 'escape' && overlay) {
        overlay.setAttribute('aria-hidden', 'true');
      }
      return;
    }

    e.preventDefault();

    if (typeof action === 'function') {
      action();
    } else if (action === 'shortcuts' && overlay) {
      const isHidden = overlay.getAttribute('aria-hidden') === 'true';
      overlay.setAttribute('aria-hidden', !isHidden);
      if (isHidden && closeBtn) closeBtn.focus();
    } else {
      const el = document.querySelector(action);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo(0, top);
        history.pushState(null, null, action);
      }
    }
  });

  // Close overlay on click outside or close button
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.setAttribute('aria-hidden', 'true');
  });

  closeBtn?.addEventListener('click', () => {
    overlay?.setAttribute('aria-hidden', 'true');
  });
})();
