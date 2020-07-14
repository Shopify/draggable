import AbstractPlugin from 'shared/AbstractPlugin';
import {distance as euclideanDistance} from 'shared/utils';
import {grid, line} from './targets';

const onMirrorCreated = Symbol('onMirrorCreated');
const onMirrorDestroy = Symbol('onMirrorDestroy');
const onMirrorMove = Symbol('onMirrorMove');
const onDragOverContainer = Symbol('onDragOverContainer');
const onDragOutContainer = Symbol('onDragOutContainer');
const getNearestSnapCoordinate = Symbol('getNearest');
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

    this.offset = null;
    this.mirror = null;
    this.overContainer = null;
    this.relativePoints = null;

    this[onMirrorCreated] = this[onMirrorCreated].bind(this);
    this[onMirrorDestroy] = this[onMirrorDestroy].bind(this);
    this[onMirrorMove] = this[onMirrorMove].bind(this);
    this[onDragOverContainer] = this[onDragOverContainer].bind(this);
    this[onDragOutContainer] = this[onDragOutContainer].bind(this);
    this[calcRelativePoints] = this[calcRelativePoints].bind(this);
    this[getNearestSnapCoordinate] = this[getNearestSnapCoordinate].bind(this);
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

    this.offset = {
      x: rect.x - evt.sensorEvent.clientX,
      y: rect.y - evt.sensorEvent.clientY,
    };

    this.mirror = evt.mirror;
  }

  /**
   * Mirror destroy handler
   * @param {MirrorDestroyEvent} mirrorEvent
   * @private
   */
  [onMirrorDestroy]() {
    this.offset = null;
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
    if (!this.overContainer || evt.canceled()) {
      return;
    }

    evt.cancel();
    requestAnimationFrame(() => {
      if (!this.overContainer) {
        return;
      }

      const point = {
        // currentPageX - contianerOffset + contanierScroll + selfOffset
        x: evt.originalEvent.pageX + this.overContainer.scrollLeft - this.overContainer.offsetLeft + this.offset.x,
        y: evt.originalEvent.pageY + this.overContainer.scrollTop - this.overContainer.offsetTop + this.offset.y,
      };
      const nearest = this[getNearestSnapCoordinate](point);

      this.mirror.style.transform = `translate3d(${nearest.x}px, ${nearest.y}px, 0)`;
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
    this.overContainer.append(this.mirror);
    this.mirror.style.position = 'absolute';
    this[calcRelativePoints]();
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
    evt.sourceContainer.append(this.mirror);
    this.mirror.style.position = 'fixed';
  }

  /**
   * Get nearest snap coordinate according to current coordinate, target and relative points.
   * @param {Point} coord
   * @private
   */
  [getNearestSnapCoordinate](coord) {
    let result = {x: coord.x, y: coord.y};
    let distance = Infinity;

    this.options.targets.forEach((rowTarget) => {
      let target = rowTarget;
      if (typeof target === 'function') {
        target = target(coord.x, coord.y, this);
      }

      const range = target.range ? target.range : this.options.range;

      this.relativePoints.forEach((relativePoint) => {
        const tempPoint = {
          x: coord.x + relativePoint.x,
          y: coord.y + relativePoint.y,
        };
        const tempDistance = euclideanDistance(tempPoint.x, tempPoint.y, target.x, target.y);

        if ((typeof range === 'function' && !range(target, tempPoint)) || tempDistance > range) {
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
