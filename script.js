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
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
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
        })
    });
    const markAdded = () => marks++;
    return {board, markAdded};
})();