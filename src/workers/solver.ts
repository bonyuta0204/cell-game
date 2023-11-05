import { Board } from '../lib/boardLogic'
import { solve } from '../lib/solver'

self.onmessage = (e: MessageEvent) => {
  const board: Board = e.data
  const result = solve(board)
  self.postMessage(result)
}
