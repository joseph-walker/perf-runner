<script>
	export let data;
</script>

<h1>Are you sure?</h1>

<form method="POST" action="?/delete">
	<input type="hidden" name="id" value={data.id} />
	<button type="submit">Delete</button>
</form>

<a href='/devices'>Just kidding</a>
