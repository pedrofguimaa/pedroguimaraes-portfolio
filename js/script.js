const reveals = document.querySelectorAll(".reveal");
const backToTopButton = document.querySelector(".back-to-top");
const typewriterTarget = document.querySelector("#typewriter-text");
const cursorDot = document.querySelector(".cursor-dot");
const mobileDockToggle = document.querySelector(".mobile-dock-toggle");
const socialSidebar = document.querySelector(".social-sidebar");
const magneticElements = document.querySelectorAll("[data-magnetic]");
const parallaxCard = document.querySelector("[data-parallax]");
const ambientElements = document.querySelectorAll(".ambient");
const motionPanels = document.querySelectorAll(".avatar-module, .project-card, .contact-panel, .skill-block");
const projectCarousel = document.querySelector("[data-project-carousel]");
const carouselDots = document.querySelectorAll("[data-carousel-dot]");

const typewriterText = "Interfaces com mentalidade de produto, não apenas código.";
let typeIndex = 0;
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
);

reveals.forEach((element) => revealObserver.observe(element));

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

const runTypewriter = () => {
  if (!typewriterTarget || typeIndex > typewriterText.length) return;
  typewriterTarget.textContent = typewriterText.slice(0, typeIndex);
  typeIndex += 1;
  setTimeout(runTypewriter, 42);
};

runTypewriter();

const toggleBackToTop = () => {
  backToTopButton.classList.toggle("is-visible", window.scrollY > 480);
};

window.addEventListener("scroll", toggleBackToTop, { passive: true });
toggleBackToTop();

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (window.matchMedia("(pointer: fine)").matches) {
  let dotX = window.innerWidth / 2;
  let dotY = window.innerHeight / 2;

  const animateCursor = () => {
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    requestAnimationFrame(animateCursor);
  };

  window.addEventListener("mousemove", (event) => {
    dotX = event.clientX;
    dotY = event.clientY;

    const xOffset = (event.clientX / window.innerWidth - 0.5) * 36;
    const yOffset = (event.clientY / window.innerHeight - 0.5) * 36;

    ambientElements.forEach((element, index) => {
      const factor = index === 0 ? 1 : -1;
      element.style.setProperty("--parallax-x", `${xOffset * factor}px`);
      element.style.setProperty("--parallax-y", `${yOffset * factor}px`);
    });

    if (parallaxCard) {
      parallaxCard.style.setProperty("--parallax-card-x", `${xOffset * 0.14}px`);
      parallaxCard.style.setProperty("--parallax-card-y", `${yOffset * 0.14}px`);
    }
  });

  animateCursor();
}

window.addEventListener(
  "scroll",
  () => {
    const scrollOffset = window.scrollY * 0.08;

    ambientElements.forEach((element, index) => {
      const direction = index === 0 ? 1 : -1;
      element.style.setProperty("--parallax-y", `${direction * scrollOffset}px`);
    });

    if (parallaxCard && window.matchMedia("(pointer: coarse)").matches) {
      parallaxCard.style.setProperty("--parallax-card-y", `${scrollOffset * -0.12}px`);
    }
  },
  { passive: true }
);

magneticElements.forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rect = element.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${offsetX * 0.08}px, ${offsetY * 0.08}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "";
  });
});

motionPanels.forEach((panel) => {
  panel.addEventListener("mousemove", (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rect = panel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = (event.clientX - centerX) / rect.width;
    const rotateX = (event.clientY - centerY) / rect.height;

    panel.style.transform = `perspective(1200px) rotateX(${rotateX * -4}deg) rotateY(${rotateY * 5}deg) translateY(-8px)`;
    panel.style.setProperty("--glow-x", `${(event.clientX - rect.left - rect.width / 2) * 0.22}px`);
    panel.style.setProperty("--glow-y", `${(event.clientY - rect.top - rect.height / 2) * 0.22}px`);
  });

  panel.addEventListener("mouseleave", () => {
    panel.style.transform = "";
    panel.style.removeProperty("--glow-x");
    panel.style.removeProperty("--glow-y");
  });
});

if (mobileDockToggle && socialSidebar) {
  mobileDockToggle.addEventListener("click", () => {
    const isOpen = socialSidebar.classList.toggle("is-open");
    mobileDockToggle.classList.toggle("is-open", isOpen);
    mobileDockToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (projectCarousel && carouselDots.length) {
  const slides = projectCarousel.querySelectorAll("img");
  let currentSlide = 0;

  const setSlide = (index) => {
    currentSlide = index;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    carouselDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  };

  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", () => setSlide(index));
  });

  setInterval(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    setSlide(nextSlide);
  }, 3200);
}
