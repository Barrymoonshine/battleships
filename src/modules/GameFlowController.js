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
  const playerBoard = GameBoardController.createBoard();
  const aiBoard = GameBoardController.createBoard();

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
        playHumanRound(coOrdinates);
      });
    }
  };

  const playAiRound = () => {
    // Switch the active player
    PlayerController.switchActivePlayer();

    // Update active board to players board
    const activeBoard = getActiveBoard();

    // Generate random Ai move
    PlayerController.generateAiMove(activeBoard);

    // Clear the container
    DisplayController.clearContainer(playerContainer);

    // Render and style the updated board
    DisplayController.renderGameBoard(
      playerBoard,
      playerContainer,
      'human-player'
    );
    DisplayController.stylePlayerCells(humanPlayerCells);

    // Check for end game
    if (GameBoardController.areAllShipsSunk(activeBoard)) {
      DisplayController.displayWinMessage(aiPlayer);
    } else {
      // Switch the active player and add back event listeners
      PlayerController.switchActivePlayer();
      addEvtListeners();
    }
  };

  const playHumanRound = (coOrdinates) => {
    // Get the co-ordinates for the attack and the active board
    const row = +coOrdinates.charAt(0);
    const column = +coOrdinates.charAt(1);
    const activeBoard = getActiveBoard();
    if (!GameBoardController.receiveAttack(activeBoard, row, column)) {
      // Do nothing as miss or hit already present in cell
    } else {
      // Place the attack based on the selected co-ordinates and active board
      GameBoardController.receiveAttack(activeBoard, row, column);

      // Clear the container
      DisplayController.clearContainer(aiContainer);

      // Render and style the updated board
      DisplayController.renderGameBoard(activeBoard, aiContainer, 'ai-player');
      DisplayController.styleAiCells(aiPlayerCells);

      // Check for end game
      if (GameBoardController.areAllShipsSunk(activeBoard)) {
        DisplayController.displayWinMessage(humanPlayer);
      } else {
        playAiRound();
      }
    }
  };

  const startGame = () => {
    // Randomly place ships for Ai player
    GameBoardController.placeShipsRandomly(aiBoard, aiShips);

    // Render blank game board for human player to manually add their ships to
    DisplayController.renderGameBoard(
      playerBoard,
      playerContainer,
      'human-player'
    );

    // Create ships for player to add to the board
    DisplayController.createShipButtons();

    // Add event listeners to the ship buttons
    DisplayController.addClickShipButtons();

    // Render populated game board for ai player as there is no set up phase
    DisplayController.renderGameBoard(aiBoard, aiContainer, 'ai-player');

    // Style cells
    DisplayController.stylePlayerCells(humanPlayerCells);
    DisplayController.styleAiCells(aiPlayerCells);

    // Add event listeners
    // addEvtListeners(); - come back to later, added after all the ships have been placed
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

  return { startGame, playerBoard };
})();

export default gameFlowController;
