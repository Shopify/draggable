import Draggable from 'Draggable/Draggable';

import AbstractPlugin from '../../../shared/AbstractPlugin';
import { DragMoveEvent, DragStartEvent } from '../../DragEvent';
import { SensorEvent } from '../../Sensors';
import {
  MirrorCreateEvent,
  MirrorCreatedEvent,
  MirrorAttachedEvent,
  MirrorMoveEvent,
  MirrorMovedEvent,
  MirrorDestroyEvent,
} from './MirrorEvent';

export const onDragStart = Symbol('onDragStart');
export const onDragMove = Symbol('onDragMove');
export const onDragStop = Symbol('onDragStop');
export const onMirrorCreated = Symbol('onMirrorCreated');
export const onMirrorMove = Symbol('onMirrorMove');
export const onScroll = Symbol('onScroll');
export const getAppendableContainer = Symbol('getAppendableContainer');

export const defaultOptions = {
  constrainDimensions: false,
  xAxis: true,
  yAxis: true,
  cursorOffsetX: null,
  cursorOffsetY: null,
  thresholdX: null,
  thresholdY: null,
};

function withPromise(callback, { withFrame = false } = {}) {
  return new Promise((resolve, reject) => {
    if (withFrame) {
      requestAnimationFrame(() => {
        callback(resolve, reject);
      });
    } else callback(resolve, reject);
  });
}

function computeMirrorDimensions({ source, ...args }) {
  return withPromise((resolve) => {
    const sourceRect = source.getBoundingClientRect();
    resolve({ source, sourceRect, ...args });
  });
}

function calculateMirrorOffset({ sensorEvent, sourceRect, options, ...args }) {
  return withPromise((resolve) => {
    const top =
      options.cursorOffsetY === null
        ? sensorEvent.clientY - sourceRect.top
        : options.cursorOffsetY;
    const left =
      options.cursorOffsetX === null
        ? sensorEvent.clientX - sourceRect.left
        : options.cursorOffsetX;
    const mirrorOffset = { top, left };

    resolve({ sensorEvent, sourceRect, mirrorOffset, options, ...args });
  });
}

function resetMirror({ mirror, source, options, ...args }) {
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

    resolve({ mirror, source, options, ...args });
  });
}

function addMirrorClasses({ mirror, mirrorClasses, ...args }) {
  return withPromise((resolve) => {
    mirror.classList.add(...mirrorClasses);
    resolve({ mirror, mirrorClasses, ...args });
  });
}

function removeMirrorID({ mirror, ...args }) {
  return withPromise((resolve) => {
    mirror.removeAttribute('id');
    delete mirror.id;
    resolve({ mirror, ...args });
  });
}

function positionMirror({ withFrame = false, initial = false } = {}) {
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
  }) =>
    withPromise(
      (resolve) => {
        const result: Partial<Mirror> = {
          mirror,
          sensorEvent,
          mirrorOffset,
          options,
          ...args,
        };

        if (mirrorOffset) {
          const x = passedThreshX
            ? Math.round(
                (sensorEvent.clientX - mirrorOffset.left - scrollOffset.x) /
                  (options.thresholdX ?? 1)
              ) * (options.thresholdX ?? 1)
            : Math.round(lastMovedX);
          const y = passedThreshY
            ? Math.round(
                (sensorEvent.clientY - mirrorOffset.top - scrollOffset.y) /
                  (options.thresholdY ?? 1)
              ) * (options.thresholdY ?? 1)
            : Math.round(lastMovedY);

          const { xAxis, yAxis } = options;
          mirror.style.transform = `translate3d(${
            xAxis || initial ? x : initialX
          }px, ${yAxis || initial ? y : initialY}px, 0)`;

          if (initial) {
            result.initialX = x;
            result.initialY = y;
          }

          result.lastMovedX = x;
          result.lastMovedY = y;
        }

        resolve(result);
      },
      { withFrame }
    );
}

