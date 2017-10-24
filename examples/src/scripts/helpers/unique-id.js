// uniqueID
// generate a unique ID : https://gist.github.com/gordonbrander/2230317
// -----------------------------------------------------------------------------
export function uniqueID(prefix = '_') {
  return `${prefix}${Math.random().toString(36).substr(2, 9)}`;
}
