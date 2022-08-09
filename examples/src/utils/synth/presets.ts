export type Preset = {
	wave: OscillatorType;
	freq: { start: number; end: number };
	volume: number;
	duration: number;
};

const SynthPresets: Record<string, Preset> = {
	up: {
		wave: 'sine',
		freq: { start: 392, end: 493.88 },
		volume: 1,
		duration: 0.2
	},
	downBad: {
		wave: 'sine',
		freq: { start: 587.33, end: 392 },
		volume: 1,
		duration: 0.1
	},
	downGood: {
		wave: 'sine',
		freq: { start: 493.88, end: 698.46 },
		volume: 1,
		duration: 0.1
	},
	swap: {
		wave: 'sine',
		freq: { start: 880, end: 1760 },
		volume: 0.2,
		duration: 0.06
	},
	powerOn: {
		wave: 'triangle',
		freq: { start: 146.83, end: 185 },
		volume: 1,
		duration: 1
	},
	powerOff: {
		wave: 'triangle',
		freq: { start: 185, end: 110 },
		volume: 1,
		duration: 1.2
	}
};

export default SynthPresets;
