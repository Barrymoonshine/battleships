import ShipController from './ShipController.js';
import GameFlowController from './GameFlowController.js';

const DisplayController = (() => {
  const messageContainer = document.getElementById('message-container');
  const shipBtnsContainer = document.getElementById('ship-buttons-container');
  const humanPlayerCells =
    document.getElementsByClassName('human-player-cells');
  const playerContainer = document.getElementById('board-container-one');

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

  const createShipButtons = () => {
    shipBtnsContainer.innerHTML = `
    <button id="carrier" class="ship-button" >carrier</button>
    <button id="battleship" class="ship-button">Battleship</button>
    <button id="destroyer" class="ship-button">Destroyer</button>
    <button id="submarine" class="ship-button">Submarine</button>
    <button id="patrolBoat" class="ship-button">Patrol Boat</button>
    `;
  };

  const displayShip = (coOrdinates, targetShip) => {
    const row = +coOrdinates.charAt(0);
    const column = +coOrdinates.charAt(1);
    console.log(`${row}${column}`);
    // Dependency cycle, resolve later with new data holder module
    const { playerBoard } = GameFlowController;
    // board, horizontal, row, column, ship- Y

    // Add the ship to the board array using row and column - default horizontal, later add vertical
    for (let i = column; i < column + targetShip.length; i += 1) {
      playerBoard[row][i] = targetShip.name;
    }

    console.log(playerBoard);

    // Render the board

    clearContainer(playerContainer);

    renderGameBoard(playerBoard, playerContainer, 'human-player');

    // Display the ship on the board
    stylePlayerCells(humanPlayerCells);
  };

  const addMouseOver = (targetShip) => {
    // Assume being place vertically first
    for (let i = 0; i < humanPlayerCells.length; i += 1) {
      humanPlayerCells[i].onmouseover = (e) => {
        const coOrdinates = e.target.getAttribute('data-index-number');
        displayShip(coOrdinates, targetShip);
      };
    }
  };

  const addClickShipButtons = () => {
    const allShipButtons = document.getElementsByClassName('ship-button');
    for (let i = 0; i < allShipButtons.length; i += 1) {
      allShipButtons[i].addEventListener('click', (e) => {
        const targetShip = ShipController.findShip(e.target.id);
        addMouseOver(targetShip);
      });
    }
  };

  return {
    renderGameBoard,
    stylePlayerCells,
    styleAiCells,
    clearContainer,
    displayWinMessage,
    createShipButtons,
    addClickShipButtons,
  };
})();

export default DisplayController;
