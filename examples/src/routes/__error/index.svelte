<script lang="ts">
	import '@src/styles/reset.scss';
	import '@src/styles/components/button.scss';

	import Brand from '@src/components/Brand/Brand.svelte';
	import Starfield from '@src/components/Starfield/Starfield.svelte';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => ({
		status: 404,
		error: new Error(`Not found: /${params.path}`)
	});
</script>

<section class="error-404">
	<Starfield />
	<div class="content">
		<Brand variant="large" href="/" />
		<h2 class="subheading subheading--mono">
			Error 404. Simulation disengaged. Critical cube disruption. Course correcting...
		</h2>
		<div class="button__container">
			<a
				href="/"
				class="button button--cosmic"
				title="Go back to the home page"
				data-gtag-category="Tertiary CTA"
				><div class="button__interior">
					<span class="button__text">reboot</span>
				</div></a
			><a
				href="https://github.com/Shopify/draggable"
				class="button button--cosmic"
				title="Contribute to this open-source project"
				data-gtag-category="Secondary CTA"
				><div class="button__interior">
					<span class="button__text">contribute</span>
				</div></a
			>
		</div>
	</div>
</section>

<style lang="scss">
	@use 'styles';
</style>
