<a href="https://circleci.com/gh/Shopify/draggable">
  <img src="https://circleci.com/gh/Shopify/draggable.svg?style=shield&circle-token=bd97f87d63e330e3b4b186ef11d8223889ef925f" title="CircleCI status" alt="CircleCI status">
</a>

<hr/>

<a href="https://shopify.github.io/draggable" title="Visit Draggable website">
  <img src="https://user-images.githubusercontent.com/643944/30787041-84ccc1aa-a14e-11e7-982d-972978185636.png" alt="">
</a>

<hr/>


> **Warning:** Draggable is currently in beta

Get complete control over drag and drop behaviour with Draggable! Draggable abstracts
native browser events into a comprehensive API to create a custom drag and drop experience.
`Draggable` comes with additional modules: `Sortable`, `Droppable`, `Swappable`. Draggable
itself does not perform any sorting behaviour while dragging, but does the heavy lifting, e.g.
creates mirror, emits events, manages sensor events, makes elements draggable.

The additional modules are built on top of `Draggable` and therefore provide a similar API
interface, for more information read the documentation below.

**Features**
- Works with native drag, mouse, touch and force touch events
- Can extend dragging behaviour by hooking into draggables event life cycle
- Can extend drag detection by adding sensors to draggable
- The library is targeted ES6 first

## Table of Contents

