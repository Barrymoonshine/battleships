/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_global_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/global-style.css */ \"./src/styles/global-style.css\");\n/* harmony import */ var _modules_GameFlowController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/GameFlowController */ \"./src/modules/GameFlowController.js\");\n\n\n_modules_GameFlowController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].startGame();\n\n//# sourceURL=webpack://battleship-game/./src/index.js?");

/***/ }),

/***/ "./src/modules/DisplayController.js":
/*!******************************************!*\
  !*** ./src/modules/DisplayController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DisplayController = (() => {\n  const messageContainer = document.getElementById('message-container');\n  const renderBoard = (board, container, player) => {\n    board.forEach((row, rowIndex) => {\n      row.forEach((columnCell, columnIndex) => {\n        container.innerHTML += `\n            <div class=\"${player}-cells\" data-index-number=\"${rowIndex}${columnIndex}\">${columnCell}</div>\n            `;\n      });\n    });\n  };\n  const stylePlayerCells = cells => {\n    for (let i = 0; i < cells.length; i += 1) {\n      // if hit\n      if (cells[i].innerText === 'H') {\n        cells[i].style.backgroundColor = 'red';\n      }\n      // if miss\n      else if (cells[i].innerText === 'M') {\n        cells[i].style.backgroundColor = 'orange';\n      }\n      // if ship present\n      else if (cells[i].innerText !== '') {\n        cells[i].style.backgroundColor = 'blue';\n      }\n    }\n  };\n\n  // Update function later so that AI cells are obscured from view\n  // Other than hits and misses\n  const styleAiCells = cells => {\n    for (let i = 0; i < cells.length; i += 1) {\n      // if hit\n      if (cells[i].innerText === 'H') {\n        cells[i].style.backgroundColor = 'red';\n      }\n      // if miss\n      else if (cells[i].innerText === 'M') {\n        cells[i].style.backgroundColor = 'orange';\n      }\n      // if ship present\n      else if (cells[i].innerText !== '') {\n        cells[i].style.backgroundColor = 'blue';\n      }\n    }\n  };\n  const clearContainer = container => {\n    while (container.firstChild) {\n      container.removeChild(container.firstChild);\n    }\n  };\n  const displayWinMessage = currentPlayer => {\n    messageContainer.innerText = `\n    ${currentPlayer.name} is the winner! Play again?`;\n  };\n  return {\n    renderBoard,\n    stylePlayerCells,\n    styleAiCells,\n    clearContainer,\n    displayWinMessage\n  };\n})();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayController);\n\n//# sourceURL=webpack://battleship-game/./src/modules/DisplayController.js?");

/***/ }),

