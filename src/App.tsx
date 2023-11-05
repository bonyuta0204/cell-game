import { useState } from "react";
import { initBoard, clickCell, isCellActive } from "./lib/boardLogic";
import type { Board } from "./lib/boardLogic";
import "./App.css";

function App() {
  const [board, setBoard] = useState<Board>(initBoard());

  const onClickCell = (rowIndex: number, colIndex: number) => {
    setBoard(clickCell(board, rowIndex, colIndex));
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row">
          {row.map((cell, colIndex) => (
            <div
              className="cell"
              onClick={() => onClickCell(rowIndex, colIndex)}
            >
              <div className={isCellActive(cell) ? "active" : "deactive"}></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
