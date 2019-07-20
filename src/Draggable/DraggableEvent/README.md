## DraggableEvent

The base draggable event for all Draggable events that `Draggable` emits.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Interface**         | `DraggableEvent`                                           |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `draggable`                                                |

### API

**`draggableEvent.draggable: Draggable`**
Read-only property for the current draggable instance

## DraggableInitializedEvent

`DraggableInitializedEvent` gets triggered by `Draggable` when initialized.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `DraggableEvent`                                           |
| **Interface**         | `DraggableInitializedEvent`                                |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `draggable:initialized`                                    |

## DraggableAbortEvent

`DraggableAbortEvent` gets triggered by `Draggable` when `.abort()` is called.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `DraggableEvent`                                           |
| **Interface**         | `DraggableAbortEvent`                                      |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `draggable:abort`                                          |


## DraggableDestroyEvent

`DraggableDestroyEvent` gets triggered by `Draggable` when destroyed.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `DraggableEvent`                                           |
| **Interface**         | `DraggableDestroyEvent`                                    |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `draggable:destroy`                                        |
