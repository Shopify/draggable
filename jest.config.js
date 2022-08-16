const config = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/test-utils/setup.ts',
    '<rootDir>/src/test-utils/environment.ts',
  ],
  fakeTimers: { enableGlobally: true },
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  moduleDirectories: ['node_modules', 'src'],
};

export default config;
