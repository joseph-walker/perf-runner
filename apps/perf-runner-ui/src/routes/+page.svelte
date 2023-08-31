<script lang="ts">
	import ScoreBadge from '../ui/ScoreBadge.svelte';

	export let data;
</script>

<svelte:head>
	<title>Performance Runner - Home</title>
</svelte:head>

<table class="w-full" aria-label="Latest Runs">
	<thead>
		<tr class="text-left border-b">
			<th class="font-semibold py-4 pr-4 whitespace-nowrap">URL</th>
			<th class="font-semibold p-4 whitespace-nowrap">Device</th>
			<th class="font-semibold p-4 whitespace-nowrap text-center">Score</th>
			<th></th>
		</tr>
	</thead>

	<tbody>
		{#each data.runs as run}
			<tr>
				<td class="py-4 pr-4 whitespace-nowrap">
					<a href={run.target.url} target="_blank" rel="external" class="underline inline-flex items-center gap-2">
						{run.target.url}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width={1.5}
							stroke="currentColor"
							class="w-6 h-6 inline"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
							/>
						</svg>
					</a>
				</td>
				<td class="p-4 whitespace-nowrap text-sm">
					{run.target.device.name}
					<a class="text-xs text-blue-500" href="/devices/{run.target.device.id}"
						>
						(Manage)
					</a
					>
				</td>
				<td class="p-4 whitespace-nowrap whitespace-nowrap text-center">
					<ScoreBadge score={run.final_score} />
				</td>
				<td class="py-4 pl-4 text-right">
					<a class="text-blue-500 font-semibold underline" href="/targets/{run.target.id}">Results</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
