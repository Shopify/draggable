<script lang="ts">
	import { browser } from '$app/env';

	import Cube from '@src/components/Cube/Cube.svelte';
	import { onMount } from 'svelte';

	let accessible: HTMLElement;
	let extensible: HTMLElement;
	let interaction: HTMLElement;
	let animation: HTMLElement;

	onMount(async () => {
		if (browser) {
			const { soundEffects } = await import('@src/utils/synth');

			accessible.addEventListener('mouseenter', () => {
				soundEffects.accessible.play();
			});
			accessible.addEventListener('mouseleave', () => {
				soundEffects.accessible.pause();
			});
			accessible.addEventListener('mousedown', () => {
				soundEffects.accessible.unmute(1);
			});
			accessible.addEventListener('mouseup', () => {
				soundEffects.accessible.mute(1);
			});

			extensible.addEventListener('mouseenter', () => {
				soundEffects.extensible.play();
			});
			extensible.addEventListener('mouseleave', () => {
				soundEffects.extensible.pause();
			});
			extensible.addEventListener('mousedown', () => {
				soundEffects.extensible.speed(1.5);
			});
			extensible.addEventListener('mouseup', () => {
				soundEffects.extensible.speed(1);
			});

			interaction.addEventListener('mouseenter', () => {
				soundEffects.single.play('interactionHover');
			});
			interaction.addEventListener('mouseleave', () => {
				soundEffects.single.play('interactionHover', true);
			});
			interaction.addEventListener('mousedown', () => {
				soundEffects.single.play('interactionActive');
			});
			interaction.addEventListener('mouseup', () => {
				soundEffects.single.play('interactionActive', true);
			});

			Array.from(animation.getElementsByClassName('cube')).forEach((cube, index) => {
				cube.addEventListener('mouseenter', () => {
					soundEffects.single.play(`animationUp${index + 1}`);
				});
				cube.addEventListener('mousedown', () => {
					soundEffects.single.play(`animationDown${index + 1}`);
				});
			});
		}
	});
</script>

