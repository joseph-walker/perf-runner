import { apolloClient } from '$lib/apollo-client';
import { gql } from '@apollo/client/core';

export const load = async () => {
	try {
		const result = await apolloClient.query<{
			targets: {
				id: number;
				url: string;
				created_at: string;
				device: {
					cpu_slowdown_factor: number;
					created_at: string;
					download_throughput_kbps: number;
					form_factor: string;
					id: number;
					name: string;
					request_latency_ms: number;
					round_trip_time_ms: number;
					scale_factor: number;
					screen_height: number;
					screen_width: number;
					updated_at: string;
					upload_throughput_kbps: number;
				};
				num_runs: number;
				statistics: {
					count: number;
					final_score: {
						mean: number;
					};
				};
			}[];
		}>({
			fetchPolicy: 'no-cache',
			query: gql`
				query {
					targets {
						id
						url
						created_at
						device {
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
						num_runs
						statistics {
							count
							final_score {
								mean
							}
						}
					}
				}
			`,
		});

		const targets = result.data.targets;

		return { targets };
	} catch (e) {
		console.error(e);
		return { targets: [] };
	}
};
