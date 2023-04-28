import ShipController from '../modules/ShipController.js';
import GameBoardController from '../modules/GameBoardController.js';
import PlayerController from '../modules/PlayerController.js';

test('ShipController correctly creates and transforms ship objects', () => {
  const testShip = ShipController.createShip(5, 'test-ship');

  // Ship object is correctly created
  expect(ShipController.findShip('test-ship')).toStrictEqual({
    length: 5,
    name: 'test-ship',
    hits: 0,
    sunk: false,
  });
  // Ship hits are correctly incremented
  expect(ShipController.hitShip('test-ship')).toStrictEqual({
    length: 5,
    name: 'test-ship',
    hits: 1,
    sunk: false,
  });
  // Ship is correctly still afloat
  expect(ShipController.isSunk('test-ship')).toBe(false);

  // Sink ship
  ShipController.hitShip('test-ship');
  ShipController.hitShip('test-ship');
  ShipController.hitShip('test-ship');
  ShipController.hitShip('test-ship');

  // Ship is now correctly sunk!
  expect(ShipController.isSunk('test-ship')).toBe(true);
});

test('GameBoardController correctly creates and transforms the game board', () => {
  const testBoard = GameBoardController.createBoard();
  const testShipTwo = ShipController.createShip(5, 'test-ship-two');
  const testShipThree = ShipController.createShip(3, 'test-ship-three');
  const allShipsSunkBoard = [
    ['', '', '', '', '', 'H', 'H', 'H', 'H', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', 'H', 'H', 'H', 'H', 'H', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', 'H', '', '', '', '', 'H', '', '', ''],
    ['', 'H', '', '', '', '', 'H', '', '', ''],
    ['', 'H', '', '', '', '', 'H', '', '', ''],
    ['', '', '', 'H', 'H', '', '', '', '', ''],
  ];
  // 10x 10 Game board is correctly created as 2d array
  // by testing that the first and last elements are empty strings
  expect(testBoard[0][0]).toBe('');
  expect(testBoard[9][9]).toBe('');

  // Ship has been correctly placed by testing ship is present in updated cells
  expect(
    GameBoardController.placeShip(
      testBoard,
      true,
      3,
      2,
      ShipController.findShip('test-ship-two')
    )
  ).toStrictEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    [
      '',
      '',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      '',
      '',
      '',
    ],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);

  // Ship can't be placed as cells are already occupied
  expect(
    GameBoardController.placeShip(
      testBoard,
      true,
      3,
      2,
      ShipController.findShip('test-ship-two')
    )
  ).toBe(false);

  // Place ship vertically
  expect(
    GameBoardController.placeShip(
      testBoard,
      false,
      6,
      1,
      ShipController.findShip('test-ship-three')
    )
  ).toStrictEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    [
      '',
      '',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      '',
      '',
      '',
    ],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', 'test-ship-three', '', '', '', '', '', '', '', ''],
    ['', 'test-ship-three', '', '', '', '', '', '', '', ''],
    ['', 'test-ship-three', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);

  // Ship can't be placed vertically as cells are already occupied
  expect(
    GameBoardController.placeShip(
      testBoard,
      false,
      6,
      1,
      ShipController.findShip('test-ship-three')
    )
  ).toStrictEqual('Error there is already a ship in this location');

  // Board correctly updated with a successful hit
  expect(GameBoardController.receiveAttack(testBoard, 3, 2)).toStrictEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    [
      '',
      '',
      'H',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      '',
      '',
      '',
    ],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', 'test-ship-three', '', '', '', '', '', '', '', ''],
    ['', 'test-ship-three', '', '', '', '', '', '', '', ''],
    ['', 'test-ship-three', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);

  // Ship correctly registers hit
  expect(ShipController.findShip('test-ship-two')).toStrictEqual({
    length: 5,
    name: 'test-ship-two',
    hits: 1,
    sunk: false,
  });

  // Hit already present in cell
  expect(GameBoardController.receiveAttack(testBoard, 3, 2)).toBe(false);

  // All ships are not sunk
  expect(GameBoardController.areAllShipsSunk(testBoard)).toBe(false);

  // All ships are sunk
  expect(GameBoardController.areAllShipsSunk(allShipsSunkBoard)).toBe(true);

  // Reset active player ahead of player controller tests
  PlayerController.resetActivePlayer();
});

test('Player controller successfully switches rounds and processes AI moves', () => {
  const testBoard = [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    [
      '',
      '',
      'H',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      'test-ship-two',
      '',
      '',
      '',
    ],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', 'test-ship-three', '', '', '', '', '', '', '', ''],
    ['', 'test-ship-three', '', '', '', '', '', '', '', ''],
    ['', 'test-ship-three', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ];
  // Player one goes first
  expect(PlayerController.isPlayerOneActive()).toBe(true);
  PlayerController.switchActivePlayer();
  // Player two goes next
  expect(PlayerController.isPlayerOneActive()).toBe(false);

  // Ai can place a random move and doesn't hit the same co-ordinates twice
  expect(PlayerController.generateAiMove(testBoard)).toBe('Successful hit');
});
