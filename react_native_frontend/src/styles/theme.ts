export const theme = {
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    mutedText: "#6B7280",
    border: "#E5E7EB",
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
  },
  typography: {
    title: 26,
    subtitle: 14,
    body: 16,
    label: 13,
    cell: 34,
  },
  shadow: {
    // Subtle shadow that works reasonably across iOS/Android
    card: {
      shadowColor: "#111827",
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
    button: {
      shadowColor: "#111827",
      shadowOpacity: 0.10,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
  },
} as const;

export type Theme = typeof theme;
