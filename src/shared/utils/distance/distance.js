/**
 * Returns the distance between two points
 * @param  {Number} x1 The X position of the first point
 * @param  {Number} y1 The Y position of the first point
 * @param  {Number} x2 The X position of the second point
 * @param  {Number} y2 The Y position of the second point
 * @return {Number}
 */
export default function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