/***/ "./src/modules/GameBoardController.js":
/*!********************************************!*\
  !*** ./src/modules/GameBoardController.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ShipController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShipController.js */ \"./src/modules/ShipController.js\");\n/* harmony import */ var _PlayerController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayerController.js */ \"./src/modules/PlayerController.js\");\n\n\nconst GameBoardController = (() => {\n  const rows = 10;\n  const columns = 10;\n  const createBoard = function () {\n    let board = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n    // Nested for loop to create a game board as a 2d array\n    for (let i = 0; i < rows; i += 1) {\n      board[i] = [];\n      for (let j = 0; j < columns; j += 1) {\n        board[i][j] = '';\n      }\n    }\n    return board;\n  };\n  const areCellsFree = (board, horizontal, row, column, ship) => {\n    if (horizontal) {\n      for (let i = column; i < column + ship.length; i += 1) {\n        if (board[row][i] === '') {\n          // Do nothing, continue with loop as cell is empty\n        } else if (board[row][i] !== '') {\n          // At least one cell is occupied so ship can't be placed\n          return false;\n        }\n      }\n    }\n    if (!horizontal) {\n      for (let i = row; i < row + ship.length; i += 1) {\n        if (board[i][column] === '') {\n          // Do nothing, continue with loop as cell is empty\n        } else if (board[i][column] !== '') {\n          // At least one cell is occupied so ship can't be placed\n          return false;\n        }\n      }\n    }\n    return true;\n  };\n  const placeShip = (board, horizontal, row, column, ship) => {\n    // Check if there is horizontal space to place the ship\n    if (!areCellsFree(board, horizontal, row, column, ship)) {\n      return false;\n    }\n    if (horizontal) {\n      for (let i = column; i < column + ship.length; i += 1) {\n        board[row][i] = ship.name;\n      }\n    } else if (!horizontal) {\n      for (let i = row; i < row + ship.length; i += 1) {\n        board[i][column] = ship.name;\n      }\n    }\n    return board;\n  };\n  const receiveAttack = (board, row, column) => {\n    if (board[row][column] === 'M' || board[row][column] === 'H') {\n      // Miss or hit already present, do nothing and exit function\n\n      return false;\n    }\n    if (board[row][column] === '') {\n      // Cell empty, place a missed shot\n      board[row][column] = 'M';\n    } else {\n      // Else cell contains ship, process a hit!\n      const shipName = board[row][column];\n      _ShipController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hitShip(shipName);\n      board[row][column] = 'H';\n    }\n    return board;\n  };\n  const areAllShipsSunk = board => {\n    // Ships occupy a total of 17 cells\n    let totalHits = 0;\n    board.forEach(row => {\n      row.forEach(columnCell => {\n        if (columnCell === 'H') {\n          totalHits += 1;\n        }\n      });\n    });\n    return totalHits === 17;\n  };\n  const randomNumberGenerator = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);\n  const randomBooleanGenerator = () => Math.random() < 0.5;\n  const handleRow = (horizontal, ship) => {\n    let row = randomNumberGenerator(0, 9);\n    const minVal = 0;\n    if (horizontal) {\n      // If the ship is being place horizontally, any row value is potentially valid\n      return row;\n    }\n    // else if the ship is being place vertically,\n    // The row value has to be reduced by the length of the ship to provide\n    // The opportunity for available space\n    row -= ship.length;\n    if (row < minVal) {\n      return minVal;\n    }\n    return row;\n  };\n  const handleColumn = (horizontal, ship) => {\n    let column = randomNumberGenerator(0, 9);\n    const minVal = 0;\n    if (!horizontal) {\n      // If the ship is being place vertically, any column value is potentially valid\n      return column;\n    }\n    // else if the ship is being place horizontally,\n    // The column value has to be reduced by the length of the ship to provide\n    // The opportunity for available space\n    column -= ship.length;\n    if (column < minVal) {\n      return minVal;\n    }\n    return column;\n  };\n  const handleShipPlacement = (ship, board) => {\n    const horizontal = randomBooleanGenerator();\n    const row = handleRow(horizontal, ship);\n    const column = handleColumn(horizontal, ship);\n    if (!placeShip(board, horizontal, row, column, ship)) {\n      // If space not free, try again with new coordinates\n      handleShipPlacement(ship, board);\n    } else {\n      // Else space free\n      placeShip(board, horizontal, row, column, ship);\n    }\n  };\n  const placeShipsRandomly = (board, allShips) => {\n    allShips.forEach(ship => {\n      handleShipPlacement(ship, board);\n    });\n  };\n  return {\n    createBoard,\n    placeShip,\n    receiveAttack,\n    areAllShipsSunk,\n    placeShipsRandomly\n  };\n})();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoardController);\n\n//# sourceURL=webpack://battleship-game/./src/modules/GameBoardController.js?");

/***/ }),

