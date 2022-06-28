/**
 * Returns the first touch event found in touches or changedTouches of a touch events.
 * @param {TouchEvent} event a touch event
 * @return {Touch} a touch object
 */
const touchCoords = (event: TouchEvent = {} as TouchEvent): Touch => {
  const {touches, changedTouches} = event;
  return (touches && touches[0]) || (changedTouches && changedTouches[0]);
};

export default touchCoords;
