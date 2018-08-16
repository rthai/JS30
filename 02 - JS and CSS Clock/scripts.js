const secondHand = document.querySelector('.sec-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + 90;
  minuteHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hrs = now.getHours();
  const hrsDegress = ((hrs / 12) * 360) + 90;
  hourHand.style.transform = `rotate(${hrsDegress}deg)`;

  // handle 12 o'clock snap for all hands
  [secondHand, minuteHand, hourHand].forEach( element => element.style.transition = (seconds === 0) ? `none` : null);
}

setInterval(setDate, 1000);

setDate();
