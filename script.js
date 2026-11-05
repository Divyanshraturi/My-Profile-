// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Rotating role text
const roles = [
  "Technology Enthusiast",
  "AI Explorer",
  "Computer Science Student",
  "Developer in Progress"
];

const roleElement = document.getElementById("typed-role");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeRole() {
  if (reduceMotion) {
    roleElement.textContent = roles[0];
    return;
  }

  const current = roles[roleIndex];

  if (!deleting) {
    letterIndex++;
    roleElement.textContent = current.slice(0, letterIndex);
    if (letterIndex === current.length) {
      deleting = true;
      setTimeout(typeRole, 1500);
      return;
    }
  } else {
    letterIndex--;
    roleElement.textContent = current.slice(0, letterIndex);
    if (letterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, deleting ? 38 : 75);
}
typeRole();

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Subtle monochrome animated particle network
const canvas = document.getElementById("ambient-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let width = 0;
let height = 0;
let animationFrame;

function makeParticles() {
  const count = Math.min(75, Math.floor((width * height) / 17000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    radius: Math.random() * 1.3 + 0.5
  }));
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  makeParticles();
}

function drawNetwork() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    if (!reduceMotion) {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(225, 222, 215, 0.48)";
    ctx.fill();

    for (let j = index + 1; j < particles.length; j++) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 125) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(210, 207, 200, ${(1 - distance / 125) * 0.11})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  });

  if (!reduceMotion) animationFrame = requestAnimationFrame(drawNetwork);
}

resizeCanvas();
drawNetwork();

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  if (!reduceMotion) drawNetwork();
});
