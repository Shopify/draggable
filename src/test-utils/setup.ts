import * as matchers from './matchers';

expect.extend(matchers);

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runAllTimers();
});
