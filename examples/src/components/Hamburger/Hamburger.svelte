<script type="ts">
	export let expanded: boolean = false;
	export let onClick: () => void;
</script>

<svelte:body style={`overflow-y: ${expanded ? 'hidden' : 'auto'};`} />

<button class="hamburger" class:hamburger--expanded={expanded} on:click={onClick}>
	<div class="hamburger__bun-top" />
	<div class="hamburger__patty" />
	<div class="hamburger__bun-bottom" />
</button>

<style lang="scss">
	@use 'styles';
</style>
