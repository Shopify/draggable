## Droppable

Droppable allows you to declare draggable and droppable elements via options.
Droppable fires two events on top of the draggable events: `droppable:over` and `droppable:out`.

### API

**`new Droppable(containers: Array[HTMLElement]|NodeList, options: Object): Droppable`**  
To create a droppable instance you need to specify the containers that hold draggable items, e.g.
`[document.body]` would work too. The second argument is an options object, which is described
below.

**`droppable.on(eventName: String, listener: Function): Droppable`**  
Droppable uses Draggables event emitter, so you can register callbacks for events. Droppable
also supports method chaining.

**`droppable.off(eventName: String, listener: Function): Droppable`**  
You can unregister listeners by using `.off()`, make sure to provide the same callback.

**`droppable.trigger(eventName: String, event: AbstractEvent): Droppable`**  
You can trigger events through droppable. This is used to fire events internally or by
extensions of Draggable.

**`droppable.destroy(): void`**  
Detaches all sensors and listeners, and cleans up after itself.

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

droppable.on('droppable:over', () => console.log('droppable:over'))
droppable.on('droppable:out', () => console.log('droppable:out'));
```
