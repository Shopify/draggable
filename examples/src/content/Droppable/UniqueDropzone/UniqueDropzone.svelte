<script lang="ts">
	import { Droppable } from '@draggable';
	import type { DragStartEvent } from '@draggable/Draggable';
	import type { DroppableDroppedEvent } from '@draggable/Droppable';
	import Block from 'src/components/Block/Block.svelte';
	import { onMount } from 'svelte/types/runtime/internal/lifecycle';

	let container: HTMLElement;
	const wrappers = [
		{ id: 1, label: 'one' },
		{ id: 2, label: 'two' },
		{ id: 4, label: 'four' },
		{ id: 8, label: 'eight' }
	];

	onMount(() => {
		const droppable = new Droppable([container], {
			draggable: '.block--draggable',
			dropzone: '.block-wrapper--dropzone',
			mirror: {
				constrainDimensions: true
			}
		});

		let droppableOrigin: string | undefined;

		// --- Draggable events --- //
		droppable.on('drag:start', (evt: DragStartEvent) => {
			droppableOrigin = evt.originalSource.parentElement?.dataset.dropzone;
		});

		droppable.on('droppable:dropped', (evt: DroppableDroppedEvent) => {
			if (droppableOrigin !== evt.dropzone.dataset.dropzone) {
				evt.cancel();
			}
		});
	});
</script>

<section bind:this={container}>
	<article class="block-layout block-layout--flex">
		{#each wrappers as { id, label }}
			<div
				class="block-wrapper block-wrapper--dropzone draggable-dropzone--occupied"
				data-dropzone={id}
			>
				<Block {label} variant="hollow" />
				<Block {label} draggable variant="hollow" classes={`block--${id}`} />
			</div>
		{/each}

		{#each wrappers as { id, label }}
			<div
				class="block-wrapper block-wrapper--dropzone draggable-dropzone--occupied"
				data-dropzone={id}
			>
				<Block {label} variant="hollow" />
				<Block {label} draggable variant="hollow" classes={`block--${id}`} />
			</div>
		{/each}
	</article>

	<article class="block-layout block-layout--grid">
		<div class="block-wrapper block-wrapper--dropzone" data-dropzone="1">
			<Block variant="stripes" />
		</div>
		<div class="block-wrapper block-wrapper--dropzone" data-dropzone="2">
			<Block variant="stripes" />
		</div>
		<div class="block-wrapper"><Block variant="shell" classes="block--3" /></div>
		<div class="block-wrapper block-wrapper--dropzone" data-dropzone="4">
			<Block variant="stripes" />
		</div>
		<div class="block-wrapper"><Block variant="shell" classes="block--5" /></div>
		<div class="block-wrapper"><Block variant="shell" classes="block--6" /></div>
		<div class="block-wrapper"><Block variant="shell" classes="block--7" /></div>
		<div class="block-wrapper block-wrapper--dropzone" data-dropzone="8">
			<Block variant="stripes" />
		</div>
	</article>
</section>
