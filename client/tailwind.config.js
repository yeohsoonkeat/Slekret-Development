module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      letterSpacing: ['hover'],
      cursor: ['hover'],
    },
  },
  plugins: [],
};
