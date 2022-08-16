<script lang="ts">
	import Pattern from '../Pattern/Pattern.svelte';

	export let on: boolean = false;
</script>

<article class="pill-switch" class:pill-switch--on={on}>
	<div class="pill-switch__track">
		<Pattern variant="halftone" />
	</div>

	<span class="pill-switch__control">
		<p class="heading heading--jumbo text-no-select">
			{on ? 'on' : 'off'}
		</p>
	</span>
</article>

<style lang="scss">
	@use '../../styles/theme';
	@use 'styles/props';
	@use '../../styles/utils/shared/layout';
	@use '../../components/Pattern/styles/props' as pattern;
	@use 'styles';
</style>
