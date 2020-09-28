## Snappable

Snappable simulates a "snap" by hiding the mirror and removing the `'source:dragging'` class from the source.
It also sets the `'source:placed'` class for potential drop animations.

This plugin is not included by default, so make sure to import it before using.

### Usage

- ES6:
```js
import { Draggable, Plugins } from "@shopify/draggable";
// Or
// import Draggable from '@shopify/draggable/lib/draggable';
// import Snappable from '@shopify/draggable/lib/plugins/snappable';


const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
  plugins: [Plugins.Snappable] // Or [Snappable]
});
```

- Browser (All bundle):
```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.12/lib/draggable.bundle.js"></script>
<script>
    const draggable = new Draggable.Draggable(document.querySelectorAll('ul'), {
      draggable: 'li',
      plugins: [Draggable.Plugins.Snappable]
    });
</script>
```

- Browser (Standalone):
```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.12/lib/draggable.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.12/lib/plugins/snappable.js"></script>
<script>
    const draggable = new Draggable.default(document.querySelectorAll('ul'), {
      draggable: 'li',
      plugins: [Snappable.default]
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
import { Sortable, Plugins } from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  plugins: [Plugins.Snappable]
});

sortable.on('snap:in', () => console.log('snap:in'));
sortable.on('snap:out', () => console.log('snap:out'));
```
