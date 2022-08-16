<script lang="ts">
	import classNames from 'classnames';
	import type Page from '@src/common/types/Page';
	import { page } from '$app/stores';

	export let pages: Page[];
	export let linkClasses: string | string[] | undefined = undefined;
</script>

<nav class="navigation">
	{#each pages as { section, links }}
		<ul class="navigation__list">
			<li class="navigation__item">
				<span class="navigation__heading">{section}</span>
			</li>
			{#each links as { title, href }}
				<li class="navigation__item">
					{#if href}
						<a
							class={classNames('navigation__link', linkClasses)}
							class:navigation__link--current={href === $page.url.pathname}
							title={`See example: ${href}`}
							{href}
						>
							{title}
						</a>
					{:else}
						<span class={classNames('navigation__link', linkClasses)}>
							{title}
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	{/each}
</nav>

<style lang="scss">
	@use 'styles';
</style>
