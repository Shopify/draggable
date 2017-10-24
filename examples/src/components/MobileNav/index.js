import {debounce, debounceDuration} from '../../scripts/helpers/debounce';

// equal to `get-breakpoint()` base value
const MAX_WIDTH = 960;

const Attrs = {
  controls: 'aria-controls',
  expanded: 'aria-expanded',
  hidden: 'aria-hidden',
  scroll: 'data-scroll-lock',
};

export default class MobileNav {
  constructor(activator) {
    this.activator = activator;

    const controlsTarget = activator.getAttribute(Attrs.controls);
    this.target = document.getElementById(controlsTarget);

    if (!this.target) {
      throw Error('The activator must have a valid `aria-controls` value. Target not found.');
    }

    this._setState();
    this.activator.addEventListener('click', this.toggle.bind(this));

    window.addEventListener(
      'resize',
      debounce(() => {
        this._setState();
      }, debounceDuration),
    );
  }

  expand(widthExceeded = false) {
    const scrollLock = !widthExceeded;
    const willExpand = widthExceeded ? 'undefined' : 'false';

    this.expanded = true;
    this.activator.setAttribute(Attrs.expanded, 'true');
    this.target.setAttribute(Attrs.hidden, willExpand);
    document.documentElement.setAttribute(Attrs.scroll, scrollLock);
  }

  collapse() {
    if (this.expanded === false) {
      return;
    }

    this.expanded = false;
    this.activator.setAttribute(Attrs.expanded, 'false');
    this.target.setAttribute(Attrs.hidden, 'true');
    document.documentElement.setAttribute(Attrs.scroll, 'false');
  }

  toggle() {
    return this.expanded ? this.collapse() : this.expand();
  }

  _setState() {
    const windowWidth = document.documentElement.clientWidth;

    // currently collapses when resizing within any mobile range...
    // I should update this to remain `expanded` when resizing within that range
    return windowWidth < MAX_WIDTH ? this.collapse() : this.expand(true);
  }
}
