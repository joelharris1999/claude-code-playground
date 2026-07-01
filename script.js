(() => {
  // ── Theme ──
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.setAttribute('data-theme', saved ?? (prefersDark ? 'dark' : 'light'));

  themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ── Mobile nav ──
  const burger = document.getElementById('nav-burger');
  const navLinks = document.getElementById('nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Scroll fade-in ──
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );

  document.querySelectorAll('.section, .card, .contact-form-wrap, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // ── Project filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#project-grid .card');
  const noResults = document.getElementById('no-results');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        let visible = 0;

        projectCards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('hidden', !match);
          if (match) visible++;
        });

        if (noResults) noResults.hidden = visible > 0;
      });
    });
  }

  // ── Contact form ──
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    const fields = {
      name:    { el: form.name,    error: document.getElementById('name-error'),    msg: 'Please enter your name.' },
      email:   { el: form.email,   error: document.getElementById('email-error'),   msg: 'Please enter a valid email.' },
      subject: { el: form.subject, error: document.getElementById('subject-error'), msg: 'Please enter a subject.' },
      message: { el: form.message, error: document.getElementById('message-error'), msg: 'Please enter a message.' },
    };

    const validate = () => {
      let ok = true;
      for (const [key, f] of Object.entries(fields)) {
        const val = f.el.value.trim();
        const invalid = key === 'email'
          ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          : val.length === 0;
        f.el.classList.toggle('invalid', invalid);
        f.error.textContent = invalid ? f.msg : '';
        if (invalid) ok = false;
      }
      return ok;
    };

    Object.values(fields).forEach(f => {
      f.el.addEventListener('input', () => {
        f.el.classList.remove('invalid');
        f.error.textContent = '';
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate()) return;

      const submitBtn = document.getElementById('submit-btn');
      submitBtn.querySelector('.btn-label').hidden = true;
      submitBtn.querySelector('.btn-sending').hidden = false;
      submitBtn.disabled = true;

      await new Promise(r => setTimeout(r, 1200));

      form.hidden = true;
      formSuccess.hidden = false;
    });
  }
})();
