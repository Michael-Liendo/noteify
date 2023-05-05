<script lang="ts">
	import CloseThick from '~icons/mdi/close-thick';
	import { clickOutside } from '$lib/actions/click-outside';
	import type { Note } from '$lib/types/note';

	export let note: Note;

	export let closeModal: () => void;
</script>

<div class="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50">
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
		<div
			use:clickOutside
			on:clickOutside={closeModal}
			class="relative w-[40vw] 2 h-96 bg-white rounded-md"
		>
			<div class="absolute right-1">
				<button class="bg-transparent p-3 hover:cursor-pointer" on:click={closeModal}>
					<CloseThick class="w-6 h-5 text-gray-500" />
				</button>
			</div>
			<div class=" w-full h-full pt-9 px-5">
				<h3 class="text-xl font-bold">{note.title}</h3>
				<p class="mt-2 text-gray-500 overflow-hidden">{note.content}</p>
			</div>
		</div>
	</div>
</div>
