const players = ['X', 'O'];
const boardX = [0, 0, 0];
const boardO = [0, 0, 0];
var turns = 0;
var winner = false;

const placePiece = (row, col) => {
  let location = document.getElementById(`${row},${col}`);
  if (location.innerHTML === '' && !winner) {
    console.log(`turn ${turns + 1}, ${players[turns % 2]} places: ${row}, ${col}`);
    location.innerHTML = players[turns % 2];
    updateBoard(row - 1, col - 1);
    turns++;
  } else {
    console.log('Invalid move, go again')
  }
};

const updateBoard = (row, col) => {
  turns % 2 === 0
    ? boardX[row] |= (1 << col)
    : boardO[row] |= (1 << col);
  if (rowCheck(row) || colCheck(col) || diagCheck(row, col)) {
    console.log(`${players[turns % 2]} is the winner`);
    document.getElementById('result').innerHTML = `${players[turns % 2]} is the WINNER!`;
    document.getElementById('replay').style = 'display: block';
    winner = true;
  }
  if (turns === 8 && !winner) {
    document.getElementById('result').innerHTML = `No winner, TIE game`;
    document.getElementById('replay').style = 'display: block';
  }
};

const clearBoard = () => {
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      document.getElementById(`${i},${j}`).innerHTML = '';
    }
    boardX[i - 1] = 0;
    boardO[i - 1] = 0;
  }
  turns = 0;
  winner = false;
  document.getElementById('result').innerHTML = '';
  document.getElementById('replay').style = 'display: none';
};

const rowCheck = (row) => {
  let result = false;
  turns % 2 === 0
    ? result = boardX[row] === 7
    : result = boardO[row] === 7;
  return result;
};

const colCheck = (col) => {
  let result = false;
  turns % 2 === 0
    ? result = boardX[0] & boardX[1] & boardX[2] & 1 << col
    : result = boardO[0] & boardO[1] & boardO[2] & 1 << col;
  return result;
};

const diagCheck = (row, col) => {
  let result = false;
  if (row === col) { result = majorCheck(); }
  if (row + col === 2 && !result) { result = minorCheck(); }
  return result;
};

const majorCheck = () => {
  let result = false;
  turns % 2 === 0
    ? result = boardX[0] & 1 && boardX[1] & 2 && boardX[2] & 4
    : result = boardO[0] & 1 && boardO[1] & 2 && boardO[2] & 4;
  return result;
};

const minorCheck = () => {
  let result = false;
  turns % 2 === 0
    ? result = boardX[0] & 4 && boardX[1] & 2 && boardX[2] & 1
    : result = boardO[0] & 4 && boardO[1] & 2 && boardO[2] & 1;
  return result;
};