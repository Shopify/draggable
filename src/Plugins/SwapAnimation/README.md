## SwapAnimation

The swap animation plugin currently only works with `Sortable`. It adds a swap animation on `sortable:sorted`,
and animates both `source` and `over` via `translate3d`. It is currently possible to change the duration and
the easing function of the animation.

This plugin is not included by default, so make sure to import it before using.

### Usage

- NPM:

```js
import {Sortable, Plugins} from '@shopify/draggable';
// Or
import Sortable from '@shopify/draggable/build/esm/Sortable/Sortable';
import SwapAnimation from '@shopify/draggable/build/esm/Plugins/SwapAnimation';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  swapAnimation: {
    duration: 200,
    easingFunction: 'ease-in-out',
    horizontal: true,
  },
  plugins: [Plugins.SwapAnimation], // Or [SwapAnimation]
});
```

- Browser (as a module):

```html
<script type="module">
  import Sortable from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Sortable/Sortable.mjs';
  import SwapAnimation from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Plugins/SwapAnimation.mjs';

  const sortable = new Sortable(document.querySelectorAll('ul'), {
    draggable: 'li',
    swapAnimation: {
      duration: 200,
      easingFunction: 'ease-in-out',
      horizontal: true,
    },
    plugins: [SwapAnimation],
  });
</script>
```

- Browser (Standalone):

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable/build/umd/index.min.js"></script>
<script>
  const sortable = new Draggable.Sortable(document.querySelectorAll('ul'), {
    draggable: 'li',
    swapAnimation: {
      duration: 200,
      easingFunction: 'ease-in-out',
      horizontal: true,
    },
    plugins: [Draggable.Plugins.SwapAnimation],
  });
</script>
```

### API

**`new SwapAnimation(draggable: Draggable): SwapAnimation`**  
To create a swap animation plugin instance.

### Options

**`duration {Integer}`**  
The duration option allows you to specify the animation during for a single swap. Default: `150`

**`easingFunction {String}`**  
The easing option allows you to specify an animation easing function. Default: `'ease-in-out'`

**`horizontal {Boolean}`**
The horizontal option allows you to set the elements to animate horizontally. Default: `false`

### Examples

```js
import {Sortable, Plugins} from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  swapAnimation: {
    duration: 200,
    easingFunction: 'ease-in-out',
    horizontal: true,
  },
  plugins: [Plugins.SwapAnimation],
});
```

### Plans

- Add support for staggering animations
- Find cross-container animation solution
- Add support for `Swappable` and `Droppable`

### Caveats

- Only works within same container
- Animations don't stagger
- Only works with `Sortable`
