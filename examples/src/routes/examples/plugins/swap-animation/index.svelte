<script lang="ts">
	import { onMount } from 'svelte';

	import Block from '@src/components/Block/Block.svelte';
	import { browser } from '$app/env';
	import PageHeader from '@src/components/PageHeader/PageHeader.svelte';

	let container: HTMLElement;

	onMount(async () => {
		if (browser) {
			const { Sortable, Plugins } = await import('@draggable');

			new Sortable([container], {
				draggable: '.block--draggable',
				mirror: {
					constrainDimensions: true
				},
				plugins: [Plugins.SwapAnimation],
				swapAnimation: {
					duration: 200,
					easingFunction: 'ease-in-out'
				}
			});
		}
	});
</script>

<PageHeader
	id="SwapAnimation"
	section="Plugins"
	child="Swap Animation"
	subheading="This example is currently waiting for SwapAnimation to support translating both X and Y coordinates."
/>

<section class="swap-animation">
	<article bind:this={container} class="block-layout block-layout--grid">
		<Block label="one" classes="block--1" />
		<Block label="two" classes="block--2" draggable />
		<Block label="three" classes="block--3" draggable />
		<Block label="four" classes="block--4" draggable />
		<Block label="five" classes="block--5" />
		<Block label="six" classes="block--6" draggable />
		<Block label="seven" classes="block--7" draggable />
		<Block label="eight" classes="block--8" draggable />
		<Block label="nine" classes="block--9" />
	</article>
</section>

<style lang="scss">
	@use 'styles';
</style>
