import distance from '.';

describe('utils/distance()', () => {
  it('calculates the distance between two points', () => {
    expect(distance(1, 1, 4, 5)).toBe(5);
  });
});
