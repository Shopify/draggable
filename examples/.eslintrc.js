/* eslint-env node */
module.exports = {
  extends: ['plugin:shopify/esnext', 'plugin:shopify/webpack', 'plugin:shopify/prettier'],
  globals: {},
  rules: {
    'shopify/jsx-no-complex-expressions': 'off',
    'eslint-comments/no-unlimited-disable': 0,
    // 'import/no-default-export': ['error'],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: false,
        allowBlockStart: false,
      },
    ],
    'no-console': 0,
    'no-negated-condition': 'off',
    // We are intentionally keeping `TODO` comments until a stable release
    'no-warning-comments': 'off',
    'import/no-cycle': 'off',
    // TODO: Disabling for now, but we will want to re-enable in the future.
    'import/no-default-export': 'off',
  },
  env: {
    browser: true,
  },
  // Required, else eslint will look at the parent config
  root: true,
};
