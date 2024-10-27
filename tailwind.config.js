/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nobel: ['Nobel', 'sans-serif'],
        'nobel-condensed': ['Nobel Condensed', 'sans-serif'],
        anziano: ['Anziano', 'serif'],
      }, 
      colors: {
        'blue-400': '#0A84FF',
        'blue-600': '#0050EF',
        'gray-700': '#374151',
        'gray-800': '#1F2937',
        'gray-900': '#111827',
        'cyan-400': '#22d3ee',
        'purple-900': '#4c1d95', // Custom purple shade
        'indigo-900': '#1e3a8a', // Custom indigo shade
      },
      animation: {
        gradient: 'gradientBG 15s ease infinite',
        breathingGlow: 'breathingGlow 3s ease-in-out infinite',
      },
      keyframes: {
        gradientBG: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        breathingGlow: {
          '0%, 100%': { boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.5)' },
          '50%': { boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.transform-style-preserve': {
          'transform-style': 'preserve-3d',
        },
      });
    },
  ],
};
