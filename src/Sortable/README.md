## Sortable

Sortable is built on top of Draggable and allows you to reorder elements. It maintains the order internally and fires
three events on top of the draggable events: `sortable:start`, `sortable:sorted` and `sortable:stop`.

### API

Check out Draggables API for the base API

### Options

Check out Draggables options for the base options

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `sortable:start`      | Gets fired when drag action begins                         | true        | Prevents drag start  |
| `sortable:sorted`     | Gets fired when the source gets sorted in the DOM          | false       | -                    |
| `sortable:stop`       | Gets fired when dragging over other draggable              | false       | -                    |

### Classes

Check out Draggables class identifiers

### Example

This sample code will make list items sortable:

```js
import {Sortable} from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
});

sortable.on('sortable:start', () => console.log('sortable:start'));
sortable.on('sortable:sorted', () => console.log('sortable:sorted'));
sortable.on('sortable:stop', () => console.log('sortable:stop'));
```
