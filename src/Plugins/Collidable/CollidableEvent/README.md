## Collidable event

The base collidable event for all Collidable events that `Collidable` emits.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Interface**         | `CollidableEvent`                                          |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `collidable`                                               |

### API

**`collidableEvent.dragEvent: DragEvent`**  
Read-only property for drag event that triggered this collidable event

## CollidableInEvent

`CollidableInEvent` gets triggered by `Collidable` when colliding with an element specified by the
`collidable` options.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `CollidableEvent`                                          |
| **Interface**         | `CollidableInEvent`                                        |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `collidable:in`                                            |

### API

**`collidableEvent.collidingElement: HTMLElement`**  
Read-only property for currently colliding element

## CollidableOutEvent

`CollidableOutEvent` gets triggered by `Collidable` when leaving a colliding area.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `CollidableEvent`                                          |
| **Interface**         | `CollidableOutEvent`                                       |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `collidable:out`                                           |

### API

**`collidableEvent.collidingElement: HTMLElement`**  
Read-only property for previously colliding element
