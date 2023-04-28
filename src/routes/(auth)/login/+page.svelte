<script>
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import TextField from '$lib/components/TextField.svelte';

	import { newForm } from '@whizzes/svelte-forms';
	import * as Yup from 'yup';

	const { handleSubmit, values, errors, isSubmitting } = newForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().required()
		}),
		onSubmit: async (values) => {
			const request = await fetch('/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values)
			});
			const response = await request.json();

			if (response.success) {
				window.location.href = '/';
			} else {
				alert(response.error.message);
			}
		}
	});
</script>

<svelte:head>
	<title>Login - Noteify</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen">
	<Card class="container md:w-[45vw] 2xl:w-[25vw]">
		<h1 class="text-2xl font-bold text-gray-900">Welcome back!</h1>
		<span>Don't have an account? <a href="/signup">Sign up</a></span>
		<form on:submit={handleSubmit} class="mt-4">
			<TextField
				type="email"
				name="email"
				label="Email"
				bind:value={$values.email}
				error={$errors.email}
				placeholder="Enter your email"
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
			<Button type="submit" fullWidth disabled={$isSubmitting}>Sign in</Button>
		</form>
	</Card>
</div>
