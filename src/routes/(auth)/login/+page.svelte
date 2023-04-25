<script>
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import TextField from '$lib/components/TextField.svelte';
</script>

<svelte:head>
	<title>Login - Noteify</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen">
	<Card class="container md:w-[45vw] 2xl:w-[25vw]">
		<h1 class="text-2xl font-bold text-gray-900">Welcome back!</h1>
		<span>Don't have an account? <a href="/signup">Sign up</a></span>
		<form class="mt-4">
			<TextField type="email" name="email" label="Email" placeholder="Enter your email" required />
			<TextField
				name="password"
				type="password"
				label="Password"
				placeholder="* * * * * * * * *"
				required
			/>
			<Button type="submit" fullWidth>Sign in to your account</Button>
		</form>
	</Card>
</div>
