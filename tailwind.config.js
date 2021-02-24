module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'inputBg': '#e1e1e1',
        'inputText': '#333333',
        'enableSave': '#00bfff',
        'disableSave': 'gray',
        'disablePhoto': 'gray',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
