// arrayContainsArray
// Returns `true` if the first specified array contains all elements
// from the second array, otherwise returns `false`
// https://github.com/lodash/lodash/issues/1743
// -----------------------------------------------------------------------------
export function arrayContainsArray(superset, subset) {
  return subset.every((value) => {
    return (superset.indexOf(value) >= 0);
  });
}
