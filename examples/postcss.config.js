/* eslint-disable no-undef */
module.exports = () => ({
  plugins: {
    autoprefixer: {},
    // can eventually be removed
    'postcss-gap-properties': {
      preserve: false
    },
    cssnano: {
      // causing problem with `grid-template-areas`
      // preset: 'advanced',
      autoprefixer: false
      // 'postcss-reduce-idents': false
    }
  }
});
/* eslint-enable no-undef */
