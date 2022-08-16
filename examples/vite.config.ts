import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath, URL } from 'url';

/** @type {import('vite').UserConfig} */
const config = {
	resolve: {
		alias: {
			'@draggable': fileURLToPath(new URL('../src', import.meta.url)),
			'@src': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	plugins: [sveltekit()]
};

export default config;
