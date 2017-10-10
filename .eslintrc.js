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
  },
  globals: {
    jest: false,
    afterAll: false,
    afterEach: false,
    beforeAll: false,
    beforeEach: false,
    describe: false,
    test: false,
    expect: false,
  },
};
