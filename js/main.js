const root = document.querySelector(':root');
const gridContainer = document.querySelector('.grid-container');
const newGridBtn = document.querySelector('#new-grid');

function createGrid(size) {
  // set new grid square size
  root.style.setProperty('--square-size', `calc(600px / ${size})`);
  // add amount of grid square divs for given grid size
  for (let i = 0; i < size * size; i++) {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridContainer.appendChild(gridSquare);
  }
}

function colourSquaresOnHover(gridSquares, colour) {
  // when grid square is hovered, change background colour
  gridSquares.forEach((square) => {
    square.addEventListener('mouseenter', () => {
      square.style.backgroundColor = '#000';
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

createGrid(16);
let gridSquares = document.querySelectorAll('.grid-square');
colourSquaresOnHover(gridSquares, '#000');

let gridSize;
newGridBtn.addEventListener('click', () => {
  // remove existing grid squares
  gridContainer.replaceChildren();
  gridSize = getGridSize();
  createGrid(gridSize);
})