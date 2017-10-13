## Swappable

The base swappable event for all Swappable events that `Swappable` emits.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Interface**         | `SwappableEvent`                                           |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `swappable`                                                |

### API

**`swappableEvent.dragEvent: DragEvent`**  
Read-only property for the original drag event that triggered the swappable event.

## SwappableStartEvent

`SwappableStartEvent` gets triggered by `Swappable` on drag start.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SwappableEvent`                                           |
| **Interface**         | `SwappableStartEvent`                                      |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Prevents drag start                                        |
| **type**              | `swappable:start`                                          |

## SwappableSwapEvent

`SwappableSwapEvent` gets triggered by `Swappable` before swapping with another draggable.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SwappableEvent`                                           |
| **Interface**         | `SwappableSwapEvent`                                       |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Prevents swapping                                          |
| **type**              | `swappable:swap`                                           |

### API

**`swappableEvent.over: HTMLElement`**  
Read-only property for the draggable element that you are over.

**`swappableEvent.overContainer: HTMLElement`**  
Read-only property for the draggable container element that you are over.

## SwappableSwappedEvent

`SwappableSwappedEvent` gets triggered by `Swappable` when sorted with another draggable.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SwappableEvent`                                           |
| **Interface**         | `SwappableSwappedEvent`                                    |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `swappable:swapped`                                         |

### API

**`swappableEvent.swappedElement: HTMLElement`**  
Read-only property for the draggable element you swapped with.

## SwappableStopEvent

`SwappableStopEvent` gets triggered by `Swappable` on drag stop.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SwappableEvent`                                           |
| **Interface**         | `SwappableStopEvent`                                       |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `swappable:stop`                                           |
