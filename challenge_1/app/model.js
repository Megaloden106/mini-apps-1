/***********************
 * model
 * update app state
 ***********************/

const order = {
  x: ['X', 'O'],
  o: ['O', 'X']
};
var players = order.x;
const boardX = [0, 0, 0];
const boardO = [0, 0, 0];
var turns = 0;
const numOfWins = [0, 0];
var prevWinner = null;
var isEndOfGame = false;

rowCheck = (row) => {
  let result = false;
  turns % 2 === 0
    ? result = boardX[row] === 7
    : result = boardO[row] === 7;
  return result;
}

colCheck = (col) => {
  let result = false;
  turns % 2 === 0
    ? result = boardX[0] & boardX[1] & boardX[2] & 1 << col
    : result = boardO[0] & boardO[1] & boardO[2] & 1 << col;
  return result;
}

diagCheck = (row, col) => {
  let result = false;
  if (row === col) {
    turns % 2 === 0
      ? result = boardX[0] & 1 && boardX[1] & 2 && boardX[2] & 4
      : result = boardO[0] & 1 && boardO[1] & 2 && boardO[2] & 4;
  }
  if (row + col === 2 && !result) {
    turns % 2 === 0
      ? result = boardX[0] & 4 && boardX[1] & 2 && boardX[2] & 1
      : result = boardO[0] & 4 && boardO[1] & 2 && boardO[2] & 1;
  }
  return result;
}

const model = {
  updateBoard: (row, col) => {
    placePiece(row + 1, col + 1, players, turns);
    turns % 2 === 0
      ? boardX[row] |= (1 << col)
      : boardO[row] |= (1 << col);
  },
  resetState: () => {
    clearBoard(players);
    for (let i = 0; i < 3; i++) {
      boardX[i] = 0;
      boardO[i] = 0;
    }
    turns = 0;
    isEndOfGame = false;
  },
  checkBoardConditions: (row, col) => {
    if (rowCheck(row) || colCheck(col) || diagCheck(row, col)) {
      isEndOfGame = true;
      prevWinner = players[turns % 2];
      prevWinner === 'X' ? numOfWins[0]++ : numOfWins[1]++;
      endOfGame(players[turns % 2], numOfWins);
      prevWinner === 'X' ? players = order.o : players = order.x;
    }
    if (turns === 8 && !isEndOfGame) {
      endOfGame(null, numOfWins);
    }
    turns++;
  }
};

const { updateBoard, resetState, checkBoardConditions } = model;