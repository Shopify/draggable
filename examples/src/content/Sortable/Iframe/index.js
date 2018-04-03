/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {Sortable} from '@shopify/draggable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function Iframes() {
  let sortable;
  const containerSelector = '#iFrames .StackedList';
  const outsideFrameContainers = document.querySelectorAll(containerSelector);
  const iframe = document.querySelector('.iFrame');

  if (outsideFrameContainers.length === 0 || !iframe) {
    return false;
  }

  iframe.addEventListener('load', (event) => {
    const iframeDocument = event.target.contentDocument;
    const insideFrameContainer = iframeDocument.querySelector(containerSelector);
    const containers = [insideFrameContainer, ...outsideFrameContainers];

    sortable = new Sortable(
      containers,
      {
        draggable: '.StackedListItem--isDraggable',
        appendTo: containerSelector,
        delay: 0,
        mirror: {
          constrainDimensions: true,
        },
      },
      [document, iframeDocument],
    );
  });

  return sortable;
}
