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

  // Initialise ship variables for use in module
  let playerShips = [];
  let aiShips = [];

  const createNewShips = () => {
    ShipController.resetShips();
    ShipController.createPlayerShips();
    ShipController.createAiShips();
    playerShips = ShipController.getPlayerShips();
    aiShips = ShipController.getAiShips();
  };

  const createNewBoards = () => {
    playerBoard = GameBoardController.createBoard();
    aiBoard = GameBoardController.createBoard();
  };

  const getActiveBoard = () => {
    if (PlayerController.isPlayerOneActive()) {
      return aiBoard;
    }
    return playerBoard;
  };

  const getActivePlayer = () => {
    if (PlayerController.isPlayerOneActive()) {
      return humanPlayer;
    }
    return aiPlayer;
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
    DisplayController.clearContainer(playerContainer);
    DisplayController.renderGameBoard(board, playerContainer, 'human-player');
    DisplayController.stylePlayerCells(humanPlayerCells);
  };

  const refreshAiBoard = (board) => {
    DisplayController.clearContainer(aiContainer);
    DisplayController.renderGameBoard(board, aiContainer, 'ai-player');
    DisplayController.styleAiCells(aiPlayerCells);
  };

  const playAiRound = () => {
    PlayerController.switchActivePlayer();
    const activeBoard = getActiveBoard();
    const activePlayer = getActivePlayer();
    PlayerController.generateAiMove(activeBoard, activePlayer);
    refreshPlayerBoard(activeBoard);
    if (GameBoardController.areAllShipsSunk(activeBoard)) {
      DisplayController.displayWinMessage(aiPlayer);
    } else {
      PlayerController.switchActivePlayer();
      addEvtListeners();
    }
  };

  const playHumanRound = (coOrdinates) => {
    const row = +coOrdinates.charAt(0);
    const column = +coOrdinates.charAt(1);
    const activeBoard = getActiveBoard();
    const activePlayer = getActivePlayer();
    if (!GameBoardController.receiveAttack(activeBoard, row, column)) {
      // Do nothing as miss or hit already present in cell
    } else {
      GameBoardController.receiveAttack(activeBoard, row, column, activePlayer);
      refreshAiBoard(activeBoard);
      if (GameBoardController.areAllShipsSunk(activeBoard)) {
        DisplayController.displayWinMessage(humanPlayer);
      } else {
        playAiRound();
      }
    }
  };

  const initiateGameSetUp = () => {
    createNewBoards();
    createNewShips();
    GameBoardController.placeShipsRandomly(aiBoard, aiShips);
    DisplayController.renderGameBoard(aiBoard, aiContainer, 'ai-player');
    DisplayController.renderGameBoard(
      playerBoard,
      playerContainer,
      'human-player'
    );
    DisplayController.stylePlayerCells(humanPlayerCells);
    DisplayController.styleAiCells(aiPlayerCells);
  };

  const startGame = () => {
    // Update the player's board using the ships placed in the DOM
    playerBoard = DisplayController.getCurrentBoard();
    DisplayController.hideDragDropContainer();
    DisplayController.displayAiBoard();
    addEvtListeners();
    DisplayController.hideStartButton();
  };

  const handleRandomiseBtn = () => {
    // Create a blank board to populate
    playerBoard = GameBoardController.createBoard();
    GameBoardController.placeShipsRandomly(playerBoard, playerShips);
    refreshPlayerBoard(playerBoard);
    DisplayController.hideShips();
    DisplayController.displayStartButton();
  };

  const clearContainers = () => {
    DisplayController.clearContainer(aiContainer);
    DisplayController.clearContainer(playerContainer);
  };

  const resetGame = () => {
    DisplayController.hideAiBoard();
    clearContainers();
    DisplayController.hideWinningMessage();
    DisplayController.displayDragDropContainer();
    DisplayController.displayShips();
    DisplayController.displayShips();
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
