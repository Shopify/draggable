// eslint-disable-next-line import/no-unresolved
import {Sortable, Plugins} from '@shopify/draggable';

export default function SortAnimation() {
  const containers = document.querySelectorAll('#SortAnimation .BlockLayout');

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: '.Block--isDraggable',
    mirror: {
      constrainDimensions: true,
    },
    plugins: [Plugins.SortAnimation],
    swapAnimation: {
      duration: 200,
      easingFunction: 'ease-in-out',
    },
  });

  return sortable;
}
