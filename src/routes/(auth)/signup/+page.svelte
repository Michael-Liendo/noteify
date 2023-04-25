<script>
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import TextField from '$lib/components/TextField.svelte';
</script>

<svelte:head>
	<title>Sign up - Noteify</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen">
	<Card class="container md:w-[45vw] 2xl:w-[25vw]">
		<h1 class="text-2xl font-bold text-gray-900">Create a account!</h1>
		<span>You have a account? <a href="/login">login</a></span>
		<form class="mt-4">
			<TextField type="text" name="full_name" label="Full name" placeholder="Joe Doe" required />
			<TextField type="email" name="email" label="Email" placeholder="Enter your email" required />
			<TextField
				name="password"
				type="password"
				label="Password"
				placeholder="* * * * * * * * *"
				required
			/>
			<Button type="submit" fullWidth>Create your account</Button>
		</form>
	</Card>
</div>
