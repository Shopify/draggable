---
'@shopify/draggable': patch
---

Fix `ResizeMirror` not registering its `mirror:destroy` listener in `attach()`. The listener was removed in `detach()` but never bound, so the internal `mirror` reference was never cleared between drags. The companion `Snappable` plugin already binds both `mirror:created` and `mirror:destroy`; this restores symmetry.
