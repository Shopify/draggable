<script lang="ts">
	import { browser } from '$app/env';
	import type { CollidableInEvent, CollidableOutEvent } from '@draggable/Plugins/Collidable';

	import Cube from '@src/components/Cube/Cube.svelte';
	import { onMount } from 'svelte';

	let canPlayOverSound = false;
	let container: HTMLElement;

	onMount(async () => {
		if (browser) {
			const { Droppable, Plugins } = await import('@draggable');

			const draggable = new Droppable([container], {
				dropzone: '.cube--dropzone',
				mirror: {
					appendTo: container
				},
				collidables: Array.from(container.getElementsByClassName('collision-wall')),
				plugins: [Plugins.Collidable]
			});

			// draggable.on('drag:start', () => {
			// 	SoundFx.Single.play('cubeUp');
			// });

			// draggable.on('drag:over', () => {
			// 	if (!canPlayOverSound) {
			// 		return;
			// 	}

			// 	SoundFx.Single.play('cubeOver');
			// });

			// draggable.on('drag:out', () => {
			// 	canPlayOverSound = true;
			// });

			// draggable.on('drag:stop', () => {
			// 	SoundFx.Single.play('cubeDown');
			// 	canPlayOverSound = false;
			// });

			draggable.on('collidable:in', ({ collidingElement }: CollidableInEvent) => {
				// SoundFx.Single.play('cubeCollide');
				collidingElement.classList.add('colliding');
			});

			draggable.on('collidable:out', ({ collidingElement }: CollidableOutEvent) => {
				collidingElement.classList.remove('colliding');
			});
		}
	});
</script>

<section class="section collidable">
	<article class="section__interior">
		<div class="content">
			<h3 class="heading heading--1">Collidable</h3>
			<p>
				Start your game dev career and inject some collision detection. Collidable will prevent
				draggable elements from overlapping each other, firing collision events when the dragged
				source element enters and exits a restricted zone.
			</p>
		</div>
		<div class="puzzle puzzle--collidable">
			<div class="puzzle__interior">
				<div class="svg-container shadow shadow--collidable shadow--collidable-left">
					<svg class="svg" viewBox="0 0 526 604" focusable="false">
						<path
							d="M94.68 556.527a10.756 10.756 0 00-3.05-1.188L9.496 507.917l-.003-94.306c.651-1.41.994-2.953.994-4.527l-.003-93.34 81.052-46.795a10.805 10.805 0 005.403-9.359l-.003-93.587L349.816 20l166.419 96.092v92.34l-79.97 46.171-81.052-46.795a10.793 10.793 0 00-5.403-1.448c-1.866 0-3.732.482-5.403 1.448l-82.124 47.414a10.805 10.805 0 00-5.403 9.359v93.595l-76.722 44.295a10.806 10.806 0 000 18.718l76.722 44.302v92.34L176.908 604 94.68 556.527z"
						/>
					</svg>
				</div>
				<div class="svg-container shadow shadow--collidable shadow--collidable-right">
					<svg class="svg" viewBox="0 0 352 506" focusable="false">
						<path
							d="M9.622 459.673v-92.658l81.327-46.954a10.844 10.844 0 005.422-9.391v-95.164c0-3.874-2.067-7.454-5.422-9.391L9.624 159.162V66.504l80.241-46.327 80.334 46.38a10.834 10.834 0 0010.844 0l80.334-46.379 80.242 46.327.003 92.656-79.344 45.808a10.844 10.844 0 00-5.422 9.391l.003 98.616c-.011.267-.012.534-.002.8l.003 96.129-82.694 47.744c-.782.239-1.534.567-2.244.976L89.865 506 9.622 459.673z"
						/>
					</svg>
				</div>
				<div bind:this={container} class="cubes__frame cubes__frame--collidable" tabindex="0">
					<Cube
						classes="cube--solo theme--candy collidable__cube-1 collision-wall"
						faces={{ top: { piece: 'elbow', rotation: 270 } }}
					/>
					<Cube
						classes="cube--solo theme--candy collidable__cube-2 collision-wall"
						faces={{ top: { piece: 'gee', rotation: 90 }, left: { piece: 'elbow', rotation: 90 } }}
					/>
					<Cube
						classes="cube--solo theme--candy collidable__cube-3 collision-wall"
						faces={{ top: { piece: 'elbow', rotation: 180 }, right: { piece: 'split' } }}
					/>
					<Cube
						classes="cube--solo theme--candy collidable__cube-4 collision-wall"
						faces={{ right: { piece: 'elbow', rotation: 270 } }}
					/>
					<Cube
						classes="cube--solo theme--candy collidable__cube-5 collision-wall"
						faces={{ left: { piece: 'elbow', rotation: 270 } }}
					/>
					<Cube
						classes="cube--solo theme--candy collidable__cube-6 collision-wall"
						faces={{
							top: { piece: 'cap', rotation: 180 },
							right: { piece: 'elbow', rotation: 90 },
							left: { piece: 'elbow', rotation: 90 }
						}}
					/>
					<Cube
						classes="cube--solo theme--candy collidable__cube-7 collision-wall"
						faces={{ right: { piece: 'snake', rotation: 90 }, left: { piece: 'elbow' } }}
					/>
					<Cube
						classes="cube--solo theme--collidable collidable__cube-8 cube--dropzone draggable-dropzone--occupied"
					>
						<Cube
							classes="cube--solo theme--aquaman collidable__cube-9 draggable-source"
							faces={{ top: { piece: 'cap' }, right: { piece: 'elbow', rotation: 180 } }}
						/>
					</Cube>

					<Cube
						classes="cube--solo theme--collidable collidable__cube-10 cube--dropzone draggable-dropzone--occupied"
					>
						<Cube
							classes="cube--solo theme--candy collidable__cube-11 draggable-source"
							faces={{
								right: { piece: 'split', rotation: 90 },
								left: { piece: 'cap', rotation: 270 }
							}}
						/>
					</Cube>

					<Cube
						classes="cube--solo theme--aquaman collidable__cube-12 collision-wall"
						faces={{ top: { piece: 'elbow', rotation: 180 }, left: { piece: 'elbow' } }}
					/>
					<Cube
						classes="cube--solo theme--aquaman collidable__cube-13 collision-wall"
						faces={{ right: { piece: 'elbow', rotation: 270 } }}
					/>
					<Cube
						classes="cube--solo theme--aquaman collidable__cube-14 collision-wall"
						faces={{ top: { piece: 'elbow', rotation: 180 }, right: { piece: 'elbow' } }}
					/>
					<Cube
						classes="cube--solo theme--aquaman collidable__cube-15 collision-wall"
						faces={{ right: { piece: 'snake' }, left: { piece: 'line', rotation: 90 } }}
					/>
					<Cube
						classes="cube--solo theme--aquaman collidable__cube-16 collision-wall"
						faces={{
							top: { piece: 'elbow', rotation: 90 },
							right: { piece: 'elbow', rotation: 90 },
							left: { piece: 'elbow', rotation: 90 }
						}}
					/>
					<Cube classes="cube--solo theme--collidable cube--dropzone collidable__cube-17" />
				</div>
			</div>
		</div>
	</article>
</section>

<style lang="scss" global>
	@use 'styles';
</style>
