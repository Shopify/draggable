<a href="https://circleci.com/gh/Shopify/draggable">
  <img src="https://circleci.com/gh/Shopify/draggable.svg?style=shield&circle-token=bd97f87d63e330e3b4b186ef11d8223889ef925f" title="CircleCI status" alt="CircleCI status">
</a>

<a href="https://shopify.github.io/draggable" title="Visit Draggable website">
  <img src="https://user-images.githubusercontent.com/643944/35602291-99e2c56e-0605-11e8-847f-95f1f6be1610.jpg" alt="">
</a>

> **Ready for production!** While Draggable may still be in beta, all existing features are stable and safe for consumption. Draggable will exit beta once all remaining features have been implemented.

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
* [Documentation](#documentation)
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

```html
<!-- Entire bundle -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.4/lib/draggable.bundle.js"></script>
<!-- legacy bundle for older browsers (IE11) -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.4/lib/draggable.bundle.legacy.js"></script>
<!-- Draggable only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.4/lib/draggable.js"></script>
<!-- Sortable only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.4/lib/sortable.js"></script>
<!-- Droppable only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.4/lib/droppable.js"></script>
<!-- Swappable only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.4/lib/swappable.js"></script>
<!-- Plugins only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.4/lib/plugins.js"></script>
```

## Documentation

You can find the documentation for each module within their respective directories.

- [Draggable](src/Draggable)
  - [DragEvent](src/Draggable/DragEvent)
  - [DraggableEvent](src/Draggable/DraggableEvent)
  - [MirrorEvent](src/Draggable/MirrorEvent)
  - [Plugins](src/Draggable/Plugins)
    - [Accessibility](src/Draggable/Plugins/Accessibility)
    - [Mirror](src/Draggable/Plugins/Mirror)
    - [Scrollable](src/Draggable/Plugins/Scrollable)
  - [Sensors](src/Draggable/Sensors)
    - [DragSensor](src/Draggable/Sensors/DragSensor)
    - [ForceTouchSensor](src/Draggable/Sensors/ForceTouchSensor)
    - [MouseSensor](src/Draggable/Sensors/MouseSensor)
    - [Sensor](src/Draggable/Sensors/Sensor)
    - [SensorEvent](src/Draggable/Sensors/SensorEvent)
    - [TouchSensor](src/Draggable/Sensors/TouchSensor)
- [Droppable](src/Droppable)
  - [DroppableEvent](src/Droppable/DroppableEvent)
- [Plugins](src/Plugins)
  - [Collidable](src/Plugins/Collidable)
  - [Snappable](src/Plugins/Snappable)
  - [SwapAnimation](src/Plugins/SwapAnimation)
- [Sortable](src/Sortable)
  - [SortableEvent](src/Sortable/SortableEvent)
- [Swappable](src/Swappable)
  - [SwappableEvent](src/Swappable/SwappableEvent)

## Running examples

To run the examples locally run

```
$ yarn install
$ yarn build
$ yarn start
```

This will start a server that hosts the contents of `examples/`. It also watches for file
changes from both `src/` and `examples/src` and reloads the browser.

## Contributing

Contributions are more than welcome, the code base is still new and needs more love.

For more information, please checkout the [contributing document](https://github.com/Shopify/draggable/blob/master/CONTRIBUTING.md).

## Roadmap

We are currently working on `v1.0.0-beta.5`. Check out the [project board](https://github.com/Shopify/draggable/projects/3) to see tasks and follow progress on the release. Any Pull Requests should be pointed against the feature branch `v1.0.0-beta.5`.

## Copyright

Copyright (c) 2018 Shopify. See LICENSE.md for further details.
