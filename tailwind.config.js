/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CHIC palette — derived from xmchichomeware.com (deep forest green)
        brand: {
          // primary green (logo cube + CTA + accents)
          green:      '#2C5E3F',
          greenDark:  '#1F4530',
          greenDeep:  '#143020',
          greenLight: '#3F7A55',
          // legacy aliases — kept so existing components still compile
          navy:       '#2C5E3F',  // → green
          navyDark:   '#1F4530',
          navyDeep:   '#143020',
          teal:       '#2C5E3F',
          tealDark:   '#1F4530',
          tealDeep:   '#143020',
          // warm accent (used on a few hero highlights, badges)
          wood:       '#C9A876',
          yellow:     '#C9A876',
          yellowSoft: '#E8D9BC',
          woodSoft:   '#E8D9BC',
          // surface
          cream:      '#F5F7F8',
          surface:    '#FAFBFC',
          ink:        '#1A1A1A',
          mute:       '#6B7280',
          line:       '#E5E7EB',
        },
      },
      fontFamily: {
        sans:    ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      container: {
        center: true,
        padding: '1.25rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1280px',
        },
      },
    },
  },
  plugins: [],
};
