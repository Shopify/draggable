import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { fileURLToPath, URL } from 'url';

const scssAliases = (aliases) => (url) => {
	for (const [alias, aliasPath] of Object.entries(aliases)) {
		if (url.indexOf(alias) === 0) {
			return {
				file: url.replace(alias, aliasPath)
			};
		}
	}
	return url;
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			importer: [
				scssAliases({
					'@src': fileURLToPath(new URL('./src', import.meta.url))
				})
			]
		}
	}),

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;
