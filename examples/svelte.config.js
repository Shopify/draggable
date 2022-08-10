import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

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
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			importer: [
				scssAliases({
					'@src': `${process.cwd()}/src`
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
