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
					appendTo: container,
					constrainDimensions: true
				},
				plugins: [Plugins.ResizeMirror]
			});
		}
	});
</script>

<PageHeader
	id="GridLayout"
	section="Swappable"
	child="Grid Layout"
	subheading="Draggable children do not need to be direct descendants of their container. Wrapper elements can be used to maintain layout and simplify styling."
/>

<section class="grid-layout">
	<article bind:this={container} class="block-layout block-layout--grid">
		<div class="block__wrapper"><Block label="one" classes="block--1" draggable /></div>
		<div class="block__wrapper"><Block label="two" classes="block--2" draggable /></div>
		<div class="block__wrapper"><Block label="three" classes="block--3" /></div>
		<div class="block__wrapper"><Block label="four" classes="block--4" draggable /></div>
		<div class="block__wrapper"><Block label="five" classes="block--5" draggable /></div>
		<div class="block__wrapper"><Block label="six" classes="block--6" draggable /></div>
		<div class="block__wrapper"><Block label="seven" classes="block--7" /></div>
	</article>
</section>

<style lang="scss">
	@use 'styles';
</style>
