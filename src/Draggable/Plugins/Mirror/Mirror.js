import AbstractPlugin from 'shared/AbstractPlugin';

import {
  MirrorCreateEvent,
  MirrorCreatedEvent,
  MirrorAttachedEvent,
  MirrorMoveEvent,
  MirrorDestroyEvent,
} from './MirrorEvent';

export const onDragStart = Symbol('onDragStart');
export const onDragMove = Symbol('onDragMove');
export const onDragStop = Symbol('onDragStop');
export const onMirrorCreated = Symbol('onMirrorCreated');
export const onMirrorMove = Symbol('onMirrorMove');
export const onScroll = Symbol('onScroll');
export const getAppendableContainer = Symbol('getAppendableContainer');

/**
 * Mirror default options
 * @property {Object} defaultOptions
 * @property {Boolean} defaultOptions.constrainDimensions
 * @property {Boolean} defaultOptions.xAxis
 * @property {Boolean} defaultOptions.yAxis
 * @property {null} defaultOptions.cursorOffsetX
 * @property {null} defaultOptions.cursorOffsetY
 * @type {Object}
 */
export const defaultOptions = {
  constrainDimensions: false,
  xAxis: true,
  yAxis: true,
  cursorOffsetX: null,
  cursorOffsetY: null,
  thresholdX: null,
  thresholdY: null,
};

/**
 * Mirror plugin which controls the mirror positioning while dragging
 * @class Mirror
 * @module Mirror
 * @extends AbstractPlugin
 */
export default class Mirror extends AbstractPlugin {
  /**
   * Mirror constructor.
   * @constructs Mirror
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * Mirror options
     * @property {Object} options
     * @property {Boolean} options.constrainDimensions
     * @property {Boolean} options.xAxis
     * @property {Boolean} options.yAxis
     * @property {Number|null} options.cursorOffsetX
     * @property {Number|null} options.cursorOffsetY
     * @property {String|HTMLElement|Function} options.appendTo
     * @type {Object}
     */
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    /**
     * Scroll offset for touch devices because the mirror is positioned fixed
     * @property {Object} scrollOffset
     * @property {Number} scrollOffset.x
     * @property {Number} scrollOffset.y
     */
    this.scrollOffset = {x: 0, y: 0};

