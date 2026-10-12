(() => {
  const cards = [...document.querySelectorAll('.product-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const search = document.getElementById('productSearch');
  const empty = document.getElementById('emptyState');
  let activeFilter = 'all';
  const normalize = value => (value || '').toLowerCase().trim();
  function applyFilters() {
    const query = normalize(search?.value);
    let visible = 0;
    cards.forEach(card => {
      const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
      const textMatch = !query || normalize(card.dataset.search + ' ' + card.innerText).includes(query);
      const show = categoryMatch && textMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
    filters.forEach(button => {
      const active = button.dataset.filter === activeFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    applyFilters();
  }));
  search?.addEventListener('input', applyFilters);
  document.getElementById('resetFilters')?.addEventListener('click', () => {
    activeFilter = 'all';
    if (search) search.value = '';
    applyFilters();
  });
  const overlay = document.getElementById('searchOverlay');
  const overlaySearch = document.getElementById('overlaySearch');
  const results = document.getElementById('searchResults');
  const searchToggle = document.getElementById('searchToggle');
  function openSearch() {
    if (!overlay) return;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    renderSearch('');
    overlaySearch?.focus();
  }
  function closeSearch() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    searchToggle?.focus();
  }
  function renderSearch(value) {
    if (!results) return;
    const query = normalize(value);
    const matches = cards.filter(card => !query || normalize(card.dataset.search + ' ' + card.innerText).includes(query));
    results.innerHTML = matches.length ? matches.map(card => {
      const title = card.querySelector('h3')?.textContent || 'Product';
      const category = card.querySelector('.product-category')?.textContent || '';
      return '<a class="search-result" href="#products" data-result="' + title.replace(/"/g, '&quot;') + '"><div>' + title + '<small>' + category + '</small></div><span>↗</span></a>';
    }).join('') : '<p class="form-note">No matching products. Try another term.</p>';
    results.querySelectorAll('[data-result]').forEach(link => link.addEventListener('click', () => {
      const title = link.dataset.result;
      closeSearch();
      activeFilter = 'all';
      if (search) search.value = title;
      applyFilters();
      document.getElementById('products')?.scrollIntoView({behavior:'smooth'});
    }));
  }
  searchToggle?.addEventListener('click', openSearch);
  document.getElementById('closeSearch')?.addEventListener('click', closeSearch);
  overlay?.addEventListener('click', event => { if (event.target === overlay) closeSearch(); });
  overlaySearch?.addEventListener('input', event => renderSearch(event.target.value));
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab' && overlay && !overlay.hidden) {
      const focusable = [...overlay.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      return;
    }
    if (event.key !== 'Escape') return;
    const searchWasOpen = Boolean(overlay && !overlay.hidden);
    closeSearch();
    const nav = document.querySelector('.desktop-nav');
    const menuToggle = document.getElementById('menuToggle');
    if (!searchWasOpen && nav?.dataset.mobileOpen === 'true') {
      nav.dataset.mobileOpen = 'false';
      nav.removeAttribute('style');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.focus();
    }
  });
  document.getElementById('menuToggle')?.addEventListener('click', () => {
    const nav = document.querySelector('.desktop-nav');
    if (!nav) return;
    const open = nav.dataset.mobileOpen === 'true';
    nav.dataset.mobileOpen = String(!open);
    if (!open) {
      nav.style.cssText = 'display:flex;position:absolute;left:12px;right:12px;top:calc(100% + 6px);padding:18px;flex-direction:column;gap:18px;border-radius:16px;background:var(--bg);box-shadow:8px 8px 16px var(--shadow-dark),-8px -8px 16px var(--shadow-light);';
    } else {
      nav.removeAttribute('style');
    }
    document.getElementById('menuToggle').setAttribute('aria-expanded', String(!open));
  });
  document.querySelectorAll('.desktop-nav a').forEach(link => link.addEventListener('click', () => {
    const nav = document.querySelector('.desktop-nav');
    if (nav?.dataset.mobileOpen === 'true') {
      nav.dataset.mobileOpen = 'false';
      nav.removeAttribute('style');
      document.getElementById('menuToggle')?.setAttribute('aria-expanded', 'false');
    }
  }));
  document.getElementById('contactForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent('Arqora enquiry: ' + form.get('interest'));
    const body = encodeURIComponent('Name: ' + form.get('name') + '\nEmail: ' + form.get('email') + '\nInterest: ' + form.get('interest') + '\n\n' + (form.get('message') || ''));
    const note = document.getElementById('formNote');
    if (note) note.textContent = 'Opening your email app. Add your preferred Arqora contact address in the mailto link before launch.';
    window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  applyFilters();
})();