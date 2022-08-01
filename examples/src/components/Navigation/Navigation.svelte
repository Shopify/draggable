<script lang="ts">
	import classNames from 'classnames';
	import type Page from 'common/types/Page';

	export let pages: Page[];
	export let linkClasses: string | string[] | undefined = undefined;
</script>

<nav class="navigation">
	{#each pages as { subNav }}
		{#each subNav as { section, links }}
			<ul class="navigation__list">
				<li class="navigation__item">
					<span class="navigation__header">{section}</span>
				</li>
				{#each links as link}
					<li class="navigation__item">
						<a
							class={classNames('navigation__link', linkClasses)}
							href={link.includes('~') ? '' : link.toLowerCase().replace(' ', '-')}
							title={`See example: ${link}`}
						>
							{link.replace('~', '')}
						</a>
					</li>
				{/each}
			</ul>
		{/each}
	{/each}
</nav>

<style lang="scss">
	@use 'styles';
</style>
