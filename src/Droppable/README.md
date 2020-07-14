## Droppable

Droppable is built on top of Draggable and allows you to declare draggable and droppable elements via options.
Droppable fires two events on top of the draggable events: `droppable:dropped` and `droppable:returned`.
Droppable elements must begin in an occupied dropzone (see below, [Classes](#classes) and example),
so they may returned if the drag is canceled or returned.

### Import

```js
import { Droppable } from '@shopify/draggable';
```

```js
import Droppable from '@shopify/draggable/lib/droppable';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/draggable.bundle.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/droppable.js"></script>
```

### API

Check out [Draggable API](../Draggable#api) for the base API

### Options

Check out [Draggable options](../Draggable#options) for the base options

**`dropzone {String|HTMLElement[]|NodeList|Function}`**
A css selector string, an array of elements, a NodeList or a function returning elements for dropzone
elements within the `containers`.

### Events

Check out [Draggable events](../Draggable#events) for the base events

| Name                                      | Description                                                     | Cancelable | Cancelable action |
| ----------------------------------------- | --------------------------------------------------------------- | ---------- | ----------------- |
| [`droppable:dropped`][droppabledropped]   | Gets fired when dropping draggable element into a dropzone      | true       | Prevents drop     |
| [`droppable:returned`][droppablereturned] | Gets fired when draggable elements returns to original dropzone | true       | Prevents return   |

[droppabledropped]: DroppableEvent#droppabledroppedevent
[droppablereturned]: DroppableEvent#droppablereturnedevent

### Classes

Check out [Draggable class identifiers](../Draggable#classes) for the base class identifiers

| Name                 | Description                                                                    | Default                         |
| -------------------- | ------------------------------------------------------------------------------ | ------------------------------- |
| `droppable:active`   | Class added to the unoccupied dropzone elements when drag starts               | `draggable-droppable--active`   |
| `droppable:occupied` | Class added to the dropzone element when it contains a draggable element       | `draggable-droppable--occupied` |

### Example

This sample HTML and JavaScript will make `.item` elements draggable and droppable among all `.dropzone` elements:

```html
<div class="container">
  <div class="dropzone draggable-dropzone--occupied"><div class="item">A</div></div>
  <div class="dropzone draggable-dropzone--occupied"><div class="item">B</div></div>
  <div class="dropzone draggable-dropzone--occupied"><div class="item">C</div></div>
</div>

<div class="container">
  <div class="dropzone"></div>
</div>

<style>
  .item { height: 100%; }
  .dropzone { outline: solid 1px; height: 50px; }
  .draggable-dropzone--occupied { background: lightgreen; }
</style>
```

```js
import { Droppable } from '@shopify/draggable';

const droppable = new Droppable(document.querySelectorAll('.container'), {
  draggable: '.item',
  dropzone: '.dropzone'
});

droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
droppable.on('droppable:returned', () => console.log('droppable:returned'));
```
