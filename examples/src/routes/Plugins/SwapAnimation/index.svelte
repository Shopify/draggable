<script lang="ts">
	import { onMount } from 'svelte';
	import { Sortable, Plugins } from '@draggable';

	import Block from '@src/components/Block/Block.svelte';

	let container: HTMLElement;

	onMount(() => {
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
	});
</script>

<section>
	<article bind:this={container} class="block-layout block-layout--flex">
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
