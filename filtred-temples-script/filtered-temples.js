// ===== DATA =====
const temples = [
  { templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
  { templeName: "Manti Utah", location: "Manti, Utah, United States", dedicated: "1888, May, 21", area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg" },
  { templeName: "Payson Utah", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x250/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
  { templeName: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" },
  { templeName: "Washington D.C.", location: "Kensington, Maryland, United States", dedicated: "1974, November, 19", area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg" },
  { templeName: "Lima Perú", location: "Lima, Perú", dedicated: "1986, January, 10", area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg" },
  { templeName: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983, December, 2", area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg" },
  { templeName: "Montevideo Uruguay", location: "Montevideo, Uruguay", dedicated: "2001, March, 18", area: 69260,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/montevideo-uruguay/400x250/montevideo-uruguay-temple-lds-83476-wallpaper.jpg" },
  { templeName: "Rome Italy", location: "Rome, Italy", dedicated: "2019, March, 10", area: 631620,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/5-Rome-Temple-2160345.jpg" },
  { templeName: "Campinas Brazil", location: "Campinas, Brazil", dedicated: "2002, May, 17", area: 269201,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/campinas-brazil/400x250/campinas-brazil-temple-1030031-wallpaper.jpg" },
];

// ===== SELECTORES CORRECTOS =====
const gallery   = document.querySelector(".gallery");
const nav       = document.getElementById("primary-nav");   // <-- con # o getElementById
const hamburger = document.getElementById("hamburger");     // <-- sin punto

// ===== HELPERS / RENDER =====
const getYear = (dedicatedStr) => parseInt(dedicatedStr.split(",")[0], 10);

function createCard(t) {
  const card = document.createElement("article");
  card.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = t.templeName;

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.innerHTML = `
    <b>Location:</b> ${t.location}<br>
    <b>Dedicated:</b> ${t.dedicated}<br>
    <b>Size:</b> ${t.area.toLocaleString()} sq ft
  `;

  const img = document.createElement("img");
  img.src = t.imageUrl;
  img.alt = `${t.templeName} Temple`;
  img.loading = "lazy";

  card.append(h2, meta, img);
  return card;
}

function render(list) {
  gallery.innerHTML = "";
  list.forEach((t) => gallery.appendChild(createCard(t)));
}

// ===== FILTROS =====
const filters = {
  home:  () => temples,
  old:   () => temples.filter((t) => getYear(t.dedicated) < 1900),
  new:   () => temples.filter((t) => getYear(t.dedicated) >= 2000),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000),
};

// ===== NAV CLICKS =====
nav.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  e.preventDefault();

  nav.querySelectorAll("a").forEach((x) => x.classList.remove("active"));
  a.classList.add("active");

  const label = a.textContent.trim().toLowerCase();
  const key = ({home:"home", old:"old", new:"new", large:"large", small:"small"})[label] || "home";
  render(filters[key]());

  // cerrar menú mobile
  hamburger.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
});

// ===== HAMBURGER (después de definir hamburger) =====
hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("open");
});

// ===== FOOTER =====
document.getElementById("currentyear").textContent = new Date().getFullYear(); // id en minúscula
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// ===== INIT =====
render(temples);