<script lang="ts">
	import { Draggable } from '@draggable';
	import type { SensorEvent, DragMoveEvent, DragStartEvent } from '@draggable/Draggable';
	import type Position from 'src/common/types/Position';

	import Plate from 'src/components/Plate/Plate.svelte';
	import flipSign from 'src/scripts/utils/flip-sign';
	import { offsetWithinThreshold } from 'src/utils';
	import { onMount } from 'svelte/types/runtime/internal/lifecycle';

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
			draggable: '.Plate'
		});

		// --- Draggable events --- //
		draggable.on('drag:start', (evt: DragStartEvent) => {
			const newThreshold = container.offsetWidth / 10;
			threshold = { min: flipSign(newThreshold), max: newThreshold };
			initialMousePosition = { x: evt.sensorEvent.clientX, y: evt.sensorEvent.clientY };
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

<section>
	<article bind:this={container} class="plate__wrapper">
		<Plate {position} {threshold} classes="plate--two" draggable level="middle" />
		<Plate {position} {threshold} classes="plate--one" draggable level="top" label="hello" />
		<Plate {position} {threshold} classes="plate--three" draggable level="bottom" />
	</article>
</section>
