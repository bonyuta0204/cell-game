import Board from "../ui/Board";

type Cell = -1 | 1;

export type Board = Cell[][];
export type Action = {
  rowIndex: number;
  colIndex: number;
};

const activeCell: Cell = 1;
const deactiveCell: Cell = -1;

function toggleCell(cell: Cell): Cell {
  return (cell * -1) as Cell;
}

const isCellExist = (board: Board, rowIndex: number, cellIndex: number) =>
  rowIndex >= 0 &&
  rowIndex < board.length &&
  cellIndex >= 0 &&
  cellIndex < board[rowIndex].length;

export function getAvailableActions(board: Board): Action[] {
  return board.flatMap((row, rowIndex) =>
    row.map((_, colIndex) => ({ rowIndex, colIndex }))
  );
}

export const isSolved = (board: Board): boolean => {
  return board.every((row) => row.every((cell) => cell === deactiveCell));
};

export function isCellActive(cell: Cell): boolean {
  return cell === activeCell;
}

export const initEmptyBoard = (boardSize: number): Board => {
  const board: Board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => activeCell)
  );
  return board;
};

export const initRandomBoard = (boardSize: number): Board => {
  let board: Board = initEmptyBoard(boardSize);
  const actions = getAvailableActions(board);

  for (let i = 0; i < 10; i++) {
    const action = actions[Math.floor(Math.random() * actions.length)];
    board = clickCell(board, action.rowIndex, action.colIndex);
  }
  return board;
};

export const clickCell = (
  board: Board,
  rowIndex: number,
  cellIndex: number
) => {
  const newBoard = board.map((row) => [...row]);

  newBoard[rowIndex][cellIndex] = toggleCell(newBoard[rowIndex][cellIndex]);

  if (isCellExist(board, rowIndex - 1, cellIndex)) {
    newBoard[rowIndex - 1][cellIndex] = toggleCell(
      newBoard[rowIndex - 1][cellIndex]
    );
  }

  if (isCellExist(board, rowIndex + 1, cellIndex)) {
    newBoard[rowIndex + 1][cellIndex] = toggleCell(
      newBoard[rowIndex + 1][cellIndex]
    );
  }

  if (isCellExist(board, rowIndex, cellIndex + 1)) {
    newBoard[rowIndex][cellIndex + 1] = toggleCell(
      newBoard[rowIndex][cellIndex + 1]
    );
  }

  if (isCellExist(board, rowIndex, cellIndex - 1)) {
    newBoard[rowIndex][cellIndex - 1] = toggleCell(
      newBoard[rowIndex][cellIndex - 1]
    );
  }

  return newBoard;
};
