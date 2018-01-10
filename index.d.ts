// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

export as namespace Draggable;

// type definitions
export type DraggableContainer = HTMLElement[] | NodeList | HTMLElement

type DraggableEventName = 'draggable:initialized' | 'draggable:destroy' | string
type DragEventName = 'drag:start' | 'drag:move' | 'drag:over' | 'drag:over:container' | 'drag:out' | 'drag:out:container' | 'drag:stop' | 'drag:pressure' | string
type SortEventName = 'sortable:start' | 'sortable:sorted' | 'sortable:stop' | string
type MirrorEventName = 'mirror:created' | 'mirror:attached' | 'mirror:move' | 'mirror:destroy' | string

// plugin
export class DraggablePlugin {
  draggable: Draggable

  constructor(draggable: Draggable)

  attach(): void

  detach(): void

  getOptions(): Object
}

// sensor
export class DraggableSensor {

  /**
   * Current containers
   * @property containers
   * @type {HTMLElement[]}
   */
  containers: HTMLElement[]

  /**
   * Current options
   * @property options
   * @type {Object}
   */
  options: Object

  /**
   * Current drag state
   * @property dragging
   * @type {Boolean}
   */
  dragging: boolean

  /**
   * Current container
   * @property currentContainer
   * @type {HTMLElement}
   */
  currentContainer: HTMLElement

  constructor(containers: HTMLElement[], options: Object)

  attach(): DraggableSensor

  detach(): DraggableSensor
}

// draggable options
interface DraggableOptions {
  // basic props
  draggable?: string,
  handle?: string,
  delay?: string,
  plugins?: any[],
  sensors?: any[],
  appendTo?: string | HTMLElement | Function,
  classes?: Object,

  // plugins props
  [pluginNamespace: string]: any
}

// abstract event
export class AbstractEvent {

  /**
   * Event type
   * @static
   * @abstract
   * @property type
   * @type {String}
   */
  readonly type: string

  /**
   * Event cancelable
   * @static
   * @abstract
   * @property cancelable
   * @type {Boolean}
   */
  readonly cancelable: boolean

  private _canceled: boolean
  private data: any

  constructor(data: any);

  /**
   * Cancels the event instance
   * @abstract
   */
  cancel(): void

  /**
   * Check if event has been canceled
   * @abstract
   * @return {Boolean}
   */
  canceled(): boolean
}

// sensor event
interface SensorEvent extends AbstractEvent {
  /**
   * Original browser event that triggered a sensor
   * @property originalEvent
   * @type {Event}
   * @readonly
   */
  readonly originalEvent: Event

  /**
   * Normalized clientX for both touch and mouse events
   * @property clientX
   * @type {Number}
   * @readonly
   */
  readonly clientX: number

  /**
   * Normalized clientY for both touch and mouse events
   * @property clientY
   * @type {Number}
   * @readonly
   */
  readonly clientY: number

  /**
   * Normalized target for both touch and mouse events
   * Returns the element that is behind cursor or touch pointer
   * @property target
   * @type {HTMLElement}
   * @readonly
   */
  readonly target: HTMLElement

  /**
   * Container that initiated the sensor
   * @property container
   * @type {HTMLElement}
   * @readonly
   */
  readonly container: HTMLElement

  /**
   * Trackpad pressure
   * @property pressure
   * @type {Number}
   * @readonly
   */
  readonly pressure: number
}

// TODO add sensor related classes declaration

/**
 * This is the core draggable library that does the heavy lifting
 * @class Draggable
 * @module Draggable
 */
export class Draggable {
  /**
     * Draggable containers
     * @property containers
     * @type {HTMLElement[]}
     */
  containers: DraggableContainer
  options: DraggableOptions
  callbacks: Object

  /**
     * Current drag state
     * @property dragging
     * @type {Boolean}
     */
  dragging: boolean

