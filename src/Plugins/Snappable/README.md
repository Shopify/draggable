## Snappable

Snappable simulates a "snap" by hiding the mirror and removing the `'source:dragging'` class from the source.
It also sets the `'source:placed'` class for potential drop animations.

This plugin is not included by default, so make sure to import it before using.

### Usage

- NPM:

```js
import {Draggable, Plugins} from '@shopify/draggable';
// Or
import Draggable from '@shopify/draggable/build/esm/Draggable/Draggable';
import Snappable from '@shopify/draggable/build/esm/Plugins/Snappable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
  plugins: [Plugins.Snappable], // Or [Snappable]
});
```

- Browser (as a module):

```html
<script type="module">
  import Draggable from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Draggable/Draggable.mjs';
  import Snappable from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Plugins/Snappable.mjs';

  const draggable = new Draggable(document.querySelectorAll('ul'), {
    draggable: 'li',
    plugins: [Snappable],
  });
</script>
```

- Browser (Standalone):

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable/build/umd/index.min.js"></script>
<script>
  const draggable = new Draggable.Draggable(document.querySelectorAll('ul'), {
    draggable: 'li',
    plugins: [Draggable.Plugins.Snappable],
  });
</script>
```

### Options

_No options_

### Events

| Name                  | Description                             | Cancelable | Cancelable action     |
| --------------------- | --------------------------------------- | ---------- | --------------------- |
| [`snap:in`][snapin]   | Gets fired when just before snapping in | true       | Prevents snapping     |
| [`snap:out`][snapout] | Gets fired when snapping out            | true       | Prevents snapping out |

[snapin]: SnappableEvent#snapinevent
[snapout]: SnappableEvent#snapoutevent

### Example

```js
import {Sortable, Plugins} from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  plugins: [Plugins.Snappable],
});

sortable.on('snap:in', () => console.log('snap:in'));
sortable.on('snap:out', () => console.log('snap:out'));
```
