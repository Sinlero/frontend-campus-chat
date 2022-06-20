const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        0: "0ms",
      },
      colors: {
        gray: {
          ...colors.trueGray,
          850: "#1E1E1E",
        },
        primary: colors.teal,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
