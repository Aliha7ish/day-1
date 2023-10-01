"use strict";

const navLinks = document.querySelectorAll(".nav__link");
const nav = document.querySelector(".nav");
const sections = document.querySelectorAll("section");
const header = document.querySelector(".header");
const hero = document.querySelector(".section__hero");

//Smooth scrolling
nav.addEventListener("click", function (e) {
  e.preventDefault();
  const navLink = e.target;

  if (navLink.classList.contains("nav__link")) {
    sections.forEach((section) => {
      if (navLink.getAttribute("href") === "#") return;
      if (section.id === navLink.getAttribute("href").replace("#", "")) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

// sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const heroObsFunction = function (entries, heroObserver) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else nav.classList.remove("sticky");
  });
};
const heroObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const heroObserver = new IntersectionObserver(heroObsFunction, heroObsOptions);
heroObserver.observe(hero);

//menu animation
document.addEventListener("scroll", function () {
  sections.forEach((section) => {
    if (
      section.getBoundingClientRect().top <= 0 &&
      section.getBoundingClientRect().bottom > 0
    ) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const id = section.getAttribute("id");
      navLinks.forEach((link) => {
        link.getAttribute("href").replace("#", "") === id
          ? link.classList.add("active")
          : link.classList.remove("active");
      });
    }
  });
});
