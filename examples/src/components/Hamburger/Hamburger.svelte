<script type="ts">
	let expanded: boolean = false;
</script>

<button
	type="button"
	id="mobile-nav-activator"
	class="hamburger"
	class:hamburger__expanded={expanded}
	aria-controls="sidebar"
>
	<div class="hamburger-bun">
		<div class="hamburger-patty" />
	</div>
</button>

<style lang="scss">
	@use './Hamburger.scss';
</style>
