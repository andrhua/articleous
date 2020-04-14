<script context='module'>
	export async function preload(page, session) {
		return { 
			stats: await this.fetch('/me/stats', {credentials: 'include'})
			.then(v => v.json())}
	}
</script>
<script>
	import { stores } from '@sapper/app';
	import { blur } from 'svelte/transition';
	import Nav from '../../components/Nav.svelte';
	import Chart from '../../components/Chart.svelte';
	import AccountPanel from '../../components/AccountPanel.svelte';


	const { page, session } = stores();
	export let section = $session.section || 'stats';
	export let stats;
	const blurParams = {
		duration: 250,
		amount: 4
	};

	function handleClick(event) {
		section = event.currentTarget.id;
	}
</script>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	nav {
		flex: 1;
	}

	ul {
		list-style-type: none;
	}

	li {
		padding: 0.5em;
		font-size: 1em;
		transition: font-size 0.2s;
	}
		
	button {
		text-transform: uppercase;
		font: 1.3em 'Playfair Display';
		background-color: #0000;
		border: 0;
	}

	.active {
		pointer-events: none;
		font-size: 1.9em;
		transition: font-size 0.2s;
	}

	main > div {
		position: absolute;
	}
</style>

<main>
	<Nav segment='me'/>
	<nav>
		<ul>
			<li><button 
					id='stats'
					class:active={section === 'stats'} 
					on:click={handleClick}>Stats</button></li>
			<li><button 
					id='acc'
					class:active={section === 'acc'} 
					on:click={handleClick}>Account</button></li>
		</ul>
	</nav>
	{#if section === 'stats'}
		<div transition:blur|local={blurParams}>
			<Chart {stats}/>
		</div>
	{:else if section === 'acc'}
		<div transition:blur|local={blurParams}>
			<AccountPanel/>
		</div>
	{/if}
	<div style='flex: 1'></div>
</main>
