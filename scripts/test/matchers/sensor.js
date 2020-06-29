function toHaveTriggeredSensorEvent(received, expectedEventName, count) {
  let triggered = false;
  let callCount = 0;
  function callback() {
    count !== undefined && (callCount = callCount + 1);
    triggered = true;
  }

  document.addEventListener(expectedEventName, callback);
  received();
  document.removeEventListener(expectedEventName, callback);

  const pass = Boolean(triggered) && Boolean(count === undefined || callCount === count);

  return {
    pass,
    message: () => {
      const expectation = pass ? 'not to have been' : 'to have been';
      const defaultMessage = `Expected sensor event '${expectedEventName}' ${expectation} to be triggered`;

      return count ? `${defaultMessage} ${count} time(s)` : defaultMessage;
    },
  };
}

function toHaveCanceledSensorEvent(received, expectedEventName) {
  let canceled = false;

  function callback(event) {
    canceled = event.detail.canceled();
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

expect.extend({
  toHaveTriggeredSensorEvent,
  toHaveCanceledSensorEvent,
});
