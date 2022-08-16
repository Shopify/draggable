<script lang="ts">
	import { browser } from '$app/env';
	import type { CollidableInEvent, CollidableOutEvent } from '@draggable/Plugins/Collidable';

	import Block from '@src/components/Block/Block.svelte';
	import PageHeader from '@src/components/PageHeader/PageHeader.svelte';
	import classNames from 'classnames';
	import { onMount } from 'svelte';

	let container: HTMLElement;
	let walls: HTMLElement[] = [];
	let colliding = false;
	let collidingWithWall: string | undefined = undefined;

	onMount(async () => {
		if (browser) {
			const { Droppable, Plugins } = await import('@draggable');

			const wallClass = 'collidable-wall';

			const droppable = new Droppable([container], {
				draggable: '.block--draggable',
				dropzone: '.block__wrapper--dropzone',
				collidables: [
					...Array.from(container.getElementsByClassName('collidable-obstacle')),
					...walls
				],
				mirror: {
					appendTo: container,
					constrainDimensions: true
				},
				plugins: [Plugins.Collidable]
			});

			// --- Draggable events --- //
			droppable.on('collidable:in', ({ collidingElement }: CollidableInEvent) => {
				if (collidingElement.classList.contains(wallClass)) colliding = true;
				else collidingWithWall = collidingElement.id;
			});

			droppable.on('collidable:out', ({ collidingElement }: CollidableOutEvent) => {
				if (collidingElement.classList.contains(wallClass)) colliding = false;
				else collidingWithWall = undefined;
			});
		}
	});
</script>

<PageHeader
	id="Collidable"
	section="Plugins"
	child="Collidable"
	subheading="Enable collision detection by including the Collidable plugin. You can now resist dragging over all elements specificed as collision obstacles."
/>

<section class="collidable">
	<article bind:this={container} class="block-layout block-layout--grid">
		<div class="block__wrapper block__wrapper--dropzone draggable-dropzone--occupied block--1">
			<Block variant="hollow" label="drop" />
			<Block draggable label="drag" />
		</div>
		<Block
			id="wall--1"
			variant="stripes"
			colliding={collidingWithWall === 'wall--1' || colliding}
			classes={classNames('block--2 collidable-obstacle')}
		/>
		<Block
			id="wall--2"
			variant="stripes"
			colliding={collidingWithWall === 'wall--2' || colliding}
			classes={classNames('block--3 collidable-obstacle')}
		/>

		<div class="block__wrapper block__wrapper--dropzone block--4">
			<Block label="drop" variant="hollow" />
		</div>

		<div
			bind:this={walls[0]}
			class:collidable-wall--colliding={colliding}
			class="collidable-wall collidable-wall--top collidable-obstacle"
		/>
		<div
			bind:this={walls[1]}
			class:collidable-wall--colliding={colliding}
			class="collidable-wall collidable-wall--right collidable-obstacle"
		/>
		<div
			bind:this={walls[2]}
			class:collidable-wall--colliding={colliding}
			class="collidable-wall collidable-wall--bottom collidable-obstacle"
		/>
		<div
			bind:this={walls[3]}
			class:collidable-wall--colliding={colliding}
			class="collidable-wall collidable-wall--left collidable-obstacle"
		/>
	</article>
</section>

<style lang="scss">
	@use 'styles';
</style>
