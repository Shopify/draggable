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

	.pill-switch {
		&__control {
			&:global(.draggable-mirror) {
				background-color: white;
				color: map-get(theme.$colors, 'brand-blue');
			}
			&:global(.draggable-source--is-dragging) {
				@include layout.visible(false);
			}
		}
		&--on {
			.pill-switch__control {
				&:global(.draggable-mirror) {
					color: map-get(theme.$colors, 'brand-blue');
					background-color: white;
				}
			}
		}

		&__track {
			& :global(.pattern--halftone) {
				@include pattern.pattern-halftone-animated();
				height: map-get(props.$pill-switch-sizes, 'base');
				transform: rotate(45deg);

				@media screen and (min-width: map-get(theme.$breakpoints, 'md')) {
					height: map-get(props.$pill-switch-sizes, 'tablet');
				}
			}
		}
	}
</style>
