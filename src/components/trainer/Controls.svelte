<script>
	import { answer, focusId, State } from '../../stores/trainer.js';
	import { fly, blur } from 'svelte/transition';


	const buttons = ['zero', 'a', 'an', 'the'];
	const shortcuts = [0, 0, 1, 0];

	function underline(text, i) {
		return text.slice(0, i) + '<u>' + text[i] + '</u>' + text.slice(i + 1);
	}

	function setAnswer(id) {
		if (state === $State.edit) answer.set(Number(id));
	}

	function handleKeydown(event) {
		let id = -1;
		switch (event.keyCode) {
			case 65: id = 1; break; // a
			case 78: id = 2; break; // an
			case 84: id = 3; break; // the
			case 90: id = 0; break; // zero
		};
		if (id >= 0) {
			setAnswer(id);
		}
	};

	export let state;
	const inParams = { delay: 150, duration: 150, x: 50 };
	const outParams = { duration: 150 };
</script>

<style>
	#controls {
		align-self: center;
		display: flex;
		flex-direction: column;
	}

	.floating-button {
		font: 0.8em 'JetBrains Mono';
		padding: 10px 20px;
		margin: 4px 0;
	}
</style>

<svelte:window on:keydown={handleKeydown}/>

<div id='controls' >	
	{#if state === $State.edit}
			{#each buttons as name, i}
				<button class='floating-button'
					id={i} 
					on:click={(event) => setAnswer(event.currentTarget.id)}
					in:fly={inParams} 
					out:blur={outParams}>
					{@html underline(name, shortcuts[i])}
				</button>
			{/each}
	{/if}
</div>
