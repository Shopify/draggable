<script lang="ts">
	import './styles/index.scss';

	import { browser } from '$app/env';
	import type { DragOverEvent, DragStartEvent } from '@draggable/Draggable';

	import Brand from '@src/components/Brand/Brand.svelte';
	import Cube from '@src/components/Cube/Cube.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (browser) {
			const { soundEffects } = await import('@src/utils/synth');
			const { Swappable } = await import('@draggable');
			const containers = document.querySelectorAll('.cubes__frame--hero .cube');
			const draggable = new Swappable(Array.from(containers) as HTMLElement[]);

			draggable.on('drag:start', (evt: DragStartEvent) => {
				evt.sensorEvent.originalEvent.preventDefault();
				soundEffects.synth.play('up');
			});

			draggable.on('drag:over', (evt: DragOverEvent) => {
				if (evt.source.getAttribute('data-face') !== evt.over.getAttribute('data-face')) {
					evt.preventDefault();
				}
			});
		}
	});
</script>

<section class="section hero">
	<article class="section__interior">
		<div class="content">
			<Brand variant="large" />
			<h2 class="subheading">
				<span class="text-nowrap">a lightweight, responsive,</span>
				<span class="text-nowrap">modern drag &amp; drop library</span>
			</h2>
			<div class="button__container">
				<a
					href="https://github.com/Shopify/draggable/archive/v1.0.0-beta.11.zip"
					class="button"
					title="Download the full library"
					data-gtag-category="Primary CTA"
					><div class="button__interior">
						<span class="button__text">download</span>
					</div></a
				><a
					href="/examples"
					class="button"
					title="Experiment with Examples"
					data-gtag-category="Primary CTA"
					><div class="button__interior">
						<span class="button__text">examples</span>
					</div></a
				>
			</div>
			<span class="helper-text"
				><a
					href="https://github.com/Shopify/draggable"
					class="link"
					title="Contribute to this open-source project"
					data-gtag-category="Secondary CTA">Contribute on Github</a
				>
				<span class="helper-bullet">•</span>
				<a
					href="https://shopify.github.io/draggable/docs"
					class="link"
					title="View the codebase documentation"
					data-gtag-category="Secondary CTA">View documentation</a
				></span
			>
		</div>
		<div class="puzzle puzzle--hero">
			<div class="puzzle__interior">
				<div class="svg-container shadow">
					<svg class="svg" viewBox="0 0 869 804" focusable="false">
						<path
							d="M24 588.698v77.475L262.721 804l160.574-92.708a21.403 21.403 0 0121.41 0l74.935 43.263 160.574-92.708a21.4 21.4 0 0121.41 0l74.936 43.263L844 666.174v-77.475H24z"
						/>
					</svg>
				</div>
				<div class="cubes__frame cubes__frame--hero">
					<Cube
						classes="theme--hero"
						faces={{ top: { piece: 'elbow', rotation: 180, draggable: true } }}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'elbow', rotation: 270, draggable: true },
							right: { piece: 'elbow', rotation: 180, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'line', draggable: true },
							right: { piece: 'snake', rotation: 90, draggable: true },
							left: { piece: 'cap', rotation: 270, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'line', draggable: true },
							left: { piece: 'elbow', rotation: 270, draggable: true }
						}}
					/>
					<Cube classes="theme--hero" faces={{ right: { piece: 'fork', draggable: true } }} />
					<Cube
						classes="theme--hero"
						faces={{ left: { piece: 'agt', rotation: 270, draggable: true } }}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'lanes', rotation: 90, draggable: true },
							right: { piece: 'line', draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'gee', rotation: 90, draggable: true },
							right: { piece: 'split', draggable: true },
							left: { piece: 'cap', rotation: 90, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{ right: { piece: 'elbow', rotation: 270, draggable: true } }}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							right: { piece: 'split', rotation: 90, draggable: true },
							left: { piece: 'line', draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'snake', draggable: true },
							right: { piece: 'elbow', draggable: true },
							left: { piece: 'elbow', rotation: 90, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'cap', draggable: true },
							left: { piece: 'fork', rotation: 90, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'loop', rotation: 90, draggable: true },
							right: { piece: 'vier', draggable: true }
						}}
					/>
					<Cube classes="theme--hero" faces={{ right: { piece: 'line', draggable: true } }} />
					<Cube
						classes="theme--hero"
						faces={{
							right: { piece: 'cap', rotation: 270, draggable: true },
							left: { piece: 'elbow', rotation: 270, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'elbow', rotation: 90, draggable: true },
							right: { piece: 'elbow', rotation: 90, draggable: true },
							left: { piece: 'fork', rotation: 270, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							right: { piece: 'elbow', rotation: 270, draggable: true },
							left: { piece: 'elbow', rotation: 90, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'snake', rotation: 90, draggable: true },
							right: { piece: 'line', draggable: true },
							left: { piece: 'elbow', rotation: 90, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'elbow', rotation: 90, draggable: true },
							right: { piece: 'elbow', rotation: 90, draggable: true },
							left: { piece: 'elbow', draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'cap', rotation: 180, draggable: true },
							right: { piece: 'line', rotation: 90, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{ left: { piece: 'elbow', rotation: 270, draggable: true } }}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							right: { piece: 'elbow', rotation: 270, draggable: true },
							left: { piece: 'snake', draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							right: { piece: 'elbow', rotation: 270, draggable: true },
							left: { piece: 'elbow', draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'elbow', rotation: 180, draggable: true },
							right: { piece: 'snake', draggable: true },
							left: { piece: 'line', rotation: 90, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'drie', rotation: 180, draggable: true },
							left: { piece: 'elbow', rotation: 90, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'bowl', rotation: 270, draggable: true },
							right: { piece: 'cap', rotation: 270, draggable: true },
							left: { piece: 'line', rotation: 90, draggable: true }
						}}
					/>
					<Cube
						classes="theme--hero"
						faces={{
							top: { piece: 'elbow', rotation: 180, draggable: true },
							right: { piece: 'elbow', rotation: 90, draggable: true },
							left: { piece: 'elbow', draggable: true }
						}}
					/>
				</div>
				<div class="svg-container outline outline--hero">
					<svg class="svg svg--auto" viewBox="0 0 869 804" focusable="false">
						<path
							d="M866.384 447.69l-83.146-48.005.001-96.007a5.365 5.365 0 00-2.682-4.645l-83.145-48.004v-96.008a5.365 5.365 0 00-2.682-4.645L523.076 51.271a5.36 5.36 0 00-5.364 0l-83.145 48.004L265.594 1.719a5.36 5.36 0 00-5.364 0l-85.827 49.552a5.363 5.363 0 00-2.682 4.645v96.008L2.748 249.481a5.363 5.363 0 00-2.682 4.645v396.418a5.368 5.368 0 002.682 4.646L260.23 803.847a5.363 5.363 0 005.364 0l168.972-97.556 83.145 48.004a5.363 5.363 0 005.364 0l168.972-97.556 83.145 48.003a5.363 5.363 0 005.364 0l85.827-49.552a5.363 5.363 0 002.682-4.646V452.336a5.36 5.36 0 00-2.681-4.646zm-88.509 48.003l-18.774-10.84-56.302-32.506 75.302-43.241 74.873 43.228-75.099 43.359zM646.452 373.362l-40.231 23.228-160.926-92.911 50.066-28.906 25.033-14.453 83.145 48.004a5.36 5.36 0 005.364 0l83.145-48.004 75.099 43.358-120.695 69.684zM520.394 644.351l-75.099-43.358 50.066-28.906 25.033-14.453 2.086 1.204 73.013 42.154-75.099 43.359zM182.449 151.924V65.208l120.694 69.683 40.231 23.228V343.94l-56.324-32.519-18.775-10.84v-96.008a5.365 5.365 0 00-2.682-4.645l-83.144-48.004zm257.482 247.762V312.97l11.789 6.806 149.136 86.104.001 185.821-75.099-43.358v-96.008a5.365 5.365 0 00-2.682-4.645l-83.145-48.004zm246.753-235.374v86.717l-25.033 14.453-50.066 28.906v-86.717l18.775-10.84 56.324-32.519zm-110.86 28.906l25.033 14.453v86.717l-50.066-28.906-25.033-14.453v-86.717l50.066 28.906zM429.202 114.76v89.814a5.365 5.365 0 008.046 4.645l77.781-44.907v86.717l-83.145 48.004a5.363 5.363 0 00-2.682 4.645v96.008l-40.231 23.228-120.694 69.683V405.88l83.145-48.004a5.363 5.363 0 002.682-4.645V158.119l18.775-10.84 56.323-32.519zm-91.191 535.785l-50.066 28.906-25.033 14.453-53.642-30.97-107.284-61.94 56.324-32.519 18.775-10.84 40.231 23.228 120.695 69.682zM187.813 353.231l50.066-28.906 25.033-14.453 18.775 10.84 56.324 32.519-50.066 28.906-25.033 14.453-18.775-10.84-56.324-32.519zm69.735-139.366v86.717l-83.145 48.004a5.363 5.363 0 00-2.682 4.645v195.112l-18.775 10.84-56.324 32.519V306.776l40.231-23.228 120.695-69.683zm-34.867 357.706l-40.231-23.228V362.522l56.324 32.519 18.775 10.84v96.008a5.365 5.365 0 002.682 4.645l83.145 48.004v86.717l-120.695-69.684zm126.058-26.325l-25.033-14.453-50.066-28.906 120.694-69.683 40.231-23.228 25.033 14.453 50.066 28.906-120.694 69.683-40.231 23.228zM520.394 62.111l160.926 92.911-56.324 32.519-18.775 10.84-83.145-48.004a5.36 5.36 0 00-5.364 0l-77.781 44.907v-86.717l80.463-46.456zM262.912 12.558l160.926 92.911-56.324 32.519-18.775 10.84-40.231-23.228-120.695-69.683 75.099-43.359zm-85.827 148.657l25.033 14.453 50.066 28.906-120.694 69.683-40.231 23.228-18.775-10.84-56.324-32.519 160.925-92.911zM10.795 263.418l56.324 32.519 18.775 10.84v294.217a5.365 5.365 0 002.682 4.645l168.972 97.556v86.717L10.795 647.448v-384.03zm257.481 439.776l83.145-48.004a5.363 5.363 0 002.682-4.646v-96.008l40.232-23.228 120.694-69.683v86.717l-83.145 48.004a5.363 5.363 0 00-2.682 4.646V697l-160.926 92.911v-86.717zm171.655-92.91l75.099 43.358v86.717L439.931 697v-86.716zm85.827 43.358l83.145-48.003a5.363 5.363 0 002.682-4.645V405.88l40.231-23.228 120.694-69.683-.001 86.717-83.032 47.939-.102.058-.004.002-.006.003c-.056.032-.105.073-.16.107-.147.092-.295.184-.431.289-.012.009-.021.02-.033.029a5.363 5.363 0 00-2.059 4.221v195.112l-160.926 92.911v-86.715zm171.655-192.016l56.323 32.519 18.774 10.84v185.821l-75.099-43.358.002-185.822zm160.925 185.822l-75.099 43.358V504.985l75.099-43.358v185.821z"
						/>
					</svg>
				</div>
			</div>
		</div>
	</article>
</section>
