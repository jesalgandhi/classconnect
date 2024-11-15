import animate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
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
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
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
        chocolate_cosmos: {
          DEFAULT: "#5e0b15",
          100: "#130204",
          200: "#260408",
          300: "#3a070d",
          400: "#4d0911",
          500: "#5e0b15",
          600: "#a81425",
          700: "#e6273d",
          800: "#ee6f7e",
          900: "#f7b7be",
        },
        cordovan: {
          DEFAULT: "#90323d",
          100: "#1d0a0c",
          200: "#391418",
          300: "#561e25",
          400: "#732831",
          500: "#90323d",
          600: "#bd4452",
          700: "#ce737d",
          800: "#dea1a8",
          900: "#efd0d4",
        },
        dun: {
          DEFAULT: "#d9cab3",
          100: "#352a1b",
          200: "#6a5535",
          300: "#9f7f50",
          400: "#bfa57f",
          500: "#d9cab3",
          600: "#e1d5c3",
          700: "#e8e0d2",
          800: "#f0eae1",
          900: "#f7f5f0",
        },
        bronze: {
          DEFAULT: "#bc8034",
          100: "#261a0a",
          200: "#4b3415",
          300: "#714d1f",
          400: "#976729",
          500: "#bc8034",
          600: "#d19b55",
          700: "#dcb480",
          800: "#e8cdaa",
          900: "#f3e6d5",
        },
        beaver: {
          DEFAULT: "#8c7a6b",
          100: "#1c1815",
          200: "#37302b",
          300: "#534840",
          400: "#6f6155",
          500: "#8c7a6b",
          600: "#a39487",
          700: "#baaea5",
          800: "#d1c9c3",
          900: "#e8e4e1",
        },
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
  plugins: [animate],
};
