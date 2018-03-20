import {createSandbox, clickMouse, moveMouse, releaseMouse, waitForDragDelay, DRAG_DELAY} from 'helper';
import Swappable from '..';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
    <li>Forth item</li>
  </ul>
  <ul>
    <li>Fith item</li>
    <li>Sixth item</li>
    <li>Seventh item</li>
    <li>Eighth item</li>
  </ul>
`;

describe('Swappable', () => {
  let sandbox;
  let containers;
  let draggableElements;
  let swappable;

  let firstContainer;
  let secondContainer;
  let firstItem;
  let secondItem;
  let thirdItem;
  let forthItem;
  let fifthItem;
  let sixthItem;
  let seventhItem;
  let eighthItem;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    containers = sandbox.querySelectorAll('ul');
    draggableElements = sandbox.querySelectorAll('li');
    swappable = new Swappable(containers, {
      draggable: 'li',
      delay: DRAG_DELAY,
    });
  });

  beforeEach(() => {
    firstContainer = containers[0];
    secondContainer = containers[1];
    firstItem = draggableElements[0];
    secondItem = draggableElements[1];
    thirdItem = draggableElements[2];
    forthItem = draggableElements[3];
    fifthItem = draggableElements[4];
    sixthItem = draggableElements[5];
    seventhItem = draggableElements[6];
    eighthItem = draggableElements[7];
  });

  afterEach(() => {
    swappable.destroy();
    sandbox.parentNode.removeChild(sandbox);
  });

  it('triggers events', () => {
    const swappableStart = jest.fn();
    const swappableSwap = jest.fn();
    const swappableSwapped = jest.fn();
    const swappableStop = jest.fn();

    swappable.on('swappable:start', swappableStart);
    swappable.on('swappable:swap', swappableSwap);
    swappable.on('swappable:swapped', swappableSwapped);
    swappable.on('swappable:stop', swappableStop);

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);
    releaseMouse(swappable.source);

    expect(swappableStart).toHaveBeenCalled();

    expect(swappableSwap).toHaveBeenCalled();

    expect(swappableSwapped).toHaveBeenCalled();

    expect(swappableStop).toHaveBeenCalled();
  });

  it('prevents drag when canceling sortable start event', () => {
    swappable.on('swappable:start', (swappableEvent) => {
      swappableEvent.cancel();
    });

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);

    expect(swappable.isDragging()).toBe(false);

    releaseMouse(swappable.source);
  });

  it('swaps two first elements', () => {
    draggableElements = sandbox.querySelectorAll('li');

    expect(draggableElements[0]).toBe(firstItem);

    expect(draggableElements[1]).toBe(secondItem);

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);
    releaseMouse(swappable.source);

    draggableElements = sandbox.querySelectorAll('li');

    expect(draggableElements[0]).toBe(secondItem);

    expect(draggableElements[1]).toBe(firstItem);
  });

  it('swaps elements as you drag within a single container', () => {
    draggableElements = swappable.getDraggableElementsForContainer(containers[0]);
    expect(draggableElements).toHaveOrder([firstItem, secondItem, thirdItem, forthItem]);

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);

    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([
      secondItem,
      // original firstItem
      swappable.source,
      thirdItem,
      forthItem,
    ]);

    moveMouse(thirdItem);

    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([
      thirdItem,
      secondItem,
      // original firstItem
      swappable.source,
      forthItem,
    ]);

    moveMouse(forthItem);

    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([
      forthItem,
      secondItem,
      thirdItem,
      // original firstItem
      swappable.source,
    ]);

    releaseMouse(swappable.source);

    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([forthItem, secondItem, thirdItem, firstItem]);
  });

  it('sorts elements as you drag between multiple containers', () => {
    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([firstItem, secondItem, thirdItem, forthItem]);

    draggableElements = swappable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([fifthItem, sixthItem, seventhItem, eighthItem]);

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(fifthItem);

    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([fifthItem, secondItem, thirdItem, forthItem]);

    draggableElements = swappable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([
      // original firstItem
      swappable.source,
      sixthItem,
      seventhItem,
      eighthItem,
    ]);

    moveMouse(eighthItem);

    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([eighthItem, secondItem, thirdItem, forthItem]);

    draggableElements = swappable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([
      fifthItem,
      sixthItem,
      seventhItem,
      // original firstItem
      swappable.source,
    ]);

    releaseMouse(swappable.source);

    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([eighthItem, secondItem, thirdItem, forthItem]);

    draggableElements = swappable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([fifthItem, sixthItem, seventhItem, firstItem]);
  });

  it('prevents sorting when sortable:sort event gets canceled', () => {
    swappable.on('swappable:swap', (swappableEvent) => {
      swappableEvent.cancel();
    });

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);

    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([swappable.source, secondItem, thirdItem, forthItem]);

    releaseMouse(swappable.source);

    draggableElements = swappable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([firstItem, secondItem, thirdItem, forthItem]);
  });
});
