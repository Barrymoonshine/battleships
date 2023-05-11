import GameBoardController from './GameBoardController.js';
import ShipController from './ShipController.js';
import PlayerController from './PlayerController.js';
import DisplayController from './DisplayController.js';
import DragDropController from './DragDropController.js';

const GameFlowController = (() => {
  const playerContainer = document.getElementById('board-container-one');
  const aiContainer = document.getElementById('board-container-two');
  const randomiseShipsBtn = document.getElementById('randomise-ships-btn');
  const humanPlayerCells =
    document.getElementsByClassName('human-player-cells');
  const aiPlayerCells = document.getElementsByClassName('ai-player-cells');
  const shipPlacementContainer = document.getElementsByClassName(
    'ship-placement-container'
  )[0];
  const startGameButton = document.getElementById('start-game-button');

  // Generate players
  const humanPlayer = PlayerController.PlayerFactory('Player one');
  const aiPlayer = PlayerController.PlayerFactory('Ai');

  // Generate boards
  let playerBoard = GameBoardController.createBoard();
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

  const initiateGameSetUp = () => {
    // Randomly place ships for Ai player only
    GameBoardController.placeShipsRandomly(aiBoard, aiShips);

    // Render game boards
    DisplayController.renderGameBoard(aiBoard, aiContainer, 'ai-player');
    DisplayController.renderGameBoard(
      playerBoard,
      playerContainer,
      'human-player'
    );

    // Style cells
    DisplayController.stylePlayerCells(humanPlayerCells);
    DisplayController.styleAiCells(aiPlayerCells);
  };

  const startGame = () => {
    // Update the player's board
    playerBoard = DisplayController.getCurrentBoard();
    // hide drag and drop container
    DisplayController.hideDragDropContainer();
    // Show AI board
    DisplayController.displayAiBoard();
    // Add event listeners
    addEvtListeners();
    // Hide start button
    DisplayController.hideStartButton();
  };

  const handleRandomiseBtn = () => {
    // Clear the container
    DisplayController.clearContainer(playerContainer);
    // Create a blank board to populate
    playerBoard = GameBoardController.createBoard();
    // Populate the blank board with randomly placed ships
    GameBoardController.placeShipsRandomly(playerBoard, playerShips);
    // Render the board
    DisplayController.renderGameBoard(
      playerBoard,
      playerContainer,
      'human-player'
    );
    // Style the cells
    DisplayController.stylePlayerCells(humanPlayerCells);
    // Hide the drag and drop ships
    DisplayController.hideShips();
    // Show the start game button
    DisplayController.displayStartButton();
  };

  randomiseShipsBtn.addEventListener('click', () => {
    handleRandomiseBtn();
  });

  shipPlacementContainer.addEventListener('mousedown', (e) => {
    DragDropController.handleDragStart(e);
  });

  startGameButton.addEventListener('click', () => {
    startGame();
  });

  return { initiateGameSetUp };
})();

export default GameFlowController;
