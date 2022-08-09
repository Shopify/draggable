export default function reverseBuffer(buffer: AudioBuffer, context: AudioContext) {
	const reverse = context.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);

	for (let channels = 0; channels < buffer.numberOfChannels; channels++) {
		const dest = reverse.getChannelData(channels);
		const src = buffer.getChannelData(channels);

		for (let sampleFrames = 0; sampleFrames < buffer.length; sampleFrames++) {
			dest[sampleFrames] = src[buffer.length - sampleFrames];
		}
	}

	return reverse;
}
