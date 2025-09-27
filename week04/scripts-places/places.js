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

// --- Weather static values ---
const tempC = 8;        
const windKmh = 12;

document.getElementById('temp').textContent = tempC;
document.getElementById('wind').textContent = windKmh;


const calculateWindChill = (t, v) =>
  13.12 + 0.6215*t - 11.37*Math.pow(v,0.16) + 0.3965*t*Math.pow(v,0.16);


let chill = "N/A";
if (tempC <= 10 && windKmh > 4.8){
  chill = `${Math.round(calculateWindChill(tempC, windKmh))} °C`;
}
document.getElementById('chill').textContent = chill;   