  /**
     * Active plugins
     * @property plugins
     * @type {Plugin[]}
     */
  plugins: DraggablePlugin[]

  /**
      * Active sensors
      * @property sensors
      * @type {Sensor[]}
      */
  sensors: DraggableSensor[]

  mirror?: HTMLElement

  /**
   * Draggable constructor.
   * @constructs Draggable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Draggable containers
   * @param {Object} options - Options for draggable
   */
  constructor(containers: DraggableContainer, options: DraggableOptions)

  /**
   * Destroys Draggable instance. This removes all internal event listeners and
   * deactivates sensors and plugins
   */
  destroy(): void

  /**
   * Adds plugin to this draggable instance. This will end up calling the attach method of the plugin
   * @param {...typeof Plugin} plugins - Plugins that you want attached to draggable
   * @return {Draggable}
   * @example draggable.addPlugin(CustomA11yPlugin, CustomMirrorPlugin)
   */
  addPlugin(...plugins: DraggablePlugin[]): Draggable

  /**
   * Removes plugins that are already attached to this draggable instance. This will end up calling
   * the detach method of the plugin
   * @param {...typeof Plugin} plugins - Plugins that you want detached from draggable
   * @return {Draggable}
   * @example draggable.removePlugin(MirrorPlugin, CustomMirrorPlugin)
   */
  removePlugin(...plugins: DraggablePlugin[]): Draggable

  /**
   * Adds sensors to this draggable instance. This will end up calling the attach method of the sensor
   * @param {...typeof Sensor} sensors - Sensors that you want attached to draggable
   * @return {Draggable}
   * @example draggable.addSensor(ForceTouchSensor, CustomSensor)
   */
  addSensor(...sensors: DraggableSensor[]): Draggable

  /**
   * Removes sensors that are already attached to this draggable instance. This will end up calling
   * the detach method of the sensor
   * @param {...typeof Sensor} sensors - Sensors that you want attached to draggable
   * @return {Draggable}
   * @example draggable.removeSensor(TouchSensor, DragSensor)
   */
  removeSensor(...sensors: DraggableSensor[]): Draggable

  /**
   * Adds container to this draggable instance
   * @param {...HTMLElement} containers - Containers you want to add to draggable
   * @return {Draggable}
   * @example draggable.addPlugin(CustomA11yPlugin, CustomMirrorPlugin)
   */
  addContainer(...containers: DraggableContainer[]): Draggable

  /**
   * Removes container from this draggable instance
   * @param {...HTMLElement} containers - Containers you want to remove from draggable
   * @return {Draggable}
   * @example draggable.removePlugin(MirrorPlugin, CustomMirrorPlugin)
   */
  removeContainer(...containers: DraggableContainer[]): Draggable

  /**
   * Adds listener for draggable events
   * @param {String} type - Event name
   * @param {Function} callback - Event callback
   * @return {Draggable}
   * @example draggable.on('drag:start', (dragEvent) => dragEvent.cancel());
   */
  on(eventName: DragEventName, cb): Draggable

  /**
   * Removes listener from draggable
   * @param {String} type - Event name
   * @param {Function} callback - Event callback
   * @return {Draggable}
   * @example draggable.off('drag:start', handlerFunction);
   */
  off(eventName: DragEventName, cb): Draggable

  /**
   * Triggers draggable event
   * @param {AbstractEvent} event - Event instance
   * @return {Draggable}
   * @example draggable.trigger(event);
   */
  trigger(event: AbstractEvent)

  /**
   * Returns class name for class identifier
   * @param {String} name - Name of class identifier
   * @return {String|null}
   */
  getClassNameFor(name: string): string | null

  /**
   * Returns true if this draggable instance is currently dragging
   * @return {Boolean}
   */
  isDragging(): boolean
}

/**
  * Base drag event
  * @class DragEvent
  * @module DragEvent
  * @extends AbstractEvent
  */
