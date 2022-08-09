<script lang="ts">
	import classNames from 'classnames';

	import type { Side, Face as FaceType } from './Face/Face.svelte';
	import Face from './Face/Face.svelte';
	import Outline from './Outline.svelte';

	export let id: string | undefined = undefined;
	export let faces: Partial<Record<Side, FaceType>> = {};
	export let classes: string | string[] = '';
	export let hideOutline: boolean = false;
</script>

<div {id} class={classNames('cube', classes)} tabindex="0">
	<div class="jelly">
		<div class="jelly__interior">
			<Face side="left" {...faces.left} />
			<Face side="top" {...faces.top} />
			<Face side="right" {...faces.right} />
			{#if !hideOutline}
				<Outline />
			{/if}
		</div>
	</div>
	<slot />
</div>

<style lang="scss" global>
	@use 'styles';
</style>
