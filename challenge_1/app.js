/***********************
 * view
 * presentation code
 ***********************/
const view = {
  placePiece: (row, col, players, turns) => {
    document.getElementById(`${row},${col}`).innerHTML = players[turns % 2];
    console.log(`turn ${turns + 1}, ${players[turns % 2]} places: ${row}, ${col}`);
  },
  isValidPlacement: (row, col) => {
    return document.getElementById(`${row},${col}`).innerHTML === '';
  },
  clearBoard: () => {
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        document.getElementById(`${i},${j}`).innerHTML = '';
      }
    }
    document.getElementById('result').innerHTML = '';
    document.getElementById('replay').style = 'display: none';
  },
  endOfGame: (winner, tally) => {
    winner
      ? document.getElementById('result').innerHTML = `${winner} is the WINNER!`
      : document.getElementById('result').innerHTML = `No winner, TIE game`;
    document.getElementById('tally').innerHTML = `X: ${tally[0]} | O: ${tally[1]}`
    document.getElementById('replay').style = 'display: block'
  }
};

// view exports
const { placePiece, isValidPlacement, clearBoard, endOfGame } = view;


/***********************
 * model
 * update app state
 ***********************/
const state = {
  order: {
    x: ['X', 'O'],
    o: ['O', 'X']
  },
  players: ['X', 'O'],
  boardX: [0, 0, 0],
  boardO: [0, 0, 0],
  turns: 0,
  numOfWins: [0, 0],
  prevWinner: null,
  isEndOfGame: false
};

// access to state object in model module
const { order, boardX, boardO, numOfWins } = state
var { players, turns, prevWinner, isEndOfGame } = state;

const modelHelpers = {
  rowCheck: (row) => {
    let result = false;
    turns % 2 === 0
      ? result = boardX[row] === 7
      : result = boardO[row] === 7;
    return result;
  },
  colCheck: (col) => {
    let result = false;
    turns % 2 === 0
      ? result = boardX[0] & boardX[1] & boardX[2] & 1 << col
      : result = boardO[0] & boardO[1] & boardO[2] & 1 << col;
    return result;
  },
  diagCheck: (row, col) => {
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
}

// allow for other module to use, normally just helpers in same module
const { rowCheck, colCheck, diagCheck } = modelHelpers;

// model module 1
const model = {
  updateBoard: (row, col) => {
    placePiece(row + 1, col + 1, players, turns);
    turns % 2 === 0
      ? boardX[row] |= (1 << col)
      : boardO[row] |= (1 << col);
  },
  resetState: () => {
    for (let i = 0; i < 3; i++) {
      boardX[i] = 0;
      boardO[i] = 0;
    }
    turns = 0;
    isEndOfGame = false;
  },
  checkBoardConditions: (row, col) => {
    if (rowCheck(row) || colCheck(col) || diagCheck(row, col)) {
      console.log(`${players[turns % 2]} is the winner`);
      isEndOfGame = true;
      prevWinner = players[turns % 2];
      if (prevWinner === 'X') {
        players = order.o
        numOfWins[0]++;
      } else {
        players = order.x;
        numOfWins[1]++;
      }
      endOfGame(players[turns % 2], numOfWins);
    }
    if (turns === 8 && !isEndOfGame) {
      endOfGame(null, numOfWins);
    }
    turns++;
  }
};

// model exports
const { updateBoard, resetState, checkBoardConditions } = model;


/***********************
 * controller
 * request handler
 ***********************/

const requestHandler = {
  handlePiecePlacement: (row, col) => {
    if (isValidPlacement(row, col) && !isEndOfGame) {
      updateBoard(row - 1, col -1);
      checkBoardConditions(row - 1, col - 1);
    } else {
      console.log('Invalid move')
    }
  },
  handleReset: () => {
    clearBoard();
    resetState();
  }
};

const { handlePiecePlacement, handleReset } = requestHandler;