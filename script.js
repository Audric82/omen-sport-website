// Omen — interactions de la landing page
(() => {
  // Icônes Lucide
  if (window.lucide) lucide.createIcons();

  // Année du footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header : fond au scroll
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  mobileMenu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    })
  );

  // Apparition au scroll
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Spotlight sur les cartes
  document.querySelectorAll('.spotlight').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - r.left}px`);
      card.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  });

  // Tarifs : mensuel / annuel
  const toggle = document.getElementById('billing-toggle');
  const knob = document.getElementById('billing-knob');
  const labels = document.querySelectorAll('[data-billing-label]');
  let yearly = false;
  const renderPrices = () => {
    document.querySelectorAll('[data-price]').forEach((el) => {
      el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
    });
    document.querySelectorAll('[data-period]').forEach((el) => {
      el.textContent = yearly ? '/mois, facturé annuellement' : '/mois';
    });
    knob.style.transform = yearly ? 'translateX(20px)' : 'translateX(0)';
    toggle.setAttribute('aria-checked', String(yearly));
    toggle.classList.toggle('bg-violet-500', yearly);
    toggle.classList.toggle('bg-zinc-800', !yearly);
    labels.forEach((l) => {
      const active = (l.dataset.billingLabel === 'yearly') === yearly;
      l.classList.toggle('text-white', active);
      l.classList.toggle('text-zinc-500', !active);
    });
  };
  toggle.addEventListener('click', () => { yearly = !yearly; renderPrices(); });
  renderPrices();

  // FAQ accordéon
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('button');
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Mockup mobile : valider une série
  document.querySelectorAll('[data-set]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const done = btn.dataset.done === 'true';
      btn.dataset.done = String(!done);
      btn.classList.toggle('bg-violet-500', !done);
      btn.classList.toggle('border-violet-400', !done);
      btn.classList.toggle('text-white', !done);
      btn.classList.toggle('border-zinc-700', done);
      btn.classList.toggle('text-transparent', done);
    });
  });
})();
