/// <reference types="jest" />

import AbstractEvent from 'shared/AbstractEvent';
import * as matchers from './matchers';

type CustomMatchersType<R> = {
  toHaveDefaultPrevented: () => R;
  toHaveStoppedPropagation: () => R;
  toHaveBeenCalledWithEvent: (expectedEvent: AbstractEvent) => R;
  toHaveBeenCalledWithEventProperties: (
    expectedEvent: Record<string, unknown>
  ) => R;
  toHaveOrder: (expectedOrder: HTMLElement[]) => R;
  toHaveTriggeredSensorEvent: (
    expectedEventName: string,
    expectedCount: number
  ) => R;
  toHaveCanceledSensorEvent: (expectedEventName: string) => R;
};

declare global {
  namespace jest {
    interface Matchers<R = void, T = {}> extends CustomMatchersType<R> {}
  }
}

expect.extend(matchers);

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runAllTimers();
});
