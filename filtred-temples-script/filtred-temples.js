// Footer year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Last modified
const lastModDate = new Date(document.lastModified);
const options = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
};
document.getElementById("lastModified").textContent =
  `Last Modified: ${lastModDate.toLocaleDateString("en-US", options)}`;

// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});