<script lang="ts">
	import { onMount } from 'svelte';

	import PaperStackItem from '@src/components/PaperStackItem/PaperStackItem.svelte';
	import { browser } from '$app/env';
	import PageHeader from '@src/components/PageHeader/PageHeader.svelte';

	let container: HTMLElement;

	onMount(async () => {
		if (browser) {
			const { Sortable } = await import('@draggable');

			new Sortable([container], {
				draggable: '.paper-stack__item--draggable',
				mirror: {
					appendTo: container,
					constrainDimensions: true
				}
			});
		}
	});
</script>

<PageHeader
	id="Transformed"
	section="Sortable"
	child="Transformed"
	subheading="Draggable's mirror is positioned using transform3d(). Any existing transform styles will get removed. This is solved by introducing an interior wrapper."
/>

<section class="transformed">
	<article class="paper-stack__wrapper">
		<ul bind:this={container} class="paper-stack">
			<PaperStackItem label="one" classes="paper-stack__item--1" draggable />
			<PaperStackItem label="two" classes="paper-stack__item--2" draggable />
			<PaperStackItem label="three" classes="paper-stack__item--3" draggable />
			<PaperStackItem label="four" classes="paper-stack__item--4" draggable />
		</ul>
	</article>
</section>

<style lang="scss">
	@use 'styles';
</style>
