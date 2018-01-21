// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

export as namespace Draggable;

export type DraggableContainer = HTMLElement | HTMLElement[] | NodeList

declare enum DraggableEventName {
  Initialized = 'draggable:initialized',
  Destroy = 'draggable:destroy'
}

declare enum DragEventName {
  Start = 'drag:start',
  Move = 'drag:move',
  Over = 'drag:over',
  OverContainer = 'drag:over:container',
  Out = 'drag:out',
  OutContainer = 'drag:out:container',
  Stop = 'drag:stop',
  Pressure = 'drag:pressure'
}

declare enum DropEventName {
  Over = 'droppable:over',
  Out = 'droppable:out'
}

declare enum SortEventName {
  Start = 'sortable:start',
  Sort = 'sortable:sort',
  Sorted = 'sortable:sorted',
  Stop = 'sortable:stop'
}

declare enum SwapEventName {
  Start = 'swappable:start',
  Swap = 'swappable:swap',
  Swapped = 'swappable:swapped',
  Stop = 'swappable:stop'
}

declare enum MirrorEventName {
  Created = 'mirror:created',
  Attached = 'mirror:attached',
  Move = 'mirror:move',
  Destroy = 'mirror:destroy'
}

export class BasePlugin {
  draggable: Draggable

  constructor(draggable: Draggable)

  attach(): void

  detach(): void
}

export type AbstractPlugin = typeof BasePlugin

export type Sensor = typeof Sensors.Sensor

// draggable options
interface DraggableOptions {
  // basic props
  draggable?: string,
  placedTimeout?: number,
  handle?: string,
  delay?: number,
  plugins?: AbstractPlugin[],
  sensors?: Sensor[],
  appendTo?: string | HTMLElement | Function,
  classes?: {
    [key: string]: string
  }
}

export class AbstractEvent<DataT> {
  static type: string
  static cancelable: boolean

  readonly type: string
  readonly cancelable: boolean

  private _canceled: boolean
  private data: DataT

  constructor(data: DataT);

  cancel(): void

  canceled(): boolean
}

export class Draggable {
  containers: DraggableContainer
  options: DraggableOptions
  callbacks: Function[]
  dragging: boolean
  plugins: AbstractPlugin[]
  sensors: Sensor[]
  classes: {
    [key: string]: string,
  }
  mirror?: HTMLElement

  constructor(containers: DraggableContainer, options: DraggableOptions)

  destroy(): void

  addPlugin(...plugins: AbstractPlugin[]): Draggable

  removePlugin(...plugins: AbstractPlugin[]): Draggable

  addSensor(...sensors: Sensor[]): Draggable

  removeSensor(...sensors: Sensor[]): Draggable

  addContainer(...containers: HTMLElement[]): Draggable

  removeContainer(...containers: HTMLElement[]): Draggable

  on(eventName: DragEventName, cb): Draggable

  off(eventName: DragEventName, cb): Draggable

  trigger(event: AbstractEvent<DragEvent>)

  getClassNameFor(name: string): string | null

  isDragging(): boolean

  getDraggableElementsForContainer(container: HTMLElement): HTMLElement[]
}

export interface DragEvent extends AbstractEvent<DragEvent> {
  readonly source: HTMLElement
  readonly originalSource: HTMLElement
  readonly mirror: HTMLElement
  readonly sourceContainer: HTMLElement
  readonly sensorEvent: Sensors.SensorEvent
  readonly originalEvent: Event
  readonly over?: HTMLElement
  readonly overContainer?: HTMLElement

  hasMirror(): boolean
}

export interface DragStartEvent extends DragEvent { }

export interface DragMoveEvent extends DragEvent { }

export interface DragOverEvent extends DragEvent {
  readonly overContainer: HTMLElement
  readonly over: HTMLElement
}

export interface DragOutEvent extends DragEvent {
  readonly overContainer: HTMLElement
  readonly over: HTMLElement
}

export interface DragOverContainerEvent extends DragEvent {
  readonly overContainer: HTMLElement
}

export interface DragOutContainerEvent extends DragEvent {
  readonly overContainer: HTMLElement
}

export interface DragPressureEvent extends DragEvent {
  readonly pressure: number
}

export interface DragStopEvent extends DragEvent { }

export interface DraggableEvent extends AbstractEvent<DraggableEvent> {
  readonly draggable: Draggable
}

export interface DraggableInitializedEvent extends DraggableEvent { }

export interface DraggableDestroyEvent extends DraggableEvent { }

