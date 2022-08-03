<script lang="ts">
	import classNames from 'classnames';

	export let variant: 'stripes' | 'halftone' | 'placed' = 'stripes';
</script>

<div
	class="pattern"
	class:pattern--halftone={variant === 'halftone'}
	class:pattern--placed={variant === 'placed'}
	class:pattern--stripes={variant === 'stripes'}
/>

<style lang="scss">
	@use 'styles';
</style>
