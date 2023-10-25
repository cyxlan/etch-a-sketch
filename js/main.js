const gridContainer = document.querySelector('.grid-container');

// add 256 (16x16) grid squares to page
for (let i = 0; i < 256; i++) {
  let gridSquare = document.createElement('div');
  gridSquare.classList.add('grid-square');
  gridContainer.appendChild(gridSquare);
}