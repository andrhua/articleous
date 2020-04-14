<script>
	export let max;
	export let value;

	const foo = Array(max);
</script>

<style>
	#progress {
		flex: 1.2;
		display: flex;	
		align-items: center;
	}

	.circle {
		--circle-size: 8px;
		width: var(--circle-size);
		height: var(--circle-size);
		border-radius: 100%;
		border: 2px solid var(--faint-black);
	}

	.filled {
		background-color: var(--faint-black);
	}

	.interline {
		height: 1px;
		background-color: var(--faint-black);
		flex: 1 1 auto;
	}
</style>

<div id='progress'>
	{#each foo as bar, i}
		<div id={i} class={'circle' + (i < value ? ' filled' : '')}></div>
		{#if i < max - 1}
			<div class='interline'></div>
		{/if}
	{/each}
</div>

