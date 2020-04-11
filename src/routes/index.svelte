<script>
	import { goto } from '@sapper/app';

	function handleClick(event) {
		goto('/auth/github');
	}

	const name = 'articleous';	
</script>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
	}

	#left, #right {
		transition: all 0.2s;
	}

	#left {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 4;
		color: var(--near-black);
	}

	#right {
		background-color: var(--ultramarine-blue);
		flex: 2;
		justify-content: center;
		align-items: flex-end;
		display: flex;
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

	#features {
		font: 1.7em 'Playfair Display';
		position: absolute;
		top: 100px;
		right: 120px;
		color: var(--near-black);
		width: 300px;
	}

	#left-wrap {
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 50%;
	}

	h1 {
		text-transform: uppercase;
		font-size: 5em;
		font-family: 'Playfair Display';
		padding-bottom: 1em;
	}

	#ezekiel {
		font: 1.2em 'Oxygen Light';
	}	

	#provider {
		display: flex;
		flex-direction: column;
		justify-content: end;
		align-items: center;
		font: 0.95em 'JetBrains Mono';
		border-radius: 16px;
		background-color: var(--off-white);
		--size: 100px;
		width: var(--size);
		height: var(--size);
		margin-bottom: 4em;
		transition: all 0.2s;
	}

	#provider:hover {
		transition: all 0.2s;
		box-shadow: 1px 1px 6px 1px var(--mint);
	}

	#provider:active {
		transition: all 0.2s;
		transform: scale(0.98);
	}

	.sir { 
		width: 100%;
		height: 100%;
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


<main>
	<div class='circle'></div>
	<div id='features'><img class='sir' src='sergay.jpg', alt='backpack dude'></div>

	<div id='left'>
		<div id='left-wrap'>
			<h1>{name}</h1>
			<div id='ezekiel'>
				я тебя люблю
			</div>
		</div>
	</div>
	<div id='right'>
		<div id='provider' on:click={handleClick} >
			Log in
			<img src='icons/github.svg' alt='Github logo' class='github'>
		</div>
	</div>
</main>
