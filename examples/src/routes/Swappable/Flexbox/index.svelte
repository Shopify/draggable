<script lang="ts">
	import { onMount } from 'svelte';

	import { Swappable, Plugins } from '@draggable';
	import Block from '@src/components/Block/Block.svelte';

	let container: HTMLElement;

	onMount(() => {
		new Swappable([container], {
			draggable: '.block--draggable',
			mirror: {
				constrainDimensions: true
			},
			plugins: [Plugins.ResizeMirror]
		});
	});
</script>

<section>
	<article bind:this={container} class="block-layout block-layout--flex">
		<Block label="one" classes="block--1" draggable />
		<Block label="two" classes="block--2" />
		<Block label="three" classes="block--3" draggable />
		<Block label="four" classes="block--4" draggable />
		<Block label="five" classes="block--5" draggable />
		<Block label="six" classes="block--6" />
		<Block label="seven" classes="block--7" draggable />
	</article>
</section>

<style lang="scss">
	@use 'styles';
</style>
