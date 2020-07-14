## SortAnimation

The sort animation plugin currently only works with `Sortable`. It adds sort animation on `sortable:sorted` with both horizontal and vertical within grid layout,
and animates all sorted elements via `translate3d`. It is currently possible to change the duration and
the easing function of the animation.

It different with [SwapAnimation](https://github.com/Shopify/draggable/tree/master/src/Plugins/SwapAnimation) plugin because SwapAnimation only support horizontal or vertical layout.

This plugin is not included by default, so make sure to import it before using.

**NOTE**: Don't use this plugin with [SwapAnimation](https://github.com/Shopify/draggable/tree/master/src/Plugins/SwapAnimation) plugin to avoid conflict.

### Import

```js
import { Plugins } from '@shopify/draggable';
```

```js
import SortAnimation from '@shopify/draggable/lib/plugins/sort-animation';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/plugins.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/plugins/sort-animation.js"></script>
```

### API

**`new SortAnimation(draggable: Draggable): SortAnimation`**  
To create a sort animation plugin instance.

### Options

**`duration {Integer}`**  
The duration option allows you to specify the animation during for a single sort. Default: `150`

**`easingFunction {String}`**  
The easing option allows you to specify an animation easing function. Default: `'ease-in-out'`

### Examples

```js
import { Sortable, Plugins } from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  sortAnimation: {
    duration: 200,
    easingFunction: 'ease-in-out',
  },
  plugins: [Plugins.SortAnimation]
});
```

### Caveats

- Only works within same container
- Animations don't stagger
- Only works with `Sortable`
