const yearEl = document.getElementById("currentyear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lmEl = document.getElementById("lastModified");
if (lmEl) {
  const lastModDate = new Date(document.lastModified);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };
  lmEl.textContent = `Last Modified: ${lastModDate.toLocaleString("en-US", options)}`;
}

const btn = document.getElementById("hamburger");
const nav = document.getElementById("primary-nav");

if (btn && nav) {
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.textContent = isOpen ? "✕" : "☰";
  });
}