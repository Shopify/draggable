const matchFunction =
  Element.prototype.matches ||
  (Element as any).prototype.mozMatchesSelector ||
  (Element as any).prototype.msMatchesSelector;

/**
 * Get the closest parent element of a given element that matches the given
 * selector string or matching function
 *
 * @param {Element} element The child element to find a parent of
 * @param {String|Function} selector The string or function to use to match
 *     the parent element
 * @return {Element|null}
 */

export type Value =
  | string
  | ((element: HTMLElement) => void)
  | NodeList
  | Array<HTMLElement>
  | HTMLElement;

export default function closest(
  element?: HTMLElement,
  value?: Value
): HTMLElement | null {
  if (!element) return null;

  function conditionFn(currentElement: HTMLElement) {
    if (!currentElement) return currentElement;
    else if (Boolean(typeof value === 'string'))
      return matchFunction.call(currentElement, value);
    else if (Boolean(value instanceof NodeList || value instanceof Array))
      return [...(<Element[]>value)].includes(currentElement);
    else if (Boolean(value instanceof Element)) return value === currentElement;
    else if (Boolean(typeof value === 'function'))
      return (<Function>value)(currentElement);
    else return null;
  }

  let current: any = element;

  do {
    current =
      current.correspondingUseElement ||
      current.correspondingElement ||
      current;

    if (conditionFn(current)) return current;

    current = current.parentNode;
  } while (current && current !== document.body && current !== document);

  return null;
}
