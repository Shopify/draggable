<script lang="ts">
	import '../styles/index.scss';
	import '@src/styles/components/puzzle/index.scss';
	import '@src/styles/components/heading.scss';
	import './styles/_themes.scss';

	import HeroSection from '@src/sections/Hero/Hero.svelte';
	import BasicsSection from '@src/sections/Basics/Basics.svelte';
	import SwappableSection from '@src/sections/Swappable/Swappable.svelte';
	import SortableSection from '@src/sections/Sortable/Sortable.svelte';
	import CollidableSection from '@src/sections/Collidable/Collidable.svelte';
	import FeaturesSection from '@src/sections/Features/Features.svelte';
</script>

<div class="home">
	<main>
		<HeroSection />
		<BasicsSection />
		<SwappableSection />
		<SortableSection />
		<CollidableSection />
		<FeaturesSection />
	</main>
</div>

<style lang="scss">
	@use 'styles';
</style>
