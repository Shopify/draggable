import {
  createSandbox,
  waitForRequestAnimationFrame,
  clickMouse,
  moveMouse,
  releaseMouse,
  waitForDragDelay,
  DRAG_DELAY,
} from 'helper';
import {Draggable} from '../../../..';
import Collidable from '..';

const sampleMarkup = `
  <ul class="Container">
    <li>Draggable item</li>
  </ul>
  <ul class="Container">
    <!-- Empty -->
  </ul>
  <div class="Collidable"></div>
`;

describe('Collidable', () => {
  let sandbox;
  let containers;
  let draggable;
  let draggableElement;
  let collidableElement;

  const defaultOptions = {
    draggable: 'li',
    collidables: '.Collidable',
    delay: DRAG_DELAY,
    plugins: [Collidable],
  };

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    containers = sandbox.querySelectorAll('.Container');
    draggableElement = sandbox.querySelector('li');
    collidableElement = sandbox.querySelector('.Collidable');
  });

  afterEach(() => {
    draggable.destroy();
    sandbox.parentNode.removeChild(sandbox);
  });

  describe('#getCollidables', () => {
    it('returns collidable elements with selector', () => {
      draggable = new Draggable(containers, {collidables: '.Collidable'});
      const collidable = new Collidable(draggable);
      expect(collidable.getCollidables()).toEqual([collidableElement]);
    });

    it('returns collidable elements with NodeList', () => {
      const nodeList = document.querySelectorAll('.Collidable');
      draggable = new Draggable(containers, {collidables: nodeList});
      const collidable = new Collidable(draggable);
      expect(collidable.getCollidables()).toEqual([collidableElement]);
    });

    it('returns collidable elements with array of elements', () => {
      draggable = new Draggable(containers, {collidables: [collidableElement]});
      const collidable = new Collidable(draggable);
      expect(collidable.getCollidables()).toEqual([collidableElement]);
    });

    it('returns collidable elements with element', () => {
      draggable = new Draggable(containers, {collidables: collidableElement});
      const collidable = new Collidable(draggable);
      expect(collidable.getCollidables()).toEqual([collidableElement]);
    });

    it('returns collidable elements with function', () => {
      draggable = new Draggable(containers, {collidables: collidableFunction});
      const collidable = new Collidable(draggable);
      expect(collidable.getCollidables()).toEqual([collidableElement]);
    });

    function collidableFunction() {
      return [collidableElement];
    }
  });

  it('finds collidables while dragging', () => {
    draggable = new Draggable(containers, {...defaultOptions});
    const collidablePlugin = draggable.plugins.find((plugin) => plugin.constructor === Collidable);

    clickMouse(draggableElement);
    waitForDragDelay();

    moveMouse(collidableElement);

    waitForRequestAnimationFrame();

    expect(collidablePlugin.currentlyCollidingElement).toBe(collidableElement);

    releaseMouse(draggable.source);
  });

  it('triggers collidable:in event', () => {
    draggable = new Draggable(containers, {...defaultOptions});

    const eventHandler = jest.fn();
    draggable.on('collidable:in', eventHandler);

    clickMouse(draggableElement);
    waitForDragDelay();

    moveMouse(collidableElement);
    waitForRequestAnimationFrame();
    moveMouse(collidableElement);

    expect(eventHandler).toHaveBeenCalled();
    expect(eventHandler).toHaveBeenCalledTimes(1);

    releaseMouse(draggable.source);
  });

  it('triggers collidable:out event', () => {
    draggable = new Draggable(containers, {...defaultOptions});

    const collidableInHandler = jest.fn();
    const collidableOutHandler = jest.fn();
    draggable.on('collidable:in', collidableInHandler);
    draggable.on('collidable:out', collidableOutHandler);

    clickMouse(draggableElement);
    waitForDragDelay();

    moveMouse(collidableElement);
    waitForRequestAnimationFrame();
    moveMouse(collidableElement);

    expect(collidableInHandler).toHaveBeenCalled();
    expect(collidableInHandler).toHaveBeenCalledTimes(1);

    moveMouse(draggableElement);
    waitForRequestAnimationFrame();

    expect(collidableOutHandler).toHaveBeenCalled();
    expect(collidableOutHandler).toHaveBeenCalledTimes(1);

    releaseMouse(draggable.source);
  });
});
