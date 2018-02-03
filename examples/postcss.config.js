/* eslint-disable no-undef */
module.exports = () => ({
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-reduce-idents': false,
    },
  },
});
/* eslint-enable no-undef */
