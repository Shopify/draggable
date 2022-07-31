<script lang="ts">
	import classNames from 'classnames';

	export let variant: 'stripes' | 'halftone' | 'placed' = 'stripes';
</script>

<div class={classNames('pattern', `pattern--${variant}`)} />

<style lang="scss">
	@use 'styles';
</style>
