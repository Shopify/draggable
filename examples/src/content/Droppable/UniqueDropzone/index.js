// eslint-disable-next-line import/no-unresolved
import {Droppable} from '@bestminr/draggable';

export default function UniqueDropzone() {
  const containers = document.querySelectorAll('#UniqueDropzone .BlockLayout');

  if (containers.length === 0) {
    return false;
  }

  const droppable = new Droppable(containers, {
    draggable: '.Block--isDraggable',
    dropzone: '.BlockWrapper--isDropzone',
    mirror: {
      constrainDimensions: true,
    },
  });

  let droppableOrigin;

  // --- Draggable events --- //
  droppable.on('drag:start', (evt) => {
    droppableOrigin = evt.originalSource.parentNode.dataset.dropzone;
  });

  droppable.on('droppable:dropped', (evt) => {
    if (droppableOrigin !== evt.dropzone.dataset.dropzone) {
      evt.cancel();
    }
  });

  return droppable;
}
