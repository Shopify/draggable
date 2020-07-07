import AbstractPlugin from 'shared/AbstractPlugin';
import {distance as euclideanDistance} from 'shared/utils';
import grid from './grid';

const onMirrorCreated = Symbol('onMirrorCreated');
const onMirrorDestroy = Symbol('onMirrorDestroy');
const onMirrorMove = Symbol('onMirrorMove');
const onDragOverContainer = Symbol('onDragOverContainer');
const onDragOutContainer = Symbol('onDragOutContainer');

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

    this[onMirrorCreated] = this[onMirrorCreated].bind(this);
    this[onMirrorDestroy] = this[onMirrorDestroy].bind(this);
    this[onMirrorMove] = this[onMirrorMove].bind(this);
    this[onDragOverContainer] = this[onDragOverContainer].bind(this);
    this[onDragOutContainer] = this[onDragOutContainer].bind(this);
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
      .off('drag:over:container', this[onDragOverContainer])
      .off('drag:out:container', this[onDragOutContainer])
      .off('mirror:move', this[onMirrorMove])
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
    const rect = evt.source.getBoundingClientRect();

    // can't get dimensions of mirror in mirror created
    // so use source dimensions
    this.relativePoints = this.getRelativePoints(rect, evt.originalEvent);

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
    this.relativePoints = null;
    this.startPoint = null;
  }

  /**
   * Drag over handler
   * @param {DragOverEvent | DragOverContainer} dragEvent
   * @private
   */
  [onMirrorMove](evt) {
    if (!this.overContainer) {
      return;
    }
    evt.cancel();
    requestAnimationFrame(() => {
      // console.log(evt.originalEvent.pageY, evt.originalEvent.pageX);
      // console.log(this.overContainer.scrollTop, this.overContainer.scrollLeft);
      // console.log(this.overContainer.offsetTop, this.overContainer.offsetLeft);
      const nearest = this.getNearest({
        x: evt.originalEvent.pageX + this.overContainer.scrollLeft - this.overContainer.offsetLeft,
        y: evt.originalEvent.pageY + this.overContainer.scrollTop - this.overContainer.offsetTop,
      });
      // console.log(nearest);
      this.mirror.style.transform = null;
      evt.mirror.style.left = `${nearest.x}px`;
      evt.mirror.style.top = `${nearest.y}px`;
    });
  }

  [onDragOverContainer](evt) {
    this.overContainer = evt.overContainer;
    this.overContainer.append(this.mirror);
    this.mirror.style.position = 'absolute';
  }

  [onDragOutContainer](evt) {
    this.overContainer.position = null;
    this.overContainer = null;
    evt.sourceContainer.append(this.mirror);
    this.mirror.style.position = 'fixed';
    this.mirror.style.top = '0';
    this.mirror.style.left = '0';
  }

  getNearest(diff) {
    let result = {x: 0, y: 0};
    let distance = Infinity;

    this.options.targets.forEach((rowTarget) => {
      let target = rowTarget;
      if (typeof target === 'function') {
        target = target(diff.x, diff.y);
      }

      const range = target.range ? target.range : this.options.range;

      this.relativePoints.forEach((relativePoint) => {
        const tempPoint = {
          x: diff.x + this.offset.x + relativePoint.x,
          y: diff.y + this.offset.y + relativePoint.y,
        };
        const tempDistance = euclideanDistance(tempPoint.x, tempPoint.y, target.x, target.y);

        if (tempDistance > range) {
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

  getRelativePoints(rect) {
    const relativePoints = [];
    this.options.relativePoints.forEach((point) => {
      relativePoints.push({x: rect.width * point.x, y: rect.height * point.y});
    });
    return relativePoints;
  }

  getOffset(container) {
    const rect = container.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
    };
  }
}

SnapMirror.grid = grid;

SnapMirror.inRangeRange = function(coord, range) {
  return (
    coord.x < this.x + range.rect[1] &&
    coord.x > this.x - range.rect[3] &&
    coord.y > this.y - range.rect[0] &&
    coord.y < this.y + range.rect[2]
  );
};
