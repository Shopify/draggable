import AbstractPlugin from 'shared/AbstractPlugin';
import {distance as euclideanDistance} from 'shared/utils';
import grid from './grid';

const onMirrorCreated = Symbol('onMirrorCreated');
const onMirrorDestroy = Symbol('onMirrorDestroy');
const onMirrorMove = Symbol('onMirrorMove');

/**
 * SnapMirror default options
 * @property {Object} defaultOptions
 * @type {Object}
 */
export const defaultOptions = {
  targets: [],
  offset: 'container',
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
  }

  /**
   * Attaches plugins event listeners
   */
  attach() {
    this.draggable.on('mirror:created', this[onMirrorCreated]).on('mirror:move', this[onMirrorMove]);
  }

  /**
   * Detaches plugins event listeners
   */
  detach() {
    this.draggable
      .off('mirror:created', this[onMirrorCreated])
      .off('mirror:destroy', this[onMirrorDestroy])
      .off('mirror:move', this[onMirrorMove]);
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
  [onMirrorCreated]({sourceContainer, source, originalEvent}) {
    const rect = source.getBoundingClientRect();
    this.offset = this.getOffset(sourceContainer);

    // can't get dimensions of mirror in mirror created
    // so use source dimensions
    this.relativePoints = this.getRelativePoints(rect);

    this.eventStartPoint = {
      x: originalEvent.pageX,
      y: originalEvent.pageY,
    };
    this.startPoint = {
      x: rect.x - this.offset.x,
      y: rect.y - this.offset.y,
    };
  }

  /**
   * Mirror destroy handler
   * @param {MirrorDestroyEvent} mirrorEvent
   * @private
   */
  [onMirrorDestroy]() {
    this.offset = null;
    this.relativePoints = null;
    this.eventStartPoint = null;
    this.startPoint = null;
  }

  /**
   * Drag over handler
   * @param {DragOverEvent | DragOverContainer} dragEvent
   * @private
   */
  [onMirrorMove](evt) {
    evt.cancel();
    const {pageX, pageY} = evt.originalEvent;
    requestAnimationFrame(() => {
      const nearest = this.getNearest({
        x: pageX - this.eventStartPoint.x,
        y: pageY - this.eventStartPoint.y,
      });
      const translate = {
        x: this.offset.x + nearest.x,
        y: this.offset.y + nearest.y,
      };
      evt.mirror.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0)`;
    });
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
        const point = {
          x: this.startPoint.x + relativePoint.x,
          y: this.startPoint.y + relativePoint.y,
        };
        const tempPoint = {
          x: point.x + diff.x,
          y: point.y + diff.y,
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
    if (this.options.offset === 'container') {
      const rect = container.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y,
      };
    }

    if (this.options.offset.x && this.options.offset.y) {
      return {
        x: this.options.offset.x,
        y: this.options.offset.y,
      };
    }

    return {x: 0, y: 0};
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
