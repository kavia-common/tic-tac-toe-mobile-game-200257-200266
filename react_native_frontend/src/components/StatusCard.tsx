import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";

type Tone = "primary" | "secondary" | "neutral";

type Props = {
  text: string;
  tone: Tone;
  accessibilityLabel: string;
};

function toneStyles(tone: Tone) {
  if (tone === "primary") {
    return {
      chipBg: "rgba(37, 99, 235, 0.12)",
      chipBorder: "rgba(37, 99, 235, 0.35)",
      chipText: theme.colors.primary,
    };
  }
  if (tone === "secondary") {
    return {
      chipBg: "rgba(245, 158, 11, 0.14)",
      chipBorder: "rgba(245, 158, 11, 0.40)",
      chipText: theme.colors.secondary,
    };
  }
  return {
    chipBg: "rgba(17, 24, 39, 0.06)",
    chipBorder: "rgba(17, 24, 39, 0.12)",
    chipText: theme.colors.text,
  };
}

export function StatusCard({ text, tone, accessibilityLabel }: Props) {
  const t = toneStyles(tone);

  return (
    <View style={styles.wrap} accessibilityLabel={accessibilityLabel}>
      <View style={[styles.chip, { backgroundColor: t.chipBg, borderColor: t.chipBorder }]}>
        <Text style={[styles.text, { color: t.chipText }]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
  },
  text: {
    fontSize: theme.typography.body,
    fontWeight: "700",
    color: theme.colors.text,
  },
});
