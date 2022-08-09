<script lang="ts">
	import HeroSection from '@src/sections/Hero/Hero.svelte';
	import BasicsSection from '@src/sections/Basics/Basics.svelte';
	import SwappableSection from '@src/sections/Swappable/Swappable.svelte';
	import SortableSection from '@src/sections/Sortable/Sortable.svelte';
	import CollidableSection from '@src/sections/Collidable/Collidable.svelte';
	import FeaturesSection from '@src/sections/Features/Features.svelte';
</script>

<main>
	<button
		id="sound-toggle"
		class="visually-hidden"
		data-enabled="true"
		data-label-disable="Disable UI sound effects"
		data-label-enable="Enable UI sound effects"
	>
		Disable UI sound effects
	</button>
	<HeroSection />
	<BasicsSection />
	<SwappableSection />
	<SortableSection />
	<CollidableSection />
	<FeaturesSection />
</main>

<style lang="scss" global>
	@use '../styles' as *;
	@use 'styles';
</style>
