/** @module utils */

export function closest(element, selector) {
  if (!element) {
    return null;
  }

  function conditionFn(currentElement) {
    if (!currentElement) {
      return currentElement;
    } else if (typeof selector === 'string') {
      const matchFunction = Element.prototype.matches ||
                            Element.prototype.webkitMatchesSelector ||
                            Element.prototype.mozMatchesSelector ||
                            Element.prototype.msMatchesSelector;
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

let scrollAnimationFrame;

export function scroll(element, {clientX, clientY, speed, sensitivity}) {
  if (scrollAnimationFrame) {
    cancelAnimationFrame(scrollAnimationFrame);
  }

  function scrollFn() {
    const rect = element.getBoundingClientRect();
    const offsetY = (Math.abs(rect.bottom - clientY) <= sensitivity) - (Math.abs(rect.top - clientY) <= sensitivity);
    const offsetX = (Math.abs(rect.right - clientX) <= sensitivity) - (Math.abs(rect.left - clientX) <= sensitivity);
    element.scrollTop += offsetY * speed;
    element.scrollLeft += offsetX * speed;
    scrollAnimationFrame = requestAnimationFrame(scrollFn);
  }

  scrollAnimationFrame = requestAnimationFrame(scrollFn);
}
