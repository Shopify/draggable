import './matchers';

/* eslint-disable jest/require-top-level-describe */
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runAllTimers();
});
/* eslint-enable jest/require-top-level-describe */
