<script lang="ts">
	import { onMount } from 'svelte';

	import StackedListItem from '@src/components/StackedListItem/StackedListItem.svelte';
	import type { DragStartEvent, DragStopEvent } from '@draggable/Draggable';
	import type { SortableSortedEvent, SortableSortEvent } from '@draggable/Sortable';
	import { browser } from '$app/env';

	import './styles/index.scss';

	let containers: HTMLElement[] = [];

	onMount(async () => {
		if (browser) {
			const { Sortable, Plugins } = await import('@draggable');

			const sortable = new Sortable(containers, {
				draggable: 'stacked-list__item--draggable',
				mirror: { constrainDimensions: true },
				plugins: [Plugins.ResizeMirror]
			});

			const containerTwoCapacity = 3;
			let currentMediumChildren;
			let capacityReached = false;
			let lastOverContainer: HTMLElement;

			// --- Draggable events --- //
			sortable.on('drag:start', (evt: DragStartEvent) => {
				currentMediumChildren = sortable.getDraggableElementsForContainer(
					sortable.containers[1]
				).length;
				capacityReached = currentMediumChildren === containerTwoCapacity;
				lastOverContainer = evt.sourceContainer;
				sortable.containers[1].parentElement?.classList.toggle(
					'draggable-container-parent--capacity',
					capacityReached
				);
			});

			sortable.on('drag:stop', (evt: DragStopEvent) => {
				evt.cancel();
				evt.originalSource.remove();
			});

			sortable.on('sortable:sort', (evt: SortableSortEvent) => {
				if (!capacityReached) return;
				const sourceIsCapacityContainer = evt.dragEvent.sourceContainer === sortable.containers[1];
				if (!sourceIsCapacityContainer && evt.dragEvent.overContainer === sortable.containers[1]) {
					evt.cancel();
				}
			});

			sortable.on('sortable:sorted', (evt: SortableSortedEvent) => {
				if (lastOverContainer === evt.dragEvent.overContainer) return;
				lastOverContainer = evt.dragEvent.overContainer;
			});
		}
	});
</script>

<section class="multiple-containers">
	<article
		class="stacked-list stacked-list__wrapper--large stacked-list__wrapper--horizontal container"
	>
		<header class="stacked-list__header">
			<h3 class="heading heading--3 heading--white">Container one</h3>
		</header>

		<ul bind:this={containers[0]} class="stacked-list">
			<StackedListItem label="zebra" classes="stacked-list__item--1" draggable />
			<StackedListItem label="giraffe" classes="stacked-list__item--2" draggable />
			<StackedListItem label="baboon" classes="stacked-list__item--3" />
			<StackedListItem label="elephant" classes="stacked-list__item--4" draggable />
			<StackedListItem label="leopard" classes="stacked-list__item--5" draggable />
		</ul>
	</article>

	<article
		class="stacked-list__wrapper stacked-list__wrapper--medium stacked-list__wrapper--scroll-indicator container"
	>
		<header class="stacked-list__header">
			<h3 class="heading heading--3 heading--white">Container two</h3>
			<p><em>3 item capacity</em></p>
		</header>

		<ul bind:this={containers[1]} class="stacked-list">
			<StackedListItem label="fluorescent grey" classes="stacked-list__item--6" />
			<StackedListItem label="rebecca purple" classes="stacked-list__item--7" />
		</ul>
	</article>

	<article class="stacked-list__wrapper stacked-list__wrapper--scroll-indicator container">
		<header class="stacked-list__header">
			<h3 class="heading heading--3 heading--white">Container three</h3>
		</header>

		<ul bind:this={containers[2]} class="stacked-list stacked-list--scroll">
			<StackedListItem label="apple" classes="stacked-list__item--8" draggable />
			<StackedListItem label="banana" classes="stacked-list__item--9" draggable />
			<StackedListItem label="cucumber" classes="stacked-list__item--10" draggable />
			<StackedListItem label="daikon radish" classes="stacked-list__item--11" />
			<StackedListItem label="elderberry" classes="stacked-list__item--12" draggable />
			<StackedListItem label="fresh thyme" classes="stacked-list__item--13" draggable />
			<StackedListItem label="guava" classes="stacked-list__item--14" draggable />
		</ul>
	</article>
</section>
