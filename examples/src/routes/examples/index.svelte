<script lang="ts">
	import { Draggable } from '@draggable';
	import type { DragMoveEvent, DragStartEvent, MirrorCreateEvent } from '@draggable/Draggable';
	import type Position from '@src/common/types/Position';
	import PageHeader from '@src/components/PageHeader/PageHeader.svelte';

	import Plate from '@src/components/Plate/Plate.svelte';
	import { flipSign, offsetWithinThreshold } from '@src/utils';
	import { onMount } from 'svelte';

	let container: HTMLElement;
	let threshold = {
		min: -27.2,
		max: 27.2
	};
	let initialMousePosition = {
		x: 0,
		y: 0
	};
	let position: Position = { x: 0, y: 0 };

	onMount(() => {
		const draggable = new Draggable([container], {
			draggable: '.plate--draggable'
		});

		// --- Draggable events --- //
		draggable.on('drag:start', (evt: DragStartEvent) => {
			evt.originalSource.style.display = 'block';
			evt.source.style.display = 'none';
			const newThreshold = container.offsetWidth / 10;
			threshold = { min: flipSign(newThreshold), max: newThreshold };
			initialMousePosition = { x: evt.sensorEvent.clientX, y: evt.sensorEvent.clientY };
		});

		draggable.on('mirror:create', (evt: MirrorCreateEvent) => {
			evt.cancel();
		});

		draggable.on('drag:move', (evt: DragMoveEvent) => {
			position = {
				x: offsetWithinThreshold(initialMousePosition.x, evt.sensorEvent.clientX, threshold),
				y: offsetWithinThreshold(initialMousePosition.y, evt.sensorEvent.clientY, threshold)
			};
		});

		draggable.on('drag:stop', () => {
			position = { x: 0, y: 0 };
		});
	});
</script>

<PageHeader
	id="Home"
	section="Examples"
	subheading="Draggable is a modern drag and drop JavaScript library. Lightweight, modular and accessible."
/>

<section>
	<article bind:this={container} class="plate__wrapper">
		<Plate {position} {threshold} classes="plate--three" draggable level="bottom" />
		<Plate {position} {threshold} classes="plate--two" draggable level="middle" />
		<Plate {position} {threshold} classes="plate--one" draggable level="top" label="hello" />
	</article>
</section>

<style lang="scss" global>
	@use 'styles';
</style>
