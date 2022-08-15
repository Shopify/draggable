import { fireEvent } from '@testing-library/dom';
import { withElementFromPoint } from './environment';

export function triggerEvent(element, type, data = {}) {
  const event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
  });

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      Object.defineProperty(event, key, {
        value: data[key],
      });
    }
  }

  withElementFromPoint(element, () => {
    fireEvent(element, event);
  });

  return event;
}
