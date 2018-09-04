// listen to key events
// store what was pressed and if seq pressed matches do something to page

let pressed = []; // max length 11
let secretCode = 'abc123';

window.addEventListener('keyup', (e) => {
  pressed.push(e.key);
  
  // delete first el when pressed.length > secretCode.length
  // don't need to save giant array
  pressed.splice(0, pressed.length - secretCode.length); 
  if (pressed.join('').includes(secretCode)) {
    cornify_add();
  }
});
