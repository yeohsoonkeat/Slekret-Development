module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
        code: ['Menlo', 'Monaco'],
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'group-hover'],
      letterSpacing: ['hover', 'group-hover'],
      cursor: ['hover'],
      ringOpacity: ['hover', 'active'],
      opacity: ['disabled'],
      animation: ['responsive', 'motion-safe', 'motion-reduce'],
    },
  },
  plugins: [],
};
