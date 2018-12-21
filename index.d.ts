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
    abstract class AbstractEvent<DataT = { [key: string]: any }> {
        constructor(data: DataT);
        static readonly type: string; // Abstract, waiting on https://github.com/Microsoft/TypeScript/issues/14600
        static readonly cancelable: boolean; // Abstract, waiting on https://github.com/Microsoft/TypeScript/issues/14600
        readonly type: string;
        readonly cancelable: boolean;
        cancel(): void;
        canceled(): boolean;
        clone(): AbstractEvent<DataT>;
    }

    export { AbstractEvent as BaseEvent };

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

    export class DragStartEvent extends DragEvent { }

    export class DragMoveEvent extends DragEvent { }

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

    export class DragStopEvent extends DragEvent { }

    /**
     * DraggableEvent
     */
    export type DraggableEventNames =
        'draggable:initialize' |
        'draggable:destroy' |
        'drag:start' |
        'drag:move' |
        'drag:over' |
        'drag:over:container' |
        'drag:out' |
        'drag:out:container' |
        'drag:stop' |
        'drag:pressure';

    export class DraggableEvent extends AbstractEvent {
        readonly draggable: Draggable;
    }
    export class DraggableInitializedEvent extends DraggableEvent { }
    export class DraggableDestroyEvent extends DraggableEvent { }

    export type DraggableClassNames =
        'body:dragging' |
        'container:dragging' |
        'source:dragging' |
        'source:placed' |
        'container:placed' |
        'draggable:over' |
        'container:over' |
        'source:original' |
        'mirror';

    export type DraggableContainer = HTMLElement | HTMLElement[] | NodeList;

    interface DraggableOptions {
        draggable?: string;
        handle?: string | NodeList | HTMLElement[] | HTMLElement | ((currentElement: HTMLElement) => HTMLElement);
        delay?: number;
        plugins?: Array<typeof AbstractPlugin>;
        sensors?: Sensor[];
        classes?: { [key in DraggableClassNames]: string };
        announcements?: AnnouncementOptions;
        collidables?: Collidables;
        mirror?: MirrorOptions;
        scrollable?: ScrollableOptions;
        swapAnimation?: SwapAnimationOptions;
    }

    export class Draggable<EventListType extends string = DraggableEventNames | MirrorEventNames> {
        static Plugins: {
            Announcement: typeof Announcement,
            Focusable: typeof Focusable,
            Mirror: typeof Mirror,
            Scrollable: typeof Scrollable
        };
        constructor(containers: DraggableContainer, options?: DraggableOptions);
        destroy(): void;
        on(eventName: EventListType, callback: (event: AbstractEvent) => void): this;
        off(eventName: EventListType, callback: (event: AbstractEvent) => void): this;
        trigger(event: typeof AbstractEvent): void;
        addPlugin(...plugins: Array<typeof AbstractPlugin>): this;
        removePlugin(...plugins: Array<typeof AbstractPlugin>): this;
        addSensor(...sensors: Array<typeof Sensor>): this;
        removeSensor(...sensors: Array<typeof Sensor>): this;
        addContainer(...containers: HTMLElement[]): this;
        removeContainer(...containers: HTMLElement[]): this;
        getClassNameFor(name: DraggableClassNames): string;
        isDragging(): boolean;
        getDraggableElementsForContainer(container: HTMLElement): HTMLElement[];
    }

    export abstract class AbstractPlugin {
        protected draggable: Draggable;
        constructor(draggable: Draggable);
        protected abstract attach(): void;
        protected abstract detach(): void;
    }

    export { AbstractPlugin as BasePlugin };

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
        protected attach(): void;
        protected detach(): void;
        getElements(): HTMLElement[];
    }

    /**
     * Mirror Plugin
     */
    export type MirrorEventNames =
        'mirror:create' |
        'mirror:created' |
        'mirror:attached' |
        'mirror:move' |
        'mirror:destroy';

    export class MirrorEvent extends AbstractEvent {
        readonly source: HTMLElement;
        readonly originalSource: HTMLElement;
        readonly sourceContainer: HTMLElement;
        readonly sensorEvent: SensorEvent;
        readonly originalEvent: Event;
    }
    export class MirrorCreateEvent extends MirrorEvent { }
    export class MirrorCreatedEvent extends MirrorEvent {
        readonly mirror: HTMLElement;
    }
    export class MirrorAttachedEvent extends MirrorEvent {
        readonly mirror: HTMLElement;
    }
    export class MirrorMoveEvent extends MirrorEvent {
        readonly mirror: HTMLElement;
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
        protected attach(): void;
        protected detach(): void;
        getElements(): HTMLElement[];
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

    export class DragStartSensorEvent extends SensorEvent { }

    export class DragMoveSensorEvent extends SensorEvent { }

    export class DragStopSensorEvent extends SensorEvent { }

    export class DragPressureSensorEvent extends SensorEvent { }

    export interface SensorOptions {
        delay?: number;
    }

    export class Sensor {
        constructor(containers: HTMLElement | HTMLElement[] | NodeList, options?: SensorOptions);
        attach(): this;
        detach(): this;
        addContainer(...containers: HTMLElement[]): void;
        removeContainer(...containers: HTMLElement[]): void;
        trigger(element: HTMLElement, sensorEvent: SensorEvent): SensorEvent;
    }

    export interface Sensors {
        DragSensor: typeof DragSensor;
    }

    export class DragSensor extends Sensor { }

    export class ForceTouchSensor extends Sensor { }

    export class MouseSensor extends Sensor { }

    export class TouchSensor extends Sensor { }

    /**
     * Droppable
     */
    export type DroppableEventNames =
        'droppable:dropped' |
        'droppable:returned';

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
        DraggableClassNames |
        'droppable:active' |
        'droppable:occupied';

    export interface DroppableOptions extends DraggableOptions {
        dropzone: string | NodeList | HTMLElement[] | (() => NodeList | HTMLElement[]);
        classes?: { [key in DroppableClassNames]: string };
    }

    export class Droppable extends Draggable<DraggableEventNames | DroppableEventNames | MirrorEventNames> {
        constructor(containers: DraggableContainer, options: DroppableOptions);
        getClassNameFor(name: DroppableClassNames): string;
    }

    /**
     * Sortable
     */
    export type SortableEventNames =
        'sortable:start' |
        'sortable:sort' |
        'sortable:sorted' |
        'sortable:stop';

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

    export class Sortable extends Draggable<DraggableEventNames | MirrorEventNames | SortableEventNames> { }

    /**
     * Swappable
     */
    export type SwappableEventNames =
        'swappable:start' |
        'swappable:swap' |
        'swappable:swapped' |
        'swappable:stop';

    export class SwappableEvent extends AbstractEvent {
        readonly dragEvent: DragEvent;
    }

    export class SwappableStartEvent extends SwappableEvent { }

    export class SwappableSwapEvent extends SwappableEvent {
        readonly over: HTMLElement;
        readonly overContainer: HTMLElement;
    }

    export class SwappableSwappedEvent extends SwappableEvent {
        readonly swappedElement: HTMLElement;
    }

    export class SwappableStopEvent extends SwappableEvent { }

    export class Swappable extends Draggable<DraggableEventNames | MirrorEventNames | SwappableEventNames> { }

    /**
     * Collidable Plugin
     */
    export type Collidables = string | NodeList | HTMLElement[] | (() => NodeList | HTMLElement[]);

    class Collidable extends AbstractPlugin {
        protected attach(): void;
        protected detach(): void;
    }

    /**
     * ResizeMirror
     */
    class ResizeMirror extends AbstractPlugin {
        protected attach(): void;
        protected detach(): void;
    }

    /**
     * Snappable
     */
    class Snappable extends AbstractPlugin {
        protected attach(): void;
        protected detach(): void;
    }

    /**
     * SwapAnimation
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

    export const Plugins: {
        Collidable: typeof Collidable,
        SwapAnimation: typeof SwapAnimation,
        ResizeMirror: typeof ResizeMirror,
        Snappable: typeof Snappable,
    };
}
