<script lang="ts">
	import Pattern from '../Pattern/Pattern.svelte';

	let on: boolean = false;
	let heading: string;
</script>

<article class="pill-switch" class:pill-switch--on={on}>
	<div class="pill-switch__track">
		<Pattern variant="halftone" />
	</div>

	<span class="pill-switch__control">
		<p class="heading heading--jumbo text-no-select">
			{heading}
		</p>
	</span>
</article>

<style lang="scss">
	@use 'styles';
</style>
