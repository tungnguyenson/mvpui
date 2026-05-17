/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

/**
 * Design token values as JS constants.
 * Use for rare cases where JS needs raw token values (e.g. canvas, charting).
 * For CSS/Tailwind use, import tokens.css or theme.css instead.
 */
export const tokens = {
  color: {
    brand: {
      "25": "#fdf4ff",
      "50": "#f9f5ff",
      "100": "#f4ebff",
      "200": "#e9d7fe",
      "300": "#d6bbfb",
      "400": "#b692f6",
      "500": "#9e77ed",
      "600": "#7f56d9",
      "700": "#6941c6",
      "800": "#53389e",
      "900": "#42307d",
      "950": "#2c1c5f",
    },
    gray: {
      "25": "#fafafa",
      "50": "#f5f5f5",
      "100": "#f0f0f0",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717",
      "950": "#0a0a0a",
    },
    success: {
      "50": "#ecfdf5",
      "100": "#d1fae5",
      "200": "#a7f3d0",
      "500": "#10b981",
      "600": "#059669",
      "700": "#047857",
    },
    warning: {
      "50": "#fffbeb",
      "100": "#fef3c7",
      "200": "#fde68a",
      "500": "#f59e0b",
      "600": "#d97706",
      "700": "#b45309",
    },
    error: {
      "25": "#fffbfa",
      "50": "#fef2f2",
      "100": "#fee2e2",
      "200": "#fecaca",
      "300": "#fca5a5",
      "500": "#ef4444",
      "600": "#dc2626",
      "700": "#b91c1c",
    },
    white: "#ffffff",
    black: "#000000",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.625rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },
  shadow: {
    xs: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
    sm: "0 1px 2px 0 rgba(16, 24, 40, 0.06), 0 1px 3px 0 rgba(16, 24, 40, 0.10)",
    md: "0 2px 4px -2px rgba(16, 24, 40, 0.06), 0 4px 8px -2px rgba(16, 24, 40, 0.10)",
    lg: "0 4px 6px -2px rgba(16, 24, 40, 0.03), 0 12px 16px -4px rgba(16, 24, 40, 0.08)",
    xl: "0 8px 8px -4px rgba(16, 24, 40, 0.03), 0 20px 24px -4px rgba(16, 24, 40, 0.08)",
  },
  font: {
    sans: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  lineHeight: {
    xs: "1.125rem",
    sm: "1.25rem",
    md: "1.5rem",
    lg: "1.75rem",
    xl: "1.875rem",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export type Tokens = typeof tokens;
export type BrandColor = keyof typeof tokens.color.brand;
export type GrayColor = keyof typeof tokens.color.gray;
