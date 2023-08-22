import { apolloClient } from '$lib/apollo-client';
import { gql } from '@apollo/client/core';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// Page settings
// ===========================
export const csr = false;

const DELETE_DEVICE_MUTATION = gql`
	mutation DeleteDevice($id: Float!) {
		deleteDevice(id: $id) {
			ok
		}
	}
`;

export const load: PageServerLoad = async ({ params }) => {
	return {
		id: params.id,
	};
};

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id || typeof id !== 'string') {
			throw error(400, 'ID is missing');
		}

		console.log({ id: Number(id) });
		const result = await apolloClient.mutate({
			mutation: DELETE_DEVICE_MUTATION,
			variables: { id: Number(id) },
		});

		const ok = Boolean(result.data.deleteDevice?.ok);
		if (ok) {
			throw redirect(303, '/devices');
		} else {
			console.log(result);
			throw error(500, 'Something went wrong');
		}
	},
} satisfies Actions;
