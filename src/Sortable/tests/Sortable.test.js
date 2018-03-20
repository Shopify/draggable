import {createSandbox, clickMouse, moveMouse, releaseMouse, waitForDragDelay, DRAG_DELAY} from 'helper';
import Sortable from '..';

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

describe('Sortable', () => {
  let sandbox;
  let containers;
  let draggableElements;
  let sortable;

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
    sortable = new Sortable(containers, {
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
    sortable.destroy();
    sandbox.parentNode.removeChild(sandbox);
  });

  it('triggers events', () => {
    const sortableStart = jest.fn();
    const sortableSort = jest.fn();
    const sortableSorted = jest.fn();
    const sortableStop = jest.fn();

    sortable.on('sortable:start', sortableStart);
    sortable.on('sortable:sort', sortableSort);
    sortable.on('sortable:sorted', sortableSorted);
    sortable.on('sortable:stop', sortableStop);

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);
    releaseMouse(sortable.source);

    expect(sortableStart).toHaveBeenCalled();

    expect(sortableSort).toHaveBeenCalled();

    expect(sortableSorted).toHaveBeenCalled();

    expect(sortableStop).toHaveBeenCalled();
  });

  it('prevents drag when canceling sortable start event', () => {
    sortable.on('sortable:start', (sortableEvent) => {
      sortableEvent.cancel();
    });

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);

    expect(sortable.isDragging()).toBe(false);

    releaseMouse(sortable.source);
  });

  it('sorts two first elements', () => {
    draggableElements = sandbox.querySelectorAll('li');

    expect(draggableElements[0]).toBe(firstItem);

    expect(draggableElements[1]).toBe(secondItem);

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);
    releaseMouse(sortable.source);

    draggableElements = sandbox.querySelectorAll('li');

    expect(draggableElements[0]).toBe(secondItem);

    expect(draggableElements[1]).toBe(firstItem);
  });

  it('sorts elements as you drag within a single container', () => {
    draggableElements = sortable.getDraggableElementsForContainer(containers[0]);
    expect(draggableElements).toHaveOrder([firstItem, secondItem, thirdItem, forthItem]);

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([
      secondItem,
      // original firstItem
      sortable.source,
      thirdItem,
      forthItem,
    ]);

    moveMouse(thirdItem);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([
      secondItem,
      thirdItem,
      // original firstItem
      sortable.source,
      forthItem,
    ]);

    moveMouse(forthItem);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([
      secondItem,
      thirdItem,
      forthItem,
      // original firstItem
      sortable.source,
    ]);

    releaseMouse(sortable.source);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([secondItem, thirdItem, forthItem, firstItem]);
  });

  it('sorts elements as you drag between multiple containers', () => {
    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([firstItem, secondItem, thirdItem, forthItem]);

    draggableElements = sortable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([fifthItem, sixthItem, seventhItem, eighthItem]);

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(fifthItem);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([secondItem, thirdItem, forthItem]);

    draggableElements = sortable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([
      // original firstItem
      sortable.source,
      fifthItem,
      sixthItem,
      seventhItem,
      eighthItem,
    ]);

    moveMouse(eighthItem);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([secondItem, thirdItem, forthItem]);

    draggableElements = sortable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([
      fifthItem,
      sixthItem,
      seventhItem,
      eighthItem,
      // original firstItem
      sortable.source,
    ]);

    releaseMouse(sortable.source);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([secondItem, thirdItem, forthItem]);

    draggableElements = sortable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([fifthItem, sixthItem, seventhItem, eighthItem, firstItem]);
  });

  it('prevents sorting when sortable:sort event gets canceled', () => {
    sortable.on('sortable:sort', (sortableEvent) => {
      sortableEvent.cancel();
    });

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondItem);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([sortable.source, secondItem, thirdItem, forthItem]);

    releaseMouse(sortable.source);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([firstItem, secondItem, thirdItem, forthItem]);
  });

  it('sorts elements into empty container', () => {
    [fifthItem, sixthItem, seventhItem, eighthItem].forEach((item) => {
      clickMouse(item);
      waitForDragDelay();
      moveMouse(firstItem);
      releaseMouse(sortable.source);
    });

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([
      fifthItem,
      sixthItem,
      seventhItem,
      eighthItem,
      firstItem,
      secondItem,
      thirdItem,
      forthItem,
    ]);

    draggableElements = sortable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([]);

    clickMouse(firstItem);
    waitForDragDelay();
    moveMouse(secondContainer);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([
      fifthItem,
      sixthItem,
      seventhItem,
      eighthItem,
      secondItem,
      thirdItem,
      forthItem,
    ]);

    draggableElements = sortable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([sortable.source]);

    releaseMouse(sortable.source);

    draggableElements = sortable.getDraggableElementsForContainer(firstContainer);
    expect(draggableElements).toHaveOrder([
      fifthItem,
      sixthItem,
      seventhItem,
      eighthItem,
      secondItem,
      thirdItem,
      forthItem,
    ]);

    draggableElements = sortable.getDraggableElementsForContainer(secondContainer);
    expect(draggableElements).toHaveOrder([firstItem]);
  });
});
