/**
 * These example boards represent the row and column of live cells, where an empty array
 * represents an empty row. Feel free to keep this data structure or change it to something
 * that works better for you.
 */

const BLOCK_BOARD = [
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 ];
 
const BLINKER_BOARD = [
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 ];
 
 // Implement the Game of Life here to transform the inputBoard into the outputBoard!
function getNextGeneration(inputBoard) {
     const outputBoard = [];
     
     for (let row = 0; row < inputBoard.length; row++) {
         var newCol = [];
         for (let col = 0; col < 10; col++) {
             var cell = inputBoard[row][col];
             var sum = sumOfNeighbors(row, col, inputBoard);
             var newCell = updateCell(cell, sum);
             newCol.push(newCell);
         } outputBoard.push(newCol);
     }
     return outputBoard;
 }
 
 function updateCell(cell, sum) {
     if (cell === 1) {
         if (sum < 2 || sum > 3) return 0;
         else return 1;
     } else if (cell === 0 && sum === 3) {
         return 1;
     } return 0;
 }
 
 function sumOfNeighbors(row, col, inputBoard) {
     let sum = 0;
     let hei = inputBoard.length;
     let len = inputBoard[0].length;
     
     if (col > 0) {
         if (row > 0 && inputBoard[row - 1][col - 1] === 1) sum++;
         if (row < hei - 1 && inputBoard[row + 1][col - 1] === 1) sum++;
         if (inputBoard[row][col - 1] === 1) sum++;
     }
 
     if (col < len - 1) {
         // right column
         if (row > 0 && inputBoard[row - 1][col + 1] == 1) sum++; // upper right
         if (row < hei - 1 && inputBoard[row + 1][col + 1] === 1) sum++; // lower right
         if (inputBoard[row][col + 1] === 1) sum++; // center right
     }
 
     if (row > 0 && inputBoard[row - 1][col] === 1) sum++; // upper center
     if (row < hei - 1 && inputBoard[row + 1][col] === 1) sum++; // lower center
     
     // console.log(sum);
     return sum;
 }
 
 function main() {
     BLINKER_BOARD.forEach(row => {
        console.log(row);
     });
     console.log("generation 0\n------------------\n\n\n");

     const gen1 = getNextGeneration(BLINKER_BOARD);

     gen1.forEach(row => {
        console.log(row);
     });
     console.log("generation 1\n------------------\n\n\n");
     
     const gen2 = getNextGeneration(gen1);

     gen2.forEach(row => {
        console.log(row);
     });
     console.log("generation 2\n------------------\n\n\n");

     const gen3 = getNextGeneration(gen2);

     gen3.forEach(row => {
        console.log(row);
     });
     console.log("generation 2\n------------------\n\n\n");
 }

 main();