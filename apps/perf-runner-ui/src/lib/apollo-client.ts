import { env } from '$env/dynamic/public';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export const apolloClient = new ApolloClient({
	uri: env.PUBLIC_API_URL,
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache'
		},
		mutate: {
			fetchPolicy: 'no-cache'
		}
	},
});
