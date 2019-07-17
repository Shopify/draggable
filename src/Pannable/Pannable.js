import Draggable from '../Draggable';
import {PannableStartEvent, PannablePanEvent, PannableStopEvent} from './PannableEvent';

const onMirrorCreate = Symbol('onDragStop');
const onDragStart = Symbol('onDragStart');
const onDragMove = Symbol('onDragMove');
const onDragStop = Symbol('onDragStop');
const movePannable = Symbol('movePannable');
const animateBoundary = Symbol('animateBoundary');

/**
 * @const {Object} defaultAnnouncements
 * @const {Function} defaultAnnouncements['droppable:dropped']
 * @const {Function} defaultAnnouncements['droppable:returned']
 */
const defaultAnnouncements = {
  'pannable:start': ({dragEvent}) =>
    `Started panning ${dragEvent.source.textContent.trim() || dragEvent.source.id || 'pannable element'}`,
};

const defaultOptions = {
  bounadryElasticity: 1,
  boundaryPadding: 0,
  velocity: 0.9,
};

export default class Pannable extends Draggable {
  constructor(containers = [], options = {}) {
    super(containers, {
      ...defaultOptions,
      ...options,
      announcements: {
        ...defaultAnnouncements,
        ...(options.announcements || {}),
      },
    });

    this[onMirrorCreate] = this[onMirrorCreate].bind(this);
    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragMove] = this[onDragMove].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);

    this.on('mirror:create', this[onMirrorCreate])
      .on('drag:start', this[onDragStart])
      .on('drag:move', this[onDragMove])
      .on('drag:stop', this[onDragStop]);
  }

  [onMirrorCreate](event) {
    event.cancel();
  }

  [onDragStart](event) {
    if (this.momentumAnimationFrame !== undefined) {
      cancelAnimationFrame(this.momentumAnimationFrame);
    }
    this.animating = false;
    cancelAnimationFrame(this.boundaryAnimationFrame);

    const pannableStartEvent = new PannableStartEvent({
      dragEvent: event,
    });

    this.trigger(pannableStartEvent);

    if (pannableStartEvent.canceled()) {
      event.cancel();
      return;
    }

    this.lastMouseX = event.sensorEvent.clientX;
    this.lastMouseY = event.sensorEvent.clientY;

    event.source.style.display = 'none';
    event.originalSource.style.display = '';

    const matrix = getMatrix(event.originalSource.style.transform);
    this.initialTranslateX = matrix.e;
    this.initialTranslateY = matrix.f;
  }

  [onDragMove](event) {
    const pannablePanEvent = new PannablePanEvent({
      dragEvent: event,
    });

    this.trigger(pannablePanEvent);

    if (pannablePanEvent.canceled()) {
      return;
    }

    if (this.lastMouseX !== undefined && this.lastMouseY !== undefined) {
      this.velX = ((event.sensorEvent.clientX - this.lastMouseX) / (Date.now() - this.lastTime)) * 5;
      this.velY = ((event.sensorEvent.clientY - this.lastMouseY) / (Date.now() - this.lastTime)) * 5;
    }

    this[movePannable](event.originalSource, event.sensorEvent.clientX, event.sensorEvent.clientY);
    if (!this.animating) {
      requestAnimationFrame(this[animateBoundary].bind(this, event.originalSource, true));
    }

    this.lastMouseX = event.sensorEvent.clientX;
    this.lastMouseY = event.sensorEvent.clientY;
    this.lastTime = Date.now();
  }

  [movePannable](source, x, y) {
    const matrix = getMatrix(source.style.transform);
    source.style.transform = `translate(${matrix.e + x - this.lastMouseX}px, ${matrix.f + y - this.lastMouseY}px)`;
  }

  [animateBoundary](source, raf) {
    if (this.animating) {
      return;
    }

    const animate = () => {
      let animating = false;
      let matrix = getMatrix(source.style.transform);
      const containerRect = source.parentNode.getBoundingClientRect();
      const sourceRect = source.getBoundingClientRect();
      if (containerRect.left < sourceRect.left) {
        source.style.transform = `translate(${matrix.e -
          (sourceRect.left - containerRect.left) * this.options.bounadryElasticity}px, ${matrix.f}px)`;
        matrix = getMatrix(source.style.transform);
        animating = true;
      }
      if (containerRect.right > sourceRect.right) {
        source.style.transform = `translate(${matrix.e +
          (containerRect.right - sourceRect.right) * this.options.bounadryElasticity}px, ${matrix.f}px)`;
        matrix = getMatrix(source.style.transform);
        animating = true;
      }
      if (containerRect.top < sourceRect.top) {
        source.style.transform = `translate(${matrix.e}px, ${matrix.f -
          (sourceRect.top - containerRect.top) * this.options.bounadryElasticity}px)`;
        animating = true;
      }
      if (containerRect.bottom > sourceRect.bottom) {
        source.style.transform = `translate(${matrix.e}px, ${matrix.f +
          (containerRect.bottom - sourceRect.bottom) * this.options.bounadryElasticity}px)`;
        animating = true;
      }

      if (raf && animating) {
        this.animating = true;
        this.boundaryAnimationFrame = requestAnimationFrame(animate);
      } else {
        this.animating = false;
      }
    };

    animate();
  }

  [onDragStop](event) {
    const pannableStopEvent = new PannableStopEvent({
      dragEvent: event,
    });

    this.trigger(pannableStopEvent);

    if (!this.velX && !this.velY) {
      return;
    }
    const animateMomentum = () => {
      this[movePannable](
        event.originalSource,
        event.sensorEvent.clientX + this.velX,
        event.sensorEvent.clientY + this.velY,
        true,
      );
      this.velX *= this.options.velocity;
      this.velY *= this.options.velocity;
      if (!this.dragging && (Math.abs(this.velX) > 0.01 || Math.abs(this.velY) > 0.01)) {
        // Have to do this here for animation frames to sync properly
        this.animating = false;
        this[animateBoundary](event.originalSource, false);
        this.momentumAnimationFrame = requestAnimationFrame(animateMomentum);
      }

      this[animateBoundary](event.originalSource, false);
    };
    this.momentumAnimationFrame = requestAnimationFrame(animateMomentum);
  }
}

function getMatrix(element) {
  return new (window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix)(element);
}
