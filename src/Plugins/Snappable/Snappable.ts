import {
  DragOutEvent,
  DragOverEvent,
  DragStartEvent,
  MirrorCreatedEvent,
} from '../../Draggable';
import { DroppableEvent, DroppableStopEvent } from '../../Droppable';
import AbstractPlugin from '../../shared/AbstractPlugin';
import { SnapInEvent, SnapOutEvent } from './SnappableEvent';

const onDragStart = Symbol('onDragStart');
const onDragStop = Symbol('onDragStop');
const onDragOver = Symbol('onDragOver');
const onDragOut = Symbol('onDragOut');
const onMirrorCreated = Symbol('onMirrorCreated');
const onMirrorDestroy = Symbol('onMirrorDestroy');

/**
 * Snappable plugin which snaps draggable elements into place
 * @class Snappable
 * @module Snappable
 * @extends AbstractPlugin
 */
export default class Snappable extends AbstractPlugin {
  /*** Keeps track of the first source element */
  firstSource: HTMLElement | null = null;
  /*** Keeps track of the mirror element */
  mirror: HTMLElement | null = null;

  attach() {
    this.draggable
      .on('drag:start', this[onDragStart])
      .on('drag:stop', this[onDragStop])
      .on('drag:over', this[onDragOver])
      .on('drag:out', this[onDragOut])
      .on('droppable:over', this[onDragOver])
      .on('droppable:out', this[onDragOut])
      .on('mirror:created', this[onMirrorCreated])
      .on('mirror:destroy', this[onMirrorDestroy]);
  }

  detach() {
    this.draggable
      .off('drag:start', this[onDragStart])
      .off('drag:stop', this[onDragStop])
      .off('drag:over', this[onDragOver])
      .off('drag:out', this[onDragOut])
      .off('droppable:over', this[onDragOver])
      .off('droppable:out', this[onDragOut])
      .off('mirror:created', this[onMirrorCreated])
      .off('mirror:destroy', this[onMirrorDestroy]);
  }

  private [onDragStart] = (event: DragStartEvent) => {
    if (event.defaultPrevented) return;
    this.firstSource = event.source;
  };

  private [onDragStop] = () => {
    this.firstSource = null;
  };

  private [onDragOver] = (event: DragOverEvent | DroppableEvent) => {
    if (event.defaultPrevented) return;

    const source =
      (<DragOverEvent>event).source ?? (<DroppableEvent>event).dragEvent.source;

    if (source === this.firstSource) {
      this.firstSource = null;
      return;
    }

    const snapInEvent = new SnapInEvent({
      dragEvent: event instanceof DroppableEvent ? event.dragEvent : event,
      snappable:
        (<DragOverEvent>event).over ?? (<DroppableEvent>event).droppable,
    });

    this.draggable.trigger(snapInEvent);

    if (snapInEvent.defaultPrevented) return;

    if (this.mirror) this.mirror.style.display = 'none';

    source.classList.remove(
      ...this.draggable.getClassNamesFor('source:dragging')
    );
    source.classList.add(...this.draggable.getClassNamesFor('source:placed'));

    // Need to cancel this in drag out
    setTimeout(() => {
      source?.classList.remove(
        ...this.draggable.getClassNamesFor('source:placed')
      );
    }, this.draggable.options.placedTimeout);
  };

  private [onDragOut] = (event: DragOutEvent | DroppableStopEvent) => {
    if (event.defaultPrevented) return;

    const source =
      (<DragOutEvent>event).source ??
      (<DroppableStopEvent>event).dragEvent.source;

    const snapOutEvent = new SnapOutEvent({
      dragEvent: event instanceof DroppableStopEvent ? event.dragEvent : event,
      snappable:
        (<DragOutEvent>event).over ?? (<DroppableStopEvent>event).droppable,
    });

    this.draggable.trigger(snapOutEvent);

    if (snapOutEvent.defaultPrevented) return;
    if (this.mirror) this.mirror.style.display = '';

    source.classList.add(...this.draggable.getClassNamesFor('source:dragging'));
  };

  private [onMirrorCreated] = ({ mirror }: MirrorCreatedEvent) => {
    this.mirror = mirror;
  };

  private [onMirrorDestroy] = () => {
    this.mirror = null;
  };
}
