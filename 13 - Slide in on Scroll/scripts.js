function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const images = document.querySelectorAll('.slide-in');

var checkSlide = function() {
  // go through each image
  // find out when the window is scrolled halfway through an image
  // find out when the window is scrolled to the bottom of an image
  // add active class when halfway through image
  images.forEach(image => {
    // scrollY = position from top of window
    // pixel level at the bottom of the window    
    const halfway = (window.scrollY + window.innerHeight) - image.height / 2;
    // offsetTop = distance from top of image to top of window
    const imgBottom = image.offsetTop + image.height;
    const isHalfway = halfway > image.offsetTop;
    const isNotScrolledPast = window.scrollY < imgBottom;

    if (isHalfway && isNotScrolledPast) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }

  });
}

window.addEventListener('scroll', debounce(checkSlide));