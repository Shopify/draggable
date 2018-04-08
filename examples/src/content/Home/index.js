// eslint-disable-next-line import/no-unresolved
import {Draggable} from '@shopify/draggable';
import Plate from '../../components/Plate';

export default function Home() {
  const containerSelector = '#Home .PlateWrapper';
  const container = document.querySelector(containerSelector);

  if (!container) {
    return false;
  }

  const draggable = new Draggable(container, {
    draggable: '.Plate',
  });
  const plates = new Plate(container);

  // --- Draggable events --- //
  draggable.on('drag:start', (evt) => {
    plates.setThreshold();
    plates.setInitialMousePosition(evt.sensorEvent);
  });

  draggable.on('drag:move', (evt) => {
    // rAF seems to cause the animation to get stuck?
    // requestAnimationFrame(() => {});
    plates.dragWarp(evt.source, evt.sensorEvent);
  });

  draggable.on('drag:stop', () => {
    plates.resetWarp();
  });

  return draggable;
}
