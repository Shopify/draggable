// Type definitions for @shopify/draggable [~OPTIONAL VERSION NUMBER~]
// Project: Draggable
// Definitions by: John Toebes https://john.toebes.com
export as namespace Draggable;

export type DraggableContainer = HTMLElement | HTMLElement[] | NodeList;
type DraggableEventName = 'draggable:initialized' | 'draggable:destroy';
type DragEventName =
  | DraggableEventName
  | 'drag:start'
  | 'drag:move'
  | 'drag:over'
  | 'drag:over:container'
  | 'drag:out'
  | 'drag:out:container'
  | 'drag:stop'
  | 'drag:pressure';
type DropEventName = DragEventName | 'droppable:over' | 'droppable:out';
type SortEventName = DragEventName | 'sortable:start' | 'sortable:sort' | 'sortable:sorted' | 'sortable:stop';
type SwapEventName = DragEventName | 'swappable:start' | 'swappable:swap' | 'swappable:swapped' | 'swappable:stop';
type MirrorEventName = 'mirror:created' | 'mirror:attached' | 'mirror:move' | 'mirror:destroy';

type DraggableClassNames =
  | 'body:dragging' // Class added on the document body while dragging
  | 'container:dragging' // Class added on the container where the draggable was picked up from
  | 'source:dragging' // Class added on the draggable element that has been picked up
  | 'source:placed' // Class added on the draggable element on 'drag:stop'
  | 'container:placed' // Class added on the draggable container element on 'drag:stop'
  | 'draggable:over' // Class added on draggable element you are dragging over
  | 'container:over' // Class added on draggable container element you are dragging over
  | 'source:original' // Class added on the original source element, which is hidden on drag
  | 'mirror' // Class added on the mirror element
  | 'droppable:active' // Class added to the droppable container _(dropzone)_ when drag starts
  | 'droppable:occupied'; // Class added to the droppable container _(dropzone)_ when it contains a draggable element

  type AnnouncementsNames = 
  |'drag:start'// Picked up draggable element
  |'drag:stop' // Released draggable element
  |'sortable:stopped' // Draggable elements swapped',
  |'droppable:dropped'// Gets fired when dropping draggable element into a dropzone,
  |'droppable:returned'// Gets fired when draggable elements returns to original dropzone
  |  'sortable:sorted'// Gets fired when the source gets sorted in the DOM
  |  'swappabled:swapped'// onSwappableSwappedDefaultAnnouncement,


// draggable options
interface DraggableOptions {
  draggable?: string;
  handle?: any; //   string| function | NodeList | Array<HTMLElement> | HTMLElement;
  delay?: number;
  placedTimeout?: number;
  plugins?: AbstractPlugin[];
  sensors?: Sensor[];
  appendTo?: string | HTMLElement | Function; // Only used for Mirror!
  classes?: {
    [key in DraggableClassNames]: string;
  };
  announcements: {
    [key: string]: any;
  };
}
declare class AbstractEvent<DataT> {
  constructor(data: DataT);
  readonly type: string;
  readonly cancelable: boolean;
  cancel(): void;
  canceled(): boolean;
}

export { AbstractEvent as BaseEvent };
/**
 * Base Draggable Class
 */
export class Draggable {
  constructor(containers: DraggableContainer, options: DraggableOptions);
  destroy(): void;

  addPlugin(...plugins: AbstractPlugin[]): Draggable;
  removePlugin(...plugins: AbstractPlugin[]): Draggable;
  addSensor(...sensors: Sensor[]): Draggable;
  removeSensor(...sensors: Sensor[]): Draggable;
  addContainer(...containers: HTMLElement[]): Draggable;
  removeContainer(...containers: HTMLElement[]): Draggable;
  on(eventName: DragEventName, cb): Draggable;
  off(eventName: DragEventName, cb): Draggable;
  trigger(event: AbstractEvent<DragEvent>);
  getClassNameFor(name: string): string | null;
  isDragging(): boolean;
  getDraggableElements(): HTMLElement[];
  getDraggableElementsForContainer(container: HTMLElement): HTMLElement[];
}
/**
 * DragEvent class
 */
export interface DragEvent extends AbstractEvent<DragEvent> {
  readonly source: HTMLElement;
  readonly originalSource: HTMLElement;
  readonly mirror: HTMLElement;
  readonly sourceContainer: HTMLElement;
  readonly sensorEvent: SensorEvent;
  readonly originalEvent: Event;
}
export interface DragStartEvent extends DragEvent {}
export interface DragMoveEvent extends DragEvent {}
export interface DragOverEvent extends DragEvent {
  readonly overContainer: HTMLElement;
  readonly over: HTMLElement;
}
export interface DragOutEvent extends DragEvent {
  readonly overContainer: HTMLElement;
  readonly over: HTMLElement;
}
export interface DragOverContainerEvent extends DragEvent {
  readonly overContainer: HTMLElement;
}
export interface DragOutContainerEvent extends DragEvent {
  readonly overContainer: HTMLElement;
}
export interface DragPressureEvent extends DragEvent {
  readonly pressure: number;
}
export interface DragStopEvent extends DragEvent {}
/**
 * DraggableEvent
 */
export interface DraggableEvent extends AbstractEvent<DraggableEvent> {
  readonly draggable: Draggable;
}
export interface DraggableInitializedEvent extends DraggableEvent {}
export interface DraggableDestroyEvent extends DraggableEvent {}

/**
 * Dropable
 */
