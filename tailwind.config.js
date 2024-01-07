import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/flowbite-react/**/*.js'],
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
        'dot-flashing': {
          '0%': {
            'background-color': '#fff',
            // opacity: 0.1,
          },
          '50%': {
            // 'background-color': '#aaa',
            'background-color': 'rgba(107, 114, 128, 0.2)',
            // opacity: 1,
          },
          '100%': {
            'background-color': 'rgba(107, 114, 128, 0.2)',
            // opacity: 1,
            // 'background-color': '#fff',
          },
        },
      },
      animation: {
        'fade-in': 'fadedIn',
        'dot-flashing-linear': 'dot-flashing 1s infinite linear alternate',
        'dots-flashing': 'dot-flashing 1s  infinite  alternate',
      },
    },
    fontFamily: {
      'barlow-condensed': 'Barlow Condensed',
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('transitionDelay'),
        },
      );
    }),
  ],
};
