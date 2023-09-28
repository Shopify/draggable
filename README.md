[![npm version](https://img.shields.io/npm/v/@shopify/draggable.svg?label=@shopify/draggable)](https://www.npmjs.com/package/@shopify/draggable) [![CI](https://github.com/shopify/draggable/workflows/CI/badge.svg)](https://github.com/Shopify/draggable/actions?query=branch%3Amain) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Shopify/draggable/blob/main/CONTRIBUTING.md) ![Bundle size](https://img.shields.io/badge/Bundle%20size-16.2kB-red.svg)

<a href="https://shopify.github.io/draggable" title="Visit Draggable website">
  <img src="https://user-images.githubusercontent.com/643944/35602291-99e2c56e-0605-11e8-847f-95f1f6be1610.jpg" alt="">
</a>

# Development

**Draggable is no longer maintained by its original authors.** Maintenance of this repo has been passed on to new collaborators and is no longer worked on by anyone at Shopify.

**We are still looking for more maintainers!** If anyone is interested in answering / triaging issues, reviewing / rejecting / approving PRs, and authoring code for bug fixes / new features — please send an email to `max.hoffmann (at) shopify (dot) com`. You may be asked a few questions before obtaining collaboration permission, but if everything checks out, we will happily add you as a collaborator.

---

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

- [Install](#install)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Copyright](#copyright)

## Install

You can install the library via npm.

```bash
npm install @shopify/draggable --save
```

or via yarn:

```bash
yarn add @shopify/draggable
```

or via CDN

```html
<!-- Entire bundle -->
<script type="module">
  import {
    Draggable,
    Sortable,
    Droppable,
    Swappable,
  } from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/index.mjs';
</script>
<!-- Draggable only -->
<script type="module">
  import Draggable from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Draggable/Draggable.mjs';
</script>
<!-- Sortable only -->
<script type="module">
  import Sortable from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Sortable/Sortable.mjs';
</script>
<!-- Droppable only -->
<script type="module">
  import Droppable from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Droppable/Droppable.mjs';
</script>
<!-- Swappable only -->
<script type="module">
  import Swappable from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Swappable/Swappable.mjs';
</script>
<!-- Plugins only -->
<script type="module">
  import * as Plugins from 'https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Plugins/index.mjs';
</script>
<!-- UMD browser -->
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable/build/umd/index.min.js"></script>
<script>
  console.log(window.Draggable);
</script>
```

## Browser Compatibility

Check the "browserlist" property in [package.json](https://github.com/Shopify/draggable/blob/main/package.json#L88) for more info

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Last 3 versions ✔                                                                       | Last 3 versions ✔                                                                          | Last 3 versions ✔                                                                    | Last 3 versions ✔                                                                       | Last 3 versions ✔                                                                 |

## Documentation

You can find the documentation for each module within their respective directories.

- [Draggable](src/Draggable)
  - [DragEvent](src/Draggable/DragEvent)
  - [DraggableEvent](src/Draggable/DraggableEvent)
  - [Plugins](src/Draggable/Plugins)
    - [Announcement](src/Draggable/Plugins/Announcement)
    - [Focusable](src/Draggable/Plugins/Focusable)
    - [Mirror](src/Draggable/Plugins/Mirror)
    - [MirrorEvent](src/Draggable/Plugins/Mirror/MirrorEvent)
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
  - [ResizeMirror](src/Plugins/ResizeMirror)
  - [Snappable](src/Plugins/Snappable)
  - [SwapAnimation](src/Plugins/SwapAnimation)
  - [SortAnimation](src/Plugins/SortAnimation)
- [Sortable](src/Sortable)
  - [SortableEvent](src/Sortable/SortableEvent)
- [Swappable](src/Swappable)
  - [SwappableEvent](src/Swappable/SwappableEvent)

### TypeScript

Draggable includes [TypeScript](http://typescriptlang.org) definitions.

[Documentation](doc/typescript.md)

## Running examples

To run the `examples` project locally, simply run the following from the `draggable` root:

```bash
yarn && yarn start
```

This will start a server that hosts the contents of `examples/`. It also watches for file
changes from both `src/` and `examples/src` and reloads the browser.

## Contributing

Contributions are more than welcome, the code base is still new and needs more love.

For more information, please checkout the [contributing document](https://github.com/Shopify/draggable/blob/main/CONTRIBUTING.md).

## Related resources

- [Ember CLI Shim](https://github.com/timrourke/ember-cli-shopify-draggable-shim) on Github by [@timrourke](https://github.com/timrourke)
- [Ember CLI Shim](https://www.npmjs.com/package/ember-cli-shopify-draggable-shim) on NPM by [@timrourke](https://github.com/timrourke)

## Copyright

Copyright (c) 2018-present Shopify. See LICENSE.md for further details.
