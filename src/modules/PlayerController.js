const PlayerController = (() => {
  let playerOneActive = true;
  const isPlayerOneActive = () => playerOneActive;
  const switchActivePlayer = () => {
    playerOneActive = !playerOneActive;
    return playerOneActive;
  };

  return { isPlayerOneActive, switchActivePlayer };
})();

export default PlayerController;
