const root = document.querySelector(':root');
const gridContainer = document.querySelector('.grid-container');
const colourPicker = document.querySelector('#colour-picker');
const colourPickerSwatch = document.querySelector('#colour-picker-swatch');
const clearGridBtn = document.querySelector('#clear-grid');
const gridLinesBtn = document.querySelector('#grid-lines');
const eraserBtn = document.querySelector('#eraser');
const randomColourBtn = document.querySelector('#random-colour');
const translucentBtn = document.querySelector('#translucent');
const newGridBtn = document.querySelector('#new-grid');
const slider = document.querySelector('#grid-size-slider')
const gridSizeLabel = document.querySelector('.slider-container label');
const toggleableBtns = [gridLinesBtn, eraserBtn, randomColourBtn, translucentBtn];

function createGrid(size) {
  // set new grid square size
  root.style.setProperty('--grid-template', `repeat(${size}, 1fr) / repeat(${size}, 1fr)`);
  // add amount of grid square divs for given grid size
  for (let i = 0; i < size * size; i++) {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    if (linesOn) {
      gridSquare.classList.add('grid-lines');
    }
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
  else if (randomOn) {
    newSquareColour = getRandomColour();
  }
  else {
    newSquareColour = colour;
  }
  if (translucentOn) {
    let currentSquareColour = square.style.backgroundColor;
    // if the current square has not been coloured yet
    if (currentSquareColour === '') {
      // start the opacity at 10%
      newSquareColour = changeOpacity(newSquareColour, 0.1);
    }
    else {
      let currentOpacity = getOpacity(currentSquareColour);
      if (eraserOn) {
        // decrease the opacity by 10% (round to avoid decimal math issues)
        let newOpacity = (currentOpacity - 0.1).toFixed(1)
        newSquareColour = changeOpacity(currentSquareColour, newOpacity);
      }
      else if (currentOpacity !== 1.0) {
        // increase the opacity by 10% (round to avoid decimal math issues)
        let newOpacity = (currentOpacity + 0.1).toFixed(1)
        newSquareColour = changeOpacity(newSquareColour, newOpacity);
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

function getRandomColour() {
  // get a random integer between 0-255
  function getRandomValue() {
    return Math.floor(Math.random() * 256);
  }
  // return a randomly generated rgb colour
  return `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;
}

// convert rgb/rgba colour to rgba colour with given opacity
function changeOpacity(colour, opacity) {
  if (colour.slice(0, 4) === 'rgba') {
    // replace rgba opacity value (after last comma)
    let lastComma = colour.lastIndexOf(',');
    return `${colour.slice(0, lastComma)},${opacity})`;
  }
  else {
    return `rgba${colour.slice(3, -1)},${opacity})`;
  }
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

function hexToRgb(hex) {
  // split into 3
  let splitHex = hex.match(/[a-f\d]{2}/gi);
  // convert to rgb values
  let r = parseInt(splitHex[0], 16);
  let g = parseInt(splitHex[1], 16);
  let b = parseInt(splitHex[2], 16);
  return `rgb(${r},${g},${b})`;
}

let colour = 'rgb(0,0,0)';
let linesOn = true;
let eraserOn = false;
let randomOn = false;
let translucentOn = false;
let gridSize = 16;
gridSquares = createGrid(gridSize);
colourSquaresOnHover();

// when colour picker is closed, update colour
colourPicker.addEventListener('change', () => {
  colour = hexToRgb(colourPicker.value);
  colourPickerSwatch.style.backgroundColor = colour;
})

clearGridBtn.addEventListener('click', () => {
  gridSquares.forEach((square) => {
    square.style.backgroundColor = "";
  })
})

gridLinesBtn.addEventListener('click', () => {
  gridSquares.forEach((square) => {
    square.classList.toggle('grid-lines');
  })
  linesOn = !linesOn;
})

eraserBtn.addEventListener('click', () => {
  eraserOn = !eraserOn;
})

randomColourBtn.addEventListener('click', () => {
  randomOn = !randomOn;
  colourSquaresOnHover();
})

translucentBtn.addEventListener('click', () => {
  translucentOn = !translucentOn;
  colourSquaresOnHover();
})

// when toggleable button (grid lines, eraser, random colour, translucent) is clicked, toggle active state
toggleableBtns.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  })
})

// when slider is changed, update grid size & label under slider
slider.addEventListener("input", (e) => {
  gridSize = e.target.value;
  gridSizeLabel.textContent = gridSize + " x " + gridSize;
});

newGridBtn.addEventListener('click', () => {
  // remove existing grid squares
  gridContainer.replaceChildren();
  gridSquares = createGrid(gridSize);
  colourSquaresOnHover();
})