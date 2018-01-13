/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Sortable from 'lib/sortable';
import SwapAnimation from 'lib/plugins/swap-animation';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function PluginsSwapAnimation() {
  const containers = document.querySelectorAll('#SwapAnimation .BlockLayout');

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: '.Block--isDraggable',
    mirror: {
      constrainDimensions: true,
    },
    plugins: [SwapAnimation],
    swapAnimation: {
      duration: 200,
      easingFunction: 'ease-in-out',
    },
  });

  return sortable;
}
