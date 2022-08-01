<script lang="ts">
	import { Draggable } from '@draggable';
	import type { DragStartEvent, MirrorCreatedEvent, MirrorMoveEvent } from '@draggable/Draggable';
	import type Position from '@src/common/types/Position';
	import { onMount } from 'svelte';

	import PillSwitch from '@src/components/PillSwitch/PillSwitch.svelte';
	import { calcOffset, translateMirror } from '@src/utils';

	const toggleClass = 'pill-switch--on';
	let container: HTMLElement;

	onMount(() => {
		const draggable = new Draggable([container], {
			draggable: '.pill-switch__control',
			delay: 0
		});

		let isToggled = false;
		let initialMousePosition: Position;
		let containerRect: DOMRect;
		let dragRect: DOMRect;
		let dragThreshold = 0.5;

		// --- Draggable events --- //
		draggable.on('drag:start', (evt: DragStartEvent) => {
			document.addEventListener('keyup', abortDragOnESC);

			initialMousePosition = {
				x: evt.sensorEvent?.clientX ?? 0,
				y: evt.sensorEvent?.clientY ?? 0
			};
		});

		draggable.on('mirror:created', (evt: MirrorCreatedEvent) => {
			containerRect = evt.sourceContainer.getBoundingClientRect();
			dragRect = evt.source.getBoundingClientRect();

			const containerRectQuarter = containerRect.width / 4;
			dragThreshold = isToggled ? containerRectQuarter * -1 : containerRectQuarter;
		});

		draggable.on('mirror:move', (evt: MirrorMoveEvent) => {
			// Required to help restrict the draggable element to the container
			evt.cancel();

			// We do not want to use `getBoundingClientRect` while dragging,
			// as that would be very expensive.
			// Instead, we look at the mouse position, which we can ballpark as being
			// close to the center of the draggable element.
			// We need to look at both the X and Y offset and determine which is the higher number.
			// That way we can drag outside of the container and still have the
			// draggable element move appropriately.
			const offsetX = calcOffset(evt.sensorEvent?.clientX ?? 0 - initialMousePosition.x);
			const offsetY = calcOffset(initialMousePosition.y - evt.sensorEvent.clientY);
			const offsetValue = offsetX > offsetY ? offsetX : offsetY;
			const mirrorCoords = {
				top: dragRect.top - offsetValue,
				left: dragRect.left + offsetValue
			};

			translateMirror(evt.mirror, mirrorCoords as DOMRect, containerRect);

			if (isToggled && offsetValue < dragThreshold) {
				evt.sourceContainer.classList.remove(toggleClass);
				isToggled = false;
			} else if (!isToggled && offsetValue > dragThreshold) {
				evt.sourceContainer.classList.add(toggleClass);
				isToggled = true;
			}
		});

		const abortDragOnESC = (evt: KeyboardEvent) => {
			if (evt.key === 'Escape') {
				draggable.cancel();
			}
		};
	});
</script>

<section bind:this={container}>
	<PillSwitch />
</section>

<style lang="scss">
	@use 'styles';
</style>
