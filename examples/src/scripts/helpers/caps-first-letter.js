// capsFirstLetter
// https://github.com/freeCodeCamp/freeCodeCamp/wiki/Capitalize-First-Letter-Of-String
// ----------------------------------------------------------------------------
export function capsFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
