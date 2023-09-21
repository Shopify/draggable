declare module '@shopify/draggable/lib/draggable.bundle.legacy' {
  export * from '@shopify/draggable';
}

declare module '@shopify/draggable/lib/es5/draggable.bundle' {
  export * from '@shopify/draggable';
}

declare module '@shopify/draggable/lib/es5/draggable.bundle.legacy' {
  export * from '@shopify/draggable';
}

declare module '@shopify/draggable' {
  abstract class AbstractEvent<TData = {[key: string]: any}> {
    // Abstract, waiting on https://github.com/Microsoft/TypeScript/issues/14600
    static readonly type: string;
    // Abstract, waiting on https://github.com/Microsoft/TypeScript/issues/14600
    static readonly cancelable: boolean;
    readonly type: string;
    readonly cancelable: boolean;
    constructor(data: TData);
    cancel(): void;
    canceled(): boolean;
    clone(): AbstractEvent<TData>;
  }

  export {AbstractEvent as BaseEvent};

  type GetEventByEventName<TEventName> =
    TEventName extends 'draggable:initialize'
      ? DraggableInitializedEvent
      : TEventName extends 'draggable:destroy'
      ? DraggableDestroyEvent
      : TEventName extends 'drag:start'
      ? DragStartEvent
      : TEventName extends 'drag:move'
      ? DragMoveEvent
      : TEventName extends 'drag:over'
      ? DragOverEvent
      : TEventName extends 'drag:over:container'
      ? DragOverContainerEvent
      : TEventName extends 'drag:out'
      ? DragOutEvent
      : TEventName extends 'drag:out:container'
      ? DragOutContainerEvent
      : TEventName extends 'drag:stop'
      ? DragStopEvent
      : TEventName extends 'drag:stopped'
      ? DragStoppedEvent
      : TEventName extends 'drag:pressure'
      ? DragPressureEvent
      : TEventName extends 'mirror:create'
      ? MirrorCreateEvent
      : TEventName extends 'mirror:created'
      ? MirrorCreatedEvent
      : TEventName extends 'mirror:attached'
      ? MirrorAttachedEvent
      : TEventName extends 'mirror:move'
      ? MirrorMoveEvent
      : TEventName extends 'mirror:moved'
      ? MirrorMovedEvent
      : TEventName extends 'mirror:destroy'
      ? MirrorDestroyEvent
      : TEventName extends 'droppable:start'
      ? DroppableStartEvent
      : TEventName extends 'droppable:dropped'
      ? DroppableDroppedEvent
      : TEventName extends 'droppable:returned'
      ? DroppableReturnedEvent
      : TEventName extends 'droppable:stop'
      ? DroppableStopEvent
      : TEventName extends 'sortable:start'
      ? SortableStartEvent
      : TEventName extends 'sortable:sort'
      ? SortableSortEvent
      : TEventName extends 'sortable:sorted'
      ? SortableSortedEvent
      : TEventName extends 'sortable:stop'
      ? SortableStopEvent
      : TEventName extends 'swappable:start'
      ? SwappableStartEvent
      : TEventName extends 'swappable:swap'
      ? SwappableSwapEvent
      : TEventName extends 'swappable:swapped'
      ? SwappableSwappedEvent
      : TEventName extends 'swappable:stop'
      ? SwappableStopEvent
      : TEventName extends 'collidable:in'
      ? CollidableInEvent
      : TEventName extends 'collidable:out'
      ? CollidableOutEvent
      : TEventName extends 'snap:in'
      ? SnapInEvent
      : TEventName extends 'snap:out'
      ? SnapOutEvent
      : AbstractEvent;

  export interface DelayOptions {
    mouse?: number;
    drag?: number;
    touch?: number;
  }

  /**
   * DragEvent
   */
  export class DragEvent extends AbstractEvent {
    readonly source: HTMLElement;
    readonly originalSource: HTMLElement;
    readonly mirror: HTMLElement;
    readonly sourceContainer: HTMLElement;
    readonly sensorEvent: SensorEvent;
    readonly originalEvent: Event;
  }

  export class DragStartEvent extends DragEvent {}

  export class DragMoveEvent extends DragEvent {}

  export class DragOverEvent extends DragEvent {
    readonly overContainer: HTMLElement;
    readonly over: HTMLElement;
  }

