import GameBoardController from './GameBoardController.js';

const PlayerController = (() => {
  let playerOneActive = true;
  const isPlayerOneActive = () => playerOneActive;
  const switchActivePlayer = () => {
    playerOneActive = !playerOneActive;
    return playerOneActive;
  };
  const resetActivePlayer = () => {
    playerOneActive = true;
  };

  const randomNumberGenerator = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const generateAiMove = (board) => {
    const row = randomNumberGenerator(0, 9);
    const column = randomNumberGenerator(0, 9);
    if (!GameBoardController.receiveAttack(board, row, column)) {
      // If a hit or miss already present, try again
      generateAiMove(board);
    }
    return 'Successful hit';
  };

  return {
    isPlayerOneActive,
    switchActivePlayer,
    resetActivePlayer,
    generateAiMove,
  };
})();

export default PlayerController;
