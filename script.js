
// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

// Scroll progress bar
const progressBar = document.getElementById("scrollProgress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Active navigation link while scrolling
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Mouse-following ambient light
const ambientLight = document.querySelector(".ambient-light");

window.addEventListener("mousemove", (event) => {
  ambientLight.style.left = `${event.clientX}px`;
  ambientLight.style.top = `${event.clientY}px`;
});

const quotes = [
  {
    text: "Every master was once a beginner.",
    author: "— THE BEGINNING"
  },
  {
    text: "Mistakes are proof that you are trying.",
    author: "— GROWTH MINDSET"
  },
  {
    text: "Fall seven times, stand up eight.",
    author: "— NEVER GIVE UP"
  },
  {
    text: "Discipline beats motivation when motivation disappears.",
    author: "— DISCIPLINE"
  },
  {
    text: "Your future is created by what you do today.",
    author: "— CONSISTENCY"
  },
  {
    text: "Dream big. Start small. Act now.",
    author: "— ACTION"
  },
  {
    text: "Failure is not the opposite of success. It's part of success.",
    author: "— PERSPECTIVE"
  },
  {
    text: "Don't compare your chapter one with someone's chapter twenty.",
    author: "— YOUR JOURNEY"
  },
  {
    text: "Aaj ki mehnat, kal ki pehchaan banegi.",
    author: "— HINGLISH THOUGHT"
  },
  {
    text: "Girna failure nahi, girkar na uthna failure hai.",
    author: "— NEVER STOP"
  }
];

const quoteElement = document.getElementById("dynamicQuote");
const authorElement = document.getElementById("quoteAuthor");

let currentQuote = 0;

function changeQuote() {
  quoteElement.classList.add("fade-out");

  setTimeout(() => {
    currentQuote = (currentQuote + 1) % quotes.length;

    quoteElement.textContent = quotes[currentQuote].text;
    authorElement.textContent = quotes[currentQuote].author;

    quoteElement.classList.remove("fade-out");
    quoteElement.classList.add("fade-in");

    setTimeout(() => {
      quoteElement.classList.remove("fade-in");
    }, 500);

  }, 500);
}

// Change quote every 4 seconds
setInterval(changeQuote, 4000);