import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  safelist: [
	"bg-orange-500",
	"bg-red-500",
	"bg-green-500",
	"bg-yellow-500",
	"bg-gray-500",
  ],

  theme: {
    extend: {
			colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grey: "var(--grey)",
        primary: "#3B44FF",
				errorRed: "var(--error-red)",
				black: "#000000",
				orangeEdit: "var(--orange)",
      },
			transitionDuration: {
				DEFAULT: '266ms'
			},
			boxShadow: {
				'3xl': '14px 17px 40px 4px',
				inset: 'inset 0px 18px 22px',
				darkinset: '0px 4px 4px inset'
			},
		},
    screens: {
			sm: '375px',
			'sm-max': { max: '375px' },
			'2sm': '576px',
			'2sm-max': { max: '576px' },
			md: '768px',
			'md-max': { max: '768px' },
			lg: '992px',
			'lg-max': { max: '992px' },
			xl: '1200px',
			'xl-max': { max: '1200px' },
			'2xl': '1320px',
			'2xl-max': { max: '1320px' },
			'3xl': '1600px',
			'3xl-max': { max: '1600px' },
			'4xl': '1850px',
			'4xl-max': { max: '1850px' }
		},
  },
  plugins: [],
}
export default config;
