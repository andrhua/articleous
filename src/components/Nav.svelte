<script>
	import { goto } from '@sapper/app';
	import { user } from '../stores/user.js';
	import { fly, fade } from 'svelte/transition';


	function handleClick(event) {
		if (dropdown && event.target.id !== 'dropdown') closeDropdown();
	}

	function handleKeydown(event) {
		if (event.keyCode === 27) closeDropdown();
	}

	function logout() {
		goto('/logout');
	}

	function closeDropdown() {
		dropdown = false;
	}

	function toggleDropdown(event) {
		dropdown = !dropdown;
		event.stopImmediatePropagation();
	}

	export let segment;
	const params = {duration: 250};
	let dropdown = false;
</script>

<style>
	nav {
		font-weight: 300;
		display: flex;
		justify-content: space-between;
		width: 100%;
		flex: 1;
	}

	a { 
		font: 1.85em 'Playfair Display';
		text-transform: uppercase;
		margin: 1em;
		text-decoration: none;
	}

	img { 
		--size: 48px;
		width: var(--size);
		height: var(--size);
		border-radius: 100%;
		margin: 1em;
		flex: 1;
		transition: all 0.2s;
	}

	img:hover {
		transform: scale(0.96);
		transition: all 0.2s;
	}

	.dropdown {
		z-index: 1;
		position: fixed;
		top: 0.8em;
		right: 0.8em;
		min-width: 10%;
		height: 14%;
		border-radius: 10px;
		box-shadow: 0px 0px 10px 3px #bbb;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		font: 1.1em 'Oxygen Light';
	}

	span {
		margin: 0 0.8em;
	}

	label {
		font: 1em 'JetBrains Mono';
		display: inline-block;
		margin: 0 0.8em;
	}


	.text-button {
		align-self: center;
	}
</style>

<svelte:window on:click={handleClick} on:keydown={handleKeydown}/>

<nav>
	<a href='/home'>articleous</a>
	{#if dropdown}
	<div id='dropdown' class='dropdown'
	     in:fly|local={{duration: 250, x: 100 }}
	     out:fly|local={{duration: 250, x: 100 }}>
		<span>Logged in as</span>
		<label>reallylongusername</label>
		<button class='text-button' on:click={logout}>Logout</button>
	</div>
	{:else}
	<div id='wrap'>
		<img src='icons/test-account.svg'
		     alt='avatar'
		     in:fade|local={{duration: 200}}
		     out:fade|local={{duration: 200}}
		     on:click={toggleDropdown}/>
	</div>
	{/if}
</nav>
