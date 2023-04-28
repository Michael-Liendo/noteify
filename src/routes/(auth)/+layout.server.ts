import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({
	locals
}: {
	locals: {
		accessToken?: string | null;
		user?: {
			id: string;
			full_name: string;
			email: string;
		} | null;
	};
}) => {
	if (locals.user || locals.accessToken) {
		throw redirect(302, '/');
	}

	return {
		accessToken: locals.accessToken,
		user: locals.user
	};
};
