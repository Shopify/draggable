<script lang="ts">
	import { onMount } from 'svelte';

	import { Swappable, Plugins } from '@draggable';
	import Block from '@src/components/Block/Block.svelte';

	let container: HTMLElement;

	onMount(() => {
		new Swappable([container], {
			draggable: '.block--draggable',
			mirror: {
				appendTo: container,
				constrainDimensions: true
			},
			plugins: [Plugins.ResizeMirror]
		});
	});
</script>

<section>
	<article bind:this={container} class="block-layout block-layout--typeGrid">
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
