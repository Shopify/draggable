import * as soundUtils from '../sound';

const initialGain = 0.001;
const maxGain = 0.3;

const durationRamp = {
	up: 0.2,
	down: 0.3
};

// 310ms: just long enough to allow the fade out to complete
// before suspending playback
const fadeTimeout = durationRamp.down * 1000 + 10;

const assetPaths = {
	accessible: ['assets/audio/accessible-hover.wav', 'assets/audio/accessible-active.wav'],
	extensible: ['assets/audio/extensible.wav']
};

export default class Loop {
	private sources: Record<string, AudioBufferSourceNode> = {};
	private context: AudioContext = new AudioContext();
	private gainNodes: Record<string, GainNode> = {};
	private trackCount: number;
	private hasStarted = false;

	constructor(key: keyof typeof assetPaths) {
		if (!(key in assetPaths)) throw Error(`The requested sound is not available: ${key}`);
		this.trackCount = assetPaths[key].length;

		assetPaths[key].forEach((path, index) => {
			this.createGainNodes(index);
			soundUtils
				.fetchAudioBuffer(path, this.context)
				.then((response) => this.connectSource(response, index));
		});
	}

	public mute = (trackNumber: number) => {
		this.gainNodes[`node${trackNumber}`].gain.exponentialRampToValueAtTime(
			initialGain,
			this.context.currentTime + durationRamp.down
		);
	};

	public unmute = (trackNumber: number) => {
		this.gainNodes[`node${trackNumber}`].gain.exponentialRampToValueAtTime(
			maxGain,
			this.context.currentTime + durationRamp.up
		);
	};

	public play = () => {
		if (this.hasStarted) this.resume();
		else {
			for (let i = 0; i < this.trackCount; i++) this.sources[`source${i}`].start();
			this.unmute(0);
			this.hasStarted = true;
		}
	};

	public pause = () => {
		for (let i = 0; i < this.trackCount; i++) this.mute(i);

		setTimeout(() => {
			this.context.suspend();
		}, fadeTimeout);
	};

	public resume = async () => {
		try {
			await this.context.resume();
			return this.unmute(0);
		} catch (error) {
			throw new Error(`Something went wrong with resuming playback: ${error}`);
		}
	};

	public speed = (speed = 1) => {
		const duration = speed > 1 ? durationRamp.up : durationRamp.down;

		for (let i = 0; i < this.trackCount; i++) {
			this.sources[`source${i}`].playbackRate.exponentialRampToValueAtTime(
				speed,
				this.context.currentTime + duration
			);
		}
	};

	private connectSource = (sound: AudioBuffer, index: number) => {
		if (sound) {
			const sourceKey = `source${index}`;

			this.sources[sourceKey] = this.context.createBufferSource();
			this.sources[sourceKey].buffer = sound;
			this.sources[sourceKey].loop = true;

			this.sources[sourceKey]
				.connect(this.gainNodes[`node${index}`])
				.connect(this.context.destination);
		}
	};

	private createGainNodes = (index: number) => {
		const gainKey = `node${index}`;

		this.gainNodes[gainKey] = this.context.createGain();
		this.gainNodes[gainKey].gain.setValueAtTime(initialGain, this.context.currentTime);
	};
}
