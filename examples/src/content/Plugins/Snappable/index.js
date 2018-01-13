/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import Swappable from 'lib/swappable';
import Snappable from 'lib/plugins/snappable';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function PluginsSnappable() {
  const containerSelector = '#Snappable .BlockLayout';
  const containers = document.querySelectorAll(containerSelector);

  if (containers.length === 0) {
    return false;
  }

  const swappable = new Swappable(containers, {
    appendTo: containerSelector,
    mirror: {
      constrainDimensions: true,
    },
    plugins: [Snappable],
  });

  // --- Draggable events --- //
  swappable.on('drag:start', evt => {
    if (evt.originalSource.classList.contains('Block--typeStripes')) {
      evt.cancel();
    }
  });

  return swappable;
}
