const DragDropController = (() => {
  // Initialise the shipLength variable
  let shipLength = 0;

  // Initialise the target ships name
  let targetShip = '';

  const checkIfCellsFree = (target) => {
    // Look for cells already occupied, plus cells within 1 square radius
    // Update for vertical placement later

    if (target.id.charAt(1) === '9') {
      // No available space for any ship being placed horizontally
      // as far right cell

      return false;
    }
    let secondDigit = Number(target.id.charAt(1));
    secondDigit += shipLength - 1;
    if (secondDigit > 9) {
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
    const maxRow = 9;
    let secondDigit = Number(targetId.charAt(1));
    secondDigit += i;
    let targetCell = '';
    if (secondDigit > maxRow) {
      targetCell = document.getElementById(`${targetId.charAt(0)}${maxRow}`);
    } else {
      targetCell = document.getElementById(
        `${targetId.charAt(0)}${secondDigit}`
      );
      return targetCell;
    }
  };

  const getFirstRowCell = (targetId, i) => {
    const maxRow = 9;
    let secondDigit = Number(targetId.charAt(1));
    secondDigit += i;
    let targetCell = '';
    if (secondDigit > maxRow) {
      targetCell = document.getElementById(`${targetId.charAt(0)}${maxRow}`);
    } else {
      targetCell = document.getElementById(
        `${targetId.charAt(0)}${secondDigit}`
      );
      return targetCell;
    }
  };

  const removeDragOver = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      let targetCell = 0;
      if (target.id.charAt(0) === '0') {
        targetCell = getFirstRowCell(target.id, i);
      } else {
        targetCell = getCell(target.id, i);
      }
      targetCell.classList.remove('drag-over');
    }
  };

  const removeInvalidDrop = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      let targetCell = 0;
      if (target.id.charAt(0) === '0') {
        targetCell = getFirstRowCell(target.id, i);
      } else {
        targetCell = getCell(target.id, i);
      }
      targetCell.classList.remove('invalid-drop');
    }
  };

  const addInvalidDropOver = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      let targetCell = 0;
      if (target.id.charAt(0) === '0') {
        targetCell = getFirstRowCell(target.id, i);
      } else {
        targetCell = getCell(target.id, i);
      }
      targetCell.classList.add('invalid-drop');
    }
  };

  const addDragOver = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      let targetCell = 0;
      if (target.id.charAt(0) === '0') {
        targetCell = getFirstRowCell(target.id, i);
      } else {
        targetCell = getCell(target.id, i);
      }
      targetCell.classList.add('drag-over');
    }
  };

  const drop = (e) => {
    if (!checkIfCellsFree(e.target, shipLength)) {
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
    if (!checkIfCellsFree(e.target, shipLength)) {
      // if invalid drop, style cell as red
      removeInvalidDrop(e.target);
      removeDragOver(e.target);
    } else {
      removeDragOver(e.target);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
    if (!checkIfCellsFree(e.target, shipLength)) {
      // if invalid drop, style cell as red
      addInvalidDropOver(e.target);
      removeDragOver(e.target);
    } else {
      addDragOver(e.target);
    }
  };

  const dragEnter = (e) => {
    e.preventDefault();
    if (!checkIfCellsFree(e.target, shipLength)) {
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