  export class DragOutEvent extends DragEvent {
    readonly overContainer: HTMLElement;
    readonly over: HTMLElement;
  }

  export class DragOverContainerEvent extends DragEvent {
    readonly overContainer: HTMLElement;
  }

  export class DragOutContainerEvent extends DragEvent {
    readonly overContainer: HTMLElement;
  }

  export class DragPressureEvent extends DragEvent {
    readonly pressure: number;
  }

  export class DragStopEvent extends DragEvent {}

  export class DragStoppedEvent extends DragEvent {}

  /**
   * DraggableEvent
   */
  export type DraggableEventNames =
    | 'draggable:initialize'
    | 'draggable:destroy'
    | 'drag:start'
    | 'drag:move'
    | 'drag:over'
    | 'drag:over:container'
    | 'drag:out'
    | 'drag:out:container'
    | 'drag:stop'
    | 'drag:pressure'
    | MirrorEventNames;

  export class DraggableEvent extends AbstractEvent {
    readonly draggable: Draggable;
  }
  export class DraggableInitializedEvent extends DraggableEvent {}
  export class DraggableDestroyEvent extends DraggableEvent {}

  export type DraggableClassNames =
    | 'body:dragging'
    | 'container:dragging'
    | 'source:dragging'
    | 'source:placed'
    | 'container:placed'
    | 'draggable:over'
    | 'container:over'
    | 'source:original'
    | 'mirror';

  export type DraggableContainer = HTMLElement | HTMLElement[] | NodeList;

  export interface DraggableOptions {
    draggable?: string;
    distance?: number;
    handle?:
      | string
      | NodeList
      | HTMLElement[]
      | HTMLElement
      | ((currentElement: HTMLElement) => HTMLElement);
    delay?: number | DelayOptions;
    plugins?: (typeof AbstractPlugin)[];
    sensors?: Sensor[];
    classes?: {[key in DraggableClassNames]: string | string[]};
    announcements?: AnnouncementOptions;
    collidables?: Collidables;
    mirror?: MirrorOptions;
    scrollable?: ScrollableOptions;
    swapAnimation?: SwapAnimationOptions;
    sortAnimation?: SortAnimationOptions;
  }

  export class Draggable<TEventListType = DraggableEventNames> {
    static Plugins: {
      Announcement: typeof Announcement;
      Focusable: typeof Focusable;
      Mirror: typeof Mirror;
      Scrollable: typeof Scrollable;
    };

    constructor(containers: DraggableContainer, options?: DraggableOptions);
    destroy(): void;
    on<T extends TEventListType>(
      eventName: T,
      callback: (event: GetEventByEventName<T>) => void,
    ): this;

    off<T extends TEventListType>(
      eventName: T,
      callback: (event: GetEventByEventName<T>) => void,
    ): this;

    trigger(event: AbstractEvent): void;
    addPlugin(...plugins: (typeof AbstractPlugin)[]): this;
    removePlugin(...plugins: (typeof AbstractPlugin)[]): this;
    addSensor(...sensors: (typeof Sensor)[]): this;
    removeSensor(...sensors: (typeof Sensor)[]): this;
    addContainer(...containers: HTMLElement[]): this;
    removeContainer(...containers: HTMLElement[]): this;
    getClassNameFor(name: DraggableClassNames): string;
    getClassNamesFor(name: DraggableClassNames): string[];
    isDragging(): boolean;
    getDraggableElementsForContainer(container: HTMLElement): HTMLElement[];
  }

  export abstract class AbstractPlugin {
    protected draggable: Draggable;
    constructor(draggable: Draggable);
    protected abstract attach(): void;
    protected abstract detach(): void;
  }

  export {AbstractPlugin as BasePlugin};

  /**
   * Announcement Plugin
   */
  export interface AnnouncementOptions {
    expire: number;
    [key: string]: string | (() => string) | number;
  }

  class Announcement extends AbstractPlugin {
    options: AnnouncementOptions;
    protected attach(): void;
    protected detach(): void;
  }

  /**
   * Focusable Plugin
   */
  class Focusable extends AbstractPlugin {
    getElements(): HTMLElement[];
    protected attach(): void;
    protected detach(): void;
  }

