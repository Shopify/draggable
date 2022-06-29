import Draggable, { DraggableOptions } from '../Draggable';
import {
  SwappableStartEvent,
  SwappableSwapEvent,
  SwappableSwappedEvent,
  SwappableStopEvent,
} from './SwappableEvent';

const onDragStart = Symbol('onDragStart');
const onDragOver = Symbol('onDragOver');
const onDragStop = Symbol('onDragStop');

/**
 * Returns an announcement message when the Draggable element is swapped with another draggable element
 */
function onSwappableSwappedDefaultAnnouncement({
  dragEvent,
  swappedElement,
}: SwappableSwappedEvent) {
  const sourceText =
    dragEvent.source.textContent.trim() ||
    dragEvent.source.id ||
    'swappable element';
  const overText =
    swappedElement.textContent.trim() ||
    swappedElement.id ||
    'swappable element';

  return `Swapped ${sourceText} with ${overText}`;
}

function withTempElement(callback) {
  const tmpElement = document.createElement('div');
  callback(tmpElement);
  tmpElement.remove();
}

function swap(source, over) {
  const overParent = over.parentNode;
  const sourceParent = source.parentNode;

  withTempElement((tmpElement) => {
    sourceParent.insertBefore(tmpElement, source);
    overParent.insertBefore(source, over);
    sourceParent.insertBefore(over, tmpElement);
  });
}

const defaultAnnouncements = {
  'swappabled:swapped': onSwappableSwappedDefaultAnnouncement,
};

export default class Swappable extends Draggable {
  lastOver: HTMLElement = null;

  constructor(containers: HTMLElement[] = [], options: DraggableOptions = {}) {
    super(containers, {
      ...options,
      announcements: {
        ...defaultAnnouncements,
        ...(options.announcements || {}),
      },
    });

    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragOver] = this[onDragOver].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);

    this.on('drag:start', this[onDragStart])
      .on('drag:over', this[onDragOver])
      .on('drag:stop', this[onDragStop]);
  }

  destroy() {
    super.destroy();

    this.off('drag:start', this[onDragStart])
      .off('drag:over', this[onDragOver])
      .off('drag:stop', this[onDragStop]);
  }

  [onDragStart](event) {
    const swappableStartEvent = new SwappableStartEvent({
      dragEvent: event,
    });

    this.trigger(swappableStartEvent);

    if (swappableStartEvent.canceled()) {
      event.cancel();
    }
  }

  [onDragOver](event) {
    if (
      event.over === event.originalSource ||
      event.over === event.source ||
      event.canceled()
    ) {
      return;
    }

    const swappableSwapEvent = new SwappableSwapEvent({
      dragEvent: event,
      over: event.over,
      overContainer: event.overContainer,
    });

    this.trigger(swappableSwapEvent);

    if (swappableSwapEvent.canceled()) {
      return;
    }

    // swap originally swapped element back
    if (this.lastOver && this.lastOver !== event.over) {
      swap(this.lastOver, event.source);
    }

    if (this.lastOver === event.over) {
      this.lastOver = null;
    } else {
      this.lastOver = event.over;
    }

    swap(event.source, event.over);

    const swappableSwappedEvent = new SwappableSwappedEvent({
      dragEvent: event,
      swappedElement: event.over,
    });

    this.trigger(swappableSwappedEvent);
  }

  [onDragStop](event) {
    const swappableStopEvent = new SwappableStopEvent({
      dragEvent: event,
    });

    this.trigger(swappableStopEvent);
    this.lastOver = null;
  }
}
