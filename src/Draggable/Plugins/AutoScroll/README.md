## AutoScroll

The auto scroll plugin listens to Draggables `drag:start`, `drag:move` and `drag:stop` events to determine when to scroll
the document it's on.
This plugin is used by draggable by default, but could potentially be replaced with a custom plugin.

### API

**`new AutoScroll(draggable: Draggable): AutoScroll`**  
To create an auto scroll plugin instance.

### Options

**`speed {Number}`**  
Determines the scroll speed. Default: `10`

**`sensitivity {Number}`**  
Determines the sensitivity of scrolling. Default: `30`

### Examples

```js
import {Draggable} from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
  autoScroll: {
    speed: 6,
    sensitivity: 12,
  },
});
```

#### Removing the plugin

```js
import {Draggable} from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
});

// Removes AutoScroll plugin
draggable.removePlugin(Draggable.Plugin.AutoScroll);

// Adds custom scroll plugin
draggable.addPlugin(CustomScrollPlugin);
```
