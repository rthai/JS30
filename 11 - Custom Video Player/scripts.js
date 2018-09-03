/* get elements */
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');

const skipButtons = document.querySelectorAll('[data-skip]');

const sliders = document.querySelectorAll('.player__slider');

const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

const fullscreen = document.querySelector('.fullscreen');

/* build out functions */
var togglePlay = function() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

var updatePlayButton = function() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon; 
};

var skip = function() {
  video.currentTime += parseFloat(this.dataset.skip);
}

var updateRange = function() {
  video[this.name] = this.value;  
};

var handleProgress = function() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

var scrub = function(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

var toggleFullscreen = function() {

};

/* hook up event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

sliders.forEach(slider => slider.addEventListener('change', updateRange));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// TODO: fullscreen button mode
fullscreen.addEventListener('click', toggleFullscreen);