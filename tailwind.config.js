import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			...defaultTheme.colors,
			accent: '#A9EF62',
			primary: '#F8F8F8',
			background: '#2D3748',
			'background-alt': '#4A5568',
			'button-primary': '#446dff'
		},
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};
