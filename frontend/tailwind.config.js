/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['{components,features,pages}/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    screens: {
      'xl': { 'max': '1600px' },
      'lg': { 'max': '1368px' },
      'md': { 'max': '1024px' },
      'sm': { 'max': '768px' },
      'xs': { 'max': '480px' },
      'portrait': { raw: '(orientation: portrait)' },
      'xl-portrait': { raw: '(orientation: portrait) and (max-width: 1600px)' },
      'lg-portrait': { raw: '(orientation: portrait) and (max-width: 1368px)' },
      'md-portrait': { raw: '(orientation: portrait) and (max-width: 1024px)' },
      'sm-portrait': { raw: '(orientation: portrait) and (max-width: 768px)' },
      'xs-portrait': { raw: '(orientation: portrait) and (max-width: 480px)' },
    },
    colors: {
      'black': '#151515',
      'gray': '#eaeaea',
      'white': '#fff'
    },
    fontFamily: {
      'sans': ['Inter Variable', 'sans-serif']
    },
    fontSize: {
      'sm': ['0.618rem'],
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
      '4xl': ['20vmin', {
        letterSpacing: '-0.07em',
        lineHeight: '0.9'
      }],
      '5xl': ['38.524rem', {
        letterSpacing: '-0.07em',
        lineHeight: '1'
      }]
    }
  }
}
