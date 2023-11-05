import { expect, describe, it } from "vitest";
import { getNextNodes, GameNode, solve } from "../solver";
import { Board, getAvailableActions, initEmptyBoard } from "../boardLogic";

describe("getNextNodes", () => {
  it("listup available actions", () => {
    const board = initEmptyBoard(3);

    const actions = getAvailableActions(board);
    expect(actions).toEqual([
      { rowIndex: 0, colIndex: 0 },
      { rowIndex: 0, colIndex: 1 },
      { rowIndex: 0, colIndex: 2 },
      { rowIndex: 1, colIndex: 0 },
      { rowIndex: 1, colIndex: 1 },
      { rowIndex: 1, colIndex: 2 },
      { rowIndex: 2, colIndex: 0 },
      { rowIndex: 2, colIndex: 1 },
      { rowIndex: 2, colIndex: 2 },
    ]);
  });
});

describe("getNextNodes", () => {
  it("listup next nodes", () => {
    const board: Board = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];
    const actions = getAvailableActions(board);

    const currentNode: GameNode = {
      board,
      actionHistory: [],
      boardHistory: [],
      step: 0,
    };

    const nextNodes = getNextNodes(currentNode, actions);

    expect(nextNodes).toHaveLength(9);
    expect(nextNodes[0].step).toEqual(1);
    expect(nextNodes[0].board).toEqual([
      [1, 1, -1],
      [1, -1, -1],
      [-1, -1, -1],
    ]);
    expect(nextNodes[0].actionHistory).toEqual([
      {
        rowIndex: 0,
        colIndex: 0,
      },
    ]);
    expect(nextNodes[0].boardHistory).toEqual([
      [
        [1, 1, -1],
        [1, -1, -1],
        [-1, -1, -1],
      ],
    ]);
  });
});

describe("solve", () => {
  it("solve in 1 step", () => {
    const board: Board = [
      [-1, 1, -1],
      [1, 1, 1],
      [-1, 1, -1],
    ];
    const result = solve(board);
    expect(result.actionHistory).toEqual([{ rowIndex: 1, colIndex: 1 }]);
    expect(result.boardHistory).toEqual([
      [
        [-1, 1, -1],
        [1, 1, 1],
        [-1, 1, -1],
      ],
      [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
      ],
    ]);
  });
});
