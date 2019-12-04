// eslint-disable-next-line import/no-unresolved
import { Draggable } from '@bestminr/draggable';

export default function ManualStartDrag() {
  const container = document.getElementById('ManualStartDrag');
  if (!container) return false;

  console.log('ManualStartDrag');

  const draggable = new Draggable(container, {
    draggable: '.StackedListItem--isDraggable',
    getMultiDragItems(target, options, draggable) {
      return container.querySelectorAll('.StackedListItem--isDraggable.selected');
    },
  });

  container.addEventListener('dblclick', () => {
    draggable.startDrag();
  });
}
