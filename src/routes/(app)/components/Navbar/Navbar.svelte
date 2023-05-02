<script lang="ts">
	import Close from '~icons/mdi/close';
	import Hamburger from '~icons/mdi/menu';

	import Profile from './Profile.svelte';

	let isMobileMenuOpen = false;

	const toggleMobileMenu = () => (isMobileMenuOpen = !isMobileMenuOpen);
</script>

<nav class="z-30 w-full h-[64px] bg-white border-b border-gray-200">
	<div class="px-3 py-3 lg:px-5 lg:pl-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center justify-start">
				<button
					class="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
					on:click={toggleMobileMenu}
				>
					{#if isMobileMenuOpen}
						<Close class="h-6 w-6" />
					{:else}
						<Hamburger class="h-6 w-6" />
					{/if}
				</button>
				<a href="/" class="flex ml-2 md:mr-24">
					<img src="/favicon.png" class="h-8 mr-3" alt="Noteify" />
					<span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"
						>Noteify</span
					>
				</a>
			</div>
			<div class="flex items-center">
				<Profile />
			</div>
		</div>
	</div>
</nav>
