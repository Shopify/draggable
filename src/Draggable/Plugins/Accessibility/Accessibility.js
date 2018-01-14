import AbstractPlugin from 'shared/AbstractPlugin';

const ARIA_GRABBED = 'aria-grabbed';
const ARIA_DROPEFFECT = 'aria-dropeffect';
const TABINDEX = 'tabindex';

/**
 * __WIP__ Accessibility plugin
 * @class Accessibility
 * @module Accessibility
 */
export default class Accessibility extends AbstractPlugin {

  /**
   * Accessibility constructor.
   * @constructs Accessibility
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    this._onInit = this._onInit.bind(this);
    this._onDestroy = this._onDestroy.bind(this);
  }

  /**
   * Attaches listeners to draggable
   */
  attach() {
    this.draggable
      .on('init', this._onInit)
      .on('destroy', this._onDestroy)
      .on('drag:start', _onDragStart)
      .on('drag:stop', _onDragStop);
  }

  /**
   * Detaches listeners from draggable
   */
  detach() {
    this.draggable
      .off('init', this._onInit)
      .off('destroy', this._onDestroy)
      .off('drag:start', _onDragStart)
      .off('drag:stop', _onDragStop);
  }

  /**
   * Intialize handler
   * @private
   * @param {Object} param
   * @param {HTMLElement[]} param.containers
   */
  _onInit({containers}) {
    for (const container of containers) {
      container.setAttribute(ARIA_DROPEFFECT, this.draggable.options.type);

      for (const element of container.querySelectorAll(this.draggable.options.draggable)) {
        element.setAttribute(TABINDEX, 0);
        element.setAttribute(ARIA_GRABBED, false);
      }
    }
  }

  /**
   * Destroy handler handler
   * @private
   * @param {Object} param
   * @param {HTMLElement[]} param.containers
   */
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
