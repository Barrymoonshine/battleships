import GameBoardController from './GameBoardController.js';
import DisplayController from './DisplayController.js';

const DragDropController = (() => {
  // Initialise the shipLength variable
  let shipLength = 0;

  // Initialise the target ships name
  let targetShip = '';

  const areCellsFree = (target) => {
    const cell = target.id;
    const row = Number(cell.charAt(0));
    const column = Number(cell.charAt(1));
    const currentPlayerBoard = DisplayController.getCurrentBoard();

    // True is the second parameter as currently only checking for horizontal placings
    if (
      !GameBoardController.areCellsFree(
        currentPlayerBoard,
        true,
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
    const maxColumn = 9;
    const row = Number(targetId.charAt(0));
    let column = Number(targetId.charAt(1));
    column += i;
    let targetCell = '';
    if (column > maxColumn) {
      targetCell = document.getElementById(`${row}${maxColumn}`);
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

  const drop = (e) => {
    if (!areCellsFree(e.target, shipLength)) {
      // Remove invalid drop class, but don't drop element
      removeInvalidDrop(e.target);
    } else {
      // Remove drag over
      removeDragOver(e.target);

      // Loop to style all target cells
      for (let i = 0; i < shipLength; i += 1) {
        const targetCell = getCell(e.target.id, i);
        targetCell.style.backgroundColor = '#f0db4f';
        targetCell.style.border = '1px solid black';
        targetCell.innerText = 'patrolBoat';
      }

      // Remove ship from D&D list
      const targetShipContainer = document.getElementById(
        `${targetShip}-container`
      );
      targetShipContainer.innerHTML = '';

      // Remove listeners so ship can't be placed again
      removeDDListeners();
    }
  };

  const dragLeave = (e) => {
    if (!areCellsFree(e.target, shipLength)) {
      // if invalid drop, style cell as red
      removeInvalidDrop(e.target);
      removeDragOver(e.target);
    } else {
      removeDragOver(e.target);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
    if (!areCellsFree(e.target, shipLength)) {
      // if invalid drop, style cell as red
      addInvalidDropOver(e.target);
      removeDragOver(e.target);
    } else {
      addDragOver(e.target);
    }
  };

  const dragEnter = (e) => {
    e.preventDefault();
    if (!areCellsFree(e.target, shipLength)) {
      // if invalid drop, style cell as red
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

  // handle the dragstart
  const dragStart = (e) => {
    // Provide shipLength to module scope
    shipLength = e.target.getAttribute('data-index-number');
    addDDListeners();
  };

  // attach the dragstart event handler

  const handleDragStart = (e) => {
    // Provide targetShip to module scope
    targetShip = e.target.getAttribute('data-ship-name');
    const domTargetShip = document.querySelector(`.${targetShip}`);
    domTargetShip.addEventListener('dragstart', dragStart);
  };

  return { handleDragStart };
})();

export default DragDropController;
