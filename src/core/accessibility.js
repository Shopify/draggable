const ARIA_GRABBED = 'aria-grabbed';
const ARIA_DROPEFFECT = 'aria-dropeffect';
const TABINDEX = 'tabindex';

export default class Accessibility {
  constructor(draggable) {
    this.draggable = draggable;

    this._onInit = this._onInit.bind(this);
    this._onDestroy = this._onDestroy.bind(this);
  }

  attach() {
    this.draggable
      .on('init', this._onInit)
      .on('destroy', this._onDestroy)
      .on('drag:start', _onDragStart)
      .on('drag:stop', _onDragStop);
  }

  detach() {
    this.draggable
      .off('init', this._onInit)
      .off('destroy', this._onDestroy)
      .off('drag:start', _onDragStart)
      .off('drag:stop', _onDragStop);
  }

  _onInit({containers}) {
    for (const container of containers) {
      container.setAttribute(ARIA_DROPEFFECT, this.draggable.options.type);

      for (const element of container.querySelectorAll(this.draggable.options.draggable)) {
        element.setAttribute(TABINDEX, 0);
        element.setAttribute(ARIA_GRABBED, false);
      }
    }
  }

  _onDestroy({containers}) {
    for (const container of containers) {
      container.removeAttribute(ARIA_DROPEFFECT);

      for (const element of container.querySelectorAll(this.draggable.options.draggable)) {
        element.removeAttribute(TABINDEX, 0);
        element.removeAttribute(ARIA_GRABBED, false);
      }
    }
  }
}

function _onDragStart({source}) {
  source.setAttribute(ARIA_GRABBED, true);
}

function _onDragStop({source}) {
  source.setAttribute(ARIA_GRABBED, false);
}
