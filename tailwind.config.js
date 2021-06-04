module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Nunito"],
    },
    extend: {
      colors: {
        blue: {
          100: "#88a4e6",
          200: "#7495e2",
          300: "#6085de",
          400: "#4c76da",
          500: "#3867d6",
          600: "#325dc1",
          700: "#2d52ab",
          800: "#274896",
          900: "#223e80",
        },
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
};
