document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");
  const cart = JSON.parse(localStorage.getItem("gz_cart") || "[]");

  if (!cart.length) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "$0.00";
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    const price = parseFloat(item.price.replace("$", "")) || 0;
    total += price;
    return `
      <div class="checkout-item">
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>
      </div>
    `;
  }).join("");

  totalEl.textContent = `$${total.toFixed(2)}`;

  document.getElementById("complete-purchase").addEventListener("click", () => {
    alert("✅ Purchase completed successfully!");
    localStorage.removeItem("gz_cart");
    window.location.href = "index.html";
  });
});