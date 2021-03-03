module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'inputBg': '#e1e1e1',
        'inputText': '#333333',
        'enableBtn': '#00bfff',
        'disableBtn': 'gray',
        'disablePhoto': 'gray',
        'appBg': '#444447',
        'toggleLoginBtn': '#0000ff',
        'setAvatarBtn': '#303f9e',
        'whiteSmoke': '#f5f5f5',

        'boxBg': '#616165'
      },
      spacing: {
        '28rem': '28rem',
      },
      height: {
        header: '7%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
