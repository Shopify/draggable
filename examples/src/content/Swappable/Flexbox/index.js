/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Swappable from 'lib/swappable';
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

  // --- Draggable events --- //
  swappable.on('drag:start', evt => {
    // MAX WILL UPDATE THE LIB TO HAVE A NEW CLASS I CAN HOOK INTO
    evt.originalSource.classList.add('Block--isCloned');
  });

  swappable.on('drag:stop', evt => {
    evt.originalSource.classList.remove('Block--isCloned');
  });

  return swappable;
}
