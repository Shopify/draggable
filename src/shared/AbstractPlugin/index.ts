import Draggable from 'Draggable';

/** All draggable plugins inherit from this class. */
export default class AbstractPlugin {
  /*** Draggable instance */
  draggable: Draggable;

  constructor(draggable: Draggable) {
    this.draggable = draggable;
  }

  /** Override to add listeners */
  attach() {
    throw new Error('Not Implemented');
  }

  /* Override to remove listeners */
  detach() {
    throw new Error('Not Implemented');
  }
}
