/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {Swappable} from '@shopify/draggable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function GridLayout() {
  const containerSelector = '#GridLayout .BlockLayout';
  const containers = document.querySelectorAll(containerSelector);

  if (containers.length === 0) {
    return false;
  }

  const swappable = new Swappable(containers, {
    draggable: '.Block--isDraggable',
    appendTo: containerSelector,
    mirror: {
      constrainDimensions: true,
    },
  });

  return swappable;
}
