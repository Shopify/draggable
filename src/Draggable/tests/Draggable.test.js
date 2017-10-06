import {
  createSandbox,
  triggerEvent,
} from 'helper';

import Draggable from './..';
import {DragStartEvent} from './../DragEvent';

const sampleMarkup = `
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
`;

describe('Draggable', () => {
  let sandbox;
  let draggable;

  beforeEach(() => {
    jest.useFakeTimers();
    sandbox = createSandbox(sampleMarkup);
    const containers = sandbox.querySelectorAll('ul');
    draggable = new Draggable(containers, {
      draggable: 'li',
      delay: 0,
    });
  });

  afterEach(() => {
    sandbox.parentNode.removeChild(sandbox);
  });

  test('triggers `drag:start` drag event on mousedown', () => {
    const draggableElement = sandbox.querySelector('li');
    document.elementFromPoint = () => draggableElement;

    const callback = jest.fn();
    draggable.on('drag:start', callback);
    triggerEvent(draggableElement, 'mousedown');

    // Wait for delay
    jest.runTimersToTime(100);

    expect(callback.mock.calls[0][0].type).toBe('drag:start');
    expect(callback.mock.calls[0][0]).toBeInstanceOf(DragStartEvent);
  });
});