export interface DroppableOptions extends DraggableOptions {
  droppable: string | HTMLElement[] | NodeList | (() => string | HTMLElement[] | NodeList)
}

export class Droppable extends Draggable {
  droppables: HTMLElement[]
  lastDroppable: HTMLElement
  initialDroppable: HTMLElement

  constructor(containers: DraggableContainer, options: DroppableOptions)
}

export interface DroppableEvent extends AbstractEvent<DroppableEvent> {
  readonly dragEvent: DragEvent
}

export interface DroppableOverEvent extends DroppableEvent {
  readonly droppable: HTMLElement
}

export interface DroppableOutEvent extends DroppableEvent {
  readonly droppable: HTMLElement
}

export class Sortable extends Draggable {
  startIndex: number
  startContainer: HTMLElement

  constructor(containers: DraggableContainer, options: DraggableOptions)

  index(element: HTMLElement)
}

export interface SortableEvent extends AbstractEvent<SortableEvent> {
  readonly dragEvent: DragEvent
}

export interface SortableStartEvent extends SortableEvent {
  readonly startIndex: number
  readonly startContainer: HTMLElement
}

export interface SortableSortEvent extends SortableEvent {
  readonly currentIndex: number
  readonly over: HTMLElement
  readonly overContainer: HTMLElement
}

export interface SortableSortedEvent extends SortableEvent {
  readonly oldIndex: number
  readonly newIndex: number
  readonly oldContainer: HTMLElement
  readonly newContainer: HTMLElement
}

export interface SortableStopEvent extends SortableEvent {
  readonly oldIndex: number
  readonly newIndex: number
  readonly oldContainer: HTMLElement
  readonly newContainer: HTMLElement
}

export class Swappable extends Draggable {
  lastOver: HTMLElement

  constructor(containers: DraggableContainer, options: DraggableOptions)
}

export interface SwappableEvent extends AbstractEvent<SwappableEvent> {
  readonly dragEvent: DragEvent
}

export interface SwappableStartEvent extends SwappableEvent { }

export interface SwappableSwapEvent extends SwappableEvent {
  readonly over: HTMLElement

  readonly overContainer: HTMLElement
}

export interface SwappableSwappedEvent extends SwappableEvent {
  readonly swappedElement: HTMLElement
}

export interface SwappableStopEvent extends SwappableEvent { }

// TODO for funcional plugins classes declaration
export namespace Plugins {
  export class Mirror extends BasePlugin { }

  export interface MirrorPluginOptions {
    xAxis: boolean,
    yAxis: boolean,
    constrainDimensions: boolean
  }

  export interface MirrorEvent extends AbstractEvent<MirrorEvent> {
    readonly source: HTMLElement
    readonly originalSource: HTMLElement
    readonly mirror: HTMLElement
    readonly sourceContainer: HTMLElement
    readonly sensorEvent: Sensors.SensorEvent
    readonly originalEvent: Event

    hasMirror(): boolean
  }

  export interface MirrorCreatedEvent extends MirrorEvent { }

  export interface MirrorAttachedEvent extends MirrorEvent { }

  export interface MirrorMoveEvent extends MirrorEvent { }

  export interface MirrorDestroyEvent extends MirrorEvent { }

  export class AutoScroll extends BasePlugin { }

  export interface AutoScrollPluginOptions {
    speed: number,
    sensitivity: number,
  }

  export class Collidable extends BasePlugin { }

  export type CollidableOptions = string | HTMLElement[] | NodeList | HTMLElement

  export class SwapAnimation extends BasePlugin { }

  export interface SwapAnimationOptions {
    duration: number,
    easingFunction: string
  }

  export class Snappable extends BasePlugin { }
}

// TODO for funcional sensor classes declaration
export namespace Sensors {
  interface SensorEvent extends AbstractEvent<SensorEvent> {
    readonly originalEvent: Event
    readonly clientX: number
    readonly clientY: number
    readonly target: HTMLElement
    readonly container: HTMLElement
    readonly pressure: number
  }

  export class Sensor<AttachT = undefined, DetachT = undefined> {
    containers: HTMLElement[]
    options: Object
    dragging: boolean
    currentContainer: HTMLElement

    constructor(containers: HTMLElement[], options: Object)

    attach(): AttachT

    detach(): DetachT

    trigger(element: HTMLElement, sensorEvent: SensorEvent): SensorEvent
  }

  export class MouseSensor extends Sensor { }

  export class TouchSensor extends Sensor { }

  export class DragSensor extends Sensor { }

  export class ForceTouchSensor extends Sensor { }
}
