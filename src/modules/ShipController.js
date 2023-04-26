const ShipController = (() => {
  const ShipFactory = (length, hits = 0, sunk = false) => ({
    length,
    hits,
    sunk,
  });

  const hitShip = (ship) => {
    ship.hits += 1;
  };

  const isSunk = (ship) => ship.sunk;

  return { ShipFactory, hitShip, isSunk };
})();

export default ShipController;
