<script lang="ts">
	import { browser } from '$app/env';
	import type { SwappableSwappedEvent } from '@draggable/Swappable';

	import Cube from '@src/components/Cube/Cube.svelte';
	import { onMount } from 'svelte';

	import './styles/index.scss';

	let swappedNode: HTMLElement | null;

	onMount(async () => {
		if (browser) {
			const { soundEffects } = await import('@src/utils/synth');
			const { Swappable } = await import('@draggable');
			const containers = document.querySelectorAll('.cubes__frame--swappable .cube');
			const swappable = new Swappable(Array.from(containers) as HTMLElement[]);

			// --- Drag states --- //
			swappable.on('drag:start', () => {
				soundEffects.synth.play('up');
			});

			swappable.on('swappable:swapped', ({ swappedElement }: SwappableSwappedEvent) => {
				swappedNode = swappedElement;
				soundEffects.synth.play('swap');
			});

			swappable.on('drag:stop', () => {
				if (swappedNode) soundEffects.synth.play('downGood');
				else soundEffects.synth.play('downBad');

				swappedNode = null;
			});
		}
	});
</script>

<section class="section swappable">
	<article class="section__interior">
		<div class="content">
			<h3 class="heading heading--1">Swappable</h3>
			<p>
				The classic switcheroo. Drag one element over another and watch them trade places in the
				DOM. The ideal functionality for when layout dimensions need to be retained.
			</p>
		</div>
		<div class="puzzle puzzle--swappable">
			<div class="puzzle__interior">
				<div class="svg-container shadow">
					<svg class="svg" viewBox="0 0 782 555" focusable="false">
						<path
							d="M92.865 407.728L10 359.885v-91.963l79.645-45.984 76.414 44.118a10.758 10.758 0 0010.762 0 10.761 10.761 0 005.381-9.321v-88.168l79.761-46.051 76.298 44.051a10.758 10.758 0 0010.762 0 10.761 10.761 0 005.381-9.321V69.081l79.645-45.982 337.946 195.114.005 91.962-79.647 45.985-76.418-44.12a10.758 10.758 0 00-10.762 0 10.762 10.762 0 00-5.381 9.321l.003 88.235-79.647 45.984-76.415-44.117a10.758 10.758 0 00-10.762 0 10.763 10.763 0 00-5.381 9.321l.003 88.233L347.945 555 92.865 407.728z"
						/>
					</svg>
				</div>
				<div class="cubes__frame cubes__frame--swappable">
					<!-- Yellow row -->
					<Cube
						classes="theme--swappable theme--swappable-yellow"
						faces={{ top: { piece: 'cap', rotation: 270, draggable: true } }}
						hideOutline
					/>
					<Cube
						classes="theme--swappable theme--swappable-yellow"
						faces={{ top: { piece: 'line', rotation: 270, draggable: true } }}
						hideOutline
					/>
					<Cube
						classes="theme--swappable theme--swappable-yellow"
						faces={{ top: { piece: 'snake', rotation: 270, draggable: true } }}
						hideOutline
					/>
					<Cube
						classes="theme--swappable theme--swappable-yellow"
						faces={{ top: { piece: 'gee', rotation: 90, draggable: true } }}
						hideOutline
					/>

					<!-- Red row -->
					<Cube
						classes="theme--swappable theme--swappable-red"
						faces={{ top: { piece: 'gee', rotation: 270, draggable: true } }}
						hideOutline
					/>
					<Cube
						classes="theme--swappable theme--swappable-red"
						faces={{ top: { piece: 'loop', rotation: 270, draggable: true } }}
						hideOutline
					/>
					<Cube
						classes="theme--swappable theme--swappable-red"
						faces={{ top: { piece: 'line', rotation: 270, draggable: true } }}
						hideOutline
					/>
					<Cube
						classes="theme--swappable theme--swappable-red"
						faces={{ top: { piece: 'legs', rotation: 90, draggable: true } }}
						hideOutline
					/>

					<!-- Purple row -->
					<Cube
						classes="theme--swappable theme--swappable-purple"
						faces={{ top: { piece: 'bowl', rotation: 270, draggable: true } }}
						hideOutline
					/>
					<Cube
						classes="theme--swappable theme--swappable-purple"
						faces={{ top: { piece: 'lanes', rotation: 270, draggable: true } }}
						hideOutline
					/>
					<Cube
						classes="theme--swappable theme--swappable-purple"
						faces={{ top: { piece: 'fork', rotation: 90, draggable: true } }}
						hideOutline
					/>
					<Cube
						classes="theme--swappable theme--swappable-purple"
						faces={{ top: { piece: 'cap', rotation: 90, draggable: true } }}
						hideOutline
					/>
				</div>
				<div class="svg-container outline outline--swappable">
					<svg class="svg" viewBox="0 0 782 555" focusable="false">
						<path
							d="M781.997 203.081a4.298 4.298 0 00-2.148-3.721l-.013-.006L436.115.904a4.295 4.295 0 00-4.297 0l-85.934 49.614-.001.001a4.294 4.294 0 00-2.148 3.721v91.716l-79.372-45.826a4.295 4.295 0 00-4.297 0l-85.439 49.329c-.209.08-.415.172-.612.286a4.294 4.294 0 00-2.148 3.721v91.784L92.38 199.358a4.295 4.295 0 00-4.297 0l-85.928 49.61-.007.004A4.295 4.295 0 000 252.693v99.227c0 1.535.819 2.954 2.148 3.721l85.922 49.607.011.008 85.934 49.613 85.911 49.6.021.014 85.934 49.613a4.294 4.294 0 004.296 0l85.937-49.615a4.297 4.297 0 002.148-3.721l-.003-91.783 79.488 45.893a4.294 4.294 0 004.296 0l85.937-49.615a4.297 4.297 0 002.148-3.721l-.003-91.785 79.491 45.895a4.294 4.294 0 004.296 0l85.937-49.616a4.297 4.297 0 002.148-3.721v-99.226zM515.6 443.706l-77.34-44.652V309.75l77.34 44.652v89.304zm-171.867 99.227l-77.339-44.652v-89.305l77.339 44.652v89.305zm85.931-148.842l-77.337-44.651v-89.303l77.338 44.65-.001 89.304zm-163.27-183.57l77.337 44.651v89.304l-77.337-44.651v-89.304zm335.142 84.277l-77.34-44.653v-89.237l77.34 44.653v89.237zm-85.933-138.85v89.237l-77.34-44.653v-89.236l77.34 44.652zm94.527 54.575l57.348 33.109 19.993 11.543v89.304l-77.34-44.653v-89.303zM433.967 9.586l335.139 193.495-77.339 44.651-83.768-48.363-.017-.011-85.934-49.614-.012-.006-33.879-19.56-131.53-75.939 77.34-44.653zm-81.638 52.096l77.34 44.653v89.236l-77.34-44.653V61.682zm-90.114 47.13l83.109 47.984c.176.143.36.277.559.392l85.934 49.614.006.003 85.927 49.61.012.006 79.477 45.885-77.283 44.619-335.082-193.46 77.341-44.653zm-81.755 52.096l77.34 44.652v89.304l-23.837-13.762-53.503-30.89v-89.304zM90.231 208.04l83.779 48.37.006.004 85.934 49.614.006.003 85.911 49.601.014.009 79.49 45.894-72.959 42.122-4.381 2.529-83.784-48.373h-.001l-9.808-5.663L12.891 252.693l77.34-44.653zM8.593 260.135l77.34 44.652v89.305l-77.34-44.653v-89.304zm85.934 49.613l77.34 44.653v89.305l-77.34-44.652v-89.306zm85.933 49.614l77.339 44.652v89.305l-77.339-44.652v-89.305zm171.866 183.571v-89.305l77.34-44.652.003 89.302-77.343 44.655zm171.867-99.226v-89.238l77.34-44.652.003 89.235-77.343 44.655zm171.87-99.227v-89.304l77.34-44.652.003 89.302-77.343 44.654z"
						/>
					</svg>
				</div>
			</div>
		</div>
	</article>
</section>
