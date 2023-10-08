const Player = (mark) => {
    const addMark = (row,column) => {
        Gameboard.board[row][column] = mark;
        Gameboard.markAdded();
    }
    const getMark = () => {return mark};
    return {addMark, getMark};
}

const playerOne = Player('X');
const playerTwo = Player('O');

const Gameboard = (() => {
    let marks = 0;
    let gameEnd = false;
    let playerTurn = playerOne;
    let board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    const checkRowsCols = (r1,c1,r2,c2,r3,c3) => {
        const firstMark = board[r1][c1];
        const secondMark = board[r2][c2];
        const thirdMark = board[r3][c3];

        if(firstMark === secondMark && secondMark === thirdMark) {
            gameEnd = true;
        }
    }

    const checkColumn = (col) => {
        checkRowsCols(0,col,1,col,2,col);
    }

    const checkRow = (row) => {
        checkRowsCols(row,0,row,1,row,2);
    }

    const checkDiagonal = () => {
        checkRowsCols(0,2,1,1,2,0);
        checkRowsCols(0,0,1,1,2,2);
    }

    const boardButtons = document.querySelectorAll('.board button');
    boardButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const row = btn.dataset.row;
            const col = btn.dataset.col;
            playerTurn.addMark(row,col);
            btn.textContent = playerTurn.getMark();

            if (playerTurn === playerOne) {
                playerTurn = playerTwo;
            } else {
                playerTurn = playerOne;
            }
            
            if(marks >= 5) {
                checkRow(row);
                checkColumn(col);
                checkDiagonal();
            }
            

            if(marks === 9) {
                gameEnd = true;
            }

            if(gameEnd) {
                boardButtons.forEach((btnBoard) => {
                    btnBoard.textContent = '';
                    btnBoard.disabled = false;
                });
                board.forEach((row) => {
                    row.forEach((cell, colIndex) => {
                        row[colIndex] = ''; // Set each cell to an empty string
                    });
                });
                marks = 0;
                gameEnd = false;
                playerTurn = playerOne;
            } else {
                btn.disabled = true;
            }
        })
    });

    const markAdded = () => marks++;
    return {board, markAdded, checkDiagonal,checkRowsCols, gameEnd};
})();