/**
 * Query the children of an element, including inside shadowDOMs
 *
 * @param {Element} element The element to be queried into
 * @param {String|Function} selector The string or function to use to match the element
 * @return {Element[]}
 */
export default function querySelectorAll(element, query) {
  const shadowRoots = Array.prototype.slice
    .call(element.querySelectorAll('*'))
    .filter((el) => el.shadowRoot)
    .map((el) => el.shadowRoot);

  let elements = [];
  if (typeof query === 'string') {
    elements = Array.prototype.slice.call(element.querySelectorAll(query));
  } else if (typeof query === 'function') {
    elements = Array.prototype.slice.call(element.querySelectorAll('*')).filter((el) => query(el));
  }

  for (const shadowRoot of shadowRoots) {
    elements.push(...querySelectorAll(shadowRoot, query));
  }
  return elements;
}
