const bar = document.querySelector('#bar');
const hamburger = document.querySelector('#hamburger');

hamburger.addEventListener('click', () => {
  bar.classList.toggle('active');
  hamburger.classList.toggle('active');
});