<script>
	import { goto } from '@sapper/app';

	const name = 'articleous';	
</script>

<style>
	main {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 0.7fr 0.3fr;
	}

	#left {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: 0.7fr 0.3fr;
		grid-template-columns: 1fr;
		justify-items: center;
		align-items: center;
		color: var(--near-black);
	}

	#right {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 7em;
		background-color: var(--ultramarine-blue);
	}

	.circle {
		position: absolute;
		--size: 1200px;
		width: var(--size);
		height: var(--size);
		top: -600px;
		right: -500px;
		margin-left: 100px;
		border-radius: 100%;
		background-color: var(--mint);
		border: 0;
	}

	h1 {
		text-transform: uppercase;
		font-size: 5em;
		font-family: 'Playfair Display';
	}

	.provider {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--off-white);
		--size: 50px;
		width: var(--size);
		height: var(--size);
	}

	.sir { 
		position: absolute;
		top: 100px;
		right: 120px;
		width: 300px;
		margin: 8px;
		opacity: 0%;
		transition: opacity 1s;
	}

	.sir:hover {
		opacity: 100%;
		transition: opacity 6s;
	}
	
	.github {
		width: 100%;
		height: 48px;
		margin: 8px;
	}
</style>

<svelte:head>
	<title>{name}</title>
</svelte:head>


<div class='circle'></div>
<img class='sir' src='sergay.jpg', alt='backpack dude'>
<main>
	<div id='left'>
		<h1>{name}</h1>
		<div id='ezekiel'>there goes some selling text</div>
	</div>
	<div id='right'>
		<div class='floating-button provider' on:click={() => goto('/auth/github')} >
			<img src='icons/github.svg' alt='Github logo' class='github'>
		</div>
	</div>
</main>
