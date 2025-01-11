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
        black1: "#222",
        black2: "#1d1f2c",
        blue: {
          ...colors.blue,
          1: "#d4ddf1",
          2: "#b0bbd8",
          3: "#7584ae",
          4: "#6575a5",
          5: "#515e84",
          6: "#3d4663",
          7: "#282f42",
          8: "#06075a",
          9: "#4a4cb2",
        },
        yellow: {
          ...colors.yellow,
          1: "#f5f5dc",
          2: "#f0e68c",
          3: "#ffcc00",
          4: "#ffd700",
          5: "#eaa938",
          6: "#af9500",
        },
        orange: {
          ...colors.orange,
          1: "#FF8400",
          2: "#af5b00",
        },
        grey: {
          ...colors.grey,
          1: "#a9afc3",
          2: "#b3b8d0",
          3: "#6c757d",
        },
        fb: "#4a71c3",
        google: "#a61c00",
        twitter: "#1da1f2",
        instagram: "#DD2A7B",
        whatsapp: "#25D366",
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
        fadeIn: 'fadeIn 1.5s ease-in-out',
        fadeInLeft: 'fadeInLeft 1.5s ease-in-out forwards'
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
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
      },
    },
  },
  plugins: [],
};
