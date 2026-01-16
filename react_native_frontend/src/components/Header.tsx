import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";

type Props = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: Props) {
  return (
    <View style={styles.container} accessibilityRole="header">
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.title,
    fontWeight: "900",
    color: theme.colors.text,
    letterSpacing: 0.3,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.subtitle,
    color: theme.colors.mutedText,
  },
});
