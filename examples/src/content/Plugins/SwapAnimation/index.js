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

  // --- Draggable events --- //
  sortable.on('drag:start', evt => {
    // MAX WILL UPDATE THE LIB TO HAVE A NEW CLASS I CAN HOOK INTO
    evt.originalSource.classList.add('Block--isCloned');
  });

  sortable.on('drag:stop', evt => {
    evt.originalSource.classList.remove('Block--isCloned');
  });

  return sortable;
}
