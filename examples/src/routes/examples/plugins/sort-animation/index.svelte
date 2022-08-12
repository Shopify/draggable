<script lang="ts">
	import { onMount } from 'svelte';

	import Block from '@src/components/Block/Block.svelte';
	import PageHeader from '@src/components/PageHeader/PageHeader.svelte';
	import { browser } from '$app/env';

	let container: HTMLElement;

	onMount(async () => {
		if (browser) {
			const { Sortable, Plugins } = await import('@draggable');
			new Sortable([container], {
				draggable: '.block--draggable',
				mirror: {
					constrainDimensions: true
				},
				plugins: [Plugins.SortAnimation],
				swapAnimation: {
					duration: 200,
					easingFunction: 'ease-in-out'
				}
			});
		}
	});
</script>

<PageHeader
	id="SortAnimation"
	section="Plugins"
	child="Sort Animation"
	subheading="Adds sort animation on all sorted elements with both horizontal and vertical within grid layout."
/>

<section class="sort-animation">
	<article bind:this={container} class="block-layout block-layout--grid">
		<Block label="one" draggable classes="block--1" />
		<Block label="two" draggable classes="block--2" />
		<Block label="three" draggable classes="block--3" />
		<Block label="four" draggable classes="block--4" />
		<Block label="five" draggable classes="block--5" />
		<Block label="six" draggable classes="block--6" />
		<Block label="seven" draggable classes="block--7" />
		<Block label="eight" draggable classes="block--8" />
		<Block label="nine" draggable classes="block--9" />
	</article>
</section>

<style lang="scss">
	@use 'styles';
</style>