    /**
     * Initial scroll offset for touch devices because the mirror is positioned fixed
     * @property {Object} scrollOffset
     * @property {Number} scrollOffset.x
     * @property {Number} scrollOffset.y
     */
    this.initialScrollOffset = {
      x: window.scrollX,
      y: window.scrollY,
    };

    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragMove] = this[onDragMove].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);
    this[onMirrorCreated] = this[onMirrorCreated].bind(this);
    this[onMirrorMove] = this[onMirrorMove].bind(this);
    this[onScroll] = this[onScroll].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable
      .on('drag:start', this[onDragStart])
      .on('drag:move', this[onDragMove])
      .on('drag:stop', this[onDragStop])
      .on('mirror:created', this[onMirrorCreated])
      .on('mirror:move', this[onMirrorMove]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable
      .off('drag:start', this[onDragStart])
      .off('drag:move', this[onDragMove])
      .off('drag:stop', this[onDragStop])
      .off('mirror:created', this[onMirrorCreated])
      .off('mirror:move', this[onMirrorMove]);
  }

  /**
   * Returns options passed through draggable
   * @return {Object}
   */
  getOptions() {
    return this.draggable.options.mirror || {};
  }

  [onDragStart](dragEvent) {
    if (dragEvent.canceled()) {
      return;
    }

    if ('ontouchstart' in window) {
      document.addEventListener('scroll', this[onScroll], true);
    }

    this.initialScrollOffset = {
      x: window.scrollX,
      y: window.scrollY,
    };

    const {source, originalSource, sourceContainer, sensorEvent} = dragEvent;

    // Last sensor position of mirror move
    this.lastMirrorMovedClient = {
      x: sensorEvent.clientX,
      y: sensorEvent.clientY,
    };

    const mirrorCreateEvent = new MirrorCreateEvent({
      source,
      originalSource,
      sourceContainer,
      sensorEvent,
      dragEvent,
    });

    this.draggable.trigger(mirrorCreateEvent);

    if (isNativeDragEvent(sensorEvent) || mirrorCreateEvent.canceled()) {
      return;
    }

    const appendableContainer = this[getAppendableContainer](source) || sourceContainer;
    this.mirror = source.cloneNode(true);

    const mirrorCreatedEvent = new MirrorCreatedEvent({
      source,
      originalSource,
      sourceContainer,
      sensorEvent,
      dragEvent,
      mirror: this.mirror,
    });

    const mirrorAttachedEvent = new MirrorAttachedEvent({
      source,
      originalSource,
      sourceContainer,
      sensorEvent,
      dragEvent,
      mirror: this.mirror,
    });

    this.draggable.trigger(mirrorCreatedEvent);
    appendableContainer.appendChild(this.mirror);
    this.draggable.trigger(mirrorAttachedEvent);
  }

  [onDragMove](dragEvent) {
    if (!this.mirror || dragEvent.canceled()) {
      return;
    }

    const {source, originalSource, sourceContainer, sensorEvent} = dragEvent;

    let passedThreshX = true;
    let passedThreshY = true;

    if (this.options.thresholdX || this.options.thresholdY) {
      const {x: lastX, y: lastY} = this.lastMirrorMovedClient;

      if (Math.abs(lastX - sensorEvent.clientX) < this.options.thresholdX) {
        passedThreshX = false;
      } else {
        this.lastMirrorMovedClient.x = sensorEvent.clientX;
      }

      if (Math.abs(lastY - sensorEvent.clientY) < this.options.thresholdY) {
        passedThreshY = false;
      } else {
        this.lastMirrorMovedClient.y = sensorEvent.clientY;
      }

      if (!passedThreshX && !passedThreshY) {
        return;
      }
    }

    const mirrorMoveEvent = new MirrorMoveEvent({
      source,
      originalSource,
      sourceContainer,
      sensorEvent,
      dragEvent,
      mirror: this.mirror,
      passedThreshX,
      passedThreshY,
    });

    this.draggable.trigger(mirrorMoveEvent);
  }

  [onDragStop](dragEvent) {
    if ('ontouchstart' in window) {
      document.removeEventListener('scroll', this[onScroll], true);
    }

    this.initialScrollOffset = {x: 0, y: 0};
    this.scrollOffset = {x: 0, y: 0};

    if (!this.mirror) {
      return;
    }

    const {source, sourceContainer, sensorEvent} = dragEvent;

    const mirrorDestroyEvent = new MirrorDestroyEvent({
      source,
      mirror: this.mirror,
      sourceContainer,
      sensorEvent,
      dragEvent,
    });

    this.draggable.trigger(mirrorDestroyEvent);

    if (!mirrorDestroyEvent.canceled()) {
      this.mirror.parentNode.removeChild(this.mirror);
    }
  }

  [onScroll]() {
    this.scrollOffset = {
      x: window.scrollX - this.initialScrollOffset.x,
      y: window.scrollY - this.initialScrollOffset.y,
    };
  }

  /**
   * Mirror created handler
   * @param {MirrorCreatedEvent} mirrorEvent
   * @return {Promise}
   * @private
   */
  [onMirrorCreated]({mirror, source, sensorEvent}) {
    const mirrorClass = this.draggable.getClassNameFor('mirror');

    const setState = ({mirrorOffset, initialX, initialY, ...args}) => {
      this.mirrorOffset = mirrorOffset;
      this.initialX = initialX;
      this.initialY = initialY;
      this.lastMovedX = initialX;
      this.lastMovedY = initialY;
      return {mirrorOffset, initialX, initialY, ...args};
    };

    mirror.style.display = 'none';

    const initialState = {
      mirror,
      source,
      sensorEvent,
      mirrorClass,
      scrollOffset: this.scrollOffset,
      options: this.options,
      passedThreshX: true,
      passedThreshY: true,
    };

    return (
      Promise.resolve(initialState)
        // Fix reflow here
        .then(computeMirrorDimensions)
        .then(calculateMirrorOffset)
        .then(resetMirror)
        .then(addMirrorClasses)
        .then(positionMirror({initial: true}))
        .then(removeMirrorID)
        .then(setState)
    );
  }

  /**
   * Mirror move handler
   * @param {MirrorMoveEvent} mirrorEvent
   * @return {Promise|null}
   * @private
   */
  [onMirrorMove](mirrorEvent) {
    if (mirrorEvent.canceled()) {
      return null;
    }

    const setState = ({lastMovedX, lastMovedY, ...args}) => {
      this.lastMovedX = lastMovedX;
      this.lastMovedY = lastMovedY;

      return {lastMovedX, lastMovedY, ...args};
    };

    const initialState = {
      mirror: mirrorEvent.mirror,
      sensorEvent: mirrorEvent.sensorEvent,
      mirrorOffset: this.mirrorOffset,
      options: this.options,
      initialX: this.initialX,
      initialY: this.initialY,
      scrollOffset: this.scrollOffset,
      passedThreshX: mirrorEvent.passedThreshX,
      passedThreshY: mirrorEvent.passedThreshY,
      lastMovedX: this.lastMovedX,
      lastMovedY: this.lastMovedY,
    };

    return Promise.resolve(initialState)
      .then(positionMirror({raf: true}))
      .then(setState);
  }

  /**
   * Returns appendable container for mirror based on the appendTo option
   * @private
   * @param {Object} options
   * @param {HTMLElement} options.source - Current source
   * @return {HTMLElement}
   */
  [getAppendableContainer](source) {
    const appendTo = this.options.appendTo;

    if (typeof appendTo === 'string') {
      return document.querySelector(appendTo);
    } else if (appendTo instanceof HTMLElement) {
      return appendTo;
    } else if (typeof appendTo === 'function') {
      return appendTo(source);
    } else {
      return source.parentNode;
    }
  }
}

/**
 * Computes mirror dimensions based on the source element
 * Adds sourceRect to state
 * @param {Object} state
 * @param {HTMLElement} state.source
 * @return {Promise}
 * @private
 */
