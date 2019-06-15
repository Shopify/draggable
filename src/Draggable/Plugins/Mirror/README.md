## Mirror

The mirror plugin listens to Draggables `drag:start`, `drag:move` and `drag:stop` events to control the mirror.
It emits events like `mirror:create`, `mirror:created`, `mirror:attached`, `mirror:move` and `mirror:destroy`.
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

**`cursorOffsetX {Number|null}`**  
Defining this sets the offset from cursor to mirror manually on the x axis. Default: `null`

**`cursorOffsetY {Number|null}`**  
Defining this sets the offset from cursor to mirror manually on the y axis. Default: `null`

**`appendTo {String|HTMLElement|Function}`**  
The mirror plugin allows you to specify where the mirror should be appended to. For clarification,
this is not where the source will be placed, only the temporary mirror element, which is the element
that follows your cursor as you drag. You can specify a css selector, a HTMLElement or a function
that returns a HTMLElement. Default is the source parent element.

**`thresholdX {Number|null}`**
Defining this sets a threshold that must be exceeded by the mouse for the mirror to move on the x axis. Default: `null`

**`thresholdY {Number|null}`**
Defining this sets a threshold that must be exceeded by the mouse for the mirror to move on the y axis. Default: `null`

### Events

| Name                                | Description                                           | Cancelable | Cancelable action        |
| ----------------------------------- | ----------------------------------------------------- | ---------- | ------------------------ |
| [`mirror:create`][mirrorcreate]     | Gets fired before draggable mirror gets created       | true       | Prevents mirror creation |
| [`mirror:created`][mirrorcreated]   | Gets fired when draggable mirror gets created         | false      | -                        |
| [`mirror:attached`][mirrorattached] | Gets fired when draggable mirror gets attached to DOM | false      | -                        |
| [`mirror:move`][mirrormove]         | Gets fired when draggable mirror moves                | true       | Stop mirror movement     |
| [`mirror:destroy`][mirrordestroy]   | Gets fired when draggable mirror gets removed         | true       | Stop mirror removal      |

[mirrorcreate]: MirrorEvent#mirrorcreateevent
[mirrorcreated]: MirrorEvent#mirrorcreatedevent
[mirrorattached]: MirrorEvent#mirrorattachedevent
[mirrormove]: MirrorEvent#mirrormoveevent
[mirrordestroy]: MirrorEvent#mirrordestroyevent

### Examples

#### y Axis only

```js
import { Draggable } from '@shopify/draggable';

const draggable = new Draggable(document.querySelectorAll('ul'), {
  draggable: 'li',
  mirror: {
    constrainDimensions: true,
    cursorOffsetX: 10,
    cursorOffsetY: 10,
    xAxis: false
  }
});
```

#### x Axis only

```js
import { Sortable } from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  mirror: {
    constrainDimensions: true,
    cursorOffsetX: 10,
    cursorOffsetY: 10,
    yAxis: false
  }
});
```

#### Appending mirror

```js
import { Sortable } from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  mirror: {
    appendTo: '.some-other-element'
  }
});
```
