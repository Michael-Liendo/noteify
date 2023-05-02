import type { Cookies } from '@sveltejs/kit';

export async function POST({ cookies, request }: { cookies: Cookies; request: Request }) {
	const requestBody = await request.json();

	const { title, content } = requestBody;

	const response = await fetch(`http://127.0.0.1:7878/api/notes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${cookies.get('accessToken')}`
		},
		body: JSON.stringify({ title, content })
	});

	const data = await response.json();

	return new Response(JSON.stringify(data), { status: data.statusCode });
}
