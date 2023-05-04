const DragDropController = (() => {
  const rows = 10;
  const columns = 10;

  // Initialise the shipLength variable
  let shipLength = 0;

  // Initialise the target ships name
  let targetShip = '';

  const generateTarget = (targetId) => {
    const maxRow = 9;
    if (targetId.charAt(0) === '0') {
      // First row
      let secondDigit = Number(targetId.charAt(1));
      secondDigit += 1;
      return `${targetId.charAt(0)}${secondDigit}`;
    }
    if (targetId.charAt(1) === '9') {
      // Last column, don't increment
      return targetId;
    }
    // Else, increment by size of ship -1 (test ship is size 2 so increment by 1)
    if (Number(targetId) + 1 > maxRow) {
      return maxRow;
    }
    return Number(targetId) + 1;
  };

  const checkIfCellsFree = (target, shipLength) => {
    // Expand to be flexible for any number of cells
    // And look for cells already occupied, plus cells within 1 square radius
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

  const removeDragOver = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      const targetCell = document.getElementById(Number(target.id) + i);
      targetCell.classList.remove('drag-over');
    }
  };

  const removeInvalidDrop = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      const targetCell = document.getElementById(Number(target.id) + i);
      targetCell.classList.remove('invalid-drop');
    }
  };

  const drop = (e) => {
    const rightTarget = document.getElementById(generateTarget(e.target.id));
    if (!checkIfCellsFree(e.target, shipLength)) {
      // Remove invalid drop class, but don't drop element
      removeInvalidDrop(e.target);
    } else {
      // Remove drag over
      removeDragOver(e.target);

      // Loop to style all target cells
      for (let i = 0; i < shipLength; i += 1) {
        const targetCell = document.getElementById(Number(e.target.id) + i);
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

  const addInvalidDropOver = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      const targetCell = document.getElementById(Number(target.id) + i);
      targetCell.classList.add('invalid-drop');
    }
  };

  const addDragOver = (target) => {
    for (let i = 0; i < shipLength; i += 1) {
      const targetCell = document.getElementById(Number(target.id) + i);
      targetCell.classList.add('drag-over');
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
    console.log('drag start called');
    // Provide shipLength and targetShip to module scope
    shipLength = e.target.getAttribute('data-index-number');
    addDDListeners();
  };

  // attach the dragstart event handler

  const handleDragStart = (e) => {
    // D&D needs access to the players board
    console.log('handleDragStart called');
    targetShip = e.target.getAttribute('data-ship-name');
    const domTargetShip = document.querySelector(`.${targetShip}`);
    domTargetShip.addEventListener('dragstart', dragStart);
  };

  return { handleDragStart };
})();

export default DragDropController;
