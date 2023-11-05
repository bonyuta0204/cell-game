import { Board, clickCell } from '../boardLogic'
import { describe, it, expect } from 'vitest'

describe('clickCell', () => {
  it('click center', () => {
    const board: Board = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1]
    ]

    const newBoard = clickCell(board, 1, 1)
    expect(newBoard).toEqual([
      [-1, 1, -1],
      [1, 1, 1],
      [-1, 1, -1]
    ])
  })

  it('click corner', () => {
    const board: Board = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1]
    ]

    const newBoard = clickCell(board, 0, 0)
    expect(newBoard).toEqual([
      [1, 1, -1],
      [1, -1, -1],
      [-1, -1, -1]
    ])
  })
})
