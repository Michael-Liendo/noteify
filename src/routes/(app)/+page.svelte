<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import { newForm } from '@whizzes/svelte-forms';
	import * as Yup from 'yup';

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
						return { ...page, data: { ...page.data, notes: [...(page.data.notes as any), data] } };
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

<h2 class="text-center text-3xl mt-2">Hi, {$page.data.user?.full_name}</h2>
<div class="flex justify-center mt-5">
	<Card class="w-1/3">
		<form on:submit={handleSubmit}>
			<TextField bind:value={$values.title} name="title" placeholder="Title" />
			<textarea
				bind:value={$values.content}
				class="w-full h-20 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
				placeholder="Take a note..."
				required
			/>
			<div class="flex justify-end mt-7">
				<Button type="submit" disabled={$isSubmitting}>Create</Button>
			</div>
		</form>
	</Card>
</div>

<div class="grid grid-cols-3 gap-4 mt-5">
	<!-- list notes -->
	{#if $pageStore.data.notes}
		{#each $pageStore.data.notes as note}
			<Card class=" ml-5">
				<h3 class="text-xl font-bold">{note.title}</h3>
				<p>{note.content}</p>
			</Card>
		{/each}
	{/if}
</div>