  /**
   * Mirror Plugin
   */
  export type MirrorEventNames =
    | 'mirror:create'
    | 'mirror:created'
    | 'mirror:attached'
    | 'mirror:move'
    | 'mirror:destroy';

  export class MirrorEvent extends AbstractEvent {
    readonly source: HTMLElement;
    readonly originalSource: HTMLElement;
    readonly sourceContainer: HTMLElement;
    readonly sensorEvent: SensorEvent;
    readonly originalEvent: Event;
  }
  export class MirrorCreateEvent extends MirrorEvent {}
  export class MirrorCreatedEvent extends MirrorEvent {
    readonly mirror: HTMLElement;
  }
  export class MirrorAttachedEvent extends MirrorEvent {
    readonly mirror: HTMLElement;
  }
  export class MirrorMoveEvent extends MirrorEvent {
    readonly mirror: HTMLElement;
    readonly passedThreshX: boolean;
    readonly passedThreshY: boolean;
  }
  export class MirrorMovedEvent extends MirrorEvent {
    readonly mirror: HTMLElement;
    readonly passedThreshX: boolean;
    readonly passedThreshY: boolean;
  }
  export class MirrorDestroyEvent extends MirrorEvent {
    readonly mirror: HTMLElement;
  }

  export interface MirrorOptions {
    xAxis?: boolean;
    yAxis?: boolean;
    constrainDimensions?: boolean;
    cursorOffsetX?: number;
    cursorOffsetY?: number;
    appendTo?: string | HTMLElement | ((source: HTMLElement) => HTMLElement);
  }

  class Mirror extends AbstractPlugin {
    getElements(): HTMLElement[];
    protected attach(): void;
    protected detach(): void;
  }

  /**
   * Scrollable Plugin
   */
  export interface ScrollableOptions {
    speed?: number;
    sensitivity?: number;
    scrollableElements?: HTMLElement[];
  }

  class Scrollable extends AbstractPlugin {
    protected attach(): void;
    protected detach(): void;
  }

  /**
   * Sensors
   */
  export class SensorEvent extends AbstractEvent {
    readonly originalEvent: Event;
    readonly clientX: number;
    readonly clientY: number;
    readonly target: HTMLElement;
    readonly container: HTMLElement;
    readonly pressure: number;
  }

  export class DragStartSensorEvent extends SensorEvent {}

  export class DragMoveSensorEvent extends SensorEvent {}

  export class DragStopSensorEvent extends SensorEvent {}

  export class DragPressureSensorEvent extends SensorEvent {}

  export interface SensorOptions {
    delay?: number | DelayOptions;
  }

  export class Sensor {
    constructor(
      containers: HTMLElement | HTMLElement[] | NodeList,
      options?: SensorOptions,
    );

    attach(): this;
    detach(): this;
    addContainer(...containers: HTMLElement[]): void;
    removeContainer(...containers: HTMLElement[]): void;
    trigger(element: HTMLElement, sensorEvent: SensorEvent): SensorEvent;
  }

  export interface Sensors {
    DragSensor: typeof DragSensor;
  }

  export class DragSensor extends Sensor {}

  export class ForceTouchSensor extends Sensor {}

  export class MouseSensor extends Sensor {}

  export class TouchSensor extends Sensor {}

  /**
   * Droppable
   */
  export type DroppableEventNames =
    | 'droppable:start'
    | 'droppable:dropped'
    | 'droppable:returned'
    | 'droppable:stop'
    | DraggableEventNames;

  export class DroppableEvent extends AbstractEvent {
    readonly dragEvent: DragEvent;
  }

  export class DroppableStartEvent extends DroppableEvent {
    dropzone: HTMLElement;
  }

  export class DroppableDroppedEvent extends DroppableEvent {
    dropzone: HTMLElement;
  }

  export class DroppableReturnedEvent extends DroppableEvent {
    dropzone: HTMLElement;
  }

  export class DroppableStopEvent extends DroppableEvent {
    dropzone: HTMLElement;
  }

  export type DroppableClassNames =
    | DraggableClassNames
    | 'droppable:active'
    | 'droppable:occupied';

  export interface DroppableOptions extends DraggableOptions {
    dropzone:
      | string
      | NodeList
      | HTMLElement[]
      | (() => NodeList | HTMLElement[]);
    classes?: {[key in DroppableClassNames]: string};
  }

