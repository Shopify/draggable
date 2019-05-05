## MirrorEvent

The base mirror event for all Mirror events that `Draggable` emits.

|                   |               |
| ----------------- | ------------- |
| **Interface**     | `MirrorEvent` |
| **Cancelable**    | false         |
| **Cancel action** | -             |
| **type**          | `mirror`      |

### API

**`mirrorEvent.source: HTMLElement`**  
Read-only property for the source element. This is a straight copy of the `originalSource`
element, which can be moved around in the DOM.

**`mirrorEvent.originalSource: HTMLElement`**  
Read-only property for the original source element that was picked up. This element never
moves in the DOM and gets hidden on `drag:start`.

**`mirrorEvent.sourceContainer: HTMLElement`**  
Read-only property for the source elements container. This would be one of the containers that
was passed into Draggable.

**`mirrorEvent.sensorEvent: SensorEvent`**  
Read-only property for the original sensor event that triggered this event.

**`mirrorEvent.originalEvent: SensorEvent`**  
Read-only property for the original event that triggered the sensor event.

## MirrorCreateEvent

`MirrorCreateEvent` gets triggered by `Draggable` before the mirror element gets created.

|                   |                                            |
| ----------------- | ------------------------------------------ |
| **Specification** | `MirrorEvent`                              |
| **Interface**     | `MirrorCreateEvent`                        |
| **Cancelable**    | true                                       |
| **Cancel action** | Cancels the creation of the mirror element |
| **type**          | `mirror:create`                            |

## MirrorCreatedEvent

`MirrorCreatedEvent` gets triggered by `Draggable` when the mirror element has
been created.

|                   |                      |
| ----------------- | -------------------- |
| **Specification** | `MirrorEvent`        |
| **Interface**     | `MirrorCreatedEvent` |
| **Cancelable**    | false                |
| **Cancel action** | -                    |
| **type**          | `mirror:created`     |

### API

**`mirrorEvent.mirror: HTMLElement`**  
Read-only property for the mirror element, which is also a copy of the `originalSource` element.
The mirror follows your mouse/touch movements.

## MirrorAttachedEvent

`MirrorAttachedEvent` gets triggered when the mirror has been appended to the DOM.

|                   |                       |
| ----------------- | --------------------- |
| **Specification** | `MirrorEvent`         |
| **Interface**     | `MirrorAttachedEvent` |
| **Cancelable**    | false                 |
| **Cancel action** | -                     |
| **type**          | `mirror:attached`     |

### API

**`mirrorEvent.mirror: HTMLElement`**  
Read-only property for the mirror element, which is also a copy of the `originalSource` element.
The mirror follows your mouse/touch movements.

## MirrorMoveEvent

`MirrorMoveEvent` gets triggered when moving the mirror around.

|                   |                       |
| ----------------- | --------------------- |
| **Specification** | `MirrorEvent`         |
| **Interface**     | `MirrorMoveEvent`     |
| **Cancelable**    | true                  |
| **Cancel action** | Stops mirror movement |
| **type**          | `drag:over`           |

### API

**`mirrorEvent.mirror: HTMLElement`**  
Read-only property for the mirror element, which is also a copy of the `originalSource` element.
The mirror follows your mouse/touch movements.

**`mirrorEvent.passedThreshX: Booolean`**  
Read-only property for whether or not the mirror's threshold has been exceeded in the x axis.

**`mirrorEvent.passedThreshY: Booolean`**  
Read-only property for whether or not the mirror's threshold has been exceeded in the y axis.


## MirrorDestroyEvent

`MirrorDestroyEvent` gets triggered before the mirror gets removed from the DOM.

|                   |                                                |
| ----------------- | ---------------------------------------------- |
| **Specification** | `MirrorEvent`                                  |
| **Interface**     | `MirrorDestroyEvent`                           |
| **Cancelable**    | true                                           |
| **Cancel action** | Cancels the removal of the mirror from the DOM |
| **type**          | `mirror:destroy`                               |

### API

**`mirrorEvent.mirror: HTMLElement`**  
Read-only property for the mirror element, which is also a copy of the `originalSource` element.
The mirror follows your mouse/touch movements.
