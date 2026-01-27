/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#131d2f',
          light: '#1e2d47',
          dark: '#0a1019',
        },
        accent: {
          DEFAULT: '#FF6B35',
          hover: '#ff8555',
        },
        gold: '#FFD700',
      },
    },
  },
  plugins: [],
}
