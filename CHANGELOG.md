# Changelog

## v1.0.0-beta.5 - ?

### Added

### Changed

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
