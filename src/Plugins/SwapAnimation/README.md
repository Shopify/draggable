## SwapAnimation

The swap animation plugin currently only works with `Sortable`. It adds a swap animation on `sortable:sorted`,
and animates both `source` and `over` via `translate3d`. It is currently possible to change the duration and
the easing function of the animation.

This plugin is not included by default, so make sure to import it before using.

### Import

```js
import { Plugins } from '@shopify/draggable';
```

```js
import SwapAnimation from '@shopify/draggable/lib/plugins/swap-animation';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/plugins.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/plugins/swap-animation.js"></script>
```

### API

**`new SwapAnimation(draggable: Draggable): SwapAnimation`**  
To create a swap animation plugin instance.

### Options

**`duration {Integer}`**  
The duration option allows you to specify the animation during for a single swap. Default: `150`

**`easingFunction {String}`**  
The easing option allows you to specify an animation easing function. Default: `'ease-in-out'`

### Examples

```js
import { Sortable, Plugins } from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  swapAnimation: {
    duration: 200,
    easingFunction: 'ease-in-out'
  },
  plugins: [Plugins.SwapAnimation]
});
```

### Plans

* Add support for staggering animations
* Add support bi-directional swap animations
* Find cross-container animation solution
* Add support for `Swappable` and `Droppable`

### Caveats

* Only works with vertical lists
* Only works within same container
* Animations don't stagger
* Only works with `Sortable`
