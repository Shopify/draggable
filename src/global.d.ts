declare global {
  namespace jest {
    interface Matchers<R = void> {
      toHaveDefaultPrevented: () => R;
      toHaveStoppedPropagation: () => R;
      toHaveBeenCalledWithEvent: (expectedEvent: CustomEvent) => R;
      toHaveBeenCalledWithEventProperties: (
        expectedEvent: Record<string, unknown>
      ) => R;
      toHaveOrder: (expectedOrder: HTMLElement[]) => R;
      toHaveTriggeredSensorEvent: (
        expectedEventName: string,
        expectedCount?: number
      ) => R;
      toHaveCanceledSensorEvent: (expectedEventName: string) => R;
    }
  }
}
