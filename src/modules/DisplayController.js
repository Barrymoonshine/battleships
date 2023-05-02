const DisplayController = (() => {
  const messageContainer = document.getElementById('message-container');

  const renderSetUpBoard = (board, container, player) => {
    board.forEach((row, rowIndex) => {
      row.forEach((columnCell, columnIndex) => {
        if (columnCell !== '') {
          // If the cell contains a ship, add a second class and make element draggable
          container.innerHTML += `
          <div class="${player}-cells ${player}-${columnCell}" draggable="true" data-index-number="${rowIndex}${columnIndex}">${columnCell}</div>
          `;
        } else {
          container.innerHTML += `
            <div class="${player}-cells" data-index-number="${rowIndex}${columnIndex}">${columnCell}</div>
            `;
        }
      });
    });
  };

  const renderGameBoard = (board, container, player) => {
    board.forEach((row, rowIndex) => {
      row.forEach((columnCell, columnIndex) => {
        container.innerHTML += `
            <div class="${player}-cells" data-index-number="${rowIndex}${columnIndex}">${columnCell}</div>
            `;
      });
    });
  };

  const stylePlayerCells = (cells) => {
    for (let i = 0; i < cells.length; i += 1) {
      // if hit
      if (cells[i].innerText === 'H') {
        cells[i].style.backgroundColor = 'red';
      }
      // if miss
      else if (cells[i].innerText === 'M') {
        cells[i].style.backgroundColor = 'orange';
      }
      // if ship present
      else if (cells[i].innerText !== '') {
        cells[i].style.backgroundColor = 'blue';
      }
    }
  };

  // Update function later so that AI cells are obscured from view
  // Other than hits and misses
  const styleAiCells = (cells) => {
    for (let i = 0; i < cells.length; i += 1) {
      // if hit
      if (cells[i].innerText === 'H') {
        cells[i].style.backgroundColor = 'red';
      }
      // if miss
      else if (cells[i].innerText === 'M') {
        cells[i].style.backgroundColor = 'orange';
      }
      // if ship present
      else if (cells[i].innerText !== '') {
        cells[i].style.backgroundColor = 'blue';
      }
    }
  };

  const clearContainer = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  const displayWinMessage = (currentPlayer) => {
    messageContainer.innerText = `
    ${currentPlayer.name} is the winner! Play again?`;
  };

  const dragStart = (e) => {
    console.log('drag starts...');
  };

  const addDragDropListeners = () => {
    const playerCarrierCells = document.getElementsByClassName(
      'human-player-carrier'
    );
    for (let i = 0; i < playerCarrierCells.length; i += 1) {
      playerCarrierCells[i].addEventListener('dragstart', dragStart);
    }
  };

  return {
    renderSetUpBoard,
    renderGameBoard,
    stylePlayerCells,
    styleAiCells,
    clearContainer,
    displayWinMessage,
    addDragDropListeners,
  };
})();

export default DisplayController;
