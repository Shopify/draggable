## Mouse Sensor

_Draggable uses this sensor by default_

Picks up browser mouse events and triggers the events below on a source container.

- `drag:start`
- `drag:move`
- `drag:stop`

### API

**`new MouseSensor(containers: HTMLElement[]|NodeList|HTMLElement, options: Object): MouseSensor`**  
To create a mouse sensor, specify the containers it should pay attention to. Sensors will always
trigger sensor events on container element.

**`mouseSensor.attach(): void`**  
Attaches sensors to the DOM

**`mouseSensor.detach(): void`**  
Detaches sensors to the DOM

### Options

**`delay {Number}`**  
This value will delay touch start
