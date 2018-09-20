const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition(data => {
  speed.textContent = data.coords.speed; // km units
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, err => {
  console.error(err);
});
