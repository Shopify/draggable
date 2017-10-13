## DroppableEvent

The base droppable event for all Droppable events that `Droppable` emits.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Interface**         | `DroppableEvent`                                           |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `droppable`                                                |

### API

**`droppableEvent.dragEvent: DragEvent`**  
Read-only property for the original drag event that triggered the droppable event.

## DroppableOverEvent

`DroppableOverEvent` gets triggered by `Droppable` before dropping the draggable element into a droppable element.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `DroppableEvent`                                           |
| **Interface**         | `DroppableOverEvent`                                       |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Prevents drop                                              |
| **type**              | `droppable:over`                                           |

### API

**`droppableEvent.droppable: HTMLElement`**  
Read-only property for the droppable element you are over.

## DroppableOutEvent

`DroppableOutEvent` gets triggered by `Droppable` before moving the draggable element to its original position.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `DroppableEvent`                                           |
| **Interface**         | `DroppableOutEvent`                                        |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Prevents release                                           |
| **type**              | `droppable:out`                                           |

### API

**`droppableEvent.droppable: HTMLElement`**  
Read-only property for the droppable element you were over.
