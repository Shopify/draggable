function toHaveDefaultPrevented(event) {
  const pass = Boolean(event.defaultPrevented);

  return {
    pass,
    message: () => {
      const expectation = pass ? 'not to have' : 'to have';

      return `Expected dom event '${event.type}' ${expectation} default prevented`;
    },
  };
}

function toHaveStoppedPropagation(event) {
  const pass = Boolean(event.stoppedPropagation);

  return {
    pass,
    message: () => {
      const expectation = pass ? 'not to have' : 'to have';

      return `Expected dom event '${event.type}' ${expectation} stopped propagation`;
    },
  };
}

expect.extend({
  toHaveDefaultPrevented,
  toHaveStoppedPropagation,
});
