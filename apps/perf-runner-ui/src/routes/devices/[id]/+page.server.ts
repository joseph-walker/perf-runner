import { apolloClient } from '$lib/apollo-client';
import { gql } from '@apollo/client/core';
import { error, redirect } from '@sveltejs/kit';
import type { FormFactor } from '../types';
import type { Actions, PageServerLoad } from './$types';

// Page settings
// ===========================
export const csr = false;

const UPDATE_DEVICE_MUTATION = gql`
	mutation UpdateDevice($deviceInput: DeviceInput!) {
		updateDevice(input: $deviceInput) {
			ok
		}
	}
`;

const DEVICE_PAGE_QUERY = gql`
	query Device($id: Int!) {
		device(id: $id) {
			cpu_slowdown_factor
			created_at
			download_throughput_kbps
			form_factor
			id
			name
			request_latency_ms
			round_trip_time_ms
			scale_factor
			screen_height
			screen_width
			updated_at
			upload_throughput_kbps
		}
	}
`;

export const load: PageServerLoad = async ({ params }) => {
	let result;

	try {
		result = await apolloClient.query({
			query: DEVICE_PAGE_QUERY,
			variables: { id: Number(params.id) },
			fetchPolicy: 'no-cache',
		});
	} catch (e) {
		console.error(e);
	}

	if (!result?.data.device) {
		throw error(404);
	}

	return { device: result.data.device };
};

export const actions = {
	update: async ({ request }) => {
		const formData = await request.formData();

		const deviceInput = {
			cpu_slowdown_factor: Number(formData.get('cpu_slowdown_factor')),
			download_throughput_kbps: Number(formData.get('download_throughput_kbps')),
			form_factor: formData.get('form_factor') as FormFactor,
			id: parseFloat(formData.get('id') as string),
			name: formData.get('name') as string,
			request_latency_ms: Number(formData.get('request_latency_ms')),
			round_trip_time_ms: Number(formData.get('round_trip_time_ms')),
			scale_factor: parseFloat(formData.get('scale_factor') as string),
			screen_height: Number(formData.get('screen_height')),
			screen_width: Number(formData.get('screen_width')),
			upload_throughput_kbps: Number(formData.get('upload_throughput_kbps')),
		};

		const result = await apolloClient
			.mutate({
				mutation: UPDATE_DEVICE_MUTATION,
				variables: { deviceInput },
			})
			.catch((e) => {
				console.error(JSON.stringify(e?.networkError?.result?.errors ?? [], null, 2));
				throw error(500, 'Something went wrong');
			});

		if (result.data.updateDevice?.ok) {
			throw redirect(303, `/devices/${formData.get('id')}?ok`);
		} else {
			console.log(result.errors);
			throw error(500, 'Something went wrong');
		}
	},
} satisfies Actions;
