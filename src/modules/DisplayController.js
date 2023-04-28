const DisplayController = (() => {
  const cells = document.getElementsByClassName('cells');

  const renderBoard = (board, container) => {
    board.forEach((row, rowIndex) => {
      row.forEach((columnCell, columnIndex) => {
        container.innerHTML += `
            <div class="cells" data-index-number="${rowIndex}${columnIndex}">${columnCell}</div>
            `;
      });
    });
  };

  const styleCells = () => {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerText !== '') {
        cells[i].style.backgroundColor = 'blue';
      }
    }
  };

  return { renderBoard, styleCells };
})();

export default DisplayController;
