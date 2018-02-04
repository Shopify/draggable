## Scrollable

The auto scroll plugin listens to Draggables `drag:start`, `drag:move` and `drag:stop` events to determine when to scroll
the document it's on.
This plugin is used by draggable by default, but could potentially be replaced with a custom plugin.

### API

**`new Scrollable(draggable: Draggable): Scrollable`**
To create an auto scroll plugin instance.

### Options

**`speed {Number}`**
Determines the scroll speed. Default: `10`

**`sensitivity {Number}`**
Determines the sensitivity of scrolling. Default: `30`

**`scrollableElements {HTMLElement[]}`**
Allows users to specify their own scrollable elements, rather than letting Draggable compute these automatically. Default: `[]`

### Examples

```js
import {Draggable} from '@shopify/draggable';

const customScrollableElements = document.querySelectorAll('.my-custom-scroll-elements')

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
  scrollable: {
    speed: 6,
    sensitivity: 12,
    scrollableElements: [
      ...customScrollableElements,
    ],
  },
});
```

#### Removing the plugin

```js
import {Draggable} from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
});

// Removes Scrollable plugin
draggable.removePlugin(Draggable.Plugin.Scrollable);

// Adds custom scroll plugin
draggable.addPlugin(CustomScrollPlugin);
```
