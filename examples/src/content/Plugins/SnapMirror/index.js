// eslint-disable-next-line import/no-unresolved
import {Draggable, Plugins} from '@shopify/draggable';

function initSky() {
  const container = document.querySelector('.sky');
  const containerRect = container.getBoundingClientRect();

  const targets = [];
  [...document.querySelectorAll('.star')].forEach((star) => {
    const rect = star.getBoundingClientRect();
    let range = {rect: [15, 25, 25, 15]};
    if (star.classList.contains('star1')) {
      range = {rect: [Infinity, Infinity, Infinity, Infinity]};
    }
    if (star.classList.contains('star2')) {
      range = {circle: 20};
    }
    targets.push({x: rect.x + 20 - containerRect.x, y: rect.y + 20 - containerRect.y, range});
  });

  const draggable = new Draggable([container], {
    draggable: '.sky__item',
    mirror: {
      constrainDimensions: true,
    },
    plugins: [Plugins.SnapMirror],
    SnapMirror: {
      targets,
      relativePoints: [{x: 0.5, y: 0.5}],
    },
  });

  draggable.on('mirror:created', () => {});

  draggable.on('mirror:move', () => {});
}

export default function PluginsSnapMirror() {
  const container = document.querySelector('.box');

  const draggable = new Draggable([container], {
    draggable: '.box__item',
    mirror: {
      constrainDimensions: true,
    },
    plugins: [Plugins.SnapMirror],
    SnapMirror: {
      targets: [
        Plugins.SnapMirror.grid({
          x: 50,
          y: 50,
        }),
      ],
    },
  });

  // demo sky
  initSky();

  return draggable;
}
