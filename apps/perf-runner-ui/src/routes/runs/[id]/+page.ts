import { apolloClient } from '$lib/apollo-client';
import { gql } from '@apollo/client/core';

const HOME_PAGE_QUERY = gql`
	query Run($id: ID!) {
		run(id: $id) {
			id
			final_score
			target {
				id
			}
		}
	}
`;

export const load = async () => {
	const result = await apolloClient.query({
		query: HOME_PAGE_QUERY,
	});

	return {
		devices: result.data.devices,
		targets: result.data.targets,
	};
};
