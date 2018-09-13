const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// get access to webcam and pipe it to video player
var getVideo = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      // console.log(localMediaStream)
      // video.src = window.URL.createObjectURL(localMediaStream); // createObjectURL deprecated use srcObject
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => console.error(`Error!`, err));
}

// paint the video to the canvas
var paintToCanvas = () => {
  // video needs to be same size as canvas
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  
  // take a frame from video every 15ms
  return setInterval(() => { // return to have access to setInterval, in case you ever want to use clearlInterval
    ctx.drawImage(video, 0, 0, width, height) //start at top left hand corner, paint width and height

    // add filters: get pixels out of canvas, do stuff to them, then put them back in
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
   
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    pixels = greenScreen(pixels);

    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

var takePhoto = () => {
  // play sound
  snap.currentTime = 0;
  snap.play();

  // get data out of canvas
  const data = canvas.toDataURL('image/jpeg');
  // console.log(data);
  // convert base 64 textual representation of image into a url
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  // link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="Handsome Picture"/>`;
  strip.insertBefore(link, strip.firstChild);
}

var redEffect = (pixels) => {
  // loop through pixel data to mess with rgb channels
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
    pixels.data[i + 1] = pixels.data[i + 1] - 100; // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.2; // blue
    // i + 3 is alpha channel data
  }
  return pixels;
}

var rgbSplit = (pixels) => {
  // loop through pixel data to mess with rgb channels
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; 
    pixels.data[i + 100] = pixels.data[i + 1]; 
    pixels.data[i - 150] = pixels.data[i + 2]; 
  }
  return pixels;
}

var greenScreen = (pixels) => {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i+=4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
} 

getVideo();

// when the video is playing, then paint to canvas
video.addEventListener('canplay', paintToCanvas);
