export default function matchMirrorSize(dragEvent) {
  dragEvent.overContainer.appendChild(dragEvent.mirror);

  const overRect = dragEvent.over.getBoundingClientRect();

  dragEvent.mirror.style.width = `${overRect.width}px`;
  dragEvent.mirror.style.height = `${overRect.height}px`;
}
