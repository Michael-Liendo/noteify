<script lang="ts">
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/actions/click-outside';

	let isDropdownOpen = false;

	const handleDropdownClick = () => {
		isDropdownOpen = !isDropdownOpen;
	};
</script>

<div class="flex items-center ml-3">
	<div>
		<button
			on:click={handleDropdownClick}
			type="button"
			class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300600"
			id="user-menu-button"
			aria-expanded="false"
			data-dropdown-toggle="dropdown-2"
		>
			<span class="sr-only">Open user menu</span>
			<figure class="flex justify-center items-center bg-gray-200 w-8 h-8 rounded-full">
				{$page.data.user?.full_name?.charAt(0)?.toUpperCase()}
			</figure>
		</button>
		{#if isDropdownOpen}
			<div
				use:clickOutside
				on:clickOutside={handleDropdownClick}
				id="dropdown"
				class="z-10 fixed right-5 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
			>
				<div class="px-4 py-3 text-sm text-gray-900">
					<p title={$page.data.user?.full_name} class="truncate">
						{$page.data.user?.full_name}
					</p>
					<p title={$page.data.user?.email} class="font-medium truncate">
						{$page.data.user?.email}
					</p>
				</div>
				<div class="py-2">
					<a href="/logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>Sign out</a
					>
				</div>
			</div>
		{/if}
	</div>
</div>
