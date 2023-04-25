const ShipController = (() => {
  const ShipFactory = (length, hits = 0, sunk = false) => ({
    length,
    hits,
    sunk,
  });

  const createShip = (length) => ShipFactory(length);

  const hitShip = (ship) => {
    ship.hits += 1;
  };

  return { createShip };
})();

export default ShipController;