* [Install](#install)
* [Draggable](#draggable)
  * [API](#api)
  * [Options](#options)
  * [Events](#events)
  * [Classes](#classes)
  * [Example](#example)
* [Sortable](#sortable)
  * [API](#api-1)
  * [Options](#options-1)
  * [Events](#events-1)
  * [Classes](#classes-1)
  * [Example](#example-1)
* [Droppable](#droppable)
  * [API](#api-2)
  * [Options](#options-2)
  * [Events](#events-2)
  * [Classes](#classes-2)
  * [Example](#example-2)
* [Swappable](#swappable)
  * [API](#api-3)
  * [Options](#options-3)
  * [Events](#events-3)
  * [Classes](#classes-3)
  * [Example](#example-3)
* [Plugins](#plugins)
  * [Collidable](#collidable)
  * [Snappable](#snappable)
* [Known issues](#known-issues)
* [Contributing](#contributing)
* [Roadmap](#roadmap)
* [Copyright](#copyright)

## Install

You can install the library via npm.

```
npm install @shopify/draggable --save
```

or via yarn:

```
yarn add @shopify/draggable
```

or via CDN

```
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.2/lib/draggable.js"></script>
```

## Draggable

### API

**`new Draggable(containers: Array[HTMLElement]|NodeList, options: Object): Draggable`**  
To create a draggable instance you need to specify the containers that hold draggable items, e.g.
`[document.body]` would work too. The second argument is an options object, which is described
below.

**`draggable.on(eventName: String, listener: Function): Draggable`**  
Draggable is an event emitter, so you can register callbacks for events. Draggable
also supports method chaining.

**`draggable.off(eventName: String, listener: Function): Draggable`**  
You can unregister listeners by using `.off()`, make sure to provide the same callback.

**`draggable.trigger(eventName: String, event: AbstractEvent): Draggable`**  
You can trigger events through draggable. This is used to fire events internally or by
extensions of Draggable.

**`draggable.destroy(): void`**  
Detaches all sensors and listeners, and cleans up after itself.

### Options

**`draggable {String}`**  
A css selector for draggable elements within the `containers` specified. By default it will
look for an element with `.draggable-source` class. Default: `.draggable-source`

**`handle {String}`**  
Specify a `css` selector for a handle element if you don't want to allow drag action
on the entire element. Default: `null`

**`delay {Number}`**  
If you want to delay a `drag:start` you can specify delay in milliseconds. This can be useful
for draggable elements within scrollable containers. Default: `0`

**`native {Boolean}`**  
If enabled, Draggable will use the browsers native drag events to detect drag behaviour. By default
it will use mouse events to detect drag behaviour. You can only customize the mirror element when
using mouse events, otherwise mirror will be `null` in events. Default: `false`

**`plugins {Array[Plugin]}`**  
Plugins add behaviour to Draggable by hooking into its life cycle, e.g. one of the default
plugins controls the mirror movement. Default: `[]`

**`appendTo {String|HTMLElement|Function}`**  
Draggable allows you to specify where the mirror should be appended to. You can specify a css
selector, a HTMLElement or a function that returns a HTMLElement

**`classes {Object}`**  
Draggable adds classes to elements to indicate state. These classes can be used to add styling
on elements in certain states.

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `drag:start`          | Gets fired when drag action begins                         | true        | Prevents drag start  |
| `drag:move`           | Gets fired when moving a draggable around                  | false       | -                    |
| `drag:over`           | Gets fired when dragging over other draggable              | false       | -                    |
| `drag:over:container` | Gets fired when dragging over other draggable container    | false       | -                    |
| `drag:out`            | Gets fired when dragging out of other draggable            | false       | -                    |
| `drag:out:container`  | Gets fired when dragging out of other draggable container  | false       | -                    |
| `drag:stop`           | Gets fired when draggable has been released                | false       | -                    |
| `drag:pressure`       | Gets fired when using force touch on draggable element     | false       | -                    |
| `mirror:created`      | Gets fired when draggable mirror gets created              | false       | -                    |
| `mirror:attached`     | Gets fired when draggable mirror gets attached to DOM      | false       | -                    |
| `mirror:move`         | Gets fired when draggable mirror moves                     | true        | Stop mirror movement |

### Classes

| Name                 | Description                                                          | Default                            |
| -------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| `body:dragging`      | Class added on the document body while dragging                      | `draggable--is-dragging`           |
| `container:dragging` | Class added on the container where the draggable was picked up from  | `draggable-container--is-dragging` |
| `source:dragging`    | Class added on the draggable element that has been picked up         | `draggable-source--is-dragging`    |
| `source:placed`      | Class added on the draggable element on `drag:stop`                  | `draggable-source--placed`         |
| `container:placed`   | Class added on the draggable container element on `drag:stop`        | `draggable-container--placed`      |
| `draggable:over`     | Class added on draggable element you are dragging over               | `draggable--over`                  |
| `container:over`     | Class added on draggable container element you are dragging over     | `draggable-container--over`        |
| `mirror`             | Class added on the mirror element                                    | `draggable-mirror`                 |

### Example

This sample code will make list items draggable:

```js
import {Draggable} from '@shopify/draggable';

new Draggable(document.querySelectorAll('ul'))
  .on('drag:start', () => console.log('drag:start'))
  .on('drag:move',  () => console.log('drag:move'))
  .on('drag:stop',  () => console.log('drag:stop'));
```

## Sortable

Sortable allows you to reorder elements. It maintains the order internally and fires
three events on top of the draggable events: `sortable:start`, `sortable:sorted` and `sortable:stop`.

### API

**`new Sortable(containers: Array[HTMLElement]|NodeList, options: Object): Sortable`**  
To create a sortable instance you need to specify the containers that hold draggable items, e.g.
`[document.body]` would work too. The second argument is an options object, which is described
below.

**`sortable.on(eventName: String, listener: Function): Sortable`**  
Sortable uses Draggables event emitter, so you can register callbacks for events. Sortable
also supports method chaining.

**`sortable.off(eventName: String, listener: Function): Sortable`**  
You can unregister listeners by using `.off()`, make sure to provide the same callback.

**`sortable.trigger(eventName: String, event: AbstractEvent): Sortable`**  
You can trigger events through sortable. This is used to fire events internally or by
extensions of Draggable.

**`sortable.destroy(): void`**  
Detaches all sensors and listeners, and cleans up after itself.

### Options

__Same as Draggable__

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `sortable:start`      | Gets fired when drag action begins                         | true        | Prevents drag start  |
| `sortable:sorted`     | Gets fired when the source gets sorted in the DOM          | false       | -                    |
| `sortable:stop`       | Gets fired when dragging over other draggable              | false       | -                    |

### Classes

__Same as Draggable__

### Example

This sample code will make list items draggable:

```js
import {Sortable} from '@shopify/draggable';

new Sortable(document.querySelectorAll('ul'))
  .on('sortable:start', () => console.log('sortable:start'))
  .on('sortable:sorted', () => console.log('sortable:sorted'))
  .on('sortable:stop', () => console.log('sortable:stop'));
```

## Droppable

Droppable allows you to declare draggable and droppable elements via options.
Droppable fires two events on top of the draggable events: `droppable:over` and `droppable:out`.

### API

**`new Droppable(containers: Array[HTMLElement]|NodeList, options: Object): Droppable`**  
To create a droppable instance you need to specify the containers that hold draggable items, e.g.
`[document.body]` would work too. The second argument is an options object, which is described
below.

**`droppable.on(eventName: String, listener: Function): Droppable`**  
Droppable uses Draggables event emitter, so you can register callbacks for events. Droppable
also supports method chaining.

**`droppable.off(eventName: String, listener: Function): Droppable`**  
You can unregister listeners by using `.off()`, make sure to provide the same callback.

**`droppable.trigger(eventName: String, event: AbstractEvent): Droppable`**  
You can trigger events through droppable. This is used to fire events internally or by
extensions of Draggable.

**`droppable.destroy(): void`**  
Detaches all sensors and listeners, and cleans up after itself.

### Options

**`droppable {String|Array[HTMLElement]|NodeList|Function}`**  
A css selector string, an array of elements, a NodeList or a function returning elements for droppable
elements within the `containers` specified.

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `droppable:over`      | Gets fired when dragging over droppable element            | true        | Prevents drop        |
| `droppable:out`       | Gets fired when dragging out of a droppable element        | true        | Prevents release     |

### Classes

| Name                 | Description                                                          | Default                            |
| -------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| `droppable:active`   | Class added on droppables when drag starts                           | `draggable-droppable--active`      |
| `droppable:occupied` | Class added on droppable element, when it contains a draggable       | `draggable-droppable--occupied`    |

### Example

This sample code will make list items draggable and allows to drop them inside another element:

```js
import {Droppable} from '@shopify/draggable';

const droppable = new Droppable(document.querySelectorAll('ul'), {
  draggable: 'li',
  droppable: '#dropzone',
});

droppable.on('droppable:over', () => console.log('droppable:over'))
droppable.on('droppable:out', () => console.log('droppable:out'));
```

## Swappable

Swappable allows you to swap elements by dragging over them. No order will be maintained (unlike Sortable),
so any draggable element that gets dragged over will be swapped with the source element.

### API

**`new Swappable(containers: Array[HTMLElement]|NodeList, options: Object): Swappable`**  
To create a swappable instance you need to specify the containers that hold draggable items, e.g.
`[document.body]` would work too. The second argument is an options object, which is described
below.

**`swappable.on(eventName: String, listener: Function): Swappable`**  
Swappable uses Draggables event emitter, so you can register callbacks for events. Swappable
also supports method chaining.

**`swappable.off(eventName: String, listener: Function): Swappable`**  
You can unregister listeners by using `.off()`, make sure to provide the same callback.

**`swappable.trigger(eventName: String, event: AbstractEvent): Swappable`**  
You can trigger events through swappable. This is used to fire events internally or by
extensions of Draggable.

**`droppable.destroy(): void`**  
Detaches all sensors and listeners, and cleans up after itself.

### Options

__Same as Draggable__

### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `swappable:start`     | Gets fired when starting to drag                           | true        | Prevents drag        |
| `swappable:swapped`   | Gets fired before the source gets swapped                  | true        | Prevents swap        |
| `swappable:stop`      | Gets fired when dragging out of a droppable element        | false       | -                    |

### Classes

__Same as Draggable__

### Example

This sample code will make list items draggable and allows to drop them inside another element:

```js
import {Swappable} from '@shopify/draggable';

const swappable = new Swappable(document.querySelectorAll('ul'), {
  draggable: 'li',
});

swappable.on('swappable:start', () => console.log('swappable:start'))
swappable.on('swappable:swapped', () => console.log('swappable:swapped'));
swappable.on('swappable:stop', () => console.log('swappable:stop'));
```

## Plugins

Draggables ships with two optional plugins: `Collidable` & `Snappable`

### Collidable

When you use the collidable plugin you can specify which elements you **can't** drag over
and it will freeze the mirror movement for you. These currently only work with `Sortable`, `Swappable` and `Droppable`.

#### Options

**`collidables {String|Array[HTMLElement]|NodeList|HTMLElement|Function}`**  
A css selector string, an array of elements, a NodeList, a HTMLElement or a function returning elements for collidable
elements.

#### Events

| Name                  | Description                                                | Cancelable  | Cancelable action    |
| --------------------- | ---------------------------------------------------------- | ----------- | -------------------- |
| `collidable:in`       | Gets fired when dragging near a collidable element         | false       | -                    |
| `collidable:out`      | Gets fired when dragging away from a collidable element    | false       | -                    |

#### Example

```js
import {Sortable, Collidable} from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  collidables: '.other-list',
  plugins: [Collidable]
});

sortable.on('collidable:in', () => console.log('collidable:in'));
sortable.on('collidable:out', () => console.log('collidable:out'));
```

### Snappable

Snappable simulates a "snap" by hiding the mirror and removing the `'source:dragging'` class from the source.
It also sets the `'source:placed'` class for potential drop animations.

#### Options

_No options_

#### Events

| Name                  | Description                                                | Cancelable  | Cancelable action     |
| --------------------- | ---------------------------------------------------------- | ----------- | --------------------- |
| `snap:in`             | Gets fired when just before snapping in                    | true        | Prevents snapping     |
| `snap:out`            | Gets fired when snapping out                               | false       | Prevents snapping out |

#### Example

```js
import {Sortable, Snappable} from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('ul'), {
  draggable: 'li',
  plugins: [Snappable]
});

sortable.on('snap:in', () => console.log('snap:in'));
sortable.on('snap:out', () => console.log('snap:out'));
```

## Known issues

- Touch events freeze sometimes while dragging
- Safari 11 uses force touch, but there are no visual guidelines on the website

## Contributing

Contributions are more than welcome, the code base is still new and needs more love.

For more information, please checkout the [contribution document](https://github.com/Shopify/draggable/blob/master/CONTRIBUTION.md).

## Roadmap

The roadmap for the official release is still in the works. More to come

## Copyright

Copyright (c) 2017 Shopify. See LICENSE.md for further details.
