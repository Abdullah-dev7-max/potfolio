"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const brandImage = document.querySelector(".brand-image");
brandImage.addEventListener("load", () => {
  brandImage.hidden = false;
  document.querySelector(".brand-mark").hidden = true;
});
brandImage.addEventListener("error", () => brandImage.remove());
if (brandImage.complete && brandImage.naturalWidth > 0) {
  brandImage.hidden = false;
  document.querySelector(".brand-mark").hidden = true;
} else if (brandImage.complete) {
  brandImage.remove();
}

const heroPortrait = document.querySelector(".hero-portrait");
function useHeroFallback() {
  if (heroPortrait.dataset.fallback !== "true") {
    heroPortrait.dataset.fallback = "true";
    heroPortrait.src = "assets/images/hero-background.jpg";
    return;
  }

  heroPortrait.hidden = true;
}
heroPortrait.addEventListener("error", useHeroFallback);
if (heroPortrait.complete && heroPortrait.naturalWidth === 0) useHeroFallback();

document.querySelectorAll(".project-visual > img").forEach((image) => {
  image.addEventListener("load", () => image.parentElement.classList.add("has-image"));
  image.addEventListener("error", () => image.remove());
  if (image.complete && image.naturalWidth > 0) image.parentElement.classList.add("has-image");
  else if (image.complete) image.remove();
});

const introVideo = document.querySelector(".intro-video");
const videoPlaceholder = document.querySelector(".video-placeholder");
introVideo.addEventListener("loadeddata", () => {
  introVideo.hidden = false;
  videoPlaceholder.hidden = true;
});
introVideo.addEventListener("error", () => {
  introVideo.hidden = true;
  videoPlaceholder.hidden = false;
});
