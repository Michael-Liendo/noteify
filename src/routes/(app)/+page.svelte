<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import { newForm } from '@whizzes/svelte-forms';
	import * as Yup from 'yup';
	import Notes from './components/Notes/Notes.svelte';

	const pageStore = writable($page);

	const { values, isSubmitting, handleSubmit } = newForm({
		initialValues: { title: '', content: '' },
		validationSchema: Yup.object({
			title: Yup.string(),
			content: Yup.string().required('Content is required')
		}),
		onSubmit: async (values) => {
			try {
				const response = await fetch('/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});
				const { data, success } = await response.json();

				if (success) {
					pageStore.update((page) => {
						return { ...page, data: { ...page.data, notes: [data, ...(page.data.notes as any)] } };
					});
				}

				$values.title = '';
				$values.content = '';
			} catch (error) {
				console.log(error);
			}
		}
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h2 class="text-center text-3xl mt-2">Hi, {$page.data.user?.full_name}</h2>
<div class="flex justify-center mt-5">
	<Card class="w-1/3">
		<form on:submit={handleSubmit}>
			<TextField
				bind:value={$values.title}
				name="title"
				placeholder="Title"
				class="border-b-transparent rounded-b-none"
			/>
			<textarea
				bind:value={$values.content}
				class="bg-background w-full h-20 border border-t-transparent border-gray-300 rounded-lg rounded-t-none focus:ring-primary-500 focus:border-primary-500 block p-2.5"
				placeholder="Take a note..."
				required
			/>
			<div class="flex justify-end mt-7">
				<Button type="submit" disabled={$isSubmitting}>Create</Button>
			</div>
		</form>
	</Card>
</div>

<Notes {pageStore} />
