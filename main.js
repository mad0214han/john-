/* =========================================================
   TEAM UNITY — Interactions
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroSlider();
  initScrollSpy();
  initWorksArchive();
  initContactForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------
   Mobile navigation toggle
--------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    });
  });
}

/* ---------------------------------------------------------
   Hero slider — moving banner
--------------------------------------------------------- */
function initHeroSlider() {
  const track = document.getElementById('heroSlides');
  const dotsWrap = document.getElementById('dots');
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.querySelectorAll('.hero-slide'));
  const dots = Array.from(dotsWrap.querySelectorAll('.dot'));
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let current = slides.findIndex((s) => s.classList.contains('active'));
  if (current < 0) current = 0;

  const AUTO_DELAY = 5500;
  let timer = null;

  function goTo(index) {
    const next = (index + slides.length) % slides.length;
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = next;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(() => goTo(current + 1), AUTO_DELAY);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  const heroSection = document.getElementById('home');
  heroSection?.addEventListener('mouseenter', stopAuto);
  heroSection?.addEventListener('mouseleave', startAuto);

  startAuto();
}

/* ---------------------------------------------------------
   Scroll spy — lights up the active nav link
--------------------------------------------------------- */
function initScrollSpy() {
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.desktop-nav a, .mobile-nav a'));
  if (!sections.length || !navLinks.length) return;

  const linkFor = (id) => navLinks.filter((a) => a.getAttribute('href') === `#${id}`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.remove('active'));
        linkFor(entry.target.id).forEach((a) => a.classList.add('active'));
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   Works archive — year tabs populate the grid
--------------------------------------------------------- */
const WORKS_BY_YEAR = {
  2026: [
    { tag: 'Workshop', title: 'Mural Weekend', desc: 'A two-day community mural painted with fifty first-time artists.', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80' },
    { tag: 'Skill Labs', title: 'Sound Design Lab', desc: 'Hands-on sessions on foley, mixing and scoring for short films.', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80' },
    { tag: 'College', title: 'Campus Art Week', desc: 'A week of installations and talks across three partner colleges.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80' }
  ],
  2025: [
    { tag: 'School', title: 'Young Illustrators', desc: 'An eight-week illustration programme for middle-school students.', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' },
    { tag: 'Art Community', title: 'Open Studio Nights', desc: 'Monthly evenings where members share works in progress.', img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80' },
    { tag: 'Workshop', title: 'Clay & Community', desc: 'A ceramics residency built around collaborative pieces.', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80' }
  ],
  2024: [
    { tag: 'Skill Labs', title: 'Animation Bootcamp', desc: 'An intensive on 2D animation fundamentals for new trainers.', img: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=800&q=80' },
    { tag: 'College', title: 'Design Sprint', desc: 'Students teamed up with volunteers to prototype civic projects.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
    { tag: 'Art Community', title: 'Street Canvas', desc: 'Public wall art turning a transit underpass into a gallery.', img: 'https://images.unsplash.com/photo-1499892477393-f675706cbe6e?auto=format&fit=crop&w=800&q=80' }
  ],
  2023: [
    { tag: 'School', title: 'Storyboard Club', desc: 'A after-school club teaching visual storytelling basics.', img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80' },
    { tag: 'Workshop', title: 'Printmaking Circle', desc: 'A recurring workshop introducing relief and screen printing.', img: 'https://images.unsplash.com/photo-1579762593175-20226054cad0?auto=format&fit=crop&w=800&q=80' },
    { tag: 'Skill Labs', title: 'Photography Basics', desc: 'A foundations course on composition, light and editing.', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' }
  ],
  2022: [
    { tag: 'Art Community', title: 'Founders\' Showcase', desc: 'Our very first exhibition, featuring twelve founding members.', img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80' },
    { tag: 'College', title: 'First Collaboration', desc: 'A pilot partnership that shaped how we run campus projects today.', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80' },
    { tag: 'Workshop', title: 'Community Kickoff', desc: 'The gathering where Team Unity\'s mission was first written down.', img: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=800&q=80' }
  ]
};

function initWorksArchive() {
  const tabs = Array.from(document.querySelectorAll('.year-tab'));
  const grid = document.getElementById('worksGrid');
  if (!tabs.length || !grid) return;

  function render(year) {
    const items = WORKS_BY_YEAR[year] || [];
    grid.innerHTML = items
      .map(
        (item, i) => `
        <article class="work-card" style="animation-delay:${i * 90}ms">
          <div class="work-thumb"><img src="${item.img}" alt="${item.title}" loading="lazy"></div>
          <div class="work-body">
            <span class="work-tag">${item.tag}</span>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>
        </article>`
      )
      .join('');
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.dataset.year);
    });
  });

  const initialTab = tabs.find((t) => t.classList.contains('active')) || tabs[0];
  render(initialTab.dataset.year);
}

/* ---------------------------------------------------------
   Contact form
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const message = document.getElementById('formMessage');
  if (!form || !message) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const messageText = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !messageText) {
      message.textContent = 'Please fill in your name and message.';
      message.classList.add('error');
      return;
    }

    if (!emailPattern.test(email)) {
      message.textContent = 'Please enter a valid email address.';
      message.classList.add('error');
      return;
    }

    message.classList.remove('error');
    message.textContent = `Thanks, ${name.split(' ')[0]} — we'll be in touch soon.`;
    form.reset();
  });
}
