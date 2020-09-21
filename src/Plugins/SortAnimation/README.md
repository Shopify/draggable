## SortAnimation

The sort animation plugin currently only works with `Sortable`. It adds sort animation on `sortable:sorted` with both horizontal and vertical within grid layout,
and animates all sorted elements via `translate3d`. It is currently possible to change the duration and
the easing function of the animation.

It different with [SwapAnimation](https://github.com/Shopify/draggable/tree/master/src/Plugins/SwapAnimation) plugin because SwapAnimation only support horizontal or vertical layout.

This plugin is not included by default, so make sure to import it before using.

**NOTE**: Don't use this plugin with [SwapAnimation](https://github.com/Shopify/draggable/tree/master/src/Plugins/SwapAnimation) plugin to avoid conflict.

### Usage

- ES6:
```js
import { Sortable, Plugins } from "@shopify/draggable";
// Or
// import Sortable from '@shopify/draggable/lib/sortable';
// import SortAnimation from '@shopify/draggable/lib/plugins/sort-animation';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  sortAnimation: {
    duration: 200,
    easingFunction: 'ease-in-out',
  },
  plugins: [Plugins.SortAnimation] // Or [SortAnimation]
});
```

- Browser (All plugins bundle):
```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/draggable.bundle.js"></script>
<script>
    const sortable = new Draggable.Sortable(document.querySelectorAll('ul'), {
      draggable: 'li',
      sortAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
      },
      plugins: [Draggable.Plugins.SortAnimation]
    });
</script>
```

- Browser (Standalone):
```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/sortable.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/plugins/sort-animation.js"></script>
<script>
    const sortable = new Sortable.default(document.querySelectorAll('ul'), {
      draggable: 'li',
      sortAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
      },
      plugins: [SortAnimation.default]
    });
</script>
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
