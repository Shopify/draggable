const matchFunction =
  Element.prototype.matches ||
  (Element as any).prototype.mozMatchesSelector ||
  (Element as any).prototype.msMatchesSelector;

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
  element?: Element,
  value?: Value
): HTMLElement | null {
  if (!element) return null;

  function conditionFn(currentElement: Element) {
    if (!currentElement) return currentElement;
    else if (typeof value === 'string')
      return matchFunction.call(currentElement, value);
    else if (value instanceof NodeList || value instanceof Array)
      return [...(<Element[]>value)].includes(currentElement);
    else if (value instanceof Element) return value === currentElement;
    else if (typeof value === 'function')
      return (<(element: Element) => void>value)(currentElement);
    else return null;
  }

  let current: Element = element;

  do {
    if (conditionFn(current)) return <HTMLElement>current;
    current = <Element>current.parentNode;
  } while (
    current &&
    current !== document.body &&
    current !== <Element>(<unknown>document)
  );

  return null;
}
