/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Sortable from 'lib/sortable';
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

  // --- Draggable events --- //
  sortable.on('drag:start', evt => {
    evt.originalSource.classList.add('PaperStackItem--isCloned');
  });

  sortable.on('drag:stop', evt => {
    evt.originalSource.classList.remove('PaperStackItem--isCloned');
  });

  return sortable;
}
