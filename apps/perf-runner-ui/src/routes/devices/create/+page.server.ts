import { apolloClient } from '$lib/apollo-client';
import { gql } from '@apollo/client/core';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

// Page settings
// ===========================
export const csr = false;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const input = {
			name: formData.get('name'),
			form_factor: formData.get('form_factor'),
			screen_width: Number(formData.get('screen_width')),
			screen_height: Number(formData.get('screen_height')),
			scale_factor: Number(formData.get('scale_factor')),
			cpu_slowdown_factor: Number(formData.get('cpu_slowdown_factor')),
			request_latency_ms: Number(formData.get('request_latency_ms')),
			round_trip_time_ms: Number(formData.get('round_trip_time_ms')),
			download_throughput_kbps: Number(formData.get('download_throughput_kbps')),
			upload_throughput_kbps: Number(formData.get('upload_throughput_kbps')),
		};

		try {
			const result = await apolloClient.mutate({
				mutation: gql`
					mutation CreateDevice($input: DeviceInput!) {
						createDevice(input: $input) {
							ok
						}
					}
				`,
				variables: { input },
				fetchPolicy: 'no-cache',
			});
			console.log(result);

			throw redirect(302, '/devices')
		} catch (e) {
			console.log(e);

			return fail(500, { ok: false, message: 'Failed to create device' });
		}
	},
};
