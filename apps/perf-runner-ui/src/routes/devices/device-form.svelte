<script lang="ts">
	import { FormFactor } from './types';
	import type { Device } from './types';

	export let device: Device | null = null;
	export let action = '/devices';
	export let buttonText = 'Create device';
</script>

<form method="POST" {action}>
	{#if device?.id}
		<input type="hidden" name="id" value={device.id} />
	{/if}

	<div>
		<label for="name">Name</label>
		<input required type="text" id="name" name="name" value={device?.name ?? ''} />
	</div>

	<div>
		<label for="form_factor">Form Factor</label>
		<select name="form_factor" id="form_factor">
			{#each Object.entries(FormFactor) as [key, value]}
				<option {value}>{value}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="screen_width">Width</label>
		<input required type="number" id="screen_width" name="screen_width" value="1024" />
	</div>

	<div>
		<label for="screen_height">Height</label>
		<input required type="number" id="screen_height" name="screen_height" value="768" />
	</div>

	<div>
		<label for="scale_factor">Pixel Ratio</label>
		<input required type="number" id="scale_factor" name="scale_factor" value="1" />
	</div>

	<div>
		<label for="cpu_slowdown_factor">CPU Slowdown</label>
		<input
			required
			type="number"
			id="cpu_slowdown_factor"
			name="cpu_slowdown_factor"
			value="1"
		/>
	</div>

	<div>
		<label for="request_latency_ms">Request Latency</label>
		<input required type="number" id="request_latency_ms" name="request_latency_ms" value="0" />
	</div>

	<div>
		<label for="round_trip_time_ms">Round Trip Time (ms)</label>
		<input required type="number" id="round_trip_time_ms" name="round_trip_time_ms" value="0" />
	</div>

	<div>
		<label for="download_throughput_kbps">Download Throughput (kbps)</label>
		<input
			required
			type="number"
			id="download_throughput_kbps"
			name="download_throughput_kbps"
			value="4096"
		/>
	</div>

	<div>
		<label for="upload_throughput_kbps">Upload Throughput (kbps)</label>
		<input
			required
			type="number"
			id="upload_throughput_kbps"
			name="upload_throughput_kbps"
			value="4096"
		/>
	</div>

	<button type="submit">{buttonText}</button>
</form>

<style>
	form {
      margin-top: 2rem;
	  display: flex;
	  flex-wrap: wrap;
	  flex-direction: column;
	  gap: 1rem;
	}
	form > div {
	  display: inline-flex;
	  flex-direction: column;
	  gap: 0.5rem;
	}
	input, select {
	  padding: 10px;
	}

	label {
	  font-weight: bold;
	}
</style>
