import GameBoardController from './GameBoardController.js';
import ShipController from './ShipController.js';
import PlayerController from './PlayerController.js';
import DisplayController from './DisplayController.js';

const gameFlowController = (() => {
  const playerContainer = document.getElementById('board-container-one');
  const aiContainer = document.getElementById('board-container-two');
  const randomiseShipsBtn = document.getElementById('randomise-ships-btn');

  // Generate players
  const humanPlayer = PlayerController.PlayerFactory('Player one');
  const aiPlayer = PlayerController.PlayerFactory('Ai');

  // Generate boards
  let playerBoard = GameBoardController.createBoard();
  let aiBoard = GameBoardController.createBoard();

  // Generate ships
  ShipController.createPlayerShips();
  ShipController.createAiShips();
  const playerShips = ShipController.getPlayerShips();
  const aiShips = ShipController.getAiShips();

  const startGame = () => {
    // Randomly place ships
    GameBoardController.placeShipsRandomly(playerBoard, playerShips);
    GameBoardController.placeShipsRandomly(aiBoard, aiShips);

    // Display game boards
    DisplayController.renderBoard(playerBoard, playerContainer);
    DisplayController.renderBoard(aiBoard, aiContainer);

    // Style cells
    DisplayController.styleCells();
    console.log(playerBoard);
    console.log(aiBoard);
  };

  const clearContainers = () => {
    DisplayController.clearContainer(playerContainer);
    DisplayController.clearContainer(aiContainer);
  };

  const clearGameBoardArrays = () => {
    playerBoard = GameBoardController.createBoard();
    aiBoard = GameBoardController.createBoard();
  };

  randomiseShipsBtn.addEventListener('click', () => {
    clearContainers();
    clearGameBoardArrays();
    startGame();
  });

  return { startGame };
})();

export default gameFlowController;
