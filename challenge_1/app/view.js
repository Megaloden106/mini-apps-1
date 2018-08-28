/***********************
 * view
 * presentation code
 ***********************/

const view = {
  placePiece: (row, col, players, turns) => {
    let src = document.getElementById(`${row},${col}`);
    let img = document.createElement('img');
    players[turns % 2] === 'X'
      ? img.src = 'images/X.png'
      : img.src = 'images/O.png';
    img.style.height = '200px';
    img.style.width = '200px';
    src.appendChild(img);
    document.getElementById('currMove').innerHTML = `Turn ${turns + 1}: ${players[turns % 2]} places on ${row}, ${col}`;
  },
  isValidPlacement: (row, col) => {
    return document.getElementById(`${row},${col}`).innerHTML === '';
  },
  clearBoard: (players) => {
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        document.getElementById(`${i},${j}`).innerHTML = '';
      }
    }
    document.getElementById('result').innerHTML = '';
    document.getElementById('replay').style = 'display: none';
    document.getElementById('currMove').innerHTML = `Turn 0: ${players[0]} starts`;
  },
  endOfGame: (winner, tally) => {
    winner
      ? document.getElementById('result').innerHTML = `${winner} is the WINNER!`
      : document.getElementById('result').innerHTML = `No winner, TIE game`;
    document.getElementById('tally').innerHTML = `X: ${tally[0]} | O: ${tally[1]}`;
    document.getElementById('replay').style = 'display: block';
  }
};

const { placePiece, isValidPlacement, clearBoard, endOfGame } = view;