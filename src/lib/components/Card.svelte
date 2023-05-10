<script lang="ts">
	import classNames from 'classnames';

	let className = '';
	export { className as class };
</script>

<div
	class={classNames(
		'p-4 bg-background-alt border border-gray-200 rounded-lg shadow-xl sm:p-6',
		className
	)}
>
	<slot />
</div>
