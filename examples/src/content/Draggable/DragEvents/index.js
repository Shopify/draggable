/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {Draggable} from '@shopify/draggable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

function translateMirror(mirror, mirrorCoords, containerRect) {
  if (mirrorCoords.top < containerRect.top || mirrorCoords.left < containerRect.left) {
    return;
  }

  requestAnimationFrame(() => {
    mirror.style.transform = `translate3d(${mirrorCoords.left}px, ${mirrorCoords.top}px, 0)`;
  });
}

function calcOffset(offset) {
  return offset * 2 * 0.5;
}

export default function DragEvents() {
  const toggleClass = 'PillSwitch--isOn';
  const containers = document.querySelectorAll('#DragEvents .PillSwitch');

  if (containers.length === 0) {
    return false;
  }

  const draggable = new Draggable(containers, {
    draggable: '.PillSwitchControl',
    delay: 0,
  });

  let isToggled = false;
  let initialMousePosition;
  let containerRect;
  let dragRect;
  let dragThreshold;
  let headings;
  let headingText;

  // --- Draggable events --- //
  draggable.on('drag:start', (evt) => {
    initialMousePosition = {
      x: evt.sensorEvent.clientX,
      y: evt.sensorEvent.clientY,
    };
  });

  draggable.on('mirror:created', (evt) => {
    containerRect = evt.sourceContainer.getBoundingClientRect();
    dragRect = evt.originalSource.getBoundingClientRect();

    const containerRectQuarter = containerRect.width / 4;
    dragThreshold = isToggled ? containerRectQuarter * -1 : containerRectQuarter;
    headings = {
      source: evt.originalSource.querySelector('[data-switch-on]'),
      mirror: evt.mirror.querySelector('[data-switch-on]'),
    };
    headingText = {
      on: headings.source.dataset.switchOn,
      off: headings.source.dataset.switchOff,
    };
  });

  draggable.on('drag:move', (evt) => {
    // Required to help restrict the draggable element to the container
    evt.cancel();

    // We do not want to use `getBoundingClientRect` while dragging,
    // as that would be very expensive.
    // Instead, we look at the mouse position, which we can ballpark as being
    // close to the center of the draggable element.
    // We need to look at both the X and Y offset and determine which is the higher number.
    // That way we can drag outside of the container and still have the
    // draggable element move appropriately.
    const offsetX = calcOffset(evt.sensorEvent.clientX - initialMousePosition.x);
    const offsetY = calcOffset(initialMousePosition.y - evt.sensorEvent.clientY);
    const offsetValue = offsetX > offsetY ? offsetX : offsetY;
    const mirrorCoords = {
      top: dragRect.top - offsetValue,
      left: dragRect.left + offsetValue,
    };

    translateMirror(evt.mirror, mirrorCoords, containerRect);

    if (isToggled && offsetValue < dragThreshold) {
      evt.sourceContainer.classList.remove(toggleClass);
      headings.source.textContent = headingText.off;
      headings.mirror.textContent = headingText.off;
      isToggled = false;
    } else if (!isToggled && offsetValue > dragThreshold) {
      evt.sourceContainer.classList.add(toggleClass);
      headings.source.textContent = headingText.on;
      headings.mirror.textContent = headingText.on;
      isToggled = true;
    }
  });

  return draggable;
}
