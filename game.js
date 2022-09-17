var board;
var counter = 0;

function updateDivs(inputBoard) {
    counter = 0;
    for (let i = 0; i < inputBoard.length; i++) {
        for (let j = 0; j < inputBoard[i].length; j++) {
            var cell = document.getElementById(counter);
            if (inputBoard[i][j] == 1)
                cell.className = "live";
            else
                cell.className = "dead";
            counter++;
        }
    }
}

function getNextGeneration(inputBoard) {
    const outputBoard = [];
     
    for (let row = 0; row < inputBoard.length; row++) {
        var newCol = [];
        for (let col = 0; col < inputBoard[0].length; col++) {
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

function logBoard(inputBoard) {
    inputBoard.forEach(row => {
        console.log(row);
    });
}

function emptyBoard(rows, cols) {
    const outputBoard = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
    );
    return outputBoard;
}

function generateBoard(rows, cols) {
    const outputBoard = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.round(Math.random()))
    );
    return outputBoard;
}

function createCells(inputBoard) {
    counter = 0;
    inputBoard.forEach(row => {
        row.forEach(col => {
            var cell = document.createElement('div');
            if (col === 1)
                cell.className = "live";
            else if (col === 0)
                cell.className = "dead";
            cell.id = counter++;
            var mother = document.getElementById('mothership');
            mother.append(cell);
        });
    });
}

function startGame() {
    clearInterval(interval);
    board = generateBoard(50, 100);
    interval = setInterval(function() {
        updateDivs(board);
        board = getNextGeneration(board);
    }, 75)
}

function stopGame() {
    clearInterval(interval);
    board = emptyBoard(50, 100);
    updateDivs(board)
}