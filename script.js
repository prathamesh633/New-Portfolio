// ----------  Enhanced type-writer with multiple phrases  ----------
const phrases = [
  "DevOps Engineer + Cloud Tamer",
  "Infrastructure Automation Expert",
  "Kubernetes & AWS Specialist"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const pauseTime = 2000;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  const typewriterElement = document.getElementById("type-writer");
  
  if (!isDeleting && charIndex < currentPhrase.length) {
    typewriterElement.textContent += currentPhrase.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, typeSpeed);
  } else if (isDeleting && charIndex > 0) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(typeWriter, deleteSpeed);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typeWriter, pauseTime);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeWriter, 1000);
});

// ----------  Enhanced theme toggle with animation  ----------
const toggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.toggle('light', savedTheme === 'light');
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
  body.classList.add("light");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("light");
  
  // Save theme preference
  const isLight = body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  
  // Add ripple effect
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  toggle.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// ----------  Enhanced scroll progress with smooth animation  ----------
let ticking = false;

function updateScrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress").style.width = scrolled + "%";
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollProgress);
    ticking = true;
  }
});

// ----------  Enhanced animated counters  ----------
const counters = document.querySelectorAll(".num");

const animateCounter = (el) => {
  const target = +el.getAttribute("data-target");
  const duration = 2000; // 2 seconds
  const start = performance.now();
  
  const update = (currentTime) => {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(easeOutQuart * target);
    
    el.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };
  
  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((c) => counterObserver.observe(c));

// ----------  Enhanced timeline animations  ----------
const timelineItems = document.querySelectorAll(".timeline-item");

const tlObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 200); // Stagger the animations
      }
    });
  },
  { threshold: 0.2 }
);

timelineItems.forEach((item) => tlObserver.observe(item));

// ----------  Enhanced particles with mouse interaction  ----------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particlesArray = [];
const numberParticles = 70;
let mouse = { x: null, y: null, radius: 130 };

function resizeCanvas() {
  const cssWidth = canvas.offsetWidth;
  const cssHeight = canvas.offsetHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(cssWidth * ratio));
  canvas.height = Math.max(1, Math.floor(cssHeight * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  initParticles();
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", resizeCanvas);
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

canvas.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.8;
    this.baseSize = this.size;
    this.speedX = Math.random() * 0.3 - 0.15;
    this.speedY = Math.random() * 0.3 - 0.15;
    this.opacity = Math.random() * 0.25 + 0.25; // slightly more visible
  }
  
  update() {
    // Mouse interaction
    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 1.2;
        this.y -= Math.sin(angle) * force * 1.2;
        this.size = this.baseSize + force * 1.2;
      } else {
        this.size = this.baseSize;
      }
    }
    
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  
  draw() {
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add glow effect
    ctx.shadowColor = accent;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 85) {
        const opacity = 1 - distance / 85;
        ctx.globalAlpha = opacity * 0.2;
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let particle of particlesArray) {
    particle.update();
    particle.draw();
  }
  
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ----------  Enhanced skill bars animation  ----------
// Observe the track (non-zero area) so the callback reliably fires
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const track = entry.target;
        const fill = track.querySelector('.bar-fill');
        if (!fill) return;
        const target = parseInt(fill.getAttribute('data-width'));

        if (!isNaN(target) && !fill.classList.contains('animated')) {
          fill.classList.add('animated');
          setTimeout(() => {
            fill.style.setProperty('width', target + '%', 'important');
          }, Math.random() * 300);
        }

        barObserver.unobserve(track);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.bar-track').forEach((el) => barObserver.observe(el));

// Fallback: apply widths immediately in case observers don't fire or DOMContentLoaded already passed
(() => {
  const fills = document.querySelectorAll('.bar-fill');
  if (!fills.length) return;
  // Trigger animation via rAF to ensure initial layout computed
  requestAnimationFrame(() => {
    fills.forEach((fill) => {
      const target = parseInt(fill.getAttribute('data-width'));
      if (!isNaN(target)) {
        fill.style.setProperty('width', target + '%', 'important');
      }
    });
  });
})();

// Also set on full window load to cover edge cases
window.addEventListener('load', () => {
  document.querySelectorAll('.bar-fill').forEach((fill) => {
    const target = parseInt(fill.getAttribute('data-width'));
    if (!isNaN(target)) {
      fill.style.setProperty('width', target + '%', 'important');
    }
  });
});

// ----------  Smooth scroll for navigation links  ----------
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ----------  Enhanced scroll animations  ----------
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
  scrollObserver.observe(section);
});

// ----------  Parallax effect for hero section  ----------
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ----------  Add hover effects to interactive elements  ----------
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ----------  Loading animation  ----------
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ----------  Add CSS for ripple effect and animations  ----------
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  body.loaded {
    animation: fadeIn 0.5s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);