/// <reference types="jest" />

import AbstractEvent from '../shared/AbstractEvent';

type CustomMatchersType<R> = {
  toHaveDefaultPrevented: () => R;
  toHaveStoppedPropagation: () => R;
  toHaveBeenCalledWithEvent: (expectedEvent: AbstractEvent) => R;
  toHaveBeenCalledWithEventProperties: (
    expectedEvent: Record<string, unknown>
  ) => R;
  toHaveOrder: (expectedOrder: Element[]) => R;
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
