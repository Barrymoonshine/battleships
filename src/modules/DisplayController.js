const DisplayController = (() => {
  const renderBoard = (board, container) => {
    board.forEach((row, rowIndex) => {
      row.forEach((columnCell, columnIndex) => {
        container.innerHTML += `
            <div class="cells" data-index-number="${rowIndex}${columnIndex}">${columnCell}</div>
            `;
      });
    });
  };

  return { renderBoard };
})();

export default DisplayController;
