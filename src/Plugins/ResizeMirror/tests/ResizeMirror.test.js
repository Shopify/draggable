import {
  createSandbox,
  waitForRequestAnimationFrame,
  clickMouse,
  moveMouse,
  releaseMouse,
  waitForDragDelay,
  DRAG_DELAY,
} from 'helper';
import {Draggable} from '../../..';
import ResizeMirror from '..';

const sampleMarkup = `
  <ul class="Container">
    <li>Smaller item</li>
  </ul>
  <ul class="Container">
    <li>Larger item</li>
  </ul>
  <ul class="Container">
    <!-- Empty -->
  </ul>
`;

describe('ResizeMirror', () => {
  const smallerDraggableDimensions = {
    width: 100,
    height: 30,
  };

  const largerDraggableDimensions = {
    width: smallerDraggableDimensions.width * 2,
    height: smallerDraggableDimensions.height * 2,
  };

  let sandbox;
  let containers;
  let draggable;
  let draggables;
  let smallerDraggable;
  let largerDraggable;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    containers = sandbox.querySelectorAll('.Container');
    draggables = sandbox.querySelectorAll('li');

    smallerDraggable = draggables[0];
    largerDraggable = draggables[1];

    mockDimensions(smallerDraggable, smallerDraggableDimensions);
    mockDimensions(largerDraggable, largerDraggableDimensions);

    draggable = new Draggable(containers, {
      draggable: 'li',
      delay: DRAG_DELAY,
      plugins: [ResizeMirror],
    });
  });

  afterEach(() => {
    draggable.destroy();
    sandbox.parentNode.removeChild(sandbox);
  });

  it('resizes mirror based on over element', () => {
    clickMouse(smallerDraggable);
    waitForDragDelay();

    const mirror = getMirror(containers[0]);

    expect(mirror.style).toMatchObject({
      width: `${smallerDraggableDimensions.width}px`,
      height: `${smallerDraggableDimensions.height}px`,
    });

    moveMouse(largerDraggable);
    waitForRequestAnimationFrame();
    waitForNextRequestAnimationFrame();

    expect(mirror.style).toMatchObject({
      width: `${largerDraggableDimensions.width}px`,
      height: `${largerDraggableDimensions.height}px`,
    });

    moveMouse(smallerDraggable);
    waitForRequestAnimationFrame();
    waitForNextRequestAnimationFrame();

    expect(mirror.style).toMatchObject({
      width: `${smallerDraggableDimensions.width}px`,
      height: `${smallerDraggableDimensions.height}px`,
    });

    releaseMouse(largerDraggable);
  });

  it('appends mirror in over container', () => {
    clickMouse(smallerDraggable);
    waitForDragDelay();

    const mirror = getMirror(containers[0]);

    moveMouse(largerDraggable);
    waitForRequestAnimationFrame();

    expect(mirror.parentNode).toBe(containers[1]);

    releaseMouse(largerDraggable);
  });
});

function getMirror(containerWithMirror) {
  // figure out how we can resolve mirror promises to set the mirror class
  // so we don't have to assume the mirror gets appended at the end of the
  // container
  const children = containerWithMirror.children;
  return children[children.length - 1];
}

function mockDimensions(element, {width = 0, height = 0}) {
  Object.assign(element.style, {
    width: `${width}px`,
    height: `${height}px`,
  });

  element.getBoundingClientRect = () => ({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
  });

  return element;
}

function waitForNextRequestAnimationFrame() {
  waitForRequestAnimationFrame();
  waitForRequestAnimationFrame();
}
