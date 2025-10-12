// === FILTER BUTTONS & GAME CARDS ===
const filterButtons = document.querySelectorAll(".filter-btn");
const gameCards = document.querySelectorAll(".game-card");

// --- FILTER LOGIC ---
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Active state management
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const genre = button.getAttribute("data-genre");

    gameCards.forEach(card => {
      if (genre === "all" || card.dataset.genre === genre) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.4s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// === WISHLIST & CART INTERACTIONS ===
const wishlistButtons = document.querySelectorAll(".btn.wish");
const cartButtons = document.querySelectorAll(".btn.add-cart");

// Wishlist toggle
wishlistButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    btn.textContent = btn.classList.contains("active") ? "★ In Wishlist" : "☆ Wishlist";
  });
});

// Add to Cart feedback
cartButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.textContent = "✔ Added!";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.disabled = false;
    }, 1000);
  });
});

// === SMOOTH FADE-IN ANIMATION ===
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);

// === HAMBURGER MENU FUNCTIONALITY ===
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});