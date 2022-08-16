[![npm version](https://badge.fury.io/js/@hnrq%2Fdraggable.svg)](https://badge.fury.io/js/@hnrq%2Fdraggable)
[![codecov](https://codecov.io/gh/hnrq/draggable/branch/main/graph/badge.svg?token=LIMBUVCRB9)](https://codecov.io/gh/hnrq/draggable)

<a href="https://shopify.github.io/draggable" title="Visit Draggable website">
  <img src="assets/header.jpg" alt="">
</a>

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

- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Browser Compatibility](#browser-compatibility)
- [Documentation](#documentation)
- [Running examples](#running-examples)
- [Contributing](#contributing)

## Install

You can install the library via pnpm.

```
pnpm install @hnrq/draggable --save
```

## Browser Compatibility

<table>
<thead>
  <tr>
    <th>
      <img src="https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" />
    </th>
    <th>
      <img src="https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" />
    </th>
    <th>
      <img src="https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" />
    </th>
    <th>
      <img src="https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" />
    </th>
    <th>
      <img src="https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" />
    </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">Latest ✔</td>
    <td class="tg-0pky">Latest ✔</td>
    <td class="tg-0pky">Latest ✔</td>
    <td class="tg-0pky">Latest ✔</td>
    <td class="tg-0pky">Latest ✔</td>
  </tr>
</tbody>
</table>

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
  - [SortAnimation](src/Plugins/SortAnimation) (Added in: v1.0.0-beta.10)
- [Sortable](src/Sortable)
  - [SortableEvent](src/Sortable/SortableEvent)
- [Swappable](src/Swappable)
  - [SwappableEvent](src/Swappable/SwappableEvent)

## Running examples

To run the `examples` project locally, simply run the following from the `examples` folder:

```
pnpm build && pnpm dev
```

## Contributing

Contributions are more than welcome, the code base is still new and needs more love.
For more information, please checkout [CONTRIBUTING.md](https://github.com/hnrq/draggable/blob/master/CONTRIBUTING.md).
