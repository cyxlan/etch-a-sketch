const root = document.querySelector(':root');
const gridContainer = document.querySelector('.grid-container');
const newGridBtn = document.querySelector('#new-grid');
const randomColourBtn = document.querySelector('#random-colour');
const opacityBtn = document.querySelector('#opacity');

function createGrid(size) {
  // set new grid square size
  root.style.setProperty('--square-size', `calc(600px / ${size})`);
  // add amount of grid square divs for given grid size
  for (let i = 0; i < size * size; i++) {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridContainer.appendChild(gridSquare);
  }
  // return list of new grid squares
  return document.querySelectorAll(".grid-square");
}

function colourSquaresOnHover(gridSquares, colour, randomOn) {
  // when grid square is hovered, change background colour
  gridSquares.forEach((square) => {
    square.addEventListener('mouseenter', () => {
      if (randomOn) {
        square.style.backgroundColor = getRandomColour();
      }
      else {
        square.style.backgroundColor = colour;
      }
    })
  })
}

function getGridSize() {
  gridSize = prompt('Enter side length of new grid (1-100):');
  // if user clicked cancel, end function
  if (gridSize === null) {
    return;
  }
  else {
    gridSize = Number(gridSize);
    // if value is not an integer or not between 1-100, alert user & prompt again
    if (!Number.isInteger(gridSize) || !(gridSize > 0 && gridSize <= 100)) {
      alert("Please enter an integer from 1-100.")
      gridSize = getGridSize();
    }
  }
  return gridSize;
}

function getRandomColour() {
  // get a random integer between 0-255
  function getRandomValue() {
    return Math.floor(Math.random() * 256);
  }
  // return a randomly generated rgb colour
  return `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;
}

// convert rgb colour to rgba colour with given opacity
function changeOpacity(rgb, opacity) {
  return `rgba${rgb.slice(3, -1)},${opacity})`;
}
// get opacity value of rgb/rgba colour
function getOpacity(colour) {
  if (colour.slice(0, 4) === 'rgba') {
    // slice out rgba opacity value (between last comma & closing parentheses)
    let lastComma = colour.lastIndexOf(',');
    return colour.slice(lastComma+1, -1);
  }
  else {
    return 1;
  }
}

let colour = '#000';
let randomOn = false;
gridSquares = createGrid(16);
colourSquaresOnHover(gridSquares, colour, randomOn);

let gridSize;
newGridBtn.addEventListener('click', () => {
  gridSize = getGridSize();
  // if user entered a size
  if (gridSize !== undefined) {
    // remove existing grid squares
    gridContainer.replaceChildren();
    gridSquares = createGrid(gridSize);
    colourSquaresOnHover(gridSquares, colour, randomOn);
  }
})

randomColourBtn.addEventListener('click', () => {
  if (!randomOn) {
    randomColourBtn.textContent = 'Random colour off';
    randomOn = true;
  }
  else {
    randomColourBtn.textContent = 'Random colour';
    randomOn = false;
  }
  colourSquaresOnHover(gridSquares, colour, randomOn);
})

opacityBtn.addEventListener('click', () => {

})