const isNativeDragEvent = (sensorEvent: SensorEvent) =>
  /^drag/.test(sensorEvent.originalEvent.type);

export interface MirrorOptions {
  constrainDimensions?: boolean;
  xAxis?: boolean;
  yAxis?: boolean;
  cursorOffsetX?: number | null;
  cursorOffsetY?: number | null;
  appendTo?: string | HTMLElement | ((element: HTMLElement) => void);
  thresholdX?: number;
  thresholdY?: number;
}

export default class Mirror extends AbstractPlugin {
  options: MirrorOptions;
  scrollOffset: { x: number; y: number } = { x: 0, y: 0 };
  initialScrollOffset: { x: number; y: number } = { x: 0, y: 0 };
  lastMirrorMovedClient: { x: number; y: number };
  mirrorOffset: { x: number; y: number };
  initialX: number;
  initialY: number;
  lastMovedX: number;
  lastMovedY: number;
  mirror: HTMLElement;
  sensorEvent: SensorEvent;

  constructor(draggable: Draggable) {
    super(draggable);

    this.options = {
      ...defaultOptions,
      ...this.getOptions(),
    };

    this.initialScrollOffset = {
      x: window.scrollX,
      y: window.scrollY,
    };
  }

  attach() {
    this.draggable
      .on('drag:start', this[onDragStart])
      .on('drag:move', this[onDragMove])
      .on('drag:stop', this[onDragStop])
      .on('mirror:created', this[onMirrorCreated])
      .on('mirror:move', this[onMirrorMove]);
  }

  detach() {
    this.draggable
      .off('drag:start', this[onDragStart])
      .off('drag:move', this[onDragMove])
      .off('drag:stop', this[onDragStop])
      .off('mirror:created', this[onMirrorCreated])
      .off('mirror:move', this[onMirrorMove]);
  }

  /*** Returns options passed through draggable */
  getOptions = () => this.draggable.options.mirror ?? {};

