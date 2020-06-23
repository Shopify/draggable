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

function getNearestPointForSky(point, points) {
  let result = point;
  let distance = Infinity;

  points.forEach((poi) => {
    if (
      !(
        point.x < poi.x + poi.range[1] &&
        point.x > poi.x - poi.range[3] &&
        point.y > poi.y - poi.range[0] &&
        point.y < poi.y + poi.range[2]
      )
    ) {
      return;
    }
    const tempDistance = (point.x - poi.x) ** 2 + (point.y - poi.y) ** 2;
    if (tempDistance < distance) {
      result = poi;
      distance = tempDistance;
    }
  });

  // console.log(points);
  return result;
}

function initSky() {
  const container = document.querySelector('.sky');

  const points = [];
  let pointerStart = {x: 0, y: 0};
  let mirrorStart = {x: 0, y: 0};
  // const offset = {x: 0, y: 0};

  const draggable = new Draggable([container], {
    draggable: '.sky__item',
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

    [...document.querySelectorAll('.star')].forEach((star) => {
      const rect = star.getBoundingClientRect();
      let range = [15, 25, 25, 15];
      if (star.classList.contains('star1')) {
        range = [Infinity, Infinity, Infinity, Infinity];
      }
      points.push({x: rect.x + 15 - mirrorStart.x, y: rect.y + 15 - mirrorStart.y, range});
    });
  });

  draggable.on('mirror:move', (evt) => {
    evt.cancel();

    requestAnimationFrame(() => {
      const {clientX, clientY} = evt.sensorEvent;
      const nearestPoint = getNearestPointForSky(
        {
          x: clientX - pointerStart.x,
          y: clientY - pointerStart.y,
        },
        points,
      );
      const translate = {
        x: mirrorStart.x + nearestPoint.x,
        y: mirrorStart.y + nearestPoint.y,
      };

      evt.mirror.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0px)`;
    });
  });
}

export default function PluginsSnapMirror() {
  const container = document.querySelector('.box');

  let pointerStart = {x: 0, y: 0};
  let mirrorStart = {x: 0, y: 0};
  // const offset = {x: 0, y: 0};

  const draggable = new Draggable([container], {
    draggable: '.box__item',
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

  // demo sky
  initSky();

  return draggable;
}
