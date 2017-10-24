export default function deepObjectKey(obj, key) {
  let result = null;

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (prop === key) {
        return obj[prop];
      }

      if (obj[prop] instanceof Object) {
        result = deepObjectKey(obj[prop], key);
      }
    }
  }

  return result;
}
