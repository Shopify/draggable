/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Swappable from 'lib/swappable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function Floated() {
  const containers = document.querySelectorAll('#Floated .BlockLayout');

  if (containers.length === 0) {
    return false;
  }

  const swappable = new Swappable(containers, {
    draggable: '.Block--isDraggable',
    // placedTimeout: 3000,
    classes: {
      'source:placed': '', // doesn't work
    },
    mirror: {
      constrainDimensions: true,
    },
  });

  // EXPERIMENT WITH MANAGING THE PLACED CLASS MYSELF

  // --- Draggable events --- //
  swappable.on('drag:start', evt => {
    // MAX WILL UPDATE THE LIB TO HAVE A NEW CLASS I CAN HOOK INTO
    evt.originalSource.classList.add('Block--isCloned');
  });

  /*
  // doesn't actually work... consult with Max
  swappable.on('swappable:swapped', ({dragEvent, swappedElement}) => {
    const mirror = dragEvent.data.mirror;
    const swappedHeight = swappedElement.offsetHeight;

    mirror.style.height = `${swappedHeight}px`;
  });
*/

  swappable.on('drag:stop', evt => {
    evt.originalSource.classList.remove('Block--isCloned');
  });

  return swappable;
}
