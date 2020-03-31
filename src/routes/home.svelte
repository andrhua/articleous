<script context='module'>	
	import { user } from '../stores/user.js';


	export async function preload(page, session) {
		user.set(session.user);
	}
</script>

<script>
	import { goto } from '@sapper/app';
	import { blur, fly } from 'svelte/transition';
	import Nav from '../components/Nav.svelte';


	const links = [
		{endpoint: '/theory', name: 'Theory', desc: 'Learn more about articles in English', icon: 'books'},
		{endpoint: '/exercise', name: 'Exercise', desc: 'Test yourself!', icon: 'dumbbell'},
		{endpoint: '/u', name: 'Progress', desc: 'Track your most common mistakes', icon: 'improvement'}
	];

	function handleClick(event) {
		const endpoint = event.currentTarget.id;
		goto(endpoint);
	}	

</script>

<style>
main {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

#menu {
	display: flex;
	justify-content: center;
}

.floating-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 25%;
	border-radius: 16px;
	margin: 0.5em;
	padding: 20px;
}

img {
	width: 78px;
	padding: 1.3em 0;
	transition: all 0.2s;
}

.title {
	font: 1.4em 'Playfair Display';
	color: var(--near-black);
	flex: 1;
}

.description {
	font: 1.1em 'Oxygen Light';
	color: #9D9EA1;
	flex: 1;
	width: 80%;
	text-align: center;
}
</style>

<main>
	<Nav />
	<div style='display: flex;'>
	<div id='menu'>
		{#each links as {endpoint, name, desc, icon}, i}
		<div on:click={handleClick} id={endpoint} class='floating-button'>
			<img src={`icons/${icon}.svg`}>
			<div class='title'>{name}</div>
			<div class='description'>{desc}</div>
		</div>
		{#if i < links.length - 1}
		<div class='line'></div>
		{/if}
		{/each}
	</div>
	</div>
	<div style='flex: 1'></div>
</main>
