/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {Sortable} from '@shopify/draggable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */
import matchMirrorSize from '../../../scripts/utils/match-mirror-size';

const Classes = {
  draggable: 'StackedListItem--isDraggable',
  capacity: 'draggable-container-parent--capacity',
};

export default function MultipleContainers() {
  const containers = document.querySelectorAll('#MultipleContainers .StackedList');

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: `.${Classes.draggable}`,
    mirror: {
      constrainDimensions: true,
    },
  });

  const containerTwoCapacity = 3;
  const containerTwoParent = sortable.containers[1].parentNode;
  let currentMediumChildren;
  let capacityReached;
  let lastOverContainer;

  // --- Draggable events --- //
  sortable.on('drag:start', (evt) => {
    currentMediumChildren = sortable.getDraggableElementsForContainer(sortable.containers[1]).length;
    capacityReached = currentMediumChildren === containerTwoCapacity;
    lastOverContainer = evt.sourceContainer;
    containerTwoParent.classList.toggle(Classes.capacity, capacityReached);
  });

  sortable.on('sortable:sort', (evt) => {
    if (!capacityReached) {
      return;
    }

    const sourceIsCapacityContainer = evt.dragEvent.sourceContainer === sortable.containers[1];

    if (!sourceIsCapacityContainer && evt.dragEvent.overContainer === sortable.containers[1]) {
      evt.cancel();
    }
  });

  sortable.on('sortable:sorted', (evt) => {
    if (lastOverContainer === evt.dragEvent.overContainer) {
      return;
    }

    matchMirrorSize(evt.dragEvent, Classes.draggable);
    lastOverContainer = evt.dragEvent.overContainer;
  });

  return sortable;
}
