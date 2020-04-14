<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js';


	function inflateData(data) {
		return Array.from(data.entries(), ([i, y]) => ({x: i + 1, y: y * 100}));
	}

	function ratio(type) {
		return stats.correct[type] + '/' + (Number(stats.correct[type]) + Number(stats.wrong[type]));
	}

	function color(type) {
		const ratio = stats.record[type].slice(-1)[0];
		const colors = ['#f44336', '#ff5722', '#ff9800', '#cddc39', '#4caf50', '#2196f3', '#e91e63'];
		const level = Math.floor(ratio * colors.length);
		return `color: ${colors[level]}`;
	}

	export let id;
	export let username;
	export let stats;
	let canvasElement;

	if (stats) {
		let config = {
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
				title: {
					display: true,
					text: 'Correct answer rate',
				},
				scales: {
					xAxes: [{
						type: 'linear',
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'trainings',
						},
						ticks: {
							min: 1,
							stepSize: 1,
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: '%',
						}
					}]
				},
				legend: {
					position: 'right'
				}
			}
		};
		onMount(() => {		
			const ctx = canvasElement.getContext('2d');
			const chart = new Chart(ctx, config);
		});
	}
</script>

<style>
	.no-stats {
		display: flex;
		place-items: center;
		font-size: 1.4em;
	}

	.stats {
		display: grid;
		grid-template-columns: 0.2fr 0.2fr 0.6fr;
		grid-template-rows: repeat(3, 1fr);
	}

	label, .numeric {
		display: inline-grid;
	}

	label {
		font: 1.4em 'Oxygen Light';
		place-items: center start;
		padding-left: 1em;
		margin-right: 25px;
	}

	.numeric {
		font: 1em 'JetBrains Mono';
		place-items: center end;
		padding-right: 1em;
	}

	canvas {
		padding-left: 50px;
		grid-row: 1 / 4;
		grid-column: 3 / 4;
	}
</style>

<div class={(stats ? 'stats' : 'no-stats') + ' pad'}>
	{#if !stats}
		You haven't finished any exercises yet 🥴
	{:else}
		{#each stats.types as type, i}
			<label>{type}</label>
			<div class='numeric' style={color(type)}>{ratio(type)}</div>
		{/each}
		<canvas bind:this={canvasElement} width="700" height="350"></canvas>
	{/if}
</div>

