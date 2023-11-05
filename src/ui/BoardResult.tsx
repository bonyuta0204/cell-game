import Board from './Board'
import { GameNode } from '../lib/solver'
import { Action } from '../lib/boardLogic'

type BoardResultProps = {
  result: GameNode
}

export default function BoardResult({ result }: BoardResultProps) {
  return (
    <div>
      {result.boardHistory.map((board, index) => {
        const action = result.actionHistory[index]
        return (
          <div className="py-4">
            {action && <ActionResult action={action} />}
            <Board board={board} key={index} />
          </div>
        )
      })}
    </div>
  )
}

function ActionResult({ action }: { action: Action }) {
  return (
    <p>
      row: {action.rowIndex}, col: {action.colIndex}
    </p>
  )
}
