const BoardSize = 5;

type Cell = -1 | 1;
export type Board = Cell[][];

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

export function isCellActive(cell: Cell): boolean {
  return cell === activeCell;
}

export const initBoard = (): Board => {
  const board: Board = Array.from({ length: BoardSize }, () =>
    Array.from({ length: BoardSize }, () => deactiveCell)
  );
  board[0][0] = activeCell;
  return board;
};

export const clickCell = (
  board: Board,
  rowIndex: number,
  cellIndex: number
) => {
  const newBoard = [...board];
  newBoard[rowIndex][cellIndex] = toggleCell(newBoard[rowIndex][cellIndex]);

  if (isCellExist(board, rowIndex - 1, cellIndex - 1)) {
    newBoard[rowIndex - 1][cellIndex - 1] = toggleCell(
      newBoard[rowIndex - 1][cellIndex - 1]
    );
  }

  if (isCellExist(board, rowIndex + 1, cellIndex - 1)) {
    newBoard[rowIndex + 1][cellIndex - 1] = toggleCell(
      newBoard[rowIndex + 1][cellIndex - 1]
    );
  }

  if (isCellExist(board, rowIndex - 1, cellIndex + 1)) {
    newBoard[rowIndex - 1][cellIndex + 1] = toggleCell(
      newBoard[rowIndex - 1][cellIndex + 1]
    );
  }

  if (isCellExist(board, rowIndex + 1, cellIndex + 1)) {
    newBoard[rowIndex + 1][cellIndex + 1] = toggleCell(
      newBoard[rowIndex + 1][cellIndex + 1]
    );
  }

  return newBoard;
};
