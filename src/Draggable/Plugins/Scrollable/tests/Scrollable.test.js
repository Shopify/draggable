import {createSandbox, waitForRequestAnimationFrame} from 'helper';
import Draggable from '../../..';
import Scrollable from '..';

const sampleMarkup = `
  <ul class="Container">
    <li>First item</li>
  </ul>
  <ul class="Container">
    <li>Second item</li>
  </ul>
`;

describe('Scrollable', () => {
  let sandbox;
  let containers;
  let draggable;
  let scrollable;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
    containers = sandbox.querySelectorAll('.Container');
    draggable = new Draggable(containers, {
      draggable: 'li',
    });
    scrollable = draggable.plugins.find((plugin) => plugin.constructor === Scrollable);
  });

  afterEach(() => {
    draggable.destroy();
    sandbox.parentNode.removeChild(sandbox);
  });

  describe('#getScrollableElement', () => {
    it('returns', () => {
      const scrollableElement = scrollable.getScrollableElement();
      expect(scrollableElement);
    });
  });

  it('is included by default', () => {
    draggable = new Draggable(containers, {
      draggable: 'li',
    });

    const scrollablePlugin = draggable.plugins.find((plugin) => plugin.constructor === Scrollable);

    expect(scrollablePlugin).toBeInstanceOf(Scrollable);
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
});
