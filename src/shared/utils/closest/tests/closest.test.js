import {createSandbox} from 'helper';
import closest from '../closest';

const sampleMarkup = `
  <div class="tree">
    <section class="branch">
      <ul class="twig">
        <li class="leaf"></li>
      </ul>
    </section>
  </div>
`;

describe('utils', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox(sampleMarkup);
  });

  afterEach(() => {
    sandbox.parentNode.removeChild(sandbox);
  });

  it('should return null when no element specified', () => {
    expect(closest()).toBeNull();
  });

  it('should return null when string selector does not match', () => {
    const element = sandbox.querySelector('.leaf');

    expect(closest(element, 'will-not-match')).toBeNull();
  });

  it('should return null when function selector does not match', () => {
    const element = sandbox.querySelector('.leaf');
    function selector() {
      return false;
    }

    expect(closest(element, selector)).toBeNull();
  });

  it('should return null when selector targets child element', () => {
    const element = sandbox.querySelector('.twig');

    expect(closest(element, '.leaf')).toBeNull();
  });

  it('should match element via callback', () => {
    const element = sandbox.querySelector('.leaf');

    function callback(currentElement) {
      return currentElement.classList.contains('leaf');
    }

    expect(closest(element, callback)).toBe(element);
  });

  ['.twig', 'ul', '.branch', 'section', '.tree', 'div', 'body', 'document'].forEach((expectedMatchingSelector) => {
    it(`should return matched element when selector targets parent element matching selector ${expectedMatchingSelector}`, () => {
      const element = sandbox.querySelector('.leaf');
      const expected = sandbox.querySelector(expectedMatchingSelector);

      expect(closest(element, expectedMatchingSelector)).toBe(expected);
    });
  });
});
