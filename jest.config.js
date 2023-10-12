const {TextEncoder} = require('util');

const extensions = ['js', 'jsx', 'ts', 'tsx'];

module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [`<rootDir>/src/**/*.test.(${extensions.join('|')})`],
  setupFiles: ['<rootDir>/test/environment.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  transform: {
    [`\\.(${extensions.join('|')})`]: ['babel-jest'],
  },
  moduleFileExtensions: [...extensions],
  collectCoverageFrom: [
    `src/**/*.{${extensions.join(',')}}`,
    `!src/**/*/index.{${extensions.join(',')}}`,
    `!src/index.{${extensions.join(',')}}`,
  ],
  moduleNameMapper: {
    'shared/(.*)': '<rootDir>/src/shared/$1',
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'src', 'test'],
  globals: {
    TextEncoder,
  },
};
