// eslint-disable-next-line import/no-unresolved
import {Draggable} from '@bestminr/draggable';

export default function PluginsMirror() {
  const containerSelector = '#Mirror .BlockLayout';
  const containers = document.querySelectorAll(containerSelector);

  if (containers.length === 0) {
    return false;
  }

  const draggable = new Draggable(containers, {
    mirror: {
      appendTo: containerSelector,
      createMirror(source) {
        // console.log('create mirror');
        const mirror = source.cloneNode(true);
        const heading = mirror.querySelector('.Heading');
        if (heading) {
          heading.textContent += ' Oho';
        }
        return mirror;
      },
    },
  });
  return draggable;
}
