## DroppableEvent

The base pannable event for all Pannable events that `Pannable` emits.

|                   |                  |
| ----------------- | ---------------- |
| **Interface**     | `PannableEvent`  |
| **Cancelable**    | false            |
| **Cancel action** | -                |
| **type**          | `pannable`       |

### API

**`droppableEvent.dragEvent: DragEvent`**  
Read-only property for the original drag event that triggered the pannable event.

## PannableStartEvent

`PannableStartEvent` gets triggered by `Pannable` when panning starts.

|                   |                       |
| ----------------- | --------------------- |
| **Specification** | `PannableEvent`       |
| **Interface**     | `PannableStartEvent`  |
| **Cancelable**    | true                  |
| **Cancel action** | Prevents panning      |
| **type**          | `pannable:start`      |

## PannablePanEvent

`PannablePanEvent` gets triggered by `Pannable` whenever you pan a draggable element.

|                   |                         |
| ----------------- | ----------------------- |
| **Specification** | `PannableEvent`         |
| **Interface**     | `PannablePanEvent`      |
| **Cancelable**    | true                    |
| **Cancel action** | Prevents panning        |
| **type**          | `pannable:pan`          |

## PannableStopEvent

`PannableStopEvent` gets triggered by `Pannable` when panning stops.

|                   |                                      |
| ----------------- | ------------------------------------ |
| **Specification** | `PannableEvent`                      |
| **Interface**     | `PannableStopEvent`                  |
| **Cancelable**    | false                                |
| **Cancel action** | Prevents return of draggable element |
| **type**          | `pannable:stop`                      |

