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
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #1982C4 0%, #FF595E 100%)',
      },
    },
  },
  plugins: [],
}