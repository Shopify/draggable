import {closest} from './utils';

import Accessibility from './core/accessibility';
import Mirror from './core/mirror';

import Collidable from './behaviour/collidable';
import Snappable from './behaviour/snappable';

import DragSensor from './sensors/drag-sensor';
import MouseSensor from './sensors/mouse-sensor';
import TouchSensor from './sensors/touch-sensor';
import ForceTouchSensor from './sensors/force-touch-sensor';

import {
  DraggableInitializedEvent,
  DraggableDestroyEvent,
} from './events/draggable-event';

import {
  DragStartEvent,
  DragMoveEvent,
  DragOutContainerEvent,
  DragOutEvent,
  DragOverContainerEvent,
  DragOverEvent,
  DragStopEvent,
  DragPressureEvent,
} from './events/drag-event';

import {
  MirrorCreatedEvent,
  MirrorAttachedEvent,
  MirrorMoveEvent,
  MirrorDestroyEvent,
} from './events/mirror-event';

const defaults = {
  draggable: '.draggable-source',
  handle: null,
  delay: 0,
  placedTimeout: 800,
  native: false,
  plugins: [Mirror, Accessibility],
  classes: {
    'container:dragging': 'draggable-container--is-dragging',
    'source:dragging': 'draggable-source--is-dragging',
    'source:placed': 'draggable-source--placed',
    'container:placed': 'draggable-container--placed',
    'body:dragging': 'draggable--is-dragging',
    'draggable:over': 'draggable--over',
    'container:over': 'draggable-container--over',
    mirror: 'draggable-mirror',
  },
};

/**
 * This is the core draggable library that does the heavy lifting
 * @module Draggable
 */
export default class Draggable {
  static get Plugins() {
    return {Accessibility, Mirror};
  }

  static get Behaviour() {
    return {Collidable, Snappable};
  }

  /**
   * Draggable constructor.
   * @constructs Draggable
   * @param {Array|NodeList} containers - Draggable containers
   * @param {Object} options - Options for draggable
   */
  constructor(containers = [], options = {}) {
    this.containers = containers;
    this.options = Object.assign({}, defaults, options);
    this.activeSensors = [];
    this.activePlugins = [];
    this.callbacks = {};
    this.dragging = false;

    this.dragStart = this.dragStart.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragStop = this.dragStop.bind(this);
    this.dragPressure = this.dragPressure.bind(this);

    for (const container of this.containers) {
      container.addEventListener('drag:start', this.dragStart, true);
      container.addEventListener('drag:move', this.dragMove, true);
      container.addEventListener('drag:stop', this.dragStop, true);
      container.addEventListener('drag:pressure', this.dragPressure, true);
    }

    for (const Plugin of this.options.plugins) {
      const plugin = new Plugin(this);
      plugin.attach();
      this.activePlugins.push(plugin);
    }

    for (const Sensor of this.sensors()) {
      const sensor = new Sensor(this.containers, options);
      sensor.attach();
      this.activeSensors.push(sensor);
    }

    const draggableInitializedEvent = new DraggableInitializedEvent({
      draggable: this,
    });

    this.triggerEvent(draggableInitializedEvent);
  }

  /**
   * Destroys Draggable instance. This removes all internal event listeners and
   * deactivates sensors and plugins
   */
  destroy() {
    for (const container of this.containers) {
      container.removeEventListener('drag:start', this.dragStart, true);
      container.removeEventListener('drag:move', this.dragMove, true);
      container.removeEventListener('drag:stop', this.dragStop, true);
      container.removeEventListener('drag:pressure', this.dragPressure, true);
    }

    const draggableDestroyEvent = new DraggableDestroyEvent({
      draggable: this,
    });

    this.triggerEvent(draggableDestroyEvent);

    for (const activePlugin of this.activePlugins) {
      activePlugin.detach();
    }

    for (const activeSensor of this.activeSensors) {
      activeSensor.detach();
    }
  }

