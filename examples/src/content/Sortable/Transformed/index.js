/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {Sortable} from '@shopify/draggable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function Transformed() {
  const containerSelector = '#Transformed .PaperStack';
  const containers = document.querySelectorAll(containerSelector);

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: '.PaperStackItem--isDraggable',
    appendTo: containerSelector,
    mirror: {
      constrainDimensions: true,
    },
  });

  return sortable;
}
