<script context='module'>
	export async function preload(page, session) {
		const init = { credentials: 'include' };
		const TRAINING_LENGTH = await this.fetch('/exercise/training?q=length', init).then(v => v.json());
		const exercises = await this.fetch('/exercise/training', 
		Object.assign({}, init, {
			method: 'post',
			body: JSON.stringify({uid: 0}),
			headers: {'Content-Type': 'application/json'}
		})).then(v => v.json());
		return { TRAINING_LENGTH, exercises };
	}
</script>

<script>
	import { goto } from '@sapper/app';
	import { onMount } from 'svelte';
	import Modal from '../../components/trainer/Modal.svelte';
	import Progress from '../../components/trainer/Progress.svelte';
	import Help from '../../components/trainer/Help.svelte';
	import Gaps from '../../components/trainer/Gaps.svelte';
	import Controls from '../../components/trainer/Controls.svelte';
	import Review from '../../components/trainer/Review.svelte';
	import { exerciseId, State } from '../../stores/trainer.js';
	

	function* exerciseGenerator() {
		for (const [id, exercise] of exercises) { 
			exerciseId.set(id);
			yield exercise;
		}
		return null;
	}

	async function reviewAnswers() {
		state = $State.review;	
		const feedback = await fetch(`/exercise/answer_${$exerciseId}`, {
			method: 'post',
			body: JSON.stringify({studentAnswers: answers}),
			headers: {'Content-Type': 'application/json'}
		}).then(v => v.json());
		gaps.paintFeedback(feedback);
		exerciseCount++;
	}


	function nextExercise() {
		let tmp = gen.next().value;
		if (tmp === null) {
			state = $State.stats;
		} else {
			sentence = tmp;
			state = $State.edit;
		}
	}

	function callQuitModal() { 
		modal = true;
	}

	export let TRAINING_LENGTH;
	export let exercises;
	export let sentence;
	let answers;
	let modal = false;
	let abandon = false;
	let help = false;
	let state;
	let gaps;
	let exerciseCount = -1;
	let gen = exerciseGenerator(); 
	nextExercise();

	$: if (abandon) {
		goto('/home');
	}
</script>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
	}

	#upper {
		display: flex;
		justify-content: center;
		width: 50%;
		flex: 0.1;
		margin: 2em 0;
	}

	#quit {
		flex: 1;
		display: flex;
		align-items: center;
	}

	#quit img {
		width: 28px;
	}

	.icon {
		background-color: #0000;
		border: 0;
		color: var(--near-black);
		transition: transform 0.2s;
	}

	.icon:hover {
		transform: scale(0.95);
		transition: transform 0.2s;
	}

	#gaps {
		flex: 0.6;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#controls {
		flex: 0.25;
	}

	#right { 
		flex: 1;
	}

</style>

<Modal bind:active={modal} bind:result={abandon}/>
<Help/>

<main>
{#if state === $State.stats}
some stats
{:else}
	<div id='upper'>
		<div id='quit'>
			<button on:click={callQuitModal} class='icon'>
				<img src='icons/delete.svg' alt='close'>
			</button>
		</div>
		<Progress max={TRAINING_LENGTH} value={exerciseCount}/>
		<div id='right'></div>
	</div>
	<div id='gaps'>
		<Gaps bind:this={gaps} {state} {sentence} bind:answers/>
	</div>
	<div id='controls'>
		<Controls {state}/>
	</div>
	<Review {state} on:review={reviewAnswers} on:next={nextExercise}/>
{/if}
</main>
