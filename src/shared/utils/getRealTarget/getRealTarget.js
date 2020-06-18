/**
 * Gets the target of the event irrespective of shadow DOMs
 * @param  {Event|SensorEvent} event The event
 * @return {Element}
 */
export default function getRealTarget(event) {
  let target = event.target;
  let parent;
  while (target && target.shadowRoot) {
    target = target.shadowRoot.elementFromPoint(event.clientX, event.clientY);
    if (target === parent) break;
    parent = target;
  }
  return target;
}
