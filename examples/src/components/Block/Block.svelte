<script lang="ts">
	import classNames from 'classnames';
	import Pattern from '../Pattern/Pattern.svelte';

	export let draggable: boolean = false;
	export let variant: 'shell' | 'hollow' | 'stripes' | undefined = undefined;
	export let classes: string | string[] | undefined = undefined;

	export let label: string = '';
</script>

<span
	class={classNames('block', classes)}
	class:block--draggable={draggable}
	title={draggable ? 'Click to drag' : ''}
>
	<div
		class="block__content"
		class:block__content--shell={variant === 'shell'}
		class:block__content--hollow={variant === 'hollow'}
		class:block__content--stripes={variant === 'stripes'}
	>
		<h3 class="heading heading--size2 text-no-select">{label}</h3>

		{#if draggable}
			<Pattern variant="halftone" />
			<Pattern variant="placed" />
		{/if}
	</div>
</span>

<style lang="scss">
	@use 'styles';
</style>
