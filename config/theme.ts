// Theme configuration with exact design tokens
export const themeConfig = {
  colors: {
    primary: "#0B3D2E", // deep green
    accent: "#F0C419", // warm gold
    text: "#111827", // ink
    bg: "#F8FAFC", // soft
    muted: "#9CA3AF", // secondary
    white: "#FFFFFF",
    black: "#000000",
  },

  typography: {
    heading: {
      fontFamily: "Manrope",
      weights: [600, 700, 800],
    },
    body: {
      fontFamily: "Inter",
      weights: [400, 500, 600],
    },
    mono: {
      fontFamily: "Roboto Mono",
      weights: [500],
    },
  },

  ui: {
    borderRadius: {
      default: "1rem", // rounded-2xl
      card: "1rem",
      button: "0.75rem",
    },
    shadows: {
      card: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // shadow-md
      cardHover: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", // shadow-lg
    },
    spacing: {
      container: "max-w-7xl",
      section: "py-16",
      grid: "gap-8",
    },
    motion: {
      duration: {
        fast: 180,
        normal: 250,
        slow: 300,
      },
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier
    },
  },

  // Component variants
  buttons: {
    primary: {
      bg: "primary",
      text: "white",
      hover: "primary/90",
    },
    secondary: {
      bg: "transparent",
      text: "primary",
      border: "primary",
      hover: "primary/5",
    },
    accent: {
      bg: "transparent",
      text: "text",
      hover: "accent",
    },
  },

  // Status badges
  badges: {
    available: {
      bg: "transparent",
      text: "primary",
      border: "primary",
    },
    sold: {
      bg: "muted",
      text: "white",
    },
    onHold: {
      bg: "transparent",
      text: "accent",
      border: "accent",
    },
  },
} as const

export type ThemeConfig = typeof themeConfig
