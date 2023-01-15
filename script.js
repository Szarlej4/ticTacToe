let tiles = document.querySelectorAll(".tile");
const restartButton = document.querySelector(
    ".restart-button"
);
const gameInfoText = document.querySelector(
    ".game-info-text"
);
let turn = "X";
let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
let activeListeners = false;

function addTilesListeners() {
    if (!activeListeners) {
        tiles.forEach((tile) => {
            tile.addEventListener("click", () => {
                if (makeMove(tile)) {
                    if (!checkWin(turn)) {
                        changeTurn();
                        checkDraw();
                    }
                }
            });
        });
    }
}

function removeTilesListeners() {
    tiles.forEach((tile) => {
        const oldTile = tile;
        const newTile = oldTile.cloneNode(true);
        oldTile.parentNode.replaceChild(newTile, oldTile);
    });
    tiles = document.querySelectorAll(".tile");
    activeListeners = false;
}

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        gameInfoText.innerText = "Player O's turn";
    } else {
        turn = "X";
        gameInfoText.innerText = "Player X's turn";
    }
}

function checkDraw() {
    let filledTiles = 0;
    gameBoard.forEach((row) => {
        row.forEach((tile) => {
            if (tile === null) {
                filledTiles++;
            }
        });
    });
    if (filledTiles > 0) {
    } else {
        removeTilesListeners();
        gameInfoText.innerText = "It's a draw!";
    }
}

function checkWin(op) {
    if (
        (gameBoard[0][0] === op &&
            gameBoard[0][1] === op &&
            gameBoard[0][2] === op) ||
        (gameBoard[1][0] === op &&
            gameBoard[1][1] === op &&
            gameBoard[1][2] === op) ||
        (gameBoard[2][0] === op &&
            gameBoard[2][1] === op &&
            gameBoard[2][2] === op) ||
        (gameBoard[0][0] === op &&
            gameBoard[1][0] === op &&
            gameBoard[2][0] === op) ||
        (gameBoard[0][1] === op &&
            gameBoard[1][1] === op &&
            gameBoard[2][1] === op) ||
        (gameBoard[0][2] === op &&
            gameBoard[1][2] === op &&
            gameBoard[2][2] === op) ||
        (gameBoard[0][0] === op &&
            gameBoard[1][1] === op &&
            gameBoard[2][2] === op) ||
        (gameBoard[0][2] === op &&
            gameBoard[1][1] === op &&
            gameBoard[2][0] === op)
    ) {
        removeTilesListeners();
        gameInfoText.innerText = `Player ${op} won!`;
        return true;
    }
    return false;
}

function addMoveToGameBoard(index) {
    if (index < 3) {
        gameBoard[0][index % 3] = turn;
    } else if (index < 6) {
        gameBoard[1][index % 3] = turn;
    } else {
        gameBoard[2][index % 3] = turn;
    }
}

function makeMove(tile) {
    if (tile.innerText === "") {
        if (turn === "X") {
            tile.innerText = "X";
        } else {
            tile.innerText = "O";
        }
        addMoveToGameBoard(tile.dataset.index);
        return true;
    }
    return false;
}

function restartGame() {
    turn = null;
    changeTurn();
    clearTiles();
    gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    addTilesListeners();
}

function clearTiles() {
    tiles.forEach((tile) => {
        tile.innerText = "";
    });
}

addTilesListeners();

restartButton.addEventListener("click", restartGame);

// tilesText.forEach((tileText) => {
//     if (tileText.innerText === "X") {
//         tileText.style.transform = "scaleX(140%)";
//     }
// });
