export function toHaveTriggeredSensorEvent(
  received: () => void,
  expectedEventName: string,
  expectedCount: number
) {
  const callback = jest.fn();

  document.addEventListener(expectedEventName, callback);
  received();
  document.removeEventListener(expectedEventName, callback);

  const pass = callback.mock.calls.length > 0;

  return {
    pass,
    message: () => {
      const expectation = pass ? 'not to have been' : 'to have been';
      const defaultMessage = `Expected sensor event '${expectedEventName}' ${expectation} triggered`;

      return expectedCount
        ? `${defaultMessage} ${expectedCount} time(s)`
        : defaultMessage;
    },
  };
}

export function toHaveCanceledSensorEvent(
  received: () => void,
  expectedEventName: string
) {
  let canceled = false;

  function callback(event) {
    canceled = event.detail.defaultPrevented;
  }

  document.addEventListener(expectedEventName, callback);
  received();
  document.removeEventListener(expectedEventName, callback);

  const pass = Boolean(canceled);

  return {
    pass,
    message: () => {
      const expectation = pass ? 'not to have been' : 'to have been';

      return `Expected sensor event '${expectedEventName}' ${expectation} canceled`;
    },
  };
}
