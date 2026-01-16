import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../styles/theme";
import { BoardState, Player, calculateWinner } from "../utils/game";
import { Cell } from "./Cell";

type Props = {
  board: BoardState;
  onPressCell: (index: number) => void;
  disabled?: boolean;
  winner: Player | null;
};

function getWinningLine(board: BoardState): number[] | null {
  // Duplicate logic lightly to find the specific line for highlights.
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const w = calculateWinner(board);
  if (!w) return null;

  for (const [a, b, c] of lines) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return [a, b, c];
  }
  return null;
}

export function Board({ board, onPressCell, disabled, winner }: Props) {
  const winningLine = useMemo(() => (winner ? getWinningLine(board) : null), [board, winner]);

  return (
    <View style={styles.boardWrap} accessibilityLabel="Tic Tac Toe board">
      <View style={styles.grid}>
        {board.map((value, idx) => (
          <Cell
            key={idx}
            index={idx}
            value={value}
            disabled={disabled || value !== null}
            highlight={Boolean(winningLine?.includes(idx))}
            onPress={() => onPressCell(idx)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardWrap: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  grid: {
    width: 92 * 3 + theme.spacing.sm * 2,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    justifyContent: "center",
  },
});
