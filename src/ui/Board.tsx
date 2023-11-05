import { isCellActive } from "../lib/boardLogic";
import { Board as BoardType } from "../lib/boardLogic";
import "./Board.css";

type BoardProps = {
  board: BoardType;
  onClickCell: (rowIndex: number, colIndex: number) => void;
};

function Board({ board, onClickCell }: BoardProps) {
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

export default Board;
