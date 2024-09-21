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
        'grey-blue-custom': '#ADBBDA',
        'black-custom': '#2D2D2D',
      },
      boxShadow: {
        'lg': '0px 4px 12px rgba(0, 0, 0, 0.15)',
      },
      borderWidth: {
        'custom-thin': '1px',
      },
    },
  },
  plugins: [],
}
