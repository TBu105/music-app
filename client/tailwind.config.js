/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#050410",
          500: "#141414",
        },
        martinique: {
          DEFAULT: "#2D2442",
          700: "#292244",
          800: "141122",
        },
        ebony: "#060514",
        linkwater: "#ECEBFA",
        jarcata: {
          DEFAULT: "#443771",
          200: "#8B7CC0",
          500: "#5B4884",
        },
        tundora: "#404040",
      },
      fontFamily: {
        exo: ["'Exo 2'", "Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
}
