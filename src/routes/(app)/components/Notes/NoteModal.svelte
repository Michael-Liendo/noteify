<script lang="ts">
	import CloseThick from '~icons/mdi/close-thick';
	import { clickOutside } from '$lib/actions/click-outside';
	import type { Note } from '$lib/types/note';
	import { scale } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';

	export let note: Note;
	export let closeModal: () => void;
	export let updateNotesPageStore: () => void;

	let title: string;
	let content: string;

	let toClose = () => {
		closeModal();
		editNote();
	};

	// todo: edit notes functionality
	async function editNote() {
		try {
			const res = await fetch('/', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: note.id, title, content })
			});
			const data = await res.json();

			if (data.success) {
				updateNotesPageStore();
			}
		} catch (error) {
			console.log(error);
			// todo show error message
		}
	}
</script>

<div class="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50">
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
		<div
			use:clickOutside
			on:clickOutside={toClose}
			class="relative w-screen sm:w-[40vw] h-[50vh] overflow-y-scroll bg-white rounded-md"
			transition:scale
		>
			<div class="absolute right-1">
				<button class="bg-transparent p-3 hover:cursor-pointer" on:click={toClose}>
					<CloseThick class="w-6 h-5 text-gray-500" />
				</button>
			</div>
			<div class="w-full h-full pt-9 px-5">
				<!-- save content in a variable -->
				<h3 bind:innerHTML={title} contenteditable class="text-xl font-bold">{note.title}</h3>
				<p bind:innerHTML={content} contenteditable class="mt-2 text-gray-500 overflow-hidden">
					{note.content}
				</p>
			</div>
			<div class="fixed right-1">
				<Button on:click={toClose}>Close</Button>
			</div>
		</div>
	</div>
</div>
