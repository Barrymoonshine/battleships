import GameBoardController from './GameBoardController.js';
import ShipController from './ShipController.js';
import PlayerController from './PlayerController.js';
import DisplayController from './DisplayController.js';

const gameFlowController = (() => {
  const playerContainer = document.getElementById('board-container-one');
  const aiContainer = document.getElementById('board-container-two');
  const randomiseShipsBtn = document.getElementById('randomise-ships-btn');
  const humanPlayerCells =
    document.getElementsByClassName('human-player-cells');
  const aiPlayerCells = document.getElementsByClassName('ai-player-cells');

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

  const getActiveBoard = () => {
    if (PlayerController.isPlayerOneActive()) {
      return aiBoard;
    }
    return playerBoard;
  };

  const addEvtListeners = () => {
    for (let i = 0; i < aiPlayerCells.length; i += 1) {
      aiPlayerCells[i].addEventListener('click', (e) => {
        const coOrdinates = e.target.getAttribute('data-index-number');
        playRound(coOrdinates);
      });
    }
  };

  const playRound = (coOrdinates) => {
    // Get the co-ordinates for the attack and the active board
    const row = +coOrdinates.charAt(0);
    const column = +coOrdinates.charAt(1);
    let activeBoard = getActiveBoard();

    console.log(PlayerController.isPlayerOneActive());

    // Place the attack based on the selected co-ordinates and active board
    GameBoardController.receiveAttack(activeBoard, row, column);

    // Clear the container
    DisplayController.clearContainer(aiContainer);

    // Render and style the updated board
    DisplayController.renderBoard(activeBoard, aiContainer, 'ai-player');
    DisplayController.styleAiCells(aiPlayerCells);

    // Switch the active player
    PlayerController.switchActivePlayer();
    console.log(PlayerController.isPlayerOneActive());
    // Update active board to players board
    activeBoard = getActiveBoard();

    // Generate random Ai move
    PlayerController.generateAiMove(activeBoard);

    // Clear the container
    DisplayController.clearContainer(playerContainer);

    // Render and style the updated board
    DisplayController.renderBoard(playerBoard, playerContainer, 'human-player');
    DisplayController.stylePlayerCells(humanPlayerCells);

    // Finally switch the active player and add back event listeners
    PlayerController.switchActivePlayer();
    console.log(PlayerController.isPlayerOneActive());
    addEvtListeners();
  };

  const startGame = () => {
    // Randomly place ships
    GameBoardController.placeShipsRandomly(playerBoard, playerShips);
    GameBoardController.placeShipsRandomly(aiBoard, aiShips);

    // Display game boards
    DisplayController.renderBoard(playerBoard, playerContainer, 'human-player');
    DisplayController.renderBoard(aiBoard, aiContainer, 'ai-player');

    // Style cells
    DisplayController.stylePlayerCells(humanPlayerCells);
    DisplayController.styleAiCells(aiPlayerCells);

    // Add event listeners
    addEvtListeners();
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
