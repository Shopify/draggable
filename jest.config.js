module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/test-utils/setup.ts',
    '<rootDir>/src/test-utils/environment.ts',
  ],
  moduleDirectories: ['node_modules', 'src'],
};
