export function toHaveDefaultPrevented(expectedEvent: Event) {
  const pass = Boolean(expectedEvent.defaultPrevented);

  return {
    pass,
    message: () => {
      const expectation = pass ? 'not to have' : 'to have';

      return `Expected dom event '${expectedEvent.type}' ${expectation} default prevented`;
    },
  };
}

export function toHaveStoppedPropagation(expectedEvent: any) {
  const pass = Boolean(expectedEvent.stoppedPropagation);

  return {
    pass,
    message: () => {
      const expectation = pass ? 'not to have' : 'to have';

      return `Expected dom event '${expectedEvent.type}' ${expectation} stopped propagation`;
    },
  };
}
