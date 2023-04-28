import PlayerController from './PlayerController.js';

const ShipController = (() => {
  let playerShipContainer = [];
  let aiShipContainer = [];

  const ShipFactory = (length, name, hits = 0, sunk = false) => ({
    length,
    name,
    hits,
    sunk,
  });

  const resetShips = () => {
    playerShipContainer = [];
    aiShipContainer = [];
  };

  const createPlayerShips = () => {
    const carrier = ShipFactory(5, 'carrier');
    const battleship = ShipFactory(4, 'battleship');
    const destroyer = ShipFactory(3, 'destroyer');
    const submarine = ShipFactory(3, 'submarine');
    const patrolBoat = ShipFactory(2, 'patrolBoat');
    playerShipContainer.push(
      carrier,
      battleship,
      destroyer,
      submarine,
      patrolBoat
    );
  };

  const createAiShips = () => {
    const carrier = ShipFactory(5, 'carrier');
    const battleship = ShipFactory(4, 'battleship');
    const destroyer = ShipFactory(3, 'destroyer');
    const submarine = ShipFactory(3, 'submarine');
    const patrolBoat = ShipFactory(2, 'patrolBoat');
    aiShipContainer.push(carrier, battleship, destroyer, submarine, patrolBoat);
  };

  const getPlayerShips = () => playerShipContainer;
  const getAiShips = () => aiShipContainer;

  const findShip = (shipName) => {
    if (PlayerController.isPlayerOneActive()) {
      return playerShipContainer.find((item) => item.name === shipName);
    }
    return aiShipContainer.find((item) => item.name === shipName);
  };

  const hitShip = (shipName) => {
    const targetShip = findShip(shipName);
    targetShip.hits += 1;
    return targetShip;
  };

  const isSunk = (shipName) => {
    const targetShip = findShip(shipName);
    if (targetShip.length === targetShip.hits) {
      targetShip.sunk = true;
    }
    return targetShip.sunk;
  };

  return {
    resetShips,
    findShip,
    createPlayerShips,
    createAiShips,
    hitShip,
    isSunk,
    getPlayerShips,
    getAiShips,
  };
})();

export default ShipController;
