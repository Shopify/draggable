import {
  findByRole,
  getByText,
  queryByRole,
  waitFor,
  screen,
  fireEvent,
} from '@testing-library/dom';

import { createSandbox, DRAG_DELAY } from '../../../test-utils/helpers';

import {
  MirrorCreateEvent,
  MirrorCreatedEvent,
  MirrorAttachedEvent,
  MirrorMoveEvent,
  MirrorMovedEvent,
  MirrorDestroyEvent,
} from './MirrorEvent';

import Draggable from '../..';

const sampleMarkup = `
  <ul>
    <li>First item</li>
  </ul>
`;

describe('Mirror', () => {
  let sandbox;
  let container;
  let draggable;

  const draggableOptions = {
    draggable: 'li',
    delay: DRAG_DELAY,
  };

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    container = sandbox.querySelector('ul');
  });

  afterEach(() => {
    draggable.destroy();
    sandbox.remove();
  });

  it('creates mirror element on `drag:start`', async () => {
    draggable = new Draggable(container, draggableOptions);
    const draggableElement = getByText(sandbox, 'First item');
    document.elementFromPoint = () => draggableElement;

    fireEvent.mouseDown(draggableElement);

    expect(await findByRole(sandbox, 'dragmirror')).toBeInTheDocument();
    fireEvent.mouseUp(draggable.source);
  });

  it('triggers `mirror:create` event on `drag:start`', () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorCreateHandler = jest.fn();
    let dragEvent;

    draggable.on('mirror:create', mirrorCreateHandler);
    draggable.on('drag:start', (dragStartEvent) => {
      dragEvent = dragStartEvent;
    });

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    waitFor(() => {
      expect(mirrorCreateHandler).toHaveBeenCalledWithEvent(MirrorCreateEvent);
      expect(mirrorCreateHandler).toHaveBeenCalledWithEventProperties({
        dragEvent,
        source: dragEvent.source,
        originalSource: dragEvent.originalSource,
        sourceContainer: dragEvent.sourceContainer,
        sensorEvent: dragEvent.sensorEvent,
        originalEvent: dragEvent.originalEvent,
      });

      fireEvent.mouseUp(draggable.source);
    });
  });

  it('prevents mirror creation when `drag:start` gets canceled', async () => {
    draggable = new Draggable(container, draggableOptions);
    const draggableElement = getByText(sandbox, 'First item');
    document.elementFromPoint = () => draggableElement;

    draggable.on('drag:start', (dragEvent) => {
      dragEvent.preventDefault();
    });

    fireEvent.mouseDown(draggableElement);

    await waitFor(() => {
      const mirrorElement = queryByRole(sandbox, 'dragmirror');
      expect(mirrorElement).not.toBeInTheDocument();

      fireEvent.mouseUp(draggable.source);
    });
  });

  it('prevents mirror creation when `mirror:create` gets canceled', async () => {
    draggable = new Draggable(container, draggableOptions);

    draggable.on('mirror:create', (mirrorEvent) => {
      mirrorEvent.preventDefault();
    });

    fireEvent.mouseDown(getByText(sandbox, 'First item'));
    await waitFor(() => {
      const mirrorElement = queryByRole(sandbox, 'dragmirror');
      expect(mirrorElement).not.toBeInTheDocument();
      fireEvent.mouseUp(draggable.source);
    });
  });

  it('triggers `mirror:created` event on `drag:start`', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorCreatedHandler = jest.fn();
    let dragEvent;

    draggable.on('mirror:created', mirrorCreatedHandler);
    draggable.on('drag:start', (dragStartEvent) => {
      dragEvent = dragStartEvent;
    });

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await findByRole(sandbox, 'dragmirror');

    expect(mirrorCreatedHandler).toHaveBeenCalledWithEvent(MirrorCreatedEvent);
    expect(mirrorCreatedHandler.mock.lastCall[0].detail).toEqual({
      dragEvent,
      mirror: mirrorElement,
      source: dragEvent.source,
      originalSource: dragEvent.originalSource,
      sourceContainer: dragEvent.sourceContainer,
      sensorEvent: dragEvent.sensorEvent,
      originalEvent: dragEvent.originalEvent,
    });
  });

  it('triggers `mirror:attached` event on `drag:start`', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorAttachedHandler = jest.fn();
    let dragEvent;

    draggable.on('mirror:attached', mirrorAttachedHandler);
    draggable.on(
      'drag:start',
      (dragStartEvent) => (dragEvent = dragStartEvent)
    );

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await findByRole(sandbox, 'dragmirror');
    document.elementFromPoint = () => mirrorElement;

    await waitFor(() => {
      expect(mirrorAttachedHandler).toHaveBeenCalledWithEvent(
        MirrorAttachedEvent
      );
      expect(mirrorAttachedHandler.mock.lastCall[0].detail).toEqual({
        dragEvent,
        mirror: mirrorElement,
        source: dragEvent.source,
        originalSource: dragEvent.originalSource,
        sourceContainer: dragEvent.sourceContainer,
        sensorEvent: dragEvent.sensorEvent,
      });
    });

    fireEvent.mouseUp(draggable.source);
  });

  it('triggers `mirror:move` event on `drag:move`', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorMoveHandler = jest.fn();
    const draggableElement = getByText(sandbox, 'First item');
    let dragEvent;

    draggable.on('mirror:move', mirrorMoveHandler);
    draggable.on('drag:move', (dragMoveEvent) => (dragEvent = dragMoveEvent));

    fireEvent.mouseDown(draggableElement);

    const mirrorElement = await findByRole(sandbox, 'dragmirror');
    document.elementFromPoint = () => mirrorElement;

    fireEvent.mouseMove(mirrorElement);

    await waitFor(() => {
      expect(mirrorMoveHandler).toHaveBeenCalledWithEvent(MirrorMoveEvent);

      expect(mirrorMoveHandler.mock.lastCall[0].detail).toEqual({
        dragEvent,
        mirror: mirrorElement,
        source: dragEvent.source,
        originalSource: dragEvent.originalSource,
        sourceContainer: dragEvent.sourceContainer,
        sensorEvent: dragEvent.sensorEvent,
        originalEvent: dragEvent.originalEvent,
        passedThreshX: true,
        passedThreshY: true,
      });
    });

    fireEvent.mouseUp(draggable.source);
  });

  it('triggers `mirror:moved` event on `drag:move` was done', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorMovedHandler = jest.fn();
    let mirrorMoveEvent;

    draggable.on('mirror:moved', mirrorMovedHandler);
    draggable.on('mirror:move', (evt) => (mirrorMoveEvent = evt));

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await findByRole(sandbox, 'dragmirror');
    document.elementFromPoint = () => mirrorElement;

    fireEvent.mouseMove(mirrorElement);

    await waitFor(() => {
      expect(mirrorMovedHandler).toHaveBeenCalledWithEvent(MirrorMovedEvent);
      expect(mirrorMovedHandler.mock.lastCall[0].detail).toEqual({
        source: mirrorMoveEvent.source,
        originalSource: mirrorMoveEvent.originalSource,
        sourceContainer: mirrorMoveEvent.sourceContainer,
        sensorEvent: mirrorMoveEvent.sensorEvent,
        dragEvent: mirrorMoveEvent.dragEvent,
        mirror: mirrorElement,
        passedThreshX: mirrorMoveEvent.passedThreshX,
        passedThreshY: mirrorMoveEvent.passedThreshY,
      });
    });

    fireEvent.mouseUp(mirrorElement);
  });

  it('prevents `mirror:move` event trigger when `drag:move` gets canceled', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorMoveHandler = jest.fn();
    draggable.on('mirror:move', mirrorMoveHandler);
    draggable.on('drag:move', (dragEvent) => {
      dragEvent.preventDefault();
    });
    const mirrorElement = getByText(sandbox, 'First item');
    document.elementFromPoint = () => mirrorElement;

    fireEvent.mouseDown(mirrorElement);
    fireEvent.mouseMove(document.body, { clientX: 100, clientY: 100 });

    await waitFor(() => {
      expect(mirrorMoveHandler).not.toHaveBeenCalledWithEvent(MirrorMoveEvent);
    });

    fireEvent.mouseUp(mirrorElement);
  });

  it('moves mirror on `mirror:move`', async () => {
    draggable = new Draggable(container, draggableOptions);

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await findByRole(sandbox, 'dragmirror');
    document.elementFromPoint = () => mirrorElement;
    await waitFor(() => {
      fireEvent.mouseMove(document.body, {
        clientX: 23,
        clientY: 172,
      });
      expect(mirrorElement.style.transform).toBe('translate3d(23px, 172px, 0)');
      fireEvent.mouseUp(draggable.source);
    });
  });

  it('keeps mirror in same position if mouse move does not pass `thresholdX` nor `thresholdY`', async () => {
    draggable = new Draggable(container, {
      ...draggableOptions,
      mirror: {
        thresholdX: 10,
        thresholdY: 50,
      },
    });

    await fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await findByRole(sandbox, 'dragmirror');
    document.elementFromPoint = () => mirrorElement;

    await waitFor(() => {
      fireEvent.mouseMove(document.body, {
        clientX: 5,
        clientY: 10,
      });
      expect(mirrorElement.style.transform).toBe('translate3d(0px, 0px, 0)');
    });
  });

  // @TODO: Fix strange behavior with threshold testing
  it.skip('moves mirror only when past `thresholdX` or `thresholdY`', async () => {
    draggable = new Draggable(container, {
      ...draggableOptions,
      mirror: {
        thresholdX: 10,
        thresholdY: 50,
      },
    });

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await findByRole(sandbox, 'dragmirror');
    document.elementFromPoint = () => mirrorElement;

    fireEvent.mouseMove(document.body, {
      clientX: 21,
      clientY: 40,
    });
    await waitFor(() => {
      expect(mirrorElement.style.transform).toBe('translate3d(10px, 0px, 0)');
    });

    fireEvent.mouseUp(draggable.source);
  });

  it('prevents mirror movement when `mirror:move` gets canceled', async () => {
    draggable = new Draggable(container, draggableOptions);

    draggable.on('mirror:move', (mirrorEvent) => {
      mirrorEvent.preventDefault();
    });

    const draggableElement = getByText(sandbox, 'First item');
    fireEvent.mouseDown(draggableElement);
    document.elementFromPoint = () => draggableElement;

    const mirrorElement = await findByRole(sandbox, 'dragmirror');

    await waitFor(() => {
      const originalTransform = mirrorElement.style.transform;
      expect(originalTransform).toBe('translate3d(0px, 0px, 0)');

      fireEvent.mouseMove(document.body, {
        clientX: 100,
        clientY: 100,
      });

      expect(mirrorElement.style.transform).toBe(originalTransform);
      fireEvent.mouseUp(draggable.source);
    });
  });

  it('triggers `mirror:destroy` event on `drag:stop`', async () => {
    draggable = new Draggable(container, draggableOptions);

    const mirrorDestroyHandler = jest.fn();
    let dragEvent;

    draggable.on('mirror:destroy', mirrorDestroyHandler);
    draggable.on('drag:stop', (dragStopEvent) => (dragEvent = dragStopEvent));

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await findByRole(sandbox, 'dragmirror');

    fireEvent.mouseUp(draggable.source);

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

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    mirrorElement = await findByRole(sandbox, 'dragmirror');
    expect(mirrorElement).toBeInstanceOf(HTMLElement);

    await waitFor(() => {
      fireEvent.mouseUp(draggable.source);
      mirrorElement = queryByRole(sandbox, 'dragmirror');
      expect(mirrorElement).not.toBeInTheDocument();
    });
  });

  it('prevents mirror destruction when `mirror:destroy` gets canceled', async () => {
    draggable = new Draggable(container, draggableOptions);

    let mirrorElement;

    draggable.on('mirror:destroy', (mirrorEvent) => {
      mirrorEvent.preventDefault();
    });

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    mirrorElement = await findByRole(sandbox, 'dragmirror');

    expect(mirrorElement).toBeInstanceOf(HTMLElement);

    fireEvent.mouseUp(draggable.source);

    mirrorElement = await findByRole(sandbox, 'dragmirror');

    expect(mirrorElement).toBeInstanceOf(HTMLElement);
  });

  it('appends mirror to source container by default', async () => {
    draggable = new Draggable(container, draggableOptions);

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await findByRole(sandbox, 'dragmirror');

    expect(mirrorElement.parentNode).toBe(draggable.sourceContainer);

    fireEvent.mouseUp(draggable.source);
  });

  it('appends mirror by css selector', async () => {
    draggable = new Draggable(container, {
      ...draggableOptions,
      mirror: { appendTo: 'body' },
    });

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await screen.findByRole('dragmirror');

    expect(mirrorElement.parentNode).toBe(document.body);

    fireEvent.mouseUp(draggable.source);
  });

  it('appends mirror by function', async () => {
    draggable = new Draggable(container, {
      ...draggableOptions,
      mirror: { appendTo: () => document.body },
    });

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await screen.findByRole('dragmirror');

    expect(mirrorElement.parentNode).toBe(document.body);

    fireEvent.mouseUp(draggable.source);
  });

  it('appends mirror by element', async () => {
    draggable = new Draggable(container, {
      ...draggableOptions,
      mirror: { appendTo: document.body },
    });

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    const mirrorElement = await screen.findByRole('dragmirror');
    expect(mirrorElement.parentNode).toBe(document.body);

    fireEvent.mouseUp(draggable.source);
  });

  it('removes mirror element from document when `drag:stopped`', async () => {
    draggable = new Draggable(container, draggableOptions);

    draggable.on('drag:stopped', () => {
      expect(queryByRole(sandbox, 'dragmirror')).not.toBeInTheDocument();
    });

    fireEvent.mouseDown(getByText(sandbox, 'First item'));

    await waitFor(() => {
      fireEvent.mouseUp(draggable.source);
    });
  });
});
