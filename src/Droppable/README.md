## Droppable

Droppable is built on top of Draggable and allows you to declare draggable and droppable elements via options.
Droppable fires two events on top of the draggable events: `droppable:over` and `droppable:out`.

### API

Check out Draggables API for the base API

### Options

**`droppable {String|Array[HTMLElement]|NodeList|Function}`**  
A css selector string, an array of elements, a NodeList or a function returning elements for droppable
elements within the `containers` specified.

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `droppable:over`      | Gets fired when dragging over droppable element            | true        | Prevents drop        |
| `droppable:out`       | Gets fired when dragging out of a droppable element        | true        | Prevents release     |

### Classes

| Name                 | Description                                                          | Default                            |
| -------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| `droppable:active`   | Class added on droppables when drag starts                           | `draggable-droppable--active`      |
| `droppable:occupied` | Class added on droppable element, when it contains a draggable       | `draggable-droppable--occupied`    |

### Example

This sample code will make list items draggable and allows to drop them inside another element:

```js
import {Droppable} from '@shopify/draggable';

const droppable = new Droppable(document.querySelectorAll('ul'), {
  draggable: 'li',
  droppable: '#dropzone',
});

droppable.on('droppable:over', () => console.log('droppable:over'));
droppable.on('droppable:out', () => console.log('droppable:out'));
```
