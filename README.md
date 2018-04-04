[![CircleCI](https://circleci.com/gh/Shopify/draggable/tree/master.svg?style=shield)](https://circleci.com/gh/Shopify/draggable/tree/master)
[![npm version](https://badge.fury.io/js/%40shopify%2Fdraggable.svg)](https://badge.fury.io/js/%40shopify%2Fdraggable)
[![codecov](https://codecov.io/gh/Shopify/draggable/branch/master/graph/badge.svg)](https://codecov.io/gh/Shopify/draggable)
[![Greenkeeper badge](https://badges.greenkeeper.io/Shopify/draggable.svg)](https://greenkeeper.io/)

<a href="https://shopify.github.io/draggable" title="Visit Draggable website">
  <img src="https://user-images.githubusercontent.com/643944/35602291-99e2c56e-0605-11e8-847f-95f1f6be1610.jpg" alt="">
</a>

> **Currently in beta!** While Draggable is very close to a full release, the API is still subject to change. We keep an updated CHANGELOG with every release, so when upgrading from a previous version, please check and see what has changed.

Get complete control over drag and drop behaviour with Draggable! Draggable abstracts
native browser events into a comprehensive API to create a custom drag and drop experience.
`Draggable` comes with additional modules: `Sortable`, `Droppable`, `Swappable`. Draggable
itself does not perform any sorting behaviour while dragging, but does the heavy lifting, e.g.
creates mirror, emits events, manages sensor events, makes elements draggable.

The additional modules are built on top of `Draggable` and therefore provide a similar API
interface, for more information read the documentation below.

**Features**

* Works with native drag, mouse, touch and force touch events
* Can extend dragging behaviour by hooking into draggables event life cycle
* Can extend drag detection by adding sensors to draggable
* The library is targeted ES6 first

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
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/draggable.bundle.js"></script>
<!-- legacy bundle for older browsers (IE11) -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/draggable.bundle.legacy.js"></script>
<!-- Draggable only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/draggable.js"></script>
<!-- Sortable only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/sortable.js"></script>
<!-- Droppable only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/droppable.js"></script>
<!-- Swappable only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/swappable.js"></script>
<!-- Plugins only -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/plugins.js"></script>
```

## Browser Compatibility

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Latest ✔                                                                                 | Latest ✔                                                                                    | 11+ ✔                                                                                                                        | Latest ✔                                                                              | Latest ✔                                                                                 | Latest ✔                                                                           |

## Bundle sizes

| Package name               | ES6 bundle sizes | ES5 bundle sizes |
| -------------------------- | ---------------- | ---------------- |
| draggable.bundle.js        | ~11kb            | ~19.2kb          |
| draggable.bundle.legacy.js | ~19.2kb          | ~25.63kb         |
| draggable.js               | ~8.06kb          | ~15.36kb         |
| sortable.js                | ~8.93kb          | ~16.51kb         |
| swappable.js               | ~8.56kb          | ~16.14kb         |
| droppable.js               | ~8.8kb           | ~16.55kb         |
| plugins.js                 | ~2.37kb          | ~8.76kb          |
| plugins/collidable.js      | ~1.45kb          | ~7.81kb          |
| plugins/snappable.js       | ~1.19kb          | ~6.94kb          |
| plugins/swap-animation.js  | ~1kb             | ~6.65kb          |

## Documentation

You can find the documentation for each module within their respective directories.

* [Draggable](src/Draggable)
  * [DragEvent](src/Draggable/DragEvent)
  * [DraggableEvent](src/Draggable/DraggableEvent)
  * [MirrorEvent](src/Draggable/MirrorEvent)
  * [Plugins](src/Draggable/Plugins)
    * [Announcement](src/Draggable/Plugins/Announcement)
    * [Focusable](src/Draggable/Plugins/Focusable)
    * [Mirror](src/Draggable/Plugins/Mirror)
    * [Scrollable](src/Draggable/Plugins/Scrollable)
  * [Sensors](src/Draggable/Sensors)
    * [DragSensor](src/Draggable/Sensors/DragSensor)
    * [ForceTouchSensor](src/Draggable/Sensors/ForceTouchSensor)
    * [MouseSensor](src/Draggable/Sensors/MouseSensor)
    * [Sensor](src/Draggable/Sensors/Sensor)
    * [SensorEvent](src/Draggable/Sensors/SensorEvent)
    * [TouchSensor](src/Draggable/Sensors/TouchSensor)
* [Droppable](src/Droppable)
  * [DroppableEvent](src/Droppable/DroppableEvent)
* [Plugins](src/Plugins)
  * [Collidable](src/Plugins/Collidable)
  * [Snappable](src/Plugins/Snappable)
  * [SwapAnimation](src/Plugins/SwapAnimation)
* [Sortable](src/Sortable)
  * [SortableEvent](src/Sortable/SortableEvent)
* [Swappable](src/Swappable)
  * [SwappableEvent](src/Swappable/SwappableEvent)

## Running examples

To run the `examples` project locally, simply run the following from the `draggable` root:

```
yarn && yarn start
```

This will start a server that hosts the contents of `examples/`. It also watches for file
changes from both `src/` and `examples/src` and reloads the browser.

## Contributing

Contributions are more than welcome, the code base is still new and needs more love.

For more information, please checkout the [contributing document](https://github.com/Shopify/draggable/blob/master/CONTRIBUTING.md).

## Roadmap

We are currently working on `v1.0.0-beta.7`. Check out the [project board](https://github.com/Shopify/draggable/projects/3) to see tasks and follow progress on the release. Any Pull Requests should be pointed against the feature branch `v1.0.0-beta.7`.

## Related resources

* [Ember CLI Shim](https://github.com/timrourke/ember-cli-shopify-draggable-shim) on Github by [@timrourke](https://github.com/timrourke)
* [Ember CLI Shim](https://www.npmjs.com/package/ember-cli-shopify-draggable-shim) on NPM by [@timrourke](https://github.com/timrourke)

## Copyright

Copyright (c) 2018 Shopify. See LICENSE.md for further details.
