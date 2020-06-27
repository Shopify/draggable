export default function grid(gridOptions) {
  const {
    range,
    limits = {
      left: -Infinity,
      right: Infinity,
      top: -Infinity,
      bottom: Infinity,
    },
  } = gridOptions;

  return function gridFunc(x, y) {
    const result = {range, grid, x: null, y: null};

    const gridx = Math.round(x / gridOptions.x);
    const gridy = Math.round(y / gridOptions.y);

    result.x = Math.max(limits.left, Math.min(limits.right, gridx * gridOptions.x));
    result.y = Math.max(limits.top, Math.min(limits.bottom, gridy * gridOptions.y));

    return result;
  };
}
