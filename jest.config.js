module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/test-utils/setup.ts',
    '<rootDir>/src/test-utils/environment.ts',
  ],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  moduleDirectories: ['node_modules', 'src'],
};
