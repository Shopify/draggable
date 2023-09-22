const path = require('path');

module.exports = {
  extends: [
    'plugin:@shopify/typescript',
    'plugin:@shopify/jest',
    'plugin:@shopify/prettier',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'jest/valid-title': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test'),
        ],
      },
    },
  },
};
