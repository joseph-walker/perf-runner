<script lang="ts">
	export let className: string;
</script>

<div
	class={`p-1.5 border bg-opacity-20 border-opacity-20 leading-none text-center inline-block font-bold rounded-lg ${className}`}
>
	<slot />
</div>
