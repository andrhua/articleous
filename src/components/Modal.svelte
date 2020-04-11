<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';


	function handleClick(event) {
		if (event.target.id == 'background') {
			negative();
		}
	}

	function positive() {
		result = true;
	}

	function negative() {
		active = false;
	}

	function handleKeydown(event) {
		if (active) event.stopImmediatePropagation();
		switch (event.keyCode) {
			case 27:
				active = !active;
				break;
			case 13:
				positive();
				break;
		}
	}

	export let active;
	export let result;
	export let labelText;
	let innerHeight;

	const inDuration = 350;
	const outDuration = 250;

	const inParams = {
		easing: cubicOut,
		duration: inDuration,
		opacity: 1
	};

	const outParams = {
		easing: cubicIn,
		duration: outDuration,
		opacity: 1
	};

	onMount(() => {
		inParams.y = outParams.y = -innerHeight * 0.13;
	});
</script>

<style>
	#background {
		width: 100%;
		height: 100%;
		display: block;
		position: fixed;
		z-index: 2;
		left: 0;
		top: 0;
		background-color: #000a;
	}

	#modal {
		--width: 40%;
		position: fixed;
		z-index: 3;
		top: 0;
		left: calc((100% - var(--width)) / 2);
		width: var(--width);
		height: 13%;
		border-radius: 0 0 16px 16px;
		box-shadow: 0 0 10px var(--faint-black);
		background-color: var(--snow-white);

		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: column;
	}	

	label {
		font: 1.4em 'Oxygen Light';
		color: var(--near-black);
	}

	.text-button {
		margin: 0 4px;
	}
</style>

<svelte:window on:click={handleClick} on:keydown={handleKeydown} bind:innerHeight/>

{#if active}
	<div id='background' in:fade|local={{duration:inDuration - 50}} out:fade|local={{duration:270}}></div>
	<div id='modal' in:fly|local={inParams} out:fly|local={outParams}>
		<label>{labelText}</label>
		<div class='buttons'>
			<button class='text-button' on:click={positive}>Yes</button>
			<button class='text-button' on:click={negative}>No</button>
		</div>	
	</div>
{/if}
