import ShipController from '../modules/ShipController.js';
import GameBoardController from '../modules/GameBoardController.js';

test('ShipController correctly creates and transforms ship objects', () => {
  const testShip = ShipController.ShipFactory(5);
  // Ship object is correctly created
  expect(testShip).toStrictEqual({
    length: 5,
    hits: 0,
    sunk: false,
  });
  // Ship hits are correctly incremented
  expect(ShipController.hitShip(testShip)).toStrictEqual({
    length: 5,
    hits: 1,
    sunk: false,
  });
  // Ship is correctly still afloat
  expect(ShipController.isSunk(testShip)).toBe(false);

  // Sink ship
  ShipController.hitShip(testShip);
  ShipController.hitShip(testShip);
  ShipController.hitShip(testShip);
  ShipController.hitShip(testShip);

  // Ship is now correctly sunk!
  expect(ShipController.isSunk(testShip)).toBe(true);
});

test('GameBoardController correctly creates and transforms the game boards', () => {
  const testBoard = GameBoardController.createBoard();
  const testShip = ShipController.ShipFactory(5);
  const testShipTwo = ShipController.ShipFactory(3);
  // 10x 10 Game board is correctly created as 2d array
  // by testing that the first and last elements are empty strings
  expect(testBoard[0][0]).toBe('');
  expect(testBoard[9][9]).toBe('');

  // Ship has been correctly placed by testing ship is present in updated cells
  expect(
    GameBoardController.placeShip(testBoard, true, 3, 2, testShip)
  ).toStrictEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', 'S', 'S', 'S', 'S', 'S', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);

  // Ship can't be placed as cells are already occupied
  expect(GameBoardController.placeShip(testBoard, true, 3, 2, testShip)).toBe(
    'Error there is already a ship in this location'
  );

  // Place ship vertically
  expect(
    GameBoardController.placeShip(testBoard, false, 6, 1, testShipTwo)
  ).toStrictEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', 'S', 'S', 'S', 'S', 'S', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', 'S', '', '', '', '', '', '', '', ''],
    ['', 'S', '', '', '', '', '', '', '', ''],
    ['', 'S', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);

  // Ship can't be placed vertically as cells are already occupied
  expect(
    GameBoardController.placeShip(testBoard, false, 6, 1, testShipTwo)
  ).toStrictEqual('Error there is already a ship in this location');
});
