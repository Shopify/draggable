## Collidable

When you use the collidable plugin you can specify which elements you **can't** drag over and it will freeze
the mirror movement for you. These currently only work with `Sortable`, `Swappable` and `Droppable`.

This plugin is not included by default, so make sure to import it before using.

### Import

```js
import { Plugins } from '@shopify/draggable';
```

```js
import Collidable from '@shopify/draggable/lib/plugins/collidable';
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/plugins.js"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/plugins/collidable.js"></script>
```

### Options

**`collidables {String|HTMLElement[]|NodeList|HTMLElement|Function}`**  
A css selector string, an array of elements, a NodeList, a HTMLElement or a function returning elements for collidable elements.

### Events

| Name                              | Description                                             | Cancelable | Cancelable action |
| --------------------------------- | ------------------------------------------------------- | ---------- | ----------------- |
| [`collidable:in`][collidablein]   | Gets fired when dragging near a collidable element      | false      | -                 |
| [`collidable:out`][collidableout] | Gets fired when dragging away from a collidable element | false      | -                 |

[collidablein]: CollidableEvent#collidableinevent
[collidableout]: CollidableEvent#collidableoutevent

### Example

```js
import { Sortable, Plugins } from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  collidables: '.other-list',
  plugins: [Plugins.Collidable]
});

sortable.on('collidable:in', () => console.log('collidable:in'));
sortable.on('collidable:out', () => console.log('collidable:out'));
```

### Plans

* Improving collision detection for mirror

### Caveats

* Currently only bases collision based on mouse cursor and not mirror element
