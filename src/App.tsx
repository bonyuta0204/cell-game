import { useState } from "react";
import { initBoard, clickCell } from "./lib/boardLogic";
import type { Board as BoardType } from "./lib/boardLogic";
import Board from "./ui/Board";
import "./App.css";

const BoardSize = 6 as const;

function App() {
  const [board, setBoard] = useState<BoardType>(initBoard(BoardSize));

  const onClickCell = (rowIndex: number, colIndex: number) => {
    setBoard(clickCell(board, rowIndex, colIndex));
  };

  return (
    <div className="board">
      <Board board={board} onClickCell={onClickCell} />
    </div>
  );
}

export default App;
