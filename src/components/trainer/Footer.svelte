<script>
	import { createEventDispatcher } from 'svelte';
	import { State, filled } from '../../stores/trainer.js';
	import { blur } from 'svelte/transition';


	const dispatch = createEventDispatcher();	

	function next() {
		filled.set(false);
		dispatch('next');
	}

	function handleKeydown(event) {
		if (event.keyCode !== 13) return;
		switch (state) {
			case $State.edit: if ($filled) review(); break;
			case $State.review: next(); break;
		}
	}

	export let state;
	const blurParams = { duration: 250, amount: 4 };
</script>

<style>
	#footer {
		width: 100%;
		display: grid;
		grid-template-rows: 1px 1fr;
		grid-template-columns: 0.5fr 0.5fr;

		justify-items: center;
		align-items: center;
		position: relative;
	}

	.single {
		grid-column: span 2;
		position: absolute;
	}

	.text-button:disabled {
		background-color: #0000;
		border-color: var(--faint-white);
		color: var(--faint-white);
		transform: none;
	}

	.line {
		grid-column: span 2;
	}
</style>

<svelte:window on:keydown={handleKeydown}/>

<div id='footer'>
	<div class='line'></div>
	{#if state === $State.edit}
		<button class='text-button single'
			transition:blur|local={blurParams}
			disabled={!$filled} 
			on:click={() => dispatch('submit')}>Check</button>
	{:else if state === $State.review}
		<button class='text-button single'
			transition:blur|local={blurParams} 
			on:click={next}>Next</button>
	{:else if state === $State.finish}
		<button class='text-button' 
			transition:blur|local={blurParams}
			on:click={() => dispatch('retry')}>New training</button>
		<button class='text-button'
			transition:blur|local={blurParams}
			on:click={() => dispatch('finish')}>Back to menu</button>
	{/if}
</div>
