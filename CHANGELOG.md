# Changelog

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
