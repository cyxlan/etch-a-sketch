const root = document.querySelector(':root');
const gridContainer = document.querySelector('.grid-container');
const newGridBtn = document.querySelector('#new-grid');
const clearGridBtn = document.querySelector('#clear-grid');
const eraserBtn = document.querySelector('#eraser');
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

function colourSquare(e) {
  let square = e.currentTarget;
  if (eraserOn) {
    newSquareColour = '';
  }
  else {
    if (randomOn) {
      newSquareColour = getRandomColour();
    }
    else {
      newSquareColour = colour;
    }
    if (opacityOn) {
      let currentSquareColour = square.style.backgroundColor;
      // if the current square has not been coloured yet
      if (currentSquareColour === '') {
        // start the opacity at 10%
        newSquareColour = changeOpacity(newSquareColour, 0.1);
      }
      else {
        let currentOpacity = getOpacity(currentSquareColour);
        if (currentOpacity !== 1.0) {
          // increase the opacity by 10% (round to avoid decimal math issues)
          let newOpacity = (currentOpacity + 0.1).toFixed(1)
          newSquareColour = changeOpacity(newSquareColour, newOpacity);
        }
      }
    }
  }
  square.style.backgroundColor = newSquareColour;
}

function colourSquaresOnHover() {
  // when grid square is hovered, change background colour
  gridSquares.forEach((square) => {
    // remove existing settings first
    square.removeEventListener('mouseenter', colourSquare);
    square.addEventListener('mouseenter', colourSquare);
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
    return Number(colour.slice(lastComma+1, -1));
  }
  else {
    return 1;
  }
}

let colour = 'rgb(0,0,0)';
let eraserOn = false;
let randomOn = false;
let opacityOn = false;
let gridSize = 16;
gridSquares = createGrid(gridSize);
colourSquaresOnHover();

newGridBtn.addEventListener('click', () => {
  gridSize = getGridSize();
  // if user entered a size
  if (gridSize !== undefined) {
    // remove existing grid squares
    gridContainer.replaceChildren();
    gridSquares = createGrid(gridSize);
    colourSquaresOnHover();
  }
})

clearGridBtn.addEventListener('click', () => {
  gridSquares.forEach((square) => {
    square.style.backgroundColor = "";
  })
})

eraserBtn.addEventListener('click', () => {
  if (!eraserOn) {
    eraserBtn.textContent = 'Pen';
    eraserOn = true;
  }
  else {
    eraserBtn.textContent = 'Eraser';
    eraserOn = false;
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
  colourSquaresOnHover();
})

opacityBtn.addEventListener('click', () => {
  if (!opacityOn) {
    opacityBtn.textContent = 'Opacity off';
    opacityOn = true;
  }
  else {
    opacityBtn.textContent = 'Opacity'
    opacityOn = false;
  }
  colourSquaresOnHover();
})