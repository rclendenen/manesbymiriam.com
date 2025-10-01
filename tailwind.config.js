/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Your existing color palette
        'bg': '#fff8f7',
        'cream': '#fff4ef',
        'soft-pink': '#f7dfe0',
        'dusty-rose': '#e7bfc1',
        'nude-1': '#d8c7c1',
        'accent': '#cba8a8',
        'text': '#2e2a28',
        'muted': '#7b6f6a',
        'pink-accent': '#F8F0F0'
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif']
      }
    },
  },
  plugins: [],
}




