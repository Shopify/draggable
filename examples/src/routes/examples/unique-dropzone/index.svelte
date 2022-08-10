<script lang="ts">
	import { browser } from '$app/env';

	import type { DragStartEvent } from '@draggable/Draggable';
	import type { DroppableDroppedEvent } from '@draggable/Droppable';
	import Block from '@src/components/Block/Block.svelte';
	import PageHeader from '@src/components/PageHeader/PageHeader.svelte';
	import { onMount } from 'svelte';

	import './styles/index.scss';

	let containers: HTMLElement[] = [];
	const wrappers = [
		{ id: 1, label: 'one' },
		{ id: 2, label: 'two' },
		{ id: 4, label: 'four' },
		{ id: 8, label: 'eight' }
	];

	onMount(async () => {
		if (browser) {
			const { Droppable } = await import('@draggable');

			const droppable = new Droppable(containers, {
				draggable: '.block--draggable',
				dropzone: '.block__wrapper--dropzone',
				mirror: {
					constrainDimensions: true
				}
			});

			let droppableOrigin: string | undefined;

			droppable.on('drag:start', (evt: DragStartEvent) => {
				droppableOrigin = evt.originalSource.parentElement?.dataset.dropzone;
			});

			droppable.on('droppable:dropped', (evt: DroppableDroppedEvent) => {
				if (droppableOrigin !== evt.dropzone.dataset.dropzone) {
					evt.cancel();
				}
			});
		}
	});
</script>

<PageHeader
	id="UniqueDropzone"
	section="Droppable"
	child="Unique dropzone"
	subheading="Dropzones are intended to hold only one Droppable child. This example restricts each Droppable item to a specific Dropzone identifier."
/>

<section>
	<article bind:this={containers[0]} class="block-layout block-layout--flex">
		{#each wrappers as { id, label }}
			<div
				class="block__wrapper block__wrapper--dropzone draggable-dropzone--occupied"
				data-dropzone={id}
			>
				<Block {label} variant="hollow" />
				<Block {label} draggable classes={`block--${id}`} />
			</div>
		{/each}
	</article>

	<article bind:this={containers[1]} class="block-layout block-layout--grid">
		<div class="block__wrapper block__wrapper--dropzone" data-dropzone="1">
			<Block variant="stripes" />
		</div>
		<div class="block__wrapper block__wrapper--dropzone" data-dropzone="2">
			<Block variant="stripes" />
		</div>
		<div class="block__wrapper"><Block variant="shell" label="three" classes="block--3" /></div>
		<div class="block__wrapper block__wrapper--dropzone" data-dropzone="4">
			<Block variant="stripes" />
		</div>
		<div class="block__wrapper"><Block variant="shell" label="five" classes="block--5" /></div>
		<div class="block__wrapper"><Block variant="shell" label="six" classes="block--6" /></div>
		<div class="block__wrapper"><Block variant="shell" label="seven" classes="block--7" /></div>
		<div class="block__wrapper block__wrapper--dropzone" data-dropzone="8">
			<Block variant="stripes" />
		</div>
	</article>
</section>