  [onDragStart] = (dragEvent: DragStartEvent) => {
    if (dragEvent.canceled()) return;

    if ('ontouchstart' in window) {
      document.addEventListener('scroll', this[onScroll], true);
    }

    this.initialScrollOffset = {
      x: window.scrollX,
      y: window.scrollY,
    };

    const { source, originalSource, sourceContainer, sensorEvent } = dragEvent;

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

    const appendableContainer =
      this[getAppendableContainer](source) || sourceContainer;

    this.mirror = <HTMLElement>source.cloneNode(true);
    this.mirror.setAttribute('role', 'dragmirror');

    const mirrorCreatedEvent = new MirrorCreatedEvent({
      source,
      originalSource,
      sourceContainer,
      sensorEvent,
      dragEvent,
      originalEvent: dragEvent.originalEvent,
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
  };

  [onDragMove] = (dragEvent: DragMoveEvent) => {
    if (!this.mirror || dragEvent.canceled()) return;

    const {
      source,
      originalSource,
      sourceContainer,
      sensorEvent,
      originalEvent,
    } = dragEvent;

    let passedThreshX = true,
      passedThreshY = true;
    const { thresholdX, thresholdY } = this.options;

    if (thresholdX || thresholdY) {
      const { x: lastX, y: lastY } = this.lastMirrorMovedClient;
      if (Math.abs(lastX - sensorEvent.clientX) < thresholdX)
        passedThreshX = false;
      else this.lastMirrorMovedClient.x = sensorEvent.clientX;

      if (Math.abs(lastY - sensorEvent.clientY) < thresholdY)
        passedThreshY = false;
      else this.lastMirrorMovedClient.y = sensorEvent.clientY;

      if (!passedThreshX && !passedThreshY) return;
    }

    const mirrorMoveEvent = new MirrorMoveEvent({
      source,
      originalSource,
      sourceContainer,
      sensorEvent,
      dragEvent,
      originalEvent,
      mirror: this.mirror,
      passedThreshX,
      passedThreshY,
    });

    this.draggable.trigger(mirrorMoveEvent);
  };

  [onDragStop] = (dragEvent) => {
    if ('ontouchstart' in window) {
      document.removeEventListener('scroll', this[onScroll], true);
    }

    this.initialScrollOffset = { x: 0, y: 0 };
    this.scrollOffset = { x: 0, y: 0 };

    if (!this.mirror) return;

    const { source, sourceContainer, sensorEvent } = dragEvent;

    const mirrorDestroyEvent = new MirrorDestroyEvent({
      source,
      mirror: this.mirror,
      sourceContainer,
      sensorEvent,
      dragEvent,
    });

    this.draggable.trigger(mirrorDestroyEvent);

    if (!mirrorDestroyEvent.canceled()) {
      this.mirror.remove();
    }
  };

  [onScroll] = () => {
    this.scrollOffset = {
      x: window.scrollX - this.initialScrollOffset.x,
      y: window.scrollY - this.initialScrollOffset.y,
    };
  };

  private [onMirrorCreated] = ({
    mirror,
    source,
    sensorEvent,
  }: MirrorCreatedEvent) => {
    const mirrorClasses = this.draggable.getClassNamesFor('mirror');
    const setState = ({ mirrorOffset, initialX, initialY, ...args }) => {
      this.mirrorOffset = mirrorOffset;
      this.initialX = initialX;
      this.initialY = initialY;
      this.lastMovedX = initialX;
      this.lastMovedY = initialY;
      return { mirrorOffset, initialX, initialY, ...args };
    };

    mirror.style.display = 'none';

    const initialState = {
      mirror,
      source,
      sensorEvent,
      mirrorClasses,
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
        .then(positionMirror({ initial: true }))
        .then(removeMirrorID)
        .then(setState)
    );
  };

  private [onMirrorMove] = (mirrorEvent: MirrorMoveEvent) => {
    if (mirrorEvent.canceled()) return null;

    const setState = ({ lastMovedX, lastMovedY, ...args }) => {
      this.lastMovedX = lastMovedX;
      this.lastMovedY = lastMovedY;

      return { lastMovedX, lastMovedY, ...args };
    };
    const triggerMoved = (args) => {
      const mirrorMovedEvent = new MirrorMovedEvent({
        source: mirrorEvent.source,
        originalSource: mirrorEvent.originalSource,
        sourceContainer: mirrorEvent.sourceContainer,
        sensorEvent: mirrorEvent.sensorEvent,
        dragEvent: mirrorEvent.dragEvent,
        mirror: this.mirror,
        passedThreshX: mirrorEvent.passedThreshX,
        passedThreshY: mirrorEvent.passedThreshY,
      });

      this.draggable.trigger(mirrorMovedEvent);

      return args;
    };
    const initialState = {
      mirror: mirrorEvent.mirror,
      sensorEvent: mirrorEvent.sensorEvent,
      passedThreshX: mirrorEvent.passedThreshX,
      passedThreshY: mirrorEvent.passedThreshY,
      mirrorOffset: this.mirrorOffset,
      options: this.options,
      scrollOffset: this.scrollOffset,
      initialX: this.initialX,
      initialY: this.initialY,
      lastMovedX: this.lastMovedX,
      lastMovedY: this.lastMovedY,
    };

    return Promise.resolve(initialState)
      .then(positionMirror({ withFrame: true }))
      .then(setState)
      .then(triggerMoved);
  };

  private [getAppendableContainer](source: HTMLElement) {
    const { appendTo } = this.options;
    if (typeof appendTo === 'string') return document.querySelector(appendTo);
    else if (appendTo instanceof HTMLElement) return appendTo;
    else if (typeof appendTo === 'function')
      return (<(element: HTMLElement) => void>appendTo)(source);
    else return source.parentNode;
  }
}
