/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(238 242 255)',
          100: 'rgb(224 231 255)',
          200: 'rgb(199 210 254)',
          300: 'rgb(165 180 252)',
          400: 'rgb(129 140 248)',
          500: 'rgb(99 102 241)',
          600: 'rgb(79 70 229)',
          700: 'rgb(67 56 202)',
          800: 'rgb(55 48 163)',
          900: 'rgb(49 46 129)',
          950: 'rgb(30 27 75)'
        },
        secondary: {
          50: 'rgb(236 253 245)',
          100: 'rgb(209 250 229)',
          200: 'rgb(167 243 208)',
          300: 'rgb(110 231 183)',
          400: 'rgb(52 211 153)',
          500: 'rgb(16 185 129)',
          600: 'rgb(5 150 105)',
          700: 'rgb(4 120 87)',
          800: 'rgb(6 95 70)',
          900: 'rgb(6 78 59)',
          950: 'rgb(2 44 34)'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
};