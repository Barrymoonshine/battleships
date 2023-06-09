import ShipController from './ShipController.js';
import RandomServiceProvider from './RandomServiceProvider.js';

const GameBoardController = (() => {
  const createBoard = () =>
    Array(10)
      .fill('')
      .map(() => Array(10).fill(''));

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

  const receiveAttack = (board, row, column, player) => {
    if (board[row][column] === 'M' || board[row][column] === 'H') {
      return false;
    }
    if (board[row][column] === '') {
      board[row][column] = 'M';
    } else {
      const shipName = board[row][column];
      ShipController.hitShip(shipName, player);
      board[row][column] = 'H';
    }
    return board;
  };

  const flattenBoard = (board) =>
    board.reduce((acc, cell) => [...acc, ...cell], []);

  const areAllShipsSunk = (board) => {
    const flatBoard = flattenBoard(board);
    const totalHits = flatBoard.filter((cell) => cell === 'H');
    return totalHits.length === 17;
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
    // else if the ship is being placed horizontally,
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
      handleRandomShipPlacement(ship, board);
    } else {
      placeShip(board, horizontal, row, column, ship);
    }
  };

  const placeShipsRandomly = (board, allShips) => {
    allShips.forEach((ship) => {
      handleRandomShipPlacement(ship, board);
    });
  };

  const areAllShipsPlaced = (board) => {
    const flatBoard = flattenBoard(board);
    const totalShips = flatBoard.filter((cell) => cell !== '');
    return totalShips.length === 17;
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
