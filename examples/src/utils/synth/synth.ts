import presets, { type Preset } from './presets';

const initialGain = 0.001;

export default class Synth {
	static synthKeys = Object.keys(presets);
	private context = new AudioContext();

	public play = (sound: keyof typeof presets) => {
		if (this.context) {
			if (!(sound in presets)) return Error(`The requested sound is not available: ${sound}`);

			const config = presets[sound];
			const { oscillator, gainNode } = this.buildTone(config);
			(oscillator as OscillatorNode).start();

			const duration = (this.context?.currentTime ?? 0) + config.duration;
			return this.stop(oscillator as OscillatorNode, gainNode as GainNode, duration);
		}
	};

	private buildTone = (preset: Preset) => {
		if (this.context) {
			const oscillator = this.context.createOscillator();
			const gainNode = this.context.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(this.context.destination);

			oscillator.type = preset.wave;
			oscillator.frequency.setValueAtTime(preset.freq.start, this.context.currentTime);
			oscillator.frequency.exponentialRampToValueAtTime(
				preset.freq.end,
				this.context.currentTime + preset.duration / 2
			);

			gainNode.gain.setValueAtTime(initialGain, this.context.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(
				preset.volume,
				this.context.currentTime + preset.duration / 6
			);

			return { oscillator, gainNode };
		} else return {};
	};

	private stop = (oscillator: OscillatorNode, gainNode: GainNode, duration: number) => {
		gainNode.gain.exponentialRampToValueAtTime(initialGain, duration);
		oscillator.stop(duration);
	};
}
