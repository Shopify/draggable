const matchFunction = Element.prototype.matches ||
                      Element.prototype.webkitMatchesSelector ||
                      Element.prototype.mozMatchesSelector ||
                      Element.prototype.msMatchesSelector;

export default function closest(element, selector) {
  if (!element) {
    return null;
  }

  function conditionFn(currentElement) {
    if (!currentElement) {
      return currentElement;
    } else if (typeof selector === 'string') {
      return matchFunction.call(currentElement, selector);
    } else {
      return selector(currentElement);
    }
  }

  let current = element;

  do {
    current = current.correspondingUseElement || current.correspondingElement || current;
    if (conditionFn(current)) {
      return current;
    }
    current = current.parentNode;
  } while (current !== document.body && current !== document);

  return null;
}
