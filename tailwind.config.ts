import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        scratch: {
          primary: "#9b87f5",
          secondary: "#1A1F2C",
          accent: "#ffd700",
        },
        border: "hsl(var(--border) / <alpha-value>)",
      },
      keyframes: {
        'glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(155, 135, 245, 0.5)',
          },
          '50%': {
            'box-shadow': '0 0 30px rgba(155, 135, 245, 0.8)',
          },
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;