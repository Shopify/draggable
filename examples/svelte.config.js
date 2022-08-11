import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	},
	vitePlugin: {
		experimental: {
			useVitePreprocess: true
		}
	}
};

export default config;
