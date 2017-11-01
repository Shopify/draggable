# Changelog

## v1.0.0-beta.4 - ?

### Added

### Changed

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
