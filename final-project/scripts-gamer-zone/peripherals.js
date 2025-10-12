// === PERIPHERAL DATA ===
const peripherals = [
  {
    id: "hx-cloud2",
    name: "HyperX Cloud II",
    category: "headset",
    price: 89.99,
    rating: 4.7,
    img: "images-gamer-zone/peripherals/hyperx.jpg",
    desc: "7.1 surround, noise-cancelling mic, total comfort."
  },
  {
    id: "rz-blackwidow-v3",
    name: "Razer BlackWidow V3",
    category: "keyboard",
    price: 129.99,
    rating: 4.6,
    img: "images-gamer-zone/peripherals/razer-blackwidow-v3.jpg",
    desc: "Mechanical RGB, precise switches, aluminum body."
  },
  {
    id: "lg-g502-hero",
    name: "Logitech G502 HERO",
    category: "mouse",
    price: 49.99,
    rating: 4.8,
    img: "images-gamer-zone/peripherals/logitech-g502-hero.jpg",
    desc: "HERO 25K sensor, adjustable weights, 11 programmable buttons."
  },
  {
    id: "xb-elite2",
    name: "Xbox Elite Series 2",
    category: "controller",
    price: 159.99,
    rating: 4.9,
    img: "images-gamer-zone/peripherals/xbox-elite-series-2.jpg",
    desc: "Adjustable triggers, pro profiles, long-lasting battery."
  }
];

// === LOCAL STORAGE (Wishlist) ===
const LS_KEY = "gz_wishlist";
const getWishlist = () => JSON.parse(localStorage.getItem(LS_KEY) || "[]");
const setWishlist = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

// === PRICE FORMATTER ===
function formatPrice(n) {
  return `$${n.toFixed(2)}`;
}

// === MAIN RENDER ===
function renderPeripherals(list) {
  const grid = document.querySelector(".peripheral-grid");
  if (!grid) return;

  grid.innerHTML = list.map(p => {
    const inWish = getWishlist().includes(p.id);
    return `
      <article class="peripheral-card" data-id="${p.id}" data-category="${p.category}">
        <span class="category">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <h2>${p.name}</h2>
        <p>${p.desc}</p>
        <p class="price">${formatPrice(p.price)} <span class="rating">★ ${p.rating}</span></p>
        <div class="card-actions">
          <button class="btn add-cart" type="button">Add to Cart</button>
          <button class="btn wish ${inWish ? "active" : ""}" type="button">
            ${inWish ? "★ In Wishlist" : "☆ Wishlist"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  updateWishlistCount();
}

// === WISHLIST HANDLING ===
function toggleWishlist(id) {
  const wish = getWishlist();
  const idx = wish.indexOf(id);
  if (idx >= 0) {
    wish.splice(idx, 1);
  } else {
    wish.push(id);
  }
  setWishlist(wish);
  updateWishlistCount();
}

function updateWishlistCount() {
  const badge = document.getElementById("wishlistCount");
  if (badge) badge.textContent = getWishlist().length;
}

// === FILTERS ===
function applyFilter(category) {
  const filtered = category === "all"
    ? peripherals
    : peripherals.filter(p => p.category === category);

  renderPeripherals(filtered);
}

// === EVENT BINDING ===
function bindEvents() {
  // Category filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      applyFilter(button.dataset.category);
    });
  });

  // Wishlist & Cart buttons
  const grid = document.querySelector(".peripheral-grid");
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".peripheral-card");
    if (!card) return;
    const id = card.dataset.id;

    // Wishlist toggle
    if (e.target.closest(".wish")) {
      toggleWishlist(id);
      const btn = e.target.closest(".wish");
      const active = getWishlist().includes(id);
      btn.classList.toggle("active", active);
      btn.textContent = active ? "★ In Wishlist" : "☆ Wishlist";
    }

    // Add to cart (visual feedback only)
    if (e.target.closest(".add-cart")) {
      const btn = e.target.closest(".add-cart");
      btn.textContent = "✔ Added!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.disabled = false;
      }, 1000);
    }
  });
}

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  renderPeripherals(peripherals);
  bindEvents();
});