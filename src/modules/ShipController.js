const ShipController = (() => {
  // Array for storing ships created as part of testing suite
  const testShipContainer = [];

  const getShips = () => testShipContainer;

  const ShipFactory = (length, name, hits = 0, sunk = false) => ({
    length,
    name,
    hits,
    sunk,
  });

  const createShip = (length, name) => {
    const newShip = ShipFactory(length, name);
    testShipContainer.push(newShip);
  };

  const findShip = (shipName) => {
    const targetShip = testShipContainer.find((item) => item.name === shipName);
    return targetShip;
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
    getShips,
    findShip,
    createShip,
    hitShip,
    isSunk,
  };
})();

export default ShipController;
