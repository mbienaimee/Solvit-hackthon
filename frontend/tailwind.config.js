/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#2B4141',
        'custom-card': '#1F3131', // Darker shade of the background
        'custom-accent': '#8EA604',
        'custom-secondary': '#6B8E84', // Darker teal for variations
        'custom-tertiary': '#4A6741', // Sage green for unique cards
        'custom-quaternary': '#8E7B6B', // Warm brown for special elements
      },
      backgroundColor: {
        'custom-dark-opacity': 'rgba(43, 65, 65, 0.6)',
        'custom-tertiary-opacity': 'rgba(74, 103, 65, 0.5)',
        'custom-quaternary-opacity': 'rgba(142, 123, 107, 0.5)',
      },
    },
  },
  plugins: [],
}
