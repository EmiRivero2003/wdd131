// === CART SYSTEM ===
const CART_KEY = "gz_cart";

// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

// Save cart and update counter
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  updateButtonStates();
}

// Update cart counter (top-right bubble)
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) {
    const cart = getCart();
    count.textContent = cart.length;
  }
}

// === ADD ITEM TO CART ===
function addToCart(item, isGame = false) {
  let cart = getCart();

  // Bloquear duplicados SOLO si es un juego
  if (isGame && cart.some((p) => p.id === item.id)) return;

  cart.push(item);
  setCart(cart);
}

// === HANDLE BUTTON CLICKS ===
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-cart, .js-add-to-cart");
  if (!btn) return;

  const card = btn.closest(".game-card, .product-card, [data-genre], [data-category]");
  const isGame = card?.classList.contains("game-card"); // <-- identifica si es juego

  // --- Datos del producto ---
  const id =
    btn.dataset.id ||
    card?.dataset.id ||
    card?.querySelector("[data-id]")?.dataset.id ||
    Math.random().toString(36).substring(2, 9);

  const name =
    btn.dataset.name ||
    card?.querySelector("h2, h3, .product-title")?.textContent?.trim() ||
    "Unknown Item";

  const price =
    btn.dataset.price ||
    card?.querySelector(".price")?.textContent?.trim() ||
    "$0.00";

  const img =
    btn.dataset.img ||
    card?.querySelector("img")?.src ||
    "images-gamer-zone/default.jpg";

  // --- Crear objeto del ítem ---
  const item = { id, name, price, img };

  addToCart(item, isGame);

  // Feedback visual
  btn.textContent = "✔ Added!";
  btn.disabled = true;
  btn.classList.add("added");

  setTimeout(() => btn.classList.remove("added"), 800);
});

// === UPDATE BUTTON STATES (PERSISTENT FEEDBACK) ===
function updateButtonStates() {
  const cart = getCart();
  const buttons = document.querySelectorAll(".add-cart, .js-add-to-cart");

  buttons.forEach((btn) => {
    const id = btn.dataset.id;
    const card = btn.closest(".game-card, .product-card");
    const isGame = card?.classList.contains("game-card");
    const inCart = cart.some((item) => item.id === id);

    if (isGame && inCart) {
      btn.textContent = "✔ Added!";
      btn.disabled = true;
    } else {
      btn.textContent = "Add to Cart";
      btn.disabled = false;
    }
  });
}

// === OPEN CART PAGE ===
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateButtonStates();

  const cartButton = document.getElementById("cart-btn");
  if (cartButton) {
    cartButton.addEventListener("click", () => {
      if (!window.location.pathname.includes("cart.html")) {
        window.location.href = "cart.html";
      }
    });
  }

  if (window.location.pathname.includes("cart.html")) {
    renderCartItems();
  }
});

// === RENDER CART ITEMS ON CART PAGE ===
function renderCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  if (!cartContainer) return;

  const cart = getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 😢</p>";
    if (totalDisplay) totalDisplay.textContent = "$0.00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    total += priceValue;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.setAttribute("data-id", item.id);

    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <p class="cart-item-title">${item.name}</p>
        <p class="cart-item-price">${item.price}</p>
      </div>
      <button class="remove-btn">Remove</button>
    `;

    cartContainer.appendChild(div);
  });

  if (totalDisplay) totalDisplay.textContent = `$${total.toFixed(2)}`;

  // === Remove items ===
  cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const itemDiv = e.target.closest(".cart-item");
      const id = itemDiv?.getAttribute("data-id");

      let cart = getCart();
      cart = cart.filter((product) => product.id !== id);
      setCart(cart);
      renderCartItems();
    }
  });
}

// === CONFIRM PURCHASE ===
document.addEventListener("click", (e) => {
  const confirmBtn = e.target.closest("#confirm-purchase");
  if (!confirmBtn) return;

  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty! 🛒");
    return;
  }

  // Redirigir al checkout
  window.location.href = "checkout.html";
});