/***/ "./src/modules/GameFlowController.js":
/*!*******************************************!*\
  !*** ./src/modules/GameFlowController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoardController.js */ \"./src/modules/GameBoardController.js\");\n/* harmony import */ var _ShipController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShipController.js */ \"./src/modules/ShipController.js\");\n/* harmony import */ var _PlayerController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayerController.js */ \"./src/modules/PlayerController.js\");\n/* harmony import */ var _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DisplayController.js */ \"./src/modules/DisplayController.js\");\n\n\n\n\nconst gameFlowController = (() => {\n  const playerContainer = document.getElementById('board-container-one');\n  const aiContainer = document.getElementById('board-container-two');\n  const randomiseShipsBtn = document.getElementById('randomise-ships-btn');\n  const humanPlayerCells = document.getElementsByClassName('human-player-cells');\n  const aiPlayerCells = document.getElementsByClassName('ai-player-cells');\n\n  // Generate players\n  const humanPlayer = _PlayerController_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PlayerFactory('Player one');\n  const aiPlayer = _PlayerController_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].PlayerFactory('Ai');\n\n  // Generate boards\n  let playerBoard = _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBoard();\n  let aiBoard = _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBoard();\n\n  // Generate ships\n  _ShipController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createPlayerShips();\n  _ShipController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createAiShips();\n  const playerShips = _ShipController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getPlayerShips();\n  const aiShips = _ShipController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getAiShips();\n  const getActiveBoard = () => {\n    if (_PlayerController_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isPlayerOneActive()) {\n      return aiBoard;\n    }\n    return playerBoard;\n  };\n  const addEvtListeners = () => {\n    for (let i = 0; i < aiPlayerCells.length; i += 1) {\n      aiPlayerCells[i].addEventListener('click', e => {\n        const coOrdinates = e.target.getAttribute('data-index-number');\n        playHumanRound(coOrdinates);\n      });\n    }\n  };\n  const playAiRound = () => {\n    // Switch the active player\n    _PlayerController_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].switchActivePlayer();\n\n    // Update active board to players board\n    const activeBoard = getActiveBoard();\n\n    // Generate random Ai move\n    _PlayerController_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].generateAiMove(activeBoard);\n\n    // Clear the container\n    _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].clearContainer(playerContainer);\n\n    // Render and style the updated board\n    _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(playerBoard, playerContainer, 'human-player');\n    _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].stylePlayerCells(humanPlayerCells);\n\n    // Check for end game\n    if (_GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].areAllShipsSunk(activeBoard)) {\n      _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].displayWinMessage(aiPlayer);\n    } else {\n      // Switch the active player and add back event listeners\n      _PlayerController_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].switchActivePlayer();\n      addEvtListeners();\n    }\n  };\n  const playHumanRound = coOrdinates => {\n    // Get the co-ordinates for the attack and the active board\n    const row = +coOrdinates.charAt(0);\n    const column = +coOrdinates.charAt(1);\n    const activeBoard = getActiveBoard();\n    if (!_GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].receiveAttack(activeBoard, row, column)) {\n      // Do nothing as miss or hit already present in cell\n    } else {\n      // Place the attack based on the selected co-ordinates and active board\n      _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].receiveAttack(activeBoard, row, column);\n\n      // Clear the container\n      _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].clearContainer(aiContainer);\n\n      // Render and style the updated board\n      _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(activeBoard, aiContainer, 'ai-player');\n      _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].styleAiCells(aiPlayerCells);\n\n      // Check for end game\n      if (_GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].areAllShipsSunk(activeBoard)) {\n        _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].displayWinMessage(humanPlayer);\n      } else {\n        playAiRound();\n      }\n    }\n  };\n  const startGame = () => {\n    // Randomly place ships\n    _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].placeShipsRandomly(playerBoard, playerShips);\n    _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].placeShipsRandomly(aiBoard, aiShips);\n\n    // Display game boards\n    _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(playerBoard, playerContainer, 'human-player');\n    _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(aiBoard, aiContainer, 'ai-player');\n\n    // Style cells\n    _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].stylePlayerCells(humanPlayerCells);\n    _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].styleAiCells(aiPlayerCells);\n\n    // Add event listeners\n    addEvtListeners();\n  };\n  const clearContainers = () => {\n    _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].clearContainer(playerContainer);\n    _DisplayController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].clearContainer(aiContainer);\n  };\n  const clearGameBoardArrays = () => {\n    playerBoard = _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBoard();\n    aiBoard = _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBoard();\n  };\n  randomiseShipsBtn.addEventListener('click', () => {\n    clearContainers();\n    clearGameBoardArrays();\n    startGame();\n  });\n  return {\n    startGame\n  };\n})();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameFlowController);\n\n//# sourceURL=webpack://battleship-game/./src/modules/GameFlowController.js?");

/***/ }),

/***/ "./src/modules/PlayerController.js":
/*!*****************************************!*\
  !*** ./src/modules/PlayerController.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoardController.js */ \"./src/modules/GameBoardController.js\");\n\nconst PlayerController = (() => {\n  const PlayerFactory = name => ({\n    name\n  });\n  let playerOneActive = true;\n  const isPlayerOneActive = () => playerOneActive;\n  const switchActivePlayer = () => {\n    playerOneActive = !playerOneActive;\n    return playerOneActive;\n  };\n  const resetActivePlayer = () => {\n    playerOneActive = true;\n  };\n  const randomNumberGenerator = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);\n  const generateAiMove = board => {\n    const row = randomNumberGenerator(0, 9);\n    const column = randomNumberGenerator(0, 9);\n    if (!_GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].receiveAttack(board, row, column)) {\n      // If a hit or miss already present, try again\n      generateAiMove(board);\n    }\n    _GameBoardController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].receiveAttack(board, row, column);\n    return 'Successful hit';\n  };\n  return {\n    PlayerFactory,\n    isPlayerOneActive,\n    switchActivePlayer,\n    resetActivePlayer,\n    generateAiMove\n  };\n})();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlayerController);\n\n//# sourceURL=webpack://battleship-game/./src/modules/PlayerController.js?");

