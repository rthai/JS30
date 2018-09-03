const inputs = document.querySelectorAll('input[type="checkbox"]');

let lastChecked;

var handleCheck = function(e) {
  let inBetween = false;

  if (e.shiftKey && this.checked) {
    inputs.forEach(input => {      
      if (input === this || input === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {        
        input.checked = true;
      }
    })
  }
  lastChecked = this;
}

inputs.forEach(input => input.addEventListener('click', handleCheck));
