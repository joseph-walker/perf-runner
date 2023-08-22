<script>
	import CreateDeviceForm from '../device-form.svelte';

	export let data;
</script>

<h1>Edit Device</h1>

<a href="/devices">Back to devices</a>

<CreateDeviceForm buttonText="Update Device" action="?/update" device={data.device} />
