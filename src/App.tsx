import { useState } from 'react'
import { clickCell, initRandomBoard } from './lib/boardLogic'
import type { Board as BoardType } from './lib/boardLogic'
import Board from './ui/Board'
import './App.css'

const BoardSize = 6 as const

function App() {
  const [board, setBoard] = useState<BoardType>(initRandomBoard(BoardSize))

  const onClickCell = (rowIndex: number, colIndex: number) => {
    setBoard(clickCell(board, rowIndex, colIndex))
  }

  return (
    <div className="flex">
      <Board board={board} onClickCell={onClickCell} />
    </div>
  )
}

export default App
