export type Player = "X" | "O";
export type CellValue = Player | null;
export type BoardState = CellValue[]; // length 9
export type GameMode = "pvp" | "pvc";

const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

/**
 * PUBLIC_INTERFACE
 * Returns the winner ("X" or "O") if a winning line exists, otherwise null.
 */
export function calculateWinner(board: BoardState): Player | null {
  for (const [a, b, c] of WINNING_LINES) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return v;
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Returns true if no moves remain.
 */
export function isDraw(board: BoardState): boolean {
  return board.every((c) => c !== null);
}

/**
 * PUBLIC_INTERFACE
 * Returns array of available indexes for next move.
 */
export function getAvailableMoves(board: BoardState): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] === null) moves.push(i);
  }
  return moves;
}

function opponentOf(player: Player): Player {
  return player === "X" ? "O" : "X";
}

function findWinningMove(board: BoardState, player: Player): number | null {
  for (const idx of getAvailableMoves(board)) {
    const next = [...board] as BoardState;
    next[idx] = player;
    if (calculateWinner(next) === player) return idx;
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Heuristic AI move selection:
 * 1) Win if possible
 * 2) Block opponent win
 * 3) Take center
 * 4) Take a corner
 * 5) Take a side
 *
 * Structured so it can be swapped with minimax later.
 */
export function getAIMoveHeuristic(board: BoardState, aiPlayer: Player): number | null {
  const moves = getAvailableMoves(board);
  if (moves.length === 0) return null;

  // 1) Win
  const win = findWinningMove(board, aiPlayer);
  if (win !== null) return win;

  // 2) Block
  const opp = opponentOf(aiPlayer);
  const block = findWinningMove(board, opp);
  if (block !== null) return block;

  // 3) Center
  if (board[4] === null) return 4;

  // 4) Corners
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

  // 5) Sides
  const sides = [1, 3, 5, 7].filter((i) => board[i] === null);
  if (sides.length > 0) return sides[Math.floor(Math.random() * sides.length)];

  // Fallback (shouldn't happen)
  return moves[0] ?? null;
}
