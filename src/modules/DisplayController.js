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
  const shipsContainer = document.getElementsByClassName(
    'ship-placement-container'
  )[0];
  const dragDropContainer = document.getElementById('drag-drop-container');
  const aiBoardContainer = document.getElementById('board-container-two');
  const startButtonContainer = document.getElementsByClassName(
    'start-button-container'
  )[0];
  const winningMessageContainer = document.getElementById(
    'winning-message-container'
  );
  const carrierContainer = document.getElementById('carrier-container');
  const battleshipContainer = document.getElementById('battleship-container');
  const destroyerContainer = document.getElementById('destroyer-container');
  const submarineContainer = document.getElementById('submarine-container');
  const patrolBoatContainer = document.getElementById('patrol-boat-container');

  const renderGameBoard = (board, container, player) => {
    board.forEach((row, rowIndex) => {
      row.forEach((columnCell, columnIndex) => {
        container.innerHTML += `
            <div class="${player}-cells" id="${rowIndex}${columnIndex}">${columnCell}</div>
            `;
      });
    });
  };

  const styleShip = (cell, player) => {
    if (player === 'human-player') {
      cell.style.backgroundColor = ' #fde047';
    }
  };

  const styleCells = (cells, player) => {
    Array.from(cells).forEach((cell) => {
      if (cell.innerText === 'H') {
        cell.style.backgroundColor = '#f87171';
      } else if (cell.innerText === 'M') {
        cell.style.backgroundColor = '#38bdf8';
      } else if (cell.innerText !== '') {
        styleShip(cell, player);
      }
    });
  };

  const clearContainer = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  const displayWinMessage = (currentPlayer) => {
    messageContainer.style.visibility = 'visible';
    winningMessageContainer.innerText = `
    ${currentPlayer.name} is the winner! Play again?`;
  };

  const getCurrentBoard = (board = []) => {
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

  const hideShips = () => {
    shipsContainer.style.display = 'none';
  };

  const hideDragDropContainer = () => {
    dragDropContainer.style.display = 'none';
  };

  const displayShips = () => {
    shipsContainer.style.display = 'flex';
  };

  const displayDragDropContainer = () => {
    dragDropContainer.style.display = 'flex';
  };

  const displayAiBoard = () => {
    aiBoardContainer.style.display = 'grid';
  };

  const displayStartButton = () => {
    startButtonContainer.style.display = 'flex';
  };

  const hideStartButton = () => {
    startButtonContainer.style.display = 'none';
  };

  const hideAiBoard = () => {
    aiBoardContainer.style.display = 'none';
  };

  const hideWinningMessage = () => {
    messageContainer.style.visibility = 'hidden';
  };

  const displayDropShips = () => {
    carrierContainer.style.display = 'flex';
    battleshipContainer.style.display = 'flex';
    destroyerContainer.style.display = 'flex';
    submarineContainer.style.display = 'flex';
    patrolBoatContainer.style.display = 'flex';
  };

  return {
    renderGameBoard,
    styleCells,
    clearContainer,
    displayWinMessage,
    getCurrentBoard,
    toggleRotateShips,
    hideShips,
    hideDragDropContainer,
    displayAiBoard,
    displayStartButton,
    hideStartButton,
    hideAiBoard,
    hideWinningMessage,
    displayShips,
    displayDragDropContainer,
    displayDropShips,
  };
})();

export default DisplayController;
