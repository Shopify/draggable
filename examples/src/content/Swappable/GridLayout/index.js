// eslint-disable-next-line import/no-unresolved
import {Swappable} from '@shopify/draggable';

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
