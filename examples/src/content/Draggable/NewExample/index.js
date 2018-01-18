/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Draggable from 'lib/draggable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function NewExample() {
  const containers = document.querySelectorAll('#NewExample');
  const draggable = new Draggable(containers);

  // --- Draggable events --- //
  draggable.on('drag:start', (evt) => {
    console.log('Drag start', evt);
  });

  return draggable;
}
