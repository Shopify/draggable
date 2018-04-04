## Droppable

Droppable is built on top of Draggable and allows you to declare draggable and droppable elements via options.
Droppable fires two events on top of the draggable events: `droppable:dropped` and `droppable:returned`.

### Import

```js
import { Droppable } from '@shopify/draggable';
```

```js
import Droppable from '@shopify/draggable/lib/droppable';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/draggable.bundle.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/droppable.js"></script>
```

### API

Check out [Draggables API](../Draggable#api) for the base API

### Options

Check out [Draggables options](../Draggable#options) for the base options

**`dropzone {String|HTMLElement[]|NodeList|Function}`**  
A css selector string, an array of elements, a NodeList or a function returning elements for dropzone
elements within the `containers`.

### Events

Check out [Draggables events](../Draggable#events) for base events

| Name                                      | Description                                                     | Cancelable | Cancelable action |
| ----------------------------------------- | --------------------------------------------------------------- | ---------- | ----------------- |
| [`droppable:dropped`][droppabledropped]   | Gets fired when dropping draggable element into a dropzone      | true       | Prevents drop     |
| [`droppable:returned`][droppablereturned] | Gets fired when draggable elements returns to original dropzone | true       | Prevents return   |

[droppabledropped]: DroppableEvent#droppabledroppedevent
[droppablereturned]: DroppableEvent#droppablereturnedevent

### Classes

Check out [Draggables class identifiers](../Draggable#classes)

| Name                 | Description                                                    | Default                         |
| -------------------- | -------------------------------------------------------------- | ------------------------------- |
| `droppable:active`   | Class added on droppables when drag starts                     | `draggable-droppable--active`   |
| `droppable:occupied` | Class added on droppable element, when it contains a draggable | `draggable-droppable--occupied` |

### Example

This sample code will make list items draggable and allows to drop them inside another element:

```js
import { Droppable } from '@shopify/draggable';

const droppable = new Droppable(document.querySelectorAll('ul'), {
  draggable: 'li',
  dropzone: '#dropzone'
});

droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
droppable.on('droppable:returned', () => console.log('droppable:returned'));
```
