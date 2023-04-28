import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({
	locals
}: {
	locals: {
		accessToken?: string;
	};
}) => {
	if (locals.accessToken) {
		throw redirect(302, '/');
	}

	return {
		accessToken: locals.accessToken
	};
};
