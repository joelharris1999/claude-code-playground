(() => {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  // Restore saved preference or fall back to system preference
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved ?? (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initial);

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Subtle fade-in for sections on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.section, .card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  document.addEventListener('animationend', () => {}, { once: true });

  // Apply visible state via a tiny CSS class
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);
})();
