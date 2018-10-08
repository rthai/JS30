let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const timer = function(seconds) {
  clearInterval(countdown);

  const now = Date.now(); // in milliseconds
  const later = now + (seconds * 1000); // convert to ms

  displayTimeLeft(seconds);
  displayEndTime(later);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((later - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

const displayTimeLeft = function(seconds) {
  const mins = Math.floor((seconds / 60));
  const remainingSecs = seconds % 60;
  const padded = remainingSecs < 10 ? '0' : '';
  const display = `${mins}:${padded}${remainingSecs}`;

  document.title = display;
  timerDisplay.textContent = display;
}

const displayEndTime = function(timeInMS) {
  const end = new Date(timeInMS);
  const hr = end.getHours();
  const adjustedHr = hr > 12 ? hr - 12 : hr;
  const mins = end.getMinutes();
  const padded = mins < 10 ? '0' : '';

  endTimeDisplay.textContent = `Be Back at ${adjustedHr}:${padded}${mins}`;
}

const startTimer = function() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  // conver mins to secs
  timer(mins * 60);
  this.reset();
});