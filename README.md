# Battleships

[Live demo](https://barrymoonshine.github.io/battleships/)

![Model](https://github.com/Barrymoonshine/battleships/blob/main/dist/battleships-screenshot.png?raw=true)

## Summary

The classic game of Battleships, built with vanilla JavaScript and Test Driven Development (TDD) using the Jest testing framework.

## Key learning points

**Test Driven Development**

- Writing tests for my public facing methods using Jest
- Applying a unit testing process to scrutinise small manageable parts of my application logic
- The difference between value vs. reference and when to use the toBe and toStrictEqual matchers with Jest

**Drag and Drop HTML API**

- Enabling users to manually place their ships during the pre-game set up utilsing drag events
- Defining the player's board as the drop zone for their ships
- Applying drag effects based on the vertical or horizontal position of the ship and the ship's length

**HTML loader webpack**

- Finally getting to grips with how the HTML Webpack loader works, and using the SRC folder for all my source code!

## Future features

- Smart AI that after successfully hitting a ship attacks the surrounding cells
- Allow another go if a ship has been hit
- When a ship is sunk, update the surrounding cells with misses
- Display hit status of ships during the game
- Improve UI to more clearly distinguish between a hit and a miss
