<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js';


	function inflateData(data) {
		return Array.from(data.entries(), ([i, y]) => ({x: i + 1, y: y}));
	}

	export let id;
	export let username;
	export let stats;
	let canvasElement;

	onMount(() => {
		const ctx = canvasElement.getContext('2d');
		const chart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [
					{
						label: stats.types[0], 
						borderColor: '#B3E2CD',
						backgroundColor: '#CCEBC577',
						pointBorderColor: '#33A02C',
						data: inflateData(stats.record.zero)
					},
					{
						label: stats.types[1],
						borderColor: '#FDCDAC',
						backgroundColor: '#FED9A677',
						pointBorderColor: '#FF7F00',
						data: inflateData(stats.record.indefinite)},
					{
						label: stats.types[2],
						borderColor: '#CBD5E8',
						backgroundColor: '#B3CDE377',
						pointBorderColor: '#1F78B4',
						data: inflateData(stats.record.definite)}
				],
			},
			options: {
				responsive: false,
				scales: {
					xAxes: [{
						type: 'linear',
						display: true,
						scaleLabel: {
							display: true
						},
						ticks: {
							min: 1
						}
					}]
				},
				legend: {
					position: 'right'
				}
			}
		});
	});
</script>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	table {
		border-collapse: collapse;
		font: 1.3em 'Oxygen Light';
	}

	td {
		padding: 0.5em 0.8em;
	}

	.numeric {
		font: 1em 'JetBrains Mono';
		text-align: right;
	}
</style>

<div>
	<table>
		{#each stats.types as type, i}
			<tr>
				<td>{type}</td>
				<td class='numeric'>{stats.correct[type]}/{Number(stats.wrong[type]) + Number(stats.correct[type])}</td>
			</tr>
		{/each}
	</table>
	<canvas bind:this={canvasElement} width="700" height="350"></canvas>
</div>

