import { createSandbox } from '../../../test-utils/helpers';
import closest from '.';

const sampleMarkup = `
  <div class="tree">
    <section class="branch">
      <ul class="twig">
        <li class="leaf"></li>
      </ul>
    </section>
  </div>
`;

describe('utils/closest', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
  });

  afterEach(() => {
    sandbox.remove();
  });

  it('returns null when no element specified', () => {
    expect(closest()).toBeNull();
  });

  it('returns null when string selector does not match', () => {
    const element = sandbox.querySelector('.leaf');

    expect(closest(element, 'will-not-match')).toBeNull();
  });

  it('returns null when function selector does not match', () => {
    const element = sandbox.querySelector('.leaf');
    function selector() {
      return false;
    }

    expect(closest(element, selector)).toBeNull();
  });

  it('returns null when selector targets child element', () => {
    const element = sandbox.querySelector('.twig');

    expect(closest(element, '.leaf')).toBeNull();
  });

  it('matches element via callback', () => {
    const element = sandbox.querySelector('.leaf');

    function callback(currentElement) {
      return currentElement.classList.contains('leaf');
    }

    expect(closest(element, callback)).toBe(element);
  });

  it.each([
    '.twig',
    'ul',
    '.branch',
    'section',
    '.tree',
    'div',
    'body',
    'document',
  ])(
    `returns matched element when selector targets parent element matching selector %s`,
    (expectedMatchingSelector) => {
      const element = sandbox.querySelector('.leaf');
      const expected = sandbox.querySelector(expectedMatchingSelector);

      expect(closest(element, expectedMatchingSelector)).toBe(expected);
    }
  );
});
