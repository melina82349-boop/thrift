/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./Pages/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        thrift: {
          50: '#f2f8f5',
          100: '#e1efe8',
          200: '#c5e2d5',
          500: '#2d8a66',
          600: '#1e6f50',
          700: '#145c43',
          800: '#0e4230',
          900: '#092d21',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf9f5',
          200: '#f3efe6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}