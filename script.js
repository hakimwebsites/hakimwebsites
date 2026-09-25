/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu after clicking a navigation link
  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* =========================================
   FAQ ACCORDION
========================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {

    const isActive = item.classList.contains("active");

    // Close every other FAQ
    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");

      const otherAnswer = otherItem.querySelector(".faq-answer");

      if (otherAnswer) {
        otherAnswer.style.maxHeight = null;
      }
    });

    // Open selected FAQ
    if (!isActive) {
      item.classList.add("active");

      answer.style.maxHeight = answer.scrollHeight + "px";
    }

  });
});


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
  ".project-card, .service-card, .process-card, .benefit, .why-item"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
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
  revealObserver.observe(element);
});


/* =========================================
   SMOOTH HEADER BEHAVIOUR
========================================= */

const header = document.querySelector(".header");

let lastScroll = 0;

window.addEventListener(
  "scroll",
  () => {

    const currentScroll = window.scrollY;

    if (!header) return;

    if (currentScroll > 30) {
      header.style.background = "rgba(8, 9, 12, 0.94)";
    } else {
      header.style.background = "rgba(8, 9, 12, 0.82)";
    }

    lastScroll = currentScroll;

  },
  { passive: true }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    if (nav) {
      nav.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }

  }

});