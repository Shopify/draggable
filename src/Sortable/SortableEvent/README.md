## SortableEvent

The base sortable event for all Sortable events that `Sortable` emits.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Interface**         | `SortableEvent`                                            |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `sortable`                                                 |

### API

**`sortableEvent.dragEvent: DragEvent`**  
Read-only property for the original drag event that triggered the sortable event.

## SortableStartEvent

`SortableStartEvent` gets triggered by `Sortable` when on drag start.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SortableEvent`                                            |
| **Interface**         | `SortableStartEvent`                                       |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Prevents drag start                                        |
| **type**              | `sortable:start`                                           |

### API

**`sortableEvent.startIndex: Number`**  
Read-only property for the start index of the current draggable source.

**`sortableEvent.startContainer: HTMLElement`**  
Read-only property for the start container of the current draggable source.

## SortableSortEvent

`SortableSortEvent` gets triggered by `Sortable` before sorting with another draggable.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SortableEvent`                                            |
| **Interface**         | `SortableSortEvent`                                        |
| **Cancelable**        | true                                                       |
| **Cancel action**     | Prevents sorting                                           |
| **type**              | `sortable:sort`                                            |

### API

**`sortableEvent.oldIndex: Number`**  
Read-only property for the old index of the current draggable source.

**`sortableEvent.newIndex: Number`**  
Read-only property for the new index of the current draggable source.

**`sortableEvent.oldContainer: HTMLElement`**  
Read-only property for the old container of the current draggable source.

**`sortableEvent.newContainer: HTMLElement`**  
Read-only property for the new container of the current draggable source.

## SortableSortedEvent

`SortableSortedEvent` gets triggered by `Sortable` when sorted with another draggable.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SortableEvent`                                            |
| **Interface**         | `SortableSortedEvent`                                      |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `sortable:sorted`                                          |

### API

**`sortableEvent.oldIndex: Number`**  
Read-only property for the old index of the current draggable source.

**`sortableEvent.newIndex: Number`**  
Read-only property for the new index of the current draggable source.

**`sortableEvent.oldContainer: HTMLElement`**  
Read-only property for the old container of the current draggable source.

**`sortableEvent.newContainer: HTMLElement`**  
Read-only property for the new container of the current draggable source.

## SortableStopEvent

`SortableStopEvent` gets triggered by `Sortable` on drag stop.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `SortableEvent`                                            |
| **Interface**         | `SortableStopEvent`                                        |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `sortable:stop`                                            |

### API

**`sortableEvent.oldIndex: Number`**  
Read-only property for the old index of the current draggable source.

**`sortableEvent.newIndex: Number`**  
Read-only property for the new index of the current draggable source.

**`sortableEvent.oldContainer: HTMLElement`**  
Read-only property for the old container of the current draggable source.

**`sortableEvent.newContainer: HTMLElement`**  
Read-only property for the new container of the current draggable source.
