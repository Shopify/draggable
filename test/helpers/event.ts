import {withElementFromPoint} from './environment';

export function triggerEvent(
  element: HTMLElement,
  type: string,
  data: {[key: string]: any} = {},
) {
  const event = document.createEvent('Event');
  event.initEvent(type, true, true);

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      Object.defineProperty(event, key, {
        value: data[key],
      });
    }
  }

  withElementFromPoint(element, () => {
    element.dispatchEvent(event);
  });

  return event;
}
