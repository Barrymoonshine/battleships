const GameBoardController = (() => {
  const rows = 10;
  const columns = 10;

  const createBoard = (board = []) => {
    // Nested for loop to create game board as a 2d array
    for (let i = 0; i < rows; i += 1) {
      board[i] = [];
      for (let j = 0; j < columns; j += 1) {
        board[i][j] = '';
      }
    }
    return board;
  };

  const placeShip = (board, row, column, ship) => {
    // Check if there is horizontal space to place the ship
    // Check if there is already a ship in the selected cells
    // If not, place ship

    // column + length of ship to place horizontally
    for (let i = column; i < column + ship.length; i += 1) {
      board[row][i] = 'S';
    }
    return board;
  };

  return { createBoard, placeShip };
})();

export default GameBoardController;
