import debounce, {debounceDuration} from '../../scripts/utils/debounce';

// equal to `get-breakpoint()` base value
const MAX_WIDTH = 960;

const Attrs = {
  controls: 'aria-controls',
  expanded: 'aria-expanded',
  hidden: 'aria-hidden',
};

export default class MobileNav {
  constructor(activator) {
    this.activator = activator;
    this.target = document.getElementById(activator.getAttribute(Attrs.controls));
  }

  init() {
    if (!this.target) {
      console.error('The activator must have a valid `aria-controls` value. Target not found.');
      return;
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
    const lockScrolling = !widthExceeded;
    const willExpand = widthExceeded ? 'undefined' : 'false';

    this.expanded = true;
    this.activator.setAttribute(Attrs.expanded, 'true');
    this.target.setAttribute(Attrs.hidden, willExpand);
    document.documentElement.dataset.scrollLock = lockScrolling;
  }

  collapse() {
    if (this.expanded === false) {
      return;
    }

    this.expanded = false;
    this.activator.setAttribute(Attrs.expanded, 'false');
    this.target.setAttribute(Attrs.hidden, 'true');
    document.documentElement.dataset.scrollLock = false;
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
