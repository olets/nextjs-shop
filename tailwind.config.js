const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        link: colors.blue['600'],
      },
      transitionDuration: {
        DEFAULT: '500ms',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
