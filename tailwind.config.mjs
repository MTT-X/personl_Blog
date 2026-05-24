/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          bg: 'rgb(250 250 250 / <alpha-value>)',
          'bg-dark': 'rgb(10 10 12 / <alpha-value>)',
          card: 'rgb(255 255 255 / <alpha-value>)',
          'card-dark': 'rgb(28 28 30 / <alpha-value>)',
          text: 'rgb(29 29 31 / <alpha-value>)',
          'text-dark': 'rgb(245 245 247 / <alpha-value>)',
          muted: 'rgb(110 110 115 / <alpha-value>)',
          'muted-dark': 'rgb(152 152 157 / <alpha-value>)',
          accent: 'rgb(0 113 227 / <alpha-value>)',
          'accent-dark': 'rgb(41 151 255 / <alpha-value>)',
          divider: 'rgb(229 229 234 / <alpha-value>)',
          'divider-dark': 'rgb(44 44 46 / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      maxWidth: {
        prose: '720px',
        wide: '1200px',
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
};
