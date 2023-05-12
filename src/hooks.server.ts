import type { Handle } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';

async function getUserDetails(accessToken: string) {
	const response = await fetch(`${API_URL}/api/users/user/`, {
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

// get user notes
async function getUserNotes(accessToken: string) {
	const response = await fetch(`${API_URL}/api/notes`, {
		headers: {
			Authorization: `JWT ${accessToken}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch user notes');
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

		const userDetails = await getUserDetails(accessToken).catch((error) => {
			if (error.message === 'Failed to fetch user details') {
				event.cookies.set('accessToken', '', {
					maxAge: -1
				});
			}
		});

		const userNotes = await getUserNotes(accessToken).catch((error) => {
			if (error.message === 'Failed to fetch user notes') {
				console.log(error);
			}
		});

		if (accessToken) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(event.locals as any).accessToken = accessToken;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(event.locals as any).user = userDetails;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(event.locals as any).notes = userNotes;
		}

		return await resolve(event);
	} catch (err) {
		console.log(err);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(event.locals as any).accessToken = null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(event.locals as any).user = null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(event.locals as any).notes = null;

		return await resolve(event);
	}
};
