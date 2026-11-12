function initAnimations() {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const menuButton = document.querySelector(".menu-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const navLinks = document.querySelectorAll(".nav-links a");
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const roleElement = document.querySelector(".role-rotator");

  function setMenuOpen(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    navPanel.classList.toggle("is-open", isOpen);
  }

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });
  navLinks.forEach(link => link.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach(element => element.classList.add("is-visible"));
  }

  if (!reducedMotion) {
    const roles = ["Creative Developer", "Digital Explorer", "Technology Enthusiast", "Future Builder"];
    let roleIndex = 0;
    window.setInterval(() => {
      roleElement.classList.add("is-changing");
      window.setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleElement.textContent = roles[roleIndex];
        roleElement.classList.remove("is-changing");
      }, 200);
    }, 2600);
  }

  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");
    root.classList.add("has-custom-cursor");
    document.addEventListener("pointermove", event => {
      const position = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
      cursorDot.style.transform = position;
      cursorRing.style.transform = position;
    });
    document.querySelectorAll("a, button").forEach(element => {
      element.addEventListener("pointerenter", () => root.classList.add("cursor-hover"));
      element.addEventListener("pointerleave", () => root.classList.remove("cursor-hover"));
    });
  }

  if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".tilt-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 7}deg) translateZ(3px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
    document.querySelectorAll(".magnetic").forEach(button => {
      button.addEventListener("pointermove", event => {
        const bounds = button.getBoundingClientRect();
        button.style.setProperty("--mag-x", `${((event.clientX - bounds.left - bounds.width / 2) * 0.08).toFixed(1)}px`);
        button.style.setProperty("--mag-y", `${((event.clientY - bounds.top - bounds.height / 2) * 0.12).toFixed(1)}px`);
      });
      button.addEventListener("pointerleave", () => {
        button.style.setProperty("--mag-x", "0px");
        button.style.setProperty("--mag-y", "0px");
      });
    });
  }

  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) {
      formStatus.textContent = "Please correct the highlighted fields. Nothing has been sent.";
      return;
    }
    formStatus.textContent = "Your details look ready, but no message was sent. Connect an email service or backend to enable delivery.";
  });
}

export { initAnimations };
