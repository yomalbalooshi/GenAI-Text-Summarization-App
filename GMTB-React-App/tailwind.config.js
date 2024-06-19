/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      nunito: ['nunito', 'sans-serif']
    },
    extend: {
      transitionProperty: {
        width: 'width'
      }
    },
    colors: {
      blue: '#75CDD8',
      orange: '#FFCA27',
      pink: '#FF8296',
      yellow: '#FFEC00',
      white: '#FFFFFF',
      'light-grey': '#F8F8F8',
      'medium-grey': '#8B8B8B'
    }
  },
  plugins: []
}
