import Draggable from '../../Draggable';

export default class AbstractPlugin {
  draggable: Draggable;

  constructor(draggable: Draggable) {
    this.draggable = draggable;
  }

  attach() {
    throw new Error('Not Implemented');
  }

  detach() {
    throw new Error('Not Implemented');
  }
}
