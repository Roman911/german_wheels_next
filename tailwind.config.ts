import type { Config } from "tailwindcss";

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'display': ['Gilroy'],
      'body': ['Gilroy'],
      'gilroy': ["Gilroy", "sans-serif"],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        black: 'var(--g-color-dark)',
        'natural': {
          100: 'var(--g-color-grey-100)',
          500: 'var(--g-color-grey-500)',
          600: 'var(--g-color-grey-600)',
          700: 'var(--g-color-grey-700)',
          800: 'var(--g-color-grey-800)',
          900: 'var(--g-color-grey-900)',
        },
        'teal': {
          300: 'var(--g-color-teal-300)',
          400: 'var(--g-color-teal-400)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
