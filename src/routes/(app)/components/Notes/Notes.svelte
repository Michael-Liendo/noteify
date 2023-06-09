<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Page } from '@sveltejs/kit';
	import type { Writable } from 'svelte/store';
	import TrashIcon from '~icons/mdi/delete-outline';
	import NoteModal from './NoteModal.svelte';

	export let pageStore: Writable<Page>;

	let noteIdOpen: string | null = null;

	function closeModal() {
		noteIdOpen = null;
	}

	// function to update the page store
	async function updateNotesPageStore() {
		try {
			const response = await fetch('/');
			const data = await response.json();

			if (data.success) {
				pageStore.update((page) => {
					return {
						...page,
						data: {
							...page.data,
							notes: data.data
						}
					};
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

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
			// todo: show error message
		}
	};
</script>

<div class="masonry sm:masonry-sm md:masonry-md mt-10 mx-5">
	{#if $pageStore.data.notes}
		{#each $pageStore.data.notes as note}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={() => {
					noteIdOpen = note.id;
				}}
			>
				<Card class="mt-5 shadow-md break-inside">
					<div class="flex justify-between">
						<h3 title={note.title} class="text-xl text-yellow font-bold">{note.title}</h3>
						<button
							class="bg-transparent"
							on:click={() => {
								removeNote(note.id);
							}}
						>
							<TrashIcon class="w-6 h-5 text-gray-500 cursor-pointer" />
						</button>
					</div>
					<p class="mt-2 text-gray-500 overflow-hidden">{note.content}</p>
				</Card>
			</div>
			{#if noteIdOpen === note.id}
				<div class="fixed top-0 left-0 w-full h-full z-50">
					<NoteModal {note} {closeModal} {updateNotesPageStore} />
				</div>
			{/if}
		{/each}
	{/if}
</div>

<style>
</style>
