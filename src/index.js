import Draggable from './draggable';
import Sortable from './sortable';
import Swappable from './swappable';
import Droppable from './droppable';
import AbstractEvent from './events/abstract-event';

export {Draggable};
export {Sortable};
export {Swappable};
export {Droppable};
export {AbstractEvent};

export function createEventClass(options) {
  function EventConstructor() { return null; }
  EventConstructor.prototype = AbstractEvent.prototype;
  createEventClass.type = options.type;
  return createEventClass;
}
