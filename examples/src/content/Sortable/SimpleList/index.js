// eslint-disable-next-line import/no-unresolved
import {Sortable} from '@shopify/draggable';

export default function SimpleList() {
  const containerSelector = '#SimpleList .StackedList';
  const containers = document.querySelectorAll(containerSelector);

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: '.StackedListItem--isDraggable',
    mirror: {
      appendTo: containerSelector,
      constrainDimensions: true,
    },
  });

  return sortable;
}
