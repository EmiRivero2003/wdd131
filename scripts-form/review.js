(function footerInfo() {
  const yearEl = document.getElementById('year') || document.getElementById('currentyear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lastModel = document.getElementById('lastModified');
  if (lastModel) {
    const d = new Date(document.lastModified);
    const fmt = new Intl.DateTimeFormat('en-US', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(d);
    lastModel.textContent = `Last Modified: ${fmt}`;
  }
})();

(function reviewCounter() {
  const KEY = 'reviewCount';
  const prev = Number(localStorage.getItem(KEY)) || 0;
  const next = prev + 1;
  localStorage.setItem(KEY, String(next));

  const p = document.createElement('p');
  p.innerHTML = `<strong>Total reviews (this browser):</strong> ${next}`;
  const main = document.querySelector('main');
  if (main) main.appendChild(p);
})();

(function showParams() {
  const params = new URLSearchParams(location.search);
  const bag = {};
  for (const [k, v] of params.entries()) {
    if (bag[k]) {
      if (Array.isArray(bag[k])) bag[k].push(v);
      else bag[k] = [bag[k], v];
    } else bag[k] = v;
  }

  const dl = document.getElementById('output');
  if (!dl) return;

  Object.entries(bag).forEach(([k, v]) => {
    const dt = document.createElement('dt');
    dt.textContent = k;
    const dd = document.createElement('dd');
    dd.textContent = Array.isArray(v) ? v.join(', ') : v;
    dl.append(dt, dd);
  });
})();