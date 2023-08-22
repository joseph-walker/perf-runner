<script>
	export let data;
</script>

<svelte:head>
	<title>Performance Runner - Targets</title>
</svelte:head>

<h1>Targets</h1>

<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>Device</th>
			<th>Run Count</th>
			<th>Score</th>
			<th>URL</th>
		</tr>
	</thead>
	<tbody>
		{#each data.targets as target}
			<tr>
				<td>
					{target.id}
				</td>
				<td>
					<a href="/devices/{target.device.id}">{target.device.name}</a>
				</td>
				<td>
					{target.statistics.count}
				</td>
				<td>
					{target.statistics.final_score.mean}
				</td>
				<td>
					<a href={target.url} target="_blank">{target.url}</a>
				</td>
				<td>
					<a href="/targets/{target.id}">Details</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
