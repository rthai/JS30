const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const clock = document.querySelector('.timer');
let lastHole;
let timeUp = false;
let score = 0;
let gameTime = 10000; // in ms

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (lastHole === hole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function randomTime(start, end) { // in ms
  return Math.round(Math.random() * (end - start) + start);
}

function peep() {
  const time = randomTime(300, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function bonk(e) {
  if (!e.isTrusted) return; // if isTrusted is false, fake click
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  timer(gameTime);
  peep();
  setTimeout(() => timeUp = true, gameTime);
}

let countdown;
function timer(gameTime) {
  clearInterval(countdown);
  let secs = Math.round(gameTime / 1000);
  displayTimeLeft(secs);
  countdown = setInterval(() => {
    secs--;
    if (secs < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secs);
  }, 1000);
}

function displayTimeLeft(m) {
  const padding = m < 10 ? '0' : '';
  clock.textContent = `:${padding}${m}`;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