<section class="section features">
	<article class="section__interior section__interior--margin accessible">
		<div class="content">
			<h3 class="heading heading--1">Accessible</h3>
			<span class="badge">Coming soon</span>
			<p>
				Drag &amp; drop accessibility is a delicate flower. While browsers continue to work on a
				reliable native solution, Draggable lends a helping hand. All draggable elements are
				focusable and provide customizable screen&nbsp;reader announcements.
			</p>
		</div>
		<div bind:this={accessible} class="puzzle puzzle--accessible">
			<div class="puzzle__interior">
				<div class="svg-container shadow">
					<svg class="svg" viewBox="0 0 696 358" focusable="false">
						<path
							d="M264.128 309.994l-86.345-49.851.007.004c-.049-.027-86.394-49.879-86.436-49.903l.006.003-83.12-47.991v-92.26l79.901-46.13L341.878 170.36a10.788 10.788 0 0010.798 0l84.252-48.641-.008.004 83.116-47.986 79.901 46.131.003 92.259-169.51 97.863L347.275 358l-83.147-48.006z"
						/>
					</svg>
				</div>
				<div class="cubes__frame">
					<Cube classes="cube--solo theme--candy" />
					<Cube classes="cube--solo theme--candy" />
					<Cube classes="cube--solo theme--candy" />
					<Cube classes="cube--solo theme--candy" />
					<Cube classes="cube--solo theme--candy" />
					<Cube classes="cube--solo theme--candy" />
					<Cube classes="cube--solo theme--candy" />
				</div>
			</div>
		</div>
	</article>
	<article class="section__interior section__interior--margin extensible">
		<div class="content">
			<h3 class="heading heading--1">Extensible</h3>
			<p>
				Draggable is easy to extend. Write a custom module that provides the functionality you need,
				then
				<a
					href="https://github.com/Shopify/draggable"
					class="Link"
					title="Contribute to this open-source project"
					data-gtag-category="Secondary CTA">submit it to our Github repo</a
				>
				for review. If you needed a feature that wasn't already available, chances are the community
				needs it too. Sharing is caring.
			</p>
		</div>
		<div bind:this={extensible} class="puzzle puzzle--extensible">
			<div class="puzzle__interior">
				<div class="svg-container shadow">
					<svg class="svg" viewBox="0 0 436 502" focusable="false">
						<path
							d="M8.934 455.958V65.226l79.747-46.042 82.949 47.891-.011-.006 86.039 49.671c.089.056.181.111.273.163l169.131 97.648.003 92.081-82.964 47.899-86.215 49.777.003-.002C257.848 404.331 88.681 502 88.681 502L8.934 455.958z"
						/>
					</svg>
				</div>
				<div class="cubes__frame">
					<Cube classes="cube--solo theme--mana" />
					<Cube classes="cube--solo theme--mana" />
					<Cube classes="cube--solo theme--mana" />
					<Cube classes="cube--solo theme--mana" />
					<Cube classes="cube--solo theme--mana" />
					<Cube classes="cube--solo theme--mana" />
					<Cube classes="cube--solo theme--mana" />
					<Cube classes="cube--solo theme--mana" />
					<Cube classes="cube--solo theme--mana" />
				</div>
			</div>
		</div>
	</article>
	<article class="section__interior section__interior--margin interaction">
		<div class="content">
			<h3 class="heading heading--1">Interaction</h3>
			<p>
				Draggable supports most of the interaction events we could think of: mouse, touch, and force
				touch are all available out of the box, with accessible keyboard support coming soon!
			</p>
		</div>
		<div bind:this={interaction} class="puzzle puzzle--interaction">
			<div class="puzzle__interior">
				<div class="svg-container shadow shadow--interaction">
					<svg class="svg" viewBox="0 0 866 302" focusable="false">
						<path
							d="M9.897 160.784l.001 95.384L89.284 302l80.883-46.697a10.724 10.724 0 0110.728 0L261.777 302l80.458-46.452a10.724 10.724 0 0110.728 0L433.422 302l80.458-46.452a10.724 10.724 0 0110.728 0L605.067 302l80.459-46.452a10.724 10.724 0 0110.728 0L776.715 302l79.389-45.834-.002-95.382H9.897z"
						/>
					</svg>
				</div>
				<div class="svg-container shadow shadow--interaction-hover">
					<svg class="svg" viewBox="0 0 866 302" focusable="false">
						<path
							d="M9.898 111.235v45.834L260.928 302l166.321-96.002a10.724 10.724 0 0110.728 0L605.881 302l250.223-144.933-.001-45.832H9.898z"
						/>
					</svg>
				</div>
				<div class="svg-container shadow shadow--interaction-active">
					<svg class="svg" viewBox="0 0 866 302" focusable="false">
						<path
							d="M856.103 61.461H9.9v46.057l80.454 46.45a10.728 10.728 0 015.364 9.29v92.908L175.103 302l252.146-145.776a10.724 10.724 0 0110.728 0L690.486 302l79.389-45.834-.003-92.671c0-3.832 2.045-7.374 5.364-9.29l80.868-46.688-.001-46.056z"
						/>
					</svg>
				</div>
				<div class="cubes__frame">
					<Cube classes="cube--solo theme--tropic">
						<div class="svg-container shadow shadow--cube">
							<svg class="svg" viewBox="0 0 180 207" focusable="false">
								<path d="M8.978 160.222l-.003-93.561 81.029-46.782 81.021 46.783v93.558L90 207z" />
							</svg>
						</div>
					</Cube>
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--aurora" />
					<Cube classes="cube--solo theme--tropic" />
					<Cube classes="cube--solo theme--aurora" />
				</div>
			</div>
		</div>
	</article>
	<article class="section__interior section__interior--margin animation">
		<div class="content">
			<h3 class="heading heading--1">Animation</h3>
			<p>
				Let's face it, it's annoying when plugins get in the way of your personal design touch.
				Draggable isn't going to try and steal the show by forcing any unruly animation styles on
				you. Simply take your pick from our healthy serving of CSS selectors and style to your
				heart's desire.
			</p>
		</div>
		<div bind:this={animation} class="puzzle puzzle--animation">
			<div class="puzzle__interior">
				<div class="cubes__frame">
					<Cube classes="cube--solo theme--island theme--island-alt">
						<div class="svg-container shadow shadow--cube">
							<svg class="svg" viewBox="0 0 180 207" focusable="false">
								<path d="M8.978 160.222l-.003-93.561 81.029-46.782 81.021 46.783v93.558L90 207z" />
							</svg>
						</div>
					</Cube>

					<Cube classes="cube--solo theme--tropic theme--tropic-alt">
						<div class="svg-container shadow shadow--cube">
							<svg class="svg" viewBox="0 0 180 207" focusable="false">
								<path d="M8.978 160.222l-.003-93.561 81.029-46.782 81.021 46.783v93.558L90 207z" />
							</svg>
						</div>
					</Cube>

					<Cube classes="cube--solo theme--toybox theme--toybox-alt">
						<div class="svg-container shadow shadow--cube">
							<svg class="svg" viewBox="0 0 180 207" focusable="false">
								<path d="M8.978 160.222l-.003-93.561 81.029-46.782 81.021 46.783v93.558L90 207z" />
							</svg>
						</div>
					</Cube>
				</div>
			</div>
		</div>
	</article>
	<footer class="footer">
		<div class="legal__text">
			<p>
				Draggable is released under the
				<a
					href="https://github.com/Shopify/shopify.github.com/blob/master/LICENSE.md"
					class="Link"
					title="View MIT License"
					target="_blank"
					rel="noopener">MIT license</a
				>.
			</p>
			<p>You are free to use the code from this library for both personal and commercial use.</p>
		</div>
	</footer>
</section>

<style lang="scss" global>
	@use 'styles';
</style>
