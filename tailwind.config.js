/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00f0ff',
        'cyber-pink': '#ff003c',
        'cyber-yellow': '#fcee0a',
        'cyber-dark': '#0f0f15',
      },
      fontFamily: {
        'game': ['"Orbitron"', 'sans-serif'],
        'sans': ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
