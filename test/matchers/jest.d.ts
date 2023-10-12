import jest from 'jest';

declare global {
  namespace jest {
    interface Matchers<T> {
      toHaveDefaultPrevented(): T;
      toHaveStoppedPropagation(): T;
      toHaveTriggeredSensorEvent(expectedEventName: string, count?: number): T;
      toHaveCanceledSensorEvent(expectedEventName: string): T;
    }
  }
}
