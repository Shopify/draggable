<script lang="ts">
	import { browser } from '$app/env';

	import Cube from '@src/components/Cube/Cube.svelte';
	import { onMount } from 'svelte';

	let container: HTMLElement;

	onMount(async () => {
		if (browser) {
			const { Sortable } = await import('@draggable');
			const draggable = new Sortable([container], {
				mirror: {
					appendTo: container
				}
			});

			// // --- Drag states --- //
			// draggable.on('drag:start', () => {
			// 	SoundFx.Single.play('cubeUp');
			// });

			// draggable.on(
			// 	'sortable:sorted',
			// 	Utils.debounce(() => {
			// 		SoundFx.Single.play('cubeSort');
			// 	}, 60)
			// );

			// draggable.on('drag:stop', () => {
			// 	SoundFx.Single.play('cubeDown');
			// });
		}
	});
</script>

<section class="section sortable">
	<article class="section__interior">
		<div class="content">
			<h3 class="heading heading--1">Sortable</h3>
			<p>
				Sort DOM nodes with style. Drag items in a collection from one spot to another and watch
				everything snap into place. Fast and responsive sorting that won’t leave your performance
				wallet strapped for frames.
			</p>
		</div>
		<div class="puzzle puzzle--sortable">
			<div class="puzzle__interior">
				<div class="svg-container shadow">
					<svg class="svg" viewBox="0 0 438 655" focusable="false">
						<path
							d="M10 608.973V218.366l169.121-97.643-.005.003 169.156-97.664 79.721 46.027.007 294.519c-.002.052-.008.336-.008.427l.003 95.658-255.3 147.401.005-.003L89.721 655 10 608.973zm247.781-347.89c-1.86 0-3.72.481-5.387 1.443l-77.566 44.783a10.774 10.774 0 00-5.387 9.33l.003 89.563a10.773 10.773 0 0016.161 9.329l77.562-44.782a10.774 10.774 0 005.387-9.33v-89.564a10.775 10.775 0 00-10.773-10.772z"
						/>
					</svg>
				</div>
				<div bind:this={container} class="cubes__frame cubes__frame--sortable" tabindex="0">
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{ right: { piece: 'elbow', rotation: 270 } }}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{
							top: { piece: 'legs', rotation: 180 },
							right: { piece: 'line', rotation: 90 }
						}}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{ right: { piece: 'line', rotation: 90 } }}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{ right: { piece: 'elbow' }, left: { piece: 'gee', rotation: 270 } }}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{ right: { piece: 'fork' }, left: { piece: 'line', rotation: 90 } }}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{
							right: { piece: 'fork', rotation: 180 },
							left: { piece: 'line', rotation: 90 }
						}}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{
							top: { piece: 'elbow', rotation: 270 },
							right: { piece: 'line', rotation: 180 }
						}}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{ top: { piece: 'line' }, right: { piece: 'elbow', rotation: 180 } }}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{ top: { piece: 'fork' }, right: { piece: 'snake', rotation: 270 } }}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{ right: { piece: 'loop' }, left: { piece: 'line', rotation: 90 } }}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{ right: { piece: 'line' }, left: { piece: 'snake', rotation: 90 } }}
					/>
					<Cube
						classes="cube--solo theme--watermelon draggable-source"
						faces={{
							top: { piece: 'lanes' },
							right: { piece: 'elbow', rotation: 90 },
							left: { piece: 'fork', rotation: 270 }
						}}
					/>
				</div>
			</div>
		</div>
	</article>
</section>

<style lang="scss" global>
	@use 'styles';
</style>
