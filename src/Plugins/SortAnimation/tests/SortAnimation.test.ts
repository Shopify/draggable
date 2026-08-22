import {createSandbox, waitForRequestAnimationFrame, DRAG_DELAY} from 'helper';
import {FixMeAny} from 'shared/types';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import Sortable from '../../../Sortable';
// @ts-ignore
import SortAnimation, {defaultOptions} from '../SortAnimation';
/* eslint-enable @typescript-eslint/ban-ts-comment */

const sampleMarkup = `
  <ul class="Container Container--first">
    <li class="Item Item--1">Item 1</li>
    <li class="Item Item--2">Item 2</li>
    <li class="Item Item--3">Item 3</li>
  </ul>
  <ul class="Container Container--empty">
  </ul>
`;

describe('SortAnimation', () => {
  let sandbox: HTMLElement;
  let containers: HTMLElement[];
  let sortable: FixMeAny;
  let firstItem: HTMLElement;
  let secondItem: HTMLElement;
  let thirdItem: HTMLElement;
  let emptyContainer: HTMLElement;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    containers = Array.from(sandbox.querySelectorAll('.Container'));
    firstItem = sandbox.querySelector('.Item--1') as HTMLElement;
    secondItem = sandbox.querySelector('.Item--2') as HTMLElement;
    thirdItem = sandbox.querySelector('.Item--3') as HTMLElement;
    emptyContainer = sandbox.querySelector('.Container--empty') as HTMLElement;

    sortable = new Sortable(containers, {
      draggable: '.Item',
      delay: DRAG_DELAY,
      plugins: [SortAnimation],
    });
  });

  afterEach(() => {
    sortable.destroy();
    sandbox.remove();
  });

  it('initializes with default options', () => {
    const plugin = sortable.plugins.find(
      (pluginInstance: FixMeAny) => pluginInstance instanceof SortAnimation,
    );
    expect(plugin).toBeDefined();
    expect(plugin.options).toMatchObject(defaultOptions);
  });

  it('accepts custom options passed through Sortable', () => {
    sortable.destroy();

    sortable = new Sortable(containers, {
      draggable: '.Item',
      delay: DRAG_DELAY,
      plugins: [SortAnimation],
      sortAnimation: {
        duration: 350,
        easingFunction: 'linear',
      },
    });

    const plugin = sortable.plugins.find(
      (pluginInstance: FixMeAny) => pluginInstance instanceof SortAnimation,
    );
    expect(plugin.options).toMatchObject({
      duration: 350,
      easingFunction: 'linear',
    });
  });

  it('attaches and detaches listeners on Sortable', () => {
    const plugin = sortable.plugins.find(
      (pluginInstance: FixMeAny) => pluginInstance instanceof SortAnimation,
    );

    plugin.detach();
    expect(() => {
      sortable.trigger({
        type: 'sortable:sort',
        dragEvent: {sourceContainer: containers[0]},
      });
      sortable.trigger({
        type: 'sortable:sorted',
        oldIndex: 0,
        newIndex: 1,
        dragEvent: {source: firstItem, over: secondItem},
      });
    }).not.toThrow();

    plugin.attach();
  });

  it('records lastElements positions on sortable:sort', () => {
    const plugin = sortable.plugins.find(
      (pluginInstance: FixMeAny) => pluginInstance instanceof SortAnimation,
    );

    sortable.trigger({
      type: 'sortable:sort',
      dragEvent: {sourceContainer: containers[0]},
    });

    expect(plugin.lastElements).toHaveLength(3);
    expect(plugin.lastElements[0].domEl).toBe(firstItem);
  });

  it('animates elements during sortable:sorted when moved down', () => {
    sortable.trigger({
      type: 'sortable:sort',
      dragEvent: {sourceContainer: containers[0]},
    });

    sortable.trigger({
      type: 'sortable:sorted',
      oldIndex: 0,
      newIndex: 1,
      dragEvent: {source: firstItem, over: secondItem},
    });

    // 1st frame: applies initial transform and pointer-events: none
    waitForRequestAnimationFrame();

    expect(secondItem.style.pointerEvents).toBe('none');

    // 2nd frame: applies transition
    waitForRequestAnimationFrame();

    expect(secondItem.style.transition).toContain('transform');
  });

  it('animates elements during sortable:sorted when moved up', () => {
    sortable.trigger({
      type: 'sortable:sort',
      dragEvent: {sourceContainer: containers[0]},
    });

    sortable.trigger({
      type: 'sortable:sorted',
      oldIndex: 2,
      newIndex: 0,
      dragEvent: {source: thirdItem, over: firstItem},
    });

    waitForRequestAnimationFrame();

    expect(firstItem.style.pointerEvents).toBe('none');

    waitForRequestAnimationFrame();

    expect(firstItem.style.transition).toContain('transform');
  });

  it('does not throw when sortable:sorted is triggered without prior sort (empty lastElements)', () => {
    expect(() => {
      sortable.trigger({
        type: 'sortable:sorted',
        oldIndex: 0,
        newIndex: 1,
        dragEvent: {
          source: firstItem,
          over: undefined,
          overContainer: emptyContainer,
        },
      });

      waitForRequestAnimationFrame();
    }).not.toThrow();
  });

  it('does not throw when indices are out of bounds or elements are undefined', () => {
    const plugin = sortable.plugins.find(
      (pluginInstance: FixMeAny) => pluginInstance instanceof SortAnimation,
    );

    sortable.trigger({
      type: 'sortable:sort',
      dragEvent: {sourceContainer: containers[0]},
    });

    expect(() => {
      // oldIndex and newIndex beyond recorded elements length
      sortable.trigger({
        type: 'sortable:sorted',
        oldIndex: 10,
        newIndex: 20,
        dragEvent: {source: firstItem, over: secondItem},
      });

      waitForRequestAnimationFrame();
    }).not.toThrow();

    expect(() => {
      // sortable:sort with invalid/missing dragEvent
      plugin.draggable.trigger({
        type: 'sortable:sort',
        dragEvent: undefined,
      });
    }).not.toThrow();
  });

  it('cleans up styles on transitionend event', () => {
    sortable.trigger({
      type: 'sortable:sort',
      dragEvent: {sourceContainer: containers[0]},
    });

    sortable.trigger({
      type: 'sortable:sorted',
      oldIndex: 0,
      newIndex: 1,
      dragEvent: {source: firstItem, over: secondItem},
    });

    waitForRequestAnimationFrame();
    waitForRequestAnimationFrame();

    const transitionEndEvent = new Event('transitionend', {bubbles: true});
    secondItem.dispatchEvent(transitionEndEvent);

    expect(secondItem.style.transition).toBe('');
    expect(secondItem.style.pointerEvents).toBe('');

    // Trigger transitionend with null/non-element target without throwing
    const customEvent = new CustomEvent('transitionend');
    Object.defineProperty(customEvent, 'target', {value: null});
    window.dispatchEvent(customEvent);
  });
});
