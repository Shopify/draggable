## Snap event

The base snap event for all Snap events that `Snappable` emits.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Interface**         | `SnapEvent`                                                |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `snap`                                                     |

### API

**`snapEvent.dragEvent: DragEvent`**  
Read-only property for drag event that triggered this snappable event

**`snapEvent.snappable: HTMLElement`**  
Read-only property for the element that you are about to snap into or out of

## SnapInEvent

`SnapInEvent` gets triggered by `Snappable` before snapping into place.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SnapEvent`                                                |
| **Interface**         | `SnapInEvent`                                              |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Prevents snap in effect                                    |
| **type**              | `snap:in`                                                  |

## SnapOutEvent

`SnapOutEvent` gets triggered by `Snappable` before snapping out.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SnapEvent`                                                |
| **Interface**         | `SnapOutEvent`                                             |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Prevents snap out effect                                   |
| **type**              | `snap:out`                                                 |
