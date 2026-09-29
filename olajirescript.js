/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const isOpen = navLinks.classList.contains("active");

  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-label", "Open menu");

  });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".section-heading, .about-grid, .interest-strip, .experience-item, .project-card, .future-projects, .big-interest, .contact-grid"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});


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


/* =========================================================
   STAGGER PROJECT / EXPERIENCE ANIMATIONS
========================================================= */

const animatedGroups = [
  ".experience-item",
  ".project-card",
  ".big-interest"
];

animatedGroups.forEach((selector) => {

  const elements = document.querySelectorAll(selector);

  elements.forEach((element, index) => {

    element.style.transitionDelay = `${index * 80}ms`;

  });

});


/* =========================================================
   HERO MOUSE PARALLAX
========================================================= */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.matchMedia("(pointer: fine)").matches) {

  document.addEventListener("mousemove", (event) => {

    const x = (event.clientX / window.innerWidth - 0.5);
    const y = (event.clientY / window.innerHeight - 0.5);

    heroVisual.style.transform =
      `translateY(-50%) translate(${x * 15}px, ${y * 15}px)`;

  });

}


/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards = document.querySelectorAll(".project-card");

if (window.matchMedia("(pointer: fine)").matches) {

  projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -1.5;
      const rotateY = ((x - centerX) / centerX) * 1.5;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });

}


/* =========================================================
   YEAR
========================================================= */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================================================
   SMOOTH ANCHOR OFFSET
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

  anchor.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const navbarHeight = navbar.offsetHeight;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  });

});


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
  "%cESTHER • CODE. CREATE. COMPETE.",
  "color:#c7ff3d;font-size:18px;font-weight:bold;"
);

console.log(
  "%cWelcome to the code behind the portfolio.",
  "color:#a5aaa6;font-size:12px;"
);