  export class Droppable<T = DroppableEventNames> extends Draggable<T> {
    constructor(containers: DraggableContainer, options: DroppableOptions);
    getClassNameFor(name: DroppableClassNames): string;
  }

  /**
   * Sortable
   */
  export type SortableEventNames =
    | 'sortable:start'
    | 'sortable:sort'
    | 'sortable:sorted'
    | 'sortable:stop'
    | DraggableEventNames;

  export class SortableEvent extends AbstractEvent {
    readonly dragEvent: DragEvent;
  }

  export class SortableStartEvent extends SortableEvent {
    readonly startIndex: number;
    readonly startContainer: HTMLElement;
  }

  export class SortableSortEvent extends SortableEvent {
    readonly oldIndex: number;
    readonly newIndex: number;
    readonly oldContainer: HTMLElement;
    readonly newContainer: HTMLElement;
  }

  export class SortableSortedEvent extends SortableEvent {
    readonly oldIndex: number;
    readonly newIndex: number;
    readonly oldContainer: HTMLElement;
    readonly newContainer: HTMLElement;
  }

  export class SortableStopEvent extends SortableEvent {
    readonly oldIndex: number;
    readonly newIndex: number;
    readonly oldContainer: HTMLElement;
    readonly newContainer: HTMLElement;
  }

  export class Sortable<T = SortableEventNames> extends Draggable<T> {}

  /**
   * Swappable
   */
  export type SwappableEventNames =
    | 'swappable:start'
    | 'swappable:swap'
    | 'swappable:swapped'
    | 'swappable:stop'
    | DraggableEventNames;

  export class SwappableEvent extends AbstractEvent {
    readonly dragEvent: DragEvent;
  }

  export class SwappableStartEvent extends SwappableEvent {}

  export class SwappableSwapEvent extends SwappableEvent {
    readonly over: HTMLElement;
    readonly overContainer: HTMLElement;
  }

  export class SwappableSwappedEvent extends SwappableEvent {
    readonly swappedElement: HTMLElement;
  }

  export class SwappableStopEvent extends SwappableEvent {}

  export class Swappable<T = SwappableEventNames> extends Draggable<T> {}

  /**
   * Collidable Plugin
   */
  export type CollidableEventNames = 'collidable:in' | 'collidable:out';

  export class CollidableEvent extends AbstractEvent {
    readonly dragEvent: DragEvent;
    readonly collidingElement: HTMLElement;
  }
  export class CollidableInEvent extends CollidableEvent {}
  export class CollidableOutEvent extends CollidableEvent {}

  export type Collidables =
    | string
    | NodeList
    | HTMLElement[]
    | (() => NodeList | HTMLElement[]);

  class Collidable extends AbstractPlugin {
    protected attach(): void;
    protected detach(): void;
  }

  /**
   * ResizeMirror Plugin
   */
  class ResizeMirror extends AbstractPlugin {
    protected attach(): void;
    protected detach(): void;
  }

  /**
   * Snappable Plugin
   */
  export type SnappableEventNames = 'snap:in' | 'snap:out';

  export class SnapEvent extends AbstractEvent {
    readonly dragEvent: DragEvent;
    readonly snappable: HTMLElement;
  }
  export class SnapInEvent extends SnapEvent {}
  export class SnapOutEvent extends SnapEvent {}

  class Snappable extends AbstractPlugin {
    protected attach(): void;
    protected detach(): void;
  }

  /**
   * SwapAnimation Plugin
   */
  export interface SwapAnimationOptions {
    duration: number;
    easingFunction: string;
    horizontal: boolean;
  }

  class SwapAnimation extends AbstractPlugin {
    protected attach(): void;
    protected detach(): void;
  }

  /**
   * SortAnimation
   */
  export interface SortAnimationOptions {
    duration?: number;
    easingFunction?: string;
  }

  class SortAnimation extends AbstractPlugin {
    protected attach(): void;
    protected detach(): void;
  }

  export const Plugins: {
    Collidable: typeof Collidable;
    SwapAnimation: typeof SwapAnimation;
    SortAnimation: typeof SortAnimation;
    ResizeMirror: typeof ResizeMirror;
    Snappable: typeof Snappable;
  };
}