export interface DroppableOptions extends DraggableOptions {
  dropzone: string;
}
export class Droppable extends Draggable {
  constructor(containers: DraggableContainer, options: DroppableOptions);
  on(eventName: DropEventName, cb): Droppable;
  off(eventName: DropEventName, cb): Droppable;
}
export interface DroppableEvent extends AbstractEvent<DroppableEvent> {
  readonly dragEvent: DragEvent;
}
export interface DroppableOverEvent extends DroppableEvent {
  readonly droppable: HTMLElement;
}
export interface DroppableOutEvent extends DroppableEvent {
  readonly droppable: HTMLElement;
}
/**
 * Sortable
 */
export class Sortable extends Draggable {
  constructor(containers: DraggableContainer, options: DraggableOptions);
  on(eventName: SortEventName, cb): Droppable;
  off(eventName: SortEventName, cb): Droppable;
}
export interface SortableEvent extends AbstractEvent<SortableEvent> {
  readonly dragEvent: DragEvent;
}
export interface SortableStartEvent extends SortableEvent {
  readonly startIndex: number;
  readonly startContainer: HTMLElement;
}
export interface SortableSortEvent extends SortableEvent {
  readonly currentIndex: number;
  readonly over: HTMLElement;
  readonly overContainer: HTMLElement;
}
export interface SortableSortedEvent extends SortableEvent {
  readonly oldIndex: number;
  readonly newIndex: number;
  readonly oldContainer: HTMLElement;
  readonly newContainer: HTMLElement;
}
export interface SortableStopEvent extends SortableEvent {
  readonly oldIndex: number;
  readonly newIndex: number;
  readonly oldContainer: HTMLElement;
  readonly newContainer: HTMLElement;
}
/**
 * Swappable
 */
export class Swappable extends Draggable {
  constructor(containers: DraggableContainer, options: DraggableOptions);
  on(eventName: SwapEventName, cb): Droppable;
  off(eventName: SwapEventName, cb): Droppable;
}
export interface SwappableEvent extends AbstractEvent<SwappableEvent> {
  readonly dragEvent: DragEvent;
}
export interface SwappableStartEvent extends SwappableEvent {}
export interface SwappableSwapEvent extends SwappableEvent {
  readonly over: HTMLElement;
  readonly overContainer: HTMLElement;
}
export interface SwappableSwappedEvent extends SwappableEvent {
  readonly swappedElement: HTMLElement;
}
export interface SwappableStopEvent extends SwappableEvent {}

/**
 * AbstractPlugin Class
 */
declare class AbstractPlugin {
  constructor(draggable: Draggable);
  attach(): void;
  detach(): void;
  getOptions(): any;
}
export { AbstractPlugin as BasePlugin };
/**
 * Draggable Plugin Mirror
 */
export class Mirror extends AbstractPlugin {}

export interface MirrorPluginOptions {
  constrainDimensions: boolean;
  xAxis: boolean;
  yAxis: boolean;
  cursorOffsetX: boolean;
  cursorOffsetY: boolean;
}

export interface MirrorEvent extends AbstractEvent<MirrorEvent> {
  readonly source: HTMLElement;
  readonly originalSource: HTMLElement;
  readonly sourceContainer: HTMLElement;
  readonly sensorEvent: SensorEvent;
  readonly dragEvent: DragEvent;
  readonly originalEvent: Event;
}
export interface MirrorCreateEvent extends MirrorEvent {}
export interface MirrorCreatedEvent extends MirrorEvent {
  readonly mirror: HTMLElement;
}
export interface MirrorAttachedEvent extends MirrorEvent {
  readonly mirror: HTMLElement;
}
export interface MirrorMoveEvent extends MirrorEvent {
  readonly mirror: HTMLElement;
}
export interface MirrorDestroyEvent extends MirrorEvent {
  readonly mirror: HTMLElement;
}
/**
 * Draggable Scrollable Plugin
 */
export class Scrollable extends AbstractPlugin {
  getScrollableElement(HTMLElement): HTMLElement;
  hasDefinedScrollableElements(): boolean;
}

export interface ScrollablePluginOptions {
  speed: number;
  sensitivity: number;
  scrollableElements: HTMLElement[];
}
/**
 * Collidable Plugin
 */
export class Collidable extends AbstractPlugin {
  getCollidables(): HTMLElement[];
}
/**
 * SwapAnimation
 */
export class SwapAnimation extends AbstractPlugin {}
export interface SwapAnimationOptions {
  duration: number;
  easingFunction: string;
  horizontal: boolean;
}
/**
 * ResizeMirror
 */
export class ResizeMirror extends AbstractPlugin {}
/**
 * Snappable
 */
export class Snappable extends AbstractPlugin {}

interface SensorEvent extends AbstractEvent<SensorEvent> {
  readonly originalEvent: Event;
  readonly clientX: number;
  readonly clientY: number;
  readonly target: HTMLElement;
  readonly container: HTMLElement;
  readonly pressure: number;
}
export interface DragStartSensorEvent extends SensorEvent {}
export interface DragMoveSensorEvent extends SensorEvent {}
export interface DragStopSensorEvent extends SensorEvent {}
export interface DragPressureSensorEvent extends SensorEvent {}
interface SensorOptions {}
/**
 * Sensor
 */
export class Sensor {
  constructor(containers: HTMLElement[], options: SensorOptions);
  attach(): Sensor;
  detach(): Sensor;
  addContainer(containers: HTMLElement[]): void;
  removeContainer(containers: HTMLElement[]): void;
  trigger(element: HTMLElement, sensorEvent: SensorEvent): SensorEvent;
}
/**
 * MouseSensor
 */
export class MouseSensor extends Sensor {}
/**
 * TouchSensor
 */
export class TouchSensor extends Sensor {}
/**
 * DragSensor
 */
export class DragSensor extends Sensor {}
/**
 * ForceTouchSensor
 */
export class ForceTouchSensor extends Sensor {}
