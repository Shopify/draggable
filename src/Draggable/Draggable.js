import {closest} from 'shared/utils';

import {Announcement, Focusable, Mirror, Scrollable, Styleable} from './Plugins';

import Emitter from './Emitter';
import {MouseSensor, TouchSensor} from './Sensors';
import {DraggableInitializedEvent, DraggableDestroyEvent} from './DraggableEvent';

import {
  DragStartEvent,
  DragMoveEvent,
  DragOutContainerEvent,
  DragOutEvent,
  DragOverContainerEvent,
  DragOverEvent,
  DragStopEvent,
  DragPressureEvent,
} from './DragEvent';

const onDragStart = Symbol('onDragStart');
const onDragMove = Symbol('onDragMove');
const onDragStop = Symbol('onDragStop');
const onDragPressure = Symbol('onDragPressure');

/**
 * @const {Object} defaultAnnouncements
 * @const {Function} defaultAnnouncements['drag:start']
 * @const {Function} defaultAnnouncements['drag:stop']
 */
const defaultAnnouncements = {
  'drag:start': (event) => `Picked up ${event.source.textContent.trim() || event.source.id || 'draggable element'}`,
  'drag:stop': (event) => `Released ${event.source.textContent.trim() || event.source.id || 'draggable element'}`,
};

const defaultClasses = {
  'container:dragging': 'draggable-container--is-dragging',
  'source:dragging': 'draggable-source--is-dragging',
  'source:placed': 'draggable-source--placed',
  'container:placed': 'draggable-container--placed',
  'body:dragging': 'draggable--is-dragging',
  'draggable:over': 'draggable--over',
  'container:over': 'draggable-container--over',
  'source:original': 'draggable--original',
  mirror: 'draggable-mirror',
};

export const defaultOptions = {
  draggable: '.draggable-source',
  handle: null,
  delay: 100,
  plugins: [],
  sensors: [],
};

/**
 * This is the core draggable library that does the heavy lifting
 * @class Draggable
 * @module Draggable
 */
export default class Draggable {
  /**
   * Default plugins draggable uses
   * @static
   * @property {Object} Plugins
   * @property {Announcement} Plugins.Announcement
   * @property {Focusable} Plugins.Focusable
   * @property {Mirror} Plugins.Mirror
   * @property {Scrollable} Plugins.Scrollable
   * @property {Styleable} Plugins.Styleable
   * @type {Object}
   */
  static Plugins = {Announcement, Focusable, Mirror, Scrollable, Styleable};

