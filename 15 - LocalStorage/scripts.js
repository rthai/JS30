const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const buttons = document.querySelectorAll('.btn');

// try getting from localstorage
// if nothing there, fall back to empty array
let items = JSON.parse(localStorage.getItem('items')) || [];

var addItem = function(e) {
  // prevent page from refreshing
  e.preventDefault();
  // grab the input value
  const input = (this.querySelector('[name=item]')).value;
  const item = {
    input,
    done: false,
  }
  // clear form input
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items)) // key value storage only takes in strings
  this.reset(); 
};

var populateList = function(plates = [], platesList) {
  // loop over items
  // map as html
  // put into div
  platesList.innerHTML = plates.map((plate, i) => {
    var isChecked = plate.done ? 'checked' : '';
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${isChecked}/>
        <label for="item${i}">${plate.input}</label>
      </li>
    `  
  }).join('');
};

var toggleDone = function(e) {

  // check if target matches what we want
  if (!e.target.matches('input')) return;
  // find item that was checked and toggle done
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  // remember to save change to local storage
  localStorage.setItem('items', JSON.stringify(items)); 
  // re-render list
  populateList(items, itemsList);
};

var handleButtonClick = function(e) {
  const type = e.target.dataset.name;
  if (type === 'clear') {    
    clearAll();
  } else if (type === 'check-all') {
    checkAll();
  } else if (type === 'uncheck-all') {
    uncheckAll();
  }
  populateList(items, itemsList);
}

var clearAll = function() {
  items = [];
  localStorage.removeItem('items'); 
  populateList(items, itemsList);
}

var checkAll = function() {
  items.forEach(item => item.done === false ? item.done = true : '');
  localStorage.setItem('items', JSON.stringify(items)); 
}

var uncheckAll = function() {
  items.forEach(item => item.done === true ? item.done = false : '');
  localStorage.setItem('items', JSON.stringify(items)); 
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
buttons.forEach(button => button.addEventListener('click', handleButtonClick));

// on page load
populateList(items, itemsList);
