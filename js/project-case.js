const cursorDot = document.querySelector(".cursor-dot");
const mobileDockToggle = document.querySelector(".mobile-dock-toggle");
const socialSidebar = document.querySelector(".social-sidebar");

if (cursorDot && window.matchMedia("(pointer: fine)").matches) {
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
  });

  animateCursor();
}

if (mobileDockToggle && socialSidebar) {
  mobileDockToggle.addEventListener("click", () => {
    const isOpen = socialSidebar.classList.toggle("is-open");
    mobileDockToggle.classList.toggle("is-open", isOpen);
    mobileDockToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
