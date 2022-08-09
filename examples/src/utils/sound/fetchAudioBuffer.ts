const fetchAudioBuffer = async (path: string, context: AudioContext) => {
	try {
		const response = await fetch(new Request(path));
		const buffer = await response.arrayBuffer();

		return context.decodeAudioData(buffer);
	} catch (error) {
		throw Error(`Asset failed to load: ${error}`);
	}
};

export default fetchAudioBuffer;
