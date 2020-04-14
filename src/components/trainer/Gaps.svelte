<script>
	import { onMount } from 'svelte';
	import { answer, focusId, filled } from '../../stores/trainer.js';	
	import { fly } from 'svelte/transition';


	const articles = ['-', 'a', 'an', 'the'];

	class Gap {
		constructor() {
			this.text = ' ';
			this.style = 'gap';
		}
	}

	function onExerciseChange(value) {
		newExercise = false;
		setTimeout(() => {
			currentExerciseText = value;
			createGaps();
		}, outParams.duration);
	}

	function createGaps() {
		fragments = currentExerciseText.split('%_%');
		gaps = new Array(fragments.length - 1);
		userAnswers = new Array(gaps.length);
		for (let i = 0; i < gaps.length; i++) gaps[i] = new Gap();		
		focusId.reset(fragments.length - 2);
		answer.set();
		filled.set(false);
		if (gaps[$focusId]) gaps[$focusId].style = 'focused';
		newExercise = true;
	}

	function setFocusId(id) {
		if (state === 1) return;
		gaps[$focusId].style = 'gap';
		focusId.set(id);
		gaps[$focusId].style = 'focused';
		answer.set();
	}

	function fillGap() {
		userAnswers[$focusId] = $answer;
		gaps[$focusId].text = titleCase($focusId, articles[$answer]);
		setFocusId($focusId + 1);
		filled.set(isGapsFilled());	
	}

	function handleKeydown (event) {
		switch (event.keyCode) {
			case 37: case 72: setFocusId($focusId - 1); break; // left
			case 39: case 76: setFocusId($focusId + 1); break; // right
		}
	};

	function isGapsFilled() {
		for (const ans of userAnswers) if (ans === undefined) return false;	
		return true;
	}

	function titleCase(i, text) {
		return fragments[i] === '' && i === 0 ? text.charAt(0).toUpperCase() + text.slice(1) : text;
	}

	export function paintFeedback(feedback) {
		for (let i = 0; i < feedback.length; i++) 
			gaps[i].style = feedback[i] ? 'correct' : 'incorrect';
	}	

	export let state;
	export let userAnswers = [];
	export let currentExerciseText;
	let gaps;
	let fragments;
	let newExercise = true;

	const inParams = { duration: 150, x: 50 };
	const outParams = { duration: 150, x: -50 };

	$: onExerciseChange(currentExerciseText);

	$: if ($answer !== undefined) {
		fillGap();
	}	
</script>

<style>
	#gaps {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	#text {
		font-size: 1.4em;
		width: 65%;
	}

	span {
		text-align: center;
		display: inline-block;
		width: 2em;
		white-space: pre;
	}

	.focused, .gap, .correct, .incorrect {
		border-radius: 8px;
		padding: 2px 4px;
		margin-bottom: 1px;
		border: solid 1px #0000;
	}

	.focused {
		animation: fadeinout 2.6s infinite linear;
		background-color: var(--pearl);
	}

	@keyframes fadeinout{
		from, to {opacity: 1;}
		50% {opacity: 0.4;}	
	}

	.gap {
		color: var(--ultramarine-blue);
		border: solid 1px var(--pearl);
	}

	.correct {
		color: var(--spruce-green);
	}

	.incorrect {
		color: #ef5350;
		text-decoration: underline;
	}
</style>

<svelte:window on:keydown={handleKeydown}/>

<div id='gaps'>
	{#if newExercise}
		<div id='text' 
			in:fly|local={inParams}
			out:fly|local={outParams}>
			{#each fragments as fragment, i}
				{fragment}
				{#if i < fragments.length - 1}
					<span	on:click={() => setFocusId(i)} 
						id={i} 
						class={gaps[i].style}>{gaps[i].text}</span> 
				{/if}
			{/each}
		</div>
	{/if}
</div>
