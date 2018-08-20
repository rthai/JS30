const inputs = document.querySelectorAll('.controls input'); // nodelist

var handleInputChange = function() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}

inputs.forEach( input => input.addEventListener('change', handleInputChange));
inputs.forEach( input => input.addEventListener('mousemove', handleInputChange));
