// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

declare global {
	namespace App {
		// interface Error {}
		// interface Platform {}
		interface PageData {
			accessToken?: string | null;
			user?: {
				id: string;
				full_name: string;
				email: string;
			} | null;
		}

		interface Locals {
			accessToken?: string | null;
			user?: {
				id: string;
				full_name: string;
				email: string;
			} | null;
		}
	}
}

export {};
