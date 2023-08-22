<script>
	export let data;
</script>

<svelte:head>
	<title>Performance Runner - Devices</title>
</svelte:head>

<h1>Devices</h1>

<a href="/devices/create">Create Device</a>

<table>
	<thead>
		<tr>
			<th colspan="2">Devices</th>
		</tr>
	</thead>
	<tbody>
		{#each data.devices as device}
			<tr>
				<td>
					<a href={`/devices/${device.id}`}>
						{device.name}
					</a>
				</td>
				<td>
					<a href={`/devices/${device.id}/delete`}> Delete </a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
