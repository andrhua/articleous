<script>
	import { goto } from '@sapper/app';
	import Modal from '../components/Modal.svelte';


	function handleClick (event) {
		switch (event.currentTarget.id) {
			case 'logout':
				goto('/logout');
				break;
			case 'deactivate':
				modal = true;
				break;
		}
	}

	export let modal;
	export let deactivate;

	$: if (deactivate) {
		goto('/deactivate');
	}
</script>

<style>
	.pad {
		flex-direction: column;
		display: flex;
		place-items: center;
	}

	.text-button {
		margin: 1em;
	}
</style>

<Modal labelText="Your account data will be erased. Are you sure?"
bind:active={modal}
bind:result={deactivate} />

<div class='pad'>
	<button class='text-button' on:click={handleClick} id='logout'>Logout</button>
	<button class='text-button' on:click={handleClick} id='deactivate'>Deactivate account</button>
</div>
