## Swappable

Droppable is built on top of Draggable and allows you to swap elements by dragging over them. No order will be maintained (unlike Sortable),
so any draggable element that gets dragged over will be swapped with the source element.

### API

Check out Draggables API for the base API

### Options

Check out Draggables options for the base options

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `swappable:start`     | Gets fired when starting to drag                           | true        | Prevents drag        |
| `swappable:swapped`   | Gets fired before the source gets swapped                  | true        | Prevents swap        |
| `swappable:stop`      | Gets fired when dragging out of a droppable element        | false       | -                    |

### Classes

Check out Draggables class identifiers

### Example

This sample code will make list items draggable and allows you to swap them with other draggable elements:

```js
import {Swappable} from '@shopify/draggable';

const swappable = new Swappable(document.querySelectorAll('ul'), {
  draggable: 'li',
});

swappable.on('swappable:start', () => console.log('swappable:start'))
swappable.on('swappable:swapped', () => console.log('swappable:swapped'));
swappable.on('swappable:stop', () => console.log('swappable:stop'));
```
