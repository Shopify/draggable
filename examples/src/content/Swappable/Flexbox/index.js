/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {Swappable} from '@shopify/draggable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function Flexbox() {
  const containers = document.querySelectorAll('#Flexbox .BlockLayout');

  if (containers.length === 0) {
    return false;
  }

  const swappable = new Swappable(containers, {
    draggable: '.Block--isDraggable',
    mirror: {
      constrainDimensions: true,
    },
  });

  return swappable;
}
