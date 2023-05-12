import GameBoardController from './GameBoardController.js';
import DisplayController from './DisplayController.js';

const DragDropController = (() => {
  // Initialise the shipLength variable for use in module
  let shipLength = 0;

  // Initialise the target ships name for use in module
  let targetShip = '';

  // Initialise the horizontal name for use in module
  let horizontal = true;

  const rotateShipsButton = document.getElementById('rotate-ships-button');

  const areCellsFree = (target) => {
    const cell = target.id;
    const row = Number(cell.charAt(0));
    const column = Number(cell.charAt(1));
    const currentPlayerBoard = DisplayController.getCurrentBoard();
    if (
      !GameBoardController.areCellsFree(
        currentPlayerBoard,
        horizontal,
        row,
        column,
        Number(shipLength)
      )
    ) {
      return false;
    }
    return true;
  };

  const removeDDListeners = () => {
    const cells = document.querySelectorAll('.human-player-cells');
    cells.forEach((cell) => {
      cell.removeEventListener('dragenter', dragEnter);
      cell.removeEventListener('dragover', dragOver);
      cell.removeEventListener('dragleave', dragLeave);
      cell.removeEventListener('drop', drop);
    });
  };

  const getCell = (targetId, i) => {
    const maxValue = 9;
    let row = Number(targetId.charAt(0));
    let column = Number(targetId.charAt(1));
    let targetCell = '';
    if (horizontal) {
      column += i;
      if (column > maxValue) {
        targetCell = document.getElementById(`${row}${maxValue}`);
      } else {
        targetCell = document.getElementById(`${row}${column}`);
      }
      return targetCell;
    }
    row += i;
    if (row > maxValue) {
      targetCell = document.getElementById(`${maxValue}${column}`);
    } else {
      targetCell = document.getElementById(`${row}${column}`);
    }
    return targetCell;
  };

  const removeDragOver = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      const targetCell = getCell(target.id, i);
      targetCell.classList.remove('drag-over');
    }
  };

  const removeInvalidDrop = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      const targetCell = getCell(target.id, i);
      targetCell.classList.remove('invalid-drop');
    }
  };

  const addInvalidDropOver = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      const targetCell = getCell(target.id, i);
      targetCell.classList.add('invalid-drop');
    }
  };

  const addDragOver = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      const targetCell = getCell(target.id, i);
      targetCell.classList.add('drag-over');
    }
  };

  const checkForStartGame = () => {
    const currentPlayerBoard = DisplayController.getCurrentBoard();
    if (GameBoardController.areAllShipsPlaced(currentPlayerBoard)) {
      DisplayController.hideShips();
      DisplayController.displayStartButton();
    } else {
      // Do nothing, as not all ships have been placed
    }
  };

  const styleDrop = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      const targetCell = getCell(target.id, i);
      targetCell.style.backgroundColor = '#f0db4f';
      targetCell.style.border = '1px solid black';
      targetCell.innerText = `${targetShip}`;
    }
  };

  const hideShip = () => {
    const targetShipContainer = document.getElementById(
      `${targetShip}-container`
    );
    targetShipContainer.style.display = 'none';
  };

  const drop = (e) => {
    if (!areCellsFree(e.target, shipLength)) {
      removeInvalidDrop(e.target);
    } else {
      removeDragOver(e.target);
      styleDrop(e.target);
      hideShip();
      removeDDListeners();
      checkForStartGame();
    }
  };

  const dragLeave = (e) => {
    if (!areCellsFree(e.target, shipLength)) {
      removeInvalidDrop(e.target);
      removeDragOver(e.target);
    } else {
      removeDragOver(e.target);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
    if (!areCellsFree(e.target, shipLength)) {
      addInvalidDropOver(e.target);
      removeDragOver(e.target);
    } else {
      addDragOver(e.target);
    }
  };

  const dragEnter = (e) => {
    e.preventDefault();
    if (!areCellsFree(e.target, shipLength)) {
      addInvalidDropOver(e.target);
    } else {
      addDragOver(e.target);
    }
  };

  const addDDListeners = () => {
    const cells = document.querySelectorAll('.human-player-cells');
    cells.forEach((cell) => {
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', drop);
    });
  };

  const toggleHorizontal = () => {
    horizontal = !horizontal;
  };

  const rotateShips = () => {
    DisplayController.toggleRotateShips(horizontal);
    toggleHorizontal();
  };

  const dragStart = (e) => {
    // Provide shipLength to module scope and activate event listeners
    shipLength = e.target.getAttribute('data-index-number');
    addDDListeners();
  };

  const handleDragStart = (e) => {
    // Provide targetShip to module scope
    targetShip = e.target.getAttribute('data-ship-name');
    const domTargetShip = document.querySelector(`.${targetShip}`);
    domTargetShip.addEventListener('dragstart', dragStart);
  };

  rotateShipsButton.addEventListener('click', () => {
    rotateShips();
  });

  return { handleDragStart };
})();

export default DragDropController;
