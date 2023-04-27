import GameBoardController from './GameBoardController.js';
import ShipController from './ShipController.js';
import PlayerController from './PlayerController.js';
import DisplayController from './DisplayController.js';

const gameFlowController = (() => {
  const startGame = () => {
    // Generate players
    const humanPlayer = PlayerController.PlayerFactory('Player one');
    const aiPlayer = PlayerController.PlayerFactory('Ai');

    // Generate boards
    const playerBoard = GameBoardController.createBoard();
    const aiBoard = GameBoardController.createBoard();

    // Generate ships
    ShipController.createPlayerShips();
    ShipController.createAiShips();
    const playerShips = ShipController.getPlayerShips();
    const aiShips = ShipController.getAiShips();

    // Randomly place ships
    GameBoardController.placeShipsRandomly(playerBoard, playerShips);
    GameBoardController.placeShipsRandomly(aiBoard, aiShips);

    // Display game boards
    const playerContainer = document.getElementById('board-container-one');
    const aiContainer = document.getElementById('board-container-two');
    DisplayController.renderBoard(playerBoard, playerContainer);
    DisplayController.renderBoard(aiBoard, aiContainer);
  };

  return { startGame };
})();

export default gameFlowController;
