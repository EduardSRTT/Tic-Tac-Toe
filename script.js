let playersTurn = "X";
let myCases = document.querySelectorAll(".square");
let gameOver = false;
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

function changeSign() {
    if (playersTurn === "X") {
        playersTurn = "O";
    } else {
        playersTurn = "X";
    }
}

function changePlayerTurn() {
    if (playersTurn === "X") {
        document.getElementById("turn").innerText = "O's turn";
    } else {
        document.getElementById("turn").innerText = "X's turn";
    }
}

function haveWinner() {
    for (let i = 0; i < 3; ++i) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != "") {
            return true;
        }
    }
    for (let i = 0; i < 3; ++i) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != "") {
            return true;
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != "") {
        return true;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != "") {
        return true;
    }
    return false;
}

function haveDraw() {
    let fullBoard = true;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (board[i][j] === "") {
                fullBoard = false;
            }
        }
    }
    if (fullBoard === true && haveWinner() === false) {
        return true;
    }
    return false;
}

function replayGame() {
    gameOver = false;
    playersTurn = "X";
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    document.getElementById("replay").style.display = "none";
    document.getElementById("turn").innerText = "X's turn";
    document.getElementById("turn").style.color = "black";
    myCases.forEach(element => {
        element.innerText = "";
    });
}

myCases.forEach(element => {
    element.addEventListener("click", function() {
        let row = parseInt(element.getAttribute("row"));
        let column = parseInt(element.getAttribute("col"));
        if (element.innerText === "" && gameOver === false) {
            element.innerText = playersTurn;
            element.style.backgroundColor = "whitesmoke";
            board[row][column] = playersTurn;
            if (haveWinner() === true) {
                document.getElementById("turn").innerText = playersTurn + " win";
                document.getElementById("turn").style.color = "green";
                document.getElementById("replay").style.display = "flex";
                gameOver = true;                
            } else if (haveDraw() === true) {
                document.getElementById("turn").innerText = "Draw";
                document.getElementById("turn").style.color = "orange";
                document.getElementById("replay").style.display = "flex";
                gameOver = true;
            }
            if (gameOver === false){
                changePlayerTurn();
                changeSign();
            }
        }
    });
});