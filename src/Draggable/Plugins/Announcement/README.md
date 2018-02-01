## Announcement

The Announcement plugin listens to _all_ draggable events and allows you to define announcements via options for events
that are read back through a screen reader.

### API

**`new Announcement(draggable: Draggable): Announcement`**  
To create an announcement plugin instance.

### Options

**`expire {Number}`**  
How long messages should stay inside the live region (in milliseconds). Default: `7000`

**`'drag:start' {String|Function:String}`**  
Define an announcement on `drag:start`. Default: `Picked up draggable element`

**`'drag:stop' {String|Function:String}`**  
Define an announcement on `drag:stop`. Default: `Dropped draggable element`

**`'sortable:sorted' {String|Function:String}`**  
Define an announcement on `sortable:sorted`. No default

**`'swappable:swapped' {String|Function:String}`**  
Define an announcement on `swappable:swapped`. No default

**`'droppable:dropped' {String|Function:String}`**  
Define an announcement on `droppable:dropped`. No default

_And any other events you can think of..._

### Examples

#### Static messages

```js
import {Sortable} from '@shopify/draggable';

const announcements = {
  'drag:start': 'Draggable element picked up',
  'drag:stop': 'Draggable element dropped',
  'sortable:stopped': 'Draggable elements swapped',
}

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  announcements,
});
```

#### Dynamic messages

```js
import {Sortable} from '@shopify/draggable';

const announcements = {
  'drag:start': (dragEvent) => {
    return `Picked up ${dragEvent.source.getAttribute('data-name')}`;
  },

  'drag:stop': (dragEvent) => {
    return `Dropped ${dragEvent.source.getAttribute('data-name')}`
  },

  'sortable:sorted': (sortableEvent) => {
    return `Sorted ${sortableEvent.dragEvent.source.getAttribute('data-name')} with ${sortableEvent.dragEvent.over.getAttribute('data-name')}`;
  },
}

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  announcements,
});
```
