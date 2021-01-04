## Sensor

Base sensor which includes a minimal API. Inherit from this class to create your own
custom sensor.

Currently triggers these sensor events:

- `drag:start`
- `drag:move`
- `drag:stop`
- `drag:pressure`

### API

**`new Sensor(containers: HTMLElement[]|NodeList|HTMLElement, options: Object): Sensor`**  
To create a sensor, specify the containers it should pay attention to. Sensors will always
trigger sensor events on container element.

**`sensor.attach(): void`**  
Attaches sensors to the DOM

**`sensor.detach(): void`**  
Detaches sensors to the DOM

**`sensor.trigger(element: HTMLElement, sensorEvent: SensorEvent): void`**  
Triggers sensor event on container element

### Options

**`draggable {String}`**  
A css selector for draggable elements within the `containers` specified.

**`delay {Number}`**  
This value will delay drag start.

**`distance {Number}`**  
The distance you want the pointer to have moved before drag starts.

**`handle {String}`**  
Specify a css selector for a handle element if you don't want to allow drag action on the entire element.
