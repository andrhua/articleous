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
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1em;
		align-items: center;
		--margin: 0.8em;
		margin: var(--margin);
		width: calc(100% - 2 * var(--margin));
	}

	a { 
		font: 1.85em 'Playfair Display';
		text-transform: uppercase;
		text-decoration: none;
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

	.nav-content {
		display: flex;
		justify-items: center;
		align-items: center;
	}

	.nav-content > div {
		flex: 1;
	}

	.img-wrap {
		display: flex;
		justify-content: end;
	}
</style>

<nav>
	<div class='nav-content'>
		<div >
			<a href='/home'>articleous</a>
		</div>
		{#if segment === "me"}
			<label>{$session.user.username}</label>
		{/if}
		<div class='img-wrap'>
			<img src={$session.user.avatar}
				alt='avatar'
				on:click={handleClick}/>
		</div>
	</div>
	<div class='line'></div>
</nav>

