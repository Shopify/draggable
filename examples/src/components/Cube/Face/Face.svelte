<script lang="ts" context="module">
	export type Side = 'left' | 'right' | 'top';
	export type Piece =
		| 'agt'
		| 'bowl'
		| 'cap'
		| 'drie'
		| 'elbow'
		| 'fork'
		| 'gee'
		| 'lanes'
		| 'legs'
		| 'line'
		| 'loop'
		| 'snake'
		| 'split'
		| 'vier';

	export interface Face {
		piece?: Piece;
		rotation?: 90 | 180 | 270;
		draggable?: boolean;
	}
</script>

<script lang="ts">
	export let side: Side;
	export let piece: Piece | undefined = undefined;
	export let rotation: 90 | 180 | 270 | undefined = undefined;
	export let draggable: boolean = false;
</script>

<div
	data-face={side}
	class="face__wrapper"
	class:draggable-source={draggable}
	tabindex={piece !== undefined ? 0 : undefined}
>
	<div class="face__pop">
		<div
			class="svg-container face"
			class:face--top={side === 'top'}
			class:face--left={side === 'left'}
			class:face--right={side === 'right'}
			class:svg--rotate-90={rotation === 90}
			class:svg--rotate-180={rotation === 180}
			class:svg--rotate-270={rotation === 270}
		>
			<svg class="svg" viewBox="0 0 80 80" focusable="false">
				{#if piece === 'agt'}
					<path
						fill="none"
						stroke-width="8"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						d="M39.622 39.391c-19.272 0-19.272 27.067.378 27.067s19.65-27.067.372-27.067c-18.625 0-19.208-25.849-.375-25.849 18.75 0 18.75 25.849.003 25.849"
					/>
				{:else if piece === 'bowl'}
					<path
						d="M32.5 60h15C59.907 60 70 49.907 70 37.5V0H60v35c0 8.271-6.729 15-15 15H35c-8.271 0-15-6.729-15-15V0H10v37.5C10 49.907 20.094 60 32.5 60z"
					/>
				{:else if piece === 'cap'}
					<path d="M40 45a5 5 0 005-5V0H35v40a5 5 0 005 5z" />
				{:else if piece === 'drie'}
					<path
						fill="none"
						stroke-width="8"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						d="M26.132 14.217h29.326L35.545 38.049c35.316.793 17.232 44.126-11.002 20.892"
					/>
				{:else if piece === 'elbow'}
					<path d="M60 35c-8.3 0-15-6.7-15-15V0H35v20c0 13.8 11.2 25 25 25h20V35H60z" />
				{:else if piece === 'fork'}
					<path
						d="M35 29.575V80h10V29.575C59.169 27.187 70 14.838 70 0H60c0 11.046-8.954 20-20 20S20 11.046 20 0H10c0 14.838 10.831 27.187 25 29.575z"
					/>
				{:else if piece === 'gee'}
					<path
						d="M60 39.973H40a5 5 0 100 10h14.144c-2.063 5.82-7.625 10-14.144 10-8.271 0-15-6.729-15-15s6.729-15 15-15a5 5 0 005-5V0H35v20.475C23.604 22.798 15 32.9 15 44.973c0 13.785 11.215 25 25 25s25-11.215 25-25a5 5 0 00-5-5z"
					/>
				{:else if piece === 'lanes'}
					<path d="M10 0h10v80H10zm50 0h10v80H60z" />
				{:else if piece === 'legs'}
					<path
						d="M63.18 58.705L45 31.006V0H35v31.006L16.82 58.705a5 5 0 108.36 5.487L40 41.612l14.82 22.58a4.996 4.996 0 006.923 1.437 5 5 0 001.437-6.924z"
					/>
				{:else if piece === 'line'}
					<path d="M35 0h10v80H35z" />
				{:else if piece === 'loop'}
					<path
						d="M45 80V69.575C59.169 67.187 70 54.838 70 40S59.169 12.813 45 10.425V0H35v10.425C20.831 12.813 10 25.162 10 40s10.831 27.187 25 29.575V80h10zM20 40c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z"
					/>
				{:else if piece === 'snake'}
					<path
						d="M54.031 14.5c-8.016-.002-9 .332-9-1.006V0h-10v14.498c0 5.524 4.478 10.002 10.002 10.002h8.998c5.995 0 6.588 6.283 4.179 8.931C56.31 35.517 56.345 35 26.031 35c-20.736 0-20.676 30.5 0 30.5l8 .002c1.377 0 1 .402 1 14.498h10V65.502c0-5.524-4.478-10.002-10.002-10.002h-8.998c-5.279 0-5.547-4.345-5.547-5.216 0-.882.268-5.284 5.547-5.284h28c20.632 0 20.614-30.5 0-30.5z"
					/>
				{:else if piece === 'split'}
					<path d="M35 0v35H0v10h80V35H45V0z" />
				{:else if piece === 'vier'}
					<path
						fill="none"
						stroke-width="8"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						d="M43.682 13.548L22.75 56.311h34.5-10v-13.5 23.64"
					/>
				{/if}
			</svg>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'styles';
</style>
