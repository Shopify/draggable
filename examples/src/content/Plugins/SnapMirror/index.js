// eslint-disable-next-line import/no-unresolved
import {Draggable, Plugins} from '@shopify/draggable';

function initMLP() {
  const container = document.querySelector('#SnapMirror .BlockLayout.MLP');
  const containerRect = container.getBoundingClientRect();

  const targets = [];
  [...document.querySelectorAll('.Block--typeHollow')].forEach((star) => {
    const rect = star.getBoundingClientRect();
    let range = Plugins.SnapMirror.inRectRange([15, 25, 25, 15]);
    if (star.classList.contains('star1')) {
      range = Plugins.SnapMirror.inRectRange([Infinity, Infinity, Infinity, Infinity]);
    }
    if (star.classList.contains('star2')) {
      range = 20;
    }
    targets.push({x: rect.x + 20 - containerRect.x, y: rect.y + 20 - containerRect.y, range});
  });

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

  return draggable;
}

export default function PluginsSnapMirror() {
  const workspaceDraggable = initWorkspace();
  const MLPDraggable = initMLP();

  return [workspaceDraggable, MLPDraggable];
}
