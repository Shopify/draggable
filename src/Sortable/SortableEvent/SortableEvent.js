import AbstractEvent from 'shared/AbstractEvent';

/**
 * Base sortable event
 * @class SortableEvent
 * @module SortableEvent
 * @extends AbstractEvent
 */
export class SortableEvent extends AbstractEvent {
  static type = 'sortable';

  /**
   * Original drag event that triggered this sortable event
   * @property dragEvent
   * @type {DragEvent}
   * @readonly
   */
  get dragEvent() {
    return this.data.dragEvent;
  }
}

/**
 * Sortable start event
 * @class SortableStartEvent
 * @module SortableStartEvent
 * @extends SortableEvent
 */
export class SortableStartEvent extends SortableEvent {
  static type = 'sortable:start';
  static cancelable = true;

  /**
   * Start index of source on sortable start
   * @property startIndex
   * @type {Number}
   * @readonly
   */
  get startIndex() {
    return this.data.startIndex;
  }

  /**
   * Start container on sortable start
   * @property startContainer
   * @type {HTMLElement}
   * @readonly
   */
  get startContainer() {
    return this.data.startContainer;
  }
}

/**
 * Sortable sort event
 * @class SortableSortEvent
 * @module SortableSortEvent
 * @extends SortableEvent
 */
export class SortableSortEvent extends SortableEvent {
  static type = 'sortable:sort';
  static cancelable = true;

  /**
   * Index of current draggable element
   * @property currentIndex
   * @type {Number}
   * @readonly
   */
  get currentIndex() {
    return this.data.currentIndex;
  }

  /**
   * Draggable element you are hovering over
   * @property over
   * @type {HTMLElement}
   * @readonly
   */
  get over() {
    return this.data.oldIndex;
  }

  /**
   * Draggable container element you are hovering over
   * @property overContainer
   * @type {HTMLElement}
   * @readonly
   */
  get overContainer() {
    return this.data.newIndex;
  }
}

/**
 * Sortable sorted event
 * @class SortableSortedEvent
 * @module SortableSortedEvent
 * @extends SortableEvent
 */
export class SortableSortedEvent extends SortableEvent {
  static type = 'sortable:sorted';

  /**
   * Index of last sorted event
   * @property oldIndex
   * @type {Number}
   * @readonly
   */
  get oldIndex() {
    return this.data.oldIndex;
  }

  /**
   * New index of this sorted event
   * @property newIndex
   * @type {Number}
   * @readonly
   */
  get newIndex() {
    return this.data.newIndex;
  }

  /**
   * Old container of draggable element
   * @property oldContainer
   * @type {HTMLElement}
   * @readonly
   */
  get oldContainer() {
    return this.data.oldContainer;
  }

  /**
   * New container of draggable element
   * @property newContainer
   * @type {HTMLElement}
   * @readonly
   */
  get newContainer() {
    return this.data.newContainer;
  }
}

/**
 * Sortable stop event
 * @class SortableStopEvent
 * @module SortableStopEvent
 * @extends SortableEvent
 */
export class SortableStopEvent extends SortableEvent {
  static type = 'sortable:stop';

  /**
   * Original index on sortable start
   * @property oldIndex
   * @type {Number}
   * @readonly
   */
  get oldIndex() {
    return this.data.oldIndex;
  }

  /**
   * New index of draggable element
   * @property newIndex
   * @type {Number}
   * @readonly
   */
  get newIndex() {
    return this.data.newIndex;
  }

  /**
   * Original container of draggable element
   * @property oldContainer
   * @type {HTMLElement}
   * @readonly
   */
  get oldContainer() {
    return this.data.oldContainer;
  }

  /**
   * New container of draggable element
   * @property newContainer
   * @type {HTMLElement}
   * @readonly
   */
  get newContainer() {
    return this.data.newContainer;
  }
}
