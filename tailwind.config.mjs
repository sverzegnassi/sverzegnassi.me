const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
	  fontFamily: {
		sans: [ 'DM Sans Variable', ...defaultTheme.fontFamily.sans],
		serif: [ 'Playfair Display Variable', ...defaultTheme.fontFamily.serif],
		body: [ 'DM Sans Variable', ...defaultTheme.fontFamily.sans ],
	  },
	  colors: {
		'neutral': {
		  '100': '#f7f9ff',
		  '200': '#edf4ff',
		  '300': '#c3d3e6',
		  '400': '#8392a4',
		  '500': '#c85131',
		  '600': '#5a6a7a',
		  '700': '#4e5d6e',
		  '800': '#1a2938',
		  '900': '#0d1d2b',
		},
		'link': {
		  '100': '#1099C7',
		  '900': '#006FC4',
		},
		'linkVisited': {
		  '100': '#c95cfb',
		  '900': '#AE33D4',
		},
		'success': {
		  '300': '#00f38e',
		  '500': '#00834a',
		  '700': '#004525',
		},
		'error': {
		  '300': '#ffc6ca',
		  '500': '#e2004e',
		  '700': '#7c0026',
		},
		'warning': {
		  '300': '#fbd024',
		  '500': '#897000',
		  '700': '#483a00',
		},
		'info': {
		  '300': '#c4d4ff',
		  '500': '#5371b1',
		  '700': '#163976',
		},
		inherit: "inherit",
		current: "currentColor",
		transparent: "transparent",
		black: "#000",
		white: "#FFF",
	  },
	},
	plugins: [],
}
