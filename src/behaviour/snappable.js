import {
  SnapInEvent,
  SnapOutEvent,
} from './../events/snappable-event';

export default class Snappable {
  constructor(draggable) {
    this.draggable = draggable;

    this._onDragStart = this._onDragStart.bind(this);
    this._onDragStop = this._onDragStop.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragOut = this._onDragOut.bind(this);
  }

  attach() {
    this.draggable
      .on('drag:start', this._onDragStart)
      .on('drag:stop', this._onDragStop)
      .on('drag:over', this._onDragOver)
      .on('drag:out', this._onDragOut)
      .on('droppable:over', this._onDragOver)
      .on('droppable:out', this._onDragOut);
  }

  detach() {
    this.draggable
      .off('drag:start', this._onDragStart)
      .off('drag:stop', this._onDragStop)
      .off('drag:over', this._onDragOver)
      .off('drag:out', this._onDragOut)
      .off('droppable:over', this._onDragOver)
      .off('droppable:out', this._onDragOut);
  }

  _onDragStart(event) {
    if (event.canceled()) {
      return;
    }

    this.firstSource = event.source;
  }

  _onDragStop() {
    this.firstSource = null;
  }

  _onDragOver(event) {
    if (event.canceled()) {
      return;
    }

    const source = event.source || event.dragEvent.source;
    const mirror = event.mirror || event.dragEvent.mirror;

    if (source === this.firstSource) {
      this.firstSource = null;
      return;
    }

    const snapInEvent = new SnapInEvent({
      dragEvent: event,
    });

    this.draggable.triggerEvent(snapInEvent);

    if (snapInEvent.canceled()) {
      return;
    }

    if (mirror) {
      mirror.style.display = 'none';
    }

    source.classList.remove(this.draggable.getClassNameFor('source:dragging'));
    source.classList.add(this.draggable.getClassNameFor('source:placed'));

    setTimeout(() => {
      source.classList.remove(this.draggable.getClassNameFor('source:placed'));
    }, this.draggable.options.placedTimeout);
  }

  _onDragOut(event) {
    if (event.canceled()) {
      return;
    }

    const mirror = event.mirror || event.dragEvent.mirror;
    const source = event.source || event.dragEvent.source;

    const snapOutEvent = new SnapOutEvent({
      dragEvent: event,
    });

    this.draggable.triggerEvent(snapOutEvent);

    if (snapOutEvent.canceled()) {
      return;
    }

    if (mirror) {
      mirror.style.display = '';
    }

    source.classList.add(this.draggable.getClassNameFor('source:dragging'));
  }
}
