import {DragOutEvent, DragOverEvent, DragStartEvent} from 'Draggable/DragEvent';
import {MirrorCreatedEvent} from 'Draggable/Plugins/Mirror/MirrorEvent';
import AbstractPlugin from 'shared/AbstractPlugin';
import {SnapInEvent, SnapOutEvent} from './SnappableEvent';

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
  mirror: HTMLElement = null;

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
    if (event.canceled()) return;
    this.firstSource = event.source;
  };

  private [onDragStop] = () => {
    this.firstSource = null;
  };

  private [onDragOver] = (event: DragOverEvent | DroppableOverEvent) => {
    if (event.canceled()) return;

    const source = event.source || event.dragEvent.source;

    if (source === this.firstSource) {
      this.firstSource = null;
      return;
    }

    const snapInEvent = new SnapInEvent({
      dragEvent: event,
      snappable: event.over || event.droppable,
    });

    this.draggable.trigger(snapInEvent);

    if (snapInEvent.canceled()) return;

    if (this.mirror) this.mirror.style.display = 'none';

    source.classList.remove(...this.draggable.getClassNamesFor('source:dragging'));
    source.classList.add(...this.draggable.getClassNamesFor('source:placed'));

    // Need to cancel this in drag out
    setTimeout(() => {
      source.classList.remove(...this.draggable.getClassNamesFor('source:placed'));
    }, this.draggable.options.placedTimeout);
  };

  private [onDragOut] = (event: DragOutEvent | DroppableOutEvent) => {
    if (event.canceled()) return;

    const source = event.source || event.dragEvent.source;

    const snapOutEvent = new SnapOutEvent({
      dragEvent: event,
      snappable: event.over || event.droppable,
    });

    this.draggable.trigger(snapOutEvent);

    if (snapOutEvent.canceled()) return;
    if (this.mirror) this.mirror.style.display = '';

    source.classList.add(...this.draggable.getClassNamesFor('source:dragging'));
  };

  private [onMirrorCreated] = ({mirror}: MirrorCreatedEvent) => {
    this.mirror = mirror;
  };

  private [onMirrorDestroy] = () => {
    this.mirror = null;
  };
}
