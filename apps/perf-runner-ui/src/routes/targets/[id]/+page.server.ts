import { apolloClient } from '$lib/apollo-client';
import { gql } from '@apollo/client/core';
import type { PageServerLoad } from './$types';

const TARGET_PAGE_QUERY = gql`
	query Target($id: Int!) {
		target(id: $id) {
			created_at
			id
			num_runs
			runs {
				bootup_time
				created_at
				cumulative_layout_shift
				dom_nodes
				final_score
				first_contentful_paint
				first_meaningful_paint
				id
				largest_contentful_paint
				lighthouse_version
				main_thread_work
				max_potential_fid
				network_latency
				network_rtt
				redirects
				server_response_time
				speed_index
				time_to_interactive
				total_blocking_time
				total_byte_weight
				updated_at
				user_agent
			}
			statistics {
				count
				final_score {
					mean
				}
				first_contentful_paint {
					mean
				}
			}
			updated_at
			url
		}
	}
`;

export const load: PageServerLoad = async ({ params }) => {
	try {
		const result = await apolloClient.query({
			query: TARGET_PAGE_QUERY,
			variables: { id: parseInt(params.id, 10) },
			fetchPolicy: 'no-cache',
		});

		return { target: result.data.target };
	} catch (e) {
		console.error(e);
		return { target: null };
	}
};