/***/ }),

/***/ "./src/modules/ShipController.js":
/*!***************************************!*\
  !*** ./src/modules/ShipController.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _PlayerController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerController.js */ \"./src/modules/PlayerController.js\");\n\nconst ShipController = (() => {\n  let playerShipContainer = [];\n  let aiShipContainer = [];\n  const ShipFactory = function (length, name) {\n    let hits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n    let sunk = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n    return {\n      length,\n      name,\n      hits,\n      sunk\n    };\n  };\n  const resetShips = () => {\n    playerShipContainer = [];\n    aiShipContainer = [];\n  };\n  const createPlayerShips = () => {\n    const carrier = ShipFactory(5, 'carrier');\n    const battleship = ShipFactory(4, 'battleship');\n    const destroyer = ShipFactory(3, 'destroyer');\n    const submarine = ShipFactory(3, 'submarine');\n    const patrolBoat = ShipFactory(2, 'patrolBoat');\n    playerShipContainer.push(carrier, battleship, destroyer, submarine, patrolBoat);\n  };\n  const createAiShips = () => {\n    const carrier = ShipFactory(5, 'carrier');\n    const battleship = ShipFactory(4, 'battleship');\n    const destroyer = ShipFactory(3, 'destroyer');\n    const submarine = ShipFactory(3, 'submarine');\n    const patrolBoat = ShipFactory(2, 'patrolBoat');\n    aiShipContainer.push(carrier, battleship, destroyer, submarine, patrolBoat);\n  };\n  const getPlayerShips = () => playerShipContainer;\n  const getAiShips = () => aiShipContainer;\n  const findShip = shipName => {\n    if (_PlayerController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isPlayerOneActive()) {\n      return playerShipContainer.find(item => item.name === shipName);\n    }\n    return aiShipContainer.find(item => item.name === shipName);\n  };\n  const hitShip = shipName => {\n    const targetShip = findShip(shipName);\n    targetShip.hits += 1;\n    return targetShip;\n  };\n  const isSunk = shipName => {\n    const targetShip = findShip(shipName);\n    if (targetShip.length === targetShip.hits) {\n      targetShip.sunk = true;\n    }\n    return targetShip.sunk;\n  };\n  return {\n    resetShips,\n    findShip,\n    createPlayerShips,\n    createAiShips,\n    hitShip,\n    isSunk,\n    getPlayerShips,\n    getAiShips\n  };\n})();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShipController);\n\n//# sourceURL=webpack://battleship-game/./src/modules/ShipController.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/global-style.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/global-style.css ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"body {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  height: 100vh;\\n  width: 100vw;\\n  gap: 30px;\\n  margin: 0px;\\n}\\n\\n.boards-container {\\n  display: flex;\\n}\\n\\n#board-container-one {\\n  display: grid;\\n  grid-template-columns: repeat(10, 1fr);\\n  grid-template-rows: repeat(10, 1fr);\\n  border: 1px solid black;\\n  margin: 20px;\\n}\\n\\n#board-container-two {\\n  display: grid;\\n  grid-template-columns: repeat(10, 1fr);\\n  grid-template-rows: repeat(10, 1fr);\\n  border: 1px solid black;\\n  margin: 20px;\\n}\\n\\n.human-player-cells {\\n  border: 1px solid black;\\n  width: 40px;\\n  height: 40px;\\n  /* Hide the text. */\\n  text-indent: 100%;\\n  white-space: nowrap;\\n  overflow: hidden;\\n}\\n\\n.ai-player-cells {\\n  border: 1px solid black;\\n  width: 40px;\\n  height: 40px;\\n  /* Hide the text. */\\n  text-indent: 100%;\\n  white-space: nowrap;\\n  overflow: hidden;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship-game/./src/styles/global-style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship-game/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship-game/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles/global-style.css":
/*!*************************************!*\
  !*** ./src/styles/global-style.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_global_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./global-style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/global-style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_global_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_global_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_global_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_global_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship-game/./src/styles/global-style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship-game/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship-game/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship-game/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship-game/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship-game/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship-game/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;