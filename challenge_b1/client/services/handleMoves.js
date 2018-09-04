angular.module('chess-board')
  .service('handleMoves', function() {
    this.select = (board, player, row, col, prev, colRef) => {
      let regexp;
      let pos = board[col][row];
      let moves;
      if (prev.row) {
        this.clearPrev(board, player, prev, colRef);
      }
      player === 'white' ? regexp = /^w/ : regexp = /^b/;
      if (pos.match(regexp)) {
        if (pos.match(/pawn/)) { moves = this.pawnMoves(board, player, row, col, colRef); }
        for (let move of moves) {
          board[move[1]][move[0]] += 'possible';
        }
        prev.row = row;
        prev.col = col;
      } else if (pos.includes('possible')) {
        board[col][row] = board[prev.col][prev.row];
        board[prev.col][prev.row] = '';
        prev.row = undefined;
        prev.col = undefined;
      }
    }

    this.pawnMoves = (board, player, row, col, colRef) => {
      let results = [];
      let row1, row2, regexp;
      if (player === 'white') {
        row1 = row + 1;
        row2 = row + 2;
        regexp = /^b/;
      } else {
        row = 8 - row;
        row1 = row - 1;
        row2 = row - 2;
        regexp = /^w/;
      }
      if (!board[col][row1].includes('-')) {
        results.push([row1, col]);
        if (row === 1 && !board[col][row2].includes('-')) {
          results.push([row2, col]);
        }
      }
      if (colRef[colRef.indexOf(col) + 1] && board[colRef[colRef.indexOf(col) + 1]][row1].match(regexp)) {
        results.push([row1, colRef[colRef.indexOf(col) + 1]]);
      }
      if (colRef[colRef.indexOf(col) - 1] && board[colRef[colRef.indexOf(col) - 1]][row1].match(regexp)) {
        results.push([row1, colRef[colRef.indexOf(col) - 1]]);
      }
      return results;
    };

    this.clearPrev = (board, player, { row, col }, colRef) => {
      let pos = board[col][row];
      let moves;
      if (pos.match(/pawn/)) { moves = this.pawnMoves(board, player, row, col, colRef); }
      for (let move of moves) {
        board[move[1]][move[0]] = board[move[1]][move[0]].slice(0, -8);
      }
    };
  });