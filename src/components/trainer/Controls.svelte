<script>
	import { answer, focusId, State } from '../../stores/trainer.js';
	import { fly, blur } from 'svelte/transition';


	const buttons = ['zero', 'a', 'an', 'the'];
	const shortcuts = [0, 0, 1, 0];
	
	function underline(text, i) {
		return text.slice(0, i) + '<u>' + text[i] + '</u>' + text.slice(i + 1);
	}

	function setAnswer(id) {
		if (state === $State.edit) answer.set(id);
	}

	function handleKeydown(event) {
		let id = -1;
		switch (event.keyCode) {
			case 65: id = 1; break; // a
			case 78: id = 2; break; // an
			case 84: id = 3; break; // the
			case 90: id = 0; break; // zero

			// case 40: case 74: id += 1; break;
			// case 35: case 78: id -= 1; break;
				
		};
		if (id >= 0) {
			setAnswer(id);
		}
	};

	export let state;
	const inParams = { delay: 200, duration: 300, x: 100 };
	const outParams = { duration: 250 };
</script>

<style>
#controls {
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

{#if state === $State.edit}
<div id='controls' in:fly|local={inParams} out:blur|local={outParams}>	
	{#each buttons as name, i}
	<button class='floating-button' id={i} on:click={(event) => setAnswer(event.currentTarget.id)}>
		{@html underline(name, shortcuts[i])}
	</button>
	{/each}
</div>
{/if}
