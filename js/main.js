const root = document.querySelector(':root');
const gridContainer = document.querySelector('.grid-container');
const newGridBtn = document.querySelector('#new-grid');
const randomColourBtn = document.querySelector('#random-colour');

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

function colourSquaresOnHover(gridSquares, colour) {
  // when grid square is hovered, change background colour
  gridSquares.forEach((square) => {
    square.addEventListener('mouseenter', () => {
      if (colour === 'random') {
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

let colour = '#000';
gridSquares = createGrid(16);
colourSquaresOnHover(gridSquares, colour);

let gridSize;
newGridBtn.addEventListener('click', () => {
  gridSize = getGridSize();
  // if user entered a size
  if (gridSize !== undefined) {
    // remove existing grid squares
    gridContainer.replaceChildren();
    gridSquares = createGrid(gridSize);
    colourSquaresOnHover(gridSquares, colour);
  }
})

randomColourBtn.addEventListener('click', () => {
  if (colour !== 'random') {
    randomColourBtn.textContent = 'Black';
    colour = 'random';
  }
  else {
    randomColourBtn.textContent = 'Random colour';
    colour = '#000';
  }
  colourSquaresOnHover(gridSquares, colour);
})