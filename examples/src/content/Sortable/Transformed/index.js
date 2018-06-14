// eslint-disable-next-line import/no-unresolved
import {Sortable} from '@shopify/draggable';

export default function Transformed() {
  const containerSelector = '#Transformed .PaperStack';
  const containers = document.querySelectorAll(containerSelector);

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: '.PaperStackItem--isDraggable',
    mirror: {
      appendTo: containerSelector,
      constrainDimensions: true,
    },
  });

  return sortable;
}
