<script lang="ts">
	import type { DragStartEvent, MirrorCreatedEvent, MirrorMoveEvent } from '@draggable/Draggable';
	import type Position from '@src/common/types/Position';
	import { onMount } from 'svelte';

	import PillSwitch from '@src/components/PillSwitch/PillSwitch.svelte';
	import { translateMirror } from '@src/utils';
	import PageHeader from '@src/components/PageHeader/PageHeader.svelte';
	import { browser } from '$app/env';

	let container: HTMLElement;
	let isToggled = false;
	let initialMousePosition: Position;
	let containerRect: DOMRect;
	let dragRect: DOMRect;
	let dragThreshold: number;

	onMount(async () => {
		if (browser) {
			const { Draggable } = await import('@draggable');

			const draggable = new Draggable([container.querySelector('.pill-switch') as HTMLElement], {
				draggable: '.pill-switch__control',
				delay: 0
			});

			// --- Draggable events --- //
			draggable.on('drag:start', (evt: DragStartEvent) => {
				document.addEventListener('keyup', abortDragOnESC);

				initialMousePosition = {
					x: evt.sensorEvent.clientX,
					y: evt.sensorEvent.clientY
				};
			});

			draggable.on('mirror:created', (evt: MirrorCreatedEvent) => {
				containerRect = evt.sourceContainer.getBoundingClientRect();
				dragRect = evt.source.getBoundingClientRect();
				const containerRectQuarter = containerRect.width / 4;
				dragThreshold = isToggled ? containerRectQuarter * -1 : containerRectQuarter;
			});

			draggable.on('mirror:move', (evt: MirrorMoveEvent) => {
				evt.cancel();

				const offsetX = evt.sensorEvent.clientX - initialMousePosition.x;
				const offsetY = initialMousePosition.y - evt.sensorEvent.clientY;

				const offsetValue = offsetX > offsetY ? offsetX : offsetY;

				const mirrorCoords = {
					top: dragRect.top - offsetValue,
					left: dragRect.left + offsetValue
				};

				translateMirror(evt.mirror, mirrorCoords as DOMRect, containerRect);

				if (isToggled && offsetValue < dragThreshold) {
					isToggled = false;
					(evt.mirror.querySelector('.heading') as HTMLElement).textContent = 'off';
				} else if (!isToggled && offsetValue > dragThreshold) {
					isToggled = true;
					(evt.mirror.querySelector('.heading') as HTMLElement).textContent = 'on';
				}
			});

			const abortDragOnESC = (evt: KeyboardEvent) => {
				if (evt.key === 'Escape') draggable.cancel();
			};
		}
	});
</script>

<PageHeader
	child="Drag events"
	section="Draggable"
	id="DragEvents"
	subheading="You may not need to use any of the additional modules. Hook into any of Draggable’s events and write your own logic."
/>

<section bind:this={container}>
	<PillSwitch on={isToggled} />
</section>
