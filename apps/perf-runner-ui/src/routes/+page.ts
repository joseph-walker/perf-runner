import { apolloClient } from '$lib/apollo-client';
import { gql } from '@apollo/client/core';

const HOME_PAGE_QUERY = gql`
	query HomePage {
		devices {
			id
			name
		}

		targets {
			id
			runs {
				id
				final_score
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
