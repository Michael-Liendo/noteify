<script>
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import TextField from '$lib/components/TextField.svelte';

	import { newForm } from '@whizzes/svelte-forms';
	import * as Yup from 'yup';

	const { handleSubmit, values, errors, isSubmitting } = newForm({
		initialValues: {
			full_name: '',
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			full_name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required()
		}),
		onSubmit: async (values) => {
			const request = await fetch(`http://localhost:7878/api/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values)
			});
			const response = await request.json();

			console.log(request, '\n');
			console.log(response);
		}
	});
</script>

<svelte:head>
	<title>Sign up - Noteify</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen">
	<Card class="container md:w-[45vw] 2xl:w-[25vw]">
		<h1 class="text-2xl font-bold text-gray-900">Create a account!</h1>
		<span>You have a account? <a href="/login">login</a></span>
		<form on:submit={handleSubmit} class="mt-4">
			<TextField
				type="text"
				name="full_name"
				label="Full name"
				placeholder="Joe Doe"
				bind:value={$values.full_name}
				error={$errors.full_name}
				required
			/>
			<TextField
				type="email"
				name="email"
				label="Email"
				placeholder="Enter your email"
				bind:value={$values.email}
				error={$errors.email}
				required
			/>
			<TextField
				name="password"
				type="password"
				label="Password"
				placeholder="* * * * * * * * *"
				bind:value={$values.password}
				error={$errors.password}
				required
			/>
			<Button type="submit" fullWidth disabled={$isSubmitting}>Create your account</Button>
		</form>
	</Card>
</div>
