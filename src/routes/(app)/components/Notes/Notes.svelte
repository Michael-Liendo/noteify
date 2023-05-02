<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import type { Page } from '@sveltejs/kit';
	import type { Writable } from 'svelte/store';
	import TrashIcon from '~icons/mdi/delete-outline';

	export let pageStore: Writable<Page>;

	const removeNote = async (id: string) => {
		try {
			const response = await fetch('/', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id })
			});
			const { success } = await response.json();

			if (success) {
				pageStore.update((page) => {
					return {
						...page,
						data: {
							...page.data,
							notes: page.data.notes?.filter((note) => note.id !== id)
						}
					};
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="grid grid-cols-4 gap-4 mt-10 mx-5">
	{#if $pageStore.data.notes}
		{#each $pageStore.data.notes as note}
			<Card class="">
				<div class="flex justify-between">
					<h3 title={note.title} class="text-xl font-bold">{note.title}</h3>
					<button
						class="bg-transparent"
						on:click={() => {
							removeNote(note.id);
						}}
					>
						<TrashIcon class="w-6 h-5 text-gray-500 cursor-pointer" />
					</button>
				</div>
				<!-- note content truncate -->
				<p class="mt-2 text-gray-500 overflow-hidden">{note.content}</p>
			</Card>
		{/each}
	{/if}
</div>
