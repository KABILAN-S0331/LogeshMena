/* ============================================
   PREMIUM WEDDING INVITATION — INTERACTIONS
   ============================================ */

// ============ PRELOADER — BIRDS ANIMATION ============
window.addEventListener('load', () => {
  const birdLeft = document.getElementById('birdLeft');
  const birdRight = document.getElementById('birdRight');
  const centerHeart = document.getElementById('centerHeart');
  const heartBurst = document.getElementById('heartBurst');
  const preloaderText = document.getElementById('preloaderText');

  // Step 1: Birds fly in (CSS handles the 2.2s flight)
  // Step 2: After birds meet (2.2s), show center heart & burst
  setTimeout(() => {
    birdLeft.classList.add('fade-out');
    birdRight.classList.add('fade-out');
    centerHeart.classList.add('show');

    // Create burst particles
    const burstEmojis = ['❤', '💕', '✨', '💖', '💗', '🤍', '♥', '💛'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('span');
      p.classList.add('burst-particle');
      p.textContent = burstEmojis[i % burstEmojis.length];
      const angle = (i / 12) * 360;
      const dist = 60 + Math.random() * 40;
      const x = Math.cos(angle * Math.PI / 180) * dist;
      const y = Math.sin(angle * Math.PI / 180) * dist;
      p.style.animationDuration = (0.6 + Math.random() * 0.5) + 's';
      p.style.setProperty('--tx', x + 'px');
      p.style.setProperty('--ty', y + 'px');
      heartBurst.appendChild(p);
    }
  }, 2300);

  // Step 3: Show names
  setTimeout(() => {
    preloaderText.classList.add('show');
  }, 2900);

  // Step 4: Hide preloader and reveal page
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 5000);
});

// ============ COUNTDOWN TIMER ============
const weddingDate = new Date('March 22, 2026 07:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById('days').textContent = '🎉';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(3, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============ OPEN INVITATION (Smooth Scroll) ============
function openInvitation() {
  const couple = document.getElementById('couple');
  couple.scrollIntoView({ behavior: 'smooth' });
}

// ============ REVEAL ON SCROLL (Intersection Observer) ============
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      // Remove active class so it collapses back and re-animates on re-entry
      entry.target.classList.remove('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============ HERO PARTICLES ============
function createParticles() {
  const container = document.getElementById('heroParticles');
  const count = 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 3 + 1) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
    particle.style.animationDelay = (Math.random() * 6) + 's';
    container.appendChild(particle);
  }
}

createParticles();

// ============ FLOATING PETALS ============
const petalEmojis = ['🌸', '🪻', '💮', '✿', '❀', '🌺'];

function createPetal() {
  const container = document.getElementById('petalsContainer');
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = (Math.random() * 1.2 + 0.6) + 'rem';
  petal.style.animationDuration = (Math.random() * 6 + 6) + 's';
  container.appendChild(petal);

  setTimeout(() => petal.remove(), 12000);
}

setInterval(createPetal, 1500);

// ============ PARALLAX EFFECT ON HERO ============
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
  }
});

// ============ SMOOTH NAVBAR BEHAVIOR ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});