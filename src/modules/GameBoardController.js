import ShipController from './ShipController.js';

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

  const areCellsFree = (board, horizontal, row, column, ship) => {
    if (horizontal) {
      for (let i = column; i < column + ship.length; i += 1) {
        if (board[row][i] === '') {
          // Do nothing, continue with loop as cell is empty
        } else if (board[row][i] !== '') {
          // At least one cell is occupied so ship can't be placed
          return false;
        }
      }
    }
    if (!horizontal) {
      for (let i = row; i < row + ship.length; i += 1) {
        if (board[i][column] === '') {
          // Do nothing, continue with loop as cell is empty
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
    if (!areCellsFree(board, horizontal, row, column, ship)) {
      return 'Error there is already a ship in this location';
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
      // Miss or hit already present, do nothing
    } else if (board[row][column] === '') {
      // Cell empty, place a missed shot
      board[row][column] = 'M';
    } else {
      // Else cell contains ship, process a hit!
      const shipName = board[row][column];
      ShipController.hitShip(shipName);
      board[row][column] = 'H';
      console.log(board);
    }
    return board;
  };

  return { createBoard, placeShip, receiveAttack };
})();

export default GameBoardController;
