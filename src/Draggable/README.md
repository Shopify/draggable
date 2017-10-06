## Draggable

### API

**`new Draggable(containers: Array[HTMLElement]|NodeList, options: Object): Draggable`**  
To create a draggable instance you need to specify the containers that hold draggable items, e.g.
`[document.body]` would work too. The second argument is an options object, which is described
below.

**`draggable.on(eventName: String, listener: Function): Draggable`**  
Draggable is an event emitter, so you can register callbacks for events. Draggable
also supports method chaining.

**`draggable.off(eventName: String, listener: Function): Draggable`**  
You can unregister listeners by using `.off()`, make sure to provide the same callback.

**`draggable.trigger(eventName: String, event: AbstractEvent): Draggable`**  
You can trigger events through draggable. This is used to fire events internally or by
extensions of Draggable.

**`draggable.destroy(): void`**  
Detaches all sensors and listeners, and cleans up after itself.

### Options

**`draggable {String}`**  
A css selector for draggable elements within the `containers` specified. By default it will
look for an element with `.draggable-source` class. Default: `.draggable-source`

**`handle {String}`**  
Specify a css selector for a handle element if you don't want to allow drag action
on the entire element. Default: `null`

**`delay {Number}`**  
If you want to delay a drag start you can specify delay in milliseconds. This can be useful
for draggable elements within scrollable containers. Default: `0`

**`native {Boolean}`**  
If enabled Draggable will use the browsers native drag events to detect drag behaviour. By default
it will use mouse events to detect drag behaviour. You can only customize the mirror element when
using mouse events, otherwise mirror will be `null` in events. Default: `false`

**`plugins {Array[Plugin]}`**  
Plugins add behaviour to Draggable by hooking into its life cycle, e.g. one of the default
plugins controls the mirror movement. Default: `[Mirror, Accessibility]`

**`appendTo {String|HTMLElement|Function}`**  
Draggable allows you to specify where the mirror should be appended to. You can specify a css
selector, a HTMLElement or a function that returns a HTMLElement

**`classes {Object}`**  
Draggable adds classes to elements to indicate state. These classes can be used to add styling
on elements in certain states.

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `drag:start`          | Gets fired when drag action begins                         | true        | Prevents drag start  |
| `drag:move`           | Gets fired when moving a draggable around                  | false       | -                    |
| `drag:over`           | Gets fired when dragging over other draggable              | false       | -                    |
| `drag:over:container` | Gets fired when dragging over other draggable container    | false       | -                    |
| `drag:out`            | Gets fired when dragging out of other draggable            | false       | -                    |
| `drag:out:container`  | Gets fired when dragging out of other draggable container  | false       | -                    |
| `drag:stop`           | Gets fired when draggable has been released                | false       | -                    |
| `drag:pressure`       | Gets fired when using force touch on draggable element     | false       | -                    |
| `mirror:created`      | Gets fired when draggable mirror gets created              | false       | -                    |
| `mirror:attached`     | Gets fired when draggable mirror gets attached to DOM      | false       | -                    |
| `mirror:move`         | Gets fired when draggable mirror moves                     | true        | Stop mirror movement |

### Classes

| Name                 | Description                                                          | Default                            |
| -------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| `body:dragging`      | Class added on the document body while dragging                      | `draggable--is-dragging`           |
| `container:dragging` | Class added on the container where the draggable was picked up from  | `draggable-container--is-dragging` |
| `source:dragging`    | Class added on the draggable element that has been picked up         | `draggable-source--is-dragging`    |
| `source:placed`      | Class added on the draggable element on `drag:stop`                  | `draggable-source--placed`         |
| `container:placed`   | Class added on the draggable container element on `drag:stop`        | `draggable-container--placed`      |
| `draggable:over`     | Class added on draggable element you are dragging over               | `draggable--over`                  |
| `container:over`     | Class added on draggable container element you are dragging over     | `draggable-container--over`        |
| `mirror`             | Class added on the mirror element                                    | `draggable-mirror`                 |

### Example

This sample code will make list items draggable:

```js
import {Draggable} from '@shopify/draggable';

new Draggable(document.querySelectorAll('ul'))
  .on('drag:start', () => console.log('drag:start'))
  .on('drag:move',  () => console.log('drag:move'))
  .on('drag:stop',  () => console.log('drag:stop'));
```
