const gridContainer = document.querySelector('.grid-container');

// add 16 grid squares to page
for (let i = 0; i < 16; i++) {
  let gridSquare = document.createElement('div');
  gridSquare.classList.add('grid-square');
  gridContainer.appendChild(gridSquare);
}