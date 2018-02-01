import AbstractPlugin from 'shared/AbstractPlugin';

export const onMirrorCreated = Symbol('onMirrorCreated');
export const onMirrorMove = Symbol('onMirrorMove');

/**
 * Mirror default options
 * @property {Object} defaultOptions
 * @property {Boolean} defaultOptions.constrainDimensions
 * @property {Boolean} defaultOptions.xAxis
 * @property {Boolean} defaultOptions.yAxis
 * @type {Object}
 */
export const defaultOptions = {
  constrainDimensions: false,
  xAxis: true,
  yAxis: true,
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
     * @type {Object}
     */
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    this[onMirrorCreated] = this[onMirrorCreated].bind(this);
    this[onMirrorMove] = this[onMirrorMove].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable
      .on('mirror:created', this[onMirrorCreated])
      .on('mirror:move', this[onMirrorMove]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable
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
      return {mirrorOffset, initialX, initialY, ...args};
    };

    const initialState = {
      mirror,
      source,
      sensorEvent,
      mirrorClass,
      options: this.options,
    };

    return Promise.resolve(initialState)
      // Fix reflow here
      .then(computeMirrorDimensions)
      .then(calculateMirrorOffset)
      .then(resetMirror)
      .then(addMirrorClasses)
      .then(positionMirror({initial: true}))
      .then(removeMirrorID)
      .then(setState);
  }

  /**
   * Mirror move handler
   * @param {MirrorMoveEvent} mirrorEvent
   * @return {Promise}
   * @private
   */
  [onMirrorMove]({mirror, sensorEvent}) {
    const initialState = {
      mirror,
      sensorEvent,
      mirrorOffset: this.mirrorOffset,
      options: this.options,
      initialX: this.initialX,
      initialY: this.initialY,
    };

    return Promise.resolve(initialState)
      .then(positionMirror({raf: true}));
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
function calculateMirrorOffset({sensorEvent, sourceRect, ...args}) {
  return withPromise((resolve) => {
    const mirrorOffset = {
      top: sensorEvent.clientY - sourceRect.top,
      left: sensorEvent.clientX - sourceRect.left,
    };

    resolve({sensorEvent, sourceRect, mirrorOffset, ...args});
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
  return ({mirror, sensorEvent, mirrorOffset, initialY, initialX, options, ...args}) => {
    return withPromise((resolve) => {
      const result = {
        mirror,
        sensorEvent,
        mirrorOffset,
        options,
        ...args,
      };

      if (mirrorOffset) {
        const x = sensorEvent.clientX - mirrorOffset.left;
        const y = sensorEvent.clientY - mirrorOffset.top;

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
      }

      resolve(result);
    }, {frame: withFrame});
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
