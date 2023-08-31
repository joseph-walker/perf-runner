<script lang="ts">
	import Badge from './Badge.svelte';

	export let score: number;

	let display = score * 100;
	let good = score > 0.8;
	let bad = score < 0.5;
	let className = '';

	if (good) {
		className = 'bg-green-500 text-green-700 border-green-700';
	} else if (bad) {
		className = 'bg-red-500 text-red-700 border-red-700';
	} else {
		className = 'bg-yellow-500 text-yellow-700 border-yellow-700';
	}
</script>

<Badge {className}>{display}</Badge>
