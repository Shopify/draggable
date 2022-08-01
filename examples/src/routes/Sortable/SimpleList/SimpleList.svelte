<script lang="ts">
	import { Sortable } from '@draggable';
	import { onMount } from 'svelte';

	import StackedListItem from 'src/components/StackedListItem/StackedListItem.svelte';

	let container: HTMLElement;

	onMount(() => {
		const sortable = new Sortable([container], {
			draggable: '.stacked-list__item--draggable',
			mirror: {
				appendTo: container,
				constrainDimensions: true
			}
		});
	});
</script>

<section>
	<article class="stacked-list__wrapper stacked-list__wrapper--scroll-indicator">
		<header class="stacked-list__header">
			<h3 class="heading heading--3 heading--white">Simple list</h3>
		</header>

		<ul bind:this={container} class="StackedList StackedList--hasScroll">
			<StackedListItem label="item one" classes="stacked-list__item--1" draggable />
			<StackedListItem label="item two" classes="stacked-list__item--2" draggable />
			<StackedListItem label="item three" classes="stacked-list__item--3" draggable />
			<StackedListItem label="item four" classes="stacked-list__item--4" draggable />
			<StackedListItem label="item five" classes="stacked-list__item--5" />
			<StackedListItem label="item six" classes="stacked-list__item--6" draggable />
			<StackedListItem label="item seven" classes="stacked-list__item--7" draggable />
			<StackedListItem label="item eight" classes="stacked-list__item--8" />
			<StackedListItem label="item nine" classes="stacked-list__item--9" />
			<StackedListItem label="item ten" classes="stacked-list__item--10" draggable />
			<StackedListItem label="item eleven" classes="stacked-list__item--11" />
			<StackedListItem label="item twelve" classes="stacked-list__item--12" draggable />
		</ul>
	</article>
</section>

<style lang="scss">
	@use 'styles';
</style>
