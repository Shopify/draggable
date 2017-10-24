/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Swappable from 'lib/swappable';
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

  // --- Draggable events --- //
  // swappable.on('drag:start', evt => console.log('Drag: Start', evt));
  // swappable.on('drag:stop', evt => console.log('Drag: Stop', evt));

  return swappable;
}
