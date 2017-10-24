/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Sortable from 'lib/sortable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */
import matchMirrorSize from '../../shared/match-mirror-size';

function manageEmptyState(containers) {
  const emptyClass = 'draggable-container--is-empty';

  containers.forEach(container => {
    const countChildren = container.querySelectorAll('.StackedListItem').length;
    container.classList.toggle(emptyClass, countChildren <= 1);
  });
}

export default function MultipleContainers() {
  const containers = document.querySelectorAll('#MultipleContainers .Container');

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: '.StackedListItem--isDraggable',
    mirror: {
      constrainDimensions: true,
    },
  });

  const containerTwo = document.getElementById('ContainerTwo');
  const containerTwoCapacity = 3;
  let currentMediumChildren;
  let lastOverContainer;

  // --- Draggable events --- //
  sortable.on('drag:start', evt => {
    evt.originalSource.classList.add('StackedListItem--isCloned');
    // this is inefficient and should be shared with my manageEmptyState code
    currentMediumChildren = containerTwo.querySelectorAll('.StackedListItem').length;
    lastOverContainer = evt.sourceContainer;
  });

  // This suprisingly does not work...
  sortable.on('drag:over', evt => {
    if (currentMediumChildren !== containerTwoCapacity) {
      return;
    }

    if (evt.overContainer === containerTwo) {
      evt.cancel();
      console.log('#ContainerTwo capacity reached:', currentMediumChildren);
    }
  });

  sortable.on('sortable:sorted', evt => {
    if (lastOverContainer === evt.dragEvent.overContainer) {
      return;
    }

    matchMirrorSize(evt.dragEvent);
    manageEmptyState(containers);

    lastOverContainer = evt.dragEvent.overContainer;
  });

  sortable.on('drag:stop', evt => {
    evt.originalSource.classList.remove('StackedListItem--isCloned');
  });

  return sortable;
}
