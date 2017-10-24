## Drag Sensor

_Draggable does not use this sensor by default_

Picks up browser drag events and triggers the events below on a source container.

- `drag:start`
- `drag:move`
- `drag:stop`

### API

**`new DragSensor(containers: HTMLElement[]|NodeList|HTMLElement, options: Object): DragSensor`**  
To create a mouse sensor, specify the containers it should pay attention to. Sensors will always
trigger sensor events on container element.

**`dragSensor.attach(): void`**  
Attaches sensors to the DOM

**`dragSensor.detach(): void`**  
Detaches sensors to the DOM

### Options

**`delay {Number}`**  
This value will delay touch start

### Known issues

The drag sensor uses the native Drag and Drop API and therefor Draggable does not create
a mirror. This means there is less control over the mirror

### Example

```js
import {Draggable, Sensors} from '@shopify/draggable';

const draggable = new Draggable(containers, {
  sensors: [Sensors.DragSensor],
});

// Remove default mouse sensor
draggable.removeSensor(Sensors.MouseSensor);
```
