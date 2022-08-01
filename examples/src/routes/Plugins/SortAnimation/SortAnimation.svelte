<script lang="ts">
	import { Sortable, Plugins } from '@draggable';
	import { onMount } from 'svelte';

	import Block from 'src/components/Block/Block.svelte';

	let container: HTMLElement;

	onMount(() => {
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
	});
</script>

<section>
	<article bind:this={container} class="block-layout block-layout--flex">
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
