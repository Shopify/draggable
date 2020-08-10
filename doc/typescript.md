# Default usage

```typescript
import {Sortable} from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
});

// The type of the first argument is SortableEventNames
sortable.on('sortable:sort', (evt) => {
  // The type of evt is SortableSortEvent
});

// The type of the first argument is SortableEventNames
sortable.on('drag:out:container', (evt) => {
  // The type of evt is DragOutContainerEvent
});
```

# Using plugins

When creating an instance with plugins with events, you need to manually specify the event names.

```typescript
import {Droppable, Plugins} from '@shopify/draggable';

// 1. import the event names you need
import type {
  DroppableEventNames,
  CollidableEventNames,
} from "@shopify/draggable";

// 2. Specify the event names when create the instance
const droppable = new Droppable<DroppableEventNames | CollidableEventNames>(document.querySelectorAll('.container'), {
  draggable: '.item',
  dropzone: '.dropzone',
  collidables: '.other-list',
  plugins: [Plugins.Collidable],
});

// The type of the first argument can be DroppableEventNames or CollidableEventNames
droppable.on('droppable:dropped', (evt) => {
  // The type of evt is DroppableDroppedEvent
});

// The type of the first argument can be DroppableEventNames or CollidableEventNames
droppable.on('collidable:in', (evt) => {
  // The type of evt is CollidableInEvent
});
```
