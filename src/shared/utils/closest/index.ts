/**
 * Get the closest parent element of a given element that matches the given
 * selector string or matching function
 */

export type Value =
  | string
  | ((element: Element) => void)
  | NodeList
  | Array<Element>
  | Element;

export default function closest(
  element?: HTMLElement,
  value?: Value
): HTMLElement | null {
  if (!element) return null;

  function conditionFn(currentElement: HTMLElement) {
    if (!currentElement) return currentElement;
    else if (typeof value === 'string') return currentElement.matches(value);
    else if (value instanceof NodeList || value instanceof Array)
      return [...value].includes(currentElement);
    else if (value instanceof HTMLElement) return value === currentElement;
    else if (typeof value === 'function') return value(currentElement);
    else return null;
  }

  let current: HTMLElement = element;

  do {
    if (conditionFn(current)) return <HTMLElement>current;
    current = current.parentElement;
  } while (
    current &&
    current !== document.body &&
    current !== document.documentElement
  );

  return null;
}