  /**
   * Draggable constructor.
   * @constructs Draggable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Draggable containers
   * @param {Object} options - Options for draggable
   */
  constructor(containers = [document.body], options = {}) {
    /**
     * Draggable containers
     * @property containers
     * @type {HTMLElement[]}
     */
    if (containers instanceof NodeList || containers instanceof Array) {
      this.containers = [...containers];
    } else if (containers instanceof HTMLElement) {
      this.containers = [containers];
    } else {
      throw new Error('Draggable containers are expected to be of type `NodeList`, `HTMLElement[]` or `HTMLElement`');
    }

    this.options = {
      ...defaultOptions,
      ...options,
      classes: {
        ...defaultClasses,
        ...(options.classes || {}),
      },
      announcements: {
        ...defaultAnnouncements,
        ...(options.announcements || {}),
      },
    };

    /**
     * Draggables event emitter
     * @property emitter
     * @type {Emitter}
     */
    this.emitter = new Emitter();

    /**
     * Current drag state
     * @property dragging
     * @type {Boolean}
     */
    this.dragging = false;

    /**
     * Active plugins
     * @property plugins
     * @type {Plugin[]}
     */
    this.plugins = [];

    /**
     * Active sensors
     * @property sensors
     * @type {Sensor[]}
     */
    this.sensors = [];

    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragMove] = this[onDragMove].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);
    this[onDragPressure] = this[onDragPressure].bind(this);

    document.addEventListener('drag:start', this[onDragStart], true);
    document.addEventListener('drag:move', this[onDragMove], true);
    document.addEventListener('drag:stop', this[onDragStop], true);
    document.addEventListener('drag:pressure', this[onDragPressure], true);

    const defaultPlugins = Object.values(Draggable.Plugins).map((Plugin) => Plugin);
    const defaultSensors = [MouseSensor, TouchSensor];

    this.addPlugin(...[...defaultPlugins, ...this.options.plugins]);
    this.addSensor(...[...defaultSensors, ...this.options.sensors]);

    const draggableInitializedEvent = new DraggableInitializedEvent({
      draggable: this,
    });

    this.on('mirror:created', ({mirror}) => (this.mirror = mirror));
    this.on('mirror:destroy', () => (this.mirror = null));

    this.trigger(draggableInitializedEvent);
  }

  /**
   * Destroys Draggable instance. This removes all internal event listeners and
   * deactivates sensors and plugins
   */
  destroy() {
    document.removeEventListener('drag:start', this[onDragStart], true);
    document.removeEventListener('drag:move', this[onDragMove], true);
    document.removeEventListener('drag:stop', this[onDragStop], true);
    document.removeEventListener('drag:pressure', this[onDragPressure], true);

    const draggableDestroyEvent = new DraggableDestroyEvent({
      draggable: this,
    });

    this.trigger(draggableDestroyEvent);

    this.removePlugin(...this.plugins.map((plugin) => plugin.constructor));
    this.removeSensor(...this.sensors.map((sensor) => sensor.constructor));
  }

  /**
   * Adds plugin to this draggable instance. This will end up calling the attach method of the plugin
   * @param {...typeof Plugin} plugins - Plugins that you want attached to draggable
   * @return {Draggable}
   * @example draggable.addPlugin(CustomA11yPlugin, CustomMirrorPlugin);
   */
  addPlugin(...plugins) {
    const activePlugins = plugins.map((Plugin) => new Plugin(this));

    activePlugins.forEach((plugin) => plugin.attach());
    this.plugins = [...this.plugins, ...activePlugins];

    return this;
  }

  /**
   * Removes plugins that are already attached to this draggable instance. This will end up calling
   * the detach method of the plugin
   * @param {...typeof Plugin} plugins - Plugins that you want detached from draggable
   * @return {Draggable}
   * @example draggable.removePlugin(MirrorPlugin, CustomMirrorPlugin);
   */
  removePlugin(...plugins) {
    const removedPlugins = this.plugins.filter((plugin) => plugins.includes(plugin.constructor));

    removedPlugins.forEach((plugin) => plugin.detach());
    this.plugins = this.plugins.filter((plugin) => !plugins.includes(plugin.constructor));

    return this;
  }

  /**
   * Returns plugin by plugin constructor
   * @param {typeof Plugin} pluginConstructor - Plugin constructor
   * @return {Plugin}
   * @example draggable.getPlugin(Styleable);
   */
  getPlugin(pluginConstructor) {
    return this.plugins.find((plugin) => plugin.constructor === pluginConstructor);
  }

  /**
   * Adds sensors to this draggable instance. This will end up calling the attach method of the sensor
   * @param {...typeof Sensor} sensors - Sensors that you want attached to draggable
   * @return {Draggable}
   * @example draggable.addSensor(ForceTouchSensor, CustomSensor);
   */
  addSensor(...sensors) {
    const activeSensors = sensors.map((Sensor) => new Sensor(this.containers, this.options));

    activeSensors.forEach((sensor) => sensor.attach());
    this.sensors = [...this.sensors, ...activeSensors];

    return this;
  }

  /**
   * Removes sensors that are already attached to this draggable instance. This will end up calling
   * the detach method of the sensor
   * @param {...typeof Sensor} sensors - Sensors that you want attached to draggable
   * @return {Draggable}
   * @example draggable.removeSensor(TouchSensor, DragSensor);
   */
  removeSensor(...sensors) {
    const removedSensors = this.sensors.filter((sensor) => sensors.includes(sensor.constructor));

    removedSensors.forEach((sensor) => sensor.detach());
    this.sensors = this.sensors.filter((sensor) => !sensors.includes(sensor.constructor));

    return this;
  }

  /**
   * Adds container to this draggable instance
   * @param {...HTMLElement} containers - Containers you want to add to draggable
   * @return {Draggable}
   * @example draggable.addContainer(document.body);
   */
  addContainer(...containers) {
    this.containers = [...this.containers, ...containers];
    this.sensors.forEach((sensor) => sensor.addContainer(...containers));
    return this;
  }

  /**
   * Removes container from this draggable instance
   * @param {...HTMLElement} containers - Containers you want to remove from draggable
   * @return {Draggable}
   * @example draggable.removeContainer(document.body);
   */
  removeContainer(...containers) {
    this.containers = this.containers.filter((container) => !containers.includes(container));
    this.sensors.forEach((sensor) => sensor.removeContainer(...containers));
    return this;
  }

  /**
   * Adds listener for draggable events
   * @param {String} type - Event name
   * @param {...Function} callbacks - Event callbacks
   * @return {Draggable}
   * @example draggable.on('drag:start', (dragEvent) => dragEvent.cancel());
   */
  on(type, ...callbacks) {
    this.emitter.on(type, ...callbacks);
    return this;
  }

  /**
   * Removes listener from draggable
   * @param {String} type - Event name
   * @param {Function} callback - Event callback
   * @return {Draggable}
   * @example draggable.off('drag:start', handlerFunction);
   */
  off(type, callback) {
    this.emitter.off(type, callback);
    return this;
  }

  /**
   * Triggers draggable event
   * @param {AbstractEvent} event - Event instance
   * @return {Draggable}
   * @example draggable.trigger(event);
   */
  trigger(event) {
    this.emitter.trigger(event);
    return this;
  }

  /**
   * Returns class name for class identifier
   * @param {String} name - Name of class identifier
   * @return {String|null}
   */
  getClassNameFor(name) {
    return this.options.classes[name];
  }

  /**
   * Returns true if this draggable instance is currently dragging
   * @return {Boolean}
   */
  isDragging() {
    return Boolean(this.dragging);
  }

  /**
   * Returns all draggable elements
   * @return {HTMLElement[]}
   */
  getDraggableElements() {
    return this.containers.reduce((current, container) => {
      return [...current, ...this.getDraggableElementsForContainer(container)];
    }, []);
  }

  /**
   * Returns draggable elements for a given container, excluding the mirror and
   * original source element if present
   * @param {HTMLElement} container
   * @return {HTMLElement[]}
   */
  getDraggableElementsForContainer(container) {
    const allDraggableElements = container.querySelectorAll(this.options.draggable);

    return [...allDraggableElements].filter((childElement) => {
      return childElement !== this.originalSource && childElement !== this.mirror;
    });
  }

  /**
   * Drag start handler
   * @private
   * @param {Event} event - DOM Drag event
   */
  [onDragStart](event) {
    const sensorEvent = getSensorEvent(event);
    const {target, container} = sensorEvent;

    if (!this.containers.includes(container)) {
      return;
    }

    if (this.options.handle && target && !closest(target, this.options.handle)) {
      sensorEvent.cancel();
      return;
    }

    // Find draggable source element
    this.originalSource = closest(target, this.options.draggable);
    this.sourceContainer = container;

    if (!this.originalSource) {
      sensorEvent.cancel();
      return;
    }

    this.dragging = true;

    this.source = this.originalSource.cloneNode(true);
    this.originalSource.parentNode.insertBefore(this.source, this.originalSource);
    this.originalSource.style.display = 'none';
    applyUserSelect(document.body, 'none');

    const dragEvent = new DragStartEvent({
      source: this.source,
      originalSource: this.originalSource,
      sourceContainer: container,
      sensorEvent,
    });

    this.trigger(dragEvent);

    this.dragging = !dragEvent.canceled();

    if (dragEvent.canceled()) {
      this.source.parentNode.removeChild(this.source);
      this.originalSource.style.display = null;
      applyUserSelect(document.body, null);
    } else {
      requestAnimationFrame(() => {
        const oldSensorEvent = getSensorEvent(event);
        const newSensorEvent = oldSensorEvent.clone({target: this.source});

        this[onDragMove]({
          ...event,
          detail: newSensorEvent,
        });
      });
    }
  }

  /**
   * Drag move handler
   * @private
   * @param {Event} event - DOM Drag event
   */
  [onDragMove](event) {
    if (!this.dragging) {
      return;
    }

    const sensorEvent = getSensorEvent(event);
    const {container} = sensorEvent;
    let target = sensorEvent.target;

    const dragMoveEvent = new DragMoveEvent({
      source: this.source,
      originalSource: this.originalSource,
      sourceContainer: container,
      sensorEvent,
    });

    this.trigger(dragMoveEvent);

    if (dragMoveEvent.canceled()) {
      sensorEvent.cancel();
    }

    target = closest(target, this.options.draggable);
    const withinCorrectContainer = closest(sensorEvent.target, this.containers);
    const overContainer = sensorEvent.overContainer || withinCorrectContainer;
    const isLeavingContainer = this.currentOverContainer && overContainer !== this.currentOverContainer;
    const isLeavingDraggable = this.currentOver && target !== this.currentOver;
    const isOverContainer = overContainer && this.currentOverContainer !== overContainer;
    const isOverDraggable = withinCorrectContainer && target && this.currentOver !== target;

    if (isLeavingDraggable) {
      const dragOutEvent = new DragOutEvent({
        source: this.source,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent,
        over: this.currentOver,
      });

      this.currentOver = null;

      this.trigger(dragOutEvent);
    }

    if (isLeavingContainer) {
      const dragOutContainerEvent = new DragOutContainerEvent({
        source: this.source,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent,
        overContainer: this.currentOverContainer,
      });

      this.currentOverContainer = null;

      this.trigger(dragOutContainerEvent);
    }

    if (isOverContainer) {
      const dragOverContainerEvent = new DragOverContainerEvent({
        source: this.source,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent,
        overContainer,
      });

      this.currentOverContainer = overContainer;

      this.trigger(dragOverContainerEvent);
    }

    if (isOverDraggable) {
      const dragOverEvent = new DragOverEvent({
        source: this.source,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent,
        overContainer,
        over: target,
      });

      this.currentOver = target;

      this.trigger(dragOverEvent);
    }
  }

  /**
   * Drag stop handler
   * @private
   * @param {Event} event - DOM Drag event
   */
  [onDragStop](event) {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;

    const dragStopEvent = new DragStopEvent({
      source: this.source,
      originalSource: this.originalSource,
      sensorEvent: event.sensorEvent,
      sourceContainer: this.sourceContainer,
    });

    this.trigger(dragStopEvent);

    this.source.parentNode.insertBefore(this.originalSource, this.source);
    this.source.parentNode.removeChild(this.source);
    this.originalSource.style.display = null;

    applyUserSelect(document.body, null);

    this.source = null;
    this.originalSource = null;
    this.currentOverContainer = null;
    this.currentOver = null;
    this.sourceContainer = null;
  }

  /**
   * Drag pressure handler
   * @private
   * @param {Event} event - DOM Drag event
   */
  [onDragPressure](event) {
    if (!this.dragging) {
      return;
    }

    const sensorEvent = getSensorEvent(event);
    const source = this.source || closest(sensorEvent.originalEvent.target, this.options.draggable);

    const dragPressureEvent = new DragPressureEvent({
      sensorEvent,
      source,
      pressure: sensorEvent.pressure,
    });

    this.trigger(dragPressureEvent);
  }
}

function getSensorEvent(event) {
  return event.detail;
}

function applyUserSelect(element, value) {
  element.style.webkitUserSelect = value;
  element.style.mozUserSelect = value;
  element.style.msUserSelect = value;
  element.style.oUserSelect = value;
  element.style.userSelect = value;
}
