import Synth from './synth';
import Single from './single';
import Loop from './loop';

export const audioWarning =
	'This browser does not support the latest Web Audio API. Some sounds may be disabled.';

export type SoundEffectsType = {
	synth: Synth;
	single: Single;
	accessible: Loop;
	extensible: Loop;
};

export const soundEffects: SoundEffectsType = {
	synth: new Synth(),
	single: new Single(),
	accessible: new Loop('accessible'),
	extensible: new Loop('extensible')
};