export interface DragEvent extends AbstractEvent {
  /**
   * Draggables source element
   * @property source
   * @type {HTMLElement}
   * @readonly
   */
  readonly source: HTMLElement

  /**
   * Draggables original source element
   * @property originalSource
   * @type {HTMLElement}
   * @readonly
   */
  readonly originalSource: HTMLElement

  /**
   * Draggables mirror element
   * @property mirror
   * @type {HTMLElement}
   * @readonly
   */
  readonly mirror: HTMLElement

  /**
   * Draggables source container element
   * @property sourceContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly sourceContainer: HTMLElement

  /**
   * Sensor event
   * @property sensorEvent
   * @type {SensorEvent}
   * @readonly
   */
  readonly sensorEvent: SensorEvent

  /**
   * Original event that triggered sensor event
   * @property originalEvent
   * @type {Event}
   * @readonly
   */
  readonly originalEvent: Event

  readonly over?: HTMLElement

  readonly overContainer?: HTMLElement

  /**
   * Checks if mirror has been created
   * @return {Boolean}
   */
  hasMirror(): boolean
}

/**
 * Drag start event
 * @class DragStartEvent
 * @module DragStartEvent
 * @extends DragEvent
 */
export interface DragStartEvent extends DragEvent { }

/**
 * Drag move event
 * @class DragMoveEvent
 * @module DragMoveEvent
 * @extends DragEvent
 */
export interface DragMoveEvent extends DragEvent { }

/**
 * Drag over event
 * @class DragOverEvent
 * @module DragOverEvent
 * @extends DragEvent
 */
export interface DragOverEvent extends DragEvent {
  /**
   * Draggable container you are over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly overContainer: HTMLElement

  /**
   * Draggable element you are over
   * @property over
   * @type {HTMLElement}
   * @readonly
   */
  readonly over: HTMLElement
}

/**
 * Drag out event
 * @class DragOutEvent
 * @module DragOutEvent
 * @extends DragEvent
 */
export interface DragOutEvent extends DragEvent {
  /**
   * Draggable container you are over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly overContainer: HTMLElement

  /**
   * Draggable element you left
   * @property over
   * @type {HTMLElement}
   * @readonly
   */
  readonly over: HTMLElement
}

/**
 * Drag over container event
 * @class DragOverContainerEvent
 * @module DragOverContainerEvent
 * @extends DragEvent
 */
export interface DragOverContainerEvent extends DragEvent {
  /**
   * Draggable container you are over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly overContainer: HTMLElement
}

/**
 * Drag out container event
 * @class DragOutContainerEvent
 * @module DragOutContainerEvent
 * @extends DragEvent
 */
export interface DragOutContainerEvent extends DragEvent {
  /**
   * Draggable container you left
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly overContainer: HTMLElement
}

/**
 * Drag pressure event
 * @class DragPressureEvent
 * @module DragPressureEvent
 * @extends DragEvent
 */
export interface DragPressureEvent extends DragEvent {
  /**
   * Pressure applied on draggable element
   * @property pressure
   * @type {Number}
   * @readonly
   */
  readonly pressure: number
}

/**
 * Drag stop event
 * @class DragStopEvent
 * @module DragStopEvent
 * @extends DragEvent
 */
export class DragStopEvent extends DragEvent { }

/**
* Base draggable event
* @class DraggableEvent
* @module DraggableEvent
* @extends AbstractEvent
*/
export interface DraggableEvent extends AbstractEvent {
  /**
   * Draggable instance
   * @property draggable
   * @type {Draggable}
   * @readonly
   */
  readonly draggable: Draggable
}

/**
 * Draggable initialized event
 * @class DraggableInitializedEvent
 * @module DraggableInitializedEvent
 * @extends DraggableEvent
 */
export interface DraggableInitializedEvent extends DraggableEvent { }

/**
 * Draggable destory event
 * @class DraggableInitializedEvent
 * @module DraggableDestroyEvent
 * @extends DraggableDestroyEvent
 */
export interface DraggableDestroyEvent extends DraggableEvent { }

/**
 * Droppable is built on top of Draggable and allows dropping draggable elements
 * into droppable element
 * @class Droppable
 * @module Droppable
 * @extends Draggable
 */

export interface DroppableOptions extends DraggableOptions {
  droppable: string | HTMLElement[] | NodeList | (() => string | HTMLElement[] | NodeList)
}
export class Droppable extends Draggable {
  /**
       * All droppable elements on drag start
       * @property droppables
       * @type {HTMLElement[]}
       */
  droppables: HTMLElement[]

