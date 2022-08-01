<script lang="ts">
	import classNames from 'classnames';
	import type Position from '@src/common/types/Position';
	import { flipSign } from '@src/utils';

	export let level: 'top' | 'middle' | 'bottom';
	export let label: string = '';
	export let draggable: boolean = false;
	export let classes: string | string[] | undefined;
	export let threshold: { min: number; max: number };
	export let position: Position;

	const scaleFactor = 0.725;
	const translateFactors = {
		bottom: 0.075,
		middle: 0.5,
		top: 0.975
	};
	let translation: Position = { x: 0, y: 0 };
	let shadowOffset: Position = { x: 0, y: 0 };
	let scaling: Position = { x: 1, y: 1 };

	const calculatePlateScale = (value: number, max: number, factor: number) => {
		const step1 = Math.abs(value) / max;
		const step2 = step1 - step1 * factor;

		return 1 - step2;
	};

	$: {
		scaling = {
			x: calculatePlateScale(position.x, threshold.max, scaleFactor),
			y: calculatePlateScale(position.y, threshold.max, scaleFactor)
		};

		shadowOffset = { x: position.x / 2, y: position.y / 2 };

		translation = {
			x: flipSign(position.x * 2) * translateFactors[level],
			y: flipSign(position.y * 2) * translateFactors[level]
		};
	}
</script>

<span
	class={classNames('plate', classes)}
	class:plate--top={level === 'top'}
	class:plate--middle={level === 'middle'}
	class:plate--bottom={level === 'bottom'}
	class:plate--draggable={draggable}
	style={`transform: translate3d(${translation.x}, ${translation.y}, 0) scale(${scaling.x}, ${scaling.y});`}
>
	<div
		class="plate__shadow-wrapper"
		style={`transform: transform: translate3d(${shadowOffset.x}, ${shadowOffset.y}, 0);`}
	>
		<div class="plate__shadow" />
	</div>

	<div class="plate__content">
		<h2 class="heading heading--1 text-no-select">{label}</h2>
	</div>
</span>

<style lang="scss">
	@use 'styles';
</style>
