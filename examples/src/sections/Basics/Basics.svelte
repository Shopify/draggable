<script lang="ts">
	import { onMount } from 'svelte';

	import { browser } from '$app/env';
	import Cube from '@src/components/Cube/Cube.svelte';
	import type { DragOverEvent, DragStartEvent } from '@draggable/Draggable';
	import type { SnapInEvent } from '@draggable/Plugins/Snappable';
	import type { DroppableDroppedEvent } from '@draggable/Droppable';

	let container: HTMLElement;
	let justLifted = false;
	let snappedIn = false;
	let snappedOut = false;

	let initialDropzone: HTMLElement | null;

	onMount(async () => {
		if (browser) {
			const { Droppable, Plugins } = await import('@draggable');

			const droppable = new Droppable([container], {
				dropzone: '.cube--dropzone',
				mirror: { appendTo: container },
				plugins: [Plugins.Snappable]
			});

			droppable.on('drag:start', (evt: DragStartEvent) => {
				// SoundFx.Single.play('cubeUp');
				justLifted = true;
				initialDropzone = evt.source.parentElement;
			});

			droppable.on('drag:stop', () => {
				// if (!snappedIn) SoundFx.Single.play('cubeDown');
				justLifted = false;
				snappedIn = false;
				snappedOut = false;
			});

			droppable.on('snap:out', () => {
				if (!justLifted) {
					// SoundFx.Single.play('cubeUp');
					snappedIn = false;
					snappedOut = true;
				}
			});

			droppable.on('snap:in', (evt: SnapInEvent) => {
				if (snappedIn || evt.snappable.parentNode === initialDropzone) {
					evt.cancel();
					return;
				}

				// SoundFx.Single.play('cubeDown');
				justLifted = false;
				snappedIn = true;

				initialDropzone = null;
			});

			droppable.on('drag:over', (evt: DragOverEvent) => {
				if (evt.source.id === 'basics__cube-10' && evt.over.id === 'basics__cube-11') {
					evt.cancel();
				}

				if (evt.source.id === 'basics__cube-11' && evt.over.id === 'basics__cube-10') {
					evt.cancel();
				}
			});

			droppable.on('droppable:dropped', (evt: DroppableDroppedEvent) => {
				if (evt.dragEvent.source.id === 'basics__cube-10' && evt.dropzone.id === 'basics__cube-3') {
					evt.cancel();
				}

				if (evt.dragEvent.source.id === 'basics__cube-11' && evt.dropzone.id === 'basics__cube-7') {
					evt.cancel();
				}
			});
		}
	});
</script>

<section class="section basics">
	<article class="section__interior">
		<div class="content">
			<h3 class="heading heading--1">Basics</h3>
			<p>
				Draggable is a modular drag &amp; drop library, allowing you to start small and build up
				with the features you need. At its most basic, Draggable gives you drag &amp; drop
				functionality, fast DOM reordering, accessible markup, and a bundle of events to grab on to.
			</p>
		</div>
		<div class="puzzle puzzle--basics">
			<div class="puzzle__interior">
				<div class="svg-container shadow shadow--basics shadow--basics-left">
					<svg class="svg" viewBox="0 0 354 357" focusable="false">
						<path
							d="M182.617 309.991a10.845 10.845 0 00-10.856 0L90.337 357 10 310.618v-92.764l80.337-46.382 81.422 47.01a10.845 10.845 0 0010.856 0l81.422-47.01 80.337 46.383.003 92.762L264.038 357l-81.421-47.009z"
						/>
					</svg>
				</div>
				<div class="svg-container shadow shadow--basics shadow--basics-right">
					<svg class="svg" viewBox="0 0 354 408" focusable="false">
						<path
							d="M10.114 361.583v-92.846l81.49-47.052a10.866 10.866 0 005.433-9.41l-.003-94.103 167.333-96.609 80.407 46.422v92.846l-81.493 47.051a10.866 10.866 0 00-5.433 9.41v94.099L90.514 408l-80.4-46.417z"
						/>
					</svg>
				</div>
				<div bind:this={container} class="cubes__frame cubes__frame--basics" tabindex="0">
					<!-- Eggplant Cubes -->
					<Cube
						id="basics__cube-1"
						classes="theme--eggplant cube--solo basics__cube-1"
						faces={{
							right: { piece: 'line', rotation: 180 },
							left: { piece: 'fork', rotation: 90 }
						}}
					/>
					<Cube
						id="basics__cube-2"
						classes="theme--eggplant cube--solo basics__cube-2"
						faces={{ right: { piece: 'snake', rotation: 90 }, left: { piece: 'elbow' } }}
					/>
					<!-- Dropzone -->
					<Cube classes="theme--basics cube--solo basics__cube-3 cube--dropzone" />

					<!-- Berry Cubes -->
					<Cube
						classes="theme--berry cube--solo basics__cube-4"
						id="basics__cube-4"
						faces={{ top: { piece: 'line' }, right: { piece: 'cap', rotation: 270 } }}
					/>
					<Cube
						classes="theme--berry cube--solo basics__cube-5"
						id="basics__cube-5"
						faces={{ right: { piece: 'elbow', rotation: 270 } }}
					/>
					<Cube
						classes="theme--berry cube--solo basics__cube-6"
						id="basics__cube-6"
						faces={{
							top: { piece: 'elbow', rotation: 90 },
							right: { piece: 'line', rotation: 90 },
							left: { piece: 'snake' }
						}}
					/>

					<!-- Dropzone -->
					<Cube classes="theme--basics cube--solo basics__cube-7 cube--dropzone" />
					<Cube
						classes="theme--basics cube--solo basics__cube-8 cube--dropzone draggable-dropzone--occupied"
					>
						<Cube
							classes="theme--berry cube--solo basics__cube-10 draggable-source"
							id="basics__cube-10"
							faces={{
								right: { piece: 'elbow', rotation: 90 },
								left: { piece: 'elbow', rotation: 90 }
							}}
						>
							<div class="svg-container shadow shadow--cube">
								<svg class="svg" viewBox="0 0 180 207" focusable="false">
									<path
										d="M8.978 160.222l-.003-93.561 81.029-46.782 81.021 46.783v93.558L90 207z"
									/>
								</svg>
							</div>
						</Cube>
					</Cube>
					<Cube
						classes="theme--basics cube--solo basics__cube-9 cube--dropzone draggable-dropzone--occupied"
					>
						<Cube
							classes="theme--eggplant cube--solo basics__cube-11 draggable-source"
							id="basics__cube-11"
							faces={{ top: { piece: 'line' }, right: { piece: 'cap', rotation: 270 } }}
						>
							<div class="svg-container shadow shadow--cube">
								<svg class="svg" viewBox="0 0 180 207" focusable="false">
									<path
										d="M8.978 160.222l-.003-93.561 81.029-46.782 81.021 46.783v93.558L90 207z"
									/>
								</svg>
							</div>
						</Cube>
					</Cube>
				</div>
			</div>
		</div>
	</article>
</section>

<style lang="scss" global>
	@use 'styles';
</style>
