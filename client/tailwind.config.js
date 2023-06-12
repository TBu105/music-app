/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: {
        DEFAULT: "#06050A",
        500: "#141414",
      },
      martinique: {
        DEFAULT: "#2D2442",
        700: "#292244",
        800: "141122",
      },
      ebony: "#060514",
      linkwater: "#ECEBFA",
      jarcata: "#443771",
      tundora: "#404040",
    },
    fontFamily: {
      exo: ['"Exo 2"'],
    },
    extend: {},
  },
  plugins: [],
}
