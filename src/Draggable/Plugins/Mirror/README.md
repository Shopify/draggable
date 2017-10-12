## Mirror

The mirror plugin listens to Draggables `mirror:created` and `mirror:move` events to control how the mirror moves.
This plugin is used by draggable by default, but could potentially be replaced with a custom plugin.

### API

**`new Mirror(draggable: Draggable): Mirror`**  
To create a mirror plugin instance.

### Options

**`xAxis {Boolean}`**  
If enabled, the mirror will move on the x axis. Default: `true`

**`yAxis {Boolean}`**  
If enabled, the mirror will move on the y axis. Default: `true`

**`constrainDimensions {Boolean}`**  
If enabled, the source elements height and width will be applied to the mirror. Default: `false`

### Examples

#### y Axis only

```js
import {Draggable} from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
  mirror: {
    xAxis: false,
  },
});
```

#### x Axis only

```js
import {Sortable} from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  mirror: {
    yAxis: false,
  },
});
```
