<script lang="ts">
	import classNames from 'classnames';
	import Pattern from '../Pattern/Pattern.svelte';
	import './styles/index.scss';

	export let draggable = false;
	export let classes: string | string[] | undefined = '';
	export let label: string;
</script>

<li
	class={classNames('stacked-list__item', classes)}
	class:stacked-list__item--draggable={draggable}
	tabindex={draggable ? 1 : 0}
>
	<div class="stacked-list__item-content">
		<h4 class="heading heading--4 text-no-select">{label}</h4>
		<div class={draggable ? 'drag-handle' : 'nope-handle'} />
		{#if draggable}
			<Pattern variant="halftone" />
			<Pattern variant="placed" />
		{/if}
	</div>
</li>
