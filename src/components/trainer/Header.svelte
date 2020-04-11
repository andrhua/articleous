<script>
	import { createEventDispatcher } from 'svelte';
	import Progress from './Progress.svelte';


	const dispatch = createEventDispatcher();

	function quitTraining() {
		dispatch('quit');
	}

	export let practiceLength;
	export let completedExercises;
</script>

<style>
	#header {
		display: flex;
		justify-content: center;
		width: 50%;
		margin: 2em 0;
	}

	#quit {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.icon {
		background-color: #0000;
		border: 0;
		color: var(--near-black);
		transition: transform 0.2s;
	}

	.icon:hover {
		transform: scale(0.96);
		transition: transform 0.2s;
	}
</style>

<div id='header'>
	<div id='quit'>
		<button on:click={quitTraining} class='icon'>
			<img style='width: 28px' src='icons/delete.svg' alt='close'>
		</button>
	</div>
	<Progress max={practiceLength} value={completedExercises}/>
	<div style='flex: 1'></div>
</div>
