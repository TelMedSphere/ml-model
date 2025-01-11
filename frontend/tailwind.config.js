/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("./colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: colors.black,
        blue: colors.blue,
        yellow: colors.yellow,
        orange: colors.orange,
        grey: colors.grey,
        white: colors.white,
        teal: colors.teal,
        green: colors.green,
        purple: colors.purple,
        social: colors.social,
      },
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "3xl": "1536px",
        "2xl": "1400px",
        xl: "1400px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
        xs: "480px",
        xxs: "400px",
      },
      animation: {
        spark: "spark 1.5s linear infinite",
        "pulse-custom": "pulse 2s infinite",
      },
      keyframes: {
        spark: {
          "0%": {
            maxWidth: "0%",
          },
          "100%": {
            maxWidth: "100%",
          },
        },
        pulse: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
