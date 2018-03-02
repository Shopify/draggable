function toHaveTriggeredSensorEvent(received, expectedEventName) {
  let triggered = false;

  function callback() {
    triggered = true;
  }

  document.addEventListener(expectedEventName, callback);
  received();
  document.removeEventListener(expectedEventName, callback);

  const pass = Boolean(triggered);

  return {
    pass,
    message: () => {
      const expectation = pass ? 'not to have been' : 'to have been';

      return `Expected sensor event '${expectedEventName}' ${expectation} triggered`;
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
