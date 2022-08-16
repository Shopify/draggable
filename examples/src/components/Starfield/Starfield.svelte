<script lang="ts">
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import { clear, drawPixel, moveStars } from './utils';

	const STAR_COUNT = 10000;

	let width: number;
	let height: number;
	let canvas: HTMLCanvasElement;
	let previousTime: number;

	const stars = Array.from({ length: STAR_COUNT }, () => ({
		x: Math.random() * 1600 - 800,
		y: Math.random() * 900 - 450,
		z: Math.random() * 1000
	}));

	onMount(() => {
		if (browser) {
			const setCanvasExtents = () => {
				width = document.body.clientWidth;
				height = document.body.clientHeight;
				canvas.width = width;
				canvas.height = height;
			};

			setCanvasExtents();

			addEventListener('resize', () => {
				setCanvasExtents();
			});

			const context = canvas.getContext('2d');

			const tick = (time: number) => {
				let elapsed = time - previousTime;
				previousTime = time;

				moveStars(stars, elapsed * 0.05);

				clear(context, canvas);

				const centerX = width / 2;
				const centerY = height / 2;

				stars.forEach((star) => {
					const x = centerX + star.x / (star.z * 0.001);
					const y = centerY + star.y / (star.z * 0.001);

					if (x >= 0 && x <= width && y >= 0 && y <= height) {
						const d = star.z / 1000.0;
						const b = 1 - d * d;

						drawPixel(context, x, y, b);
					}
				});

				requestAnimationFrame(tick);
			};

			const init = (time: number) => {
				previousTime = time;
				requestAnimationFrame(tick);
			};
			const animationFrame = requestAnimationFrame(init);

			return () => cancelAnimationFrame(animationFrame);
		}
	});
</script>

<canvas bind:this={canvas} class="starfield" />
