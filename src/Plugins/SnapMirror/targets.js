export function grid(options) {
  return function(x, y) {
    const result = {range: options.range, x: null, y: null};

    const gridx = Math.round(x / options.x);
    const gridy = Math.round(y / options.y);

    result.x = gridx * options.x;
    result.y = gridy * options.y;

    return result;
  };
}

export function line(options) {
  return function(x, y) {
    const result = {range: options.range, x: null, y: null};

    if (!options.y) {
      result.y = y;
      result.x = options.x;
      return result;
    }

    if (!options.x) {
      result.x = x;
      result.y = options.y;
      return result;
    }

    const intersection = verticalIntersection(options, {x, y});

    result.x = intersection.x;
    result.y = intersection.y;

    return result;
  };
}

/**
 * Get the coordinates of the foot of perpendicular of the given point on the given line
 * @param {*} intercepts x-intercept and y-intercept of the line
 * @param {*} point the given point
 *
 * line: y = b - (b / a) * x
 * perpendicular on the point: (y - d) / (x - c) = a / b
 */
function verticalIntersection({x: a, y: b}, {x: c, y: d}) {
  const x = (a * a * c + a * b * b - a * d * b) / (a * a + b * b);
  const y = b - (b / a) * x;
  return {
    x,
    y,
  };
}
