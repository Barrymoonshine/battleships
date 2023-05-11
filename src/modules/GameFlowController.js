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
  const playAgainButton = document.getElementById('play-again-button');

  // Generate players
  const humanPlayer = PlayerController.PlayerFactory('Player one');
  const aiPlayer = PlayerController.PlayerFactory('Ai');

  // Initialise board variables for use in module
  let playerBoard = [];
  let aiBoard = [];

  // Generate ships
  ShipController.createPlayerShips();
  ShipController.createAiShips();
  const playerShips = ShipController.getPlayerShips();
  const aiShips = ShipController.getAiShips();

  const generateNewBoards = () => {
    playerBoard = GameBoardController.createBoard();
    aiBoard = GameBoardController.createBoard();
  };

  const getActiveBoard = () => {
    if (PlayerController.isPlayerOneActive()) {
      return aiBoard;
    }
    return playerBoard;
  };

  const addEvtListeners = () => {
    for (let i = 0; i < aiPlayerCells.length; i += 1) {
      aiPlayerCells[i].addEventListener('click', (e) => {
        const coOrdinates = e.target.id;
        playHumanRound(coOrdinates);
      });
    }
  };

  const refreshPlayerBoard = (board) => {
    // Clear the container
    DisplayController.clearContainer(playerContainer);
    // Render and style the updated board
    DisplayController.renderGameBoard(board, playerContainer, 'human-player');
    DisplayController.stylePlayerCells(humanPlayerCells);
  };

  const refreshAiBoard = (board) => {
    // Clear the container
    DisplayController.clearContainer(aiContainer);
    // Render and style the updated board
    DisplayController.renderGameBoard(board, aiContainer, 'ai-player');
    DisplayController.stylePlayerCells(aiPlayerCells);
  };

  const playAiRound = () => {
    // Switch the active player
    PlayerController.switchActivePlayer();

    // Update active board to players board
    const activeBoard = getActiveBoard();

    // Generate random Ai move
    PlayerController.generateAiMove(activeBoard);

    // Refresh player's board after attack placed
    refreshPlayerBoard(activeBoard);

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
      refreshAiBoard(activeBoard);

      // Check for end game
      if (GameBoardController.areAllShipsSunk(activeBoard)) {
        DisplayController.displayWinMessage(humanPlayer);
      } else {
        playAiRound();
      }
    }
  };

  const initiateGameSetUp = () => {
    // Generate boards
    generateNewBoards();
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
    // Update the player's board using the ships placed in the DOM
    playerBoard = DisplayController.getCurrentBoard();
    // Hide drag and drop container
    DisplayController.hideDragDropContainer();
    // Show AI board
    DisplayController.displayAiBoard();
    // Add event listeners
    addEvtListeners();
    // Hide start game button
    DisplayController.hideStartButton();
  };

  const handleRandomiseBtn = () => {
    // Create a blank board to populate
    playerBoard = GameBoardController.createBoard();
    // Populate the blank board with randomly placed ships
    GameBoardController.placeShipsRandomly(playerBoard, playerShips);
    // Refresh the board
    refreshPlayerBoard(playerBoard);
    // Hide the DnD ships
    DisplayController.hideShips();
    // Show the start game button
    DisplayController.displayStartButton();
  };

  const resetGame = () => {
    // hide Ai board container
    DisplayController.hideAiBoard();
    // Clear both containers
    DisplayController.clearContainer(playerContainer);
    DisplayController.clearContainer(aiContainer);
    // Create new boards
    playerBoard = GameBoardController.createBoard();
    aiBoard = GameBoardController.createBoard();
    // Hide winning message container
    DisplayController.hideWinningMessage();
    // Show drag and drop container and ships container
    DisplayController.displayDragDropContainer();
    DisplayController.displayShips();
    DisplayController.generateNewShips();
    // Clear and render both boards
    initiateGameSetUp();
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

  playAgainButton.addEventListener('click', () => {
    resetGame();
  });

  return { initiateGameSetUp };
})();

export default GameFlowController;
