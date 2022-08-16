<script lang="ts">
	import { onMount } from 'svelte';
	import Block from '@src/components/Block/Block.svelte';

	import { browser } from '$app/env';
	import PageHeader from '@src/components/PageHeader/PageHeader.svelte';

	let container: HTMLElement;

	onMount(async () => {
		if (browser) {
			const { Swappable, Plugins } = await import('@draggable');

			new Swappable([container], {
				draggable: '.block--draggable',
				mirror: {
					constrainDimensions: true
				},
				plugins: [Plugins.ResizeMirror]
			});
		}
	});
</script>

<PageHeader
	id="Floated"
	section="Swappable"
	child="Floated"
	subheading="Maintaining layout while swapping direct children can be challenging. This example solves the problem using nth-child and adjacent sibling selectors."
/>

<section class="floated">
	<article class="block-layout block-layout--float" bind:this={container}>
		<Block label="one" classes="block--1" draggable />
		<Block label="two" classes="block--2" draggable />
		<Block label="three" classes="block--3" draggable />
		<Block label="four" classes="block--4" draggable />
		<Block label="five" classes="block--5" draggable />
		<Block label="six" classes="block--6" />
		<Block label="seven" classes="block--7" draggable />
		<Block label="eight" classes="block--8" draggable />
	</article>
</section>

<style lang="scss" global>
	@use 'styles';
</style>