  /**
   * Last droppable element that the source was dropped into
   * @property lastDroppable
   * @type {HTMLElement}
   */
  lastDroppable: HTMLElement

  /**
   * Initial droppable element that the source was drag from
   * @property initialDroppable
   * @type {HTMLElement}
   */
  initialDroppable: HTMLElement

  /**
   * Droppable constructor.
   * @constructs Droppable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Droppable containers
   * @param {Object} options - Options for Droppable
   */
  constructor(containers: DraggableContainer, options: DroppableOptions)
}

/**
 * Base droppable event
 * @class DroppableEvent
 * @module DroppableEvent
 * @extends AbstractEvent
 */
export interface DroppableEvent extends AbstractEvent {
  /**
   * Original drag event that triggered this droppable event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  readonly dragEvent: DragEvent
}

/**
 * Droppable over event
 * @class DroppableOverEvent
 * @module DroppableOverEvent
 * @extends DroppableEvent
 */
export interface DroppableOverEvent extends DroppableEvent {
  /**
   * The droppable element you are over
   * @property droppable
   * @type {HTMLElement}
   * @readonly
   */
  readonly droppable: HTMLElement
}

/**
 * Droppable out event
 * @class DroppableOutEvent
 * @module DroppableOutEvent
 * @extends DroppableEvent
 */
export interface DroppableOutEvent extends DroppableEvent {
  /**
   * The droppable element you _were_ over
   * @property droppable
   * @type {HTMLElement}
   * @readonly
   */
  readonly droppable: HTMLElement
}


/**
 * Sortable is built on top of Draggable and allows sorting of draggable elements. Sortable will keep
 * track of the original index and emits the new index as you drag over draggable elements.
 * @class Sortable
 * @module Sortable
 * @extends Draggable
 */
export class Sortable extends Draggable {
  /**
     * start index of source on drag start
     * @property startIndex
     * @type {Number}
     */
  startIndex: number

  /**
     * start container on drag start
     * @property startContainer
     * @type {HTMLElement}
     * @default null
     */
  startContainer: HTMLElement

  /**
   * Sortable constructor.
   * @constructs Sortable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Sortable containers
   * @param {Object} options - Options for Sortable
   */
  constructor(containers: DraggableContainer, options: DraggableOptions)

  /**
   * Returns true index of element within its container during drag operation, i.e. excluding mirror and original source
   * @param {HTMLElement} element - An element
   * @return {Number}
   */
  index(element: HTMLElement)
}

/**
  * Base sortable event
  * @class SortableEvent
  * @module SortableEvent
  * @extends AbstractEvent
  */
export interface SortableEvent extends AbstractEvent {
  /**
   * Original drag event that triggered this sortable event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  readonly dragEvent: DragEvent
}

/**
 * Sortable start event
 * @class SortableStartEvent
 * @module SortableStartEvent
 * @extends SortableEvent
 */
export interface SortableStartEvent extends SortableEvent {
  /**
   * Start index of source on sortable start
   * @property startIndex
   * @type {Number}
   * @readonly
   */
  readonly startIndex: number

