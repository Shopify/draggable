import {
  createSandbox,
  clickMouse,
  moveMouse,
  releaseMouse,
  DRAG_DELAY,
  waitForDragDelay,
  waitForPromisesToResolve,
  waitForRequestAnimationFrame,
} from 'helper';

import {
  MirrorCreateEvent,
  MirrorCreatedEvent,
  MirrorAttachedEvent,
  MirrorMoveEvent,
  MirrorDestroyEvent,
} from '../MirrorEvent';

import Draggable from '../../..';

const sampleMarkup = `
  <ul>
    <li>First item</li>
  </ul>
`;

describe('Mirror', () => {
  let sandbox;
  let container;
  let draggableElement;
  let draggable;

  const draggableOptions = {
    draggable: 'li',
    delay: DRAG_DELAY,
  };

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    container = sandbox.querySelector('ul');
    draggableElement = sandbox.querySelector('li');
  });

  afterEach(() => {
    draggable.destroy();
    sandbox.parentNode.removeChild(sandbox);
  });

  it('creates mirror element on `drag:start`', async () => {
    draggable = new Draggable(container, draggableOptions);

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement).toBeInstanceOf(HTMLElement);

    releaseMouse(draggable.source);
  });

  it('triggers `mirror:create` event on `drag:start`', () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorCreateHandler = jest.fn();
    let dragEvent;

    draggable.on('mirror:create', mirrorCreateHandler);
    draggable.on('drag:start', (dragStartEvent) => (dragEvent = dragStartEvent));

    clickMouse(draggableElement);
    waitForDragDelay();

    expect(mirrorCreateHandler).toHaveBeenCalledWithEvent(MirrorCreateEvent);
    expect(mirrorCreateHandler).toHaveBeenCalledWithEventProperties({
      dragEvent,
      source: dragEvent.source,
      originalSource: dragEvent.originalSource,
      sourceContainer: dragEvent.sourceContainer,
      sensorEvent: dragEvent.sensorEvent,
      originalEvent: dragEvent.originalEvent,
    });

    releaseMouse(draggable.source);
  });

  it('prevents mirror creation when `drag:start` gets canceled', () => {
    draggable = new Draggable(container, draggableOptions);

    draggable.on('drag:start', (dragEvent) => {
      dragEvent.cancel();
    });

    clickMouse(draggableElement);
    waitForDragDelay();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement).toBeNull();

    releaseMouse(draggable.source);
  });

  it('prevents mirror creation when `mirror:create` gets canceled', () => {
    draggable = new Draggable(container, draggableOptions);

    draggable.on('mirror:create', (mirrorEvent) => {
      mirrorEvent.cancel();
    });

    clickMouse(draggableElement);
    waitForDragDelay();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement).toBeNull();

    releaseMouse(draggable.source);
  });

  it('triggers `mirror:created` event on `drag:start`', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorCreatedHandler = jest.fn();
    let dragEvent;

    draggable.on('mirror:created', mirrorCreatedHandler);
    draggable.on('drag:start', (dragStartEvent) => (dragEvent = dragStartEvent));

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorCreatedHandler).toHaveBeenCalledWithEvent(MirrorCreatedEvent);
    expect(mirrorCreatedHandler).toHaveBeenCalledWithEventProperties({
      dragEvent,
      mirror: mirrorElement,
      source: dragEvent.source,
      originalSource: dragEvent.originalSource,
      sourceContainer: dragEvent.sourceContainer,
      sensorEvent: dragEvent.sensorEvent,
      originalEvent: dragEvent.originalEvent,
    });

    releaseMouse(draggable.source);
  });

  it('triggers `mirror:attached` event on `drag:start`', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorAttachedHandler = jest.fn();
    let dragEvent;

    draggable.on('mirror:attached', mirrorAttachedHandler);
    draggable.on('drag:start', (dragStartEvent) => (dragEvent = dragStartEvent));

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorAttachedHandler).toHaveBeenCalledWithEvent(MirrorAttachedEvent);
    expect(mirrorAttachedHandler).toHaveBeenCalledWithEventProperties({
      dragEvent,
      mirror: mirrorElement,
      source: dragEvent.source,
      originalSource: dragEvent.originalSource,
      sourceContainer: dragEvent.sourceContainer,
      sensorEvent: dragEvent.sensorEvent,
      originalEvent: dragEvent.originalEvent,
    });

    releaseMouse(draggable.source);
  });

  it('triggers `mirror:move` event on `drag:move`', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorMoveHandler = jest.fn();
    let dragEvent;

    draggable.on('mirror:move', mirrorMoveHandler);
    draggable.on('drag:move', (dragMoveEvent) => (dragEvent = dragMoveEvent));

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    moveMouse(document.body);

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorMoveHandler).toHaveBeenCalledWithEvent(MirrorMoveEvent);
    expect(mirrorMoveHandler).toHaveBeenCalledWithEventProperties({
      dragEvent,
      mirror: mirrorElement,
      source: dragEvent.source,
      originalSource: dragEvent.originalSource,
      sourceContainer: dragEvent.sourceContainer,
      sensorEvent: dragEvent.sensorEvent,
      originalEvent: dragEvent.originalEvent,
    });

    releaseMouse(draggable.source);
  });

  it('prevents `mirror:move` event trigger when `drag:move` gets canceled', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorMoveHandler = jest.fn();
    draggable.on('mirror:move', mirrorMoveHandler);
    draggable.on('drag:move', (dragEvent) => {
      dragEvent.cancel();
    });

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    moveMouse(document.body);

    expect(mirrorMoveHandler).not.toHaveBeenCalledWithEvent(MirrorMoveEvent);

    releaseMouse(draggable.source);
  });

  it('moves mirror on `mirror:move`', async () => {
    draggable = new Draggable(container, draggableOptions);

    clickMouse(draggableElement);
    waitForDragDelay();
    waitForRequestAnimationFrame();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement.style.transform).toBe('translate3d(0px, 0px, 0)');

    moveMouse(document.body, {
      clientX: 100,
      clientY: 100,
    });

    await waitForPromisesToResolve();
    waitForRequestAnimationFrame();

    expect(mirrorElement.style.transform).toBe('translate3d(100px, 100px, 0)');

    moveMouse(document.body, {
      clientX: 23,
      clientY: 172,
    });

    await waitForPromisesToResolve();
    waitForRequestAnimationFrame();

    expect(mirrorElement.style.transform).toBe('translate3d(23px, 172px, 0)');

    releaseMouse(draggable.source);
  });

  it('moves mirror only when past `thresholdX` or `thresholdY`', async () => {
    draggable = new Draggable(container, {
      ...draggableOptions,
      mirror: {
        thresholdX: 10,
        thresholdY: 50,
      },
    });

    clickMouse(draggableElement);
    waitForDragDelay();
    waitForRequestAnimationFrame();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    moveMouse(document.body, {
      clientX: 5,
      clientY: 10,
    });

    await waitForPromisesToResolve();
    waitForRequestAnimationFrame();

    expect(mirrorElement.style.transform).toBe('translate3d(0px, 0px, 0)');

    moveMouse(document.body, {
      clientX: 10,
      clientY: 40,
    });

    await waitForPromisesToResolve();
    waitForRequestAnimationFrame();

    expect(mirrorElement.style.transform).toBe('translate3d(10px, 0px, 0)');

    moveMouse(document.body, {
      clientX: 100,
      clientY: 100,
    });

    await waitForPromisesToResolve();
    waitForRequestAnimationFrame();

    expect(mirrorElement.style.transform).toBe('translate3d(100px, 100px, 0)');

    releaseMouse(draggable.source);
  });

  it('prevents mirror movement when `mirror:move` gets canceled', async () => {
    draggable = new Draggable(container, draggableOptions);

    draggable.on('mirror:move', (mirrorEvent) => {
      mirrorEvent.cancel();
    });

    clickMouse(draggableElement);
    waitForDragDelay();
    waitForRequestAnimationFrame();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');
    const originalTransform = mirrorElement.style.transform;

    expect(originalTransform).toBe('translate3d(0px, 0px, 0)');

    moveMouse(document.body, {
      clientX: 100,
      clientY: 100,
    });

    await waitForPromisesToResolve();
    waitForRequestAnimationFrame();

    expect(mirrorElement.style.transform).toBe(originalTransform);

    releaseMouse(draggable.source);
  });

  it('triggers `mirror:destroy` event on `drag:stop`', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorDestroyHandler = jest.fn();
    let dragEvent;

    draggable.on('mirror:destroy', mirrorDestroyHandler);
    draggable.on('drag:stop', (dragStopEvent) => (dragEvent = dragStopEvent));

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    releaseMouse(draggable.source);

    expect(mirrorDestroyHandler).toHaveBeenCalledWithEvent(MirrorDestroyEvent);
    expect(mirrorDestroyHandler).toHaveBeenCalledWithEventProperties({
      dragEvent,
      mirror: mirrorElement,
      source: dragEvent.source,
      sourceContainer: dragEvent.sourceContainer,
      sensorEvent: dragEvent.sensorEvent,
      originalEvent: dragEvent.originalEvent,
    });
  });

  it('destroys mirror on `mirror:destroy`', async () => {
    draggable = new Draggable(container, draggableOptions);

    let mirrorElement;

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement).toBeInstanceOf(HTMLElement);

    releaseMouse(draggable.source);

    mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement).toBeNull();
  });

  it('prevents mirror destruction when `mirror:destroy` gets canceled', async () => {
    draggable = new Draggable(container, draggableOptions);

    let mirrorElement;

    draggable.on('mirror:destroy', (mirrorEvent) => {
      mirrorEvent.cancel();
    });

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement).toBeInstanceOf(HTMLElement);

    releaseMouse(draggable.source);

    mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement).toBeInstanceOf(HTMLElement);
  });

  it('appends mirror to source container by default', async () => {
    draggable = new Draggable(container, draggableOptions);

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement.parentNode).toBe(draggable.sourceContainer);

    releaseMouse(draggable.source);
  });

  it('appends mirror by css selector', async () => {
    draggable = new Draggable(container, {
      ...draggableOptions,
      mirror: {appendTo: 'body'},
    });

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement.parentNode).toBe(document.body);

    releaseMouse(draggable.source);
  });

  it('appends mirror by function', async () => {
    draggable = new Draggable(container, {
      ...draggableOptions,
      mirror: {appendTo: () => document.body},
    });

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement.parentNode).toBe(document.body);

    releaseMouse(draggable.source);
  });

  it('appends mirror by element', async () => {
    draggable = new Draggable(container, {
      ...draggableOptions,
      mirror: {appendTo: document.body},
    });

    clickMouse(draggableElement);
    waitForDragDelay();

    await waitForPromisesToResolve();

    const mirrorElement = document.querySelector('.draggable-mirror');

    expect(mirrorElement.parentNode).toBe(document.body);

    releaseMouse(draggable.source);
  });
});
