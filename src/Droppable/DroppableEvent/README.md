## DroppableEvent

The base droppable event for all Droppable events that `Droppable` emits.

|                   |                  |
| ----------------- | ---------------- |
| **Interface**     | `DroppableEvent` |
| **Cancelable**    | false            |
| **Cancel action** | -                |
| **type**          | `droppable`      |

### API

**`droppableEvent.dragEvent: DragEvent`**  
Read-only property for the original drag event that triggered the droppable event.

## DroppableStartEvent

`DroppableStartEvent` gets triggered by `Droppable` before dropping the draggable element into a dropzone element.

|                   |                       |
| ----------------- | --------------------- |
| **Specification** | `DroppableEvent`      |
| **Interface**     | `DroppableStartEvent` |
| **Cancelable**    | true                  |
| **Cancel action** | Prevents drag         |
| **type**          | `droppable:start`     |

### API

**`droppableEvent.dropzone: HTMLElement`**  
Read-only property for the initial dropzone element of the currently dragging draggable element

## DroppableDroppedEvent

`DroppableDroppedEvent` gets triggered by `Droppable` before dropping the draggable element into a dropzone element.

|                   |                         |
| ----------------- | ----------------------- |
| **Specification** | `DroppableEvent`        |
| **Interface**     | `DroppableDroppedEvent` |
| **Cancelable**    | true                    |
| **Cancel action** | Prevents drop           |
| **type**          | `droppable:dropped`     |

### API

**`droppableEvent.dropzone: HTMLElement`**  
Read-only property for the dropzone element you dropped the draggable element into

## DroppableReturnedEvent

`DroppableReturnedEvent` gets triggered by `Droppable` before moving the draggable element to its original dropzone.

|                   |                                      |
| ----------------- | ------------------------------------ |
| **Specification** | `DroppableEvent`                     |
| **Interface**     | `DroppableReturnedEvent`             |
| **Cancelable**    | true                                 |
| **Cancel action** | Prevents return of draggable element |
| **type**          | `droppable:returned`                 |

### API

**`droppableEvent.dropzone: HTMLElement`**  
Read-only property for the dropzone element you dragged away from

## DroppableStopEvent

`DroppableStopEvent` gets triggered by `Droppable` before dropping the draggable element into a dropzone element.

|                   |                      |
| ----------------- | -------------------- |
| **Specification** | `DroppableEvent`     |
| **Interface**     | `DroppableStopEvent` |
| **Cancelable**    | false                |
| **Cancel action** | -                    |
| **type**          | `droppable:stop`    |

### API

**`droppableEvent.dropzone: HTMLElement`**  
Read-only property for the final dropzone element of the draggable element
