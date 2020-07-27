import AbstractPlugin from 'shared/AbstractPlugin';
import {distance as euclideanDistance} from 'shared/utils';
import {grid, line} from './targets';

const onMirrorCreated = Symbol('onMirrorCreated');
const onMirrorDestroy = Symbol('onMirrorDestroy');
const onMirrorMove = Symbol('onMirrorMove');
const onDragOverContainer = Symbol('onDragOverContainer');
const onDragOutContainer = Symbol('onDragOutContainer');
const calcRelativePoints = Symbol('getRelativePoints');

/**
 * SnapMirror default options
 * @property {Object} defaultOptions
 * @type {Object}
 */
export const defaultOptions = {
  targets: [],
  relativePoints: [
    {
      x: 0,
      y: 0,
    },
  ],
  range: Infinity,
};

/**
 * The SnapMirror plugin snap the mirror element to the target points.
 * @class SnapMirror
 * @module SnapMirror
 * @extends AbstractPlugin
 */
export default class SnapMirror extends AbstractPlugin {
  /**
   * SnapMirror constructor.
   * @constructs SnapMirror
   * @param {Draggable} draggable - Draggable instance
   */
  constructor(draggable) {
    super(draggable);

    /**
     * SnapMirror options
     * @property {Object} options
     * @type {Object}
     */
    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    this.pointInMirrorCoordinate = null;
    this.mirror = null;
    this.overContainer = null;
    this.relativePoints = null;
    this.lastAnimationFrame = null;

    this[onMirrorCreated] = this[onMirrorCreated].bind(this);
    this[onMirrorDestroy] = this[onMirrorDestroy].bind(this);
    this[onMirrorMove] = this[onMirrorMove].bind(this);
    this[onDragOverContainer] = this[onDragOverContainer].bind(this);
    this[onDragOutContainer] = this[onDragOutContainer].bind(this);
    this[calcRelativePoints] = this[calcRelativePoints].bind(this);
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable
      .on('mirror:created', this[onMirrorCreated])
      .on('mirror:move', this[onMirrorMove])
      .on('drag:over:container', this[onDragOverContainer])
      .on('drag:out:container', this[onDragOutContainer])
      .on('mirror:destroy', this[onMirrorDestroy]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable
      .off('mirror:created', this[onMirrorCreated])
      .off('mirror:move', this[onMirrorMove])
      .off('drag:over:container', this[onDragOverContainer])
      .off('drag:out:container', this[onDragOutContainer])
      .off('mirror:destroy', this[onMirrorDestroy]);
  }

  /**
   * Returns options passed through draggable
   * @return {Object}
   */
  getOptions() {
    return this.draggable.options.SnapMirror || {};
  }

  /**
   * Mirror created handler
   * @param {MirrorCreatedEvent} mirrorEvent
   * @private
   */
  [onMirrorCreated](evt) {
    // can't get dimensions of mirror in mirror created
    // so use source's dimensions
    const rect = evt.source.getBoundingClientRect();

    this.pointInMirrorCoordinate = {
      x: evt.sensorEvent.clientX - rect.x,
      y: evt.sensorEvent.clientY - rect.y,
    };

    this.mirror = evt.mirror;
  }

  /**
   * Mirror destroy handler
   * @param {MirrorDestroyEvent} mirrorEvent
   * @private
   */
  [onMirrorDestroy]() {
    cancelAnimationFrame(this.lastAnimationFrame);
    this.lastAnimationFrame = null;
    this.pointInMirrorCoordinate = null;
    this.mirror = null;
    this.relativePoints = null;
    this.overContainer = null;
  }

  /**
   * Drag over handler
   * @param {DragOverEvent | DragOverContainer} dragEvent
   * @private
   */
  [onMirrorMove](evt) {
    if (evt.canceled()) {
      return;
    }

    if (this.lastAnimationFrame) {
      evt.cancel();
      return;
    }

    if (!this.overContainer) {
      return;
    }

    evt.cancel();

    cancelAnimationFrame(this.lastAnimationFrame);
    this.lastAnimationFrame = requestAnimationFrame(() => {
      positionMirror(evt.sensorEvent, this);
      this.lastAnimationFrame = null;
    });
  }

  /**
   * Drag over handler
   * @param {DragOverEvent | DragOverContainer} dragEvent
   * @private
   */
  [onDragOverContainer](evt) {
    if (evt.canceled()) {
      return;
    }
    this.overContainer = evt.overContainer;
    const rect = evt.overContainer.getBoundingClientRect();
    this.overContainer.pageX = window.scrollX + rect.x;
    this.overContainer.pageY = window.scrollY + rect.y;

    cancelAnimationFrame(this.lastAnimationFrame);
    this.lastAnimationFrame = requestAnimationFrame(() => {
      this.overContainer.append(this.mirror);
      this[calcRelativePoints]();
      this.mirror.style.position = 'absolute';
      positionMirror(evt.sensorEvent, this);
      this.lastAnimationFrame = null;
    });
  }

  /**
   * Drag over handler
   * @param {DragOverEvent | DragOverContainer} dragEvent
   * @private
   */
  [onDragOutContainer](evt) {
    if (evt.canceled()) {
      return;
    }
    this.overContainer = null;

    cancelAnimationFrame(this.lastAnimationFrame);
    this.lastAnimationFrame = requestAnimationFrame(() => {
      evt.sourceContainer.append(this.mirror);
      this.mirror.style.position = 'fixed';
      positionMirror(evt.sensorEvent, this);
      cancelAnimationFrame(this.lastAnimationFrame);
      this.lastAnimationFrame = null;
    });
  }

  /**
   * Calculate relative points
   * @private
   */
  [calcRelativePoints]() {
    const rect = this.mirror.getBoundingClientRect();
    const relativePoints = [];
    this.options.relativePoints.forEach((point) => {
      relativePoints.push({x: rect.width * point.x, y: rect.height * point.y});
    });
    this.relativePoints = relativePoints;
  }
}

function positionMirror(sensorEvent, snapMirror) {
  const {mirror, overContainer, pointInMirrorCoordinate} = snapMirror;

  if (!overContainer) {
    // point relative to client and event offset
    const point = {
      x: sensorEvent.clientX - pointInMirrorCoordinate.x,
      y: sensorEvent.clientY - pointInMirrorCoordinate.y,
    };
    mirror.style.transform = `translate3d(${Math.round(point.x)}px, ${Math.round(point.y)}px, 0)`;
    return;
  }

  const pointRelativeToPage = {
    x: sensorEvent.pageX - pointInMirrorCoordinate.x,
    y: sensorEvent.pageY - pointInMirrorCoordinate.y,
  };
  const pointRelativeToContainer = {
    x: pointRelativeToPage.x + overContainer.scrollLeft - overContainer.pageX,
    y: pointRelativeToPage.y + overContainer.scrollTop - overContainer.pageY,
  };

  const point = getNearestSnapPoint(pointRelativeToContainer, snapMirror);
  mirror.style.transform = `translate3d(${Math.round(point.x)}px, ${Math.round(point.y)}px, 0)`;
}

/**
 * Get nearest snap coordinate according to current coordinate, target and relative points.
 * @param {Point} coord
 * @private
 */
function getNearestSnapPoint(coord, snapMirror) {
  let result = {x: coord.x, y: coord.y};
  let distance = Infinity;

  snapMirror.options.targets.forEach((rowTarget) => {
    let target = rowTarget;
    if (typeof target === 'function') {
      target = target(coord.x, coord.y, snapMirror);
    }

    const range = target.range ? target.range : snapMirror.options.range;

    snapMirror.relativePoints.forEach((relativePoint) => {
      const tempPoint = {
        x: coord.x + relativePoint.x,
        y: coord.y + relativePoint.y,
      };
      const tempDistance = euclideanDistance(tempPoint.x, tempPoint.y, target.x, target.y);

      if ((typeof range === 'function' && !range(coord, target, relativePoint, snapMirror)) || tempDistance > range) {
        return;
      }

      if (tempDistance < distance) {
        result = {
          x: target.x - relativePoint.x,
          y: target.y - relativePoint.y,
        };
        distance = tempDistance;
      }
    });
  });

  return result;
}

SnapMirror.grid = grid;

SnapMirror.line = line;

SnapMirror.inRectRange = function(range) {
  return function(target, coord) {
    return (
      coord.x < target.x + range[1] &&
      coord.x > target.x - range[3] &&
      coord.y > target.y - range[0] &&
      coord.y < target.y + range[2]
    );
  };
};
