import {createSandbox, waitForRequestAnimationFrame, DRAG_DELAY} from 'helper';
import {FixMeAny} from 'shared/types';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import Sortable from '../../../Sortable';
/* eslint-enable @typescript-eslint/ban-ts-comment */
import SwapAnimation, {defaultOptions} from '../SwapAnimation';

const sampleMarkup = `
  <ul class="Container Container--first">
    <li class="Item Item--1">Item 1</li>
    <li class="Item Item--2">Item 2</li>
  </ul>
  <ul class="Container Container--empty">
  </ul>
`;

describe('SwapAnimation', () => {
  let sandbox: HTMLElement;
  let containers: HTMLElement[];
  let sortable: FixMeAny;
  let firstItem: HTMLElement;
  let secondItem: HTMLElement;
  let emptyContainer: HTMLElement;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    containers = Array.from(sandbox.querySelectorAll('.Container'));
    firstItem = sandbox.querySelector('.Item--1') as HTMLElement;
    secondItem = sandbox.querySelector('.Item--2') as HTMLElement;
    emptyContainer = sandbox.querySelector('.Container--empty') as HTMLElement;

    sortable = new Sortable(containers, {
      draggable: '.Item',
      delay: DRAG_DELAY,
      plugins: [SwapAnimation],
    });
  });

  afterEach(() => {
    sortable.destroy();
    sandbox.remove();
  });

  it('initializes with default options', () => {
    const plugin = sortable.plugins.find(
      (pluginInstance: FixMeAny) => pluginInstance instanceof SwapAnimation,
    );
    expect(plugin).toBeDefined();
    expect(plugin.options).toMatchObject(defaultOptions);
  });

  it('accepts custom options passed through Sortable', () => {
    sortable.destroy();

    sortable = new Sortable(containers, {
      draggable: '.Item',
      delay: DRAG_DELAY,
      plugins: [SwapAnimation],
      swapAnimation: {
        duration: 300,
        easingFunction: 'linear',
        horizontal: true,
      },
    });

    const plugin = sortable.plugins.find(
      (pluginInstance: FixMeAny) => pluginInstance instanceof SwapAnimation,
    );
    expect(plugin.options).toMatchObject({
      duration: 300,
      easingFunction: 'linear',
      horizontal: true,
    });
  });

  it('attaches and detaches listeners on Sortable', () => {
    const plugin = sortable.plugins.find(
      (pluginInstance: FixMeAny) => pluginInstance instanceof SwapAnimation,
    );
    const onSortableSortedSpy = jest.spyOn(plugin, 'onSortableSorted');

    plugin.detach();
    sortable.trigger({
      type: 'sortable:sorted',
      oldIndex: 0,
      newIndex: 1,
      dragEvent: {source: firstItem, over: secondItem},
    });
    expect(onSortableSortedSpy).not.toHaveBeenCalled();

    plugin.attach();
    sortable.trigger({
      type: 'sortable:sorted',
      oldIndex: 0,
      newIndex: 1,
      dragEvent: {source: firstItem, over: secondItem},
    });
    expect(onSortableSortedSpy).toHaveBeenCalled();
  });

  it('does not throw when dragging into an empty container where over is undefined', () => {
    expect(() => {
      // Simulate sorting into an empty container where over element is undefined
      sortable.trigger({
        type: 'sortable:sorted',
        oldIndex: 0,
        newIndex: 0,
        dragEvent: {
          source: firstItem,
          over: undefined,
          overContainer: emptyContainer,
        },
      });

      waitForRequestAnimationFrame();
    }).not.toThrow();
  });

  it('does not throw when dragEvent or source/over is missing or invalid', () => {
    const plugin = sortable.plugins.find(
      (pluginInstance: FixMeAny) => pluginInstance instanceof SwapAnimation,
    );

    expect(() => {
      plugin.onSortableSorted({
        oldIndex: 0,
        newIndex: 1,
        dragEvent: undefined,
      });

      waitForRequestAnimationFrame();
    }).not.toThrow();

    expect(() => {
      plugin.onSortableSorted({
        oldIndex: 0,
        newIndex: 1,
        dragEvent: {
          source: undefined,
          over: secondItem,
        },
      });

      waitForRequestAnimationFrame();
    }).not.toThrow();

    expect(() => {
      plugin.onSortableSorted({
        oldIndex: 0,
        newIndex: 1,
        dragEvent: {
          source: firstItem,
          over: undefined,
        },
      });

      waitForRequestAnimationFrame();
    }).not.toThrow();
  });

  it('animates elements vertically by default during sortable:sorted', () => {
    sortable.trigger({
      type: 'sortable:sorted',
      oldIndex: 0,
      newIndex: 1,
      dragEvent: {
        source: firstItem,
        over: secondItem,
      },
    });

    // 1st frame: triggers animate() -> sets pointerEvents='none'
    waitForRequestAnimationFrame();

    expect(firstItem.style.pointerEvents).toBe('none');
    expect(secondItem.style.pointerEvents).toBe('none');

    // 2nd frame: triggers transition setup
    waitForRequestAnimationFrame();

    expect(firstItem.style.transition).toContain('transform');
    expect(secondItem.style.transition).toContain('transform');
  });

  it('animates elements horizontally when horizontal option is true', () => {
    sortable.destroy();

    sortable = new Sortable(containers, {
      draggable: '.Item',
      delay: DRAG_DELAY,
      plugins: [SwapAnimation],
      swapAnimation: {
        horizontal: true,
      },
    });

    sortable.trigger({
      type: 'sortable:sorted',
      oldIndex: 1,
      newIndex: 0,
      dragEvent: {
        source: secondItem,
        over: firstItem,
      },
    });

    waitForRequestAnimationFrame();

    expect(firstItem.style.pointerEvents).toBe('none');
    expect(secondItem.style.pointerEvents).toBe('none');

    waitForRequestAnimationFrame();

    expect(firstItem.style.transition).toContain('transform');
    expect(secondItem.style.transition).toContain('transform');
  });

  it('cleans up styles when transitionend fires', () => {
    sortable.trigger({
      type: 'sortable:sorted',
      oldIndex: 0,
      newIndex: 1,
      dragEvent: {
        source: firstItem,
        over: secondItem,
      },
    });

    waitForRequestAnimationFrame();
    waitForRequestAnimationFrame();

    // Trigger transitionend on the animated elements
    const transitionEndEvent = new Event('transitionend', {bubbles: true});
    firstItem.dispatchEvent(transitionEndEvent);
    secondItem.dispatchEvent(transitionEndEvent);

    expect(firstItem.style.transition).toBe('');
    expect(firstItem.style.pointerEvents).toBe('');
    expect(secondItem.style.transition).toBe('');
    expect(secondItem.style.pointerEvents).toBe('');

    // Trigger transitionend with non-element or null target without errors
    const customEvent = new CustomEvent('transitionend');
    Object.defineProperty(customEvent, 'target', {value: null});
    window.dispatchEvent(customEvent);
  });
});
