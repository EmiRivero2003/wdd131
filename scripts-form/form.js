(function footerInfo() {
  const yearEl = document.getElementById('year') || document.getElementById('currentyear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastModel = document.getElementById('lastModified');
  if (lastModel) {
    const d = new Date(document.lastModified);
    const fmt = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
    lastModel.textContent = `Last Modified: ${fmt}`;
  }
})();

(function populateProducts() {
  const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
  ];
  const select = document.getElementById('productName');
  if (!select) return;

  [...select.querySelectorAll('option:not([disabled])')].forEach(o => o.remove());

  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    select.appendChild(opt);
  });
})();