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

    // TOD0: P1(0, a) P2(b, 0) P3(c, d) -> P(x, y)
    result.x = x;
    result.y = y;

    return result;
  };
}
