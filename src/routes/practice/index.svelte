<script context='module'>
	export async function preload(page, session) {
		// const { id } = session.user;
		const id = 0;
		const exercises = await this.fetch(`/practice/exercises?id=${id}`, {credentials: 'include'}).then(v => v.json());
		
		function* gen() {
			for (const [id, exercise] of exercises) {
			 yield { id, exercise };
			}
		}

		return { practiceLength: exercises.length,
						 exercises: gen()}
	}
</script>

<script>
	import { goto } from '@sapper/app';
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import Modal from '../../components/Modal.svelte';
	import Help from '../../components/trainer/Help.svelte';
	import Header from '../../components/trainer/Header.svelte';
	import Gaps from '../../components/trainer/Gaps.svelte';
	import Controls from '../../components/trainer/Controls.svelte';
	import Footer from '../../components/trainer/Footer.svelte';
	import { State } from '../../stores/trainer.js';


	async function submitAnswers() {
		state = $State.review;	
		const feedback = await fetch('/practice/verify', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			credentials: 'include',
			body: JSON.stringify({id: currentExerciseId, userAnswers}),
		}).then(v => v.json());
		gaps.paintFeedback(feedback);
		completedExercises++;
	}

	function nextExercise() {
		let { value, done }  = exercises.next();
		if (done) {
			state = $State.finish;
		} else {
			currentExerciseId = value.id;
			currentExerciseText = value.exercise;
			state = $State.edit;
		}
	}

	function spin(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = elasticOut(t);
				return `transform: scale(${eased}) rotate(${eased * 1080}deg);`
			}
		};
	}

	export let exercises;
	export let currentExerciseText;
	export let practiceLength;
	let currentExerciseId;
	let userAnswers;
	let modal = false;
	let abandon = false;
	let help = false;
	let state;
	let gaps;
	let completedExercises = 0;

	nextExercise();
	//state = $State.finish;

	$: if (abandon) {
		goto('/home');
	}
</script>

<style>
	main {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: 15% 45% 25% 15%;
		grid-template-columns: 1fr;
		justify-items: center;
	}

	.finish {
		grid-template-rows: 50% 35% 15%;
	}

	img {
		width: 500px;
		align-self: end;
	}

	div {
		font-size: 1.4em;
	}
</style>


<main class={state === $State.finish ? 'finish' : ''}>
	{#if state === $State.finish}
		<img in:spin={{duration: 8000}} src='puppy.jpg' alt='puppy hugging kitten'>
		<div>Training is finished!</div>
	{:else}
		<Modal labelText='Current training will be discarded. Proceed?' bind:active={modal} bind:result={abandon}/>
		<Help/>

		<Header {practiceLength} {completedExercises} on:quit={() => modal = true}/>
		<Gaps bind:this={gaps} {state} {currentExerciseText} bind:userAnswers/>
		<Controls {state}/>
	{/if}
	<Footer {state}
		on:submit={submitAnswers} 
		on:next={nextExercise}
		on:retry={() => location.reload()}
		on:finish={() => abandon = true}
	/>
</main>
