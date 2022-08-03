<script lang="ts">
	export let section: string;
	export let child: string | undefined = undefined;
	export let id: string;
	export let subheading: string;
</script>

<header class="page-header">
	<h1 class="heading heading--1">{section}</h1>
	<h2 class="subheading">{subheading}</h2>
	<a
		href={`https://github.com/hnrq/draggable/tree/main/examples/src/content/${
			child ? `${section}/${id}` : id
		}`}
		class="link link--underlined"
		title="See this code example">View code on GitHub</a
	>
</header>

<style lang="scss">
	@use 'styles';
</style>
