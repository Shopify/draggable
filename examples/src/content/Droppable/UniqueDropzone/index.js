/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Droppable from 'lib/droppable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function UniqueDropzone() {
  const containers = document.querySelectorAll('#UniqueDropzone .BlockLayout');

  if (containers.length === 0) {
    return false;
  }

  const droppable = new Droppable(containers, {
    draggable: '.Block--isDraggable',
    droppable: '.BlockWrapper--isDroppable',
    mirror: {
      constrainDimensions: true,
    },
  });

  let droppableOrigin;

  // --- Draggable events --- //
  droppable.on('drag:start', (evt) => {
    droppableOrigin = evt.originalSource.parentNode.dataset.droppable;
  });

  droppable.on('droppable:over', (evt) => {
    if (droppableOrigin !== evt.droppable.dataset.droppable) {
      evt.cancel();
    }
  });

  return droppable;
}
