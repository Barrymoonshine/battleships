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

  const generateAiMove = (board, player) => {
    const row = RandomServiceProvider.randomNumberGenerator(0, 9);
    const column = RandomServiceProvider.randomNumberGenerator(0, 9);
    if (!GameBoardController.receiveAttack(board, row, column, player)) {
      generateAiMove(board);
    }
    GameBoardController.receiveAttack(board, row, column, player);
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
