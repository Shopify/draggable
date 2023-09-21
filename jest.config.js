module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.(js|ts)'],
  setupFiles: ['<rootDir>/test/environment.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  transform: {
    '\\.(ts|js)': [
      'babel-jest',
      {
        babelrc: false,
        presets: [
          ['@shopify/babel-preset', {typescript: true, isWebpack5: true}],
        ],
        sourceMaps: 'inline',
      },
    ],
  },
  moduleFileExtensions: ['js', 'ts'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*/index.js',
    '!src/index.js',
    '!src/index.legacy.js',
  ],
  moduleNameMapper: {
    'shared/(.*)': '<rootDir>/src/shared/$1',
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'src', 'test'],
};
