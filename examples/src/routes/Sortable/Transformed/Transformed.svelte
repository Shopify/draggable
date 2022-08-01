<script lang="ts">
	import { onMount } from 'svelte';
	import { Sortable } from '@draggable';

	import PaperStackItem from 'src/components/PaperStack/PaperStackItem.svelte';

	let container: HTMLElement;

	onMount(() => {
		new Sortable([container], {
			draggable: '.paper-stack__item--draggable',
			mirror: {
				appendTo: container,
				constrainDimensions: true
			}
		});
	});
</script>

<section>
	<article class="paper-stack__wrapper">
		<ul bind:this={container} class="paper-stack">
			<PaperStackItem label="one" classes="paper-stack__item--1" draggable />
			<PaperStackItem label="two" classes="paper-stack__item--2" draggable />
			<PaperStackItem label="three" classes="paper-stack__item--3" draggable />
			<PaperStackItem label="four" classes="paper-stack__item--4" draggable />
		</ul>
	</article>
</section>
