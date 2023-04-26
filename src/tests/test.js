import ShipController from '../modules/ShipController.js';

test('ShipController module correctly creates and transforms ship objects', () => {
  const carrier = ShipController.ShipFactory(5);
  // Ship object is correctly created
  expect(carrier).toStrictEqual({
    length: 5,
    hits: 0,
    sunk: false,
  });
  // Ship hits are correctly incremented
  expect(ShipController.hitShip(carrier)).toStrictEqual({
    length: 5,
    hits: 1,
    sunk: false,
  });
  // Ship is correctly not sunk
  expect(ShipController.isSunk(carrier)).toBe(false);

  ShipController.hitShip(carrier);
  ShipController.hitShip(carrier);
  ShipController.hitShip(carrier);
  ShipController.hitShip(carrier);

  // Ships is correctly sunk
  expect(ShipController.isSunk(carrier)).toBe(true);
});