function computeMirrorDimensions({source, ...args}) {
  return withPromise((resolve) => {
    const sourceRect = source.getBoundingClientRect();
    resolve({source, sourceRect, ...args});
  });
}

/**
 * Calculates mirror offset
 * Adds mirrorOffset to state
 * @param {Object} state
 * @param {SensorEvent} state.sensorEvent
 * @param {DOMRect} state.sourceRect
 * @return {Promise}
 * @private
 */
function calculateMirrorOffset({sensorEvent, sourceRect, options, ...args}) {
  return withPromise((resolve) => {
    const top = options.cursorOffsetY === null ? sensorEvent.clientY - sourceRect.top : options.cursorOffsetY;
    const left = options.cursorOffsetX === null ? sensorEvent.clientX - sourceRect.left : options.cursorOffsetX;

    const mirrorOffset = {top, left};

    resolve({sensorEvent, sourceRect, mirrorOffset, options, ...args});
  });
}

/**
 * Applys mirror styles
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @param {HTMLElement} state.source
 * @param {Object} state.options
 * @return {Promise}
 * @private
 */
function resetMirror({mirror, source, options, ...args}) {
  return withPromise((resolve) => {
    let offsetHeight;
    let offsetWidth;

    if (options.constrainDimensions) {
      const computedSourceStyles = getComputedStyle(source);
      offsetHeight = computedSourceStyles.getPropertyValue('height');
      offsetWidth = computedSourceStyles.getPropertyValue('width');
    }

    mirror.style.display = null;
    mirror.style.position = 'fixed';
    mirror.style.pointerEvents = 'none';
    mirror.style.top = 0;
    mirror.style.left = 0;
    mirror.style.margin = 0;

    if (options.constrainDimensions) {
      mirror.style.height = offsetHeight;
      mirror.style.width = offsetWidth;
    }

    resolve({mirror, source, options, ...args});
  });
}

/**
 * Applys mirror class on mirror element
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @param {String} state.mirrorClass
 * @return {Promise}
 * @private
 */
function addMirrorClasses({mirror, mirrorClass, ...args}) {
  return withPromise((resolve) => {
    mirror.classList.add(mirrorClass);
    resolve({mirror, mirrorClass, ...args});
  });
}

/**
 * Removes source ID from cloned mirror element
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @return {Promise}
 * @private
 */
function removeMirrorID({mirror, ...args}) {
  return withPromise((resolve) => {
    mirror.removeAttribute('id');
    delete mirror.id;
    resolve({mirror, ...args});
  });
}

/**
 * Positions mirror with translate3d
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @param {SensorEvent} state.sensorEvent
 * @param {Object} state.mirrorOffset
 * @param {Number} state.initialY
 * @param {Number} state.initialX
 * @param {Object} state.options
 * @return {Promise}
 * @private
 */
function positionMirror({withFrame = false, initial = false} = {}) {
  return ({
    mirror,
    sensorEvent,
    mirrorOffset,
    initialY,
    initialX,
    scrollOffset,
    options,
    passedThreshX,
    passedThreshY,
    lastMovedX,
    lastMovedY,
    ...args
  }) => {
    return withPromise(
      (resolve) => {
        const result = {
          mirror,
          sensorEvent,
          mirrorOffset,
          options,
          ...args,
        };

        if (mirrorOffset) {
          const x = passedThreshX
            ? Math.round((sensorEvent.clientX - mirrorOffset.left - scrollOffset.x) / (options.thresholdX || 1)) *
              (options.thresholdX || 1)
            : Math.round(lastMovedX);
          const y = passedThreshY
            ? Math.round((sensorEvent.clientY - mirrorOffset.top - scrollOffset.y) / (options.thresholdY || 1)) *
              (options.thresholdY || 1)
            : Math.round(lastMovedY);

          if ((options.xAxis && options.yAxis) || initial) {
            mirror.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          } else if (options.xAxis && !options.yAxis) {
            mirror.style.transform = `translate3d(${x}px, ${initialY}px, 0)`;
          } else if (options.yAxis && !options.xAxis) {
            mirror.style.transform = `translate3d(${initialX}px, ${y}px, 0)`;
          }

          if (initial) {
            result.initialX = x;
            result.initialY = y;
          }

          result.lastMovedX = x;
          result.lastMovedY = y;
        }

        resolve(result);
      },
      {frame: withFrame},
    );
  };
}

/**
 * Wraps functions in promise with potential animation frame option
 * @param {Function} callback
 * @param {Object} options
 * @param {Boolean} options.raf
 * @return {Promise}
 * @private
 */
function withPromise(callback, {raf = false} = {}) {
  return new Promise((resolve, reject) => {
    if (raf) {
      requestAnimationFrame(() => {
        callback(resolve, reject);
      });
    } else {
      callback(resolve, reject);
    }
  });
}

/**
 * Returns true if the sensor event was triggered by a native browser drag event
 * @param {SensorEvent} sensorEvent
 */
function isNativeDragEvent(sensorEvent) {
  return /^drag/.test(sensorEvent.originalEvent.type);
}
