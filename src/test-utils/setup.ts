import * as matchers from './matchers';

expect.extend(matchers);

declare global {
  namespace jest {
    interface Matchers<R = void> {
      toHaveDefaultPrevented: () => R;
      toHaveStoppedPropagation: () => R;
      toHaveBeenCalledWithEvent: (expectedEvent: Event) => R;
      toHaveBeenCalledWithEventProperties: (
        expectedEvent: Record<string, unknown>
      ) => R;
      toHaveOrder: (expectedOrder: Element[]) => R;
      toHaveTriggeredSensorEvent: (
        expectedEventName: string,
        expectedCount?: number
      ) => R;
      toHaveCanceledSensorEvent: (expectedEventName: string) => R;
    }
  }
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runAllTimers();
});
