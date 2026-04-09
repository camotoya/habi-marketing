import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#F7F6FF',
          600: '#7C01FF',
          700: '#5A00CC',
        },
        teal: {
          50: '#E0FFF7',
          500: '#00C29C',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
