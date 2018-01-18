## Abstract event

This is the base class for all events draggable emits. Inherit from this class for creating
your own custom events.

| | |
| --------------------- | ---------------------------------------------------------- |
| **Specification**     | `AbstractEvent`                                            |
| **Interface**         | `AbstractEvent`                                            |
| **Cancelable**        | false                                                      |
| **Cancel action**     | -                                                          |
| **type**              | `event`                                                    |

### API

**`new AbstractEvent(data: Object): AbstractEvent`**  
Creates an `AbstractEvent` instance.

**`abstractEvent.cancel(data: Object): null`**  
Cancels drag start event.

**`abstractEvent.canceled(): Boolean`**  
Checks if event has been canceled.

**`abstractEvent.type: String`**  
Read-only property to find out event type

**`abstractEvent.cancelable: String`**  
Read-only property to check if event is cancelable
