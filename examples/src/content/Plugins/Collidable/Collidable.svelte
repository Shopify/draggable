<script lang="ts">
	import { Droppable, Plugins } from '@draggable';
	import type { CollidableInEvent, CollidableOutEvent } from '@draggable/Plugins/Collidable';

	import Block from 'src/components/Block/Block.svelte';
	import { onMount } from 'svelte/types/runtime/internal/lifecycle';

	let container: HTMLElement;
	let walls: HTMLElement[];

	onMount(() => {
		const wallClass = 'collidable-wall';
		const walls = document.querySelectorAll(`.${wallClass}`);

		const droppable = new Droppable([container], {
			draggable: '.block--draggable',
			dropzone: '.block-wrapper--dropzone',
			collidables: '.collidable-obstacle',
			mirror: {
				appendTo: container,
				constrainDimensions: true
			},
			plugins: [Plugins.Collidable]
		});

		// --- Draggable events --- //
		droppable.on('collidable:in', ({ collidingElement }: CollidableInEvent) => {
			if (collidingElement.classList.contains(wallClass))
				walls.forEach((wall) => {
					wall.classList.add('isColliding');
				});
			else collidingElement.classList.add('isColliding');
		});

		droppable.on('collidable:out', ({ collidingElement }: CollidableOutEvent) => {
			if (collidingElement.classList.contains(wallClass))
				walls.forEach((wall) => {
					wall.classList.remove('isColliding');
				});
			else collidingElement.classList.remove('isColliding');
		});
	});
</script>

<section bind:this={container}>
	<article class="block-layout block-layout--positioned">
		<div class="block-wrapper block-wrapper--dropzone draggable-dropzone--occupied">
			<Block variant="hollow" label="drop" />
			<Block draggable label="drag" classes={'block--1'} />
		</div>
		<Block variant="stripes" classes="block--2 collidable-obstacle" />
		<Block variant="stripes" classes="block--3 collidable-obstacle" />

		<div class="block-wrapper block-wrapper--dropzone">
			<Block label="drop" variant="hollow" classes="block--4" />
		</div>

		<div bind:this={walls[0]} class="collidable-wall collidable-wall--top collidable-obstacle" />
		<div bind:this={walls[1]} class="collidable-wall collidable-wall--right collidable-obstacle" />
		<div bind:this={walls[2]} class="collidable-wall collidable-wall--bottom collidable-obstacle" />
		<div bind:this={walls[3]} class="collidable-wall collidable-wall--left collidable-obstacle" />
	</article>
</section>

<style lang="scss">
	@use 'styles';
</style>
