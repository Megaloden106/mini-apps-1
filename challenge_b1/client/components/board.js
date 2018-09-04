angular.module('chess-board')
  .component('board', {
    bindings: {
      rows: '<',
      cols: '<',
      matrix: '<',
      onClick: '<'
    },
    templateUrl: 'templates/board.html'
  })