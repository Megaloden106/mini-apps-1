class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'r',
      redBoard: [0, 0, 0, 0, 0, 0],
      blackBoard: [0, 0, 0, 0, 0, 0],
      winner: false
    }
  }

  handleColClick(col) {
    if (col === 0 || this.state.winner) { return }
    let targetRow = 0;
    col = col - 1;
    while (targetRow < 6 && (this.state.redBoard[targetRow] | this.state.blackBoard[targetRow]) & 1 << col) {
      targetRow++;
    }
    if (targetRow > 5) { return console.log('Invalid Spot') }
    let newBoard;
    if (this.state.player === 'r') {
      newBoard = this.state.redBoard.slice();
      newBoard[targetRow] |= 1 << col;
      this.setState({
        player: 'b',
        redBoard: newBoard
      }, () => {
        this.checkWinner(targetRow, col);
      });
    } else {
      newBoard = this.state.blackBoard.slice();
      newBoard[targetRow] |= 1 << col;
      this.setState({
        player: 'r',
        blackBoard: newBoard
      }, () => {
        this.checkWinner(targetRow, col);
      });
    }
   
  }

  checkWinner(row, col) {
    let board = [];
    for (let i = 0; i < 6; i++) {
      board[i] = (this.state.redBoard[i] | this.state.blackBoard[i]).toString(2);
    }
    let currBoard;
    this.state.player !== 'r' ? currBoard = this.state.redBoard : currBoard = this.state.blackBoard;
    if (this.checkRow(currBoard, row) || this.checkCol(currBoard, row, col) ||
        this.checkMajor(currBoard, row, col) || this.checkMinor(currBoard, row, col)) {
      let winner;
      this.state.player === 'r' ? winner = 'b' : winner = 'r';
      this.setState({
        winner: winner
      });
    }
    if ((this.state.redBoard[5] | this.state.blackBoard[5]) === (1 << 7) - 1) {
      this.setState({
        winner: 'TIE'
      });
    }
  }

  checkRow(board, row) {
    let currRow = board[row];
    let compare = (1 << 4) - 1;
    for (let i = 0; i < 4; i++, compare <<= 1) {
      if ((currRow & compare) === compare) { return true }
    }
    return false;
  }

  checkCol(board, row, col) {
    if (row < 3) { return false }
    let currCol = 0;
    let compare = (1 << 4) - 1;
    for (let row = 0; row < 6; row++) {
      if (board[row] & 1 << col) { currCol |= 1 << row }
    }
    for (let i = 0; i < 4; i++, compare <<= 1) {
      if (currCol === compare) { return true }
    }
    return false;
  }

  checkMajor(board, row, col) {
    if (row < 3) { return false }
    let currMajor = 0;
    let compare = (1 << 4) - 1;
    row += col;
    for (let col = 0; col < 7; col++, row--) {
      if (board[row] & 1 << col) { currMajor |= 1 << col }
    }
    for (let i = 0; i < 4; i++, compare <<= 1) {
      if ((currMajor & compare) === compare) { return true }
    }
    return false;
  }

  checkMinor(board, row, col) {
    if (row < 3) { return false }
    let currMinor = 0;
    let compare = (1 << 4) - 1;
    row += 6 - col;
    for (let col = 6; col >= 0; col--, row--) {
      if (board[row] & 1 << col) { currMinor |= 1 << col }
    }
    for (let i = 0; i < 4; i++, compare <<= 1) {
      if ((currMinor & compare) === compare) { return true }
    }
    return false;
  }

  render() {
    return (
      <div>
        <table>
          <Board
            red={this.state.redBoard}
            black={this.state.blackBoard}
            handleColClick={this.handleColClick.bind(this)}
          />
        </table>
        <Console 
          winner={this.state.winner}
          player={this.state.player}
        />
      </div>
    );
  }
}

const Console = ({ winner, player }) => {
  let text = '';
  player === 'r' ? player = 'RED' : player = 'BLACK';
  if (!winner) {
    text = `${player}'s turn`
  } else if (winner !== 'TIE') {
    winner === 'r' ? winner = 'RED' : winner = 'BLACK';
    text = `${winner} has won the game!`
  } else {
    text = `TIE GAME...`
  }
  return (
    <h1>{text}</h1>
  );
}

const Board = ({ red, black, handleColClick }) => {
  let rowMap = {
    5: ['','','','','','',''],
    4: ['','','','','','',''],
    3: ['','','','','','',''],
    2: ['','','','','','',''],
    1: ['','','','','','',''],
    0: ['','','','','','','']
  }
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (red[row] & 1 << col) { rowMap[row][col] = 'r' }
      if (black[row] & 1 << col) { rowMap[row][col] = 'b' }
    }
  }
  return (
    <thead>
      <BoardHeader/>
      {[5,4,3,2,1,0].map(row =>
        <BoardRow
          rowId={[row]}
          rowMap={rowMap[row]}
          handleColClick={handleColClick}
          key={row}
        />
      )}
    </thead>
  )
};

const BoardRow = ({ rowId, rowMap, handleColClick }) => (
  <tr>
    {rowId.concat(rowMap).map((col, i) => 
      <td
        className={col}
        key={i}
        onClick={() => handleColClick(i)}
      >{col}</td>
    )}
  </tr>
);

const BoardHeader = () => (
  <tr>
    {['',0,1,2,3,4,5,6].map(col => 
      <th key={col}>{col}</th>
    )}
  </tr>
);

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);