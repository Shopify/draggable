import AbstractPlugin from 'shared/AbstractPlugin';

const RELEASE_MIRROR_TIMEOUT = 1000;

/**
 * Releasable default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.duration
 * @property {String} defaultOptions.easingFunction
 * @type {Object}
 */
export const defaultOptions = {
  duration: 150,
  easingFunction: 'ease-in-out',
};

/**
 * Releasable plugin which animates the mirror on drag stop
 * @class Releasable
 * @module Releasable
 * @extends AbstractPlugin
 */
export default class Releasable extends AbstractPlugin {
  /**
   * Releasable constructor.
   * @constructs Releasable
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * Mirror options
     * @property {Object} options
     * @property {Number} options.duration
     * @property {String} options.easingFunction
     * @type {Object}
     */
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable.on('mirror:destroy', cancelMirrorDestroy);
    this.draggable.on('drag:stop', releaseMirror);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable.off('mirror:destroy', cancelMirrorDestroy);
    this.draggable.off('drag:stop', releaseMirror);
  }

  /**
   * Returns options passed through draggable
   * @return {Object}
   */
  getOptions() {
    return this.draggable.options.releaseableMirror || {};
  }
}

function cancelMirrorDestroy(event) {
  event.cancel();
}

function releaseMirror({source, mirror}) {
  if (!mirror) {
    return;
  }

  const dropTargetRect = source.getBoundingClientRect();
  mirror.style.transition = `transform ${RELEASE_MIRROR_TIMEOUT}ms ease, opacity ${RELEASE_MIRROR_TIMEOUT}ms ease`;
  mirror.style.transform = `translate3d(${dropTargetRect.left}px, ${dropTargetRect.top}px, 0)`;
  mirror.style.opacity = 0;

  setTimeout(() => {
    if (!mirror.parentNode) {
      return;
    }

    mirror.parentNode.removeChild(mirror);
  }, RELEASE_MIRROR_TIMEOUT);
}
