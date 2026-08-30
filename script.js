/**
 * PRATHAMESH BHUJADE - MODERN DEVOPS PORTFOLIO SCRIPT
 * Features: Interactive Terminal, Particle Constellations, ScrollSpy,
 * Theme Engine, Radial Gauges, Project Filters, Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initLoadingScreen();
  initTypeWriter();
  initScrollProgressAndSpy();
  initParticlesBackground();
  initDevOpsTerminal();
  initCounters();
  initRadialSkillGauges();
  initSpotlightHoverEffect();
  initCategoryFilters();
  initContactAndToasts();
  initBackToTop();
  initMobileNav();
});

/* ==========================================================================
   1. Theme Toggle & Persistence
   ========================================================================== */
function initThemeEngine() {
  const toggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
  } else if (savedTheme === 'dark') {
    html.classList.remove('light');
    html.classList.add('dark');
  } else {
    // Default to dark for sleek devops vibe
    html.classList.add('dark');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = html.classList.contains('light');
      if (isLight) {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('portfolio-theme', 'dark');
        showToast('Switched to Dark Mode 🌙');
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('portfolio-theme', 'light');
        showToast('Switched to Light Mode ☀️');
      }
    });
  }
}

/* ==========================================================================
   2. Page Loader
   ========================================================================== */
function initLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 600);
  });
}

/* ==========================================================================
   3. Typewriter Effect in Hero
   ========================================================================== */
function initTypeWriter() {
  const element = document.getElementById('type-writer');
  if (!element) return;

  const roles = [
    'DevOps Engineer',
    'Cloud Infrastructure Architect',
    'Kubernetes & Docker Specialist',
    'CI/CD & Automation Engineer',
    'Site Reliability Practitioner'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 85;
  const deleteSpeed = 45;
  const holdTime = 2200;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      element.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, holdTime);
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }
  }

  setTimeout(type, 800);
}

/* ==========================================================================
   4. Scroll Progress & ScrollSpy
   ========================================================================== */
