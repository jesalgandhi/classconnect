import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  safelist: [
    {
      pattern:
        /(bg|text|border)-(chocolate_cosmos|cordovan|dun|bronze|beaver|oxford_blue)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      fontFamily: {
        sans: [fontFamily.sans],
      },
      colors: {
        background: "#F0F8FF",
        primary: "#AEDFF7",
        secondary: "#BEE3F8",
        accent: "#90CDF4",
        card: "#FFFFFF",
        text: "#2A4365",
        muted: "#718096",
        border: "#CBD5E0",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
