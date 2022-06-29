/**
 * Returns the first touch event found in touches or changedTouches of a touch events.
 */
const touchCoords = (event: TouchEvent = {} as TouchEvent): Touch => {
  const { touches, changedTouches } = event;
  return (touches && touches[0]) || (changedTouches && changedTouches[0]);
};

export default touchCoords;
