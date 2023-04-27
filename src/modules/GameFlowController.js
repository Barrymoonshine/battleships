import GameBoardController from './GameBoardController.js';
import ShipController from './ShipController.js';
import PlayerController from './PlayerController.js';

const gameFlowController = (() => {
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

  // Place ships
  GameBoardController.placeAllShips(playerBoard, playerShips);
  GameBoardController.placeAllShips(aiBoard, aiShips);
})();

export default gameFlowController;
