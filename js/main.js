/* ═══════════════════════════════════════════════════
   STUFF'D – Main JS
   ═══════════════════════════════════════════════════ */

// ── Navbar: scroll shadow + active link ──────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNav();
});

function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ── Hamburger menu ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ── Menu slider ───────────────────────────────────────
const slides     = document.querySelectorAll('.menu-slide');
const dots       = document.querySelectorAll('.dot');
let   currentSlide = 0;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

dots.forEach(dot => {
  dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.dot)));
});

// Auto-advance slider every 5 seconds
let sliderTimer = setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 5000);

// Pause on hover
const sliderWrap = document.querySelector('.menu-slider-wrap');
sliderWrap?.addEventListener('mouseenter', () => clearInterval(sliderTimer));
sliderWrap?.addEventListener('mouseleave', () => {
  sliderTimer = setInterval(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, 5000);
});

// ── Smooth scroll for all anchor links ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ── Newsletter form ───────────────────────────────────
function handleSubscribe(e) {
  e.preventDefault();
  const input  = e.target.querySelector('input[type="email"]');
  const button = e.target.querySelector('button');
  if (!input.value) return;

  button.textContent = 'SUBSCRIBED ✓';
  button.style.background = '#1a6e1a';
  input.value = '';
  input.placeholder = 'Thank you!';

  setTimeout(() => {
    button.textContent = 'SUBSCRIBE';
    button.style.background = '';
    input.placeholder = 'Your email address';
  }, 4000);
}

// ── Fade-in on scroll (intersection observer) ─────────
const fadeEls = document.querySelectorAll(
  '.menu-card, .concept-feature, .store-photos img, .gallery-grid img, .hero-feature'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
  observer.observe(el);
});
