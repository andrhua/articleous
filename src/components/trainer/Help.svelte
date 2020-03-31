<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';


	function handleKeydown(event) {
		switch (event.keyCode) {
			case 191: active = !active; break;
			case 27: active = false; break;
		}
	}

	function openHelp() {
		active = true;
	}

	function closeHelp() {
		active = false;
	}

	export let active = false;
	let innerWidth;
	const windowInDuration = 370;
	const windowOutDuration = 250;
	const windowIn = {
		delay: 100,
		easing: cubicOut,
		duration: windowInDuration,
		opacity: 1 
	};
	const windowOut = {
		easing: cubicIn,
		duration: windowOutDuration,
		opacity: 1
	};
	const pullInDuration = 200;
	const pullOutDuration = 250;
	const pullIn = {
		delay: 100,
		easing: cubicIn,
		duration: pullInDuration,
		opacity: 1,
		x: -54,
	};
	const pullOut = {
		easing: cubicOut,
		duration: pullOutDuration,
		opacity: 1,
		x: -54,
	};
	
	onMount(() => {
		windowIn.x = windowOut.x = -innerWidth * 0.15;
	});

	const help = [
		{ key: 'qm', desc: 'call this help'},
		{ key: 'a', desc: 'a'},
		{ key: 'n', desc: 'an'},
		{ key: 't', desc: 'the'},
		{ key: 'z', desc: 'zero'},
		{ key: 'h l', desc: 'movement'},
	];
</script>

<style>
.window {
	--height: 35%;
	width: 13%;
	height: var(--height);
	z-index: 1;
	position: fixed;
	left: 0;
	top: calc((100% - var(--height)) / 2);
	border-radius: 0 16px 16px 0;
	box-shadow: 2px 2px 8px var(--faint-white);
	background-color: var(--off-white);
	
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}	

.window img {
	width: 16px;
}

.pull {
	--size: 46px;
	z-index: 1;
	width: var(--size);
	height: var(--size);
	position: fixed;
	left: 6px;
	top: calc((100% - var(--size)) / 2);
	border-radius: 100%;
	box-shadow: 2px 2px 8px var(--faint-white);
	background-color: var(--off-white);

	display: flex;
	justify-content: center;
	align-items: center;
}


.pull img {
	width: calc(0.8 * var(--size));
	transition: all 0.2s;
}

.pull:hover {
	transform: scale(0.96);
	transition: all 0.2s;
}

.content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

.element {
	font: 1.2em 'Oxygen Light';
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.key {
	border-radius: 4px;
	padding: 2px 4px;
	margin: 2px;
	border: 1px solid var(--faint-black);
}


.upper {
	width: 100%;
	display: flex;
	justify-content: center;
}

.close {
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
}

button {
	border: 0;
	background-color: #0000;	
}
</style>

<svelte:window bind:innerWidth on:keydown={handleKeydown} />

{#if active}
<div class='window' in:fly|local={windowIn} out:fly|local={windowOut}>
	<div class='upper'>
		<div style='flex: 1'></div>
		<h2 style='flex: 1'>Mappings</h2>
		<div class='close'>
			<button on:click={closeHelp}>
				<img style='width: 20px' src='icons/cancel.svg' alt='close'>
			</button>
		</div>
	</div>
	<div class='content'>
		{#each help as {key, desc}}
		<div class='element'>
			{#each key.split(' ') as subkey}
			<div class='key'>
				<img src={`icons/keys/${subkey}.svg`} alt={subkey}>
			</div>
			{/each} {desc}
		</div>
		{/each}
	</div>
</div>
{:else}
<div class='pull' on:click={openHelp} in:fly|local={pullIn} out:fly|local={pullOut}>
	<img src='icons/lifebuoy.svg' alt='lifebuoy'>
</div>
{/if}

