import { isCellActive } from "../lib/boardLogic";
import { Board as BoardType } from "../lib/boardLogic";
import "./Board.css";

type BoardProps = {
  board: BoardType;
  onClickCell: (rowIndex: number, colIndex: number) => void;
};

function Board({ board, onClickCell }: BoardProps) {
  return (
    <div className="flex">
      {board.map((row, rowIndex) => (
        <div className="flex-row">
          {row.map((cell, colIndex) => (
            <div
              className="w-16 h-16 border border-gray-400 box-border"
              onClick={() => onClickCell(rowIndex, colIndex)}
            >
              <div
                className={
                  isCellActive(cell)
                    ? "bg-white w-full h-full"
                    : "bg-black w-full h-full"
                }
              ></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
