/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'text-light': '#090a05',
        'background-light': '#fbfbf8',
        'primary-button-light': '#b8b2d7',
        'secondary-button-light': '#ffffff',
        'accent-light': '#7b6fb3',
        'text-dark': '#fbfbf8',
        'background-dark': '#090a05',
        'primary-button-dark': '#ffffff',
        'secondary-button-dark': '#b8b2d7',
        'accent-dark': ' #52467b',
      },
    },
    fontFamily: {
      'barlow-condensed': 'Barlow Condensed',
    },
  },
  plugins: [],
}
