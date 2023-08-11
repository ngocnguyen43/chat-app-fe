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
      keyframes: {
        fadedIn: {
          '0%': { opacity: 1 },
          '99%': { opacity: 0.01, width: '100%', height: '100%' },
          '100%': { opacity: 0, width: 0, height: 0 },
        },
        fadedIn: {
          '0%': { opacity: 1 },
          '99%': { opacity: 0.01, width: '100%', height: ' 100%' },
          '100%': { opacity: 0, width: 0, height: 0 },
        },
      },
      animation: {
        'fade-in': 'fadedIn',
      },
    },
    fontFamily: {
      'barlow-condensed': 'Barlow Condensed',
    },
  },
  plugins: [],
}
