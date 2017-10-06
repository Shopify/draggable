import Draggable from './Draggable';
import Droppable from './Droppable';
import Swappable from './Swappable';
import Sortable from './Sortable';

import AbstractEvent from './events/abstract-event';
import Snappable from './behaviour/snappable';
import Collidable from './behaviour/collidable';

export {
  Draggable,
  Sortable,
  Swappable,
  Droppable,
  Snappable,
  Collidable,
  AbstractEvent,
};

export function createEventClass(options) {
  function EventConstructor() { return null; }
  EventConstructor.prototype = AbstractEvent.prototype;
  createEventClass.type = options.type;
  return createEventClass;
}
