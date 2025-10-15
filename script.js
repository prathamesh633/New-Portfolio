// ----------  type-writer  ----------
const txt = "DevOps Engineer + Cloud Tamer";
let i = 0;
const speed = 90;
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("type-writer").textContent += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
window.addEventListener("DOMContentLoaded", typeWriter);

// ----------  theme toggle  ----------
const toggle = document.getElementById("theme-toggle");
const body = document.body;
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
  body.classList.add("light");
toggle.addEventListener("click", () => body.classList.toggle("light"));

// ----------  scroll progress  ----------
window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress").style.width = scrolled + "%";
});

// ----------  animated counters  ----------
const counters = document.querySelectorAll(".num");
const speedCount = 200;
const animate = (el) => {
  const target = +el.getAttribute("data-target");
  const increment = target / 50;
  let current = 0;
  const update = () => {
    if (current < target) {
      current += increment;
      el.textContent = Math.ceil(current);
      setTimeout(update, speedCount);
    } else {
      el.textContent = target;
    }
  };
  update();
};
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);
counters.forEach((c) => counterObserver.observe(c));

// ----------  timeline fade-in  ----------
const timelineItems = document.querySelectorAll(".timeline-item");
const tlObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.3 }
);
timelineItems.forEach((item) => tlObserver.observe(item));

// ----------  particles  ----------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particlesArray;
const numberParticles = 50;
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.speedY = Math.random() * 0.4 - 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberParticles; i++) particlesArray.push(new Particle());
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();


/* ----- animate skill bars on scroll ----- */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = fill.getAttribute("data-width");
        fill.style.width = target + "%";
        barObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".bar-fill").forEach((el) => barObserver.observe(el));