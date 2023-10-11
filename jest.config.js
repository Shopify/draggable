module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.(js|ts)'],
  setupFiles: ['<rootDir>/test/environment.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  transform: {
    '\\.(ts|js)': ['babel-jest'],
  },
  moduleFileExtensions: ['js', 'ts'],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*/index.{js,ts}',
    '!src/index.{js,ts}',
  ],
  moduleNameMapper: {
    'shared/(.*)': '<rootDir>/src/shared/$1',
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'src', 'test'],
};
