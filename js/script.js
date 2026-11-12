"use strict";

document.documentElement.classList.add("js");

const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeIcon = document.querySelector(".theme-icon");
const menuButton = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-links a");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function applyTheme(theme) {
  root.dataset.theme = theme;
  const nextTheme = theme === "dark" ? "light" : "dark";
  themeButton.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  themeButton.title = `Switch to ${nextTheme} mode`;
  themeLabel.textContent = nextTheme === "light" ? "Light" : "Dark";
  themeIcon.textContent = nextTheme === "light" ? "☼" : "☾";
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#090909" : "#ffffff";
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("sjm-theme");
} catch (error) {
  console.warn("Theme preference could not be read from local storage.", error);
}
applyTheme(savedTheme === "light" ? "light" : "dark");

themeButton.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("sjm-theme", nextTheme);
  } catch (error) {
    console.warn("Theme preference could not be saved to local storage.", error);
  }
});

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navPanel.classList.toggle("is-open", isOpen);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const roles = ["Web Development", "Commerce Studies", "Creative Thinking", "Digital Ideas"];
const roleElement = document.querySelector(".rotating-role");
if (!reducedMotion) {
  let roleIndex = 0;
  window.setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleElement.textContent = roles[roleIndex];
  }, 2800);
}

const yearElement = document.querySelector("#current-year");
yearElement.textContent = String(new Date().getFullYear());

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) {
    formStatus.textContent = "Please check the highlighted fields and try again. No message has been sent.";
    return;
  }
  formStatus.textContent = "Your details are valid, but no message was sent. An email service is not connected to this form yet.";
});
