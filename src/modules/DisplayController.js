import ShipController from './ShipController.js';

const DisplayController = (() => {
  const messageContainer = document.getElementById('message-container');
  const shipPlacementContainer = document.getElementsByClassName(
    'ship-placement-container'
  )[0];
  const carrier = document.getElementById('carrier');
  const battleship = document.getElementById('battleship');
  const destroyer = document.getElementById('destroyer');
  const submarine = document.getElementById('submarine');
  const patrolBoat = document.getElementById('patrol-boat');

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

  const toggleRotateShips = (horizontal) => {
    if (horizontal) {
      carrier.style.gridTemplateColumns = '30px';
      carrier.style.gridTemplateRows = 'repeat(5, 30px)';
      carrier.style.width = '30px';
      battleship.style.gridTemplateColumns = '30px';
      battleship.style.gridTemplateRows = 'repeat(4, 30px)';
      battleship.style.width = '30px';
      destroyer.style.gridTemplateColumns = '30px';
      destroyer.style.gridTemplateRows = 'repeat(3, 30px)';
      destroyer.style.width = '30px';
      submarine.style.gridTemplateColumns = '30px';
      submarine.style.gridTemplateRows = 'repeat(3, 30px)';
      submarine.style.width = '30px';
      patrolBoat.style.gridTemplateColumns = '30px';
      patrolBoat.style.gridTemplateRows = 'repeat(2, 30px)';
      patrolBoat.style.width = '30px';
      shipPlacementContainer.style.flexDirection = 'row';
    } else {
      carrier.style.gridTemplateColumns = 'repeat(5, 30px)';
      carrier.style.gridTemplateRows = '30px';
      carrier.style.width = '150px';
      battleship.style.gridTemplateColumns = 'repeat(4, 30px)';
      battleship.style.gridTemplateRows = '30px';
      battleship.style.width = '120px';
      destroyer.style.gridTemplateColumns = 'repeat(3, 30px)';
      destroyer.style.gridTemplateRows = '30px';
      destroyer.style.width = '90px';
      submarine.style.gridTemplateColumns = 'repeat(3, 30px)';
      submarine.style.gridTemplateRows = '30px';
      submarine.style.width = '90px';
      patrolBoat.style.gridTemplateColumns = 'repeat(2, 30px)';
      patrolBoat.style.gridTemplateRows = '30px';
      patrolBoat.style.width = '60px';
      shipPlacementContainer.style.flexDirection = 'column';
    }
  };

  return {
    renderGameBoard,
    stylePlayerCells,
    styleAiCells,
    clearContainer,
    displayWinMessage,
    getCurrentBoard,
    toggleRotateShips,
  };
})();

export default DisplayController;
