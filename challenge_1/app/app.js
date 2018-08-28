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
    resetState();
  }
};

// export for html to use
const { handlePiecePlacement, handleReset } = requestHandler;