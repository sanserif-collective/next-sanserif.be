// tailwind.config.js

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['{pages,app}/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    colors: {
      'black': '#151515',
      'gray': '#eaeaea',
      'white': '#fff'
    },
    fontFamily: {
      'sans': 'Inter Variable, sans-serif'
    },
    fontSize: {
      'base': ['15px', {
        letterSpacing: '-0.01em',
        lineHeight: '1.2'
      }],
      'lg': ['1.602rem', {
        lineHeight: '1.2'
      }],
      'xl': ['2.281rem', {
        letterSpacing: '-0.01em',
        lineHeight: '1.2'
      }],
      '2xl': ['4.11rem', {
        letterSpacing: '-0.07em',
        lineHeight: '1.2'
      }],
      '3xl': ['11.863rem', {
        letterSpacing: '-0.07em',
        lineHeight: '1.15'
      }],
      '4xl': ['15.014rem', {
        letterSpacing: '-0.07em',
        lineHeight: '0.9'
      }],
      '5xl': ['38.524rem', {
        letterSpacing: '-0.07em',
        lineHeight: '1'
      }]
    }
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      Object.entries(theme('fontWeight')).forEach(([key, value]) => {
        addUtilities({
          [`font-${key}`]: {
            'font-variation-settings': `'wght' ${value}`
          }
        })
      })
    })
  ],
}

// Light
// Medium
// Regular
// Semibold