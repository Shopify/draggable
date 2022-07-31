<script lang="ts">
	import type Page from 'src/common/types/Page';
	import Brand from '../Brand/Brand.svelte';
	import Navigation from '../Navigation/Navigation.svelte';

	export let pages: Page[];
</script>

<aside id="sidebar" class="sidebar" aria-hidden="true">
	<header class="sidebar__header">
		<Brand />
	</header>
	<Navigation {pages} />

	<footer class="sidebar__footer">
		<p class="legal-text">
			<a
				href="https://shopify.github.io/draggable/"
				class="Link Link--typeDark"
				title="Visit Draggable JS">draggable.js</a
			>
			was developed by
			<a href="https://github.com/tsov" class="Link Link--noWrap" title="Github: tsov"
				>Max Hoffmann</a
			>
			and
			<a href="https://github.com/beefchimi" class="Link Link--noWrap" title="Github: beefchimi"
				>Curtis Dulmage</a
			>.
		</p>

		<p class="legal-text">
			Draggable is released under the
			<a
				href="https://github.com/Shopify/shopify.github.com/blob/master/LICENSE.md"
				class="Link Link--noWrap"
				title="View MIT License"
				target="_blank"
				rel="noopener">MIT license</a
			>. You are free to use the code from this library for both personal and commercial use.
		</p>

		<p class="preload-cursors">
			<b>Special thanks</b> <u>to all of our</u>
			<a
				href="https://github.com/Shopify/draggable/graphs/contributors"
				title="We love our contributors!">amazing contributors</a
			>.
		</p>
	</footer>
</aside>
