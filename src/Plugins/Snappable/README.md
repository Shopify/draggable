## Snappable

Snappable simulates a "snap" by hiding the mirror and removing the `'source:dragging'` class from the source.
It also sets the `'source:placed'` class for potential drop animations.

This plugin is not included by default, so make sure to import it before using.

### Import

```js
import { Plugins } from '@shopify/draggable';
```

```js
import Snappable from '@shopify/draggable/lib/plugins/snappable';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/plugins.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/plugins/snappable.js"></script>
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
