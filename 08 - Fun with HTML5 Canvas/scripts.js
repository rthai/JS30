const canvas = document.querySelector('#draw');

// draw on context in 2d (can also be in 3d), not directly on canvas
const ctx = canvas.getContext('2d');

// resize canvas to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// set context base settings
ctx.strokeStyle = '#C0D3C5'
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 25;

let isDrawing = false;

let lastX = 0;
let lastY = 0;

let hue = 0;
let direction = true;

var draw = function(e) {
  if (!isDrawing) return;
  
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; 
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // rainbow brush
  hue++;
  if (hue > 360) {
    hue = 0;
  }

  // changes thickness of brush
  if (ctx.lineWidth > 40 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }  
}

// add event listeners
// when mouse is clicked
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
})

// when mouse is dragged
canvas.addEventListener('mousemove', draw);

// when mouse is released
canvas.addEventListener('mouseup', () => isDrawing = false);

// when mouse leaves the page
canvas.addEventListener('mouseout', () => isDrawing = false);
