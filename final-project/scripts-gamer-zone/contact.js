const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill out all fields!");
    return;
  }

  alert(`Thanks for reaching out, ${name}! We'll get back to you soon 🎮`);
  form.reset();
});

// === HAMBURGER MENU FUNCTIONALITY ===
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});