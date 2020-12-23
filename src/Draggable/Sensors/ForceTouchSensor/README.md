## Force Touch Sensor

**WORK IN PROGRESS**

_Draggable does not use this sensor by default_

Picks up browser force touch events and triggers the events below on a source container.
This sensor only works for Macbook Pros with force touch trackpads

- `drag:start`
- `drag:move`
- `drag:stop`
- `drag:pressure`

### API

**`new ForceTouchSensor(containers: HTMLElement[]|NodeList|HTMLElement, options: Object): ForceTouchSensor`**  
To create a force touch sensor, specify the containers it should pay attention to. Sensors will always
trigger sensor events on container element.

**`forceTouchSensor.attach(): void`**  
Attaches sensors to the DOM

**`forceTouchSensor.detach(): void`**  
Detaches sensors to the DOM

### Options

**`draggable {String}`**  
A css selector for draggable elements within the `containers` specified.

**`delay {Number}`**  
This value will delay force touch start

**`handle {String}`**  
Specify a css selector for a handle element if you don't want to allow drag action on the entire element.

### Example

```js
import {Draggable, Sensors} from '@shopify/draggable';

const draggable = new Draggable(containers, {
  sensors: [Sensors.ForceTouchSensor],
});
```

### Caveats

- When used in Safari with force touch track pad, make sure to add visual guidelines to the user to indicate that force needs to be used to start drag operation.
