<script lang="ts">
	import Sidebar from '@src/components/Sidebar/Sidebar.svelte';
	import pages from '@src/common/data/pages';
	import Hamburger from '@src/components/Hamburger/Hamburger.svelte';
	import classNames from 'classnames';
	import { page } from '$app/stores';

	import '@src/styles/index.scss';
	import './__layout.scss';

	let open = false;

	$: $page.url.pathname, (open = false);
</script>

<div class="examples">
	<Sidebar {pages} classes={classNames({ open })} />

	<main class="main">
		<Hamburger
			expanded={open}
			onClick={() => {
				open = !open;
			}}
		/>
		<slot />
	</main>
</div>
