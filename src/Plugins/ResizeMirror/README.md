## ResizeMirror

The ResizeMirror plugin resizes the mirror element to the dimensions of the draggable element that the mirror is hovering over.

It will also appends the mirror element to whatever draggable container element the mirror is hovering over.
You can add transitions to the mirror element to animate the resizing.

This plugin is not included in the default Draggable bundle, so you'll need to import it separately.

![grid-mirror-resize](https://user-images.githubusercontent.com/643944/39401902-197a93d4-4b1f-11e8-8e2a-9c3070a6fb95.gif)

> **Example of `ResizeMirror` in action.** Custom transitions are applied via CSS _(not provided by the plugin)_ – [Grid Layout Example](https://shopify.github.io/draggable/examples/grid-layout.html)

### Usage

- ES6:
```js
import { Draggable, Plugins } from "@shopify/draggable";
// Or
// import Draggable from '@shopify/draggable/lib/draggable';
// import ResizeMirror from '@shopify/draggable/lib/plugins/resize-mirror';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
  plugins: [Plugins.ResizeMirror] // Or [ResizeMirror]
});
```

- Browser (All bundle):
```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.12/lib/draggable.bundle.js"></script>
<script>
    const draggable = new Draggable.Draggable(document.querySelectorAll('ul'), {
      draggable: 'li',
      plugins: [Draggable.Plugins.ResizeMirror]
    });
</script>
```

- Browser (Standalone):
```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.12/lib/draggable.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.12/lib/plugins/resize-mirror.js"></script>
<script>
    const draggable = new Draggable.default(document.querySelectorAll('ul'), {
      draggable: 'li',
      plugins: [ResizeMirror.default]
    });
</script>
```

### API

**`new ResizeMirror(draggable: Draggable): ResizeMirror`**
Creates an instance of the ResizeMirror plugin.

### Options

_No options_

### Examples

```js
import { Sortable, Plugins } from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  plugins: [Plugins.ResizeMirror]
});
```

### Caveats

- The mirror is not re-positioned under the cursor once resized, i.e. if the mirror shrinks/expands the mirror may no longer be directly beneath the cursor
