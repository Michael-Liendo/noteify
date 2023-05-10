<script lang="ts">
	import classNames from 'classnames';

	export let type: 'text' | 'number' | 'email' | 'password' | 'date' = 'text';
	export let name: string;
	export let id = name;
	export let error: string | null = null;
	export let value: string | number | Date | null = null;
	export let label: string | null = null;
	export let placeholder: string | undefined = undefined;
	export let required = false;
	export let autocomplete: 'true' | 'false' | undefined = undefined;
	let customClassNames = '';
	export { customClassNames as class };
	let className = classNames(
		customClassNames,
		'bg-background border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
	);
	const handleInput = (event: Event): void => {
		const target = event.target as HTMLInputElement;
		value = type.match(/^(number|range)$/) ? +target.value : target.value;
	};
</script>

{#if label}
	<label for={name} class="block mb-2 text-sm font-medium text-gray-900">{label}</label>
{/if}

<input
	{name}
	{id}
	{placeholder}
	{required}
	{autocomplete}
	{type}
	{value}
	class:border-red-600={!!error}
	class={className}
	on:change
	on:blur
	on:focus
	on:input={handleInput}
/>
{#if error}
	<p class:opacity-0={!error} class="text-sm pb-1 text-red-600">{error}</p>
{/if}
