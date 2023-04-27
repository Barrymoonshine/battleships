const PlayerController = () => {
  let isPlayerOneActive = true;
  const checkActivePlayer = () => isPlayerOneActive;
  const switchActivePlayer = () => {
    isPlayerOneActive = !isPlayerOneActive;
    return isPlayerOneActive;
  };

  return { checkActivePlayer, switchActivePlayer };
};

export default PlayerController;
