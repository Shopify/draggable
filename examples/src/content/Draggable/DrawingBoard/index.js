// eslint-disable-next-line import/no-unresolved
import {Draggable} from '@shopify/draggable';
import DrawingBlock from './DrawingBlock';

const CANVAS_CLASS_NAME = 'DrawingBoardCanvas';

function isCanvas(node) {
  return node.classList.contains(CANVAS_CLASS_NAME);
}

function canCreateShapes({current, max}) {
  return current < max;
}

export default function DrawingBoard() {
  const container = document.querySelector('#DrawingBoard .BlockLayout');
  const template = document.getElementById('DrawingBlockTemplate');
  const canvas = container.querySelector(`.${CANVAS_CLASS_NAME}`);

  if (!container || !template || !canvas) {
    return false;
  }

  const draggable = new Draggable(container);
  const drawingBlock = new DrawingBlock(template, canvas);

  let canvasRect;
  let currentBlock;
  let initialDrawPosition;

  const blocks = {
    nodes: {},
    count: {
      current: 0,
      max: 10,
    },
  };

  // --- Draggable events --- //
  draggable.on('drag:start', (evt) => {
    if (isCanvas(evt.source)) {
      if (!canCreateShapes(blocks.count)) {
        console.warn(`You already have the maximum number (${blocks.count.max}) of blocks on the board!`);
        evt.cancel();
        return;
      }

      canvasRect = evt.source.getBoundingClientRect();
      initialDrawPosition = drawingBlock.getPositionWithinCanvas(
        {
          top: evt.sensorEvent.clientY,
          left: evt.sensorEvent.clientX,
        },
        canvasRect,
      );

      const blockId = `DrawingBlock${blocks.count.current + 1}`;
      const fragment = drawingBlock.edit(drawingBlock.clone, {
        id: blockId,
        classes: ['draggable-source'],
        style: {
          top: `${initialDrawPosition.top}px`,
          left: `${initialDrawPosition.left}px`,
        },
      });

      container.appendChild(fragment);
      blocks.nodes[blockId] = document.getElementById(blockId);
      currentBlock = blocks.nodes[blockId];
      blocks.count.current++;
    } else {
      console.log('You have STARTED dragging one of the DrawingBlocks!');
    }
  });

  draggable.on('drag:move', (evt) => {
    if (isCanvas(evt.source)) {
      const movingPosition = drawingBlock.getPositionWithinCanvas(
        {
          top: evt.sensorEvent.clientY,
          left: evt.sensorEvent.clientX,
        },
        canvasRect,
        initialDrawPosition,
      );

      currentBlock.style.width = `${movingPosition.left}px`;
      currentBlock.style.height = `${movingPosition.top}px`;
    } else {
      console.log('You are MOVING dragging one of the DrawingBlocks!');
    }
  });

  draggable.on('drag:stop', () => {
    canvasRect = null;
    currentBlock = null;
    initialDrawPosition = null;
  });

  // suppress mirror creation
  draggable.on('mirror:create', (evt) => evt.cancel());

  return draggable;
}
