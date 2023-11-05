import { useState } from 'react'
import { clickCell, initRandomBoard } from './lib/boardLogic'
import type { Board as BoardType } from './lib/boardLogic'
import Board from './ui/Board'
import Button from './ui/Button'
import './App.css'
import { GameNode } from './lib/solver'
import BoardResult from './ui/BoardResult'

const BoardSize = 6 as const

function App() {
  const [board, setBoard] = useState<BoardType>(initRandomBoard(BoardSize))
  const [solvedResult, setSolvedResult] = useState<GameNode>()

  const onClickCell = (rowIndex: number, colIndex: number) => {
    setBoard(clickCell(board, rowIndex, colIndex))
  }

  const onClickSolve = () => {
    const solverWorker = new Worker(
      new URL('./workers/solver.ts', import.meta.url),
      { type: 'module' }
    )

    solverWorker.postMessage(board)
    solverWorker.onmessage = (event) => {
      const result: GameNode = event.data
      setSolvedResult(result)
    }
  }

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="flex flex-grow flex-col items-center">
        <div className="flex flex-row gap-6 justify-center p-4">
          <Button
            label="Reset"
            onClick={() => setBoard(initRandomBoard(BoardSize))}
          />
          <Button label="Solve" onClick={onClickSolve} />
        </div>

        <Board board={board} onClickCell={onClickCell} />
      </div>
      <div className="flex flex-grow justify-center pt-4 overflow-scroll">
        {solvedResult && <BoardResult result={solvedResult} />}
      </div>
    </div>
  )
}

export default App
