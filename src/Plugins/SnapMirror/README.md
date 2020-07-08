## SnapMirror

The SnapMirror plugin snap the mirror to the target points.

This plugin is not included in the default Draggable bundle, so you'll need to import it separately.

<!-- Inspired by interact.js -->

### Import

```js
import {Plugins} from '@shopify/draggable';
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

The over container should set relative/absolute/fixed position, bacause while over a container mirror using absolute position based on the container.

```css
.draggable-container--over {
  position: relative;
}
```

### Options

**`targets {Array<Object|Function>}`**  
An object contain target options or a function returning an object contain target options.

If a snap target is a function, then it is called and given the x and y coordinates of the dragging mirror base on contianer as the first two parameters and the current SnapMirror instance as the third parameter.

Target options:

| Name    | Type     | Description                                                                                                             |
| ------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `x`     | `number` | The x coordinates of snap target relative to offset.                                                                    |
| `y`     | `number` | The y coordinates of snap target relative to offset.                                                                    |
| `range` | `number` | The range of a snap target is the distance the pointer must be from the target's coordinates for a snap to be possible. |

<!--
no longer need
**`offset {string|Object}`**
A string `container` or an object with `x` and `y` properties.
The `offset` option lets you shift the coordinates of the targets.

If using `container`, offset will set to the upper left corner coordinates of the current source container.
-->

**`relativePoints {Array<Object>}`**  
An object with `x` and `y` properties.  
The `relativePoints` option lets you set where the dragging mirror element should snap.

**`range {Object|Function}`**  
The `range` option lets you set the default range for all targets.

### Global Method

**`grid(option: Object)`**  
You can use the `SnapMirror.grid()` method to create a target that snaps to a grid.  
The method takes an object describing a grid and returns a function that snaps to the corners of that grid.

**`inRectRange(range: Array)`**
You can use the `SnapMirror.rectRange()` method check if a point in ract Range.

### Examples

```js
import {Sortable, Plugins} from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  SnapMirror: {
    targets: [{x: 100, y: 100, range: 50}],
    relativePoints: [{x: 0.5, y: 0.5}],
  },
  plugins: [Plugins.SnapMirror],
});
```

### Caveats

### Why different form interact.js

Consider of scorll, nest container and nest container with scorll. Limit snap in a contianer will make things simple.
