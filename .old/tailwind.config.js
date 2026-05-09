/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50:  '#faf6ef',
          100: '#f3ead9',
          200: '#e7ddc4',
          300: '#d6c4a3',
          400: '#bfa57e',
          500: '#a68660',
          600: '#8b6a4a',
          700: '#6e523a',
          800: '#4b3a2a',
          900: '#2f2519',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      maxWidth: { '8xl': '88rem' },
    },
  },
  plugins: [],
};