  /**
   * Start container on sortable start
   * @property startContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly startContainer: HTMLElement
}
/**
 * Sortable sort event
 * @class SortableSortEvent
 * @module SortableSortEvent
 * @extends SortableEvent
 */
export interface SortableSortEvent extends SortableEvent {
  /**
   * Index of current draggable element
   * @property currentIndex
   * @type {Number}
   * @readonly
   */
  readonly currentIndex: number

  /**
   * Draggable element you are hovering over
   * @property over
   * @type {HTMLElement}
   * @readonly
   */
  readonly over: HTMLElement

  /**
   * Draggable container element you are hovering over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly overContainer: HTMLElement
}

/**
 * Sortable sorted event
 * @class SortableSortedEvent
 * @module SortableSortedEvent
 * @extends SortableEvent
 */
export interface SortableSortedEvent extends SortableEvent {
  /**
   * Index of last sorted event
   * @property oldIndex
   * @type {Number}
   * @readonly
   */
  readonly oldIndex: number

  /**
   * New index of this sorted event
   * @property newIndex
   * @type {Number}
   * @readonly
   */
  readonly newIndex: number

  /**
   * Old container of draggable element
   * @property oldContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly oldContainer: HTMLElement

  /**
   * New container of draggable element
   * @property newContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly newContainer: HTMLElement
}

/**
 * Sortable stop event
 * @class SortableStopEvent
 * @module SortableStopEvent
 * @extends SortableEvent
 */
export interface SortableStopEvent extends SortableEvent {
  /**
   * Original index on sortable start
   * @property oldIndex
   * @type {Number}
   * @readonly
   */
  readonly oldIndex: number

  /**
   * New index of draggable element
   * @property newIndex
   * @type {Number}
   * @readonly
   */
  readonly newIndex: number

  /**
   * Original container of draggable element
   * @property oldContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly oldContainer: HTMLElement

  /**
   * New container of draggable element
   * @property newContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly newContainer: HTMLElement
}

/**
 * Swappable is built on top of Draggable and allows swapping of draggable elements.
 * Order is irrelevant to Swappable.
 * @class Swappable
 * @module Swappable
 * @extends Draggable
 */
export class Swappable extends Draggable {
  /**
     * Last draggable element that was dragged over
     * @property lastOver
     * @type {HTMLElement}
     */
  lastOver: HTMLElement

  /**
   * Swappable constructor.
   * @constructs Swappable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Swappable containers
   * @param {Object} options - Options for Swappable
   */
  constructor(containers: DraggableContainer, options: DraggableOptions)
}

/**
  * Base swappable event
  * @class SwappableEvent
  * @module SwappableEvent
  * @extends AbstractEvent
  */
export interface SwappableEvent extends AbstractEvent {
  /**
   * Original drag event that triggered this swappable event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  readonly dragEvent: DragEvent
}

/**
 * Swappable start event
 * @class SwappableStartEvent
 * @module SwappableStartEvent
 * @extends SwappableEvent
 */
export interface SwappableStartEvent extends SwappableEvent { }

/**
 * Swappable swap event
 * @class SwappableSwapEvent
 * @module SwappableSwapEvent
 * @extends SwappableEvent
 */
export interface SwappableSwapEvent extends SwappableEvent {
  /**
   * Draggable element you are over
   * @property over
   * @type {HTMLElement}
   * @readonly
   */
  readonly over: HTMLElement

  /**
   * Draggable container you are over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  readonly overContainer: HTMLElement
}

/**
 * Swappable swapped event
 * @class SwappableSwappedEvent
 * @module SwappableSwappedEvent
 * @extends SwappableEvent
 */
export interface SwappableSwappedEvent extends SwappableEvent {
  /**
   * The draggable element that you swapped with
   * @property swappedElement
   * @type {HTMLElement}
   * @readonly
   */
  readonly swappedElement: HTMLElement
}

/**
 * Swappable stop event
 * @class SwappableStopEvent
 * @module SwappableStopEvent
 * @extends SwappableEvent
 */
export interface SwappableStopEvent extends SwappableEvent { }

// TODO for plugins classes declaration
export namespace Plugins {
  /*
   * Mirror
   */
  export class Mirror { }

