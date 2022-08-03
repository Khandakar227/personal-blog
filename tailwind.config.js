const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");


/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,ts,tsx,vue,svelte,md}",
  ],
  theme: {
    extend: {
		fontFamily: {
			sans: ["'Lato'", ...defaultTheme.fontFamily.sans],
		  },
	},
  },
  plugins: [
    plugin(function({ addBase, config }) {
      addBase({
        'h1': { fontSize: config('theme.fontSize.3xl'), fontWeight: config('theme.fontWeight.bold') },
        'h2': { fontSize: config('theme.fontSize.2xl'), fontWeight: config('theme.fontWeight.bold') },
        'h3': { fontSize: config('theme.fontSize.lg'), fontWeight: config('theme.fontWeight.bold') },
      })
    })
  ],
};
