## Draggable

### Import

```js
import { Draggable } from '@shopify/draggable';
```

```js
import Draggable from '@shopify/draggable/lib/draggable';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/draggable.bundle.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/draggable.js"></script>
```

### API

**`new Draggable(containers: HTMLElement[]|NodeList|HTMLElement, options: Object): Draggable`**  
To create a draggable instance you need to specify the container(s) that hold draggable items, e.g.
`document.body` would work too. The second argument is an options object, which is described
below.

**`draggable.destroy(): void`**  
Detaches all sensors and listeners, and cleans up after itself.

**`draggable.on(eventName: String, listener: Function): Draggable`**  
Draggable is an event emitter, so you can register callbacks for events. Draggable
also supports method chaining.

**`draggable.off(eventName: String, listener: Function): Draggable`**  
You can unregister listeners by using `.off()`, make sure to provide the same callback.

**`draggable.trigger(event: AbstractEvent): void`**  
You can trigger events through draggable. This is used to fire events internally or by
extensions of Draggable.

**`draggable.addPlugin(plugins: ...typeof Plugin): Draggable`**  
Adds plugins to this draggable instance.

**`draggable.removePlugin(plugins: ...typeof Plugin): Draggable`**  
Removes plugins that are already attached to this draggable instance.

**`draggable.addSensor(sensors: ...typeof Sensor): Draggable`**  
Adds sensors to this draggable instance.

**`draggable.removeSensor(sensors: ...typeof Sensor): Draggable`**  
Removes sensors that are already attached to this draggable instance.

**`draggable.addContainer(containers: ...HTMLElement): Draggable`**  
Adds containers to this draggable instance.

**`draggable.removeContainer(containers: ...HTMLElement): Draggable`**  
Removes containers from this draggable instance.

**`draggable.getClassNameFor(name: String): String`**  
Returns class name for class identifier, check the classes table below for identifiers.

**`draggable.isDragging(): Boolean`**  
Returns true or false, depending on this draggables dragging state.

**`draggable.getDraggableElementsForContainer(container: HTMLElement): HTMLElement[]`**  
Returns draggable elements for given container, excluding potential mirror or original source.

### Options

**`draggable {String}`**  
A css selector for draggable elements within the `containers` specified. By default it will
look for an element with `.draggable-source` class. Default: `.draggable-source`

**`handle {String}`**  
Specify a css selector for a handle element if you don't want to allow drag action
on the entire element. Default: `null`

**`delay {Number}`**  
If you want to delay a drag start you can specify delay in milliseconds. This can be useful
for draggable elements within scrollable containers. Default: `100`

**`distance {Number}`**  
The distance you want the pointer to have moved before drag starts. This can be useful
for clickable draggable elements, such as links. Default: `0`

**`plugins {Plugin[]}`**  
Plugins add behaviour to Draggable by hooking into its life cycle, e.g. one of the default
plugins controls the mirror movement. Default: `[]`

**`sensors {Sensor[]}`**  
Sensors dictate how drag operations get triggered, by listening to native browser events.
By default draggable includes the `MouseSensor` & `TouchSensor`. Default: `[]`

**`classes {Object}`**  
Draggable adds classes to elements to indicate state. These classes can be used to add styling
on elements in certain states.

**`exclude {plugins: Plugin[], sensors: Sensor[]}`**  
Allow excluding default plugins and default sensors. Use with caution as it may create strange behavior.

### Events

| Name                                       | Description                                               | Cancelable | Cancelable action   |
| ------------------------------------------ | --------------------------------------------------------- | ---------- | ------------------- |
| [`draggable:initialize`][draggableinit]    | Gets fired when draggable gets initialized                | false      | -                   |
| [`draggable:destroy`][draggabledest]       | Gets fired when draggable gets destroyed                  | false      | -                   |
| [`drag:start`][dragstart]                  | Gets fired when drag action begins                        | true       | Prevents drag start |
| [`drag:move`][dragmove]                    | Gets fired when moving a draggable around                 | false      | -                   |
| [`drag:over`][dragover]                    | Gets fired when dragging over other draggable             | false      | -                   |
| [`drag:over:container`][dragovercontainer] | Gets fired when dragging over other draggable container   | false      | -                   |
| [`drag:out`][dragout]                      | Gets fired when dragging out of other draggable           | false      | -                   |
| [`drag:out:container`][dragoutcontainer]   | Gets fired when dragging out of other draggable container | false      | -                   |
| [`drag:stop`][dragstop]                    | Gets fired when draggable has been released               | false      | -                   |
| [`drag:pressure`][dragpressure]            | Gets fired when using force touch on draggable element    | false      | -                   |

[draggableinit]: DraggableEvent#draggableinitializedevent
[draggabledest]: DraggableEvent#draggabledestroydevent
[dragstart]: DragEvent#dragstartevent
[dragmove]: DragEvent#dragmoveevent
[dragover]: DragEvent#dragoverevent
[dragovercontainer]: DragEvent#dragovercontainer
[dragout]: DragEvent#dragoutevent
[dragoutcontainer]: DragEvent#dragoutcontainerevent
[dragstop]: DragEvent#dragstopevent
[dragpressure]: DragEvent#dragpressureevent

### Classes

| Name                 | Description                                                         | Default                            |
| -------------------- | ------------------------------------------------------------------- | ---------------------------------- |
| `body:dragging`      | Class added on the document body while dragging                     | `draggable--is-dragging`           |
| `container:dragging` | Class added on the container where the draggable was picked up from | `draggable-container--is-dragging` |
| `source:dragging`    | Class added on the draggable element that has been picked up        | `draggable-source--is-dragging`    |
| `source:placed`      | Class added on the draggable element on `drag:stop`                 | `draggable-source--placed`         |
| `container:placed`   | Class added on the draggable container element on `drag:stop`       | `draggable-container--placed`      |
| `draggable:over`     | Class added on draggable element you are dragging over              | `draggable--over`                  |
| `container:over`     | Class added on draggable container element you are dragging over    | `draggable-container--over`        |
| `source:original`    | Class added on the original source element, which is hidden on drag | `draggable--original`              |
| `mirror`             | Class added on the mirror element                                   | `draggable-mirror`                 |

### Example

This sample code will make list items draggable:

```js
import { Draggable } from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li'
});

draggable.on('drag:start', () => console.log('drag:start'));
draggable.on('drag:move', () => console.log('drag:move'));
draggable.on('drag:stop', () => console.log('drag:stop'));
```

Create draggable which excluded some default plugins and sensor:

```js
import { Draggable } from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
  exclude: {
    plugins: [Draggable.Plugins.Focusable],
    sensors: [Draggable.Sensors.TouchSensor],
  }
});
```
