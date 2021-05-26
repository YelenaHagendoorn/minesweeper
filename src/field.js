'use strict';

import Square from './square.js'

class Field {

  prepare(x, y, nrOfMines) {
    const fieldArray = this.createFieldArray(x, y, nrOfMines);
    const squares = this.createSquares(fieldArray, x);
    this.addNeighboursToSquares(squares);
    this.renderSquares(squares);
  }

  createFieldArray(x, y, nrOfMines) {
    if (nrOfMines > x * y) {
      throw "Number of mines cannot be larger than number of fields";
    }

    const fieldArray = new Array(x * y).fill(false);
    const mineCandidates = fieldArray.map((val, idx) => idx);

    Array(nrOfMines).fill().forEach(() => { 
      const fieldIndex = Math.floor(Math.random() * mineCandidates.length); // add mines on random locations
      fieldArray[mineCandidates[fieldIndex]] = true;
      mineCandidates.splice(fieldIndex, 1); 
    });

    return fieldArray;
  }

  createSquares(fieldArray, nrOfColumns) {
    let currentColumn = 0;
    let currentRow = 0;
    return fieldArray.map(isMine => {
      const square = new Square(currentColumn, currentRow, isMine);

      this[currentColumn] = this[currentColumn] || {}; 
      this[currentColumn][currentRow] = square; 

      currentColumn +=1; 
      if (currentColumn === nrOfColumns ) {
        currentColumn = 0;
        currentRow += 1
      }

      return square;
    });
  }

  addNeighbours(square) {
      const neighbours = [];
      for (let x = square.x - 1; x <= square.x + 1; x++) { // iterate over the 9 squares surrounding the square
        for (let y = square.y - 1; y <= square.y + 1; y++) {
          const inBounds = this[x] && this[x][y];
          const currentSquare = x === square.x && y === square.y;
          if (!inBounds || currentSquare) { 
            continue;
          }

          neighbours.push(this[x][y]);
        } 
      }
      square.setNeighbours(neighbours);
  }

  addNeighboursToSquares(squares) {
    squares.forEach(square => this.addNeighbours(square));
  }

  renderSquares(squares) {
    squares.forEach(square => square.render());
  }
}

export default Field;
