import ShipController from './ShipController.js';

const DisplayController = (() => {
  const messageContainer = document.getElementById('message-container');
  const shipBtnsContainer = document.getElementById('ship-buttons-container');
  const humanPlayerCells =
    document.getElementsByClassName('human-player-cells');
  const playerContainer = document.getElementById('board-container-one');

  const renderGameBoard = (board, container, player) => {
    if (player === 'human-player') {
      // Attribute id's to the human player board as these are used for drag and drop
      board.forEach((row, rowIndex) => {
        row.forEach((columnCell, columnIndex) => {
          container.innerHTML += `
            <div class="${player}-cells" id="${rowIndex}${columnIndex}" data-index-number="${rowIndex}${columnIndex}">${columnCell}</div>
            `;
        });
      });
    } else {
      board.forEach((row, rowIndex) => {
        row.forEach((columnCell, columnIndex) => {
          container.innerHTML += `
            <div class="${player}-cells" data-index-number="${rowIndex}${columnIndex}">${columnCell}</div>
            `;
        });
      });
    }
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

  const getCurrentBoard = (board = []) => {
    // Nested for loop to create a game board as a 2d array
    for (let i = 0; i < 10; i += 1) {
      board[i] = [];
      for (let j = 0; j < 10; j += 1) {
        const cell = document.getElementById(`${i}${j}`);
        const cellContent = cell.textContent;
        if (cellContent === null) {
          board[i][j] = '';
        } else {
          board[i][j] = cellContent;
        }
      }
    }
    return board;
  };

  return {
    renderGameBoard,
    stylePlayerCells,
    styleAiCells,
    clearContainer,
    displayWinMessage,
    getCurrentBoard,
  };
})();

export default DisplayController;
