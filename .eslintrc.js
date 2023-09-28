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
    'tsdoc/syntax': 'warn',
  },
  plugins: ['eslint-plugin-tsdoc'],
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
  overrides: [
    {
      files: ['src/**/*.js', 'src/**/*.ts'],
      excludedFiles: ['src/**/*.test.js', 'src/**/*.test.ts'],
      rules: {
        'require-jsdoc': [
          'error',
          {
            require: {
              FunctionDeclaration: false,
              MethodDefinition: true,
              ClassDeclaration: true,
              ArrowFunctionExpression: true,
              FunctionExpression: true,
            },
          },
        ],
      },
    },
  ],
};
