## Touch Sensor

_Draggable uses this sensor by default_

Picks up browser touch events and triggers the events below on a source container.

- `drag:start`
- `drag:move`
- `drag:stop`

### API

**`new TouchSensor(containers: HTMLElement[]|NodeList|HTMLElement, options: Object): TouchSensor`**  
To create a touch sensor, specify the containers it should pay attention to. Sensors will always
trigger sensor events on container element.

**`touchSensor.attach(): void`**  
Attaches sensors to the DOM

**`touchSensor.detach(): void`**  
Detaches sensors to the DOM

### Options

**`delay {Number}`**  
This value will delay touch start
