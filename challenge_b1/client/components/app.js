angular.module('chess-board', [])
  .component('app', {
    controller: function(handleMoves) {
      this.rows = [8, 7, 6, 5, 4, 3, 2, 1];
      this.cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      this.matrix = {
        a: ['','w-pawn ','','','','','b-pawn ',''],
        b: ['','w-pawn ','','','','','b-pawn ',''],
        c: ['','w-pawn ','','','','','b-pawn ',''],
        d: ['','w-pawn ','','','','','b-pawn ',''],
        e: ['','w-pawn ','','','','','b-pawn ',''],
        f: ['','w-pawn ','','','','','b-pawn ',''],
        g: ['','w-pawn ','','','','','b-pawn ',''],
        h: ['','w-pawn ','','','','','b-pawn ',''],
      };
      this.currentPlayer = 'white';
      this.prevSelect = {};

      this.onClick = (row, col) => {
        handleMoves.select(this.matrix, this.currentPlayer, row, col, this.prevSelect, this.cols);
        // if (!this.prevSelect.row) {
        //   this.currentPlayer === 'white'
        //     ? this.currentPlayer = 'black'
        //     : this.currentPlayer = 'white'
        // }
        // console.log(this.currentPlayer)
      }
    },
    templateUrl: 'templates/app.html'
  })