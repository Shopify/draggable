/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Sortable from 'lib/sortable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function SimpleList() {
  const containerSelector = '#SimpleList .StackedList';
  const containers = document.querySelectorAll(containerSelector);

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: '.StackedListItem--isDraggable',
    appendTo: containerSelector,
    mirror: {
      constrainDimensions: true,
    },
  });

  // --- Draggable events --- //
  sortable.on('drag:start', evt => {
    evt.originalSource.classList.add('StackedListItem--isCloned');
  });

  sortable.on('drag:stop', evt => {
    evt.originalSource.classList.remove('StackedListItem--isCloned');
  });

  return sortable;
}
