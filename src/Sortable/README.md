## Sortable

Sortable allows you to reorder elements. It maintains the order internally and fires
three events on top of the draggable events: `sortable:start`, `sortable:sorted` and `sortable:stop`.

### API

**`new Sortable(containers: Array[HTMLElement]|NodeList, options: Object): Sortable`**  
To create a sortable instance you need to specify the containers that hold draggable items, e.g.
`[document.body]` would work too. The second argument is an options object, which is described
below.

**`sortable.on(eventName: String, listener: Function): Sortable`**  
Sortable uses Draggables event emitter, so you can register callbacks for events. Sortable
also supports method chaining.

**`sortable.off(eventName: String, listener: Function): Sortable`**  
You can unregister listeners by using `.off()`, make sure to provide the same callback.

**`sortable.trigger(eventName: String, event: AbstractEvent): Sortable`**  
You can trigger events through sortable. This is used to fire events internally or by
extensions of Draggable.

**`sortable.destroy(): void`**  
Detaches all sensors and listeners, and cleans up after itself.

### Options

__Same as Draggable__

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `sortable:start`      | Gets fired when drag action begins                         | true        | Prevents drag start  |
| `sortable:sorted`     | Gets fired when the source gets sorted in the DOM          | false       | -                    |
| `sortable:stop`       | Gets fired when dragging over other draggable              | false       | -                    |

### Classes

__Same as Draggable__

### Example

This sample code will make list items draggable:

```js
import {Sortable} from '@shopify/draggable';

new Sortable(document.querySelectorAll('ul'))
  .on('sortable:start', () => console.log('sortable:start'))
  .on('sortable:sorted', () => console.log('sortable:sorted'))
  .on('sortable:stop', () => console.log('sortable:stop'));
```
