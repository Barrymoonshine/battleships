import GameBoardController from './GameBoardController.js';
import RandomServiceProvider from './RandomServiceProvider.js';

const PlayerController = (() => {
  const PlayerFactory = (name) => ({ name });

  let playerOneActive = true;
  const isPlayerOneActive = () => playerOneActive;
  const switchActivePlayer = () => {
    playerOneActive = !playerOneActive;
    return playerOneActive;
  };
  const resetActivePlayer = () => {
    playerOneActive = true;
  };

  const generateAiMove = (board) => {
    const row = RandomServiceProvider.randomNumberGenerator(0, 9);
    const column = RandomServiceProvider.randomNumberGenerator(0, 9);

    if (!GameBoardController.receiveAttack(board, row, column)) {
      // If a hit or miss already present, try again
      generateAiMove(board);
    }
    GameBoardController.receiveAttack(board, row, column);
    return 'Successful hit';
  };

  return {
    PlayerFactory,
    isPlayerOneActive,
    switchActivePlayer,
    resetActivePlayer,
    generateAiMove,
  };
})();

export default PlayerController;
