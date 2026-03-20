/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        mq: {
          background: '#000000',
          veryDarkBlue: '#010609',
          deepNavy: '#04121A',
          darkTealBlue: '#071D2B',
          midnightBlue: '#0A293B',
          darkCyanBlue: '#0C344B',
          steelBlueDark: '#103F5B',
          mutedOceanBlue: '#12496A',
          mediumGridBlue: '#155880',
          highlightGrid: '#1A6D9D',
          navy: '#04121A',
          primary: '#1A6D9D',
          textPrimary: '#EAF6FF',
          textMuted: '#7DD3FC',
          textDim: '#94A3B8',
          gold: '#F59E0B',
          purple: '#8B5CF6',
          warning: '#EF4444',
        },
        // Keep a couple aliases so we can use tailwind colors too.
        brand: {
          primary: '#1A6D9D',
          gold: '#F59E0B',
          purple: '#8B5CF6',
          warning: '#EF4444',
        },
      },
      boxShadow: {
        'mq-card': '0 18px 70px rgba(0, 0, 0, 0.35)',
        'mq-card-strong': '0 26px 110px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
}
