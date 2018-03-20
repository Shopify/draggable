## Focusable

The Focusable plugin finds all draggable containers and elements on initialization
and decorates them with `tabindex` attributes.
The plugin will not override existing `tabindex` attributes on elements. This will
make draggable elements and containers focusable.

### API

**`new Focusable(draggable: Draggable): Focusable`**  
To create an focusable plugin instance.

**`focusable.getElements(): HTMLElement[]`**  
Returns container and draggable elements.

### Options

_No options_
