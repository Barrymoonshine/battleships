const ShipController = (() => {
  const ShipFactory = (length, hits = 0, sunk = false) => ({
    length,
    hits,
    sunk,
  });

  const hitShip = (ship) => {
    ship.hits += 1;
    return ship;
  };

  const isSunk = (ship) => {
    if (ship.length === ship.hits) {
      ship.sunk = true;
    }
    return ship.sunk;
  };

  return { ShipFactory, hitShip, isSunk };
})();

export default ShipController;
