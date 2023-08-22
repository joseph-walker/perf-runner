import { apolloClient } from '$lib/apollo-client';
import { gql } from '@apollo/client/core';
import type { Device } from './types';
import { byUpdatedAt } from './utils';

const DEVICES_PAGE_QUERY = gql`
	query Devices {
		devices {
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

// Page settings
// ===========================
export const csr = false;

export const load = async () => {
	try {
		const result = await apolloClient.query<{ devices: Device[] }>({
			query: DEVICES_PAGE_QUERY,
			fetchPolicy: 'no-cache',
		});

		return {
			devices: result.data.devices.sort(byUpdatedAt),
		};
	} catch (e) {
		console.error(e);
		return { devices: [] };
	}
};
