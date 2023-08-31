import { apolloClient } from '$lib/apollo-client';
import { gql } from '@apollo/client/core';
import { byUpdatedAt } from './devices/utils';
import type { PageLoad } from './$types';

// Page settings
// ===========================
export const csr = false;

export const load: PageLoad = async () => {
	const result = await apolloClient.query<{
		runs: Array<{
			bootup_time: number;
			created_at: string;
			cumulative_layout_shift: number;
			dom_nodes: number;
			final_score: number;
			first_contentful_paint: number;
			first_meaningful_paint: number;
			id: number;
			largest_contentful_paint: number;
			lighthouse_version: string;
			main_thread_work: number;
			max_potential_fid: number;
			network_latency: number;
			network_rtt: number;
			redirects: number;
			server_response_time: number;
			speed_index: number;
			target: {
				created_at: string;
				device: {
					id: number;
					name: string;
				};
				id: number;
				num_runs: number;
				statistics: {
					count: number;
					final_score: {
						mean: number;
					};
					first_contentful_paint: {
						mean: number;
					};
				};
				updated_at: string;
				url: string;
			};
			time_to_interactive: number;
			total_blocking_time: number;
			total_byte_weight: number;
			updated_at: string;
			user_agent: string;
		}>;
	}>({
		fetchPolicy: 'no-cache',
		query: gql`
			query {
				runs {
					#					bootup_time
					#					created_at
					#					cumulative_layout_shift
					#					dom_nodes
					final_score
					#					first_contentful_paint
					#					first_meaningful_paint
					id
					#					largest_contentful_paint
					#					lighthouse_version
					#					main_thread_work
					#					max_potential_fid
					#					network_latency
					#					network_rtt
					#					redirects
					#					server_response_time
					#					speed_index
					target {
						#						created_at
						device {
							id
							name
						}
						id
						#						num_runs
						#						updated_at
						url
					}
					#					time_to_interactive
					#					total_blocking_time
					#					total_byte_weight
					updated_at
					#					user_agent
				}
			}
		`,
	});

	return {
		runs: result.data.runs?.sort(byUpdatedAt) ?? [],
	};
};
