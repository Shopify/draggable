## Swappable

Swappable is built on top of Draggable and allows you to swap elements by dragging over them. No order will be maintained (unlike Sortable),
so any draggable element that gets dragged over will be swapped with the source element.

### Usage

- NPM:

```js
import {Swappable} from '@shopify/draggable';
// Or
import Swappable from '@shopify/draggable/build/esm/Swappable/Swappable';

const swappable = new Swappable(document.querySelectorAll('ul'), {
  draggable: 'li',
});
```

- Browser (as a module):

```html
<script type="module">
  import Swappable from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Swappable/Swappable.mjs';

  const swappable = new Swappable(document.querySelectorAll('ul'), {
    draggable: 'li',
  });
</script>
```

- Browser (Standalone):

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable/build/umd/index.min.js"></script>
<script>
  const swappable = new Draggable.Swappable(document.querySelectorAll('ul'), {
    draggable: 'li',
  });
</script>
```

### API

Check out [Draggables API](../Draggable#api) for the base API

### Options

Check out [Draggables options](../Draggable#options) for the base options

### Events

Check out [Draggables events](../Draggable#events) for base events

| Name                                    | Description                                         | Cancelable | Cancelable action |
| --------------------------------------- | --------------------------------------------------- | ---------- | ----------------- |
| [`swappable:start`][swappablestart]     | Gets fired when starting to drag                    | true       | Prevents drag     |
| [`swappable:swap`][swappableswap]       | Gets fired before the source gets swapped           | true       | Prevents swap     |
| [`swappable:swapped`][swappableswapped] | Gets fired before the source gets swapped           | false      | -                 |
| [`swappable:stop`][swappablestop]       | Gets fired when dragging out of a droppable element | false      | -                 |

[swappablestart]: SwappableEvent#swappablestartevent
[swappableswap]: SwappableEvent#swappableswapevent
[swappableswapped]: SwappableEvent#swappableswappedevent
[swappablestop]: SwappableEvent#swappablestopevent

### Classes

Check out [Draggables class identifiers](../Draggable#classes)

### Example

This sample code will make list items draggable and allows you to swap them with other draggable elements:

```js
import {Swappable} from '@shopify/draggable';

const swappable = new Swappable(document.querySelectorAll('ul'), {
  draggable: 'li',
});

swappable.on('swappable:start', () => console.log('swappable:start'));
swappable.on('swappable:swapped', () => console.log('swappable:swapped'));
swappable.on('swappable:stop', () => console.log('swappable:stop'));
```
