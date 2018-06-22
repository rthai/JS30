var playSound = function(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!audio) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
};

var removeTransition = function(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = Array.from(document.querySelectorAll('.key')); //gives you a nodelist that looks like an array
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
