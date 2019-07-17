## Pannable

Pannable is built on top of Draggable and allows you to pan elements.
The container must be the element that contains the pannable element,
and the pannable element must be specified as the draggable element.
The pannable element must be larger than the container,
such that it takes up the full viewport of the container (and can thus be panned).

### Import

```js
import { Pannable } from '@shopify/draggable';
```

```js
import Pannable from '@shopify/draggable/lib/pannable';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.8/lib/pannable.bundle.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.8/lib/pannable.js"></script>
```

### API

Check out [Draggable API](../Draggable#api) for the base API

### Options

Check out [Draggable options](../Draggable#options) for the base options

**`bounadryElasticity {Number}`**
A number between `1` and `0` that specifies how elastic the boundaries are. Default: `1`

**`velocity {Number}`**
A number between `1` and `0` that specifies the decay of the velocity after panning has ended. Default `0.9`

### Events

Check out [Draggable events](../Draggable#events) for the base events

| Name                              | Description                           | Cancelable | Cancelable action |
|-----------------------------------|---------------------------------------|------------|-------------------|
| [`pannable:start`][pannablestart] | Gets fired when panning is started    | true       | Prevents panning  |
| [`pannable:pan`][pannablepan]     | Gets fired when the element is panned | true       | Prevents panning  |
| [`pannable:stop`][pannablestop]   | Gets fired when panning is stopped    | false      | -                 |

[pannablestart]: PannableEvent#pannablestartevent
[pannablepan]: PannableEvent#pannablepanevent
[pannablestop]: PannableEvent#pannablestopevent

### Classes

Check out [Draggable class identifiers](../Draggable#classes) for the base class identifiers

### Example

This sample HTML and JavaScript will make `.pannable` elements pannable within the `.container` element:

```html
<div class="container">
  <div class="pannable"></div>
</div>


<style>
  .item { height: 500px; width: 500px; }
  .container { overflow: hidden; height: 100px; width: 100px; }
</style>
```

```js
import { Pannable } from '@shopify/draggable';

const pannable = new Pannable(document.querySelectorAll('.container'), {
  draggable: '.pannable'
});

pannable.on('pannable:start', () => console.log('pannable:start'));
pannable.on('pannable:pan', () => console.log('pannable:pan'));
pannable.on('pannable:stop', () => console.log('pannable:stop'));
```
