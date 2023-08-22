<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Performance Runner - Home</title>
</svelte:head>

<h1>Latest Tests</h1>

<table>
	<thead>
		<tr>
			<th>Target ID</th>
			<th>URL</th>
			<th>Device</th>
			<th>Final Score</th>
			<th>Updated at</th>
		</tr>
	</thead>

	<tbody>
		{#each data.runs as run}
			<tr>
				<td>
					<a href="/targets/{run.target.id}">Run #{run.id}</a>
				</td>
				<td>
					<a href={run.target.url} target="_blank">{run.target.url}</a>
				</td>
				<td>
					<a href="/devices/{run.target.device.id}">{run.target.device.name}</a>
				</td>
				<td>
					{run.final_score}
				</td>
				<td>
					{run.updated_at}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
