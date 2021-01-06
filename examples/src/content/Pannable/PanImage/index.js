// eslint-disable-next-line import/no-unresolved
import {Pannable} from '@shopify/draggable';

export default function PanImage() {
  const containers = document.querySelectorAll('.PanImageContainer');

  if (containers.length === 0) {
    return false;
  }

  const pannable = new Pannable(containers, {
    draggable: '.PanImagePannable',
    delay: 0,
  });

  return pannable;
}
