import { Board, isSolved, clickCell } from "./boardLogic";

type Action = {
  rowIndex: number;
  colIndex: number;
};

export type GameNode = {
  board: Board;
  actionHistory: Action[];
  boardHistory: Board[];
  step: number;
};

export function getAvailableActions(board: Board): Action[] {
  return board.flatMap((row, rowIndex) =>
    row.map((_, colIndex) => ({ rowIndex, colIndex }))
  );
}

export function getNextNodes(node: GameNode, actions: Action[]) {
  return actions.map((action) => {
    const nextBoard = clickCell(node.board, action.rowIndex, action.colIndex);
    return {
      board: nextBoard,
      actionHistory: [...node.actionHistory, action],
      boardHistory: [...node.boardHistory, nextBoard],
      step: node.step + 1,
    };
  });
}

/**
 * 幅優先探索(BFS)を用いて、解を求める
 * 最終的には解までの行動と盤面の履歴を返す
 *
 * アルゴリズム
 * 1. 初期盤面をキューに入れる
 * 2. キューから盤面を取り出す
 * 3. 取り出した盤面が解かどうかを判定する
 * 4. 解であれば、結果に追加する
 * 5. 解でなければ、取り出した盤面から遷移可能な盤面をキューに入れる
 *
 * @param board 初期盤面
 * @return 解までの行動と盤面の履歴
 */

export function solve(board: Board): GameNode {
  const queue: GameNode[] = [
    {
      board,
      actionHistory: [],
      boardHistory: [board],
      step: 0,
    },
  ];

  const nextActions = getAvailableActions(board);

  while (queue.length > 0) {
    const node = queue.shift() as GameNode;
    const { board } = node;

    if (isSolved(board)) {
      return node;
    }

    const nextNodes = getNextNodes(node, nextActions);
    queue.push(...nextNodes);
  }

  throw new Error("解が見つかりませんでした");
}
