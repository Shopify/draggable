<script lang="ts">
	import classNames from 'classnames';
	import Pattern from '../Pattern/Pattern.svelte';

	export let id: string | undefined = undefined;
	export let draggable: boolean = false;
	export let colliding: boolean = false;
	export let variant: 'shell' | 'hollow' | 'stripes' | undefined = undefined;
	export let classes: string | string[] | undefined = undefined;

	export let label: string = '';
</script>

<span
	{id}
	class={classNames('block', classes)}
	class:block--colliding={colliding}
	class:block--draggable={draggable}
	class:block--shell={variant === 'shell'}
	class:block--hollow={variant === 'hollow'}
	class:block--stripes={variant === 'stripes'}
	title={draggable ? 'Click to drag' : ''}
>
	<div class="block__content">
		<h2 class="heading heading--2 text-no-select">{label}</h2>

		{#if draggable}
			<Pattern variant="halftone" />
			<Pattern variant="placed" />
		{/if}
	</div>
</span>

<style lang="scss">
	@use 'styles';
</style>
