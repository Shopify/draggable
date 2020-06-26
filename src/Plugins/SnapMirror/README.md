## SnapMirror

The SnapMirror plugin snap the mirror element to the target points.

This plugin is not included in the default Draggable bundle, so you'll need to import it separately.

<!-- add a gif / video ? -->

<!-- Inspired by interactjs. -->

### Import

```js
import { Plugins } from '@shopify/draggable';
```

```js
import SnapMirror from '@shopify/draggable/lib/plugins/snap-mirror';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.x/lib/plugins.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.x/lib/plugins/snap-mirror.js"></script>
```

### Options

**`targets {Array<Object|Function>}`**  
An object contain target options or a function returning an object contain target options.

Target options:

| Name           | Type                   | Description |
| -------------- | ---------------------- | ----------- |
| `x`            | `number`               |             |
| `y`            | `number`               |             |
| `range`        | `Object` or `Function` |             |
| `range.circle` | `number`               |             |
| `range.rect`   | `Array`                |             |

**`offset {string|Object}`**  
A string or an object with `x` and `y` properties.  
The `offset` option lets you shift the coordinates of the targets.

**`relativePoints {Object}`**  
An object with `x` and `y` properties.  
The `relativePoints` option lets you set where the drag element should snap.

**`range {Object|Function}`**  
The `range` option lets you set the default range for all targets.

### Global Method

**`grid(option: Object)`**  
You can use the `SnapMirror.grid()` method to create a target that snaps to a grid.  
The method takes an object describing a grid and returns a function that snaps to the corners of that grid.

### Examples

```js
import { Sortable, Plugins } from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  SnapMirror: {
    targets: [{x: 100, y: 100, range: 50}],
    relativePoints: [{x: 0.5, y: 0.5}],
    offset: "container"
  },
  plugins: [Plugins.SnapMirror]
});
```

### Caveats
