/**
 * Get the new clone with canvas content cloned for a given node.
 *
 * @param {Node} node The node to clone
 * @param {Boolean} deep equal to the deep parameter of Node.cloneNode(), default false
 * @return {Node} new clone with canvas content cloned
 */
export default function cloneNode(node, deep = false) {
  const newClone = node.cloneNode(deep);
  let canvases;
  let newCanvases;
  if (node.tagName === 'CANVAS') {
    canvases = [node];
    newCanvases = [newClone];
  } else {
    canvases = node.querySelectorAll('canvas');
    newCanvases = newClone.querySelectorAll('canvas');
  }
  [...newCanvases].forEach((newCanvas, i) => {
    newCanvas.getContext('2d').drawImage(canvases[i], 0, 0);
  });
  return newClone;
}
