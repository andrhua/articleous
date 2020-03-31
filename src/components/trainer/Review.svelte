<script>
	import { createEventDispatcher } from 'svelte';
	import { State, filled } from '../../stores/trainer.js';
	import { blur } from 'svelte/transition';


	const dispatch = createEventDispatcher();	
	
	function review() {
		dispatch('review');
	}

	function next() {
		filled.set(false);
		dispatch('next');
	}

	function handleKeydown(event) {
		if (event.keyCode !== 13) return;
		switch (state) {
			case $State.edit: if ($filled) review();
				break;
			case $State.review: next(); break;
		}
	}

	function onStateChange(state) {
		switch (state) {
			case $State.edit: reviewActive = false; break;
			case $State.review: editActive = false; break;
		}
	}	
	
	export let state;
	const delay = 150;
	const blurParams = { duration: 150 };
	let editActive = true;
	let reviewActive;

	$: onStateChange(state);
</script>

<style>
	#review {
		width: 50%;
		flex: 0.15;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.text-button:disabled {
		background-color: #0000;
		border-color: var(--faint-white);
		color: var(--faint-white);
		transform: none;
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: var(--faint-black);
	}
</style>

<svelte:window on:keydown={handleKeydown}></svelte:window>

<div class='line'></div>
<div id='review'>
{#if editActive}
	<button class='text-button'
		transition:blur|local={blurParams}
		on:outroend={() => reviewActive = true}
     		disabled={!$filled} 
		on:click={review}>Check</button>
{:else if reviewActive}
	<button class='text-button'
		transition:blur|local={blurParams} 
		on:outroend={() => editActive = true}
		on:click={next}>Next</button>
{/if}
</div>
