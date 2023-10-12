const path = require('path');

module.exports = {
  extends: [
    'plugin:@shopify/typescript',
    'plugin:@shopify/react',
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
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
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
  overrides: [
    {
      files: ['./**/*.test.{js,jsx,ts,tsx}'],
      rules: {
        '@shopify/jsx-no-hardcoded-content': 'off',
        'react/jsx-filename-extension': [2, {extensions: ['.jsx', '.tsx']}],
      },
    },
  ],
};
