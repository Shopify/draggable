## SensorEvent

The base sensor event for all Sensor events that sensors emits.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Interface**         | `SensorEvent`                                              |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `sensor`                                                   |

### API

**`sensorEvent.originalEvent: Event`**  
Read-only property for the original event that triggered the sensor event.

**`sensorEvent.clientX: Number`**  
Read-only property for current X coordinates.

**`sensorEvent.clientY: Number`**  
Read-only property for current Y coordinates.

**`sensorEvent.target: HTMLElement`**  
Read-only property for the normalized target for both touch and mouse events.
Returns the element that is behind cursor or touch pointer.

**`sensorEvent.container: Number`**  
Read-only property for the container that fired the sensor event

**`sensorEvent.pressure: Number`**  
Read-only property for the pressure applied

## DragStartSensorEvent

`DragStartSensorEvent` gets triggered by sensors for drag start.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SensorEvent`                                              |
| **Interface**         | `DragStartSensorEvent`                                     |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Prevents drag start                                        |
| **type**              | `drag:start`                                               |

## DragMoveSensorEvent

`DragMoveSensorEvent` gets triggered by sensors for drag move.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SensorEvent`                                              |
| **Interface**         | `DragMoveSensorEvent`                                      |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `drag:move`                                                |

## DragStopSensorEvent

`DragStopSensorEvent` gets triggered by sensors for drag stop.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SensorEvent`                                              |
| **Interface**         | `DragStopSensorEvent`                                      |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `drag:stop`                                                |

## DragPressureSensorEvent

`DragPressureSensorEvent` gets triggered by sensors for drag pressure.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SensorEvent`                                              |
| **Interface**         | `DragPressureSensorEvent`                                  |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `drag:pressure`                                            |
