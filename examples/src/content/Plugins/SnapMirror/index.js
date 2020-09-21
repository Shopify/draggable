// eslint-disable-next-line import/no-unresolved
import {Draggable, Plugins} from '@shopify/draggable';

function initCircle() {
  const container = document.querySelector('#SnapMirror .BlockLayout.CircleRange');
  const containerRect = container.getBoundingClientRect();
  const circleRect = document.querySelector('.circle').getBoundingClientRect();

  const targets = [];
  [...document.querySelectorAll('.Block--typeHollow')].forEach((star) => {
    const rect = star.getBoundingClientRect();
    const range = circleRect.width / 2;
    targets.push({
      x: rect.x - containerRect.x + rect.width / 2,
      y: rect.y - containerRect.y + rect.width / 2,
      range(coord, target, relativePoint, {pointInMirrorCoordinate}) {
        return (
          (coord.x + pointInMirrorCoordinate.x - target.x) ** 2 +
            (coord.y + pointInMirrorCoordinate.y - target.y) ** 2 <
          range ** 2
        );
      },
    });
  });

  console.log(targets);
  const draggable = new Draggable([container], {
    draggable: '.Block--isDraggable',
    mirror: {
      constrainDimensions: true,
    },
    plugins: [Plugins.SnapMirror],
    SnapMirror: {
      targets,
      relativePoints: [{x: 0.5, y: 0.5}],
    },
  });

  let originalSource;

  draggable.on('mirror:create', (evt) => {
    originalSource = evt.originalSource;
  });

  draggable.on('mirror:destroy', (evt) => {
    if (evt.mirror.style.position !== 'absolute') {
      return;
    }
    originalSource.style.transform = evt.mirror.style.transform;
  });

  return draggable;
}

function initWorkspace() {
  const container = document.querySelector('#SnapMirror .BlockLayout.Workspace');

  const draggable = new Draggable([container], {
    draggable: '.Block--isDraggable',
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

  let originalSource;

  draggable.on('mirror:create', (evt) => {
    originalSource = evt.originalSource;
  });

  draggable.on('mirror:destroy', (evt) => {
    if (evt.mirror.style.position !== 'absolute') {
      return;
    }
    originalSource.style.transform = evt.mirror.style.transform;
  });

  return draggable;
}

export default function PluginsSnapMirror() {
  const workspaceDraggable = initWorkspace();
  const CircleDraggable = initCircle();

  return [workspaceDraggable, CircleDraggable];
}
