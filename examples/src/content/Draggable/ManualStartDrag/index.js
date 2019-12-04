// eslint-disable-next-line import/no-unresolved
import { Draggable } from '@bestminr/draggable';

export default function ManualStartDrag() {
  const container = document.getElementById('ManualStartDrag');
  if (!container) return false;

  const draggable = new Draggable(container, {
    draggable: '.StackedListItem--isDraggable',
    useManualStart: true,
    mirror: {
      appendTo: container,
      constrainDimensions: true
    }
  });

  container.addEventListener('mousedown', e => {
    // console.log('mousedown', e);
    let shouldStart = true;
    e.path.forEach(ele => {
      if (ele.classList) {
        if (ele.classList.contains('js-no-manual-start')) {
          shouldStart = false;
          return false;
        }
      }
    });
    if (shouldStart) draggable.manualStart(e);
  });
}
