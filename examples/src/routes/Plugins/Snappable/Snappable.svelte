<script lang="ts">
	import { Swappable, Plugins } from '@draggable';
	import { onMount } from 'svelte';

	import Block from 'src/components/Block/Block.svelte';
	import type { DragStartEvent } from '@draggable/Draggable';

	let container: HTMLElement;

	onMount(() => {
		const swappable = new Swappable([container], {
			mirror: {
				appendTo: container,
				constrainDimensions: true
			},
			plugins: [Plugins.Snappable]
		});

		// --- Draggable events --- //
		swappable.on('drag:start', (evt: DragStartEvent) => {
			if (evt.originalSource.classList.contains('block--stripes')) {
				evt.cancel();
			}
		});
	});
</script>

<section>
	<article bind:this={container} class="block-layout block-layout--grid">
		<div class="block__wrapper">
			<Block label="snap" classes="block--1 draggable-source" draggable />
		</div>
		<div class="block__wrapper">
			<Block label="two" classes="block--2" />
		</div>
		<div class="block__wrapper">
			<Block classes="block--3 draggable-source" variant="stripes" />
		</div>
		<div class="block__wrapper">
			<Block classes="block--4 draggable-source" variant="stripes" />
		</div>

		<div class="block__wrapper">
			<Block label="five" classes="block--5" />
		</div>
		<div class="block__wrapper">
			<Block classes="block--6 draggable-source" variant="stripes" />
		</div>
		<div class="block__wrapper">
			<Block label="crack" classes="block--7 draggable-source" draggable />
		</div>
		<div class="block__wrapper">
			<Block label="eight" classes="block--8" />
		</div>

		<div class="block__wrapper">
			<Block classes="block--9 draggable-source" variant="stripes" />
		</div>
		<div class="block__wrapper">
			<Block label="ten" classes="block--10" />
		</div>
		<div class="block__wrapper">
			<Block classes="block--11 draggable-source" variant="stripes" />
		</div>
		<div class="block__wrapper">
			<Block label="pop" classes="block--12 draggable-source" draggable />
		</div>

		<div class="block__wrapper">
			<Block label="pow" classes="block--13 draggable-source" draggable />
		</div>
		<div class="block__wrapper">
			<Block classes="block--14 draggable-source" variant="stripes" />
		</div>
		<div class="block__wrapper">
			<Block label="fifteen" classes="block--15" />
		</div>
		<div class="block__wrapper">
			<Block classes="block--16 draggable-source" variant="stripes" />
		</div>
	</article>
</section>

<style lang="scss">
	@use 'styles';
</style>
