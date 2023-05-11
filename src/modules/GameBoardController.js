import ShipController from './ShipController.js';
import RandomServiceProvider from './RandomServiceProvider.js';

const GameBoardController = (() => {
  const rows = 10;
  const columns = 10;

  const createBoard = (board = []) => {
    // Nested for loop to create a game board as a 2d array
    for (let i = 0; i < rows; i += 1) {
      board[i] = [];
      for (let j = 0; j < columns; j += 1) {
        board[i][j] = '';
      }
    }
    return board;
  };

  const generateAdjacentCell = (look, cell) => {
    const minVal = 0;
    const maxVal = 9;
    if (look === 'above' || look === 'right') {
      cell += 1;
      if (cell > maxVal) {
        return maxVal;
      }
      return cell;
    }
    cell -= 1;
    if (cell < minVal) {
      return minVal;
    }
    return cell;
  };

  const areAdjacentCellsFree = (board, row, column) => {
    const rowAbove = generateAdjacentCell('above', row);
    const rowBelow = generateAdjacentCell('below', row);
    const columnRight = generateAdjacentCell('right', column);
    const columnLeft = generateAdjacentCell('left', column);
    if (
      board[rowAbove][column] === '' &&
      board[rowBelow][column] === '' &&
      board[row][columnRight] === '' &&
      board[row][columnLeft] === '' &&
      board[rowAbove][columnRight] === '' &&
      board[rowAbove][columnLeft] === '' &&
      board[rowBelow][columnRight] === '' &&
      board[rowBelow][columnLeft] === ''
    ) {
      return true;
    }
    return false;
  };

  const areCellsFree = (board, horizontal, row, column, shipLength) => {
    if (horizontal) {
      for (let i = column; i < column + shipLength; i += 1) {
        if (board[row][i] === '') {
          // Cell is free, check that adjacent cells are also free
          if (areAdjacentCellsFree(board, row, i)) {
            // Continue with loop as both cells are free
          } else {
            // Exit loop as adjacent cells are occupied
            return false;
          }
        } else if (board[row][i] !== '') {
          // At least one cell is occupied so ship can't be placed
          return false;
        }
      }
    }
    if (!horizontal) {
      for (let i = row; i < row + shipLength; i += 1) {
        if (board[i][column] === '') {
          // Cell is free, check that adjacent cells are also free
          if (areAdjacentCellsFree(board, i, column)) {
            // Continue with loop as both cells are free
          } else {
            // Exit loop as adjacent cells are occupied
            return false;
          }
        } else if (board[i][column] !== '') {
          // At least one cell is occupied so ship can't be placed
          return false;
        }
      }
    }
    return true;
  };

  const placeShip = (board, horizontal, row, column, ship) => {
    // Check if there is horizontal space to place the ship
    if (!areCellsFree(board, horizontal, row, column, ship.length)) {
      return false;
    }
    if (horizontal) {
      for (let i = column; i < column + ship.length; i += 1) {
        board[row][i] = ship.name;
      }
    } else if (!horizontal) {
      for (let i = row; i < row + ship.length; i += 1) {
        board[i][column] = ship.name;
      }
    }
    return board;
  };

  const receiveAttack = (board, row, column) => {
    if (board[row][column] === 'M' || board[row][column] === 'H') {
      // Miss or hit already present, do nothing and exit function
      return false;
    }
    if (board[row][column] === '') {
      // Cell empty, place a missed shot
      board[row][column] = 'M';
    } else {
      // Else cell contains ship, process a hit!
      const shipName = board[row][column];
      ShipController.hitShip(shipName);
      board[row][column] = 'H';
    }
    return board;
  };

  const areAllShipsSunk = (board) => {
    // Ships occupy a total of 17 cells
    let totalHits = 0;
    board.forEach((row) => {
      row.forEach((columnCell) => {
        if (columnCell === 'H') {
          totalHits += 1;
        }
      });
    });
    return totalHits === 17;
  };

  const handleRow = (horizontal, ship) => {
    let row = RandomServiceProvider.randomNumberGenerator(0, 9);
    const minVal = 0;
    if (horizontal) {
      // If the ship is being placed horizontally, any row value is potentially valid
      return row;
    }
    // else if the ship is being placed vertically,
    // The row value has to be reduced by the length of the ship to provide
    // The opportunity for available space
    row -= ship.length;
    if (row < minVal) {
      return minVal;
    }
    return row;
  };

  const handleColumn = (horizontal, ship) => {
    let column = RandomServiceProvider.randomNumberGenerator(0, 9);
    const minVal = 0;
    if (!horizontal) {
      // If the ship is being place vertically, any column value is potentially valid
      return column;
    }
    // else if the ship is being place horizontally,
    // The column value has to be reduced by the length of the ship to provide
    // The opportunity for available space
    column -= ship.length;
    if (column < minVal) {
      return minVal;
    }
    return column;
  };

  const handleRandomShipPlacement = (ship, board) => {
    const horizontal = RandomServiceProvider.randomBooleanGenerator();
    const row = handleRow(horizontal, ship);
    const column = handleColumn(horizontal, ship);
    if (!placeShip(board, horizontal, row, column, ship)) {
      // If space not free, try again with new coordinates
      handleRandomShipPlacement(ship, board);
    } else {
      // Else space free
      placeShip(board, horizontal, row, column, ship);
    }
  };

  const placeShipsRandomly = (board, allShips) => {
    allShips.forEach((ship) => {
      handleRandomShipPlacement(ship, board);
    });
  };

  const areAllShipsPlaced = (board) => {
    // Ships occupy a total of 17 cells
    let totalCellsOccupied = 0;
    board.forEach((row) => {
      row.forEach((columnCell) => {
        if (columnCell !== '') {
          totalCellsOccupied += 1;
        }
      });
    });
    return totalCellsOccupied === 17;
  };

  return {
    createBoard,
    placeShip,
    receiveAttack,
    areAllShipsSunk,
    placeShipsRandomly,
    areCellsFree,
    areAllShipsPlaced,
  };
})();

export default GameBoardController;
