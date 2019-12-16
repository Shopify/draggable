/**
 * Returns the first touch event found in touches or changedTouches of a touch events.
 * @param {TouchEvent} event a touch event
 * @return {Touch} a touch object
 */
export default function touchCoords(event = {}) {
  const {touches, changedTouches} = event;
  return (touches && touches[0]) || (changedTouches && changedTouches[0]);
}
