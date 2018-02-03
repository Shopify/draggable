export default function matchMirrorSize(dragEvent, draggableClass) {
  dragEvent.overContainer.appendChild(dragEvent.mirror);

  let overElement;

  if (dragEvent.over) {
    overElement = dragEvent.over;
  } else {
    overElement = dragEvent.overContainer.querySelector(`.${draggableClass}:not(.draggable--original)`);
  }

  if (overElement) {
    requestAnimationFrame(() => {
      const overRect = overElement.getBoundingClientRect();

      dragEvent.mirror.style.width = `${overRect.width}px`;
      dragEvent.mirror.style.height = `${overRect.height}px`;
    });
  }
}
