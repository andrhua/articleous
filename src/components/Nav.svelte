<script>
	import { stores, goto } from '@sapper/app';


	function handleClick(event) {
		session.update(data => Object.assign(data, {'section': 'acc'}));
		goto('/me');
	}

	export let segment;
	const { session } = stores();
</script>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		font-weight: 300;
		display: flex;
		justify-content: space-between;
		align-items: center;
		--margin: 0.8em;
		width: calc(100% - 2 * var(--margin));
		margin: var(--margin);
	}

	a { 
		font: 1.85em 'Playfair Display';
		text-transform: uppercase;
		text-decoration: none;
		flex: 1;
	}

	label {
		font: 1.3em 'Oxygen Light';
	}

	img { 
		--size: 48px;
		width: var(--size);
		height: var(--size);
		border-radius: 100%;
	}

	img:hover {
		transform: scale(0.96);
		transition: all 0.2s;
	}

	div {
		flex: 1;
		display: flex;
		justify-content: end;
		align-items: center;
	}
</style>

<nav>
	<a href='/home'>articleous</a>
	{#if segment === "me"}
		<label>myuniqueusernamethatalsoisreallylong</label>
	{/if}
	<div>
		<img src='icons/test-account.svg'
			alt='avatar'
			on:click={handleClick}/>
	</div>
</nav>
<div class='line'></div>