  /**
   * Adds listener for draggable events
   * @example draggable.on('drag:start', (dragEvent) => dragEvent.cancel());
   */
  on(type, callback) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }

    this.callbacks[type].push(callback);
    return this;
  }

  /**
   * Removes listener from draggable
   * @example draggable.off('drag:start', handlerFunction);
   */
  off(type, callback) {
    if (!this.callbacks[type]) { return null; }
    const copy = this.callbacks[type].slice(0);
    for (let i = 0; i < copy.length; i++) {
      if (callback === copy[i]) {
        this.callbacks[type].splice(i, 1);
      }
    }
    return this;
  }

  trigger(type, ...args) {
    if (!this.callbacks[type]) { return; }
    for (let i = this.callbacks[type].length - 1; i >= 0; i--) {
      const callback = this.callbacks[type][i];
      callback(...args);
    }
  }

  /**
   * Active sensors
   * @return {Array} sensors
   */
  sensors() {
    return [
      TouchSensor,
      ForceTouchSensor,
      (this.options.native ? DragSensor : MouseSensor),
    ];
  }

  dragStart(event) {
    const sensorEvent = getSensorEvent(event);
    const {target, container, originalEvent} = sensorEvent;

    if (this.options.handle && target && !closest(target, this.options.handle)) {
      sensorEvent.cancel();
      return;
    }

    // Find draggable source element
    this.source = closest(target, this.options.draggable);
    this.sourceContainer = container;

    if (!this.source) {
      sensorEvent.cancel();
      return;
    }

    this.dragging = true;

    if (!isDragEvent(originalEvent)) {
      const appendableContainer = this.getAppendableContainer({source: this.source});
      this.mirror = this.source.cloneNode(true);

      const mirrorCreatedEvent = new MirrorCreatedEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent,
      });

      const mirrorAttachedEvent = new MirrorAttachedEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent,
      });

      this.triggerEvent(mirrorCreatedEvent);
      appendableContainer.appendChild(this.mirror);
      this.triggerEvent(mirrorAttachedEvent);
    }

    this.source.classList.add(this.getClassNameFor('source:dragging'));
    this.sourceContainer.classList.add(this.getClassNameFor('container:dragging'));
    document.body.classList.add(this.getClassNameFor('body:dragging'));

    if (this.mirror) {
      const mirrorMoveEvent = new MirrorMoveEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent,
      });

      this.triggerEvent(mirrorMoveEvent);
    }

    // Find the closest scrollable parent
    this.scrollableParent = closest(container, (element) => element.offsetHeight < element.scrollHeight);

    const dragEvent = new DragStartEvent({
      source: this.source,
      mirror: this.mirror,
      sourceContainer: container,
      sensorEvent,
    });

    this.triggerEvent(dragEvent);

    if (!dragEvent.canceled()) {
      return;
    }

    if (this.mirror) {
      this.mirror.parentNode.removeChild(this.mirror);
    }

    this.source.classList.remove(this.getClassNameFor('source:dragging'));
    this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
    document.body.classList.remove(this.getClassNameFor('body:dragging'));
  }

  triggerEvent(event) {
    return this.trigger(event.type, event);
  }

  dragMove(event) {
    const sensorEvent = getSensorEvent(event);
    const {container} = sensorEvent;
    let target = sensorEvent.target;

    const dragMoveEvent = new DragMoveEvent({
      source: this.source,
      mirror: this.mirror,
      sourceContainer: container,
      sensorEvent,
    });

    this.triggerEvent(dragMoveEvent);

    if (dragMoveEvent.canceled()) {
      sensorEvent.cancel();
    }

    if (this.mirror && !dragMoveEvent.canceled()) {
      const mirrorMoveEvent = new MirrorMoveEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent,
      });

      this.triggerEvent(mirrorMoveEvent);
    }

    target = closest(target, this.options.draggable);
    const overContainer = sensorEvent.overContainer || this.closestContainer(sensorEvent.target);
    const isLeavingContainer = this.currentOverContainer && (overContainer !== this.currentOverContainer);
    const isLeavingDraggable = this.currentOver && (target !== this.currentOver);
    const isOverContainer = overContainer && (this.currentOverContainer !== overContainer);
    const isOverDraggable = target && (this.currentOver !== target);

    if (isLeavingDraggable) {
      const dragOutEvent = new DragOutEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent,
        over: this.currentOver,
      });

      this.triggerEvent(dragOutEvent);

      this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
      this.currentOver = null;
    }

    if (isLeavingContainer) {
      const dragOutContainerEvent = new DragOutContainerEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent,
        overContainer: this.overContainer,
      });

      this.triggerEvent(dragOutContainerEvent);

      this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
      this.currentOverContainer = null;
    }

    if (isOverContainer) {
      overContainer.classList.add(this.getClassNameFor('container:over'));

      const dragOverContainerEvent = new DragOverContainerEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent,
        overContainer,
      });

      this.triggerEvent(dragOverContainerEvent);

      this.currentOverContainer = overContainer;
    }

    if (isOverDraggable) {
      target.classList.add(this.getClassNameFor('draggable:over'));

      const dragOverEvent = new DragOverEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent,
        overContainer,
        over: target,
      });

      this.triggerEvent(dragOverEvent);

      this.currentOver = target;
    }
  }

  dragStop(event) {
    this.dragging = false;

    const sensorEvent = getSensorEvent(event);
    const dragStopEvent = new DragStopEvent({
      source: this.source,
      mirror: this.mirror,
      sensorEvent: event.sensorEvent,
      sourceContainer: this.sourceContainer,
    });

    this.triggerEvent(dragStopEvent);

    this.source.classList.remove(this.getClassNameFor('source:dragging'));
    this.source.classList.add(this.getClassNameFor('source:placed'));
    this.sourceContainer.classList.add(this.getClassNameFor('container:placed'));
    this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
    document.body.classList.remove(this.getClassNameFor('body:dragging'));

    if (this.currentOver) {
      this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
    }

    if (this.currentOverContainer) {
      this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
    }

    if (this.mirror) {
      const mirrorDestroyEvent = new MirrorDestroyEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: sensorEvent.container,
        sensorEvent,
      });

      this.triggerEvent(mirrorDestroyEvent);

      if (!mirrorDestroyEvent.canceled()) {
        this.mirror.parentNode.removeChild(this.mirror);
      }
    }

    const lastSource = this.source;
    const lastSourceContainer = this.sourceContainer;

    setTimeout(() => {
      if (lastSource) {
        lastSource.classList.remove(this.getClassNameFor('source:placed'));
      }

      if (lastSourceContainer) {
        lastSourceContainer.classList.remove(this.getClassNameFor('container:placed'));
      }
    }, this.options.placedTimeout);

    this.source = null;
    this.mirror = null;
    this.currentOverContainer = null;
    this.currentOver = null;
    this.sourceContainer = null;
  }

  dragPressure(event) {
    const sensorEvent = getSensorEvent(event);
    const source = this.source || closest(sensorEvent.originalEvent.target, this.options.draggable);

    const dragPressureEvent = new DragPressureEvent({
      sensorEvent,
      source,
      pressure: sensorEvent.pressure,
    });

    this.triggerEvent(dragPressureEvent);
  }

  getAppendableContainer({source}) {
    const appendTo = this.options.appendTo;

    if (typeof appendTo === 'string') {
      return document.querySelector(appendTo);
    } else if (appendTo instanceof HTMLElement) {
      return appendTo;
    } else if (typeof appendTo === 'function') {
      return appendTo(source);
    } else {
      return document.body;
    }
  }

  getClassNameFor(name) {
    return this.options.classes[name] || defaults.classes[name];
  }

  closestContainer(target) {
    return closest(target, (element) => {
      for (const containerEl of this.containers) {
        if (element === containerEl) {
          return true;
        }
      }
      return false;
    });
  }
}

function getSensorEvent(event) {
  return event.detail;
}

function isDragEvent(event) {
  return /^drag/.test(event.type);
}
