const Gameboard = (() => {
    let marks = 0;
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    const markAdded = () => marks++;
    return {board, markAdded};
})();

const Player = (mark) => {
    const addMark = (row,column) => {
        Gameboard.board[row][column] = mark;
        Gameboard.markAdded();
    }
    return {addMark};
}

const playerOne = Player('X');
const playerTwo = Player('O');