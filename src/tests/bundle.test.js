import * as RealBundle from '../index';
import * as LegacyBundle from '../index.legacy';

describe('Package', () => {
  it('exports the same bundles for legacy bundle', () => {
    const realExports = Object.keys(RealBundle);
    const legacyExports = Object.keys(LegacyBundle);

    expect(legacyExports).toEqual(realExports);
  });
});
