import * as soundUtils from '../sound';

const singleGain = 0.5;
const reverseGain = 0.2;

export const assetPaths = {
	heroSuccess: 'assets/audio/hero-success.mp3',
	cubeUp: 'assets/audio/cube-up.mp3',
	cubeDown: 'assets/audio/cube-down.mp3',
	cubeOver: 'assets/audio/cube-over.mp3',
	cubeSort: 'assets/audio/cube-sort.mp3',
	cubeCollide: 'assets/audio/cube-collide.mp3',
	interactionHover: 'assets/audio/interaction-hover.mp3',
	interactionActive: 'assets/audio/interaction-active.mp3',
	animationUp1: 'assets/audio/animation-up-1.mp3',
	animationUp2: 'assets/audio/animation-up-2.mp3',
	animationUp3: 'assets/audio/animation-up-3.mp3',
	animationDown1: 'assets/audio/animation-down-1.mp3',
	animationDown2: 'assets/audio/animation-down-2.mp3',
	animationDown3: 'assets/audio/animation-down-3.mp3'
};

export default class Single {
	private sounds: Record<string, AudioBuffer> = {};
	private source?: AudioBufferSourceNode;
	private context: AudioContext = new AudioContext();
	private gainNode: GainNode;

	constructor() {
		this.gainNode = this.context.createGain();

		for (const key in assetPaths) {
			soundUtils
				.fetchAudioBuffer(assetPaths[key as keyof typeof assetPaths], this.context)
				.then((response) => {
					this.sounds[key] = response;
					return this.sounds[key];
				});
		}
	}

	public play = (key: keyof typeof assetPaths | string, reverse = false) => {
		if (!(key in assetPaths)) throw Error(`The requested sound is not available: ${key}`);
		return this.startSource(this.sounds[key], reverse);
	};

	private startSource = (sound: AudioBuffer, reverse: boolean = false) => {
		this.source = this.context.createBufferSource();
		this.source.buffer = reverse ? soundUtils.reverseBuffer(sound, this.context) : sound;

		this.setGain(this.source.buffer.duration, reverse);

		this.source.connect(this.gainNode);
		this.gainNode.connect(this.context.destination);

		this.source.start();
	};

	private setGain = (duration: number, reverse: boolean) => {
		this.gainNode.gain.setValueAtTime(singleGain, this.context.currentTime);

		if (reverse) {
			this.gainNode.gain.exponentialRampToValueAtTime(
				reverseGain,
				this.context.currentTime + duration
			);
		}
	};
}
