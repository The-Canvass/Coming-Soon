import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand tokens from The Canvas
        "canvas-grey": "#eef0f3",
        "canvas-navy": {
          DEFAULT: "#143363",
          dark: "#0c2146",
          light: "#1f4585",
        },
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          dark: "rgb(var(--brand-dark) / <alpha-value>)",
          soft: "rgb(var(--brand-soft) / <alpha-value>)",
          wash: "rgb(var(--brand-wash) / <alpha-value>)",
        },
        "macaw-blue": {
          DEFAULT: "#1cb0f6",
          dark: "#1899d6",
        },
        "eel-dark-blue": "#042c60",
        midnight: {
          DEFAULT: "#18181b",
          card: "#222226",
          surface: "#2a2a30",
        },
        graphite: "#3c3c3c",
        ash: "#777777",
        charcoal: "#4b4b4b",
      },
      borderRadius: {
        tactile: "12px",
        lg: "12px",
        md: "10px",
        sm: "8px",
        pill: "9999px",
      },
      letterSpacing: {
        brand: "0.053em",
        tightest: "-0.02em",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        typewriter: [
          "var(--font-american-typewriter)",
          '"American Typewriter"',
          "AmericanTypewriter",
          '"ITC American Typewriter"',
          '"Courier New"',
          "Courier",
          "serif",
        ],
      },
      maxWidth: {
        canvas: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
