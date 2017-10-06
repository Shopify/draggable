## Swappable

Swappable allows you to swap elements by dragging over them. No order will be maintained (unlike Sortable),
so any draggable element that gets dragged over will be swapped with the source element.

### API

**`new Swappable(containers: Array[HTMLElement]|NodeList, options: Object): Swappable`**  
To create a swappable instance you need to specify the containers that hold draggable items, e.g.
`[document.body]` would work too. The second argument is an options object, which is described
below.

**`swappable.on(eventName: String, listener: Function): Swappable`**  
Swappable uses Draggables event emitter, so you can register callbacks for events. Swappable
also supports method chaining.

**`swappable.off(eventName: String, listener: Function): Swappable`**  
You can unregister listeners by using `.off()`, make sure to provide the same callback.

**`swappable.trigger(eventName: String, event: AbstractEvent): Swappable`**  
You can trigger events through swappable. This is used to fire events internally or by
extensions of Draggable.

**`droppable.destroy(): void`**  
Detaches all sensors and listeners, and cleans up after itself.

### Options

__Same as Draggable__

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `swappable:start`     | Gets fired when starting to drag                           | true        | Prevents drag        |
| `swappable:swapped`   | Gets fired before the source gets swapped                  | true        | Prevents swap        |
| `swappable:stop`      | Gets fired when dragging out of a droppable element        | false       | -                    |

### Classes

__Same as Draggable__

### Example

This sample code will make list items draggable and allows to drop them inside another element:

```js
import {Swappable} from '@shopify/draggable';

const swappable = new Swappable(document.querySelectorAll('ul'), {
  draggable: 'li',
});

swappable.on('swappable:start', () => console.log('swappable:start'))
swappable.on('swappable:swapped', () => console.log('swappable:swapped'));
swappable.on('swappable:stop', () => console.log('swappable:stop'));
```
