/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto']
      },
      colors: {
        'blue-custom': '#D8DCFC',
        'dark-blue-custom': '#7091E6',
        'light-blue-custom': '#EDE8F5',
          'lightblue': '#ADD8E6',
        'lightpink': '#FFB6C1',
        'lightseagreen': '#20B2AA',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #1982C4 0%, #FF595E 100%)',
      },
    },
  },
  plugins: [],
}