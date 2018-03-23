const matchFunction =
  Element.prototype.matches ||
  Element.prototype.webkitMatchesSelector ||
  Element.prototype.mozMatchesSelector ||
  Element.prototype.msMatchesSelector;

export default function matches(element, selector) {
  return matchFunction.call(element, selector);
}