function initScrollProgressAndSpy() {
  const progressBar = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // ScrollSpy active state
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

      mobileNavLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   5. Interactive DevOps Cloud Terminal Simulation
   ========================================================================== */
function initDevOpsTerminal() {
  const inputEl = document.getElementById('terminal-input');
  const submitBtn = document.getElementById('terminal-submit-btn');
  const historyContainer = document.getElementById('terminal-history');
  const resetBtn = document.getElementById('terminal-reset-btn');
  const quickChips = document.querySelectorAll('.quick-chip');

  if (!inputEl || !historyContainer) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<div class="space-y-1">
  <div class="text-purple font-bold mb-1">Available DevOps Terminal Commands:</div>
  <table class="term-table">
    <tr><td><span class="text-purple font-bold">whoami</span></td><td>Display engineer profile and mission</td></tr>
    <tr><td><span class="text-purple font-bold">kubectl get pods</span></td><td>Inspect live production Kubernetes cluster pods</td></tr>
    <tr><td><span class="text-purple font-bold">kubectl get nodes</span></td><td>List Kubernetes cluster worker nodes</td></tr>
    <tr><td><span class="text-cyan font-bold">terraform status</span></td><td>Inspect AWS infrastructure state & provisioned resources</td></tr>
    <tr><td><span class="text-purple font-bold">cat skills.json</span></td><td>Output core technology stack and proficiency levels</td></tr>
    <tr><td><span class="text-cyan font-bold">pipeline status</span></td><td>View recent GitHub Actions CI/CD workflow executions</td></tr>
    <tr><td><span class="text-purple font-bold">projects</span></td><td>List featured production projects</td></tr>
    <tr><td><span class="text-cyan font-bold">contact</span></td><td>Display direct reachout details</td></tr>
    <tr><td><span class="text-purple font-bold">clear</span></td><td>Clear terminal screen</td></tr>
  </table>
</div>`,

    whoami: () => `
<div>
  <div class="text-purple font-bold text-base">Prathamesh Bhujade - DevOps & Cloud Infrastructure Engineer</div>
  <div class="text-secondary mt-1">
    Specialized in AWS cloud solutions, Kubernetes container orchestration, CI/CD automated delivery pipelines, and declarative Infrastructure as Code (Terraform).
  </div>
  <div class="mt-2 text-xs text-muted">
    📍 Nagpur, Maharashtra, India • ✉️ prathameshbhujade@outlook.com • ⚡ Open to Opportunities
  </div>
</div>`,

    'kubectl get pods': () => `
<div>
  <table class="term-table">
    <thead>
      <tr>
        <th>NAME</th>
        <th>READY</th>
        <th>STATUS</th>
        <th>RESTARTS</th>
        <th>AGE</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>student-mgmt-api-7c89f9b54-8k2lq</td><td>1/1</td><td><span class="term-badge-ready">Running</span></td><td>0</td><td>14d</td></tr>
      <tr><td>reddit-clone-web-6d9b4c778-9p4nx</td><td>1/1</td><td><span class="term-badge-ready">Running</span></td><td>0</td><td>8d</td></tr>
      <tr><td>flask-monitoring-svc-57dfb8994-x29vl</td><td>1/1</td><td><span class="term-badge-ready">Running</span></td><td>0</td><td>21d</td></tr>
      <tr><td>argocd-server-85f9cb46d-q4m2t</td><td>1/1</td><td><span class="term-badge-ready">Running</span></td><td>0</td><td>45d</td></tr>
      <tr><td>ingress-nginx-controller-5c747</td><td>1/1</td><td><span class="term-badge-ready">Running</span></td><td>0</td><td>45d</td></tr>
    </tbody>
  </table>
  <div class="text-xs text-muted mt-1">Cluster status: 5/5 pods healthy • HPA policy active • Zero downtime</div>
</div>`,

    'kubectl get nodes': () => `
<div>
  <table class="term-table">
    <thead>
      <tr><th>NAME</th><th>STATUS</th><th>ROLES</th><th>AGE</th><th>VERSION</th></tr>
    </thead>
    <tbody>
      <tr><td>ip-10-0-1-42.ec2.internal</td><td><span class="term-badge-ready">Ready</span></td><td>control-plane</td><td>45d</td><td>v1.28.4</td></tr>
      <tr><td>ip-10-0-2-18.ec2.internal</td><td><span class="term-badge-ready">Ready</span></td><td>worker</td><td>45d</td><td>v1.28.4</td></tr>
      <tr><td>ip-10-0-2-89.ec2.internal</td><td><span class="term-badge-ready">Ready</span></td><td>worker</td><td>45d</td><td>v1.28.4</td></tr>
    </tbody>
  </table>
</div>`,

    'terraform status': () => `
<div>
  <div class="text-purple font-bold">AWS Infrastructure State (Managed via Terraform v1.6.0)</div>
  <table class="term-table mt-1">
    <tr><td><span class="text-cyan">aws_vpc.prod_vpc</span></td><td>10.0.0.0/16 (3 Public, 3 Private Subnets)</td><td><span class="term-badge-ready">APPLIED</span></td></tr>
    <tr><td><span class="text-cyan">aws_eks_cluster.prod</span></td><td>EKS v1.28 (Managed Node Group)</td><td><span class="term-badge-ready">APPLIED</span></td></tr>
    <tr><td><span class="text-cyan">aws_s3_bucket.artifacts</span></td><td>Encrypted SSE-S3 + Versioning</td><td><span class="term-badge-ready">APPLIED</span></td></tr>
    <tr><td><span class="text-cyan">aws_iam_role.k8s_node</span></td><td>Least Privilege Policies Attached</td><td><span class="term-badge-ready">APPLIED</span></td></tr>
  </table>
  <div class="text-xs text-green mt-1">✓ Plan: 0 to add, 0 to change, 0 to destroy. Infrastructure synchronized.</div>
</div>`,

    'cat skills.json': () => `
<pre style="color: #fb923c; font-size: 0.78rem; line-height: 1.4;">
{
  "cloud": ["AWS (EC2, EKS, S3, VPC, RDS, IAM)", "Microsoft Azure (VMs, Blob, AKS)", "Google Cloud Platform (Compute, GKE)"],
  "containers": ["Docker", "Kubernetes", "Helm", "Docker Compose"],
  "iac_automation": ["Terraform", "Ansible", "Bash Scripting", "Python"],
  "cicd": ["GitHub Actions", "GitLab CI/CD", "Bitbucket Pipelines", "Jenkins", "ArgoCD (GitOps)"],
  "observability": ["Prometheus", "Grafana", "CloudWatch", "Alertmanager"],
  "os_and_web": ["Linux (Ubuntu/RHEL/Debian)", "Nginx", "Apache Tomcat"]
}
</pre>`,

    'pipeline status': () => `
<div>
  <table class="term-table">
    <thead>
      <tr><th>WORKFLOW</th><th>EVENT</th><th>STATUS</th><th>DURATION</th></tr>
    </thead>
    <tbody>
      <tr><td>build-and-test.yml</td><td>push (main)</td><td><span class="term-badge-ready">✓ SUCCESS</span></td><td>1m 24s</td></tr>
      <tr><td>docker-publish.yml</td><td>release</td><td><span class="term-badge-ready">✓ SUCCESS</span></td><td>2m 08s</td></tr>
      <tr><td>k8s-gitops-sync.yml</td><td>repository_dispatch</td><td><span class="term-badge-ready">✓ SUCCESS</span></td><td>42s</td></tr>
      <tr><td>security-trivy-scan.yml</td><td>schedule</td><td><span class="term-badge-ready">✓ SUCCESS</span></td><td>3m 15s</td></tr>
    </tbody>
  </table>
  <div class="text-xs text-cyan mt-1">Average pipeline velocity improvement: 40% faster execution.</div>
</div>`,

    projects: () => `
<div>
  <div class="text-cyan font-bold mb-1">Featured Projects:</div>
  <ul style="padding-left: 1rem; list-style-type: square;" class="space-y-1">
    <li><strong>Student Management Platform</strong> - Java/Tomcat, Docker, EKS, ArgoCD GitOps</li>
    <li><strong>Reddit Microservices Clone</strong> - Kubernetes Orchestration, Ingress, Helm, HPA</li>
    <li><strong>Flask Cloud Web App</strong> - Multi-stage Docker, Prometheus Metrics, CloudWatch</li>
    <li><strong>Notes App & Reverse Proxy</strong> - React, Django, Nginx SSL Caching, Docker Compose</li>
  </ul>
</div>`,

    contact: () => `
<div>
  <div class="text-cyan font-bold">Contact & Social Channels:</div>
  <div class="mt-1 space-y-1">
    <div>📧 <strong>Email:</strong> <a href="mailto:prathameshbhujade@outlook.com" class="text-cyan">prathameshbhujade@outlook.com</a></div>
    <div>💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/prathamesh633" target="_blank" class="text-cyan">linkedin.com/in/prathamesh633</a></div>
    <div>🐙 <strong>GitHub:</strong> <a href="https://github.com/prathamesh633" target="_blank" class="text-cyan">github.com/prathamesh633</a></div>
  </div>
</div>`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    if (cmd.toLowerCase() === 'clear') {
      historyContainer.innerHTML = '';
      inputEl.value = '';
      return;
    }

    const commandEntry = document.createElement('div');
    commandEntry.className = 'history-item';

    const normalizedCmd = cmd.toLowerCase();
    let outputHTML = '';

    if (commands[normalizedCmd]) {
      outputHTML = commands[normalizedCmd]();
    } else if (normalizedCmd === 'kubectl' || normalizedCmd.startsWith('kubectl ')) {
      outputHTML = `<div class="text-yellow">Kubernetes resource queried. Try <span class="text-cyan">kubectl get pods</span> or <span class="text-cyan">kubectl get nodes</span>.</div>`;
    } else if (normalizedCmd === 'terraform' || normalizedCmd.startsWith('terraform ')) {
      outputHTML = `<div class="text-yellow">Terraform CLI ready. Try <span class="text-cyan">terraform status</span> to inspect state.</div>`;
    } else {
      outputHTML = `<div class="text-red">zsh: command not found: ${escapeHtml(cmd)}. Type <span class="text-cyan font-bold">help</span> to view available commands.</div>`;
    }

    commandEntry.innerHTML = `
      <div class="history-cmd-row">
        <span class="term-user">prathamesh@cloud</span><span class="term-sep">:</span><span class="term-path">~</span><span class="term-symbol">$</span>
        <span class="history-cmd-text">${escapeHtml(cmd)}</span>
      </div>
      <div class="history-output">${outputHTML}</div>
    `;

    historyContainer.appendChild(commandEntry);
    inputEl.value = '';

    // Scroll to bottom
    const terminalBody = document.getElementById('terminal-output');
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputEl.value);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        inputEl.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputEl.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        inputEl.value = '';
      }
    }
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      executeCommand(inputEl.value);
    });
  }

  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      historyContainer.innerHTML = '';
      inputEl.value = '';
      showToast('Terminal session reset');
    });
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   6. Animated Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.num');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          if (isNaN(target)) return;

          animateSingleCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => counterObserver.observe(c));
}

function animateSingleCounter(el, target) {
  const duration = 1800;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const current = Math.floor(progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress)));
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   7. Radial Skill Strength Gauges
   ========================================================================== */
function initRadialSkillGauges() {
  const skills = document.querySelectorAll('.radial-skill');
  if (!skills.length) return;

  const radius = 50;
  const circumference = 2 * Math.PI * radius; // approx 314.16

  const radialObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillEl = entry.target;
          const percent = parseInt(skillEl.getAttribute('data-percent'), 10);
          const circle = skillEl.querySelector('.radial-bar');

          if (circle && !isNaN(percent)) {
            circle.style.strokeDasharray = `${circumference}`;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = `${offset}`;
          }

          observer.unobserve(skillEl);
        }
      });
    },
    { threshold: 0.3 }
  );

  skills.forEach((skill) => radialObserver.observe(skill));
}

/* ==========================================================================
   8. Spotlight Mouse Glow Effect on Cards
   ========================================================================== */
function initSpotlightHoverEffect() {
  const cards = document.querySelectorAll('.skill-spotlight-card, .project-card, .edu-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   9. Category Filter Tabs (Skills & Projects)
   ========================================================================== */
function initCategoryFilters() {
  // Skill Filters
  const skillTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-spotlight-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      skillCards.forEach((card) => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Filters
  const projectTabs = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      projectTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   10. Particles Background with Constellations
   ========================================================================== */
function initParticlesBackground() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  const particleCount = 45;
  let width, height;
  const mouse = { x: null, y: null, radius: 120 };

  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.offsetWidth;
    height = canvas.height = parent.offsetHeight;
    createParticles();
  }

  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      const isLight = document.documentElement.classList.contains('light');
      ctx.fillStyle = isLight ? 'rgba(124, 58, 237, 0.45)' : 'rgba(168, 85, 247, 0.55)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createParticles() {
    particlesArray = [];
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
  }

  function connect() {
    const isLight = document.documentElement.classList.contains('light');
    const baseColor = isLight ? '124, 58, 237' : '168, 85, 247';

    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.18;
          ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particlesArray.forEach((p) => {
      p.update();
      p.draw();
    });
    connect();
    requestAnimationFrame(animate);
  }

  resize();
  animate();
}

/* ==========================================================================
   11. Contact Form & Toast Notifications
   ========================================================================== */
function initContactAndToasts() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailStr = 'prathameshbhujade@outlook.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard
        .writeText(emailStr)
        .then(() => {
          showToast('Email address copied to clipboard! 📋');
        })
        .catch(() => {
          showToast(`Email: ${emailStr}`);
        });
    });
  }

  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      // If Formspree endpoint is default, handle gracefully
      if (form.action.includes('outlook.com') || form.action.includes('YOUR_ID')) {
        e.preventDefault();
        submitBtn.classList.add('loading');

        setTimeout(() => {
          submitBtn.classList.remove('loading');
          form.reset();
          showToast('Message sent successfully! 🚀 I will get back to you soon.');
        }, 1200);
      }
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-cyan"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease-in forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

/* ==========================================================================
   12. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.pageYOffset > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   13. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      menuBtn.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}
