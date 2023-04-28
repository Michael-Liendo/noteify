import type { Handle } from '@sveltejs/kit';

// todo: function get user details
async function getUserDetails(accessToken: string) {
	const response = await fetch('http://127.0.0.1:7878/api/users/user/', {
		headers: {
			Authorization: `JWT ${accessToken}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch user details');
	}
	const { data } = await response.json();

	return data.user;
}

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const accessToken = event.cookies.get('accessToken');

		if (!accessToken) {
			return await resolve(event);
		}

		const userDetails = await getUserDetails(accessToken).catch((error) => {
			if (error.message === 'Failed to fetch user details') {
				event.cookies.set('accessToken', '', {
					maxAge: -1
				});
			}
		});

		if (accessToken) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(event.locals as any).accessToken = accessToken;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(event.locals as any).user = userDetails;
		}

		return await resolve(event);
	} catch (err) {
		console.log(err);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(event.locals as any).accessToken = null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(event.locals as any).user = null;

		return await resolve(event);
	}
};
