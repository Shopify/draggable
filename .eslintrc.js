module.exports = {
  extends: [
    'plugin:shopify/esnext'
  ],
  globals: {},
  "env": {
    "browser": true
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
  }
};
