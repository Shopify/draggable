import Draggable, {
  DragMoveEvent,
  DragStartEvent,
  DragStopEvent,
  DraggableOptions,
} from '../Draggable';
import { closest } from '../shared/utils';
import {
  DroppableStartEvent,
  DroppableDroppedEvent,
  DroppableReturnedEvent,
  DroppableStopEvent,
} from './DroppableEvent';

const onDragStart = Symbol('onDragStart');
const onDragMove = Symbol('onDragMove');
const onDragStop = Symbol('onDragStop');
const dropInDropzone = Symbol('dropInDropZone');
const returnToOriginalDropzone = Symbol('returnToOriginalDropzone');
const closestDropzone = Symbol('closestDropzone');
const getDropzones = Symbol('getDropzones');

/**
 * Returns an announcement message when the Draggable element is dropped into a dropzone element
 */
function onDroppableDroppedDefaultAnnouncement({
  dragEvent,
  dropzone,
}: DroppableDroppedEvent): string {
  const sourceText =
    dragEvent.source.textContent.trim() ||
    dragEvent.source.id ||
    'draggable element';
  const dropzoneText =
    dropzone.textContent.trim() || dropzone.id || 'droppable element';

  return `Dropped ${sourceText} into ${dropzoneText}`;
}

/**
 * Returns an announcement message when the Draggable element has returned to its original dropzone element
 */
function onDroppableReturnedDefaultAnnouncement({
  dragEvent,
  dropzone,
}: DroppableReturnedEvent) {
  const sourceText =
    dragEvent.source.textContent.trim() ||
    dragEvent.source.id ||
    'draggable element';
  const dropzoneText =
    dropzone.textContent.trim() || dropzone.id || 'droppable element';

  return `Returned ${sourceText} from ${dropzoneText}`;
}

const defaultAnnouncements = {
  'droppable:dropped': onDroppableDroppedDefaultAnnouncement,
  'droppable:returned': onDroppableReturnedDefaultAnnouncement,
};

const defaultClasses = {
  'droppable:active': 'draggable-dropzone--active',
  'droppable:occupied': 'draggable-dropzone--occupied',
};

const defaultOptions = {
  dropzone: '.draggable-droppable',
};

interface DroppableOptions extends Omit<DraggableOptions, 'classes'> {
  dropzone?: string | HTMLElement[] | (() => HTMLElement);
  classes?: DraggableOptions['classes'] & {
    [key in keyof typeof defaultClasses]?: string | string[];
  };
}

/**
 * Droppable is built on top of Draggable and allows dropping draggable elements
 * into dropzone element
 */
export default class Droppable extends Draggable {
  declare options: DroppableOptions;
  dropzones: HTMLElement[] = null;
  lastDropzone: HTMLElement = null;
  initialDropzone: HTMLElement = null;

  constructor(containers: HTMLElement[] = [], options: DroppableOptions = {}) {
    super(containers, {
      ...defaultOptions,
      ...options,
      classes: {
        ...defaultClasses,
        ...(options.classes ?? {}),
      },
      announcements: {
        ...defaultAnnouncements,
        ...(options.announcements ?? {}),
      },
    });

    this.on('drag:start', this[onDragStart])
      .on('drag:move', this[onDragMove])
      .on('drag:stop', this[onDragStop]);
  }

  destroy() {
    super.destroy();

    this.off('drag:start', this[onDragStart])
      .off('drag:move', this[onDragMove])
      .off('drag:stop', this[onDragStop]);
  }

  private [onDragStart] = (event: DragStartEvent) => {
    if (event.canceled()) return;

    this.dropzones = [...this[getDropzones]()];
    const dropzone = closest(event.sensorEvent.target, this.options.dropzone);

    if (!dropzone) {
      event.cancel();
      return;
    }

    const droppableStartEvent = new DroppableStartEvent({
      dragEvent: event,
      dropzone,
    });

    this.trigger(droppableStartEvent);

    if (droppableStartEvent.canceled()) {
      event.cancel();
      return;
    }

    this.initialDropzone = dropzone;

    for (const dropzoneElement of this.dropzones) {
      if (
        dropzoneElement.classList.contains(
          this.getClassNameFor('droppable:occupied')
        )
      ) {
        continue;
      }

      dropzoneElement.classList.add(
        ...this.getClassNamesFor('droppable:active')
      );
    }
  };

  private [onDragMove] = (event: DragMoveEvent) => {
    if (event.canceled()) return;

    const dropzone = this[closestDropzone](event.sensorEvent.target);
    const overEmptyDropzone =
      dropzone &&
      !dropzone.classList.contains(this.getClassNameFor('droppable:occupied'));

    if (overEmptyDropzone && this[dropInDropzone](event, dropzone)) {
      this.lastDropzone = dropzone;
    } else if (
      (!dropzone || dropzone === this.initialDropzone) &&
      this.lastDropzone
    ) {
      this[returnToOriginalDropzone](event);
      this.lastDropzone = null;
    }
  };

  private [onDragStop] = (event: DragStopEvent) => {
    const droppableStopEvent = new DroppableStopEvent({
      dragEvent: event,
      dropzone: this.lastDropzone || this.initialDropzone,
    });

    this.trigger(droppableStopEvent);

    const occupiedClasses = this.getClassNamesFor('droppable:occupied');

    for (const dropzone of this.dropzones) {
      dropzone.classList.remove(...this.getClassNamesFor('droppable:active'));
    }

    if (this.lastDropzone && this.lastDropzone !== this.initialDropzone) {
      this.initialDropzone.classList.remove(...occupiedClasses);
    }

    this.dropzones = null;
    this.lastDropzone = null;
    this.initialDropzone = null;
  };

  /**
   * Drops a draggable element into a dropzone element
   */
  private [dropInDropzone] = (event: DragMoveEvent, dropzone: HTMLElement) => {
    const droppableDroppedEvent = new DroppableDroppedEvent({
      dragEvent: event,
      dropzone,
    });

    this.trigger(droppableDroppedEvent);

    if (droppableDroppedEvent.canceled()) return false;

    const occupiedClasses = this.getClassNamesFor('droppable:occupied');

    if (this.lastDropzone)
      this.lastDropzone.classList.remove(...occupiedClasses);

    dropzone.appendChild(event.source);
    dropzone.classList.add(...occupiedClasses);

    return true;
  };

  /**
   * Moves the previously dropped element back into its original dropzone
   */
  private [returnToOriginalDropzone] = (event: DragMoveEvent) => {
    const droppableReturnedEvent = new DroppableReturnedEvent({
      dragEvent: event,
      dropzone: this.lastDropzone,
    });

    this.trigger(droppableReturnedEvent);

    if (droppableReturnedEvent.canceled()) return;

    this.initialDropzone.appendChild(event.source);
    this.lastDropzone.classList.remove(
      ...this.getClassNamesFor('droppable:occupied')
    );
  };

  private [closestDropzone] = (target: HTMLElement) =>
    this.dropzones ? closest(target, this.dropzones) : null;

  private [getDropzones] = (): HTMLElement[] => {
    const dropzone = this.options.dropzone;

    if (typeof dropzone === 'string')
      return <HTMLElement[]>(<unknown>document.querySelectorAll(dropzone));
    else if (dropzone instanceof Array) return dropzone;
    else if (typeof dropzone === 'function') return [dropzone()];
    else return [dropzone];
  };
}
