## ResizeMirror

The ResizeMirror plugin resizes the mirror element to the dimensions of the draggable element that the mirror is hovering over.

It will also appends the mirror element to whatever draggable container element the mirror is hovering over.
You can add transitions to the mirror element to animate the resizing.

This plugin is not included in the default Draggable bundle, so you'll need to import it separately.

![grid-mirror-resize](https://user-images.githubusercontent.com/643944/39401902-197a93d4-4b1f-11e8-8e2a-9c3070a6fb95.gif)

> **Example of `ResizeMirror` in action.** Custom transitions are applied via CSS _(not provided by the plugin)_ – [Grid Layout Example](https://shopify.github.io/draggable/examples/grid-layout.html)

### Import

```js
import { Plugins } from '@shopify/draggable';
```

```js
import ResizeMirror from '@shopify/draggable/lib/plugins/resize-mirror';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/plugins.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/plugins/resize-mirror.js"></script>
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
