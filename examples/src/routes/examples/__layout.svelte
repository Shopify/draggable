<script lang="ts">
	import Sidebar from '@src/components/Sidebar/Sidebar.svelte';
	import pages from '@src/common/data/pages';
	import Hamburger from '@src/components/Hamburger/Hamburger.svelte';
	import classNames from 'classnames';

	let open = false;
</script>

<div class="content">
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

<style lang="scss" global>
	@use '../../styles';
	@use '__layout';
</style>
