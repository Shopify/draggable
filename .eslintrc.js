module.exports = {
  extends: [
    'plugin:shopify/esnext',
    'plugin:shopify/jest',
    'plugin:shopify/prettier',
  ],
  env: {
    browser: true,
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    'line-comment-position': 0,
    'lines-around-comment': 'off',
  },
};
