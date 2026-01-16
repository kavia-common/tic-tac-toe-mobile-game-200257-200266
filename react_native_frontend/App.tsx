import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import { Board } from "./src/components/Board";
import { Controls } from "./src/components/Controls";
import { Header } from "./src/components/Header";
import { StatusCard } from "./src/components/StatusCard";
import { theme } from "./src/styles/theme";
import {
  BoardState,
  GameMode,
  Player,
  calculateWinner,
  getAIMoveHeuristic,
  getAvailableMoves,
  isDraw,
} from "./src/utils/game";

/**
 * Returns the initial empty board.
 */
function createEmptyBoard(): BoardState {
  return Array(9).fill(null) as BoardState;
}

/**
 * PUBLIC_INTERFACE
 * App entry point for the Tic Tac Toe game.
 *
 * Provides:
 * - Two modes (Player vs Player, Player vs Computer)
 * - Turn indicator, win/draw status
 * - Reset/New Game controls
 */
export default function App() {
  const [mode, setMode] = useState<GameMode>("pvp");
  const [board, setBoard] = useState<BoardState>(() => createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const winner = useMemo(() => calculateWinner(board), [board]);
  const draw = useMemo(() => isDraw(board) && !winner, [board, winner]);
  const gameOver = Boolean(winner) || draw;

  // In AI mode we treat:
  // - Human as X
  // - Computer as O
  const isAITurn = mode === "pvc" && currentPlayer === "O" && !gameOver;

  // Small UX: prevent extra taps while AI is "thinking" and game is not over.
  const inputDisabled = gameOver || isAITurn;

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "It’s a draw!";
    return `Turn: ${currentPlayer}`;
  }, [winner, draw, currentPlayer]);

  const statusTone = useMemo(() => {
    if (winner) return winner === "X" ? "primary" : "secondary";
    if (draw) return "neutral";
    return currentPlayer === "X" ? "primary" : "secondary";
  }, [winner, draw, currentPlayer]);

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
  };

  const handlePressCell = (index: number) => {
    if (inputDisabled) return;
    if (board[index] !== null) return;

    setBoard((prev) => {
      if (prev[index] !== null) return prev; // Defensive for async state.
      const next = [...prev] as BoardState;
      next[index] = currentPlayer;
      return next;
    });

    // Turn swaps after the move is applied.
    setCurrentPlayer((p) => (p === "X" ? "O" : "X"));
  };

  // AI move effect: whenever it becomes O's turn in PvC, select a move.
  useEffect(() => {
    if (!isAITurn) return;

    const available = getAvailableMoves(board);
    if (available.length === 0) return;

    const move = getAIMoveHeuristic(board, "O");
    if (move == null) return;

    // Add a short delay for a smoother feel (and visible pressed feedback for human move).
    const timer = setTimeout(() => {
      setBoard((prev) => {
        if (prev[move] !== null) return prev; // Defensive.
        const next = [...prev] as BoardState;
        next[move] = "O";
        return next;
      });
      setCurrentPlayer("X");
    }, 250);

    return () => clearTimeout(timer);
  }, [isAITurn, board]);

  const handleToggleMode = (nextMode: GameMode) => {
    setMode(nextMode);
    // Reset when switching modes to avoid confusing mid-game state.
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
  };

  const handleNewGame = () => resetGame();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      <View style={{ flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg }}>
        <Header title="Tic Tac Toe" subtitle="Ocean Professional Edition" />

        <View style={{ flex: 1, justifyContent: "center" }}>
          <StatusCard
            text={statusText}
            tone={statusTone}
            accessibilityLabel={`Game status: ${statusText}`}
          />

          <View style={{ marginTop: theme.spacing.lg, alignItems: "center" }}>
            <Board
              board={board}
              onPressCell={handlePressCell}
              disabled={inputDisabled}
              winner={winner}
            />
          </View>

          <View style={{ marginTop: theme.spacing.xl }}>
            <Controls
              mode={mode}
              onChangeMode={handleToggleMode}
              onReset={resetGame}
              onNewGame={handleNewGame}
              gameOver={gameOver}
              statusText={statusText}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
