/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {Sortable} from '@shopify/draggable';
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

  return sortable;
}
