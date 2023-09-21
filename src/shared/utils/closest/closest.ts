declare global {
  export interface Node {
    correspondingUseElement: SVGUseElement;
    correspondingElement: SVGElement;
  }
}

type CallbackFunction = (element: Node) => boolean;
type Value = string | CallbackFunction | NodeList | Node | Node[];

/**
 * Get the closest parent element node of a given node that matches the given
 * selector string or matching function
 *
 * @param {Node} node The child element to find a parent of
 * @param {String|Function} selector The string or function to use to match
 *     the parent node
 * @return {Node|null}
 */
export default function closest(node?: Node, value?: Value) {
  if (node == null) {
    return null;
  }

  function conditionFn(currentNode: Node | null): boolean {
    if (currentNode == null || value == null) {
      return false;
    } else if (isSelector(value)) {
      return Element.prototype.matches.call(currentNode, value);
    } else if (isNodeList(value)) {
      return [...value].includes(currentNode);
    } else if (isElement(value)) {
      return value === currentNode;
    } else if (isFunction(value)) {
      return value(currentNode);
    } else {
      return false;
    }
  }

  let current: Node | null = node;

  do {
    current =
      current.correspondingUseElement ||
      current.correspondingElement ||
      current;

    if (conditionFn(current)) {
      return current;
    }

    current = current?.parentNode || null;
  } while (
    current != null &&
    current !== document.body &&
    current !== document
  );

  return null;
}

function isSelector(value: Value): value is string {
  return Boolean(typeof value === 'string');
}

function isNodeList(value: Value): value is NodeList | Node[] {
  return Boolean(value instanceof NodeList || value instanceof Array);
}

function isElement(value: Value): value is Node {
  return Boolean(value instanceof Node);
}

function isFunction(value: Value): value is (element: Node) => boolean {
  return Boolean(typeof value === 'function');
}
