/* ========================
   NEXUS STUDIO — main.js
   ======================== */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
let mx = -100, my = -100;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
document.addEventListener('mousedown', () => cursor.classList.add('expanded'));
document.addEventListener('mouseup', () => cursor.classList.remove('expanded'));
document.querySelectorAll('a, button, .work-card, .p-card, .service-card, .blog-card, .team-card')
  .forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ---- REVEAL ON SCROLL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- COUNT-UP ANIMATION ----
function countUp(el) {
  const target = +el.getAttribute('data-target');
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.num').forEach(countUp);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-bar').forEach(el => statObserver.observe(el));

// ---- TESTIMONIALS ----
const testimonials = [
  {
    text: "Working with NEXUS was a game-changer. They took our vague idea and turned it into something we couldn't have imagined ourselves.",
    author: "— Aria Chen, CEO of Aurum Finance"
  },
  {
    text: "From day one, they listened deeply and delivered beyond what was in the brief. The result was a 47% increase in conversion.",
    author: "— Marcus Webb, Founder of GreenPulse"
  },
  {
    text: "NEXUS doesn't just build websites — they build experiences. Our new site has completely changed how clients perceive our brand.",
    author: "— Yuna Park, Creative Director at Velvet Studio"
  }
];

let currentTest = 0;
function setTestimonial(index) {
  const textEl = document.getElementById('testimonialText');
  const authorEl = document.getElementById('testimonialAuthor');
  if (!textEl) return;

  textEl.style.opacity = '0';
  authorEl.style.opacity = '0';

  setTimeout(() => {
    currentTest = index;
    textEl.textContent = testimonials[index].text;
    authorEl.textContent = testimonials[index].author;
    textEl.style.opacity = '1';
    authorEl.style.opacity = '1';
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
  }, 300);
}

// Auto-rotate testimonials
if (document.getElementById('testimonialText')) {
  setInterval(() => setTestimonial((currentTest + 1) % testimonials.length), 5000);
}

// ---- PORTFOLIO FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const pCards = document.querySelectorAll('.p-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    pCards.forEach(card => {
      const cats = card.getAttribute('data-cat') || '';
      const match = filter === 'all' || cats.includes(filter);
      card.classList.toggle('hidden', !match);
    });
  });
});

// ---- CONTACT FORM SUBMIT ----
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const btnText = btn.querySelector('.btn-text');
  btnText.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    const success = document.getElementById('formSuccess');
    success.style.display = 'flex';
    success.style.opacity = '0';
    requestAnimationFrame(() => {
      success.style.transition = 'opacity 0.5s';
      success.style.opacity = '1';
    });
  }, 1200);
}

// ---- NEWSLETTER SUBSCRIBE ----
function subscribeNewsletter() {
  const input = document.getElementById('emailInput');
  const success = document.getElementById('nlSuccess');
  if (!input) return;

  if (!input.value || !input.value.includes('@')) {
    input.style.borderColor = 'var(--danger)';
    setTimeout(() => input.style.borderColor = '', 1500);
    return;
  }

  success.style.display = 'block';
  input.value = '';
  input.placeholder = 'Thanks! You\'re subscribed.';
}

// ---- PAGE ENTRANCE ANIMATION ----
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
});

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- PARALLAX HERO ORBS ----
window.addEventListener('mousemove', e => {
  const orbs = document.querySelectorAll('.hero .orb, .page-hero .orb');
  const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const strength = i === 0 ? 25 : 15;
    orb.style.transform = `translate(${xRatio * strength}px, ${yRatio * strength}px)`;
  });
}, { passive: true });
