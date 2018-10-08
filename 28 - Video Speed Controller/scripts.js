const video = document.querySelector('.flex');
const speed = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');

var handleMove = function(e) {
  // record vertical position of where cursor is in speed div
  const y = e.pageY - this.offsetTop;
  // convert into percentage of the speed div
  const percent = y / this.offsetHeight; 
  const min = 0.4;
  const max = 2;
  const height = Math.round(percent *  100) + '%';
  const playbackRate = percent * (max - min) + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + 'x';
  video.playbackRate = playbackRate;
}

speed.addEventListener('mousemove', handleMove);
