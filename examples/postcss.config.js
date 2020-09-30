/* eslint-env node */
module.exports = () => ({
  plugins: {
    autoprefixer: {},
    cssnano: {
      // reduceIdents causing problem with `grid-template-areas`
      preset: ['advanced', {reduceIdents: false}],
      autoprefixer: false,
    },
  },
});
