## Styleable

The styleable plugin handles all class management for draggable. It is responsible for adding state classes for
draggable core and allows other modules or plugins to add their own classes.
This plugin is used by draggable by default, but could potentially be replaced with a custom plugin.

### API

**`new Styleable(draggable: Draggable): Styleable`**
To create a styleable instance.

### Options

**`classes {Object}`**
Styleable adds classes to elements to indicate state. These classes can be used to add styling
on elements in certain states. See table below

**`placedTimeout {Number}`**
Styleables adds a placed state class on both the draggable source and the draggable container
you drop. These classes will be removed after this timeout. Default: `800`

### Classes

| Name                 | Description                                                         | Default                            |
| -------------------- | ------------------------------------------------------------------- | ---------------------------------- |
| `body:dragging`      | Class added on the document body while dragging                     | `draggable--is-dragging`           |
| `container:dragging` | Class added on the container where the draggable was picked up from | `draggable-container--is-dragging` |
| `source:dragging`    | Class added on the draggable element that has been picked up        | `draggable-source--is-dragging`    |
| `source:placed`      | Class added on the draggable element on `drag:stop`                 | `draggable-source--placed`         |
| `container:placed`   | Class added on the draggable container element on `drag:stop`       | `draggable-container--placed`      |
| `draggable:over`     | Class added on draggable element you are dragging over              | `draggable--over`                  |
| `container:over`     | Class added on draggable container element you are dragging over    | `draggable-container--over`        |
| `source:original`    | Class added on the original source element, which is hidden on drag | `draggable--original`              |
| `mirror`             | Class added on the mirror element                                   | `draggable-mirror`                 |

### Examples

```js
import { Draggable } from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
  styleable: {
    classes: {
      mirror: 'DraggableMirror',
      'body:Dragging': ['Draggable', 'isDragging']
    }
  }
});
```

#### Adding custom

#### Removing the plugin

```js
import { Draggable } from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li'
});

// Removes Styleable plugin
draggable.removePlugin(Draggable.Plugin.Styleable);

// Adds custom styleable plugin
draggable.addPlugin(CustomStyleablePlugin);
```
