const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

const walk = 100; // 100px

var shadow = function(e) {
  // get width and height of what was hovered over
  const { offsetWidth: width, offsetHeight: height} = hero;
  // get info of where the cursor is
  let { offsetX: x, offsetY: y } = e;
  
  // modify x and y values when hover ofer h1 bc x,y are recalcuated
  if (this !== e.target) {
    x = x + e.target.offsetLeft; 
    y = y + e.target.offsetTop;
  }
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255, 255, 0, 0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(255, 0, 0, 0.7),
    ${xWalk}px ${yWalk * -1}px 0 rgba(255, 0, 255, 0.7),
    ${yWalk}px ${xWalk}px 0 rgba(0, 0, 255, 0.7)
    `;
}

hero.addEventListener('mousemove', shadow);
