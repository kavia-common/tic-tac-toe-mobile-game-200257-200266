import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { CellValue } from "../utils/game";
import { theme } from "../styles/theme";

type Props = {
  value: CellValue;
  onPress: () => void;
  disabled?: boolean;
  highlight?: boolean;
  index: number;
};

export function Cell({ value, onPress, disabled, highlight, index }: Props) {
  const accentColor =
    value === "X" ? theme.colors.primary : value === "O" ? theme.colors.secondary : theme.colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Cell ${index + 1}${value ? `, ${value}` : ""}`}
      accessibilityState={{ disabled: Boolean(disabled) }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.cell,
        highlight ? styles.cellHighlight : null,
        pressed && !disabled ? styles.cellPressed : null,
      ]}
      hitSlop={8}
    >
      <Text style={[styles.cellText, { color: accentColor }]}>{value ?? ""}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 92,
    height: 92,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  cellPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  } as ViewStyle,
  cellHighlight: {
    borderColor: "rgba(37, 99, 235, 0.55)",
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  } as ViewStyle,
  cellText: {
    fontSize: theme.typography.cell,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
