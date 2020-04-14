<script>
	import { stores, goto } from '@sapper/app';
	import { blur, fly } from 'svelte/transition';
	import Nav from '../components/Nav.svelte';


	const { session } = stores();
	const links = [
		{endpoint: '/theory', name: 'Theory', desc: 'Learn more about articles in English', icon: 'books'},
		{endpoint: '/practice', name: 'Practice', desc: 'Test yourself!', icon: 'dumbbell'},
		{endpoint: '/me', name: 'Progress', desc: 'Track your most common mistakes', icon: 'improvement'}
	];

	function handleClick(event) {
		const endpoint = event.currentTarget.id;
		if (endpoint === '/me') {
			session.update(data => Object.assign(data, {'section': 'stats'}));
		}
		goto(endpoint);
	}	

</script>

<style>
main {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

#menu {
	display: flex;
	justify-content: center;
	align-items: center;
}

.floating-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	--size: 230px;
	width: var(--size);
	height: var(--size);
	border-radius: 16px;
	margin: 0.5em;
	padding: 20px;
	flex: 1;
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
	<Nav/>
	<div id='menu'>
		{#each links as {endpoint, name, desc, icon}, i}
		<div on:click={handleClick} id={endpoint} class='floating-button'>
			<img src={`icons/${icon}.svg`}>
			<div class='title'>{name}</div>
			<div class='description'>{desc}</div>
		</div>
		{/each}
	</div>
</main>
