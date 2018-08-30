console.log('This is connected')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: 'r',
      redBoard: [0, 0, 0, 0, 0, 0],
      blackBoard: [0, 0, 0, 0, 0, 0]
    }
  }

  handleColClick(col) {
    if (col === 0) { return }
    let targetRow = 0;
    col = col - 1;
    console.log('Finding row');
    while (targetRow < 6 && (this.state.redBoard[targetRow] | this.state.blackBoard[targetRow]) & 1 << col) {
      targetRow++;
    }
    if (targetRow > 5) { return console.log('Invalid Spot') }
    let newBoard;
    console.log('Changing state');
    if (this.state.player === 'r') {
      newBoard = this.state.redBoard.slice();
      newBoard[targetRow] |= 1 << col;
      this.setState({
        player: 'b',
        redBoard: newBoard
      });
    } else {
      newBoard = this.state.blackBoard.slice();
      newBoard[targetRow] |= 1 << col;
      this.setState({
        player: 'r',
        blackBoard: newBoard
      });
    }
    console.log('Rendering combined board state')
    let board = [];
    for (let i = 0; i < 6; i++) {
      board[i] = (this.state.redBoard[i] | this.state.blackBoard[i]).toString(2);
    }
    console.log(board);
    this.checkWinner(targetRow, col);
  }

  checkWinner(row, col) {
    let currBoard;
    this.state.player === 'r' ? currBoard = this.state.redBoard : currBoard = this.state.blackBoard;

  }

  render() {
    return (
      <Board
        red={this.state.redBoard}
        black={this.state.blackBoard}
        handleColClick={this.handleColClick.bind(this)}
      />
    );
  }
}

const Board = ({ red, black, handleColClick }) => {
  console.log('Rendering Board Component');
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

const BoardRow = ({ rowId, rowMap, handleColClick }) => {
  // console.log(`Rendering Row ${rowId}: ${rowMap}`)
  return (
    <tr>
      {rowId.concat(rowMap).map((col, i) => 
        <td
          className={col}
          key={i}
          onClick={(e) => handleColClick(i, e)}
        >{col}</td>
      )}
    </tr>
  );
}

const BoardHeader = () => (
  <tr>
    {[0,1,2,3,4,5,6,7].map(col => 
      <th key={col}>{col}</th>
    )}
  </tr>
);

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);