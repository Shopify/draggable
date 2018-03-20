import {createSandbox, waitForRequestAnimationFrame} from 'helper';
import Draggable from '../../..';
import Focusable from '..';

const sampleMarkup = `
  <ul class="Container">
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
    <li>Forth item</li>
    <button>Fifth item</button>
  </ul>
  <div class="Container">
    <div tabindex="1"></div>
  </div>
`;

describe('Focusable', () => {
  let sandbox;
  let containers;
  let draggable;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    containers = sandbox.querySelectorAll('.Container');
  });

  afterEach(() => {
    draggable.destroy();
    sandbox.parentNode.removeChild(sandbox);
  });

  it('is included by default', () => {
    draggable = new Draggable(containers, {
      draggable: 'li',
    });

    const focusablePlugin = draggable.plugins.find((plugin) => plugin.constructor === Focusable);

    expect(focusablePlugin).toBeInstanceOf(Focusable);
  });

  it('sets tabindex properties', () => {
    draggable = new Draggable(containers, {
      draggable: 'li',
    });

    const elements = [...draggable.containers, ...draggable.getDraggableElements()];

    waitForRequestAnimationFrame();

    elements.forEach((element) => {
      expect(element.tabIndex).toEqual(0);
    });
  });

  it('removes tabindex properties', () => {
    draggable = new Draggable(containers, {
      draggable: 'li',
    });

    const elements = [...draggable.containers, ...draggable.getDraggableElements()];

    waitForRequestAnimationFrame();

    draggable.destroy();

    waitForRequestAnimationFrame();

    elements.forEach((element) => {
      expect(element.tabIndex).toEqual(-1);
    });
  });

  it('does not remove tabindex properties for natively focusable elements', () => {
    draggable = new Draggable(containers, {
      draggable: 'li, button',
    });

    waitForRequestAnimationFrame();

    const nativelyFocusableElement = document.querySelector('button');

    draggable.destroy();

    waitForRequestAnimationFrame();

    expect(nativelyFocusableElement.tabIndex).toEqual(0);
  });

  it('does not remove tabindex properties for element with tabindex attribute', () => {
    const elementWithTabIndexAttribute = document.querySelector('[tabindex]');
    const originalTabIndex = elementWithTabIndexAttribute.tabIndex;

    draggable = new Draggable(containers, {
      draggable: 'li, [tabindex]',
    });

    waitForRequestAnimationFrame();

    draggable.destroy();

    waitForRequestAnimationFrame();

    expect(elementWithTabIndexAttribute.tabIndex).toEqual(originalTabIndex);
  });
});
