// eslint-disable-next-line import/no-unresolved
import {Draggable} from '@shopify/draggable';

function getNearestPoint(point) {
  const width = 50;
  const divX = parseInt(point.x / width, 10);
  const divY = parseInt(point.y / width, 10);
  const modX = point.x % width;
  const modY = point.y % width;

  return {
    x: (divX + (modX * 2 > width)) * width,
    y: (divY + (modY * 2 > width)) * width,
  };
}

export default function PluginsSnapMirror() {
  const container = document.querySelector('#SnapMirror');

  let pointerStart = {x: 0, y: 0};
  let mirrorStart = {x: 0, y: 0};
  // const offset = {x: 0, y: 0};

  const draggable = new Draggable([container], {
    draggable: '.box',
    mirror: {
      constrainDimensions: true,
    },
  });

  draggable.on('mirror:created', (evt) => {
    const boundingClientRect = evt.source.getBoundingClientRect();

    mirrorStart = {
      x: boundingClientRect.x,
      y: boundingClientRect.y,
    };
    pointerStart = {
      x: evt.sensorEvent.clientX,
      y: evt.sensorEvent.clientY,
    };
  });

  draggable.on('mirror:move', (evt) => {
    evt.cancel();

    requestAnimationFrame(() => {
      const {clientX, clientY} = evt.sensorEvent;
      const nearestPoint = getNearestPoint({
        x: clientX - pointerStart.x,
        y: clientY - pointerStart.y,
      });
      const translate = {
        x: mirrorStart.x + nearestPoint.x,
        y: mirrorStart.y + nearestPoint.y,
      };

      evt.mirror.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0px)`;
    });
  });

  return draggable;
}
