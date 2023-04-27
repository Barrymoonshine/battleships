const ShipController = (() => {

  const ShipFactory = (length, name, hits = 0, sunk = false) => ({
    length,
    name,
    hits,
    sunk,
  });
  const PlayerFactory = (name) => {return {name}}


  // Test functions
  const testShipContainer = [];

  const createShip = (length, name) => {
    const newShip = ShipFactory(length, name);
    testShipContainer.push(newShip);
  };

  const getShips = () => testShipContainer;

  const findShip = (shipName) => {
    const targetShip = testShipContainer.find((item) => item.name === shipName);
    return targetShip;
  };

  // Game functions 
  const playerShipContainer = [];
  const aiShipContainer = [];
  
  const createPlayerShips = () => {
    const carrier = ShipFactory(5, 'carrier');
    const battleship = ShipFactory(4, 'battleship');
    const destroyer = ShipFactory(3, 'destroyer');
    const submarine = ShipFactory(3, 'submarine');
    const patrolBoat = ShipFactory(2, 'patrolBoat');
    playerShipContainer.push(carrier, battleship, destroyer, submarine, patrolBoat);
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
    PlayerFactory,
    getShips,
    findShip,
    createShip,
    createPlayerShips,
    createAiShips
    hitShip,
    isSunk,
    getPlayerShips,
    getAiShips,

  };
})();

export default ShipController;
