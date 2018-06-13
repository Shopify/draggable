# Drag event

## DragEvent

The base event for all Drag events that `Draggable` emits.

|                   |             |
| ----------------- | ----------- |
| **Specification** | `DragEvent` |
| **Interface**     | `DragEvent` |
| **Cancelable**    | false       |
| **Cancel action** | -           |
| **type**          | `drag`      |

### API

**`dragEvent.source: HTMLElement`**  
Read-only property for the source element. This is a straight copy of the `originalSource`
element, which can be moved around in the DOM.

**`dragEvent.originalSource: String`**  
Read-only property for the original source element that was picked up. This element never
moves in the DOM and gets hidden on `drag:start`.

**`dragEvent.sourceContainer: String`**  
Read-only property for the source elements container. This would be one of the containers that
was passed into Draggable.

**`dragEvent.sensorEvent: SensorEvent`**  
Read-only property for the original sensor event that triggered this event.

**`dragEvent.originalEvent: SensorEvent`**  
Read-only property for the original event that triggered the sensor event.

## DragStartEvent

`DragStartEvent` gets triggered by `Draggable` when drag interaction has started.

|                   |                     |
| ----------------- | ------------------- |
| **Specification** | `DragEvent`         |
| **Interface**     | `DragStartEvent`    |
| **Cancelable**    | true                |
| **Cancel action** | Prevents drag start |
| **type**          | `drag:start`        |

## DragMoveEvent

`DragMoveEvent` gets triggered while moving the mouse after the `DragStartEvent` has triggered.

|                   |                 |
| ----------------- | --------------- |
| **Specification** | `DragEvent`     |
| **Interface**     | `DragMoveEvent` |
| **Cancelable**    | false           |
| **Cancel action** | -               |
| **type**          | `drag:move`     |

## DragOverEvent

`DragOverEvent` gets triggered when hovering over another draggable element during a drag
interaction.

|                   |                                                       |
| ----------------- | ----------------------------------------------------- |
| **Specification** | `DragEvent`                                           |
| **Interface**     | `DragOverEvent`                                       |
| **Cancelable**    | true                                                  |
| **Cancel action** | Cancels default actions in `Sortable` and `Swappable` |
| **type**          | `drag:over`                                           |

### API

**`dragOverEvent.over: HTMLElement`**  
Read-only property for the draggable element that you are hovering over.

**`dragOverEvent.overContainer: HTMLElement`**  
Read-only property for the draggable container element that you are hovering over.

## DragOutEvent

`DragOutEvent` gets triggered after a `DragOverEvent` and indicates that you are leaving
a draggable element.

|                   |                |
| ----------------- | -------------- |
| **Specification** | `DragEvent`    |
| **Interface**     | `DragOutEvent` |
| **Cancelable**    | false          |
| **Cancel action** | -              |
| **type**          | `drag:out`     |

### API

**`dragOutEvent.over: HTMLElement`**  
Read-only property for the draggable element that you are leaving.

**`dragOutEvent.overContainer: HTMLElement`**  
Read-only property for the draggable container element that you are hovering over.

## DragOverContainerEvent

`DragOverContainerEvent` gets triggered when hovering over a container, other than the `sourceContainer` in `DragStartEvent`.

|                   |                          |
| ----------------- | ------------------------ |
| **Specification** | `DragEvent`              |
| **Interface**     | `DragOverContainerEvent` |
| **Cancelable**    | false                    |
| **Cancel action** | -                        |
| **type**          | `drag:over:container`    |

### API

**`dragOverContainerEvent.overContainer: HTMLElement`**  
Read-only property for the draggable container element that you are hovering over.

## DragOutContainerEvent

`DragOutContainerEvent` gets triggered after a `DragOverContainerEvent` and indicates that
you are leaving a draggable container element.

|                   |                         |
| ----------------- | ----------------------- |
| **Specification** | `DragEvent`             |
| **Interface**     | `DragOutContainerEvent` |
| **Cancelable**    | false                   |
| **Cancel action** | -                       |
| **type**          | `drag:out:container`    |

### API

**`dragOutContainerEvent.overContainer: HTMLElement`**  
Read-only property for the draggable container element that you are leaving.

## DragPressureEvent

`DragPressureEvent` gets triggered before and during drag interactions. This event
only fires when the `ForceTouchSensor` is included as a Sensor and a Force Touch trackpad
is used with Safari.

|                   |                     |
| ----------------- | ------------------- |
| **Specification** | `DragEvent`         |
| **Interface**     | `DragPressureEvent` |
| **Cancelable**    | false               |
| **Cancel action** | -                   |
| **type**          | `drag:pressure`     |

### API

**`dragPressureEvent.pressure: HTMLElement`**  
Read-only property for pressure applied on a draggable element. Value ranges from `0.0` (no pressure) to `1.0` (maximum pressure).

## DragStopEvent

`DragStopEvent` gets triggered after `DragStartEvent`, once drag interactions have completed.

|                   |                 |
| ----------------- | --------------- |
| **Specification** | `DragEvent`     |
| **Interface**     | `DragStopEvent` |
| **Cancelable**    | false           |
| **Cancel action** | -               |
| **type**          | `drag:stop`     |
