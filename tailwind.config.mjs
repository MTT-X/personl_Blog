/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#FAFAFA',
          'bg-dark': '#0A0A0C',
          card: '#FFFFFF',
          'card-dark': '#1C1C1E',
          text: '#1D1D1F',
          'text-dark': '#F5F5F7',
          muted: '#6E6E73',
          'muted-dark': '#98989D',
          accent: '#0071E3',
          'accent-dark': '#2997FF',
          divider: '#E5E5EA',
          'divider-dark': '#2C2C2E',
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
