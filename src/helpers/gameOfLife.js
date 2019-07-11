export const timeStep = board => {
  const newBoard = board.map((row, i) =>
    row.map((cell, j) => checkCell(i, j, board))
  );
  return newBoard;
};

const checkCell = (i, j, board) => {
  if (board[i][j] === 0) {
    return handleDeadCell(i, j, board);
  } else {
    return handleLiveCell(i, j, board);
  }
};

const countLiveNeighbors = (i, j, board) => {
  let count = 0;
  if (i > 0) {
    count += board[i - 1][j];
    if (j > 0) {
      count += board[i - 1][j - 1];
    }
    if (j < board[0].length - 1) {
      count += board[i - 1][j + 1];
    }
  }
  if (i < board.length - 1) {
    count += board[i + 1][j];
    if (j > 0) {
      count += board[i + 1][j - 1];
    }
    if (j < board[0].length - 1) {
      count += board[i + 1][j + 1];
    }
  }
  if (j > 0) {
    count += board[i][j - 1];
  }
  if (j < board[0].length - 1) {
    count += board[i][j + 1];
  }
  return count;
};

const handleDeadCell = (i, j, board) => {
  if (countLiveNeighbors(i, j, board) === 3) {
    return 1;
  }
  return 0;
};

const handleLiveCell = (i, j, board) => {
  const count = countLiveNeighbors(i, j, board);
  if (count === 2 || count === 3) {
    return 1;
  }
  return 0;
};
