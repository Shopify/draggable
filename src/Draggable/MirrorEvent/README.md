## MirrorEvent

The base mirror event for all Mirror events that `Draggable` emits.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Interface**         | `MirrorEvent`                                              |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `mirror`                                                   |

### API

**`mirrorEvent.source: HTMLElement`**  
Read-only property for the source element. This is a straight copy of the `originalSource`
element, which can be moved around in the DOM.

**`mirrorEvent.originalSource: String`**  
Read-only property for the original source element that was picked up. This element never
moves in the DOM and gets hidden on `drag:start`.

**`mirrorEvent.mirror: String`**  
Read-only property for the mirror element, which is also a copy of the `originalSource` element.
The mirror follows your mouse/touch movements.

**`mirrorEvent.sourceContainer: String`**  
Read-only property for the source elements container. This would be one of the containers that
was passed into Draggable.

**`mirrorEvent.sensorEvent: SensorEvent`**  
Read-only property for the original sensor event that triggered this event.

**`mirrorEvent.originalEvent: SensorEvent`**  
Read-only property for the original event  that triggered the sensor event.

**`mirrorEvent.hasMirror(): Boolean`**  
Checks if a mirror has been created. The mirror does not get created for `DragSensor` or `KeyboardSensor` events

## MirrorCreatedEvent

`MirrorCreatedEvent` gets triggered by `Draggable` when the mirror element has
been created.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `MirrorEvent`                                              |
| **Interface**         | `MirrorCreatedEvent`                                       |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `mirror:created`                                           |

## MirrorAttachedEvent

`MirrorAttachedEvent` gets triggered when the mirror has been appended to the DOM.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `MirrorEvent`                                              |
| **Interface**         | `MirrorAttachedEvent`                                      |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `mirror:attached`                                          |

## MirrorMoveEvent

`MirrorMoveEvent` gets triggered when moving the mirror around.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `MirrorEvent`                                              |
| **Interface**         | `MirrorMoveEvent`                                          |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Stops mirror movement                                      |
| **type**              | `drag:over`                                                |

## MirrorDestroyEvent

`MirrorDestroyEvent` gets triggered before the mirror gets removed from the DOM.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `MirrorEvent`                                              |
| **Interface**         | `MirrorDestroyEvent`                                       |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Cancels the removal of the mirror from the DOM             |
| **type**              | `mirror:destroy`                                           |
