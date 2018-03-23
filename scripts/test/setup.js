import './matchers';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  // damn!
  // jest.runAllTimers();
});
