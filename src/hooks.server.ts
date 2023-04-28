import type { Handle } from '@sveltejs/kit';

// todo: function get user details
async function getUserDetails(accessToken: string) {
	const response = await fetch('http://', {
		headers: {
			Authorization: `token ${accessToken}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch user details');
	}
	const { data } = await response.json();

	return data;
}

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const accessToken = event.cookies.get('accessToken');

		if (!accessToken) {
			return await resolve(event);
		}

		// const userDetials = await getUserDetails(accessToken);

		if (accessToken) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(event.locals as any).accessToken = accessToken;
		}

		return await resolve(event);
	} catch (err) {
		console.log(err);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(event.locals as any).accessToken = null;

		return await resolve(event);
	}
};
