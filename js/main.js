const gridContainer = document.querySelector('.grid-container');
const newGridBtn = document.querySelector('#new-grid');

// add 256 (16x16) grid squares to page
for (let i = 0; i < 256; i++) {
  let gridSquare = document.createElement('div');
  gridSquare.classList.add('grid-square');
  gridContainer.appendChild(gridSquare);
}

// when grid square is hovered, turn background black
const gridSquares = document.querySelectorAll('.grid-square');
gridSquares.forEach((square) => {
  square.addEventListener('mouseenter', () => {
    square.style.backgroundColor = '#000';
  })
})

let gridSize;
newGridBtn.addEventListener('click', () => {
  gridSize = prompt('Enter new grid size:');
})