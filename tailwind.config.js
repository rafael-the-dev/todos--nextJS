module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          600: "#393A4B",
          700: "#25273D"
        }
      }
    },
  },
  plugins: [],
}