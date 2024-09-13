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
    },
  },
  plugins: [],
}