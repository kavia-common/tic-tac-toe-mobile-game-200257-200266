import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";
import { GameMode } from "../utils/game";

type Props = {
  mode: GameMode;
  onChangeMode: (mode: GameMode) => void;
  onReset: () => void;
  onNewGame: () => void;
  gameOver: boolean;
  statusText: string;
};

type ButtonTone = "primary" | "secondary" | "ghost";

function buttonColors(tone: ButtonTone) {
  if (tone === "primary") {
    return { bg: theme.colors.primary, text: "#ffffff", border: "transparent" };
  }
  if (tone === "secondary") {
    return { bg: theme.colors.secondary, text: theme.colors.text, border: "transparent" };
  }
  return { bg: theme.colors.surface, text: theme.colors.text, border: theme.colors.border };
}

function Button({
  title,
  onPress,
  tone,
  accessibilityLabel,
}: {
  title: string;
  onPress: () => void;
  tone: ButtonTone;
  accessibilityLabel: string;
}) {
  const c = buttonColors(tone);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonBase,
        { backgroundColor: c.bg, borderColor: c.border },
        pressed ? styles.buttonPressed : null,
        tone !== "ghost" ? theme.shadow.button : null,
      ]}
      hitSlop={8}
    >
      <Text style={[styles.buttonText, { color: c.text }]}>{title}</Text>
    </Pressable>
  );
}

export function Controls({ mode, onChangeMode, onReset, onNewGame, gameOver, statusText }: Props) {
  const modeLabel = mode === "pvp" ? "Player vs Player" : "Player vs Computer";

  return (
    <View style={styles.container} accessibilityLabel="Game controls">
      <View style={styles.modeRow}>
        <Text style={styles.sectionLabel}>Mode</Text>
        <Text style={styles.modeValue} accessibilityLabel={`Current mode: ${modeLabel}`}>
          {modeLabel}
        </Text>
      </View>

      <View style={styles.toggleRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Switch to Player vs Player mode"
          onPress={() => onChangeMode("pvp")}
          style={({ pressed }) => [
            styles.togglePill,
            mode === "pvp" ? styles.toggleActivePrimary : styles.toggleInactive,
            pressed ? styles.togglePressed : null,
          ]}
        >
          <Text style={[styles.toggleText, mode === "pvp" ? styles.toggleTextOn : styles.toggleTextOff]}>
            Vs Player
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Switch to Player vs Computer mode"
          onPress={() => onChangeMode("pvc")}
          style={({ pressed }) => [
            styles.togglePill,
            mode === "pvc" ? styles.toggleActiveSecondary : styles.toggleInactive,
            pressed ? styles.togglePressed : null,
          ]}
        >
          <Text style={[styles.toggleText, mode === "pvc" ? styles.toggleTextOn : styles.toggleTextOff]}>
            Vs Computer
          </Text>
        </Pressable>
      </View>

      <View style={styles.buttonsRow}>
        <Button title="Reset" onPress={onReset} tone="ghost" accessibilityLabel="Reset the current game" />
        <Button
          title={gameOver ? "New Game" : "New Game"}
          onPress={onNewGame}
          tone={gameOver ? "secondary" : "primary"}
          accessibilityLabel={`Start a new game. Current status: ${statusText}`}
        />
      </View>

      {gameOver ? (
        <Text style={styles.gameOverHint} accessibilityLabel={`Game over. ${statusText}`}>
          {statusText} Tap “New Game” to play again.
        </Text>
      ) : (
        <Text style={styles.hint} accessibilityLabel="Hint: tap a square to place your mark.">
          Tap a square to place your mark.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  sectionLabel: {
    fontSize: theme.typography.label,
    color: theme.colors.mutedText,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  modeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  modeValue: {
    fontSize: theme.typography.body,
    color: theme.colors.text,
    fontWeight: "800",
  },

  toggleRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  togglePill: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleInactive: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
  },
  toggleActivePrimary: {
    backgroundColor: "rgba(37, 99, 235, 0.12)",
    borderColor: "rgba(37, 99, 235, 0.45)",
  },
  toggleActiveSecondary: {
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    borderColor: "rgba(245, 158, 11, 0.45)",
  },
  togglePressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.95,
  },
  toggleText: {
    fontSize: theme.typography.body,
    fontWeight: "800",
  },
  toggleTextOn: {
    color: theme.colors.text,
  },
  toggleTextOff: {
    color: theme.colors.mutedText,
  },

  buttonsRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  buttonBase: {
    flex: 1,
    minHeight: 48,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  buttonText: {
    fontSize: theme.typography.body,
    fontWeight: "900",
    letterSpacing: 0.3,
  },

  hint: {
    marginTop: theme.spacing.md,
    color: theme.colors.mutedText,
    fontSize: theme.typography.subtitle,
    textAlign: "center",
  },
  gameOverHint: {
    marginTop: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    textAlign: "center",
    fontWeight: "700",
  },
});
