# Changelog

## 1.1.2

### Patch Changes

- [#579](https://github.com/Shopify/draggable/pull/579) [`bb23ff2`](https://github.com/Shopify/draggable/commit/bb23ff21f693b623e76c935d8ea4fb58ac57d36c) Thanks [@tsov](https://github.com/tsov)! - Convert CollidableEvent to typescript

- [#579](https://github.com/Shopify/draggable/pull/579) [`9154a96`](https://github.com/Shopify/draggable/commit/9154a9683a0fecfdc4a4759319221ca59c43421a) Thanks [@tsov](https://github.com/tsov)! - Convert SensorEvent to typescript

- [#579](https://github.com/Shopify/draggable/pull/579) [`74c35e5`](https://github.com/Shopify/draggable/commit/74c35e5aa4bd5c3bb7dcaf8cc432c4d5d932ee3f) Thanks [@tsov](https://github.com/tsov)! - Convert SwappableEvent to typescript

- [#579](https://github.com/Shopify/draggable/pull/579) [`fb5354f`](https://github.com/Shopify/draggable/commit/fb5354ffc7688433ef12bcf8ca1b9f473f78cf06) Thanks [@tsov](https://github.com/tsov)! - Convert SortableEvent to typescript

- [#579](https://github.com/Shopify/draggable/pull/579) [`7734961`](https://github.com/Shopify/draggable/commit/773496192fc9a56f6cd24ec7a45f34c79aec4a6d) Thanks [@tsov](https://github.com/tsov)! - Converts DragEvent tests to typescript

- [#579](https://github.com/Shopify/draggable/pull/579) [`a0c3c90`](https://github.com/Shopify/draggable/commit/a0c3c90d8e93ac8ac0e19e5d37e271e6d97c4fa6) Thanks [@tsov](https://github.com/tsov)! - Convert DroppableEvent to typescript

- [#579](https://github.com/Shopify/draggable/pull/579) [`527dcb6`](https://github.com/Shopify/draggable/commit/527dcb67d50978ac81576603a57e42d77fff1eec) Thanks [@tsov](https://github.com/tsov)! - Converts MirrorEvent to typescript

- [#579](https://github.com/Shopify/draggable/pull/579) [`7219781`](https://github.com/Shopify/draggable/commit/721978147cef7f3cc5971fa0cbd636c87ddbe2c7) Thanks [@tsov](https://github.com/tsov)! - Convert SnappableEvent to typescript

- [#579](https://github.com/Shopify/draggable/pull/579) [`cc42520`](https://github.com/Shopify/draggable/commit/cc42520a2731191ae6459a22892d9c1da605b80d) Thanks [@tsov](https://github.com/tsov)! - Converts DraggableEvent to typescript

## 1.1.1

### Patch Changes

- [#580](https://github.com/Shopify/draggable/pull/580) [`873ef2b`](https://github.com/Shopify/draggable/commit/873ef2b59a10361ba4a0e885aaea51d2b2b5c298) Thanks [@tsov](https://github.com/tsov)! - Removes unused packages dependencies

- [#582](https://github.com/Shopify/draggable/pull/582) [`762ffbf`](https://github.com/Shopify/draggable/commit/762ffbf70d018fee101852c186e8d887d1127ce8) Thanks [@tsov](https://github.com/tsov)! - - Cleans up code comments from build folder
  - Also resolves absolute paths for ts build declarations
  - Renames build files with .cjs and .mjs

## 1.1.0

### Minor Changes

- [#574](https://github.com/Shopify/draggable/pull/574) [`b81e8f6`](https://github.com/Shopify/draggable/commit/b81e8f678f8e5b27392b6c56b6bb2684a48c0fe8) Thanks [@tsov](https://github.com/tsov)! - Converted build from webpack to rollout. Import paths have changed

## 1.0.1

### Patch Changes

- [#572](https://github.com/Shopify/draggable/pull/572) [`2a8ae0b`](https://github.com/Shopify/draggable/commit/2a8ae0b219beceb3338764afe25c2d6a9fe4f495) Thanks [@tsov](https://github.com/tsov)! - Converts ResizeMirror to typescript

## 1.0.0

### Patch Changes

- Adds changeset dependency for version management

## v1.0.0-beta.13 - 2021-05-17

### Added

- Add `mirror:moved` event
- Cancel Dragging on ESC key up

### Changed

- Fixes add missing exports `DelayOptions` and `DelayOptions`
- Fixes return early when the target isn't in handle or draggable elements sensor
- Fixes the argument type of the `trigger` method

## v1.0.0-beta.12 - 2020-09-29

### Added

- Added `drag:stopped` event that will be fired after drag finished
- Support specifying an array of class name to Draggable `classes` option

### Changed

- Fixes incorrect `oldIndex` value when working with **nested sortable**
- Fixes wrong same container checking bug when working with **nested sortable**
- Fixes bug `drag:start` event was triggered during the delay time
- Fixes missing `overContainer` property in **DragOutEvent**

## v1.0.0-beta.11 - 2020-07-14

### Added

- Added `exclude` option to allow disable default plugins and sensors
- Added missing plugin types
- Support set the type of callback function according to the event type

### Changed

- Fixes drag start concurrency (`delay` and `distance` options)
- Fixes text in mirror blurry
- Fixes accidently append mirror

## v1.0.0-beta.10 - 2020-06-18

### Added

- Added `SortAnimation` plugin
- Added `distance?: number` to DraggableOptions TS interface

### Changed

- Fix mirror dimensions when `constrainDimensions` is active and not using fixed item width

## v1.0.0-beta.9 - 2019-08-26

### Added

- Added `distance` option
- Added `thresholdX` and `thresholdY` mirror options

### Changed

- Fixes preventing of contextmenu in MouseSensor
- Fixes SortableEvent `over` and `overContainer` giving incorrect properties

## v1.0.0-beta.8 - 2018-09-07

### Changed

- Announcement plugin to use `textContent` instead of `innerHTML`

## v1.0.0-beta.7 - 2018-04-28

### Added

- ResizeMirror plugin

### Changed

- Fixed native drag events with draggable
- Mouse position bug in scrollable

## v1.0.0-beta.6 - 2018-04-04

### Added

- Focusable plugin
- Added DroppableStart event for `Droppable`
- Added DroppableStop event for `Droppable`
- Added recommended VSCode settings

### Changed

- Fixed `addContainer`/`removeContainer` api
- Touch sensor fixes (including iOS 11.3 issues)
- Renames `DroppableOver` to `DroppableDropped`
- Renames `DroppableOut` to `DroppableReturned`
- Fix legacy bundle
- Improved webpack building
- Using `console.error` instead of throwing error

## v1.0.0-beta.5 - 2018-03-02

### Added

- Increased Documentation coverage
- Increased Test coverage, including better testing environment
- Increased JSDoc coverage
- Added docblock section to `CONTRIBUTING.md`
- Added greenkeeper as integration for package dependency management
- Added codecov as integration for tracking test coverage
- Added github template issue
- Added github template PR
- Added yarn scripts for examples
- Added SensorEvent to exports
- Added yarn scripts for esdoc
- Added `Announcement` plugin for screen reader support
- Added cursor offset option for `Mirror` plugin
- Added `scrollableElements` option to `Scrollable` plugin
- Added `snappableElement` to `SnapEvent`
- Added examples to published package
- Added `Emitter` class for event emitting for draggable

### Changed

- Changed esdoc config
- Changed node version `8.9.1` to `8.9.4`
- Updated package dependencies
- Updated roadmap section in README
- Changed export statements
- Fixes draggable state after canceling `drag:start`
- Fixes `constrainDimensions` option for `Mirror` plugin
- Fixes mirror position with touch devices and `Scrollable`
- `AutoScroll` plugin has been renamed to `Scrollable`
- Fixes scrolling edge cases with `Scrollable`
- Fixes scrolling offset for touch devices in `Scrollable`
- Fixes npm install issue
- Fixes `overContainer` property for `DragOutContainerEvent`

## v1.0.0-beta.4 - 2018-01-15

### Added

- Default `Draggable` plugins get exposed statically on `Draggable.Plugins`
- Default `Scrollable` plugin for Draggable, which auto scrolls containers/viewport while dragging
- `yarn watch` task for auto-building the library
- `source:original` class option for Draggable
- `Draggable#getDraggableElementsForContainer` method, which returns all draggable elements for a given container
- `MirrorCreateEvent`, which allows for canceling mirror creation
- `AbstractPlugin` to use as Base class for all Draggable plugins
- More test coverage

### Changed

- Fixed `Sortable` sort logic by excluding mirror and original source elements in calculations
- `Draggable` `appendTo` option now uses sources parent element as default, instead of `document.body`
- `Draggable` appends over classes _after_ triggering over/out events
- `Draggable` appends source into empty containers
- Mirrors margin gets removed on creation in the mirror plugin
- Fix for mirror when drag start gets canceled
- Fixes memory leak in Draggable when calling `destroy()`
- Fixes race condition for the `source:placed` class
- Changed `AbstractEvent#_canceled` to use symbols for private instance variables
- Some fixes for the documentation READMEs

## v1.0.0-beta.3 - 2017-11-01

### Added

- Bundle split, draggable now exports multiple bundles
  - Adds JS bundle per module
  - Adds legacy bundle for IE11
- Adds axis & dimension constraint options for mirror plugin
- Basic swap animation plugin
- Draggables API is now accessible via inheritance for `Sortable`, `Swappable` and `Droppable`
- Draggables API extended
  - `addSensor` to add sensor dynamically
  - `removeSensor` to remove a sensor dynamically
  - `addPlugin` to add a plugin dynamically
  - `removePlugin` to remove a plugin dynamically
  - `addContainer` to add a container dynamically
  - `removeContainer` to remove a container dynamically
  - `isDragging` to check if instance is currently dragging
- New `sortable:sort` event that can be canceled to prevent sorting
- New `swappable:swap` event that can be canceled to prevent swapping
- Added more documentation

### Changes

- `SortableSortedEvent` (`sortable:sorted`) now returns correct indexes
- `SortableStartEvent` gets fired now
- Plugins and Sensors are exported with namespace
- Removes reflow by removing unused lookup of next scroll parent
- Draggable delay option is now `100` by default, instead of `0`
- Draggables private methods are now really private
- Sensor improvements
  - `TouchSensor` now prevents scrolling without preventDefault
  - `MouseSensor` now prevents native elements to start dragging during delay
  - All sensors now listen to document rather than each container

## v1.0.0-beta.2 - 2017-10-10

### Added

- Code of Conduct
- Contribution guidelines
- Documentation on `appendTo` option for `Draggable`
- Added concept of `originalSource`
- Fix for text selection issue
- Fix for native drag events firing for the `MouseSensor`
- Fix for missing `classes` option

### Changes

- README updates
- Touch improvements
- ForceTouchSensor is not included by default anymore
- Folder/File restructure
- Exports `AbstractEvent` as `BaseEvent`
- Update node version from `8.2.1` to `8.6.0`
- Clones event callbacks before triggering (to prevent mutation during iterations)
- Improvements to `closest` utils helper

## v1.0.0-beta - 2017-09-27

Initial release