  export interface MirrorPluginOptions {
    xAxis: boolean,
    yAxis: boolean,
    constrainDimensions: boolean
  }

  export interface MirrorEvent extends AbstractEvent {

    /**
     * Draggables source element
     * @property source
     * @type {HTMLElement}
     * @readonly
     */
    readonly source: HTMLElement

    /**
     * Draggables original source element
     * @property originalSource
     * @type {HTMLElement}
     * @readonly
     */
    readonly originalSource: HTMLElement

    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */
    readonly mirror: HTMLElement

    /**
     * Draggables source container element
     * @property sourceContainer
     * @type {HTMLElement}
     * @readonly
     */
    readonly sourceContainer: HTMLElement

    /**
     * Sensor event
     * @property sensorEvent
     * @type {SensorEvent}
     * @readonly
     */
    readonly sensorEvent: SensorEvent

    /**
     * Original event that triggered sensor event
     * @property originalEvent
     * @type {Event}
     * @readonly
     */
    readonly originalEvent: Event

    /**
     * Checks if mirror has been created
     * @return {Boolean}
     */
    hasMirror(): boolean
  }

  /**
   * Mirror created event
   * @class MirrorCreatedEvent
   * @module MirrorCreatedEvent
   * @extends MirrorEvent
   */
  export interface MirrorCreatedEvent extends MirrorEvent { }

  /**
   * Mirror attached event
   * @class MirrorAttachedEvent
   * @module MirrorAttachedEvent
   * @extends MirrorEvent
   */
  export interface MirrorAttachedEvent extends MirrorEvent { }

  /**
   * Mirror move event
   * @class MirrorMoveEvent
   * @module MirrorMoveEvent
   * @extends MirrorEvent
   */
  export interface MirrorMoveEvent extends MirrorEvent { }

  /**
   * Mirror destroy event
   * @class MirrorDestroyEvent
   * @module MirrorDestroyEvent
   * @extends MirrorEvent
   */
  export interface MirrorDestroyEvent extends MirrorEvent { }

  /*
   * Collidable
   */
  export class Collidable { }

  export type CollidableOptions = string | HTMLElement[] | NodeList | HTMLElement

  /*
   * SwapAnimation
   */
  export class SwapAnimation { }

  export interface SwapAnimationOptions {
    duration: number,
    easingFunction: string
  }

  /*
   * Snappable
   */
  export class Snappable { }
}

// TODO for funcional sensor classes declaration
/**
 * Base sensor class. Extend from this class to create a new or custom sensor
 * @class Sensor
 * @module Sensor
 */
export namespace Sensors {
  export class Sensor {
    /**
     * Current containers
     * @property containers
     * @type {HTMLElement[]}
     */
    containers: HTMLElement[]

    /**
     * Current options
     * @property options
     * @type {Object}
     */
    options: Object

    /**
     * Current drag state
     * @property dragging
     * @type {Boolean}
     */
    dragging: boolean

    /**
     * Current container
     * @property currentContainer
     * @type {HTMLElement}
     */
    currentContainer: HTMLElement

    /**
   * Sensor constructor.
   * @constructs Sensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
    constructor(containers: DraggableContainer, options: Object)

    attach(): Sensor

    detach(): Sensor

    /**
   * Triggers event on target element
   * @param {HTMLElement} element - Element to trigger event on
   * @param {SensorEvent} sensorEvent - Sensor event to trigger
   */
    trigger(element: HTMLElement, sensorEvent: SensorEvent): SensorEvent
  }

  export class MouseSensor extends Sensor { }

  export class TouchSensor extends Sensor { }

  export class DragSensor extends Sensor { }

  export class ForceTouchSensor extends Sensor { }
}
