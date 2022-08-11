<script lang="ts">
	import classNames from 'classnames';
	import Pattern from '../Pattern/Pattern.svelte';

	import './styles/index.scss';

	export let draggable: boolean = false;
	export let classes: string | string[] | undefined;
	export let label: string;
</script>

<li
	class={classNames('paper-stack__item', classes)}
	class:paper-stack__item--draggable={draggable}
	tabIndex={draggable ? 1 : 0}
>
	<div class="paper-stack__content">
		<h4 class="heading text-no-select paper-stack__heading">{label}</h4>
		{#if draggable}
			<Pattern variant="halftone" />
			<Pattern variant="placed" />
		{/if}
	</div>
</li>
